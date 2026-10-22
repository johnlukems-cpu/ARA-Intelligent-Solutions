import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Footer } from "./footer";
import { Header } from "./header";

export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getDictionary(locale);
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-cyan px-4 py-2 font-semibold text-midnight focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t.a11y.skipToContent}
      </a>
      <Header locale={locale} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer locale={locale} />
    </>
  );
}
