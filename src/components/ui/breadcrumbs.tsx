import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { absoluteUrl } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { JsonLd } from "./json-ld";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, locale, tone = "dark" }: { items: Crumb[]; locale: Locale; tone?: "dark" | "light" }) {
  const t = getDictionary(locale);
  const dark = tone === "dark";
  return (
    <>
      <nav aria-label={t.a11y.breadcrumb}>
        <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${dark ? "text-white/70" : "text-muted"}`}>
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                {item.href && !last ? (
                  <Link href={item.href} className={`rounded hover:underline ${dark ? "hover:text-white" : "hover:text-midnight"}`}>
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className={dark ? "text-white" : "text-midnight"}>
                    {item.label}
                  </span>
                )}
                {!last ? <ChevronRight aria-hidden="true" className="size-3.5 opacity-60" /> : null}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            ...(item.href ? { item: absoluteUrl(item.href) } : {}),
          })),
        }}
      />
    </>
  );
}
