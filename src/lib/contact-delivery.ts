import "server-only";
import type { ContactInput } from "./contact";
import { getTopicLabel } from "./contact-topics";

export type DeliveryResult = "delivered" | "development" | "not_configured";

/** A form submission in a transport-neutral shape (email via Resend, or webhook). */
export type Submission = {
  /** Webhook `type`, e.g. "contact_form" or "academy_registration". */
  type: string;
  subject: string;
  replyTo: string;
  /** Label/value pairs shown in the email (empty values are skipped). */
  rows: [string, string | undefined][];
  /** Free text shown below the table. */
  message?: string;
  /** Structured data sent to the webhook. */
  payload: Record<string, unknown>;
};

function env(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char);
}

export function isContactDeliveryConfigured(): boolean {
  return Boolean((env("RESEND_API_KEY") && env("CONTACT_TO_EMAIL") && env("CONTACT_FROM_EMAIL")) || env("CONTACT_WEBHOOK_URL"));
}

async function sendWithResend(submission: Submission, apiKey: string, to: string, from: string) {
  const rows = submission.rows.filter(([, v]) => v);
  const message = submission.message ?? "";
  const html = `<h2>${escapeHtml(submission.subject)}</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v ?? "")}</td></tr>`)
    .join("")}</table>${message ? `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>` : ""}`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}${message ? `\n\n${message}` : ""}`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((address) => address.trim()),
      reply_to: submission.replyTo,
      subject: `[ARA website] ${submission.subject}`.slice(0, 200),
      html,
      text,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Resend responded with ${response.status}`);
}

async function sendToWebhook(submission: Submission, url: string, secret?: string) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(secret ? { "X-Webhook-Secret": secret } : {}) },
    body: JSON.stringify({ type: submission.type, ...submission.payload, submittedAt: new Date().toISOString() }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
}

/**
 * Deliver a validated submission via the configured integration (Resend first,
 * then the webhook). Throws when a configured integration fails, so the user is
 * never told a message was sent when it was not.
 */
export async function deliverSubmission(submission: Submission): Promise<DeliveryResult> {
  const resendKey = env("RESEND_API_KEY");
  const to = env("CONTACT_TO_EMAIL");
  const from = env("CONTACT_FROM_EMAIL");
  const webhook = env("CONTACT_WEBHOOK_URL");

  if (resendKey && to && from) {
    await sendWithResend(submission, resendKey, to, from);
    return "delivered";
  }
  if (webhook) {
    await sendToWebhook(submission, webhook, env("CONTACT_WEBHOOK_SECRET"));
    return "delivered";
  }
  if (process.env.NODE_ENV !== "production") {
    console.info(`[${submission.type}] No delivery integration configured. NOT delivered (development mode):`, submission.payload);
    return "development";
  }
  return "not_configured";
}

export function deliverContactMessage(input: ContactInput): Promise<DeliveryResult> {
  const topicLabel = getTopicLabel(input.topic, input.locale);
  return deliverSubmission({
    type: "contact_form",
    subject: input.subject,
    replyTo: input.email,
    rows: [
      ["Naam / Name", input.name],
      ["E-mail", input.email],
      ["Bedrijf / Company", input.company || undefined],
      ["Onderwerp / Topic", topicLabel],
      ["Taal / Language", input.locale.toUpperCase()],
    ],
    message: input.message,
    payload: {
      name: input.name,
      email: input.email,
      company: input.company || undefined,
      subject: input.subject,
      topic: input.topic,
      topicLabel,
      message: input.message,
      locale: input.locale,
      consent: input.consent,
    },
  });
}
