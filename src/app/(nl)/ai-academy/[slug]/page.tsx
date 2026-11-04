import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTrainingBySlug, trainings } from "@/content/academy";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { formatUsd } from "@/lib/price";
import { buildMetadata } from "@/lib/seo";
import { TrainingPage } from "@/views/training-page";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return trainings.map((training) => ({ slug: training.slug["nl"] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const training = getTrainingBySlug("nl", slug);
  if (!training) return {};
  const t = getDictionary("nl");
  const price = `${training.price.from ? `${t.pricing.from} ` : ""}${formatUsd(training.price.amount, "nl")} USD`;
  return buildMetadata({
    locale: "nl",
    title: `${training.name["nl"]} — ${t.academy.brand}`,
    description: `${training.summary["nl"]} ${training.duration["nl"]} · ${price}.`,
    paths: { nl: href("nl", "academy", training.slug.nl), en: href("en", "academy", training.slug.en) },
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const training = getTrainingBySlug("nl", slug);
  if (!training) notFound();
  return <TrainingPage training={training} locale="nl" />;
}
