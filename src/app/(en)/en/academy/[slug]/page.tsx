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
  return trainings.map((training) => ({ slug: training.slug["en"] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const training = getTrainingBySlug("en", slug);
  if (!training) return {};
  const t = getDictionary("en");
  const price = training.price
    ? `${training.price.from ? `${t.pricing.from} ` : ""}${formatUsd(training.price.amount, "en")} USD`
    : t.academy.priceOnRequest;
  return buildMetadata({
    locale: "en",
    title: `${training.name["en"]} — ${t.academy.brand}`,
    description: `${training.summary["en"]} ${training.duration["en"]} · ${price}.`,
    paths: { nl: href("nl", "academy", training.slug.nl), en: href("en", "academy", training.slug.en) },
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const training = getTrainingBySlug("en", slug);
  if (!training) notFound();
  return <TrainingPage training={training} locale="en" />;
}
