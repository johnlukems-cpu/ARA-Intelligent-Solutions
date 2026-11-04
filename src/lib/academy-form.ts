/**
 * ARA AI Academy registration form: schema and validation, shared by the
 * browser and the server. Validation returns error codes; the UI translates them.
 */
import { sanitizeText, type ContactErrorCode } from "./contact";

export const UNSURE_TRAINING = "unsure";

export const academyLimits = {
  name: { min: 2, max: 100 },
  company: { max: 150 },
  email: { max: 200 },
  phone: { min: 7, max: 25 },
  participants: { min: 1, max: 200 },
  notes: { max: 2000 },
} as const;

/** Delivery format chosen in the form. Company trainings are selected via the training itself. */
export type AcademyFormat = "classroom" | "online";
export const academyFormats: AcademyFormat[] = ["classroom", "online"];

export type AcademyInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  training: string;
  participants: string;
  format: string;
  preferredDate: string;
  notes: string;
  consent: boolean;
  locale: "nl" | "en";
};

export type AcademyField =
  | "name"
  | "company"
  | "email"
  | "phone"
  | "training"
  | "participants"
  | "format"
  | "preferredDate"
  | "notes"
  | "consent";

export type AcademyErrorCode =
  | ContactErrorCode
  | { code: "phone" }
  | { code: "range"; min: number; max: number }
  | { code: "date" };

export type AcademyErrors = Partial<Record<AcademyField, AcademyErrorCode>>;

export type AcademyResponse =
  | { ok: true; mode: "delivered" | "development" }
  | { ok: false; error: "validation"; fields: AcademyErrors }
  | { ok: false; error: "not_configured" | "rate_limited" | "server_error" | "bad_request" };

const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;
const PHONE_PATTERN = /^\+?[\d\s().-]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function normalizeAcademyInput(raw: Record<string, unknown>): AcademyInput {
  return {
    name: sanitizeText(raw.name),
    company: sanitizeText(raw.company),
    email: sanitizeText(raw.email).toLowerCase(),
    phone: sanitizeText(raw.phone),
    training: sanitizeText(raw.training),
    participants: sanitizeText(typeof raw.participants === "number" ? String(raw.participants) : raw.participants),
    format: sanitizeText(raw.format),
    preferredDate: sanitizeText(raw.preferredDate),
    notes: sanitizeText(raw.notes, { multiline: true }),
    consent: raw.consent === true || raw.consent === "on" || raw.consent === "true",
    locale: raw.locale === "en" ? "en" : "nl",
  };
}

/** Today's date (YYYY-MM-DD) in Suriname (UTC-3), the earliest allowed preferred date. */
export function minimumPreferredDate(now = new Date()): string {
  return new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export function validateAcademy(input: AcademyInput, allowedTrainings: readonly string[]): AcademyErrors {
  const errors: AcademyErrors = {};

  if (!input.name) errors.name = { code: "required" };
  else if (input.name.length < academyLimits.name.min) errors.name = { code: "tooShort", min: academyLimits.name.min };
  else if (input.name.length > academyLimits.name.max) errors.name = { code: "tooLong", max: academyLimits.name.max };

  if (input.company.length > academyLimits.company.max) errors.company = { code: "tooLong", max: academyLimits.company.max };

  if (!input.email) errors.email = { code: "required" };
  else if (input.email.length > academyLimits.email.max) errors.email = { code: "tooLong", max: academyLimits.email.max };
  else if (!EMAIL_PATTERN.test(input.email)) errors.email = { code: "email" };

  const digits = input.phone.replace(/\D/g, "");
  if (!input.phone) errors.phone = { code: "required" };
  else if (!PHONE_PATTERN.test(input.phone) || digits.length < academyLimits.phone.min || input.phone.length > academyLimits.phone.max) {
    errors.phone = { code: "phone" };
  }

  if (!input.training) errors.training = { code: "required" };
  else if (![...allowedTrainings, UNSURE_TRAINING].includes(input.training)) errors.training = { code: "invalid" };

  const { min, max } = academyLimits.participants;
  const count = Number(input.participants);
  if (!input.participants) errors.participants = { code: "required" };
  else if (!/^\d+$/.test(input.participants) || count < min || count > max) errors.participants = { code: "range", min, max };

  if (!input.format) errors.format = { code: "required" };
  else if (!academyFormats.includes(input.format as AcademyFormat)) errors.format = { code: "invalid" };

  if (input.preferredDate) {
    const valid = DATE_PATTERN.test(input.preferredDate) && !Number.isNaN(new Date(`${input.preferredDate}T12:00:00Z`).getTime());
    if (!valid || input.preferredDate < minimumPreferredDate()) errors.preferredDate = { code: "date" };
  }

  if (input.notes.length > academyLimits.notes.max) errors.notes = { code: "tooLong", max: academyLimits.notes.max };

  if (!input.consent) errors.consent = { code: "consent" };

  return errors;
}
