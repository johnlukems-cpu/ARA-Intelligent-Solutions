import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug, resolveArticle } from "@/content/news";
import { href } from "@/i18n/routes";
import { buildMetadata } from "@/lib/seo";
import { ArticlePage } from "@/views/article-page";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

// Every article gets a page in every language; untranslated articles show
// the original text with a clear notice instead of a blank page.
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const resolved = article ? resolveArticle(article, "en") : undefined;
  if (!article || !resolved) return {};
  const { translation } = resolved;
  const paths = {
    ...(article.translations.nl ? { nl: href("nl", "news", slug) } : {}),
    ...(article.translations.en ? { en: href("en", "news", slug) } : {}),
  };
  return {
    ...buildMetadata({
      locale: "en",
      title: translation.seo?.title ?? translation.title,
      description: translation.seo?.description ?? translation.excerpt,
      paths: resolved.isFallback ? { ...paths, ["en"]: href("en", "news", slug) } : paths,
      type: "article",
      publishedTime: article.publishedAt,
      // Untranslated fallbacks are not indexed to avoid duplicate content.
      noIndex: resolved.isFallback,
    }),
    ...(resolved.isFallback ? { alternates: { canonical: href(resolved.contentLocale, "news", slug) } } : {}),
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const resolved = article ? resolveArticle(article, "en") : undefined;
  if (!resolved) notFound();
  return <ArticlePage resolved={resolved} locale="en" />;
}
