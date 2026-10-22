import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Compass } from "lucide-react";
import "./globals.css";
import emblem from "@/assets/images/ara-emblem.png";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { href, type RouteKey } from "@/i18n/routes";
import { inter, montserrat } from "./fonts";

export const metadata: Metadata = {
  title: `404 — ${getDictionary("nl").notFound.title} / ${getDictionary("en").notFound.title} | ${siteConfig.name}`,
  robots: { index: false },
};

const quickLinks: RouteKey[] = ["services", "products", "news", "contact"];

/**
 * Served for every URL that matches no route. The site has one root layout
 * per language, so this standalone page is bilingual (Dutch first).
 */
export default function GlobalNotFound() {
  return (
    <html lang="nl" className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        <main className="on-dark bg-hero-glow relative flex min-h-screen flex-col overflow-hidden text-white">
          <div aria-hidden="true" className="bg-circuit absolute inset-0" />
          <div className="container-site relative flex flex-1 flex-col items-center justify-center py-16 text-center">
            <Link href="/" className="inline-flex items-center gap-3 rounded-lg" aria-label={getDictionary("nl").a11y.home}>
              <Image src={emblem} alt="" priority sizes="64px" className="size-16 rounded-full" />
              <span className="font-display text-2xl font-extrabold tracking-[0.12em]">ARA</span>
            </Link>
            <span className="mt-10 flex size-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-cyan/40">
              <Compass aria-hidden="true" className="size-7 text-cyan" />
            </span>
            <p className="text-gradient mt-5 font-display text-6xl font-extrabold">404</p>
            <div className="mt-6 grid w-full max-w-3xl gap-6 md:grid-cols-2">
              {(["nl", "en"] as const).map((locale) => {
                const t = getDictionary(locale);
                return (
                  <section
                    key={locale}
                    lang={locale}
                    className="rounded-[var(--radius-card)] bg-white/5 p-6 text-left ring-1 ring-white/10"
                  >
                    <h1 className="text-2xl font-extrabold text-white">{t.notFound.title}</h1>
                    <p className="mt-2 text-white/80">{t.notFound.text}</p>
                    <Link
                      href={href(locale, "home")}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-cyan px-5 py-2.5 font-semibold text-midnight hover:bg-cyan-300"
                    >
                      {t.notFound.home}
                    </Link>
                    <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                      {quickLinks.map((key) => (
                        <li key={key}>
                          <Link href={href(locale, key)} className="text-white/75 underline-offset-4 hover:text-cyan hover:underline">
                            {t.nav[key as keyof typeof t.nav]}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
