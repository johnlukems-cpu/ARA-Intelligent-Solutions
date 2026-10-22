import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceCategoryBySlug, serviceCategories } from "@/content/services";
import { href } from "@/i18n/routes";
import { buildMetadata } from "@/lib/seo";
import { ServiceCategoryPage } from "@/views/service-category-page";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceCategories.map((category) => ({ slug: category.slug["en"] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getServiceCategoryBySlug("en", slug);
  if (!category) return {};
  return buildMetadata({
    locale: "en",
    title: category.seo["en"].title ?? category.name["en"],
    description: category.seo["en"].description ?? category.summary["en"],
    paths: { nl: href("nl", "services", category.slug.nl), en: href("en", "services", category.slug.en) },
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const category = getServiceCategoryBySlug("en", slug);
  if (!category) notFound();
  return <ServiceCategoryPage category={category} locale="en" />;
}
