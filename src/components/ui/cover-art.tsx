import type { Accent, IconName } from "@/content/types";
import { cn } from "@/lib/format";
import { Icon } from "./icon";

const accents: Record<Accent, { glow: string; ring: string; icon: string }> = {
  cyan: { glow: "rgb(0 213 232 / 0.45)", ring: "ring-cyan/40", icon: "text-cyan" },
  blue: { glow: "rgb(8 124 240 / 0.55)", ring: "ring-electric/50", icon: "text-[#5fb2ff]" },
  yellow: { glow: "rgb(255 201 40 / 0.35)", ring: "ring-macaw/40", icon: "text-macaw" },
  navy: { glow: "rgb(58 168 255 / 0.35)", ring: "ring-white/25", icon: "text-white" },
};

/**
 * Generated brand artwork used when no photo is available, so cards never show
 * broken or missing images. Purely decorative.
 */
export function CoverArt({
  icon,
  accent,
  className,
  size = "md",
}: {
  icon: IconName;
  accent: Accent;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const style = accents[accent];
  return (
    <div
      aria-hidden="true"
      className={cn("bg-circuit relative isolate flex items-center justify-center overflow-hidden bg-midnight", className)}
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(70% 90% at 75% 20%, ${style.glow}, transparent 70%), radial-gradient(60% 60% at 10% 100%, rgb(8 124 240 / 0.25), transparent 70%), linear-gradient(160deg, #0a2342, #06172e)`,
        }}
      />
      <svg className="absolute inset-0 -z-10 h-full w-full opacity-40" preserveAspectRatio="none" viewBox="0 0 400 200">
        <path d="M-10 160 C 90 120, 160 190, 260 130 S 380 90, 420 110" fill="none" stroke="url(#g)" strokeWidth="1.5" />
        <path d="M-10 180 C 110 140, 170 200, 270 150 S 390 120, 420 135" fill="none" stroke="url(#g)" strokeWidth="1" opacity="0.6" />
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0" stopColor="#00D5E8" stopOpacity="0" />
            <stop offset="0.5" stopColor="#00D5E8" />
            <stop offset="1" stopColor="#087CF0" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl bg-white/5 ring-1 backdrop-blur-sm",
          style.ring,
          size === "sm" && "size-12",
          size === "md" && "size-20",
          size === "lg" && "size-28",
        )}
      >
        <Icon
          name={icon}
          strokeWidth={1.5}
          className={cn(style.icon, size === "sm" && "size-6", size === "md" && "size-10", size === "lg" && "size-14")}
        />
      </div>
    </div>
  );
}
