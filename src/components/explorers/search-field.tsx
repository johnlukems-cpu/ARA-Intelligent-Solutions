"use client";

import { Search, X } from "lucide-react";
import { useId } from "react";

export function SearchField({
  label,
  placeholder,
  value,
  onChange,
  clearLabel,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  clearLabel: string;
}) {
  const id = useId();
  return (
    <div className="relative w-full md:max-w-sm">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        maxLength={100}
        className="w-full rounded-full border border-line bg-white py-3 pr-11 pl-11 text-ink shadow-sm placeholder:text-muted/80 focus:border-electric focus:outline-none focus-visible:ring-4 focus-visible:ring-electric/20 [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute top-1/2 right-2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-midnight"
        >
          <X aria-hidden="true" className="size-4" />
          <span className="sr-only">{clearLabel}</span>
        </button>
      ) : null}
    </div>
  );
}
