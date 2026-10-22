import { getDictionary } from "@/i18n/dictionaries";
import { staticPageMetadata } from "@/lib/page-metadata";
import { HomePage } from "@/views/home-page";

const t = getDictionary("nl");
export const metadata = staticPageMetadata("nl", "home", t.meta.defaultTitle, t.meta.defaultDescription);

export default function Page() {
  return <HomePage locale="nl" />;
}
