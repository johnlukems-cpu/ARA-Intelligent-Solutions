import { getDictionary } from "@/i18n/dictionaries";
import { staticPageMetadata } from "@/lib/page-metadata";
import { ServicesPage } from "@/views/services-page";

const t = getDictionary("en");
export const metadata = staticPageMetadata("en", "services", t.services.title, t.services.intro);

export default function Page() {
  return <ServicesPage locale="en" />;
}
