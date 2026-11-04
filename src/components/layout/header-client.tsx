"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import type { IconName } from "@/content/types";
import { localeLabels, locales, type Locale } from "@/i18n/config";
import { alternatePath, type AlternateContext } from "@/i18n/routes";
import { cn } from "@/lib/format";
import { Icon } from "@/components/ui/icon";

export type NavItem = { key: string; label: string; href: string };
export type ServicesMenu = {
  label: string;
  menuLabel: string;
  divisions: { id: string; href: string; label: string; description: string; icon: IconName }[];
  /** Extra links shown under the divisions (overview, pricing, …). */
  links: NavItem[];
};

type Props = {
  locale: Locale;
  items: NavItem[];
  services: ServicesMenu;
  cta: NavItem;
  homeHref: string;
  alternates: AlternateContext;
  labels: { openMenu: string; closeMenu: string; mainNav: string; languageSwitch: string };
  logo: React.ReactNode;
};

function isActive(pathname: string, href: string, homeHref: string) {
  if (href === homeHref) return pathname === homeHref;
  return pathname === href || pathname.startsWith(`${href}/`);
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

/** Desktop "Services" dropdown with the four divisions (disclosure pattern). */
function ServicesDropdown({ services, pathname, homeHref }: { services: ServicesMenu; pathname: string; homeHref: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapperRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const active =
    services.divisions.some((d) => isActive(pathname, d.href, homeHref)) || services.links.some((l) => isActive(pathname, l.href, homeHref));

  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <li
      ref={wrapperRef}
      className="relative"
      onBlur={(event) => {
        if (!wrapperRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "relative inline-flex items-center gap-1 rounded-md px-2 py-2 text-[0.9rem] font-medium whitespace-nowrap transition-colors",
          active || open ? "text-cyan" : "text-white/85 hover:text-white",
        )}
      >
        {services.label}
        <ChevronDown aria-hidden="true" className={cn("size-4 transition-transform", open && "rotate-180")} />
        <span
          aria-hidden="true"
          className={cn("absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-cyan transition-opacity", active ? "opacity-100" : "opacity-0")}
        />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full left-1/2 z-50 mt-4 w-[44rem] -translate-x-1/2 rounded-[var(--radius-card)] bg-white p-3 text-ink shadow-2xl ring-1 ring-line"
      >
        <p className="px-3 pt-2 pb-1 text-xs font-bold tracking-[0.18em] text-muted uppercase">{services.menuLabel}</p>
        <ul className="grid grid-cols-2 gap-1">
          {services.divisions.map((division) => {
            const current = isActive(pathname, division.href, homeHref);
            return (
              <li key={division.id}>
                <Link
                  href={division.href}
                  aria-current={current ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn("flex h-full gap-3 rounded-2xl p-3 transition-colors hover:bg-surface", current && "bg-surface")}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-midnight text-cyan">
                    <Icon name={division.icon} className="size-5" />
                  </span>
                  <span>
                    <span className="block font-display font-bold text-midnight">{division.label}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-muted">{division.description}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 border-t border-line px-3 pt-3 pb-1">
          {services.links.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1 rounded-md text-sm font-semibold text-electric-600 hover:text-navy"
              >
                {link.label}
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function HeaderClient({ locale, items, services, cta, homeHref, alternates, labels, logo }: Props) {
  const pathname = usePathname() || homeHref;
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const panelId = useId();
  const mobileServicesId = useId();
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
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []).filter((el) => el.offsetParent !== null);
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
    const media = window.matchMedia("(min-width: 1280px)");
    const onChange = () => media.matches && setOpen(false);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const [first, ...rest] = items; // "Home" first, then the other items; Services is inserted after Home.

  return (
    <header className="on-dark sticky top-0 z-50 border-b border-white/10 bg-midnight text-white">
      <div className="container-site flex h-20 items-center justify-between gap-4 lg:h-24">
        {logo}

        <nav aria-label={labels.mainNav} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {/* The logo links home, so the desktop bar leaves "Home" out to make room. */}
            <ServicesDropdown services={services} pathname={pathname} homeHref={homeHref} />
            {rest.map((item) => {
              const active = isActive(pathname, item.href, homeHref);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-md px-2 py-2 text-[0.9rem] font-medium whitespace-nowrap transition-colors",
                      active ? "text-cyan" : "text-white/85 hover:text-white",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn("absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-cyan transition-opacity", active ? "opacity-100" : "opacity-0")}
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
            className="group hidden items-center gap-2 rounded-full bg-cyan px-4 py-2 text-sm font-semibold whitespace-nowrap text-midnight shadow-[0_8px_24px_-10px_rgb(0_213_232/0.8)] transition-colors hover:bg-cyan-300 xl:inline-flex"
          >
            {cta.label}
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-white ring-1 ring-white/20 transition-colors hover:bg-white/10 xl:hidden"
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
        className="fixed inset-x-0 top-20 bottom-0 overflow-y-auto border-t border-white/10 bg-midnight lg:top-24 xl:hidden"
      >
        <nav aria-label={labels.mainNav} className="container-site py-6">
          <ul className="flex flex-col gap-1">
            {first ? (
              <li>
                <Link
                  href={first.href}
                  aria-current={isActive(pathname, first.href, homeHref) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-semibold transition-colors",
                    isActive(pathname, first.href, homeHref) ? "bg-white/10 text-cyan" : "text-white hover:bg-white/5",
                  )}
                >
                  {first.label}
                  <ArrowRight aria-hidden="true" className="size-4 opacity-50" />
                </Link>
              </li>
            ) : null}
            <li>
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls={mobileServicesId}
                onClick={() => setServicesOpen((value) => !value)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-lg font-semibold text-white transition-colors hover:bg-white/5"
              >
                {services.label}
                <ChevronDown aria-hidden="true" className={cn("size-5 opacity-70 transition-transform", servicesOpen && "rotate-180")} />
              </button>
              <ul id={mobileServicesId} hidden={!servicesOpen} className="mb-2 ml-4 space-y-1 border-l border-white/15 pl-3">
                {services.divisions.map((division) => (
                  <li key={division.id}>
                    <Link
                      href={division.href}
                      aria-current={isActive(pathname, division.href, homeHref) ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-semibold text-white hover:bg-white/5"
                    >
                      <Icon name={division.icon} className="size-5 shrink-0 text-cyan" />
                      {division.label}
                    </Link>
                  </li>
                ))}
                {services.links.map((link) => (
                  <li key={link.key}>
                    <Link href={link.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 text-sm font-semibold text-cyan hover:bg-white/5">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {rest.map((item) => {
              const active = isActive(pathname, item.href, homeHref);
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
