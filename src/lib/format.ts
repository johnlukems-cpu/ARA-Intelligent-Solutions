import type { Locale } from "@/i18n/config";

const dateLocales: Record<Locale, string> = { nl: "nl-NL", en: "en-GB" };

/** Format an ISO date; returns undefined for invalid input so nothing broken is shown. */
export function formatDate(value: string | undefined, locale: Locale): string | undefined {
  if (!value) return undefined;
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat(dateLocales[locale], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Normalize text for accent-insensitive search. */
export function normalizeSearch(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}
