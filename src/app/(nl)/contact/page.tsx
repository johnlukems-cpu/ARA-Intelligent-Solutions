import { getDictionary } from "@/i18n/dictionaries";
import { staticPageMetadata } from "@/lib/page-metadata";
import { ContactPage } from "@/views/contact-page";

const t = getDictionary("nl");
export const metadata = staticPageMetadata("nl", "contact", t.contact.title, t.contact.intro);

export default function Page() {
  return <ContactPage locale="nl" />;
}
