import { getDictionary } from "@/i18n/dictionaries";
import { staticPageMetadata } from "@/lib/page-metadata";
import { AboutPage } from "@/views/about-page";

const t = getDictionary("nl");
export const metadata = staticPageMetadata("nl", "about", t.about.title, t.about.intro);

export default function Page() {
  return <AboutPage locale="nl" />;
}
