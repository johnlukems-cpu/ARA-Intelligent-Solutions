import { getDictionary } from "@/i18n/dictionaries";
import { staticPageMetadata } from "@/lib/page-metadata";
import { CasesPage } from "@/views/cases-page";

const t = getDictionary("en");
export const metadata = staticPageMetadata("en", "cases", t.cases.title, t.cases.intro);

export default function Page() {
  return <CasesPage locale="en" />;
}
