import { getDictionary } from "@/i18n/dictionaries";
import { staticPageMetadata } from "@/lib/page-metadata";
import { AcademyPage } from "@/views/academy-page";

const t = getDictionary("nl");
export const metadata = staticPageMetadata("nl", "academy", t.academy.metaTitle, t.academy.metaDescription);

export default function Page() {
  return <AcademyPage locale="nl" />;
}
