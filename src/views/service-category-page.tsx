import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import robotProcess from "@/assets/images/robot-ai-process.webp";
import { absoluteUrl, siteConfig } from "@/config/site";
import { divisions } from "@/content/services";
import type { ServiceCategory } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { contactTopicLabels } from "@/lib/contact-topic-labels";
import { getContactTopicGroups } from "@/lib/contact-topics";
import { AiEmployeesTeaser } from "@/components/ai/ai-employees-teaser";
import { ServiceBlock } from "@/components/cards/service-block";
import { DivisionCard } from "@/components/cards/service-card";
import { ContactForm } from "@/components/forms/contact-form";
import { ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { DivisionVisual } from "@/components/ui/division-visual";
import { FaqList } from "@/components/ui/faq-list";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";

const FORM_ANCHOR = "offerte";

/** Page for one ARA service division (AI Solutions, Digital Solutions, IT & Business Technology). */
export function ServiceCategoryPage({ category, locale }: { category: ServiceCategory; locale: Locale }) {
  const t = getDictionary(locale);
  const s = t.services;
  const others = divisions.filter((division) => division.id !== category.id);
  const firstService = category.services[0]?.id;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: category.name[locale],
          description: category.positioning[locale],
          url: absoluteUrl(href(locale, "services", category.slug[locale])),
          areaServed: ["SR", "Worldwide"],
          provider: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl(href(locale, "home")) },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: category.name[locale],
            itemListElement: category.services.map((service) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: service.name[locale], description: service.description[locale] },
            })),
          },
        }}
      />

      {/* 1–3. Hero, description and visual */}
      <PageHero
        locale={locale}
        eyebrow={category.name[locale]}
        title={category.positioning[locale]}
        intro={category.intro[locale]}
        breadcrumbs={[
          { label: t.nav.home, href: href(locale, "home") },
          { label: t.nav.services, href: href(locale, "services") },
          { label: category.name[locale] },
        ]}
        aside={
          category.id === "ai-solutions" ? (
            <div className="relative mx-auto w-full max-w-lg">
              <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-full bg-electric/25 blur-3xl" />
              <Image
                src={robotProcess}
                alt={t.aiEmployees.heroImageAlt}
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-auto w-full rounded-[1.75rem] shadow-2xl ring-1 ring-white/15"
              />
            </div>
          ) : (
            <DivisionVisual category={category} locale={locale} />
          )
        }
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={`#${FORM_ANCHOR}`} size="lg" arrow>
            {category.cta[locale]}
          </ButtonLink>
          <ButtonLink href="#diensten-overzicht" size="lg" variant="outline-light" arrow>
            {s.servicesInCategory}
          </ButtonLink>
        </div>
      </PageHero>

      {/* 4. Services overview */}
      <section id="diensten-overzicht" className="scroll-mt-28 bg-surface py-16 sm:py-20" aria-labelledby="category-services">
        <div className="container-site">
          <SectionHeading id="category-services" eyebrow={category.shortName[locale]} title={s.servicesInCategory} />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {category.services.map((service) => (
              <ServiceBlock key={service.id} service={service} locale={locale} />
            ))}
          </div>
          {category.id === "ai-solutions" ? (
            <div className="mt-10">
              <AiEmployeesTeaser locale={locale} />
            </div>
          ) : null}
        </div>
      </section>

      {/* 5. Real-world applications */}
      <section className="py-16 sm:py-20" aria-labelledby="applications-title">
        <div className="container-site">
          <SectionHeading id="applications-title" title={s.applicationsTitle} />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {category.applications[locale].map((item, index) => (
              <li key={item.title} className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line">
                <span aria-hidden="true" className="font-display text-3xl font-extrabold text-electric-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Benefits and outcomes (+ important note) */}
      <section className="on-dark bg-hero-glow relative isolate overflow-hidden text-white" aria-labelledby="benefits-title">
        <div aria-hidden="true" className="bg-circuit absolute inset-0 -z-10 opacity-80" />
        <div className="container-site py-16 sm:py-20">
          <SectionHeading id="benefits-title" title={s.benefitsTitle} tone="dark" />
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {category.benefits[locale].map((item) => (
              <li key={item.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-1.5 leading-relaxed text-white/80">{item.text}</p>
              </li>
            ))}
          </ul>
          {category.note ? (
            <div className="mt-8 flex gap-4 rounded-2xl bg-macaw/10 p-6 ring-1 ring-macaw/40">
              <ShieldCheck aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-macaw" />
              <div>
                <h3 className="text-lg font-bold text-white">{category.note.title[locale]}</h3>
                <p className="mt-1.5 leading-relaxed text-white/85">{category.note.text[locale]}</p>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* 7. Working process */}
      <section className="py-16 sm:py-20" aria-labelledby="process-title">
        <div className="container-site">
          <SectionHeading id="process-title" title={s.processTitle} />
          <ol
            className={
              "mt-10 grid gap-6 sm:grid-cols-2 " +
              (category.process[locale].length > 5 ? "lg:grid-cols-4 xl:grid-cols-7" : category.process[locale].length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4")
            }
          >
            {category.process[locale].map((step, index) => (
              <li key={step.title} className="relative">
                <span className="flex size-10 items-center justify-center rounded-full bg-navy font-display font-bold text-white">{index + 1}</span>
                <h3 className="mt-4 font-bold">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="bg-surface py-16 sm:py-20" aria-labelledby="division-faq-title">
        <div className="container-site">
          <SectionHeading id="division-faq-title" title={s.faqTitle} />
          <div className="mt-8 max-w-4xl rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-8">
            <FaqList items={category.faq[locale]} />
          </div>
        </div>
      </section>

      {/* 9. Call to action */}
      <CtaBand locale={locale} title={t.home.ctaTitle} text={t.home.ctaText} buttonLabel={category.cta[locale]} buttonHref={`#${FORM_ANCHOR}`} />

      {/* 10. Quotation / contact form */}
      <section id={FORM_ANCHOR} className="scroll-mt-28 py-16 sm:py-20" aria-labelledby="division-form-title">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-10 lg:col-span-8">
            <SectionHeading id="division-form-title" title={s.formTitle} intro={s.formIntro} />
            <div className="mt-8">
              <ContactForm
                locale={locale}
                topicGroups={getContactTopicGroups(locale, contactTopicLabels(locale))}
                privacyHref={href(locale, "privacy")}
                defaultTopic={firstService}
              />
            </div>
          </div>
          <div className="lg:col-span-4">
            <h2 className="text-xl font-extrabold">{s.otherCategories}</h2>
            <ul className="mt-5 grid gap-5">
              {others.map((division) => (
                <li key={division.id}>
                  <DivisionCard division={division} locale={locale} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
