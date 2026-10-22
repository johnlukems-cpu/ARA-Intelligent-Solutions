import { legalPages } from "@/content/legal";
import { staticPageMetadata } from "@/lib/page-metadata";
import { LegalPage } from "@/views/legal-page";

const doc = legalPages.terms["en"];
export const metadata = staticPageMetadata("en", "terms", doc.title, doc.description);

export default function Page() {
  return <LegalPage page="terms" locale="en" />;
}
