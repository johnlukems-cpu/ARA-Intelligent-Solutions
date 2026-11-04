import { BadgeCheck, CalendarDays, CircleCheck, ExternalLink, Info, Scale } from "lucide-react";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  academyFaq,
  academyReceives,
  academyTerms,
  claudeLinks,
  claudeTopics,
  formatIcons,
  trainingFormats,
  trainings,
  upcomingSessions,
  type Training,
} from "@/content/academy";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { isContactDeliveryConfigured } from "@/lib/contact-delivery";
import { formatDate } from "@/lib/format";
import { formatUsd } from "@/lib/price";
import { AcademyHeroVisual } from "@/components/academy/academy-hero-visual";
import { AcademyForm } from "@/components/forms/academy-form";
import { PriceCard } from "@/components/pricing/price-card";
import { ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { FaqList } from "@/components/ui/faq-list";
import { Icon } from "@/components/ui/icon";
import { JsonLd } from "@/components/ui/json-ld";
import { Notice } from "@/components/ui/notice";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";

export const REGISTER_ANCHOR = "inschrijven";
export const TRAININGS_ANCHOR = "trainingen";
const COMPANY_TRAINING = "ai-teams";

/** Link to the registration form with a training (and optionally a format) pre-selected. */
export function registerHref(locale: Locale, trainingId?: string, format?: string): string {
  const params = new URLSearchParams();
  if (trainingId) params.set("training", trainingId);
  if (format) params.set("format", format);
  const query = params.toString();
  return `${href(locale, "academy")}${query ? `?${query}` : ""}#${REGISTER_ANCHOR}`;
}

/** CTA label for a training: company training and "price on request" get their own wording. */
export function trainingCta(training: Training, locale: Locale): string {
  const a = getDictionary(locale).academy;
  if (training.id === COMPANY_TRAINING) return a.companyCta;
  return training.price ? a.register : a.requestInfo;
}

/** Schema.org Course for a training (used on the overview and detail pages). */
export function courseJsonLd(training: Training, locale: Locale) {
  return {
    "@type": "Course",
    name: training.name[locale],
    description: training.summary[locale],
    url: absoluteUrl(href(locale, "academy", training.slug[locale])),
    inLanguage: locale,
    provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl(href(locale, "home")) },
    ...(training.price
      ? {
          offers: {
            "@type": "Offer",
            category: "Paid",
            priceCurrency: "USD",
            price: training.price.amount,
            ...(training.price.from
              ? { priceSpecification: { "@type": "PriceSpecification", minPrice: training.price.amount, priceCurrency: "USD" } }
              : {}),
          },
        }
      : {}),
    hasCourseInstance: training.formats
      .filter((format) => format !== "in-company")
      .map((format) => ({
        "@type": "CourseInstance",
        courseMode: format === "online" ? "online" : "onsite",
        ...(training.durationHours ? { courseWorkload: `PT${training.durationHours}H` } : {}),
        ...(format === "classroom" ? { location: { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "SR" } } } : {}),
      })),
  };
}

export function AcademyPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const a = t.academy;
  const showDevNotice = process.env.NODE_ENV !== "production" && !isContactDeliveryConfigured();
  const company = trainings.find((training) => training.id === COMPANY_TRAINING);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": trainings.map((training) => courseJsonLd(training, locale)) }} />

      {/* 1. Introduction */}
      <PageHero
        locale={locale}
        eyebrow={a.brand}
        title={a.title}
        breadcrumbs={[{ label: t.nav.home, href: href(locale, "home") }, { label: a.brand }]}
        intro={
          <>
            <p className="font-display text-xl font-semibold text-cyan">{a.tagline}</p>
            {locale === "nl" ? (
              <p lang="en" className="mt-1 text-sm font-semibold tracking-wide text-white/60">
                {a.taglineEn}
              </p>
            ) : null}
            <p className="mt-4 font-semibold text-white">{a.positioning}</p>
            <p className="mt-3">{a.intro}</p>
            <p className="mt-3">{a.intro2}</p>
          </>
        }
        aside={<AcademyHeroVisual locale={locale} />}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={`#${TRAININGS_ANCHOR}`} size="lg" arrow>
            {a.viewTrainings}
          </ButtonLink>
          <ButtonLink href={`#${REGISTER_ANCHOR}`} size="lg" variant="outline-light" arrow>
            {a.register}
          </ButtonLink>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
          {a.heroPoints.map((point) => (
            <li key={point} className="inline-flex items-center gap-2">
              <CircleCheck aria-hidden="true" className="size-4 text-cyan" />
              {point}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* 2. Trainings and prices */}
      <section id={TRAININGS_ANCHOR} className="scroll-mt-28 bg-surface py-16 sm:py-20" aria-labelledby="trainings-title">
        <div className="container-site">
          <SectionHeading id="trainings-title" eyebrow={a.trainingsEyebrow} title={a.trainingsTitle} intro={a.trainingsIntro} />
          <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {trainings.map((training) => (
              <li key={training.id} className={training.highlight ? "relative" : undefined}>
                <PriceCard
                  locale={locale}
                  headingLevel="h3"
                  data={{
                    id: training.id,
                    icon: training.icon,
                    name: training.name[locale],
                    tag: training.highlight ? a.recommended : training.level[locale],
                    description: training.summary[locale],
                    price: training.price
                      ? { amount: training.price.amount, from: training.price.from, period: training.price.unit }
                      : undefined,
                    priceFallback: a.priceOnRequest,
                    duration: training.duration[locale],
                    meta: [
                      { label: a.language, value: training.language[locale] },
                      { label: a.audience, value: training.audience[locale].join(", ") },
                    ],
                    includedTitle: a.objectives,
                    included: training.outcomes[locale],
                    examplesTitle: t.pricing.included,
                    examples: training.included[locale],
                    note: training.id === "claude-code-automation" || training.id === COMPANY_TRAINING ? training.note?.[locale] : undefined,
                    highlight: training.highlight,
                    ctaHref: registerHref(locale, training.id),
                    ctaLabel: trainingCta(training, locale),
                    secondary: { href: href(locale, "academy", training.slug[locale]), label: a.viewTraining },
                  }}
                />
              </li>
            ))}
          </ul>

          {/* Pricing terms */}
          <div className="mt-10 rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-8">
            <h3 className="flex items-center gap-2 text-xl font-extrabold">
              <Scale aria-hidden="true" className="size-5 text-electric-600" />
              {a.termsTitle}
            </h3>
            <ul className="mt-5 grid gap-x-8 gap-y-3 md:grid-cols-2">
              {academyTerms[locale].map((term) => (
                <li key={term} className="flex gap-2.5 text-sm leading-relaxed text-ink">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-electric" />
                  {term}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Claude AI & Anthropic */}
      <section className="on-dark bg-hero-glow relative isolate overflow-hidden text-white" aria-labelledby="claude-title">
        <div aria-hidden="true" className="bg-circuit absolute inset-0 -z-10 opacity-80" />
        <div className="container-site py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading id="claude-title" eyebrow={a.claudeEyebrow} title={a.claudeTitle} tone="dark" />
              <p className="mt-5 text-lg leading-relaxed text-white/80">{a.claudeIntro}</p>
              <p className="mt-4 text-lg leading-relaxed text-white/80">{a.claudeIntro2}</p>
            </div>
            <div className="space-y-4 lg:col-span-5">
              <div className="rounded-[var(--radius-card)] bg-white/[0.07] p-6 ring-1 ring-cyan/30">
                <p className="flex items-center gap-2 font-display text-lg font-bold text-white" lang={locale === "nl" ? "en" : undefined}>
                  <BadgeCheck aria-hidden="true" className="size-5 text-cyan" />
                  {a.poweredTitle}
                </p>
                <p className="mt-2 leading-relaxed text-white/80">{a.poweredText}</p>
              </div>
              <div className="rounded-[var(--radius-card)] bg-white/[0.04] p-6 ring-1 ring-white/10">
                <p className="text-sm font-bold tracking-wide text-white/70 uppercase">{a.linksTitle}</p>
                <ul className="mt-3 grid gap-2 min-[400px]:grid-cols-2">
                  {claudeLinks.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-2 rounded-xl bg-white/5 px-3 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-cyan"
                      >
                        {link.label[locale]}
                        <ExternalLink aria-hidden="true" className="size-3.5 shrink-0" />
                        <span className="sr-only">{t.a11y.externalLink}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <h3 className="mt-14 text-xl font-bold text-white">{a.claudeTopicsTitle}</h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {claudeTopics.map((topic) => (
              <li key={topic.name.en} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                <span className="flex size-10 items-center justify-center rounded-xl bg-cyan/15 text-cyan">
                  <Icon name={topic.icon} className="size-5" />
                </span>
                <h4 className="mt-4 text-lg font-bold text-white">{topic.name[locale]}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-white/75">{topic.text[locale]}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex gap-2 text-sm text-white/70">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan" />
            {a.claudeAvailability}
          </p>
        </div>
      </section>

      {/* 4. Transparent training approach (no partner claims) */}
      <section className="py-16 sm:py-20" aria-labelledby="approach-title">
        <div className="container-site">
          <div className="rounded-[var(--radius-card)] border-l-4 border-macaw bg-surface p-6 ring-1 ring-line sm:p-10">
            <h2 id="approach-title" className="text-2xl font-extrabold sm:text-3xl" lang={locale === "nl" ? undefined : "en"}>
              {a.approachTitle}
            </h2>
            {a.approachText.map((paragraph) => (
              <p key={paragraph} className="mt-4 max-w-4xl text-lg leading-relaxed text-ink">
                {paragraph}
              </p>
            ))}
            <p className="mt-6 max-w-4xl text-xs leading-relaxed text-muted">{a.disclaimer}</p>
          </div>
        </div>
      </section>

      {/* 5. Formats */}
      <section className="bg-surface py-16 sm:py-20" aria-labelledby="formats-title">
        <div className="container-site">
          <SectionHeading id="formats-title" eyebrow={a.formatsEyebrow} title={a.formatsTitle} />
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trainingFormats.map((format) => (
              <li key={format} className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-midnight text-cyan shadow-[var(--shadow-glow)]">
                  <Icon name={formatIcons[format]} className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold">{a.formats[format].title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{a.formats[format].text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. What participants receive */}
      <section className="py-16 sm:py-20" aria-labelledby="receive-title">
        <div className="container-site">
          <SectionHeading id="receive-title" eyebrow={a.receiveEyebrow} title={a.receiveTitle} />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {academyReceives.map((item) => (
              <li key={item.text.nl} className="flex gap-4 rounded-[var(--radius-card)] bg-white p-5 shadow-[var(--shadow-card)] ring-1 ring-line xl:flex-col">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-midnight text-cyan">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <p className="pt-1 leading-relaxed text-ink xl:pt-0">{item.text[locale]}</p>
              </li>
            ))}
          </ul>
          <Notice className="mt-6">
            <strong>{a.certificateTitle}.</strong> {a.certificateNote}
          </Notice>
        </div>
      </section>

      {/* 7. Company training */}
      <section className="pb-16 sm:pb-20" aria-labelledby="custom-title">
        <div className="container-site">
          <div className="on-dark bg-hero-glow relative isolate overflow-hidden rounded-[var(--radius-card)] text-white shadow-xl">
            <div aria-hidden="true" className="bg-circuit absolute inset-0 -z-10 opacity-80" />
            <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2">
              <div>
                <h2 id="custom-title" className="text-2xl leading-tight font-extrabold text-white sm:text-3xl">
                  {a.customTitle}
                </h2>
                <p className="mt-4 leading-relaxed text-white/80">{a.customText}</p>
                <p className="mt-3 leading-relaxed text-white/80">{a.customText2}</p>
                {company?.price ? (
                  <p className="mt-5">
                    <span className="block text-sm font-semibold text-white/70">{t.pricing.from}</span>
                    <span className="font-display text-4xl font-extrabold text-white">{formatUsd(company.price.amount, locale)}</span>{" "}
                    <span className="text-sm font-semibold text-white/70">
                      {t.pricing.currency} {a.perGroup}
                    </span>
                  </p>
                ) : null}
                <ButtonLink href={registerHref(locale, COMPANY_TRAINING)} className="mt-6" arrow>
                  {a.customCta}
                </ButtonLink>
              </div>
              <ul className="space-y-3 self-center">
                {a.customPoints.map((point) => (
                  <li key={point} className="flex gap-3 rounded-xl bg-white/5 p-4 leading-relaxed text-white/85 ring-1 ring-white/10">
                    <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-cyan" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming sessions (only real, confirmed dates from academy.ts) */}
      <section className="py-16 sm:py-20" aria-labelledby="sessions-title">
        <div className="container-site">
          <SectionHeading id="sessions-title" eyebrow={a.sessionsEyebrow} title={a.sessionsTitle} />
          {upcomingSessions.length ? (
            <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingSessions.map((session) => {
                const training = trainings.find((item) => item.id === session.trainingId);
                if (!training) return null;
                return (
                  <li
                    key={`${session.trainingId}-${session.date}-${session.format}`}
                    className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line"
                  >
                    <p className="flex items-center gap-2 text-sm font-semibold text-electric-600">
                      <CalendarDays aria-hidden="true" className="size-4" />
                      <time dateTime={session.date}>{formatDate(session.date, locale)}</time>
                      {session.time ? <span className="text-muted">· {session.time}</span> : null}
                    </p>
                    <h3 className="mt-2 text-lg font-bold">{training.name[locale]}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {a.formats[session.format].title}
                      {session.location ? ` · ${session.location[locale]}` : ""}
                      {typeof session.seats === "number" ? ` · ${a.sessionsSeats(session.seats)}` : ""}
                    </p>
                    <ButtonLink href={registerHref(locale, training.id, session.format)} variant="secondary" size="sm" className="mt-4" arrow>
                      {trainingCta(training, locale)}
                    </ButtonLink>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-6 flex max-w-3xl gap-3 rounded-2xl bg-surface p-5 leading-relaxed text-ink ring-1 ring-line">
              <CalendarDays aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-electric-600" />
              {a.sessionsEmpty}
            </p>
          )}
        </div>
      </section>

      {/* 8. Registration */}
      <section id={REGISTER_ANCHOR} className="scroll-mt-28 bg-surface py-16 sm:py-20" aria-labelledby="register-title">
        <div className="container-site grid gap-8 lg:grid-cols-12">
          <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-10 lg:col-span-8">
            <SectionHeading id="register-title" eyebrow={a.formEyebrow} title={a.formTitle} intro={a.formIntro} />
            {showDevNotice ? (
              <Notice tone="warning" className="mt-6">
                {t.contact.devNotice}
              </Notice>
            ) : null}
            <div className="mt-8">
              <AcademyForm
                locale={locale}
                trainings={trainings.map((training) => ({ id: training.id, label: training.name[locale], price: training.price }))}
                privacyHref={href(locale, "privacy")}
              />
            </div>
          </div>
          <div className="space-y-6 lg:col-span-4">
            <div className="on-dark bg-circuit rounded-[var(--radius-card)] bg-midnight p-7 text-white shadow-xl">
              <h2 className="text-xl font-extrabold text-white">{a.afterTitle}</h2>
              <ol className="mt-5 space-y-4">
                {a.afterSteps.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-cyan text-sm font-bold text-midnight">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 text-sm leading-relaxed text-white/85">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-[var(--radius-card)] bg-white p-7 shadow-[var(--shadow-card)] ring-1 ring-line">
              <h2 className="text-lg font-extrabold">{a.trainingsEyebrow}</h2>
              <ul className="mt-4 divide-y divide-line">
                {trainings.map((training) => (
                  <li key={training.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                    <span className="font-semibold text-midnight">{training.name[locale]}</span>
                    <span className="shrink-0 text-right text-muted">
                      {training.price
                        ? `${training.price.from ? `${t.pricing.from.toLowerCase()} ` : ""}${formatUsd(training.price.amount, locale)}`
                        : a.priceOnRequest}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-16 sm:py-20" aria-labelledby="academy-faq-title">
        <div className="container-site">
          <SectionHeading id="academy-faq-title" title={a.faqTitle} />
          <div className="mt-8 max-w-4xl rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-8">
            <FaqList items={academyFaq[locale]} />
          </div>
        </div>
      </section>

      <CtaBand
        locale={locale}
        title={a.ctaTitle}
        text={a.ctaText}
        buttonLabel={a.register}
        buttonHref={`#${REGISTER_ANCHOR}`}
        secondary={{ label: a.companyCta, href: registerHref(locale, COMPANY_TRAINING) }}
      />
    </>
  );
}
