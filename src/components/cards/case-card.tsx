import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServiceCategory } from "@/content/services";
import type { CaseStudy } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { CaseTypeBadge, Tag } from "@/components/ui/badges";
import { CoverArt } from "@/components/ui/cover-art";

export function CaseCard({ item, locale }: { item: CaseStudy; locale: Locale }) {
  const t = getDictionary(locale);
  const to = href(locale, "cases", item.slug);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] md:flex-row">
      <CoverArt icon={item.icon} accent={item.accent} className="aspect-[16/9] md:aspect-auto md:w-2/5" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <CaseTypeBadge type={item.type} locale={locale} />
          <Tag>{getServiceCategory(item.category).shortName[locale]}</Tag>
        </div>
        <h2 className="mt-4 text-xl font-extrabold leading-snug">
          <Link href={to} className="after:absolute after:inset-0 focus-visible:outline-none">
            {item.title[locale]}
          </Link>
        </h2>
        <p className="mt-3 flex-1 leading-relaxed text-muted">{item.summary[locale]}</p>
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-electric-600">
          {t.cases.viewCase}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
        </p>
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] ring-2 ring-electric opacity-0 ring-inset transition-opacity group-has-[:focus-visible]:opacity-100" />
    </article>
  );
}
