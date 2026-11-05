import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { ButtonLink } from "@/components/ui/button";
import { AiWorkerIllustration } from "./ai-worker-illustration";

/** Promotional block linking to the ARA AI Medewerkers page. */
export function AiEmployeesTeaser({ locale, headingLevel = "h2" }: { locale: Locale; headingLevel?: "h2" | "h3" }) {
  const t = getDictionary(locale).aiEmployees;
  const Heading = headingLevel;
  return (
    <section
      aria-labelledby="ai-teaser-title"
      className="on-dark bg-hero-glow relative isolate overflow-hidden rounded-[var(--radius-card)] text-white shadow-xl"
    >
      <div aria-hidden="true" className="bg-circuit absolute inset-0 -z-10 opacity-80" />
      <div className="grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow text-macaw">{t.teaserEyebrow}</p>
          <Heading id="ai-teaser-title" className="mt-3 text-2xl leading-tight font-extrabold text-white sm:text-3xl">
            {t.slogan}
          </Heading>
          <p className="mt-4 max-w-xl leading-relaxed text-white/80">{t.teaserText}</p>
          <p className="mt-4 font-display text-lg font-bold text-cyan">{t.teaserFrom}</p>
          <ButtonLink href={href(locale, "aiEmployees")} className="mt-6" arrow>
            {t.teaserCta}
          </ButtonLink>
        </div>
        <AiWorkerIllustration locale={locale} className="mx-auto w-full max-w-sm lg:col-span-5 2xl:max-w-md" />
      </div>
    </section>
  );
}
