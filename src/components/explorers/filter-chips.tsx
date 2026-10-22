"use client";

import { cn } from "@/lib/format";

export type ChipOption = { value: string; label: string; count?: number };

/** Accessible single-select filter implemented as toggle buttons. */
export function FilterChips({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: ChipOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold ring-1 transition-colors ring-inset",
              active ? "bg-navy text-white ring-navy" : "bg-white text-navy ring-line hover:ring-electric hover:text-electric-600",
            )}
          >
            {option.label}
            {typeof option.count === "number" ? (
              <span className={cn("rounded-full px-1.5 text-xs", active ? "bg-white/20" : "bg-surface text-muted")}>{option.count}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
