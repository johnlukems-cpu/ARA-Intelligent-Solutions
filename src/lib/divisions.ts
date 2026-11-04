import { serviceCategories, type DivisionCard } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";

/** Page URL of a division (service divisions live under /diensten, the Academy has its own route). */
export function divisionHref(locale: Locale, division: Pick<DivisionCard, "id">): string {
  if (division.id === "academy") return href(locale, "academy");
  const category = serviceCategories.find((c) => c.id === division.id);
  return category ? href(locale, "services", category.slug[locale]) : href(locale, "services");
}
