import { legalLastUpdated, legalPages, type LegalPageKey } from "@/content/legal";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { formatDate } from "@/lib/format";
import { Notice } from "@/components/ui/notice";
import { PageHero } from "@/components/ui/page-hero";

export function LegalPage({ page, locale }: { page: LegalPageKey; locale: Locale }) {
  const t = getDictionary(locale);
  const doc = legalPages[page][locale];
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.common.draft}
        title={doc.title}
        intro={doc.intro}
        breadcrumbs={[{ label: t.nav.home, href: href(locale, "home") }, { label: doc.title }]}
      />
      <section className="bg-surface py-14 sm:py-20">
        <div className="container-site">
          <div className="mx-auto max-w-3xl rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-10">
            <Notice tone="warning">{t.legal.draftNotice}</Notice>
            <p className="mt-6 text-sm text-muted">
              {t.legal.lastUpdated}: <time dateTime={legalLastUpdated}>{formatDate(legalLastUpdated, locale)}</time>
            </p>
            <div className="prose-ara mt-4">
              {doc.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="mt-3">
                      {paragraph}
                    </p>
                  ))}
                  {section.list ? (
                    <ul className="mt-3">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
