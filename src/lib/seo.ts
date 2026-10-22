import type { Metadata } from "next";
import { siteConfig, absoluteUrl } from "@/config/site";
import { ogLocale, type Locale } from "@/i18n/config";

type BuildMetadataInput = {
  locale: Locale;
  title?: string;
  description: string;
  /** Path of this page in each available language. */
  paths: Partial<Record<Locale, string>>;
  image?: { url: string; alt: string };
  type?: "website" | "article";
  publishedTime?: string;
  /** Use the title as-is, without the site name template. */
  absoluteTitle?: boolean;
  noIndex?: boolean;
};

/** Reusable, localized page metadata with canonical and hreflang alternates. */
export function buildMetadata({
  locale,
  title,
  description,
  paths,
  image,
  type = "website",
  publishedTime,
  absoluteTitle,
  noIndex,
}: BuildMetadataInput): Metadata {
  const canonical = paths[locale] ?? "/";
  const languages: Record<string, string> = {};
  if (paths.nl) languages.nl = absoluteUrl(paths.nl);
  if (paths.en) languages.en = absoluteUrl(paths.en);
  if (paths.nl) languages["x-default"] = absoluteUrl(paths.nl);

  const ogImage = image ?? { url: siteConfig.ogImage, alt: siteConfig.name };
  const fullTitle = title ? (absoluteTitle ? title : `${title} | ${siteConfig.name}`) : siteConfig.name;

  return {
    title: title ? (absoluteTitle ? { absolute: title } : title) : undefined,
    description,
    alternates: { canonical: absoluteUrl(canonical), languages },
    openGraph: {
      type,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url: absoluteUrl(canonical),
      locale: ogLocale[locale],
      images: [{ url: ogImage.url, width: 1200, height: 628, alt: ogImage.alt }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
