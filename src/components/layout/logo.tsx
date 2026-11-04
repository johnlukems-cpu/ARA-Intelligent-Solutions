import Image from "next/image";
import Link from "next/link";
import wordmark from "@/assets/images/ara-wordmark.webp";
import { cn } from "@/lib/format";

/**
 * The ARA logo without the macaw: the original ARA wordmark (image) with
 * "INTELLIGENT SOLUTIONS" and the tagline as live text, so they stay sharp and
 * readable at small sizes. Everything scales with the logo's width (container
 * query units), so the lines always span the wordmark exactly.
 */
export function Logo({
  homeHref,
  label,
  variant = "header",
  className,
}: {
  homeHref: string;
  label: string;
  variant?: "header" | "footer";
  className?: string;
}) {
  const header = variant === "header";
  return (
    <Link
      href={homeHref}
      aria-label={label}
      className={cn(
        "group inline-flex shrink-0 flex-col rounded-lg [container-type:inline-size]",
        header ? "w-[8.75rem] min-[360px]:w-[9.5rem] min-[400px]:w-[11rem] lg:w-[12.5rem]" : "w-[15rem] sm:w-[17rem]",
        className,
      )}
    >
      <Image
        src={wordmark}
        alt=""
        priority={header}
        sizes={header ? "(min-width: 1024px) 200px, 176px" : "(min-width: 640px) 272px, 240px"}
        className="h-auto w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <span aria-hidden="true" className="mt-[3.5cqw] block font-display text-[7.42cqw] leading-none font-extrabold whitespace-nowrap text-white">
        INTELLIGENT <span className="text-cyan">SOLUTIONS</span>
      </span>
      <span
        aria-hidden="true"
        className="mt-[2.6cqw] block font-display text-[4.55cqw] leading-none font-semibold tracking-[0.02em] whitespace-nowrap text-white/90"
      >
        AI <span className="text-cyan">•</span> AUTOMATION <span className="text-cyan">•</span> SOFTWARE{" "}
        <span className="text-cyan">•</span> DIGITAL
      </span>
      <span aria-hidden="true" className="mt-[2.2cqw] block h-px w-full bg-gradient-to-r from-transparent via-electric to-transparent" />
    </Link>
  );
}
