import { getDictionary } from "@/i18n/dictionaries";
import { staticPageMetadata } from "@/lib/page-metadata";
import { NewsPage } from "@/views/news-page";

const t = getDictionary("nl");
export const metadata = staticPageMetadata("nl", "news", t.news.title, t.news.intro);

export default function Page() {
  return <NewsPage locale="nl" />;
}
