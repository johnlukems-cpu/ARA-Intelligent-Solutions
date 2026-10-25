import type { Locale, Localized } from "./config";

/**
 * Localized URL structure. Dutch is the default language and lives at the
 * root; English lives under /en. Every route key maps to a localized segment.
 */
export const routeSegments = {
  home: { nl: "", en: "" },
  services: { nl: "diensten", en: "services" },
  products: { nl: "producten", en: "products" },
  pricing: { nl: "prijzen", en: "pricing" },
  aiEmployees: { nl: "ai-medewerkers", en: "ai-assistants" },
  news: { nl: "nieuws", en: "news" },
  cases: { nl: "cases", en: "cases" },
  about: { nl: "over-ons", en: "about" },
  contact: { nl: "contact", en: "contact" },
  privacy: { nl: "privacy", en: "privacy" },
  terms: { nl: "voorwaarden", en: "terms" },
  cookies: { nl: "cookies", en: "cookies" },
} as const satisfies Record<string, Localized>;

export type RouteKey = keyof typeof routeSegments;

export function localePrefix(locale: Locale): string {
  return locale === "en" ? "/en" : "";
}

/** Build a localized internal path, e.g. href("en", "products", "ara-docflow"). */
export function href(locale: Locale, key: RouteKey, slug?: string): string {
  const segment = routeSegments[key][locale];
  const parts = [localePrefix(locale), segment, slug].filter(Boolean).join("/");
  const path = parts.startsWith("/") ? parts : `/${parts}`;
  return path === "" ? "/" : path.replace(/\/+$/, "") || "/";
}

/** Context needed to translate dynamic URLs between languages. */
export type AlternateContext = {
  /** Service category slugs per language. */
  serviceSlugs: Localized[];
  /** News slugs mapped to the languages in which the article exists. */
  newsLocales: Record<string, Locale[]>;
};

function findRouteKey(segment: string, locale: Locale): RouteKey | undefined {
  return (Object.keys(routeSegments) as RouteKey[]).find(
    (key) => key !== "home" && routeSegments[key][locale] === segment,
  );
}

/**
 * Translate the current pathname to the equivalent page in another language.
 * Falls back to the closest overview page, or the language homepage, when no
 * direct translation exists.
 */
export function alternatePath(pathname: string, from: Locale, to: Locale, ctx: AlternateContext): string {
  if (from === to) return pathname;
  const stripped = from === "en" ? pathname.replace(/^\/en(?=\/|$)/, "") : pathname;
  const [first, second] = stripped.split("/").filter(Boolean);
  if (!first) return href(to, "home");

  const key = findRouteKey(first, from);
  if (!key) return href(to, "home");
  if (!second) return href(to, key);

  switch (key) {
    case "services": {
      const match = ctx.serviceSlugs.find((slugs) => slugs[from] === second);
      return match ? href(to, key, match[to]) : href(to, key);
    }
    case "news": {
      const available = ctx.newsLocales[second];
      return available?.includes(to) ? href(to, key, second) : href(to, key);
    }
    case "products":
    case "cases":
      return href(to, key, second);
    default:
      return href(to, key);
  }
}
