import Image from "next/image";
import { Compass, Eye, Globe2, HeartHandshake, MapPin, Scale, ShieldCheck, Target, Crosshair, Rocket } from "lucide-react";
import logoFull from "@/assets/images/ara-logo-full.webp";
import brandCover from "@/assets/images/ara-brand-cover.webp";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";

const valueIcons = [Compass, Scale, Crosshair, Rocket, ShieldCheck];

export function AboutPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const a = t.about;
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={a.eyebrow}
        title={a.title}
        intro={a.intro}
        breadcrumbs={[{ label: t.nav.home, href: href(locale, "home") }, { label: t.nav.about }]}
      />

      {/* Mission & vision */}
      <section className="bg-surface py-16 sm:py-20" aria-label={`${a.missionTitle} & ${a.visionTitle}`}>
        <div className="container-site grid gap-6 md:grid-cols-2">
          <div className="on-dark bg-circuit relative overflow-hidden rounded-[var(--radius-card)] bg-midnight p-8 text-white shadow-xl sm:p-10">
            <Target aria-hidden="true" className="size-8 text-cyan" />
            <h2 className="mt-5 text-2xl font-extrabold text-white">{a.missionTitle}</h2>
            <p className="mt-4 font-display text-xl leading-relaxed font-semibold text-white/90">{a.mission}</p>
          </div>
          <div className="rounded-[var(--radius-card)] bg-white p-8 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-10">
            <Eye aria-hidden="true" className="size-8 text-electric-600" />
            <h2 className="mt-5 text-2xl font-extrabold">{a.visionTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{a.vision}</p>
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section className="py-16 sm:py-20" aria-labelledby="brand-title">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line">
            <Image src={logoFull} alt={a.logoAlt} placeholder="blur" sizes="(min-width: 1024px) 45vw, 100vw" className="h-auto w-full" />
          </div>
          <div>
            <SectionHeading id="brand-title" eyebrow="ARA" title={a.brandTitle} />
            <p className="mt-5 text-lg leading-relaxed text-muted">{a.brandText}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={a.brandTitle}>
              {a.qualities.map((quality) => (
                <li key={quality} className="rounded-full bg-surface px-3 py-1.5 text-sm font-semibold text-navy ring-1 ring-line">
                  {quality}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface py-16 sm:py-20" aria-labelledby="values-title">
        <div className="container-site">
          <SectionHeading id="values-title" title={a.valuesTitle} align="center" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {a.values.map((value, index) => {
              const ValueIcon = valueIcons[index] ?? Compass;
              return (
                <li key={value.title} className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-midnight text-cyan">
                    <ValueIcon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{value.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{value.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Approach to AI */}
      <section className="on-dark bg-hero-glow relative overflow-hidden text-white" aria-labelledby="approach-title">
        <div aria-hidden="true" className="bg-circuit absolute inset-0" />
        <div className="container-site relative grid gap-10 py-16 sm:py-20 lg:grid-cols-2">
          <div>
            <SectionHeading id="approach-title" title={a.approachTitle} tone="dark" />
            <ol className="mt-8 space-y-5">
              {a.approach.map((item, index) => (
                <li key={item} className="flex gap-4">
                  <span aria-hidden="true" className="font-display text-2xl font-extrabold text-cyan">
                    {index + 1}.
                  </span>
                  <p className="pt-1 text-lg leading-relaxed text-white/85">{item}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-white/15">
            <Image
              src={brandCover}
              alt={a.bannerAlt}
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-full min-h-72 w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Suriname, international, responsible */}
      <section className="py-16 sm:py-20" aria-label={a.surinameTitle}>
        <div className="container-site grid gap-6 md:grid-cols-3">
          {[
            { icon: MapPin, title: a.surinameTitle, text: a.surinameText },
            { icon: Globe2, title: a.internationalTitle, text: a.internationalText },
            { icon: HeartHandshake, title: a.responsibleTitle, text: a.responsibleText },
          ].map(({ icon: CardIcon, title, text }) => (
            <div key={title} className="rounded-[var(--radius-card)] bg-white p-7 shadow-[var(--shadow-card)] ring-1 ring-line">
              <CardIcon aria-hidden="true" className="size-7 text-electric-600" />
              <h2 className="mt-4 text-xl font-extrabold">{title}</h2>
              <span aria-hidden="true" className="accent-bar mt-3" />
              <p className="mt-4 leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
        <div className="container-site mt-12 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={href(locale, "services")} variant="secondary" arrow>
            {t.home.primaryCta}
          </ButtonLink>
          <ButtonLink href={href(locale, "cases")} variant="outline" arrow>
            {t.nav.cases}
          </ButtonLink>
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
