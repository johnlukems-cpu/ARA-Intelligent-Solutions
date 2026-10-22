import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceCategories } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { fitWord } from "@/lib/fit-word";
import { ServiceBlock } from "@/components/cards/service-block";
import { CtaBand } from "@/components/ui/cta-band";
import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { PageHero } from "@/components/ui/page-hero";

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
        <nav aria-label={t.services.otherCategories} className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {serviceCategories.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-white/20"
                >
                  <Icon name={category.icon} className="size-4 text-cyan" />
                  {category.name[locale]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="bg-surface py-16 sm:py-20">
        <div className="container-site space-y-20">
          <Notice>{t.services.honestNote}</Notice>
          {serviceCategories.map((category) => (
            <section key={category.id} id={category.id} aria-labelledby={`${category.id}-title`} className="scroll-mt-28">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-navy text-cyan">
                      <Icon name={category.icon} className="size-5" />
                    </span>
                    <h2
                      id={`${category.id}-title`}
                      style={fitWord(category.name[locale], 104)}
                      className="text-[length:min(1.875rem,var(--fit,1.875rem))] font-extrabold"
                    >
                      {category.name[locale]}
                    </h2>
                  </div>
                  <p className="mt-4 text-lg leading-relaxed text-muted">{category.intro[locale]}</p>
                </div>
                <Link
                  href={href(locale, "services", category.slug[locale])}
                  className="inline-flex items-center gap-1.5 font-semibold text-electric-600 hover:text-navy"
                >
                  {t.services.viewCategory}: {category.shortName[locale]}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {category.services.map((service) => (
                  <ServiceBlock key={service.id} service={service} locale={locale} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <CtaBand locale={locale} title={t.services.ctaTitle} text={t.services.ctaText} />
    </>
  );
}
