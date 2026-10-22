import { CircleAlert, CircleCheck } from "lucide-react";
import type { Service } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

/** Full description of a single service: what, why, examples and a CTA. */
export function ServiceBlock({ service, locale, headingLevel = "h3" }: { service: Service; locale: Locale; headingLevel?: "h2" | "h3" }) {
  const t = getDictionary(locale);
  const Heading = headingLevel;
  return (
    <article id={service.id} className="flex h-full scroll-mt-28 flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-8">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-midnight text-cyan shadow-[var(--shadow-glow)]">
        <Icon name={service.icon} className="size-6" />
      </span>
      <Heading className="mt-5 text-lg font-extrabold leading-snug sm:text-xl">{service.name[locale]}</Heading>
      <p className="mt-5 leading-relaxed text-ink">{service.description[locale]}</p>
      <div className="mt-5 rounded-2xl bg-surface p-4">
        <p className="flex items-center gap-2 text-sm font-bold text-midnight">
          <CircleAlert aria-hidden="true" className="size-4 text-macaw-600" />
          {t.services.problemLabel}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{service.problem[locale]}</p>
      </div>
      <div className="mt-5 flex-1">
        <p className="text-sm font-bold text-midnight">{t.services.examplesLabel}</p>
        <ul className="mt-2 space-y-2">
          {service.examples[locale].map((example) => (
            <li key={example} className="flex gap-2 text-sm leading-relaxed text-muted">
              <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric-600" />
              {example}
            </li>
          ))}
        </ul>
      </div>
      <ButtonLink href={`${href(locale, "contact")}?topic=${service.id}`} variant="secondary" size="sm" className="mt-6 self-start" arrow>
        {t.common.discussService}
      </ButtonLink>
    </article>
  );
}
