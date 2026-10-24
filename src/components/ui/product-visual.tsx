import Image from "next/image";
import type { Product, ProductBrand } from "@/content/types";
import { cn } from "@/lib/format";
import { CoverArt } from "./cover-art";

type AppTone = Extract<ProductBrand, { kind: "ara-app" }>["tone"];

const tones: Record<AppTone, { panel: string; bar: string; label: string }> = {
  blue: { panel: "from-[#e8f1ff] via-white to-[#dbeafe]", bar: "bg-[#1d6fe0]", label: "text-[#0b3b8c]" },
  green: { panel: "from-[#e7f8ee] via-white to-[#d6f3e2]", bar: "bg-[#16a34a]", label: "text-[#0d5c2c]" },
  amber: { panel: "from-[#fff5df] via-white to-[#ffedc2]", bar: "bg-[#f59e0b]", label: "text-[#7a4b00]" },
  purple: { panel: "from-[#f2ebff] via-white to-[#e7dcff]", bar: "bg-[#7c3aed]", label: "text-[#4c1d95]" },
};

/**
 * Product visual for cards and the product page: the ARA app lockup (icon +
 * "ARA" + product name, as live text) or the product's own logo. Falls back to
 * generated artwork for products without a brand.
 */
export function ProductVisual({ product, size = "md", className }: { product: Product; size?: "md" | "lg"; className?: string }) {
  const brand = product.brand;
  if (!brand) {
    return <CoverArt icon={product.icon} accent={product.accent} size={size} className={className} />;
  }

  if (brand.kind === "logo") {
    return (
      <div aria-hidden="true" className={cn("flex items-center justify-center bg-gradient-to-br from-[#f4f8fc] via-white to-[#fff3e6] p-6", className)}>
        <Image
          src={brand.src}
          alt=""
          width={brand.width}
          height={brand.height}
          sizes={size === "lg" ? "260px" : "180px"}
          className={cn("h-auto w-auto object-contain", size === "lg" ? "max-h-56 max-w-[16rem]" : "max-h-36 max-w-[11rem]")}
        />
      </div>
    );
  }

  const tone = tones[brand.tone];
  const lg = size === "lg";
  return (
    <div aria-hidden="true" className={cn("relative flex items-center justify-center overflow-hidden bg-gradient-to-br", tone.panel, className)}>
      <div className={cn("absolute -right-10 -bottom-12 size-40 rotate-12 rounded-[2.5rem] opacity-10", tone.bar)} />
      <div className="relative flex items-center gap-4">
        <Image
          src={brand.icon}
          alt=""
          width={156}
          height={156}
          className={cn("rounded-2xl shadow-lg", lg ? "size-20" : "size-16")}
        />
        <div className="leading-none">
          <span className={cn("block font-display font-extrabold tracking-[0.06em] text-navy", lg ? "text-5xl" : "text-4xl")}>ARA</span>
          <span className={cn("mt-1 block font-display font-bold", tone.label, lg ? "text-2xl" : "text-xl")}>{brand.label}</span>
        </div>
      </div>
      <span className={cn("absolute bottom-4 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full", tone.bar)} />
    </div>
  );
}
