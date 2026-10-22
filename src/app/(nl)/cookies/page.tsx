import { legalPages } from "@/content/legal";
import { staticPageMetadata } from "@/lib/page-metadata";
import { LegalPage } from "@/views/legal-page";

const doc = legalPages.cookies["nl"];
export const metadata = staticPageMetadata("nl", "cookies", doc.title, doc.description);

export default function Page() {
  return <LegalPage page="cookies" locale="nl" />;
}
