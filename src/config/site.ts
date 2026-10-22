/**
 * Central site configuration.
 *
 * Contact details and social profiles are read from public environment
 * variables so that nothing unverified is ever hardcoded. Empty values are
 * simply not rendered.
 */

function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function cleanUrl(value: string | undefined): string | undefined {
  const url = clean(value);
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.toString() : undefined;
  } catch {
    return undefined;
  }
}

const siteUrl = (clean(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000").replace(/\/+$/, "");

export const siteConfig = {
  name: "ARA Intelligent Solutions",
  shortName: "ARA",
  tagline: "Intelligence That Moves Business Forward.",
  descriptor: ["AI", "AUTOMATION", "SOFTWARE", "DIGITAL"] as const,
  url: siteUrl,
  country: "Suriname",
  ogImage: "/og/ara-og.jpg",
  contact: {
    email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    phone: clean(process.env.NEXT_PUBLIC_CONTACT_PHONE),
    whatsapp: clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)?.replace(/[^\d]/g, "") || undefined,
  },
  social: {
    linkedin: cleanUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    facebook: cleanUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL),
    instagram: cleanUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  },
} as const;

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
