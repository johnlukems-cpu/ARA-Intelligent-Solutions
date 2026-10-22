import { hasSampleProducts, products } from "@/content/products";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { ProductsExplorer } from "@/components/explorers/products-explorer";
import { CtaBand } from "@/components/ui/cta-band";
import { Notice } from "@/components/ui/notice";
import { PageHero } from "@/components/ui/page-hero";

export function ProductsPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.products.eyebrow}
        title={t.products.title}
        intro={t.products.intro}
        breadcrumbs={[{ label: t.nav.home, href: href(locale, "home") }, { label: t.nav.products }]}
      />
      <section className="bg-surface py-14 sm:py-20" aria-label={t.products.title}>
        <div className="container-site">
          {hasSampleProducts() ? (
            <Notice tone="warning" className="mb-8">
              {t.products.sampleNotice}
            </Notice>
          ) : null}
          <ProductsExplorer products={products} locale={locale} />
        </div>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}
