import { legalPages } from "@/content/legal";
import { staticPageMetadata } from "@/lib/page-metadata";
import { LegalPage } from "@/views/legal-page";

const doc = legalPages.terms["nl"];
export const metadata = staticPageMetadata("nl", "terms", doc.title, doc.description);

export default function Page() {
  return <LegalPage page="terms" locale="nl" />;
}
