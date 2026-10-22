import { cases, hasClientCases } from "@/content/cases";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { CasesExplorer } from "@/components/explorers/cases-explorer";
import { CtaBand } from "@/components/ui/cta-band";
import { Notice } from "@/components/ui/notice";
import { PageHero } from "@/components/ui/page-hero";

export function CasesPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.cases.eyebrow}
        title={t.cases.title}
        intro={t.cases.intro}
        breadcrumbs={[{ label: t.nav.home, href: href(locale, "home") }, { label: t.nav.cases }]}
      />
      <section className="bg-surface py-14 sm:py-20" aria-label={t.cases.title}>
        <div className="container-site">
          {!hasClientCases() ? (
            <Notice tone="warning" className="mb-8">
              {t.cases.honestNotice}
            </Notice>
          ) : null}
          <CasesExplorer items={cases} locale={locale} />
        </div>
      </section>
      <CtaBand locale={locale} title={t.cases.ctaTitle} text={t.cases.ctaText} />
    </>
  );
}
