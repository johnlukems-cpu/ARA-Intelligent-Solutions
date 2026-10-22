import { CircleCheck, FlaskConical, Hammer, Hourglass, Lightbulb, Briefcase, MonitorPlay, Construction } from "lucide-react";
import type { CaseType, ProductStatus } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/format";

const statusStyles: Record<ProductStatus, { className: string; icon: typeof CircleCheck }> = {
  available: { className: "bg-emerald-50 text-success ring-emerald-600/25", icon: CircleCheck },
  beta: { className: "bg-violet-50 text-violet-800 ring-violet-600/25", icon: FlaskConical },
  "in-development": { className: "bg-electric/10 text-electric-600 ring-electric/30", icon: Hammer },
  "coming-soon": { className: "bg-macaw/20 text-midnight ring-macaw-600/30", icon: Hourglass },
};

/** Product status: always text + icon, never color alone. */
export function StatusBadge({ status, locale, className }: { status: ProductStatus; locale: Locale; className?: string }) {
  const t = getDictionary(locale);
  const style = statusStyles[status];
  const StatusIcon = style.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset", style.className, className)}>
      <StatusIcon aria-hidden="true" className="size-3.5" />
      <span>
        <span className="sr-only">{t.products.statusLabel}: </span>
        {t.products.status[status]}
      </span>
    </span>
  );
}

const caseStyles: Record<CaseType, { className: string; icon: typeof CircleCheck }> = {
  client: { className: "bg-emerald-50 text-success ring-emerald-600/25", icon: Briefcase },
  "internal-demo": { className: "bg-violet-50 text-violet-800 ring-violet-600/25", icon: MonitorPlay },
  "in-progress": { className: "bg-electric/10 text-electric-600 ring-electric/30", icon: Construction },
  concept: { className: "bg-macaw/20 text-midnight ring-macaw-600/30", icon: Lightbulb },
};

export function CaseTypeBadge({ type, locale, className }: { type: CaseType; locale: Locale; className?: string }) {
  const t = getDictionary(locale);
  const style = caseStyles[type];
  const TypeIcon = style.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset", style.className, className)}>
      <TypeIcon aria-hidden="true" className="size-3.5" />
      {t.cases.type[type]}
    </span>
  );
}

export function Tag({ children, className, tone = "light" }: { children: React.ReactNode; className?: string; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        tone === "dark" ? "bg-white/10 text-white ring-1 ring-white/20 ring-inset" : "bg-surface text-navy ring-1 ring-line ring-inset",
        className,
      )}
    >
      {children}
    </span>
  );
}
