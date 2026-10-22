export const locales = ["nl", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "nl";

/** A value that exists in every supported language. */
export type Localized<T = string> = Record<Locale, T>;

export const localeLabels: Localized<{ short: string; name: string }> = {
  nl: { short: "NL", name: "Nederlands" },
  en: { short: "EN", name: "English" },
};

/** Value used for Open Graph locale tags. */
export const ogLocale: Localized = { nl: "nl_SR", en: "en_US" };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "nl" ? "en" : "nl";
}
