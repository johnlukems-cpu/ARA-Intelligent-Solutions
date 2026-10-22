import type { Locale } from "@/i18n/config";
import type { Article, ArticleTranslation, ContentBlock, NewsCategory } from "../types";
import type { Localized } from "@/i18n/config";

import apiExplained from "./articles/api-koppelingen-uitgelegd";
import prepareAutomation from "./articles/automatiseringsproject-voorbereiden";
import suriname from "./articles/digitalisering-in-suriname";
import customVsStandard from "./articles/maatwerk-of-standaardsoftware";
import fiveProcesses from "./articles/processen-automatiseren";
import responsibleAi from "./articles/verantwoord-ai-gebruiken";
import aiStart from "./articles/waar-begint-u-met-ai";

/**
 * NEWS & INSIGHTS
 *
 * To add an article: create a file in ./articles, then add it to this list.
 * Provide `translations.nl` and/or `translations.en`. Articles without a
 * translation in the current language are shown in their original language
 * with a clear notice, so a page is never blank.
 *
 * ⚠️  Articles with `isDemo: true` are sample content for launch preparation.
 */
const allArticles: Article[] = [aiStart, fiveProcesses, customVsStandard, suriname, responsibleAi, apiExplained, prepareAutomation];

export const newsCategoryLabels: Record<NewsCategory, Localized> = {
  company: { nl: "Bedrijfsnieuws", en: "Company news" },
  ai: { nl: "AI-ontwikkelingen", en: "AI developments" },
  automation: { nl: "Automatisering", en: "Automation" },
  software: { nl: "Software & technologie", en: "Software & technology" },
  "digital-transformation": { nl: "Digitale transformatie", en: "Digital transformation" },
  guides: { nl: "Handleidingen", en: "Guides" },
  products: { nl: "Productnieuws", en: "Product news" },
  suriname: { nl: "Suriname", en: "Suriname" },
};

function isValidDate(value: string): boolean {
  return !Number.isNaN(new Date(value).getTime());
}

/** All articles with a valid date and at least one translation, newest first. */
export const articles: Article[] = allArticles
  .filter((article) => isValidDate(article.publishedAt) && Object.keys(article.translations).length > 0)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export type ResolvedArticle = {
  article: Article;
  translation: ArticleTranslation;
  /** Language the content is actually written in. */
  contentLocale: Locale;
  isFallback: boolean;
  readingTime: number;
};

function blockText(block: ContentBlock): string {
  switch (block.type) {
    case "list":
      return block.items.join(" ");
    case "callout":
      return `${block.title ?? ""} ${block.text}`;
    default:
      return block.text;
  }
}

export function readingTimeFor(translation: ArticleTranslation): number {
  if (translation.readingTime) return translation.readingTime;
  const words = translation.content.map(blockText).join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** Resolve an article for a locale, falling back to an available translation. */
export function resolveArticle(article: Article, locale: Locale): ResolvedArticle | undefined {
  const own = article.translations[locale];
  if (own) return { article, translation: own, contentLocale: locale, isFallback: false, readingTime: readingTimeFor(own) };
  const fallbackLocale = (Object.keys(article.translations) as Locale[])[0];
  const fallback = fallbackLocale ? article.translations[fallbackLocale] : undefined;
  if (!fallbackLocale || !fallback) return undefined;
  return { article, translation: fallback, contentLocale: fallbackLocale, isFallback: true, readingTime: readingTimeFor(fallback) };
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

/** Articles that have content in the given language. */
export function getArticlesForLocale(locale: Locale): Article[] {
  return articles.filter((article) => Boolean(article.translations[locale]));
}

export function getLatestArticles(locale: Locale, limit = 3): Article[] {
  return getArticlesForLocale(locale).slice(0, limit);
}

export function getRelatedArticles(article: Article, locale: Locale, limit = 3): Article[] {
  const candidates = getArticlesForLocale(locale).filter((a) => a.id !== article.id);
  const sameCategory = candidates.filter((a) => a.category === article.category);
  const others = candidates.filter((a) => a.category !== article.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function getNewsLocales(): Record<string, Locale[]> {
  return Object.fromEntries(articles.map((article) => [article.slug, Object.keys(article.translations) as Locale[]]));
}
