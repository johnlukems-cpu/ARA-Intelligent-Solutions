import { CircleCheck, Clock, GraduationCap, Info, Users } from "lucide-react";
import { academyReceives, formatIcons, trainings, type Training } from "@/content/academy";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { formatUsd } from "@/lib/price";
import { PriceCard } from "@/components/pricing/price-card";
import { Tag } from "@/components/ui/badges";
import { ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { Icon } from "@/components/ui/icon";
import { JsonLd } from "@/components/ui/json-ld";
import { Notice } from "@/components/ui/notice";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { courseJsonLd, registerHref, trainingCta } from "./academy-page";

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-8">
      <h2 id={id} className="text-2xl font-extrabold">
        {title}
      </h2>
      <span aria-hidden="true" className="accent-bar mt-3" />
      <div className="mt-5">{children}</div>
    </section>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 leading-relaxed">
          <CircleCheck aria-hidden="true" className="mt-1 size-4 shrink-0 text-electric-600" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function TrainingPage({ training, locale }: { training: Training; locale: Locale }) {
  const t = getDictionary(locale);
  const a = t.academy;
  const isQuote = Boolean(training.price.from);
  const cta = registerHref(locale, training.id);
  const ctaLabel = trainingCta(training, locale);
  const unitLabel = training.price.unit === "per-person" ? a.perPerson : a.perGroup;
  const others = trainings.filter((other) => other.id !== training.id);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...courseJsonLd(training, locale) }} />
      <PageHero
        locale={locale}
        eyebrow={a.brand}
        title={training.name[locale]}
        intro={training.summary[locale]}
        breadcrumbs={[
          { label: t.nav.home, href: href(locale, "home") },
          { label: a.brand, href: href(locale, "academy") },
          { label: training.name[locale] },
        ]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Tag tone="dark">
            <GraduationCap aria-hidden="true" className="mr-1.5 size-3.5" />
            {training.level[locale]}
          </Tag>
          <Tag tone="dark">
            <Clock aria-hidden="true" className="mr-1.5 size-3.5" />
            {training.duration[locale]}
          </Tag>
          <Tag tone="dark">
            {training.price.from ? `${t.pricing.from} ` : ""}
            {formatUsd(training.price.amount, locale)} {t.pricing.currency} {unitLabel}
          </Tag>
        </div>
        <ButtonLink href={cta} size="lg" className="mt-8" arrow>
          {ctaLabel}
        </ButtonLink>
      </PageHero>

      <div className="bg-surface py-14 sm:py-20">
        <div className="container-site grid gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <Block id="about-training" title={a.detailWhat}>
              <div className="space-y-4 leading-relaxed">
                {training.description[locale].map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {training.note ? (
                <p className="mt-5 flex gap-2 rounded-xl bg-macaw/10 p-4 text-sm leading-relaxed text-midnight ring-1 ring-macaw/40">
                  <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-macaw-600" />
                  {training.note[locale]}
                </p>
              ) : null}
            </Block>
            <Block id="program" title={a.detailProgram}>
              <ol className="space-y-3">
                {training.topics[locale].map((topic, index) => (
                  <li key={topic} className="flex gap-3">
                    <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 leading-relaxed">{topic}</span>
                  </li>
                ))}
              </ol>
            </Block>
            <div className="grid gap-8 md:grid-cols-2">
              <Block id="audience" title={a.detailAudience}>
                <ul className="space-y-3">
                  {training.audience[locale].map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Users aria-hidden="true" className="mt-1 size-4 shrink-0 text-electric-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Block>
              <Block id="outcomes" title={a.detailOutcomes}>
                <CheckList items={training.outcomes[locale]} />
              </Block>
            </div>
            <Block id="receive" title={a.receiveEyebrow}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {academyReceives.map((item) => (
                  <li key={item.text.nl} className="flex gap-3">
                    <Icon name={item.icon} className="mt-0.5 size-5 shrink-0 text-electric-600" />
                    <span className="leading-relaxed">{item.text[locale]}</span>
                  </li>
                ))}
              </ul>
              <Notice className="mt-5">{a.certificateNote}</Notice>
            </Block>
          </div>

          <div className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line">
                <p className="text-sm font-semibold text-muted">{isQuote ? t.pricing.from : a.priceLabel}</p>
                <p className="mt-1">
                  <span className="font-display text-4xl font-extrabold text-midnight">{formatUsd(training.price.amount, locale)}</span>{" "}
                  <span className="text-sm font-semibold text-muted">
                    {t.pricing.currency} {unitLabel}
                  </span>
                </p>
                <dl className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="font-semibold text-muted">{a.duration}</dt>
                    <dd className="text-right font-semibold text-midnight">{training.duration[locale]}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="font-semibold text-muted">{a.level}</dt>
                    <dd className="text-right font-semibold text-midnight">{training.level[locale]}</dd>
                  </div>
                </dl>
                <div className="mt-5 border-t border-line pt-5">
                  <p className="text-sm font-bold text-midnight">{a.detailFormats}</p>
                  <ul className="mt-3 space-y-2">
                    {training.formats.map((format) => (
                      <li key={format} className="flex items-center gap-2 text-sm">
                        <Icon name={formatIcons[format]} className="size-4 text-electric-600" />
                        {a.formats[format].title}
                      </li>
                    ))}
                  </ul>
                </div>
                <ButtonLink href={cta} className="mt-6 w-full" arrow>
                  {ctaLabel}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 sm:py-20" aria-labelledby="other-trainings">
        <div className="container-site">
          <SectionHeading id="other-trainings" title={a.detailOthers} />
          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <li key={other.id}>
                <PriceCard
                  locale={locale}
                  data={{
                    id: other.id,
                    icon: other.icon,
                    name: other.name[locale],
                    tag: other.level[locale],
                    description: other.summary[locale],
                    price: { amount: other.price.amount, from: other.price.from, period: other.price.unit },
                    duration: other.duration[locale],
                    includedTitle: a.topics,
                    included: other.topics[locale].slice(0, 3),
                    ctaHref: href(locale, "academy", other.slug[locale]),
                    ctaLabel: a.viewTraining,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand locale={locale} title={a.ctaTitle} text={a.ctaText} buttonLabel={ctaLabel} buttonHref={cta} />
    </>
  );
}
