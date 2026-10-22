import { getDictionary } from "@/i18n/dictionaries";
import { staticPageMetadata } from "@/lib/page-metadata";
import { ProductsPage } from "@/views/products-page";

const t = getDictionary("en");
export const metadata = staticPageMetadata("en", "products", t.products.title, t.products.intro);

export default function Page() {
  return <ProductsPage locale="en" />;
}
