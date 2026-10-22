import type { Metadata } from "next";
import "../globals.css";
import { inter, montserrat } from "../fonts";
import { SiteShell } from "@/components/layout/site-shell";
import { rootMetadata } from "@/lib/page-metadata";

export { viewport } from "@/lib/page-metadata";
export const metadata: Metadata = rootMetadata("nl");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        <SiteShell locale="nl">{children}</SiteShell>
      </body>
    </html>
  );
}
