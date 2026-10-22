"use client";

import { useState } from "react";
import { Check, Link2, Mail, MessageCircle } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { FacebookIcon, LinkedInIcon } from "@/components/layout/social-icons";

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
    </svg>
  );
}

const linkClass =
  "inline-flex size-10 items-center justify-center rounded-full bg-surface text-navy ring-1 ring-line transition-colors hover:bg-navy hover:text-white";

export function ShareLinks({ url, title, locale }: { url: string; title: string; locale: Locale }) {
  const t = getDictionary(locale);
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const text = encodeURIComponent(title);
  const networks = [
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: LinkedInIcon },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FacebookIcon },
    { name: "X", href: `https://x.com/intent/post?url=${u}&text=${text}`, Icon: XIcon },
    { name: "WhatsApp", href: `https://wa.me/?text=${text}%20${u}`, Icon: MessageCircle },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt(t.news.copyLink, url);
    }
  };

  return (
    <div>
      <h2 className="text-sm font-bold tracking-wide text-midnight uppercase">{t.news.shareTitle}</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {networks.map(({ name, href, Icon }) => (
          <li key={name}>
            <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass} title={t.news.shareOn(name)}>
              <Icon className="size-4" />
              <span className="sr-only">
                {t.news.shareOn(name)} {t.a11y.externalLink}
              </span>
            </a>
          </li>
        ))}
        <li>
          <a href={`mailto:?subject=${text}&body=${u}`} className={linkClass} title={t.news.shareOn("e-mail")}>
            <Mail aria-hidden="true" className="size-4" />
            <span className="sr-only">{t.news.shareOn("e-mail")}</span>
          </a>
        </li>
        <li>
          <button type="button" onClick={copy} className={linkClass} title={t.news.copyLink}>
            {copied ? <Check aria-hidden="true" className="size-4 text-success" /> : <Link2 aria-hidden="true" className="size-4" />}
            <span className="sr-only">{t.news.copyLink}</span>
          </button>
        </li>
      </ul>
      <p role="status" aria-live="polite" className="mt-2 h-5 text-sm text-success">
        {copied ? t.news.linkCopied : ""}
      </p>
    </div>
  );
}
