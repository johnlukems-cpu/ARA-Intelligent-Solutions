"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { localeLabels, locales, type Locale } from "@/i18n/config";
import { alternatePath, type AlternateContext } from "@/i18n/routes";
import { cn } from "@/lib/format";

export type NavItem = { key: string; label: string; href: string };

type Props = {
  locale: Locale;
  items: NavItem[];
  cta: NavItem;
  homeHref: string;
  alternates: AlternateContext;
  labels: { openMenu: string; closeMenu: string; mainNav: string; languageSwitch: string };
  logo: React.ReactNode;
};

function isActive(pathname: string, item: NavItem, homeHref: string) {
  if (item.href === homeHref) return pathname === homeHref;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function LanguageSwitch({ locale, pathname, alternates, label, className }: {
  locale: Locale;
  pathname: string;
  alternates: AlternateContext;
  label: string;
  className?: string;
}) {
  return (
    <div role="group" aria-label={label} className={cn("flex items-center rounded-full bg-white/10 p-1 ring-1 ring-white/15", className)}>
      {locales.map((target) => {
        const active = target === locale;
        return (
          <a
            key={target}
            href={alternatePath(pathname, locale, target, alternates)}
            hrefLang={target}
            lang={target}
            aria-current={active ? "true" : undefined}
            title={localeLabels[target].name}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-bold tracking-wide transition-colors",
              active ? "bg-cyan text-midnight" : "text-white/80 hover:text-white",
            )}
          >
            <span aria-hidden="true">{localeLabels[target].short}</span>
            <span className="sr-only">{localeLabels[target].name}</span>
          </a>
        );
      })}
    </div>
  );
}

export function HeaderClient({ locale, items, cta, homeHref, alternates, labels, logo }: Props) {
  const pathname = usePathname() || homeHref;
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Close the menu after navigation (state derived from the pathname during render).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Scroll lock, Escape to close and a simple focus trap while the menu is open.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const elements = [toggleRef.current, ...focusables()].filter(Boolean) as HTMLElement[];
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  // Close if the viewport grows to desktop size.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => media.matches && setOpen(false);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="on-dark sticky top-0 z-50 border-b border-white/10 bg-midnight text-white">
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-4 lg:h-[5.5rem]">
        {logo}

        <nav aria-label={labels.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {/* The logo links home, so the desktop bar leaves "Home" out to make room. */}
            {items.filter((item) => item.href !== homeHref).map((item) => {
              const active = isActive(pathname, item, homeHref);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-md px-2 py-2 text-[0.9rem] font-medium whitespace-nowrap transition-colors xl:px-3",
                      active ? "text-cyan" : "text-white/85 hover:text-white",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-cyan transition-opacity xl:inset-x-3",
                        active ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitch locale={locale} pathname={pathname} alternates={alternates} label={labels.languageSwitch} />
          <Link
            href={cta.href}
            className="group hidden items-center gap-2 rounded-full bg-cyan px-4 py-2 text-sm font-semibold text-midnight shadow-[0_8px_24px_-10px_rgb(0_213_232/0.8)] transition-colors hover:bg-cyan-300 xl:inline-flex"
          >
            {cta.label}
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-white ring-1 ring-white/20 transition-colors hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? labels.closeMenu : labels.openMenu}
            onClick={() => (open ? close() : setOpen(true))}
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id={panelId}
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto border-t border-white/10 bg-midnight lg:hidden"
      >
        <nav aria-label={labels.mainNav} className="container-site py-6">
          <ul className="flex flex-col gap-1">
            {items.map((item) => {
              const active = isActive(pathname, item, homeHref);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-semibold transition-colors",
                      active ? "bg-white/10 text-cyan" : "text-white hover:bg-white/5",
                    )}
                  >
                    {item.label}
                    <ArrowRight aria-hidden="true" className="size-4 opacity-50" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={cta.href}
            onClick={() => setOpen(false)}
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-cyan px-5 py-3.5 font-semibold text-midnight"
          >
            {cta.label}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
