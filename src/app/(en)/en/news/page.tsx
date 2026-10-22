import { getDictionary } from "@/i18n/dictionaries";
import { staticPageMetadata } from "@/lib/page-metadata";
import { NewsPage } from "@/views/news-page";

const t = getDictionary("en");
export const metadata = staticPageMetadata("en", "news", t.news.title, t.news.intro);

export default function Page() {
  return <NewsPage locale="en" />;
}
