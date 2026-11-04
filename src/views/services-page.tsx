import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { divisions, serviceCategories } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { divisionHref } from "@/lib/divisions";
import { AiEmployeesTeaser } from "@/components/ai/ai-employees-teaser";
import { DivisionCard } from "@/components/cards/service-card";
import { CtaBand } from "@/components/ui/cta-band";
import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";

export function ServicesPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        intro={t.services.intro}
        breadcrumbs={[{ label: t.nav.home, href: href(locale, "home") }, { label: t.nav.services }]}
      >
        <nav aria-label={t.nav.servicesMenu} className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {divisions.map((division) => (
              <li key={division.id}>
                <Link
                  href={divisionHref(locale, division)}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-white/20"
                >
                  <Icon name={division.icon} className="size-4 text-cyan" />
                  {division.name[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <section className="bg-surface py-16 sm:py-20" aria-labelledby="divisions-title">
        <div className="container-site">
          <SectionHeading id="divisions-title" title={t.services.divisionsTitle} />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {divisions.map((division) => (
              <li key={division.id}>
                <DivisionCard division={division} locale={locale} />
              </li>
            ))}
          </ul>
          <Notice className="mt-10">{t.services.honestNote}</Notice>
        </div>
      </section>

      {/* Quick index of all services per division */}
      <section className="py-16 sm:py-20" aria-labelledby="all-services-title">
        <div className="container-site">
          <SectionHeading id="all-services-title" title={t.services.servicesInCategory} />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {serviceCategories.map((category) => (
              <div key={category.id} className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line">
                <h3 className="flex items-center gap-3 text-lg font-extrabold">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-navy text-cyan">
                    <Icon name={category.icon} className="size-5" />
                  </span>
                  {category.name[locale]}
                </h3>
                <ul className="mt-5 divide-y divide-line">
                  {category.services.map((service) => (
                    <li key={service.id}>
                      <Link
                        href={`${href(locale, "services", category.slug[locale])}#${service.id}`}
                        className="flex items-center justify-between gap-3 py-3 text-sm font-semibold text-midnight hover:text-electric-600"
                      >
                        {service.name[locale]}
                        <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <AiEmployeesTeaser locale={locale} />
          </div>
        </div>
      </section>

      <CtaBand locale={locale} title={t.services.ctaTitle} text={t.services.ctaText} buttonLabel={t.nav.cta} buttonHref={`${href(locale, "contact")}?topic=consultation`} />
    </>
  );
}
