import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/format";

export type ButtonVariant = "primary" | "secondary" | "outline" | "outline-light" | "text" | "text-light";
type ButtonSize = "md" | "lg" | "sm";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-cyan text-midnight shadow-[0_8px_24px_-10px_rgb(0_213_232/0.8)] hover:bg-cyan-300 hover:shadow-[0_10px_30px_-8px_rgb(0_213_232/0.9)]",
  secondary: "bg-navy text-white hover:bg-navy-700 shadow-sm",
  outline: "border-2 border-navy/15 text-navy hover:border-electric hover:text-electric-600 bg-white",
  "outline-light": "border-2 border-white/40 text-white hover:border-cyan hover:text-cyan",
  text: "px-0! py-0! text-electric-600 hover:text-navy rounded-md",
  "text-light": "px-0! py-0! text-cyan hover:text-white rounded-md",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-6 py-3.5 text-base",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

function Content({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      {children}
      {arrow ? (
        <ArrowRight aria-hidden="true" className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : null}
    </>
  );
}

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

/** Internal navigation styled as a button. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  arrow,
  children,
  className,
  ...rest
}: CommonProps & Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children">) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} {...rest}>
      <Content arrow={arrow}>{children}</Content>
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  arrow,
  children,
  className,
  type = "button",
  ...rest
}: CommonProps & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      <Content arrow={arrow}>{children}</Content>
    </button>
  );
}
