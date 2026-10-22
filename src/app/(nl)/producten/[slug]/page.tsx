import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/content/products";
import { href } from "@/i18n/routes";
import { buildMetadata } from "@/lib/seo";
import { ProductDetailPage } from "@/views/product-detail-page";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;


export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return buildMetadata({
    locale: "nl",
    title: product.seo?.["nl"]?.title ?? `${product.name} — ${product.tagline["nl"]}`,
    description: product.seo?.["nl"]?.description ?? product.summary["nl"],
    paths: { nl: href("nl", "products", product.slug), en: href("en", "products", product.slug) },
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetailPage product={product} locale="nl" />;
}
