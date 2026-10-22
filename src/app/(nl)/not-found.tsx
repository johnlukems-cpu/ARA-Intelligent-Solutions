import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { NotFoundView } from "@/views/not-found-view";

export const metadata: Metadata = { title: getDictionary("nl").notFound.title, robots: { index: false } };

export default function NotFound() {
  return <NotFoundView locale="nl" />;
}
