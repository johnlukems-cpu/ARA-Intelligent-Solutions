"use client";

import { useMemo, useState } from "react";
import { productCategoryLabels } from "@/content/products";
import { productCategories, type Product } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { normalizeSearch } from "@/lib/format";
import { ProductCard } from "@/components/cards/product-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "./empty-state";
import { FilterChips } from "./filter-chips";
import { SearchField } from "./search-field";

function searchableText(product: Product, locale: Locale) {
  return normalizeSearch(
    [
      product.name,
      product.tagline[locale],
      product.summary[locale],
      productCategoryLabels[product.category][locale],
      ...product.features[locale],
    ].join(" "),
  );
}

export function ProductsExplorer({ products, locale }: { products: Product[]; locale: Locale }) {
  const t = getDictionary(locale);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const index = useMemo(() => products.map((product) => ({ product, text: searchableText(product, locale) })), [products, locale]);

  const results = useMemo(() => {
    const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
    return index
      .filter(({ product }) => category === "all" || product.category === category)
      .filter(({ text }) => terms.every((term) => text.includes(term)))
      .map(({ product }) => product);
  }, [index, query, category]);

  const options = [
    { value: "all", label: t.common.all, count: products.length },
    ...productCategories
      .map((value) => ({ value, label: productCategoryLabels[value][locale], count: products.filter((p) => p.category === value).length }))
      .filter((option) => option.count > 0),
  ];

  const reset = () => {
    setQuery("");
    setCategory("all");
  };

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <FilterChips label={t.products.filterLabel} options={options} value={category} onChange={setCategory} />
        <SearchField
          label={t.products.searchLabel}
          placeholder={t.products.searchPlaceholder}
          value={query}
          onChange={setQuery}
          clearLabel={t.common.resetFilters}
        />
      </div>
      <p className="mt-6 text-sm text-muted" role="status" aria-live="polite">
        {t.common.resultsCount(results.length)}
      </p>
      {results.length ? (
        <ul className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} locale={locale} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4">
          <EmptyState
            title={t.products.emptyTitle}
            text={t.products.emptyText}
            action={
              <Button variant="outline" onClick={reset}>
                {t.common.resetFilters}
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}
