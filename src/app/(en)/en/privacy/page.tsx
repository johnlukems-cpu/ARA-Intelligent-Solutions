import { legalPages } from "@/content/legal";
import { staticPageMetadata } from "@/lib/page-metadata";
import { LegalPage } from "@/views/legal-page";

const doc = legalPages.privacy["en"];
export const metadata = staticPageMetadata("en", "privacy", doc.title, doc.description);

export default function Page() {
  return <LegalPage page="privacy" locale="en" />;
}
