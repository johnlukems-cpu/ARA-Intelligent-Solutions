import { getDictionary } from "@/i18n/dictionaries";
import { staticPageMetadata } from "@/lib/page-metadata";
import { ServicesPage } from "@/views/services-page";

const t = getDictionary("nl");
export const metadata = staticPageMetadata("nl", "services", t.services.title, t.services.intro);

export default function Page() {
  return <ServicesPage locale="nl" />;
}
