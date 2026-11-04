import { CircleCheck, TriangleAlert, Wrench } from "lucide-react";
import type { ReactNode, RefObject } from "react";
import { cn } from "@/lib/format";
import { Button } from "@/components/ui/button";

/** Shared building blocks for the site's forms (consistent look and a11y). */
export function inputClasses(hasError: boolean) {
  return cn(
    "mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-ink shadow-sm transition-colors placeholder:text-muted/70 focus:outline-none focus-visible:ring-4",
    hasError ? "border-danger focus-visible:ring-danger/20" : "border-line focus:border-electric focus-visible:ring-electric/20",
  );
}

export function FieldLabel({ htmlFor, children, optionalLabel }: { htmlFor: string; children: ReactNode; optionalLabel?: string }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-midnight">
      {children}
      {optionalLabel ? (
        <span className="font-normal text-muted"> ({optionalLabel})</span>
      ) : (
        <span aria-hidden="true" className="text-danger">
          {" "}
          *
        </span>
      )}
    </label>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-danger">
      <TriangleAlert aria-hidden="true" className="size-4 shrink-0" />
      {message}
    </p>
  ) : null;
}

export function FormAlert({ message }: { message?: string }) {
  return message ? (
    <p role="alert" className="flex items-start gap-2 rounded-xl border border-danger/30 bg-red-50 px-4 py-3 text-sm font-medium text-danger">
      <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      {message}
    </p>
  ) : null;
}

/** Shown after a successful submit. In development mode it says plainly that nothing was sent. */
export function SubmissionResult({
  development,
  title,
  text,
  devTitle,
  devText,
  againLabel,
  onAgain,
  focusRef,
}: {
  development: boolean;
  title: string;
  text: string;
  devTitle: string;
  devText: string;
  againLabel: string;
  onAgain: () => void;
  focusRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={focusRef}
      tabIndex={-1}
      role="status"
      className={cn(
        "rounded-[var(--radius-card)] p-8 text-center ring-1 outline-none",
        development ? "bg-macaw/10 ring-macaw/50" : "bg-emerald-50 ring-emerald-600/25",
      )}
    >
      {development ? (
        <Wrench aria-hidden="true" className="mx-auto size-10 text-macaw-600" />
      ) : (
        <CircleCheck aria-hidden="true" className="mx-auto size-10 text-success" />
      )}
      <h3 className="mt-4 text-2xl font-extrabold">{development ? devTitle : title}</h3>
      <p className="mx-auto mt-2 max-w-md text-muted">{development ? devText : text}</p>
      <Button variant="outline" className="mt-6" onClick={onAgain}>
        {againLabel}
      </Button>
    </div>
  );
}
