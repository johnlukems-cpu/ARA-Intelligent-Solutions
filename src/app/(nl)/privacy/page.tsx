import { legalPages } from "@/content/legal";
import { staticPageMetadata } from "@/lib/page-metadata";
import { LegalPage } from "@/views/legal-page";

const doc = legalPages.privacy["nl"];
export const metadata = staticPageMetadata("nl", "privacy", doc.title, doc.description);

export default function Page() {
  return <LegalPage page="privacy" locale="nl" />;
}
