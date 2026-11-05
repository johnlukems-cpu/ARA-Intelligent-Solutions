import type { ServiceCategory } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/format";
import { Icon } from "./icon";

/**
 * Decorative "control panel" for division heroes: the division icon with its
 * four service tiles. Brand-consistent illustration, no stock imagery.
 */
export function DivisionVisual({ category, locale, className }: { category: ServiceCategory; locale: Locale; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative mx-auto w-full max-w-md 2xl:max-w-xl", className)}>
      <div className="absolute -inset-6 -z-10 rounded-full bg-electric/25 blur-3xl" />
      <div className="rounded-[1.75rem] bg-white/[0.06] p-6 ring-1 ring-white/15 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan to-electric text-midnight shadow-[var(--shadow-glow)]">
            <Icon name={category.icon} className="size-6" />
          </span>
          <span className="font-display text-base font-bold text-white">{category.name[locale]}</span>
        </div>
        <ul className="mt-5 grid grid-cols-2 gap-3">
          {category.services.map((service, index) => (
            <li
              key={service.id}
              style={{ animationDelay: `${120 + index * 140}ms` }}
              className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-cyan/25 motion-safe:animate-fade-up"
            >
              <Icon name={service.icon} className="size-6 text-cyan" />
              <p className="mt-3 text-sm leading-snug font-semibold text-white">{service.name[locale]}</p>
              <span className="mt-3 block h-1 w-8 rounded-full bg-cyan/60" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
