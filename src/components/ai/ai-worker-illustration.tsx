import { Bot, Hourglass, ListChecks, Mail, Tag } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/format";

const stepIcons = [Mail, Tag, ListChecks, Hourglass];

/** Decorative "AI employee at work" panel. Purely illustrative (aria-hidden). */
export function AiWorkerIllustration({ locale, className }: { locale: Locale; className?: string }) {
  const t = getDictionary(locale).aiEmployees;
  return (
    <div aria-hidden="true" className={cn("relative", className)}>
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-electric/25 blur-3xl" />
      <div className="rounded-[1.75rem] bg-white/[0.06] p-5 ring-1 ring-white/15 backdrop-blur-sm sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan to-electric text-midnight shadow-[var(--shadow-glow)]">
              <Bot className="size-6" />
            </span>
            <span className="font-display text-sm font-bold text-white sm:text-base">{t.illTitle}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan/15 px-2.5 py-1 text-xs font-semibold text-cyan">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-cyan opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-cyan" />
            </span>
            {t.illStatus}
          </span>
        </div>
        <ol className="mt-5 space-y-3">
          {t.illSteps.map((step, index) => {
            const StepIcon = stepIcons[index] ?? ListChecks;
            const waiting = index === t.illSteps.length - 1;
            return (
              <li
                key={step}
                style={{ animationDelay: `${150 + index * 180}ms` }}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 ring-1 motion-safe:animate-fade-up",
                  waiting ? "bg-macaw/10 ring-macaw/40" : "bg-white/[0.04] ring-white/10",
                )}
              >
                <StepIcon className={cn("size-5 shrink-0", waiting ? "text-macaw" : "text-cyan")} />
                <span className={cn("text-sm", waiting ? "font-semibold text-macaw" : "text-white/85")}>{step}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
