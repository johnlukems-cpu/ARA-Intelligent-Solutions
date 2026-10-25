import type { FaqItem } from "@/content/types";

/** Accessible FAQ list using native disclosure elements (works without JavaScript). */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line">
      {items.map((item) => (
        <details key={item.question} className="group py-4 first:pt-0 last:pb-0">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded font-semibold text-midnight [&::-webkit-details-marker]:hidden">
            {item.question}
            <span aria-hidden="true" className="text-xl leading-none text-electric-600 transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
