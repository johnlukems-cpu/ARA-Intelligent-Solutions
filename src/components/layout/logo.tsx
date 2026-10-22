import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/ara-logo-dark.webp";
import { cn } from "@/lib/format";

/**
 * The complete ARA logo (macaw emblem, ARA wordmark, INTELLIGENT SOLUTIONS),
 * in its transparent variant for dark backgrounds. Sized by height (header) or
 * width (footer); the intrinsic aspect ratio is always preserved.
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
    <Link href={homeHref} aria-label={label} className={cn("group inline-flex shrink-0 items-center rounded-lg", className)}>
      <Image
        src={logo}
        alt=""
        priority={header}
        sizes={header ? "(min-width: 1024px) 160px, 125px" : "(min-width: 640px) 320px, 270px"}
        className={cn(
          "h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]",
          header ? "w-[7.75rem] lg:w-[9.5rem]" : "w-[16.5rem] sm:w-[20rem]",
        )}
      />
    </Link>
  );
}
