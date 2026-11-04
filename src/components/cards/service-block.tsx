import Link from "next/link";
import { ArrowRight, CircleCheck, Sparkles, TrendingUp } from "lucide-react";
import type { Service } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

/** One service within a division: description, offerings, examples, benefits and a CTA. */
export function ServiceBlock({ service, locale, headingLevel = "h3" }: { service: Service; locale: Locale; headingLevel?: "h2" | "h3" }) {
  const t = getDictionary(locale);
  const s = t.services;
  const Heading = headingLevel;
  return (
    <article id={service.id} className="flex h-full scroll-mt-28 flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-8">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-midnight text-cyan shadow-[var(--shadow-glow)]">
        <Icon name={service.icon} className="size-6" />
      </span>
      <Heading className="mt-5 text-xl leading-snug font-extrabold">{service.name[locale]}</Heading>
      <p className="mt-3 leading-relaxed text-ink">{service.description[locale]}</p>

      <div className="mt-5">
        <p className="text-sm font-bold text-midnight">{s.offeringsLabel}</p>
        <ul className="mt-2 grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
          {service.offerings[locale].map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink">
              <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 grid flex-1 gap-4 rounded-2xl bg-surface p-4 sm:grid-cols-2">
        <div>
          <p className="flex items-center gap-1.5 text-sm font-bold text-midnight">
            <Sparkles aria-hidden="true" className="size-4 text-macaw-600" />
            {s.useCasesLabel}
          </p>
          <ul className="mt-1.5 space-y-1 text-sm leading-relaxed text-muted">
            {service.useCases[locale].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-sm font-bold text-midnight">
            <TrendingUp aria-hidden="true" className="size-4 text-electric-600" />
            {s.benefitsLabel}
          </p>
          <ul className="mt-1.5 space-y-1 text-sm leading-relaxed text-muted">
            {service.benefits[locale].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <ButtonLink href={`${href(locale, "contact")}?topic=${service.id}`} variant="secondary" size="sm" arrow>
          {t.common.discussService}
        </ButtonLink>
        {service.more ? (
          <Link
            href={href(locale, service.more.routeKey)}
            className="inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-electric-600 hover:text-navy"
          >
            {service.more.label[locale]}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
