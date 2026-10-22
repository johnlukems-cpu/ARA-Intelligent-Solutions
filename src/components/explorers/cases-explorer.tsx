"use client";

import { useState } from "react";
import { caseTypes, type CaseStudy } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { CaseCard } from "@/components/cards/case-card";
import { EmptyState } from "./empty-state";
import { FilterChips } from "./filter-chips";

export function CasesExplorer({ items, locale }: { items: CaseStudy[]; locale: Locale }) {
  const t = getDictionary(locale);
  const [type, setType] = useState("all");
  const results = items.filter((item) => type === "all" || item.type === type);
  const options = [
    { value: "all", label: t.common.all, count: items.length },
    ...caseTypes.map((value) => ({ value, label: t.cases.type[value], count: items.filter((i) => i.type === value).length })),
  ];

  return (
    <div>
      <FilterChips label={t.cases.filterLabel} options={options} value={type} onChange={setType} />
      <p className="mt-6 text-sm text-muted" role="status" aria-live="polite">
        {t.common.resultsCount(results.length)}
      </p>
      {results.length ? (
        <ul className="mt-4 grid gap-6 lg:grid-cols-2">
          {results.map((item) => (
            <li key={item.id}>
              <CaseCard item={item} locale={locale} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4">
          <EmptyState title={t.cases.emptyTitle} text={t.cases.emptyText} />
        </div>
      )}
    </div>
  );
}
