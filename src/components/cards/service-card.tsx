import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import type { DivisionCard as Division } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { divisionHref } from "@/lib/divisions";
import { CoverArt } from "@/components/ui/cover-art";

/** Card for one of the four ARA divisions: visual, summary, three example services and a link. */
export function DivisionCard({ division, locale, headingLevel = "h3" }: { division: Division; locale: Locale; headingLevel?: "h2" | "h3" }) {
  const t = getDictionary(locale);
  const Heading = headingLevel;
  const to = divisionHref(locale, division);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
      <CoverArt icon={division.icon} accent={division.accent} className="aspect-[16/9]" />
      <div className="flex flex-1 flex-col p-6">
        <Heading className="text-xl leading-snug font-extrabold">
          <Link href={to} className="after:absolute after:inset-0 focus-visible:outline-none">
            {division.name[locale]}
          </Link>
        </Heading>
        <span aria-hidden="true" className="accent-bar mt-3" />
        <p className="mt-4 leading-relaxed text-muted">{division.summary[locale]}</p>
        <ul className="mt-4 flex-1 space-y-2">
          {division.highlights[locale].map((item) => (
            <li key={item} className="flex gap-2 text-sm text-ink">
              <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric-600" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-electric-600">
          {t.home.learnMore}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
        </p>
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] ring-2 ring-electric opacity-0 ring-inset transition-opacity group-has-[:focus-visible]:opacity-100" />
    </article>
  );
}
