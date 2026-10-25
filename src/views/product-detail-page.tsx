import Image from "next/image";
import { CircleCheck, ExternalLink, Users, Sparkles, CircleAlert } from "lucide-react";
import { productCategoryLabels, products } from "@/content/products";
import type { Product } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { ProductCard } from "@/components/cards/product-card";
import { StatusBadge, Tag } from "@/components/ui/badges";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import { ProductVisual } from "@/components/ui/product-visual";
import { FaqList } from "@/components/ui/faq-list";
import { Notice } from "@/components/ui/notice";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";

function Section({ title, children, id }: { title: string; children: React.ReactNode; id: string }) {
  return (
    <section aria-labelledby={id} className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-8">
      <h2 id={id} className="text-2xl font-extrabold">
        {title}
      </h2>
      <span aria-hidden="true" className="accent-bar mt-3" />
      <div className="mt-5">{children}</div>
    </section>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 leading-relaxed">
          <CircleCheck aria-hidden="true" className="mt-1 size-4 shrink-0 text-electric-600" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ProductCta({ product, locale, className }: { product: Product; locale: Locale; className?: string }) {
  const t = getDictionary(locale);
  const { cta } = product;
  if (cta.type === "external") {
    return (
      <a href={cta.url} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary", "lg", className)}>
        {cta.label[locale]}
        <ExternalLink aria-hidden="true" className="size-4" />
        <span className="sr-only">{t.a11y.externalLink}</span>
      </a>
    );
  }
  const released = product.status === "available" || product.status === "beta";
  const label = cta.label?.[locale] ?? (released ? t.products.requestDemo : t.products.stayInformed);
  return (
    <ButtonLink href={`${href(locale, "contact")}?topic=product:${product.slug}`} size="lg" className={className} arrow>
      {label}
    </ButtonLink>
  );
}

export function ProductDetailPage({ product, locale }: { product: Product; locale: Locale }) {
  const t = getDictionary(locale);
  const released = product.status === "available" || product.status === "beta";
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);
  const pricing = product.pricing?.[locale]?.filter((tier) => tier.label && tier.price) ?? [];

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={productCategoryLabels[product.category][locale]}
        title={product.name}
        intro={product.tagline[locale]}
        breadcrumbs={[
          { label: t.nav.home, href: href(locale, "home") },
          { label: t.nav.products, href: href(locale, "products") },
          { label: product.name },
        ]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full bg-white">
            <StatusBadge status={product.status} locale={locale} />
          </span>
          {product.isSample ? <Tag tone="dark">{t.products.conceptBadge}</Tag> : null}
        </div>
      </PageHero>

      <div className="bg-surface py-14 sm:py-20">
        <div className="container-site grid gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            {product.isSample ? <Notice tone="warning">{t.products.sampleNotice}</Notice> : null}
            {!product.isSample && !released ? <Notice>{t.products.unreleasedNotice}</Notice> : null}

            <section aria-label={product.name} className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-8">
              <p className="text-lg font-semibold text-midnight">{product.summary[locale]}</p>
              <div className="mt-4 space-y-4 leading-relaxed">
                {product.description[locale].map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <Section id="problem" title={t.products.problemTitle}>
              <p className="flex gap-3 leading-relaxed">
                <CircleAlert aria-hidden="true" className="mt-1 size-5 shrink-0 text-macaw-600" />
                {product.problem[locale]}
              </p>
            </Section>

            <Section id="features" title={t.products.featuresTitle}>
              <CheckList items={product.features[locale]} />
            </Section>

            <div className="grid gap-8 md:grid-cols-2">
              <Section id="audience" title={t.products.audienceTitle}>
                <ul className="space-y-3">
                  {product.audience[locale].map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Users aria-hidden="true" className="mt-1 size-4 shrink-0 text-electric-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Section>
              <Section id="benefits" title={t.products.benefitsTitle}>
                <ul className="space-y-3">
                  {product.benefits[locale].map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Sparkles aria-hidden="true" className="mt-1 size-4 shrink-0 text-electric-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Section>
            </div>

            {product.screenshots?.length ? (
              <Section id="screenshots" title={t.products.screenshotsTitle}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {product.screenshots.map((shot) => (
                    <Image
                      key={shot.src}
                      src={shot.src}
                      alt={shot.alt[locale]}
                      width={shot.width}
                      height={shot.height}
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="h-auto w-full rounded-xl ring-1 ring-line"
                    />
                  ))}
                </div>
              </Section>
            ) : null}

            {product.faq[locale].length ? (
              <Section id="faq" title={t.products.faqTitle}>
                <FaqList items={product.faq[locale]} />
              </Section>
            ) : null}
          </div>

          <div className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] ring-1 ring-line">
                {product.image ? (
                  <Image
                    src={product.image.src}
                    alt={product.image.alt[locale]}
                    width={product.image.width}
                    height={product.image.height}
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                ) : (
                  <ProductVisual product={product} size="lg" className="aspect-[4/3]" />
                )}
                <div className="p-6">
                  <dl className="space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="font-semibold text-muted">{t.products.statusLabel}</dt>
                      <dd>
                        <StatusBadge status={product.status} locale={locale} />
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="font-semibold text-muted">{t.common.category}</dt>
                      <dd className="text-right font-semibold text-midnight">{productCategoryLabels[product.category][locale]}</dd>
                    </div>
                  </dl>
                  <div className="mt-6 border-t border-line pt-6">
                    <h2 className="text-lg font-bold">{t.products.pricingTitle}</h2>
                    {pricing.length ? (
                      <ul className="mt-3 space-y-2 text-sm">
                        {pricing.map((tier) => (
                          <li key={tier.label} className="flex justify-between gap-4">
                            <span>{tier.label}</span>
                            <span className="font-bold text-midnight">{tier.price}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-sm text-muted">{t.products.pricingUnannounced}</p>
                    )}
                  </div>
                  <div className="mt-6 border-t border-line pt-6">
                    {!released ? <p className="mb-2 text-sm font-semibold text-midnight">{t.products.notAvailableYet}</p> : null}
                    <p className="text-sm text-muted">{t.products.interestText}</p>
                    <ProductCta product={product} locale={locale} className="mt-5 w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length ? (
        <section className="py-16 sm:py-20" aria-labelledby="related-products">
          <div className="container-site">
            <SectionHeading id="related-products" title={t.products.relatedProducts} />
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
