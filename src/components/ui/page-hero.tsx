import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { fitWord } from "@/lib/fit-word";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

/** Dark, branded header used at the top of every inner page. */
export function PageHero({
  locale,
  eyebrow,
  title,
  intro,
  breadcrumbs,
  children,
  lang,
}: {
  locale: Locale;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  breadcrumbs: Crumb[];
  children?: ReactNode;
  lang?: string;
}) {
  return (
    <section className="on-dark bg-hero-glow relative overflow-hidden text-white">
      <div aria-hidden="true" className="bg-circuit absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute -right-24 -bottom-32 size-[28rem] rounded-full bg-electric/20 blur-3xl"
      />
      <div className="container-site relative pt-10 pb-14 sm:pt-12 sm:pb-20">
        <Breadcrumbs items={breadcrumbs} locale={locale} />
        <div className="mt-8 max-w-3xl motion-safe:animate-fade-up" lang={lang}>
          {eyebrow ? (
            <p className="eyebrow mb-4 text-cyan">
              <span aria-hidden="true" className="h-px w-6 bg-current opacity-60" />
              {eyebrow}
            </p>
          ) : null}
          <h1
            style={fitWord(title, 48)}
            className="text-[length:min(2.25rem,var(--fit,2.25rem))] leading-[1.1] font-extrabold text-white sm:text-[length:min(3rem,var(--fit,3rem))]"
          >
            {title}
          </h1>
          {intro ? <div className="mt-5 text-lg leading-relaxed text-white/80">{intro}</div> : null}
          {children}
        </div>
      </div>
    </section>
  );
}
