import Link from "next/link";
import { Compass } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href, type RouteKey } from "@/i18n/routes";
import { ButtonLink } from "@/components/ui/button";

export function NotFoundView({ locale, variant = "page" }: { locale: Locale; variant?: "page" | "product" }) {
  const t = getDictionary(locale);
  const title = variant === "product" ? t.notFound.productTitle : t.notFound.title;
  const text = variant === "product" ? t.notFound.productText : t.notFound.text;
  const links: RouteKey[] = ["services", "products", "news", "contact"];
  return (
    <section className="on-dark bg-hero-glow relative overflow-hidden text-white">
      <div aria-hidden="true" className="bg-circuit absolute inset-0" />
      <div className="container-site relative flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-cyan/40">
          <Compass aria-hidden="true" className="size-8 text-cyan" />
        </span>
        <p className="mt-6 font-display text-6xl font-extrabold text-gradient">404</p>
        <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-lg text-lg text-white/80">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={variant === "product" ? href(locale, "products") : href(locale, "home")} arrow>
            {variant === "product" ? t.nav.products : t.notFound.home}
          </ButtonLink>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {links.map((key) => (
            <li key={key}>
              <Link href={href(locale, key)} className="text-white/75 underline-offset-4 hover:text-cyan hover:underline">
                {t.nav[key as keyof typeof t.nav]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
