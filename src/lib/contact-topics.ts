import { products } from "@/content/products";
import { serviceCategories } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { OTHER_TOPIC } from "./contact";

export type TopicGroup = { label: string; options: { value: string; label: string }[] };

/** Topics offered in the contact form, grouped by service area and products. */
export function getContactTopicGroups(locale: Locale, labels: { products: string }): TopicGroup[] {
  return [
    ...serviceCategories.map((category) => ({
      label: category.name[locale],
      options: category.services.map((service) => ({ value: service.id, label: service.name[locale] })),
    })),
    {
      label: labels.products,
      options: products.map((product) => ({ value: `product:${product.slug}`, label: product.name })),
    },
  ];
}

/** All valid topic values, used for server-side validation. */
export function getContactTopicIds(): string[] {
  return [
    ...serviceCategories.flatMap((category) => category.services.map((service) => service.id)),
    ...products.map((product) => `product:${product.slug}`),
    OTHER_TOPIC,
  ];
}

export function getTopicLabel(value: string, locale: Locale): string {
  if (value === OTHER_TOPIC) return locale === "nl" ? "Anders" : "Other";
  if (value.startsWith("product:")) {
    const product = products.find((p) => `product:${p.slug}` === value);
    return product ? `Product: ${product.name}` : value;
  }
  const service = serviceCategories.flatMap((c) => c.services).find((s) => s.id === value);
  return service ? service.name[locale] : value;
}
