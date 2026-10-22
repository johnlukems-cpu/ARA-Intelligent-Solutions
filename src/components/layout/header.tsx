import { serviceCategories } from "@/content/services";
import { getNewsLocales } from "@/content/news";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href, type RouteKey } from "@/i18n/routes";
import { HeaderClient, type NavItem } from "./header-client";
import { Logo } from "./logo";

const navKeys = ["home", "services", "products", "news", "cases", "about", "contact"] as const satisfies readonly RouteKey[];

export function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const items: NavItem[] = navKeys.map((key) => ({ key, label: t.nav[key], href: href(locale, key) }));
  const homeHref = href(locale, "home");
  return (
    <HeaderClient
      locale={locale}
      items={items}
      cta={{ key: "cta", label: t.nav.cta, href: href(locale, "contact") }}
      homeHref={homeHref}
      alternates={{ serviceSlugs: serviceCategories.map((c) => c.slug), newsLocales: getNewsLocales() }}
      labels={{
        openMenu: t.a11y.openMenu,
        closeMenu: t.a11y.closeMenu,
        mainNav: t.a11y.mainNav,
        languageSwitch: t.a11y.languageSwitch,
      }}
      logo={<Logo homeHref={homeHref} label={t.a11y.home} />}
    />
  );
}
