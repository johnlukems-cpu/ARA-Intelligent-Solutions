import { getDictionary } from "@/i18n/dictionaries";
import { staticPageMetadata } from "@/lib/page-metadata";
import { AboutPage } from "@/views/about-page";

const t = getDictionary("en");
export const metadata = staticPageMetadata("en", "about", t.about.title, t.about.intro);

export default function Page() {
  return <AboutPage locale="en" />;
}
