import { getDictionary } from "@/i18n/dictionaries";
import { staticPageMetadata } from "@/lib/page-metadata";
import { AcademyPage } from "@/views/academy-page";

const t = getDictionary("en");
export const metadata = staticPageMetadata("en", "academy", t.academy.metaTitle, t.academy.metaDescription);

export default function Page() {
  return <AcademyPage locale="en" />;
}
