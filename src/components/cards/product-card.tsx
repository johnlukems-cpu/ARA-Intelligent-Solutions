import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { productCategoryLabels } from "@/content/products";
import type { Product } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { StatusBadge } from "@/components/ui/badges";
import { ProductVisual } from "@/components/ui/product-visual";

export function ProductCard({ product, locale, headingLevel = "h3" }: { product: Product; locale: Locale; headingLevel?: "h2" | "h3" }) {
  const t = getDictionary(locale);
  const Heading = headingLevel;
  const to = href(locale, "products", product.slug);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
      <div className="relative">
        <ProductVisual product={product} className="aspect-[16/9]" />
        {product.isSample ? (
          <span className="absolute top-3 left-3 rounded-full bg-midnight/80 px-2.5 py-1 text-[0.7rem] font-bold tracking-wider text-white uppercase ring-1 ring-white/20 backdrop-blur">
            {t.products.conceptBadge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={product.status} locale={locale} />
          <span className="text-xs font-semibold text-muted">{productCategoryLabels[product.category][locale]}</span>
        </div>
        <Heading className="mt-4 text-xl font-extrabold">
          <Link href={to} className="after:absolute after:inset-0 focus-visible:outline-none">
            {product.name}
          </Link>
        </Heading>
        <p className="mt-1 text-sm font-medium text-electric-600">{product.tagline[locale]}</p>
        <p className="mt-3 flex-1 leading-relaxed text-muted">{product.summary[locale]}</p>
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-electric-600">
          {t.products.viewProduct}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
        </p>
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] ring-2 ring-electric opacity-0 ring-inset transition-opacity group-has-[:focus-visible]:opacity-100" />
    </article>
  );
}
