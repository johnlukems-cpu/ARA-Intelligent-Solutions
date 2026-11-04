import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** Group labels for the contact form topic selector. */
export function contactTopicLabels(locale: Locale) {
  const t = getDictionary(locale);
  return {
    products: t.nav.products,
    packages: t.pricing.packagesGroup,
    aiPackages: t.pricing.aiPackagesGroup,
    general: t.contact.consultationGroup,
    consultation: t.contact.consultation,
  };
}
