import Link from "next/link";
import { ArrowRight, CircleCheck, CircleMinus, Clock, Info, Wrench } from "lucide-react";
import type { IconName } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/format";
import { formatUsd } from "@/lib/price";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export type PricePeriod = "one-time" | "per-month" | "per-project" | "per-person" | "per-group";

export type PriceCardData = {
  id: string;
  icon: IconName;
  name: string;
  tag?: string;
  description: string;
  /** Short line about who it is for. */
  audience?: string;
  price: { amount: number; from?: boolean; period: PricePeriod };
  /** Optional duration line shown under the price (e.g. trainings). */
  duration?: string;
  included: string[];
  includedTitle?: string;
  examples?: string[];
  examplesTitle?: string;
  maintenance?: { amount: number; from?: boolean; label?: string };
  extra?: string;
  excluded?: string[];
  note?: string;
  ctaHref: string;
  ctaLabel?: string;
  /** Optional secondary text link (e.g. to a detail page). */
  secondary?: { href: string; label: string };
  highlight?: boolean;
};

/** One package with price, inclusions, maintenance, exclusions and a quote button. */
export function PriceCard({ data, locale, headingLevel = "h3" }: { data: PriceCardData; locale: Locale; headingLevel?: "h2" | "h3" }) {
  const t = getDictionary(locale).pricing;
  const Heading = headingLevel;
  const periodLabel = t.period[data.price.period];
  return (
    <article
      aria-labelledby={`pkg-${data.id}`}
      className={cn(
        "flex h-full flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 sm:p-7",
        data.highlight ? "ring-2 ring-electric" : "ring-line",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-midnight text-cyan shadow-[var(--shadow-glow)]">
          <Icon name={data.icon} className="size-6" />
        </span>
        {data.tag ? (
          <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-navy ring-1 ring-line ring-inset">{data.tag}</span>
        ) : null}
      </div>
      <Heading id={`pkg-${data.id}`} className="mt-5 text-xl leading-snug font-extrabold">
        {data.name}
      </Heading>
      <p className="mt-2 leading-relaxed text-muted">{data.description}</p>
      {data.audience ? <p className="mt-2 text-sm font-medium text-electric-600">{data.audience}</p> : null}

      <p className="mt-5 border-y border-line py-4">
        {data.price.from ? <span className="block text-sm font-semibold text-muted">{t.from}</span> : null}
        <span className="font-display text-4xl font-extrabold text-midnight">{formatUsd(data.price.amount, locale)}</span>{" "}
        <span className="text-sm font-semibold text-muted">
          {t.currency} {periodLabel}
        </span>
        {data.duration ? (
          <span className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-navy">
            <Clock aria-hidden="true" className="size-4 text-electric-600" />
            {data.duration}
          </span>
        ) : null}
      </p>

      <div className="mt-5">
        <p className="text-sm font-bold text-midnight">{data.includedTitle ?? t.included}</p>
        <ul className="mt-2 space-y-2">
          {data.included.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink">
              <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {data.examples?.length ? (
        <div className="mt-5">
          <p className="text-sm font-bold text-midnight">{data.examplesTitle}</p>
          <ul className="mt-2 space-y-1.5">
            {data.examples.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {data.maintenance ? (
        <p className="mt-5 flex items-start gap-2 rounded-xl bg-surface px-3 py-2.5 text-sm text-ink">
          <Wrench aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric-600" />
          <span>
            <strong className="text-midnight">{t.maintenance}</strong>
            {data.maintenance.label ? ` (${data.maintenance.label})` : ""}:{" "}
            {data.maintenance.from ? `${t.from.toLowerCase()} ` : ""}
            {formatUsd(data.maintenance.amount, locale)} {t.perMonth}
          </span>
        </p>
      ) : null}
      {data.extra ? (
        <p className="mt-3 flex items-start gap-2 text-sm text-ink">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-electric-600" />
          {data.extra}
        </p>
      ) : null}

      {data.excluded?.length ? (
        <div className="mt-5">
          <p className="text-sm font-bold text-midnight">{t.excluded}</p>
          <ul className="mt-2 space-y-1.5">
            {data.excluded.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted">
                <CircleMinus aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {data.note ? <p className="mt-4 text-sm font-medium text-midnight">{data.note}</p> : null}

      <div className="mt-auto pt-6">
        <ButtonLink
          href={data.ctaHref}
          variant={data.highlight ? "primary" : "secondary"}
          className="w-full text-center whitespace-normal!"
          arrow
        >
          {data.ctaLabel ?? t.requestQuote}
        </ButtonLink>
        {data.secondary ? (
          <Link
            href={data.secondary.href}
            className="mt-3 flex items-center justify-center gap-1.5 rounded-md py-1 text-sm font-semibold text-electric-600 hover:text-navy"
          >
            {data.secondary.label}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
