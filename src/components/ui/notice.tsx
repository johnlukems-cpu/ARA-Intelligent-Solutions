import { Info, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/format";

/** Inline notice used for sample-content, draft and translation messages. */
export function Notice({
  children,
  tone = "info",
  className,
  lang,
}: {
  children: ReactNode;
  tone?: "info" | "warning";
  className?: string;
  lang?: string;
}) {
  const Icon = tone === "warning" ? TriangleAlert : Info;
  return (
    <div
      lang={lang}
      className={cn(
        "flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm leading-relaxed",
        tone === "warning" ? "border-macaw/60 bg-macaw/10 text-midnight" : "border-electric/25 bg-electric/5 text-midnight",
        className,
      )}
    >
      <Icon aria-hidden="true" className={cn("mt-0.5 size-4 shrink-0", tone === "warning" ? "text-macaw-600" : "text-electric-600")} />
      <div>{children}</div>
    </div>
  );
}
