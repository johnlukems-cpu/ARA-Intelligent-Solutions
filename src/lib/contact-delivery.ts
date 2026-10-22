import "server-only";
import type { ContactInput } from "./contact";
import { getTopicLabel } from "./contact-topics";

export type DeliveryResult = "delivered" | "development" | "not_configured";

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

function summary(input: ContactInput) {
  return {
    name: input.name,
    email: input.email,
    company: input.company || undefined,
    subject: input.subject,
    topic: input.topic,
    topicLabel: getTopicLabel(input.topic, input.locale),
    message: input.message,
    locale: input.locale,
    consent: input.consent,
    submittedAt: new Date().toISOString(),
  };
}

async function sendWithResend(input: ContactInput, apiKey: string, to: string, from: string) {
  const data = summary(input);
  const rows: [string, string | undefined][] = [
    ["Naam / Name", data.name],
    ["E-mail", data.email],
    ["Bedrijf / Company", data.company],
    ["Onderwerp / Topic", data.topicLabel],
    ["Taal / Language", data.locale.toUpperCase()],
  ];
  const html = `<h2>${escapeHtml(data.subject)}</h2><table cellpadding="6">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v ?? "")}</td></tr>`)
    .join("")}</table><p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`;
  const text = `${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n")}\n\n${data.message}`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((address) => address.trim()),
      reply_to: data.email,
      subject: `[ARA website] ${data.subject}`.slice(0, 200),
      html,
      text,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Resend responded with ${response.status}`);
}

async function sendToWebhook(input: ContactInput, url: string, secret?: string) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(secret ? { "X-Webhook-Secret": secret } : {}) },
    body: JSON.stringify({ type: "contact_form", ...summary(input) }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
}

/**
 * Deliver a validated contact message via the configured integration.
 * Throws when a configured integration fails, so the user is never told a
 * message was sent when it was not.
 */
export async function deliverContactMessage(input: ContactInput): Promise<DeliveryResult> {
  const resendKey = env("RESEND_API_KEY");
  const to = env("CONTACT_TO_EMAIL");
  const from = env("CONTACT_FROM_EMAIL");
  const webhook = env("CONTACT_WEBHOOK_URL");

  if (resendKey && to && from) {
    await sendWithResend(input, resendKey, to, from);
    return "delivered";
  }
  if (webhook) {
    await sendToWebhook(input, webhook, env("CONTACT_WEBHOOK_SECRET"));
    return "delivered";
  }
  if (process.env.NODE_ENV !== "production") {
    console.info("[contact] No delivery integration configured. Message NOT delivered (development mode):", summary(input));
    return "development";
  }
  return "not_configured";
}
