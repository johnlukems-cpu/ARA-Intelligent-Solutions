import { getDictionary } from "@/i18n/dictionaries";
import { staticPageMetadata } from "@/lib/page-metadata";
import { PricingPage } from "@/views/pricing-page";

const t = getDictionary("nl");
export const metadata = staticPageMetadata("nl", "pricing", t.pricing.metaTitle, t.pricing.metaDescription);

export default function Page() {
  return <PricingPage locale="nl" />;
}
