import Image from "next/image";
import Link from "next/link";
import emblem from "@/assets/images/ara-emblem.png";
import { cn } from "@/lib/format";

/** ARA emblem + typographic wordmark. Crisp at any size and on dark backgrounds. */
export function Logo({
  homeHref,
  label,
  size = "md",
  className,
}: {
  homeHref: string;
  label: string;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <Link href={homeHref} aria-label={label} className={cn("group inline-flex items-center gap-3 rounded-lg", className)}>
      <Image
        src={emblem}
        alt=""
        priority
        sizes={size === "lg" ? "64px" : "48px"}
        className={cn(
          "shrink-0 rounded-full shadow-[0_0_20px_-4px_rgb(0_213_232/0.6)] transition-transform duration-300 group-hover:scale-105",
          size === "lg" ? "size-14" : "size-11",
        )}
      />
      <span className="flex flex-col leading-none" aria-hidden="true">
        <span className={cn("font-display font-extrabold tracking-[0.12em] text-white", size === "lg" ? "text-3xl" : "text-2xl")}>
          AR<span className="text-gradient">A</span>
        </span>
        <span className={cn("mt-1 font-display font-bold tracking-[0.16em] text-white/90", size === "lg" ? "text-[0.7rem]" : "text-[0.6rem]")}>
          INTELLIGENT <span className="text-cyan">SOLUTIONS</span>
        </span>
      </span>
    </Link>
  );
}
