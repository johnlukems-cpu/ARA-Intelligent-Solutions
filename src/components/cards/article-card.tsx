import Link from "next/link";
import { CalendarDays, Clock, Languages } from "lucide-react";
import type { Accent, IconName } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/format";
import { CoverArt } from "@/components/ui/cover-art";

/** Serializable article summary used by cards and the client-side news explorer. */
export type ArticleSummary = {
  id: string;
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  categoryLabel: string;
  category: string;
  dateLabel?: string;
  dateTime: string;
  readingTime: number;
  icon: IconName;
  accent: Accent;
  contentLocale: Locale;
};

export function ArticleCard({
  article,
  locale,
  variant = "default",
  headingLevel = "h3",
}: {
  article: ArticleSummary;
  locale: Locale;
  variant?: "default" | "featured";
  headingLevel?: "h2" | "h3";
}) {
  const t = getDictionary(locale);
  const Heading = headingLevel;
  const featured = variant === "featured";
  return (
    <article
      lang={article.contentLocale !== locale ? article.contentLocale : undefined}
      className={cn(
        "group relative flex h-full overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]",
        featured ? "flex-col md:flex-row" : "flex-col",
      )}
    >
      <CoverArt
        icon={article.icon}
        accent={article.accent}
        size={featured ? "lg" : "md"}
        className={cn(featured ? "aspect-[16/9] md:aspect-auto md:w-1/2 md:min-h-80" : "aspect-[16/9]")}
      />
      <div className={cn("flex flex-1 flex-col", featured ? "p-6 md:p-10" : "p-6")}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-muted">
          <span className="rounded-full bg-surface px-2.5 py-1 text-navy ring-1 ring-line ring-inset">{article.categoryLabel}</span>
          {article.dateLabel ? (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays aria-hidden="true" className="size-3.5" />
              <time dateTime={article.dateTime}>{article.dateLabel}</time>
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden="true" className="size-3.5" />
            {article.readingTime} {t.common.minRead}
          </span>
          {article.contentLocale !== locale ? (
            <span lang={locale} className="inline-flex items-center gap-1.5 rounded-full bg-macaw/20 px-2.5 py-1 text-midnight">
              <Languages aria-hidden="true" className="size-3.5" />
              {t.common.onlyAvailableIn(t.common.languageNames[article.contentLocale])}
            </span>
          ) : null}
        </div>
        <Heading className={cn("mt-4 font-extrabold leading-snug", featured ? "text-2xl md:text-3xl" : "text-lg")}>
          <Link href={article.href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {article.title}
          </Link>
        </Heading>
        <p className={cn("mt-3 flex-1 leading-relaxed text-muted", featured && "md:text-lg")}>{article.excerpt}</p>
        <p className="mt-5 text-sm font-semibold text-electric-600">{t.news.readArticle} →</p>
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] ring-2 ring-electric opacity-0 ring-inset transition-opacity group-has-[:focus-visible]:opacity-100" />
    </article>
  );
}
