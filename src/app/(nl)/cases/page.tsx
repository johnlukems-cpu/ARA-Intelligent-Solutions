import { getDictionary } from "@/i18n/dictionaries";
import { staticPageMetadata } from "@/lib/page-metadata";
import { CasesPage } from "@/views/cases-page";

const t = getDictionary("nl");
export const metadata = staticPageMetadata("nl", "cases", t.cases.title, t.cases.intro);

export default function Page() {
  return <CasesPage locale="nl" />;
}
