import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { cases } from "@/content/cases";
import { articles } from "@/content/news";
import { products } from "@/content/products";
import { serviceCategories } from "@/content/services";
import { locales, type Locale } from "@/i18n/config";
import { href, type RouteKey } from "@/i18n/routes";

type Entry = MetadataRoute.Sitemap[number];

function entry(paths: Partial<Record<Locale, string>>, locale: Locale, priority: number, lastModified?: string): Entry | undefined {
  const path = paths[locale];
  if (!path) return undefined;
  const languages = Object.fromEntries(Object.entries(paths).map(([l, p]) => [l, absoluteUrl(p as string)]));
  return {
    url: absoluteUrl(path),
    lastModified: lastModified ? new Date(lastModified) : undefined,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticKeys: [RouteKey, number][] = [
    ["home", 1],
    ["services", 0.9],
    ["products", 0.8],
    ["news", 0.8],
    ["cases", 0.6],
    ["about", 0.7],
    ["contact", 0.7],
    ["privacy", 0.2],
    ["terms", 0.2],
    ["cookies", 0.2],
  ];
  const groups: { paths: Partial<Record<Locale, string>>; priority: number; lastModified?: string }[] = [
    ...staticKeys.map(([key, priority]) => ({ paths: { nl: href("nl", key), en: href("en", key) }, priority })),
    ...serviceCategories.map((c) => ({
      paths: { nl: href("nl", "services", c.slug.nl), en: href("en", "services", c.slug.en) },
      priority: 0.8,
    })),
    ...products.map((p) => ({ paths: { nl: href("nl", "products", p.slug), en: href("en", "products", p.slug) }, priority: 0.6 })),
    ...cases.map((c) => ({ paths: { nl: href("nl", "cases", c.slug), en: href("en", "cases", c.slug) }, priority: 0.5 })),
    // Only translated article versions are listed (fallback pages are noindex).
    ...articles.map((a) => ({
      paths: {
        ...(a.translations.nl ? { nl: href("nl", "news", a.slug) } : {}),
        ...(a.translations.en ? { en: href("en", "news", a.slug) } : {}),
      },
      priority: 0.6,
      lastModified: a.updatedAt ?? a.publishedAt,
    })),
  ];
  return groups.flatMap((g) => locales.map((l) => entry(g.paths, l, g.priority, g.lastModified))).filter((e): e is Entry => Boolean(e));
}
