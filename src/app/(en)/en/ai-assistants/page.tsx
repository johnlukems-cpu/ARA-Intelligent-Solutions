import { getDictionary } from "@/i18n/dictionaries";
import { staticPageMetadata } from "@/lib/page-metadata";
import { AiEmployeesPage } from "@/views/ai-employees-page";

const t = getDictionary("en");
export const metadata = staticPageMetadata("en", "aiEmployees", t.aiEmployees.metaTitle, t.aiEmployees.metaDescription);

export default function Page() {
  return <AiEmployeesPage locale="en" />;
}
