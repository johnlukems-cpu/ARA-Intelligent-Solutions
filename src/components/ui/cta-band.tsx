import Image from "next/image";
import riverImage from "@/assets/images/suriname-river.webp";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { ButtonLink } from "./button";

/** Closing call-to-action shown before the footer. */
export function CtaBand({
  locale,
  title,
  text,
  buttonLabel,
  buttonHref,
}: {
  locale: Locale;
  title?: string;
  text?: string;
  buttonLabel?: string;
  buttonHref?: string;
}) {
  const t = getDictionary(locale);
  return (
    <section className="on-dark relative isolate overflow-hidden bg-midnight text-white" aria-labelledby="cta-title">
      <Image
        src={riverImage}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center opacity-80"
        placeholder="blur"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-midnight via-midnight/80 to-midnight/20" />
      <div className="container-site flex flex-col items-start gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <div className="max-w-2xl">
          <h2 id="cta-title" className="text-3xl leading-tight font-extrabold text-white sm:text-4xl">
            {title ?? t.home.ctaTitle}
          </h2>
          <p className="mt-3 text-lg text-white/80">{text ?? t.home.ctaText}</p>
        </div>
        <ButtonLink href={buttonHref ?? href(locale, "contact")} size="lg" arrow>
          {buttonLabel ?? t.home.ctaButton}
        </ButtonLink>
      </div>
    </section>
  );
}
