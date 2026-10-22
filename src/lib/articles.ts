import type { ArticleSummary } from "@/components/cards/article-card";
import { newsCategoryLabels, resolveArticle } from "@/content/news";
import type { Article } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { formatDate } from "./format";

/** Convert an article into a serializable card summary for a locale. */
export function toArticleSummary(article: Article, locale: Locale): ArticleSummary | undefined {
  const resolved = resolveArticle(article, locale);
  if (!resolved) return undefined;
  return {
    id: article.id,
    slug: article.slug,
    href: href(locale, "news", article.slug),
    title: resolved.translation.title,
    excerpt: resolved.translation.excerpt,
    category: article.category,
    categoryLabel: newsCategoryLabels[article.category][locale],
    dateLabel: formatDate(article.publishedAt, locale),
    dateTime: article.publishedAt,
    readingTime: resolved.readingTime,
    icon: article.icon,
    accent: article.accent,
    contentLocale: resolved.contentLocale,
  };
}

export function toArticleSummaries(list: Article[], locale: Locale): ArticleSummary[] {
  return list.map((article) => toArticleSummary(article, locale)).filter((s): s is ArticleSummary => s !== undefined);
}
