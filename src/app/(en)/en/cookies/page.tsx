import { legalPages } from "@/content/legal";
import { staticPageMetadata } from "@/lib/page-metadata";
import { LegalPage } from "@/views/legal-page";

const doc = legalPages.cookies["en"];
export const metadata = staticPageMetadata("en", "cookies", doc.title, doc.description);

export default function Page() {
  return <LegalPage page="cookies" locale="en" />;
}
