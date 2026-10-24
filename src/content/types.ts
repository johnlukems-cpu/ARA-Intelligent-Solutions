import type { Locale, Localized } from "@/i18n/config";

/** Icon names map to Lucide icons in components/ui/icon.tsx. */
export type IconName =
  | "brain"
  | "bot"
  | "workflow"
  | "plug"
  | "code"
  | "app"
  | "globe"
  | "transform"
  | "network"
  | "wrench"
  | "file"
  | "chart"
  | "calendar"
  | "receipt"
  | "kanban"
  | "sparkles"
  | "newspaper"
  | "shield";

/** Accent used by generated cover art when no image is available. */
export type Accent = "blue" | "cyan" | "yellow" | "navy";

export type SeoFields = {
  title?: string;
  description?: string;
};

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  id: string;
  icon: IconName;
  name: Localized;
  description: Localized;
  problem: Localized;
  examples: Localized<string[]>;
};

export type ServiceCategory = {
  id: "ai" | "automation" | "software" | "digital";
  slug: Localized;
  icon: IconName;
  accent: Accent;
  name: Localized;
  shortName: Localized;
  summary: Localized;
  intro: Localized;
  services: Service[];
  seo: Localized<SeoFields>;
};

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

export const productCategories = [
  "ai-tools",
  "business-automation",
  "business-software",
  "web-applications",
  "productivity",
  "finance",
] as const;
export type ProductCategory = (typeof productCategories)[number];

export const productStatuses = ["available", "beta", "in-development", "coming-soon"] as const;
export type ProductStatus = (typeof productStatuses)[number];

export type ProductCta =
  /** Send the visitor to the contact form, pre-filled with this product. */
  | { type: "contact"; label?: Localized }
  /** Only use when a real, working external destination exists. */
  | { type: "external"; url: string; label: Localized };

export type FaqItem = { question: string; answer: string };

export type ProductImage = { src: string; alt: Localized; width: number; height: number };

/** How a product is shown visually on cards and its detail page. */
export type ProductBrand =
  /** ARA app style: coloured app icon + "ARA" wordmark + product label. */
  | { kind: "ara-app"; tone: "blue" | "green" | "amber" | "purple"; icon: string; label: string }
  /** A product with its own logo (transparent image in /public). */
  | { kind: "logo"; src: string; width: number; height: number };

export type Product = {
  id: string;
  slug: string;
  name: string;
  icon: IconName;
  accent: Accent;
  category: ProductCategory;
  status: ProductStatus;
  /** True for illustrative/concept entries that must be replaced before launch. */
  isSample: boolean;
  featured?: boolean;
  tagline: Localized;
  summary: Localized;
  description: Localized<string[]>;
  problem: Localized;
  features: Localized<string[]>;
  audience: Localized<string[]>;
  benefits: Localized<string[]>;
  faq: Localized<FaqItem[]>;
  /** Brand visual (app icon or logo). Generated artwork is used when omitted. */
  brand?: ProductBrand;
  /** Optional product image. Generated artwork is used when omitted. */
  image?: ProductImage;
  screenshots?: ProductImage[];
  /** Only set once pricing is confirmed. */
  pricing?: Localized<{ label: string; price: string; note?: string }[]>;
  cta: ProductCta;
  seo?: Localized<SeoFields>;
};

/* ------------------------------------------------------------------ */
/* News                                                                */
/* ------------------------------------------------------------------ */

export const newsCategories = [
  "company",
  "ai",
  "automation",
  "software",
  "digital-transformation",
  "guides",
  "products",
  "suriname",
] as const;
export type NewsCategory = (typeof newsCategories)[number];

/** Structured article body. Rendered safely without raw HTML. */
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; title?: string; text: string };

export type ArticleTranslation = {
  title: string;
  excerpt: string;
  content: ContentBlock[];
  /** Overrides the derived reading time (in minutes). */
  readingTime?: number;
  seo?: SeoFields;
  coverAlt?: string;
};

export type Author = { name: string; role?: Localized };

export type Article = {
  id: string;
  slug: string;
  category: NewsCategory;
  author: Author;
  /** ISO 8601 date (YYYY-MM-DD). */
  publishedAt: string;
  updatedAt?: string;
  /** Optional cover image in /public. Generated artwork is used when omitted. */
  coverImage?: string;
  icon: IconName;
  accent: Accent;
  /** Demo content that demonstrates the layout and must be reviewed before launch. */
  isDemo: boolean;
  featured?: boolean;
  /** Related CTA target. */
  ctaService?: ServiceCategory["id"];
  /** Available translations. At least one locale must be present. */
  translations: Partial<Record<Locale, ArticleTranslation>>;
};

/* ------------------------------------------------------------------ */
/* Cases                                                               */
/* ------------------------------------------------------------------ */

export const caseTypes = ["client", "internal-demo", "in-progress", "concept"] as const;
export type CaseType = (typeof caseTypes)[number];

export type CaseStudy = {
  id: string;
  slug: string;
  type: CaseType;
  icon: IconName;
  accent: Accent;
  category: ServiceCategory["id"];
  title: Localized;
  summary: Localized;
  challenge: Localized;
  solution: Localized<string[]>;
  technology: string[];
  /** Only fill with verified, confirmed outcomes. */
  outcome?: Localized;
  /** Client name only with explicit permission. */
  client?: string;
  year?: number;
};
