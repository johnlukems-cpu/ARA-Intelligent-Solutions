import { CircleCheck, Mail } from "lucide-react";
import { absoluteUrl, siteConfig } from "@/config/site";
import { pricingFaq, pricingGroups, pricingPackages, pricingTerms, workspaceUsers, type PricingPackage } from "@/content/pricing";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { formatUsd } from "@/lib/price";
import { PriceCard, type PriceCardData } from "@/components/pricing/price-card";
import { ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { FaqList } from "@/components/ui/faq-list";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";

function toCard(item: PricingPackage, locale: Locale, contactHref: string): PriceCardData {
  return {
    id: item.id,
    icon: item.icon,
    name: item.name[locale],
    tag: pricingGroups[item.group][locale],
    description: item.description[locale],
    price: item.price,
    included: item.included[locale],
    maintenance: item.maintenance ? { amount: item.maintenance.amount, label: item.maintenance.label?.[locale] } : undefined,
    extra: item.extra?.[locale],
    excluded: item.excluded[locale],
    ctaHref: `${contactHref}?topic=package:${item.id}`,
  };
}

export function PricingPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const p = t.pricing;
  const contactHref = href(locale, "contact");
  const cards = pricingPackages.map((item) => toCard(item, locale, contactHref));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: p.catalogTitle,
          url: absoluteUrl(href(locale, "pricing")),
          provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl(href(locale, "home")) },
          itemListElement: pricingPackages.map((item) => ({
            "@type": "Offer",
            name: item.name[locale],
            description: item.description[locale],
            priceCurrency: "USD",
            price: item.price.amount,
            ...(item.price.period === "per-month"
              ? { priceSpecification: { "@type": "UnitPriceSpecification", price: item.price.amount, priceCurrency: "USD", unitText: "MONTH" } }
              : {}),
            ...(item.price.from
              ? { priceSpecification: { "@type": "PriceSpecification", minPrice: item.price.amount, priceCurrency: "USD" } }
              : {}),
          })),
        }}
      />

      <PageHero
        locale={locale}
        eyebrow={p.eyebrow}
        title={p.title}
        intro={p.intro}
        breadcrumbs={[{ label: t.nav.home, href: href(locale, "home") }, { label: t.nav.pricing }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={contactHref} size="lg" arrow>
            {p.requestQuote}
          </ButtonLink>
          <ButtonLink href={`${contactHref}?topic=other`} size="lg" variant="outline-light" arrow>
            {p.discussProject}
          </ButtonLink>
        </div>
      </PageHero>

      {/* Packages */}
      <section className="bg-surface py-16 sm:py-20" aria-labelledby="catalog-title">
        <div className="container-site">
          <SectionHeading id="catalog-title" title={p.catalogTitle} intro={p.catalogIntro} />
          <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => (
              <li key={card.id}>
                <PriceCard data={card} locale={locale} />
              </li>
            ))}
          </ul>

          {/* Extra Google Workspace users */}
          <article
            aria-labelledby="workspace-title"
            className="on-dark bg-circuit mt-10 grid gap-8 rounded-[var(--radius-card)] bg-midnight p-6 text-white shadow-xl sm:p-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-4">
              <p className="eyebrow text-cyan">
                <Mail aria-hidden="true" className="size-4" />
                {p.workspaceEyebrow}
              </p>
              <h2 id="workspace-title" className="mt-3 text-2xl font-extrabold text-white">
                {workspaceUsers.title[locale]}
              </h2>
              <p className="mt-2 text-white/75">{workspaceUsers.description[locale]}</p>
              <p className="mt-6">
                <span className="font-display text-4xl font-extrabold text-white">{formatUsd(workspaceUsers.amount, locale)}</span>{" "}
                <span className="text-sm font-semibold text-white/75">
                  {p.currency} {p.perUserPerMonth}
                </span>
              </p>
            </div>
            <ul className="space-y-3 lg:col-span-8">
              {workspaceUsers.points[locale].map((point) => (
                <li key={point} className="flex gap-3 leading-relaxed text-white/85">
                  <CircleCheck aria-hidden="true" className="mt-1 size-4 shrink-0 text-cyan" />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* General terms */}
      <section className="py-16 sm:py-20" aria-labelledby="terms-title">
        <div className="container-site">
          <SectionHeading id="terms-title" title={p.termsTitle} intro={p.termsIntro} />
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {pricingTerms[locale].map((term, index) => (
              <li key={term} className="flex gap-4 rounded-2xl bg-surface p-5 ring-1 ring-line">
                <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="pt-1 leading-relaxed text-ink">{term}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-16 sm:py-20" aria-labelledby="pricing-faq-title">
        <div className="container-site">
          <SectionHeading id="pricing-faq-title" title={p.faqTitle} />
          <div className="mt-8 max-w-4xl rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-8">
            <FaqList items={pricingFaq[locale]} />
          </div>
        </div>
      </section>

      <CtaBand
        locale={locale}
        title={p.ctaTitle}
        text={p.ctaText}
        buttonLabel={p.requestQuote}
        buttonHref={contactHref}
        secondary={{ label: p.discussProject, href: `${contactHref}?topic=other` }}
      />
    </>
  );
}
