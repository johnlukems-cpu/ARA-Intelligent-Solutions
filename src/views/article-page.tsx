import { CalendarDays, Clock, UserRound } from "lucide-react";
import { absoluteUrl, siteConfig } from "@/config/site";
import { getRelatedArticles, newsCategoryLabels, type ResolvedArticle } from "@/content/news";
import { getServiceCategory } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { toArticleSummaries } from "@/lib/articles";
import { formatDate } from "@/lib/format";
import { ArticleCard } from "@/components/cards/article-card";
import { ArticleBody } from "@/components/ui/article-body";
import { ButtonLink } from "@/components/ui/button";
import { CoverArt } from "@/components/ui/cover-art";
import { JsonLd } from "@/components/ui/json-ld";
import { Notice } from "@/components/ui/notice";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { ShareLinks } from "@/components/ui/share-links";

export function ArticlePage({ resolved, locale }: { resolved: ResolvedArticle; locale: Locale }) {
  const t = getDictionary(locale);
  const { article, translation, contentLocale, isFallback, readingTime } = resolved;
  const path = href(locale, "news", article.slug);
  const date = formatDate(article.publishedAt, locale);
  const related = toArticleSummaries(getRelatedArticles(article, locale, 3), locale);
  const service = article.ctaService ? getServiceCategory(article.ctaService) : undefined;
  const contentLang = contentLocale !== locale ? contentLocale : undefined;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: translation.title,
          description: translation.seo?.description ?? translation.excerpt,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt ?? article.publishedAt,
          inLanguage: contentLocale,
          author: { "@type": "Organization", name: article.author.name },
          publisher: { "@type": "Organization", name: siteConfig.name, logo: { "@type": "ImageObject", url: absoluteUrl("/images/ara-emblem-192.png") } },
          mainEntityOfPage: absoluteUrl(path),
          image: absoluteUrl(article.coverImage ?? siteConfig.ogImage),
        }}
      />
      <PageHero
        locale={locale}
        eyebrow={newsCategoryLabels[article.category][locale]}
        title={translation.title}
        intro={<p lang={contentLang}>{translation.excerpt}</p>}
        lang={contentLang}
        breadcrumbs={[
          { label: t.nav.home, href: href(locale, "home") },
          { label: t.nav.news, href: href(locale, "news") },
          { label: translation.title },
        ]}
      >
        <ul lang={locale} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
          <li className="inline-flex items-center gap-2">
            <UserRound aria-hidden="true" className="size-4 text-cyan" />
            <span>
              {t.common.by} {article.author.name}
              {article.author.role ? <span className="text-white/60"> · {article.author.role[locale]}</span> : null}
            </span>
          </li>
          {date ? (
            <li className="inline-flex items-center gap-2">
              <CalendarDays aria-hidden="true" className="size-4 text-cyan" />
              <span className="sr-only">{t.common.publishedOn} </span>
              <time dateTime={article.publishedAt}>{date}</time>
            </li>
          ) : null}
          <li className="inline-flex items-center gap-2">
            <Clock aria-hidden="true" className="size-4 text-cyan" />
            {readingTime} {t.common.minRead}
          </li>
        </ul>
      </PageHero>

      <div className="bg-surface py-12 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <article className="lg:col-span-8">
            <div className="space-y-4">
              {isFallback ? (
                <Notice tone="warning">
                  {t.news.translationMissing}{" "}
                  <strong>{t.common.onlyAvailableIn(t.common.languageNames[contentLocale])}.</strong>
                </Notice>
              ) : null}
              {article.isDemo ? <Notice>{t.news.demoNotice}</Notice> : null}
            </div>
            <div className="mt-6 overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] ring-1 ring-line">
              <CoverArt icon={article.icon} accent={article.accent} size="lg" className="aspect-[21/9]" />
              <div className="p-6 sm:p-10" lang={contentLang}>
                <ArticleBody blocks={translation.content} />
              </div>
            </div>
          </article>

          <div className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line">
                <ShareLinks url={absoluteUrl(path)} title={translation.title} locale={locale} />
              </div>
              <div className="on-dark bg-circuit rounded-[var(--radius-card)] bg-midnight p-6 text-white shadow-xl">
                <h2 className="text-xl font-extrabold text-white">{t.news.articleCtaTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{t.news.articleCtaText}</p>
                {service ? (
                  <ButtonLink href={href(locale, "services", service.slug[locale])} variant="text-light" className="mt-4" arrow>
                    {service.name[locale]}
                  </ButtonLink>
                ) : null}
                <ButtonLink href={href(locale, "contact")} className="mt-5 w-full" arrow>
                  {t.common.contactUs}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length ? (
        <section className="py-16 sm:py-20" aria-labelledby="related-articles">
          <div className="container-site">
            <SectionHeading id="related-articles" title={t.news.relatedTitle} />
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.id} article={item} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
