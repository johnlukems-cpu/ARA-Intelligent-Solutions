import type { ReactNode } from "react";
import { cn } from "@/lib/format";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, intro, align = "left", tone = "light", as = "h2", id, className }: Props) {
  const Heading = as;
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className={cn("eyebrow mb-3", dark ? "text-cyan" : "text-electric-600", align === "center" && "justify-center")}>
          <span aria-hidden="true" className="h-px w-6 bg-current opacity-60" />
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={cn("text-3xl leading-tight font-extrabold sm:text-4xl", dark ? "text-white" : "text-midnight")}
      >
        {title}
      </Heading>
      {intro ? <div className={cn("mt-4 text-lg leading-relaxed", dark ? "text-white/80" : "text-muted")}>{intro}</div> : null}
    </div>
  );
}
