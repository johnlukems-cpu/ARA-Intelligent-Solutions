import { trainings } from "@/content/academy";
import { getNewsLocales } from "@/content/news";
import { CONSULTATION_TOPIC, divisions, serviceCategories } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href, type RouteKey } from "@/i18n/routes";
import { divisionHref } from "@/lib/divisions";
import { HeaderClient, type NavItem } from "./header-client";
import { Logo } from "./logo";

/** Main navigation; "Services" is rendered as a dropdown after "Home". */
const navKeys = ["home", "products", "about", "cases", "news", "contact"] as const satisfies readonly RouteKey[];

export function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const items: NavItem[] = navKeys.map((key) => ({ key, label: t.nav[key], href: href(locale, key) }));
  const homeHref = href(locale, "home");
  return (
    <HeaderClient
      locale={locale}
      items={items}
      services={{
        label: t.nav.services,
        menuLabel: t.nav.servicesMenu,
        divisions: divisions.map((division) => ({
          id: division.id,
          href: divisionHref(locale, division),
          label: division.name[locale],
          description: division.summary[locale],
          icon: division.icon,
        })),
        links: [
          { key: "services", label: t.nav.allServices, href: href(locale, "services") },
          { key: "aiEmployees", label: t.nav.aiEmployees, href: href(locale, "aiEmployees") },
          { key: "pricing", label: t.nav.pricing, href: href(locale, "pricing") },
        ],
      }}
      cta={{ key: "cta", label: t.nav.cta, href: `${href(locale, "contact")}?topic=${CONSULTATION_TOPIC}` }}
      homeHref={homeHref}
      alternates={{
        serviceSlugs: serviceCategories.map((c) => c.slug),
        academySlugs: trainings.map((training) => training.slug),
        newsLocales: getNewsLocales(),
      }}
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
