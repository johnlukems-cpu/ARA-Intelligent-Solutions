import { CircleCheck, Target, Cpu, Flag } from "lucide-react";
import { getServiceCategory } from "@/content/services";
import type { CaseStudy } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { CaseTypeBadge, Tag } from "@/components/ui/badges";
import { ButtonLink } from "@/components/ui/button";
import { CoverArt } from "@/components/ui/cover-art";
import { CtaBand } from "@/components/ui/cta-band";
import { Notice } from "@/components/ui/notice";
import { PageHero } from "@/components/ui/page-hero";

function Block({ icon: BlockIcon, title, children }: { icon: typeof Target; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-8">
      <h2 className="flex items-center gap-3 text-2xl font-extrabold">
        <span className="flex size-10 items-center justify-center rounded-xl bg-midnight text-cyan">
          <BlockIcon aria-hidden="true" className="size-5" />
        </span>
        {title}
      </h2>
      <div className="mt-5 leading-relaxed">{children}</div>
    </section>
  );
}

export function CaseDetailPage({ item, locale }: { item: CaseStudy; locale: Locale }) {
  const t = getDictionary(locale);
  const category = getServiceCategory(item.category);
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.cases.eyebrow}
        title={item.title[locale]}
        intro={item.summary[locale]}
        breadcrumbs={[
          { label: t.nav.home, href: href(locale, "home") },
          { label: t.nav.cases, href: href(locale, "cases") },
          { label: item.title[locale] },
        ]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full bg-white">
            <CaseTypeBadge type={item.type} locale={locale} />
          </span>
          <Tag tone="dark">{category.name[locale]}</Tag>
          {item.year ? <Tag tone="dark">{item.year}</Tag> : null}
        </div>
      </PageHero>

      <div className="bg-surface py-14 sm:py-20">
        <div className="container-site grid gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            {item.type !== "client" ? <Notice tone="warning">{t.cases.typeNotice[item.type]}</Notice> : null}
            <Block icon={Target} title={t.cases.challenge}>
              <p>{item.challenge[locale]}</p>
            </Block>
            <Block icon={CircleCheck} title={t.cases.solution}>
              <ul className="space-y-3">
                {item.solution[locale].map((step) => (
                  <li key={step} className="flex gap-2.5">
                    <CircleCheck aria-hidden="true" className="mt-1 size-4 shrink-0 text-electric-600" />
                    {step}
                  </li>
                ))}
              </ul>
            </Block>
            <Block icon={Flag} title={t.cases.outcome}>
              {item.outcome ? <p>{item.outcome[locale]}</p> : <p className="text-muted">{t.cases.outcomeNotVerified}</p>}
            </Block>
          </div>
          <div className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] ring-1 ring-line">
                <CoverArt icon={item.icon} accent={item.accent} size="lg" className="aspect-[4/3]" />
                <div className="p-6">
                  <h2 className="flex items-center gap-2 text-lg font-bold">
                    <Cpu aria-hidden="true" className="size-5 text-electric-600" />
                    {t.cases.technology}
                  </h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.technology.map((tech) => (
                      <li key={tech}>
                        <Tag>{tech}</Tag>
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href={href(locale, "services", category.slug[locale])} variant="outline" className="mt-6 w-full" arrow>
                    {category.name[locale]}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CtaBand locale={locale} title={t.cases.ctaTitle} text={t.cases.ctaText} />
    </>
  );
}
