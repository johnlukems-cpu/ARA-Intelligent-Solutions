import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { serviceCategories } from "@/content/services";
import { products } from "@/content/products";
import { getLatestArticles, resolveArticle } from "@/content/news";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { Logo } from "./logo";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "./social-icons";

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-sm font-bold tracking-[0.14em] text-white uppercase">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href: to, children, lang }: { href: string; children: React.ReactNode; lang?: string }) {
  return (
    <li>
      <Link href={to} lang={lang} className="rounded text-white/70 transition-colors hover:text-cyan">
        {children}
      </Link>
    </li>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const year = new Date().getFullYear();
  const latest = getLatestArticles(locale, 3)
    .map((article) => resolveArticle(article, locale))
    .filter((resolved) => resolved !== undefined);
  const { contact, social } = siteConfig;
  const socials = [
    { url: social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { url: social.facebook, label: "Facebook", Icon: FacebookIcon },
    { url: social.instagram, label: "Instagram", Icon: InstagramIcon },
  ].filter((item): item is { url: string; label: string; Icon: typeof LinkedInIcon } => Boolean(item.url));

  return (
    <footer className="on-dark bg-circuit relative bg-midnight text-white">
      <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />
      <div className="container-site grid gap-12 py-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo homeHref={href(locale, "home")} label={t.a11y.home} variant="footer" />
          <p className="mt-5 font-display text-lg font-semibold text-white" lang="en">
            {siteConfig.tagline}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">{t.footer.about}</p>
          <p className="mt-5 flex items-center gap-2 text-sm text-white/70">
            <MapPin aria-hidden="true" className="size-4 text-cyan" />
            {t.footer.basedIn}
          </p>
          {contact.email || contact.phone || contact.whatsapp ? (
            <ul className="mt-4 space-y-2 text-sm">
              {contact.email ? (
                <li>
                  <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 text-white/80 hover:text-cyan">
                    <Mail aria-hidden="true" className="size-4 text-cyan" />
                    {contact.email}
                  </a>
                </li>
              ) : null}
              {contact.phone ? (
                <li>
                  <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-2 text-white/80 hover:text-cyan">
                    <Phone aria-hidden="true" className="size-4 text-cyan" />
                    {contact.phone}
                  </a>
                </li>
              ) : null}
              {contact.whatsapp ? (
                <li>
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-cyan"
                  >
                    <MessageCircle aria-hidden="true" className="size-4 text-cyan" />
                    WhatsApp <span className="sr-only">{t.a11y.externalLink}</span>
                  </a>
                </li>
              ) : null}
            </ul>
          ) : null}
        </div>

        <nav aria-label={t.a11y.footerNav} className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
          <FooterColumn title={t.footer.servicesTitle}>
            {serviceCategories.map((category) => (
              <FooterLink key={category.id} href={href(locale, "services", category.slug[locale])}>
                {category.name[locale]}
              </FooterLink>
            ))}
          </FooterColumn>
          <FooterColumn title={t.footer.companyTitle}>
            <FooterLink href={href(locale, "home")}>{t.nav.home}</FooterLink>
            <FooterLink href={href(locale, "services")}>{t.nav.services}</FooterLink>
            <FooterLink href={href(locale, "cases")}>{t.nav.cases}</FooterLink>
            <FooterLink href={href(locale, "about")}>{t.nav.about}</FooterLink>
            <FooterLink href={href(locale, "contact")}>{t.nav.contact}</FooterLink>
          </FooterColumn>
          <FooterColumn title={t.footer.productsTitle}>
            {products.slice(0, 4).map((product) => (
              <FooterLink key={product.id} href={href(locale, "products", product.slug)}>
                {product.name}
              </FooterLink>
            ))}
            <FooterLink href={href(locale, "products")}>{t.footer.allProducts}</FooterLink>
          </FooterColumn>
          <FooterColumn title={t.footer.newsTitle}>
            {latest.map(({ article, translation }) => (
              <FooterLink key={article.id} href={href(locale, "news", article.slug)}>
                {translation.title}
              </FooterLink>
            ))}
            <FooterLink href={href(locale, "news")}>{t.footer.allNews}</FooterLink>
          </FooterColumn>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-4 py-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name}. {t.footer.rights}
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link href={href(locale, "privacy")} className="hover:text-cyan">
                {t.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={href(locale, "terms")} className="hover:text-cyan">
                {t.footer.terms}
              </Link>
            </li>
            <li>
              <Link href={href(locale, "cookies")} className="hover:text-cyan">
                {t.footer.cookies}
              </Link>
            </li>
          </ul>
          {socials.length ? (
            <ul className="flex items-center gap-3" aria-label={t.footer.followUs}>
              {socials.map(({ url, label, Icon }) => (
                <li key={label}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-cyan hover:text-midnight"
                  >
                    <Icon className="size-4" />
                    <span className="sr-only">
                      {label} {t.a11y.externalLink}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
