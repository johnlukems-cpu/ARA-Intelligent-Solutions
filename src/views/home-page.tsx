import Image from "next/image";
import { Gem, Lightbulb, Layers, Users, Target, Workflow, Sparkles, TrendingUp } from "lucide-react";
import robotHero from "@/assets/images/robot-hero.webp";
import robotOffice from "@/assets/images/robot-office.webp";
import { absoluteUrl, siteConfig } from "@/config/site";
import { getLatestArticles } from "@/content/news";
import { getFeaturedProducts, hasSampleProducts, hasUnreleasedProducts } from "@/content/products";
import { divisions } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { toArticleSummaries } from "@/lib/articles";
import { AiEmployeesTeaser } from "@/components/ai/ai-employees-teaser";
import { ArticleCard } from "@/components/cards/article-card";
import { ProductCard } from "@/components/cards/product-card";
import { DivisionCard } from "@/components/cards/service-card";
import { ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { JsonLd } from "@/components/ui/json-ld";
import { Notice } from "@/components/ui/notice";
import { SectionHeading } from "@/components/ui/section-heading";

const heroPointIcons = [Workflow, Sparkles, TrendingUp];
const whyIcons = [Gem, Lightbulb, Layers, Users, Target];

function splitLastWord(text: string): [string, string] {
  const index = text.lastIndexOf(" ");
  return index === -1 ? ["", text] : [text.slice(0, index + 1), text.slice(index + 1)];
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const [headlineStart, headlineEnd] = splitLastWord(t.home.headline);
  const products = getFeaturedProducts(3);
  const articles = toArticleSummaries(getLatestArticles(locale, 3), locale);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          slogan: siteConfig.tagline,
          url: absoluteUrl(href(locale, "home")),
          logo: absoluteUrl("/images/ara-emblem-192.png"),
          description: t.meta.defaultDescription,
          address: { "@type": "PostalAddress", addressCountry: "SR" },
          areaServed: ["SR", "Worldwide"],
          knowsAbout: ["Artificial intelligence", "Business process automation", "Software development", "Web development", "System integration"],
          ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
          ...(Object.values(siteConfig.social).some(Boolean) ? { sameAs: Object.values(siteConfig.social).filter(Boolean) } : {}),
        }}
      />

      {/* Hero */}
      <section className="on-dark bg-hero-glow relative isolate overflow-hidden text-white" aria-labelledby="hero-title">
        <div aria-hidden="true" className="bg-circuit absolute inset-0 -z-10 opacity-80" />
        <div className="container-site grid items-center gap-10 pt-12 pb-16 lg:grid-cols-12 lg:gap-8 lg:pt-16 lg:pb-24">
          <div className="motion-safe:animate-fade-up lg:col-span-6">
            <p className="eyebrow text-cyan">
              <span aria-hidden="true" className="h-px w-6 bg-current opacity-60" />
              {t.home.eyebrow}
            </p>
            <p lang="en" className="mt-6 font-display text-lg font-semibold text-white/90 sm:text-xl">
              {siteConfig.tagline}
            </p>
            <h1 id="hero-title" className="mt-3 text-4xl leading-[1.08] font-extrabold text-white sm:text-5xl xl:text-6xl">
              {headlineStart}
              <span className="text-gradient">{headlineEnd}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">{t.home.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={href(locale, "services")} size="lg" arrow>
                {t.home.primaryCta}
              </ButtonLink>
              <ButtonLink href={href(locale, "contact")} size="lg" variant="outline-light" arrow>
                {t.home.secondaryCta}
              </ButtonLink>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/80">
              {t.home.heroPoints.map((point, index) => {
                const PointIcon = heroPointIcons[index] ?? Sparkles;
                return (
                  <li key={point} className="inline-flex items-center gap-2">
                    <PointIcon aria-hidden="true" className="size-4 text-cyan" />
                    {point}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* The ARA robot with its own office background; only the outer edges fade
              into the hero. Intrinsic 3:2 ratio, never cropped. */}
          <figure className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none">
            <div aria-hidden="true" className="absolute inset-[6%] -z-10 rounded-full bg-electric/30 blur-3xl" />
            <Image
              src={robotHero}
              alt={t.home.heroImageAlt}
              priority
              placeholder="blur"
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, (min-width: 640px) 36rem, 100vw"
              className="h-auto w-full object-contain"
            />
            <figcaption className="relative -mt-4 pr-[6%] text-right font-display text-base font-semibold text-white italic drop-shadow-[0_2px_8px_rgb(6_23_46/0.9)] sm:-mt-6 sm:text-lg">
              {t.home.signature}
              <span aria-hidden="true" className="mt-2 ml-auto block h-0.5 w-16 rounded-full bg-macaw" />
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Services */}
      <section className="bg-surface py-20 sm:py-24" aria-labelledby="services-title">
        <div className="container-site">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading id="services-title" eyebrow={t.home.servicesEyebrow} title={t.home.servicesTitle} />
            <p className="max-w-md text-muted lg:text-right">{t.home.servicesIntro}</p>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {divisions.map((division) => (
              <li key={division.id}>
                <DivisionCard division={division} locale={locale} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ARA AI Medewerkers */}
      <section className="bg-surface pb-20 sm:pb-24" aria-label={t.aiEmployees.brand}>
        <div className="container-site">
          <AiEmployeesTeaser locale={locale} />
        </div>
      </section>

      {/* Approach */}
      <section className="on-dark bg-navy text-white" aria-labelledby="approach-title">
        <div className="container-site py-16 sm:py-20">
          <SectionHeading id="approach-title" eyebrow={t.home.approachEyebrow} title={t.home.approachTitle} tone="dark" />
          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:divide-x md:divide-white/10">
            {t.home.approach.map((step, index) => (
              <li key={step.title} className="flex gap-4 md:px-6 md:first:pl-0">
                <span className="font-display text-4xl leading-none font-extrabold text-cyan" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/75">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 sm:py-24" aria-labelledby="products-title">
        <div className="container-site">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading id="products-title" eyebrow={t.home.productsEyebrow} title={t.home.productsTitle} intro={t.home.productsIntro} />
            <ButtonLink href={href(locale, "products")} variant="outline" arrow>
              {t.home.productsCta}
            </ButtonLink>
          </div>
          {hasSampleProducts() ? (
            <Notice tone="warning" className="mt-8">
              {t.products.sampleNotice}
            </Notice>
          ) : hasUnreleasedProducts() ? (
            <Notice className="mt-8">{t.products.unreleasedNotice}</Notice>
          ) : null}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* About + Why ARA */}
      <section className="bg-surface py-20 sm:py-24" aria-labelledby="about-title">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="on-dark relative isolate overflow-hidden rounded-[2rem] bg-midnight text-white shadow-xl lg:col-span-7">
            <Image
              src={robotOffice}
              alt={t.home.aboutImageAlt}
              placeholder="blur"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="h-auto w-full"
            />
            <div className="p-8 sm:p-10">
              <p className="eyebrow text-cyan">{t.home.aboutEyebrow}</p>
              <h2 id="about-title" className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                {t.home.aboutTitle}
              </h2>
              <p className="mt-4 leading-relaxed text-white/80">{t.home.aboutText}</p>
              <ButtonLink href={href(locale, "about")} className="mt-7" arrow>
                {t.home.aboutCta}
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-5 lg:pl-4">
            <h2 className="text-2xl font-extrabold">
              {t.home.whyEyebrow} <span className="block text-lg font-bold text-electric-600">{t.home.whyTitle}</span>
            </h2>
            <ul className="mt-8 space-y-6">
              {t.home.why.map((item, index) => {
                const WhyIcon = whyIcons[index] ?? Gem;
                return (
                  <li key={item.title} className="flex gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-electric-600 shadow-sm ring-1 ring-line">
                      <WhyIcon aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-bold text-midnight">{item.title}</h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted">{item.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-10 border-l-4 border-macaw pl-4 font-display text-xl font-semibold text-navy italic">{t.home.localRoots}</p>
          </div>
        </div>
      </section>

      {/* News */}
      {articles.length ? (
        <section className="py-20 sm:py-24" aria-labelledby="news-title">
          <div className="container-site">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading id="news-title" eyebrow={t.home.newsEyebrow} title={t.home.newsTitle} intro={t.home.newsIntro} />
              <ButtonLink href={href(locale, "news")} variant="outline" arrow>
                {t.home.newsCta}
              </ButtonLink>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand locale={locale} />
    </>
  );
}
