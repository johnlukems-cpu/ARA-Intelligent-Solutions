import { getDictionary } from "@/i18n/dictionaries";
import { staticPageMetadata } from "@/lib/page-metadata";
import { PricingPage } from "@/views/pricing-page";

const t = getDictionary("en");
export const metadata = staticPageMetadata("en", "pricing", t.pricing.metaTitle, t.pricing.metaDescription);

export default function Page() {
  return <PricingPage locale="en" />;
}
