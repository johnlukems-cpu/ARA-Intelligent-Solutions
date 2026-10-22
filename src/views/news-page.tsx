import { articles, newsCategoryLabels } from "@/content/news";
import { newsCategories } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { toArticleSummaries } from "@/lib/articles";
import { NewsExplorer } from "@/components/explorers/news-explorer";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";

export function NewsPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const summaries = toArticleSummaries(articles, locale);
  const featured = articles.find((a) => a.featured && a.translations[locale]) ?? articles.find((a) => a.translations[locale]);
  const categories = newsCategories.map((value) => ({ value, label: newsCategoryLabels[value][locale] }));

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.news.eyebrow}
        title={t.news.title}
        intro={t.news.intro}
        breadcrumbs={[{ label: t.nav.home, href: href(locale, "home") }, { label: t.nav.news }]}
      />
      <section className="bg-surface py-14 sm:py-20" aria-label={t.news.title}>
        <div className="container-site">
          <NewsExplorer articles={summaries} categories={categories} featuredId={featured?.id} locale={locale} />
        </div>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}
