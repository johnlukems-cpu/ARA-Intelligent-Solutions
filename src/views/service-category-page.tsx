import { serviceCategories } from "@/content/services";
import type { ServiceCategory } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { AiEmployeesTeaser } from "@/components/ai/ai-employees-teaser";
import { ServiceBlock } from "@/components/cards/service-block";
import { ServiceCategoryCard } from "@/components/cards/service-card";
import { CtaBand } from "@/components/ui/cta-band";
import { Notice } from "@/components/ui/notice";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";

export function ServiceCategoryPage({ category, locale }: { category: ServiceCategory; locale: Locale }) {
  const t = getDictionary(locale);
  const others = serviceCategories.filter((c) => c.id !== category.id);
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.services.eyebrow}
        title={category.name[locale]}
        intro={category.intro[locale]}
        breadcrumbs={[
          { label: t.nav.home, href: href(locale, "home") },
          { label: t.nav.services, href: href(locale, "services") },
          { label: category.name[locale] },
        ]}
      />
      <section className="bg-surface py-16 sm:py-20" aria-labelledby="category-services">
        <div className="container-site">
          <SectionHeading id="category-services" title={t.services.servicesInCategory} />
          <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {category.services.map((service) => (
              <ServiceBlock key={service.id} service={service} locale={locale} />
            ))}
          </div>
          {category.id === "ai" ? (
            <div className="mt-10">
              <AiEmployeesTeaser locale={locale} />
            </div>
          ) : null}
          <Notice className="mt-10">{t.services.honestNote}</Notice>
        </div>
      </section>
      <section className="py-16 sm:py-20" aria-labelledby="other-categories">
        <div className="container-site">
          <SectionHeading id="other-categories" title={t.services.otherCategories} />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <ServiceCategoryCard key={other.id} category={other} locale={locale} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand locale={locale} title={t.services.ctaTitle} text={t.services.ctaText} />
    </>
  );
}
