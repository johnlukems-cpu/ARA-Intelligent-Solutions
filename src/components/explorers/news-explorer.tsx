"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { normalizeSearch } from "@/lib/format";
import { ArticleCard, type ArticleSummary } from "@/components/cards/article-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "./empty-state";
import { FilterChips } from "./filter-chips";
import { SearchField } from "./search-field";

/** Number of grid articles shown per "load more" step. */
const PAGE_SIZE = 4;

export function NewsExplorer({
  articles,
  categories,
  featuredId,
  locale,
}: {
  articles: ArticleSummary[];
  categories: { value: string; label: string }[];
  featuredId?: string;
  locale: Locale;
}) {
  const t = getDictionary(locale);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtering = query.trim() !== "" || category !== "all";
  const featured = !filtering ? articles.find((a) => a.id === featuredId) : undefined;

  const results = useMemo(() => {
    const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
    return articles
      .filter((a) => category === "all" || a.category === category)
      .filter((a) => {
        const text = normalizeSearch(`${a.title} ${a.excerpt} ${a.categoryLabel}`);
        return terms.every((term) => text.includes(term));
      });
  }, [articles, query, category]);

  const gridItems = featured ? results.filter((a) => a.id !== featured.id) : results;
  const shown = gridItems.slice(0, visible);

  const update = (fn: () => void) => {
    fn();
    setVisible(PAGE_SIZE);
  };
  const reset = () =>
    update(() => {
      setQuery("");
      setCategory("all");
    });

  const options = [
    { value: "all", label: t.common.all, count: articles.length },
    ...categories
      .map((c) => ({ ...c, count: articles.filter((a) => a.category === c.value).length }))
      .filter((c) => c.count > 0),
  ];

  if (!articles.length) {
    return <EmptyState title={t.news.title} text={t.news.noArticles} />;
  }

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <FilterChips label={t.news.filterLabel} options={options} value={category} onChange={(v) => update(() => setCategory(v))} />
        <SearchField
          label={t.news.searchLabel}
          placeholder={t.news.searchPlaceholder}
          value={query}
          onChange={(v) => update(() => setQuery(v))}
          clearLabel={t.common.resetFilters}
        />
      </div>
      <p className="mt-6 text-sm text-muted" role="status" aria-live="polite">
        {t.common.resultsCount(results.length)}
      </p>

      {featured ? (
        <div className="mt-4">
          <p className="eyebrow mb-3 text-electric-600">{t.news.featured}</p>
          <ArticleCard article={featured} locale={locale} variant="featured" headingLevel="h2" />
        </div>
      ) : null}

      {results.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title={t.news.emptyTitle}
            text={t.news.emptyText}
            action={
              <Button variant="outline" onClick={reset}>
                {t.common.resetFilters}
              </Button>
            }
          />
        </div>
      ) : (
        <>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {shown.map((article) => (
              <li key={article.id}>
                <ArticleCard article={article} locale={locale} headingLevel="h2" />
              </li>
            ))}
          </ul>
          {gridItems.length > PAGE_SIZE ? (
            <div className="mt-10 flex flex-col items-center gap-3">
              <p className="text-sm text-muted">{t.common.showingCount(shown.length, gridItems.length)}</p>
              {shown.length < gridItems.length ? (
                <Button variant="secondary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                  {t.common.loadMore}
                </Button>
              ) : null}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
