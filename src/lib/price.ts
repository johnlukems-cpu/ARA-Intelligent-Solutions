import type { Locale } from "@/i18n/config";

/** "$1.000" (nl) / "$1,000" (en). Prices on the site are always in USD. */
export function formatUsd(amount: number, locale: Locale): string {
  return `$${new Intl.NumberFormat(locale === "nl" ? "nl-NL" : "en-US", { maximumFractionDigits: 0 }).format(amount)}`;
}
