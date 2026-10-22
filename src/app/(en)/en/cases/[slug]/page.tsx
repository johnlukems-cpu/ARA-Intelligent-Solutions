import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cases, getCaseBySlug } from "@/content/cases";
import { href } from "@/i18n/routes";
import { buildMetadata } from "@/lib/seo";
import { CaseDetailPage } from "@/views/case-detail-page";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseBySlug(slug);
  if (!item) return {};
  return buildMetadata({
    locale: "en",
    title: item.title["en"],
    description: item.summary["en"],
    paths: { nl: href("nl", "cases", item.slug), en: href("en", "cases", item.slug) },
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const item = getCaseBySlug(slug);
  if (!item) notFound();
  return <CaseDetailPage item={item} locale="en" />;
}
