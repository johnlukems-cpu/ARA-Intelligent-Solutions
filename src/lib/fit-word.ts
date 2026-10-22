import type { CSSProperties } from "react";

/** Average advance width of the heading font (Montserrat 800) per character, with headroom. */
const EM_PER_CHAR = 0.65;

/**
 * Words are never hyphenated or split. For headings that can contain long Dutch
 * compounds ("Bedrijfsautomatisering"), this sets `--fit`: the largest font size
 * at which the heading's longest word still fits on one line, given the space
 * the layout reserves around it (container padding, card padding, icons).
 *
 * Use with a capped size class, e.g. `text-[length:min(2.25rem,var(--fit))]`.
 */
export function fitWord(text: string, reservedPx: number): CSSProperties {
  const longest = Math.max(1, ...text.split(/\s+/).map((word) => word.replace(/[^\p{L}\p{N}]/gu, "").length));
  return { "--fit": `calc((100vw - ${reservedPx}px) / ${(longest * EM_PER_CHAR).toFixed(2)})` } as CSSProperties;
}
