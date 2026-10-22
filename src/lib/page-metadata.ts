import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href, type RouteKey } from "@/i18n/routes";
import { buildMetadata } from "./seo";

export const viewport: Viewport = {
  themeColor: "#06172E",
  width: "device-width",
  initialScale: 1,
};

/** Metadata shared by every page in a language tree. */
export function rootMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t.meta.defaultTitle, template: `%s | ${siteConfig.name}` },
    description: t.meta.defaultDescription,
    applicationName: siteConfig.name,
    formatDetection: { telephone: false },
  };
}

/** Metadata for a static (non-dynamic) route. */
export function staticPageMetadata(locale: Locale, key: RouteKey, title: string | undefined, description: string): Metadata {
  return buildMetadata({
    locale,
    title,
    description,
    paths: { nl: href("nl", key), en: href("en", key) },
    absoluteTitle: key === "home",
  });
}
