import { SearchX } from "lucide-react";

export function EmptyState({ title, text, action }: { title: string; text: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-[var(--radius-card)] border-2 border-dashed border-line bg-white px-6 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-surface text-electric-600">
        <SearchX aria-hidden="true" className="size-6" />
      </span>
      <h2 className="mt-5 text-xl font-bold">{title}</h2>
      <p className="mt-2 max-w-md text-muted">{text}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
