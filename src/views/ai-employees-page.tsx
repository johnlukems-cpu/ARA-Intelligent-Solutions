import Link from "next/link";
import { ArrowRight, CircleCheck, CircleMinus, Info, TriangleAlert } from "lucide-react";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  AI_EMPLOYEES_TOPIC,
  aiPackages,
  aiSafety,
  aiSeparateCosts,
  aiSpecialisations,
  aiSteps,
  aiTerms,
} from "@/content/ai-employees";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { formatUsd } from "@/lib/price";
import { AiWorkerIllustration } from "@/components/ai/ai-worker-illustration";
import { PriceCard } from "@/components/pricing/price-card";
import { ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { Icon } from "@/components/ui/icon";
import { JsonLd } from "@/components/ui/json-ld";
import { Notice } from "@/components/ui/notice";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";

export function AiEmployeesPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const a = t.aiEmployees;
  const contact = href(locale, "contact");
  const generalQuote = `${contact}?topic=${AI_EMPLOYEES_TOPIC}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: a.brand,
          slogan: a.slogan,
          description: a.metaDescription,
          url: absoluteUrl(href(locale, "aiEmployees")),
          areaServed: "SR",
          provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl(href(locale, "home")) },
          offers: aiPackages.map((item) => ({
            "@type": "Offer",
            name: item.name[locale],
            priceCurrency: "USD",
            price: item.price.amount,
            ...(item.price.from ? { priceSpecification: { "@type": "PriceSpecification", minPrice: item.price.amount, priceCurrency: "USD" } } : {}),
          })),
        }}
      />

      <PageHero
        locale={locale}
        eyebrow={a.brand}
        title={a.title}
        breadcrumbs={[
          { label: t.nav.home, href: href(locale, "home") },
          { label: t.nav.services, href: href(locale, "services") },
          { label: a.brand },
        ]}
        intro={
          <>
            <p className="font-display text-xl font-semibold text-cyan">{a.slogan}</p>
            {a.intro.map((paragraph) => (
              <p key={paragraph} className="mt-4">
                {paragraph}
              </p>
            ))}
          </>
        }
        aside={<AiWorkerIllustration locale={locale} className="mx-auto w-full max-w-md" />}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={generalQuote} size="lg" arrow>
            {a.primaryCta}
          </ButtonLink>
          <ButtonLink href={generalQuote} size="lg" variant="outline-light" arrow>
            {a.secondaryCta}
          </ButtonLink>
        </div>
      </PageHero>

      {/* What is an AI employee */}
      <section className="py-16 sm:py-20" aria-labelledby="what-title">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading id="what-title" eyebrow={a.whatEyebrow} title={a.whatTitle} />
            <p className="mt-5 text-lg leading-relaxed text-muted">{a.whatText}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line">
              <h3 className="flex items-center gap-2 text-lg font-bold text-muted">
                <Icon name="bot" className="size-5" />
                {a.chatbotTitle}
              </h3>
              <ul className="mt-4 space-y-2">
                {a.chatbotPoints.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-relaxed text-muted">
                    <CircleMinus aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="on-dark rounded-[var(--radius-card)] bg-midnight p-6 text-white shadow-xl ring-2 ring-cyan/40">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                <Icon name="cpu" className="size-5 text-cyan" />
                {a.employeeTitle}
              </h3>
              <ul className="mt-4 space-y-2">
                {a.employeePoints.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-relaxed text-white/85">
                    <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="on-dark bg-navy text-white" aria-labelledby="steps-title">
        <div className="container-site py-16 sm:py-20">
          <SectionHeading id="steps-title" eyebrow={a.stepsEyebrow} title={a.stepsTitle} tone="dark" />
          <ol className="relative mt-12 grid gap-6 md:grid-cols-5 md:gap-4">
            <span aria-hidden="true" className="absolute top-7 right-[10%] left-[10%] hidden h-0.5 bg-gradient-to-r from-cyan/0 via-cyan/60 to-cyan/0 md:block" />
            {aiSteps.map((step, index) => (
              <li
                key={step.title.nl}
                style={{ animationDelay: `${index * 120}ms` }}
                className="relative flex gap-4 motion-safe:animate-fade-up md:flex-col md:items-center md:text-center"
              >
                <span className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-midnight text-cyan shadow-[var(--shadow-glow)] ring-1 ring-cyan/40">
                  <Icon name={step.icon} className="size-6" />
                  <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-macaw text-xs font-bold text-midnight">
                    {index + 1}
                  </span>
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">{step.title[locale]}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/75">{step.text[locale]}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Specialisations */}
      <section className="bg-surface py-16 sm:py-20" aria-labelledby="specs-title">
        <div className="container-site">
          <SectionHeading id="specs-title" eyebrow={a.specsEyebrow} title={a.specsTitle} intro={a.specsIntro} />
          <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {aiSpecialisations.map((spec) => (
              <li key={spec.id}>
                <article
                  aria-labelledby={`spec-${spec.id}`}
                  className="flex h-full flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-midnight text-cyan shadow-[var(--shadow-glow)]">
                    <Icon name={spec.icon} className="size-6" />
                  </span>
                  <h3 id={`spec-${spec.id}`} className="mt-5 text-xl leading-snug font-extrabold">
                    {spec.name[locale]}
                  </h3>
                  <p className="mt-4 text-sm font-bold text-midnight">{a.helpsWith}</p>
                  <ul className="mt-2 flex-1 space-y-2">
                    {spec.tasks[locale].map((task) => (
                      <li key={task} className="flex gap-2 text-sm leading-relaxed text-ink">
                        <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric-600" />
                        {task}
                      </li>
                    ))}
                  </ul>
                  {spec.note ? (
                    <p className="mt-4 flex gap-2 rounded-xl bg-macaw/10 p-3 text-sm leading-relaxed text-midnight ring-1 ring-macaw/40">
                      <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-macaw-600" />
                      {spec.note[locale]}
                    </p>
                  ) : null}
                  <ButtonLink href={`${contact}?topic=ai-employee:${spec.id}`} variant="secondary" className="mt-6 w-full" arrow>
                    {t.pricing.requestQuote}
                  </ButtonLink>
                </article>
              </li>
            ))}
          </ul>
          <Notice className="mt-8">{a.specsPriceNote}</Notice>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 sm:py-20" aria-labelledby="ai-packages-title">
        <div className="container-site">
          <SectionHeading id="ai-packages-title" eyebrow={a.packagesEyebrow} title={a.packagesTitle} intro={a.packagesIntro} />
          <ul className="mt-10 grid gap-6 lg:grid-cols-3">
            {aiPackages.map((item) => (
              <li key={item.id}>
                <PriceCard
                  locale={locale}
                  data={{
                    id: item.id,
                    icon: item.icon,
                    name: item.name[locale],
                    description: item.audience[locale],
                    price: item.price,
                    includedTitle: item.includedTitle?.[locale],
                    included: item.included[locale],
                    examples: item.examples?.[locale],
                    examplesTitle: a.examples,
                    maintenance: item.maintenance,
                    note: item.note?.[locale],
                    highlight: item.highlight,
                    ctaHref: `${contact}?topic=package:${item.id}`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Maintenance and separate costs */}
      <section className="bg-surface py-16 sm:py-20" aria-labelledby="maint-title">
        <div className="container-site grid gap-8 lg:grid-cols-2">
          <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-8">
            <SectionHeading id="maint-title" eyebrow={a.maintEyebrow} title={a.maintTitle} />
            <p className="mt-4 leading-relaxed text-muted">{a.maintText}</p>
            <dl className="mt-6 divide-y divide-line rounded-2xl bg-surface px-5 ring-1 ring-line">
              {aiPackages.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 py-3.5">
                  <dt className="font-semibold text-midnight">{item.name[locale]}</dt>
                  <dd className="text-right font-display font-bold text-midnight">
                    {item.maintenance.from ? `${t.pricing.from.toLowerCase()} ` : ""}
                    {formatUsd(item.maintenance.amount, locale)}{" "}
                    <span className="font-sans text-sm font-semibold text-muted">{t.pricing.perMonth}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="on-dark bg-circuit rounded-[var(--radius-card)] bg-midnight p-6 text-white shadow-xl sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-extrabold text-white">
              <Info aria-hidden="true" className="size-6 text-macaw" />
              {a.separateTitle}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {aiSeparateCosts[locale].map((cost) => (
                <li key={cost} className="flex gap-2 rounded-xl bg-white/5 p-3 text-sm leading-relaxed text-white/85 ring-1 ring-white/10">
                  <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-macaw" />
                  {cost}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="on-dark bg-hero-glow relative overflow-hidden text-white" aria-labelledby="safety-title">
        <div aria-hidden="true" className="bg-circuit absolute inset-0" />
        <div className="container-site relative py-16 sm:py-20">
          <SectionHeading id="safety-title" eyebrow={a.safetyEyebrow} title={a.safetyTitle} tone="dark" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aiSafety.map((item) => (
              <li key={item.text.nl} className="flex gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan/15 text-cyan">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <p className="leading-relaxed text-white/85">{item.text[locale]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Terms */}
      <section className="py-16 sm:py-20" aria-labelledby="ai-terms-title">
        <div className="container-site">
          <SectionHeading id="ai-terms-title" title={a.termsTitle} intro={a.termsIntro} />
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {aiTerms[locale].map((term, index) => (
              <li key={term} className="flex gap-4 rounded-2xl bg-surface p-5 ring-1 ring-line">
                <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="pt-1 leading-relaxed text-ink">{term}</span>
              </li>
            ))}
          </ol>
          <Link
            href={href(locale, "pricing")}
            className="mt-8 inline-flex items-center gap-1.5 font-semibold text-electric-600 hover:text-navy"
          >
            {a.pricingLink}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <CtaBand
        locale={locale}
        title={a.ctaTitle}
        text={a.ctaText}
        buttonLabel={a.primaryCta}
        buttonHref={generalQuote}
        secondary={{ label: a.secondaryCta, href: generalQuote }}
      />
    </>
  );
}
