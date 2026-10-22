import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServiceCategory } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { CoverArt } from "@/components/ui/cover-art";

export function ServiceCategoryCard({ category, locale }: { category: ServiceCategory; locale: Locale }) {
  const t = getDictionary(locale);
  const to = href(locale, "services", category.slug[locale]);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
      <CoverArt icon={category.icon} accent={category.accent} className="aspect-[16/9]" />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold text-muted">{category.name[locale]}</p>
        <h3 className="mt-1 text-xl font-extrabold tracking-wide uppercase">
          <Link href={to} className="after:absolute after:inset-0 focus-visible:outline-none">
            {category.shortName[locale]}
          </Link>
        </h3>
        <span aria-hidden="true" className="accent-bar mt-3" />
        <p className="mt-4 flex-1 leading-relaxed text-muted">{category.summary[locale]}</p>
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-electric-600">
          {t.common.moreInfo}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
        </p>
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] ring-2 ring-electric opacity-0 ring-inset transition-opacity group-has-[:focus-visible]:opacity-100" />
    </article>
  );
}
