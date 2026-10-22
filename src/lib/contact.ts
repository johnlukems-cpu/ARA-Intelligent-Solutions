/**
 * Contact form schema and validation, shared by the browser and the server.
 * Validation returns error *codes*; the UI translates them per language.
 */

export const contactLimits = {
  name: { min: 2, max: 100 },
  email: { max: 200 },
  company: { max: 150 },
  subject: { min: 3, max: 150 },
  topic: { max: 80 },
  message: { min: 20, max: 4000 },
} as const;

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  subject: string;
  topic: string;
  message: string;
  consent: boolean;
  locale: "nl" | "en";
};

export type ContactField = "name" | "email" | "company" | "subject" | "topic" | "message" | "consent";

export type ContactErrorCode =
  | { code: "required" }
  | { code: "email" }
  | { code: "tooShort"; min: number }
  | { code: "tooLong"; max: number }
  | { code: "consent" }
  | { code: "invalid" };

export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>;

/** Pragmatic email check (RFC-complete validation is neither possible nor useful here). */
const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

// Control characters other than tab/newline are never legitimate in form input.
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export function sanitizeText(value: unknown, { multiline = false } = {}): string {
  if (typeof value !== "string") return "";
  const cleaned = value.replace(CONTROL_CHARS, "");
  return (multiline ? cleaned.replace(/\r\n?/g, "\n") : cleaned.replace(/\s+/g, " ")).trim();
}

/** Coerce unknown input (JSON body or form state) into a clean ContactInput. */
export function normalizeContactInput(raw: Record<string, unknown>): ContactInput {
  return {
    name: sanitizeText(raw.name),
    email: sanitizeText(raw.email).toLowerCase(),
    company: sanitizeText(raw.company),
    subject: sanitizeText(raw.subject),
    topic: sanitizeText(raw.topic),
    message: sanitizeText(raw.message, { multiline: true }),
    consent: raw.consent === true || raw.consent === "on" || raw.consent === "true",
    locale: raw.locale === "en" ? "en" : "nl",
  };
}

function lengthCheck(value: string, limits: { min?: number; max: number }, required: boolean): ContactErrorCode | undefined {
  if (!value) return required ? { code: "required" } : undefined;
  if (limits.min && value.length < limits.min) return { code: "tooShort", min: limits.min };
  if (value.length > limits.max) return { code: "tooLong", max: limits.max };
  return undefined;
}

export function validateContact(input: ContactInput, allowedTopics?: readonly string[]): ContactErrors {
  const errors: ContactErrors = {};
  const set = (field: ContactField, error: ContactErrorCode | undefined) => {
    if (error) errors[field] = error;
  };

  set("name", lengthCheck(input.name, contactLimits.name, true));
  if (!input.email) errors.email = { code: "required" };
  else if (input.email.length > contactLimits.email.max) errors.email = { code: "tooLong", max: contactLimits.email.max };
  else if (!EMAIL_PATTERN.test(input.email)) errors.email = { code: "email" };
  set("company", lengthCheck(input.company, contactLimits.company, false));
  set("subject", lengthCheck(input.subject, contactLimits.subject, true));
  if (!input.topic) errors.topic = { code: "required" };
  else if (input.topic.length > contactLimits.topic.max || (allowedTopics && !allowedTopics.includes(input.topic))) {
    errors.topic = { code: "invalid" };
  }
  set("message", lengthCheck(input.message, contactLimits.message, true));
  if (!input.consent) errors.consent = { code: "consent" };

  return errors;
}

export const OTHER_TOPIC = "other";

/** API response contract between /api/contact and the form. */
export type ContactResponse =
  | { ok: true; mode: "delivered" | "development" }
  | { ok: false; error: "validation"; fields: ContactErrors }
  | { ok: false; error: "not_configured" | "rate_limited" | "server_error" | "bad_request" };
