import { Mail, MessageCircle, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";
import { isContactDeliveryConfigured } from "@/lib/contact-delivery";
import { getContactTopicGroups } from "@/lib/contact-topics";
import { ContactForm } from "@/components/forms/contact-form";
import { Notice } from "@/components/ui/notice";
import { PageHero } from "@/components/ui/page-hero";

export function ContactPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const c = t.contact;
  const { email, phone, whatsapp } = siteConfig.contact;
  const hasDirect = Boolean(email || phone || whatsapp);
  const showDevNotice = process.env.NODE_ENV !== "production" && !isContactDeliveryConfigured();

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
        breadcrumbs={[{ label: t.nav.home, href: href(locale, "home") }, { label: t.nav.contact }]}
      />
      <section className="bg-surface py-14 sm:py-20" aria-labelledby="form-title">
        <div className="container-site grid gap-8 lg:grid-cols-12">
          <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-10 lg:col-span-8">
            <h2 id="form-title" className="text-2xl font-extrabold">
              {c.formTitle}
            </h2>
            <span aria-hidden="true" className="accent-bar mt-3 mb-8" />
            {showDevNotice ? (
              <Notice tone="warning" className="mb-6">
                {c.devNotice}
              </Notice>
            ) : null}
            <ContactForm
              locale={locale}
              topicGroups={getContactTopicGroups(locale, { products: t.nav.products, packages: t.pricing.packagesGroup, aiPackages: t.pricing.aiPackagesGroup })}
              privacyHref={href(locale, "privacy")}
            />
          </div>

          <div className="space-y-6 lg:col-span-4">
            <div className="on-dark bg-circuit rounded-[var(--radius-card)] bg-midnight p-7 text-white shadow-xl">
              <h2 className="text-xl font-extrabold text-white">{c.whatNext}</h2>
              <ol className="mt-5 space-y-4">
                {c.steps.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-cyan text-sm font-bold text-midnight">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 text-sm leading-relaxed text-white/85">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-[var(--radius-card)] bg-white p-7 shadow-[var(--shadow-card)] ring-1 ring-line">
              <h2 className="text-lg font-extrabold">{c.otherWays}</h2>
              {hasDirect ? (
                <ul className="mt-4 space-y-3 text-sm">
                  {email ? (
                    <li>
                      <a href={`mailto:${email}`} className="inline-flex items-center gap-2.5 font-semibold text-electric-600 hover:text-navy">
                        <Mail aria-hidden="true" className="size-4" />
                        <span className="sr-only">{c.emailLabel}: </span>
                        {email}
                      </a>
                    </li>
                  ) : null}
                  {phone ? (
                    <li>
                      <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-2.5 font-semibold text-electric-600 hover:text-navy">
                        <Phone aria-hidden="true" className="size-4" />
                        <span className="sr-only">{c.phoneLabel}: </span>
                        {phone}
                      </a>
                    </li>
                  ) : null}
                  {whatsapp ? (
                    <li>
                      <a
                        href={`https://wa.me/${whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 font-semibold text-electric-600 hover:text-navy"
                      >
                        <MessageCircle aria-hidden="true" className="size-4" />
                        {c.whatsappLabel}
                        <span className="sr-only"> {t.a11y.externalLink}</span>
                      </a>
                    </li>
                  ) : null}
                </ul>
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.noDirectDetails}</p>
              )}
              <p className="mt-5 flex items-center gap-2 border-t border-line pt-5 text-sm text-muted">
                <MapPin aria-hidden="true" className="size-4 text-electric-600" />
                {t.footer.basedIn}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
