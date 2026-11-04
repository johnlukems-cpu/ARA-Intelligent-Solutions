# ARA Intelligent Solutions — website

**Intelligence That Moves Business Forward.**
Bilingual (Dutch default, English) corporate website for ARA Intelligent Solutions, a technology company based in Suriname.

## Stack

- **Next.js 16** (App Router, React Server Components, static generation), **React 19**, **TypeScript** (strict)
- **Tailwind CSS 4** with design tokens in `src/app/globals.css`
- **lucide-react** for icons; `next/font` (Inter + Montserrat, self-hosted at build time); `next/image` for optimized images
- No database or CMS: content is typed TypeScript data in `src/content/`

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in what you have
npm run dev                  # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (type-checks and prerenders all pages) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check:links` | Crawls a running site and fails on any broken internal link or asset (`BASE_URL` defaults to `http://localhost:3000`) |

Requires Node.js 20.9 or newer (Next.js 16 requirement).

## Routes

| Dutch (default) | English |
| --- | --- |
| `/` | `/en` |
| `/ai-medewerkers` | `/en/ai-assistants` |
| `/academy`, `/academy/[slug]` | `/en/academy`, `/en/academy/[slug]` |
| `/prijzen` | `/en/pricing` |
| `/diensten`, `/diensten/ai-solutions`, `/diensten/digital-solutions`, `/diensten/it-business-technology` | `/en/services`, `/en/services/ai-solutions`, `/en/services/digital-solutions`, `/en/services/it-business-technology` |
| `/producten`, `/producten/[slug]` | `/en/products`, `/en/products/[slug]` |
| `/nieuws`, `/nieuws/[slug]` | `/en/news`, `/en/news/[slug]` |
| `/cases`, `/cases/[slug]` | `/en/cases`, `/en/cases/[slug]` |
| `/over-ons` | `/en/about` |
| `/contact` | `/en/contact` |
| `/privacy`, `/voorwaarden`, `/cookies` | `/en/privacy`, `/en/terms`, `/en/cookies` |

Old URLs (`/diensten/ai-oplossingen`, `/diensten/bedrijfsautomatisering`, `/diensten/softwareontwikkeling`, `/diensten/web-en-digitaal`, their English equivalents and `/ai-academy/...`) permanently redirect to the new routes (`next.config.ts`).

Also: `/sitemap.xml`, `/robots.txt`, `POST /api/contact`, `POST /api/academy`. Unknown URLs get a bilingual 404 page (`src/app/global-not-found.tsx`).

## Project structure

```
src/
  app/
    (nl)/…            Dutch route tree, with its own root layout (<html lang="nl">)
    (en)/en/…         English route tree, with its own root layout (<html lang="en">)
    api/contact/      Contact form endpoint
    global-not-found.tsx, sitemap.ts, robots.ts, icon.png, apple-icon.png
  views/              One component per page type, shared by both languages
  components/         layout/ (header, footer, logo), ui/, cards/, explorers/ (search + filters), forms/
  content/            Services, products, news, cases, legal texts (typed data)
  i18n/               Locales, localized URL map and the UI dictionaries
  lib/                SEO metadata, contact validation and delivery, formatting helpers
  config/site.ts      Site name, URL, contact details and social links (from env)
  assets/images/      Brand imagery derived from the supplied ARA artwork
docs/design-reference.webp   The original website mock-up used as the visual reference
```

The route files under `src/app` are thin wrappers: each calls a view from `src/views` with its locale, so both languages always render the same page.

## Brand assets

| File | Use | Source |
| --- | --- | --- |
| `src/assets/images/ara-wordmark.webp` | Header and footer logo, 404 page | The ARA wordmark without the macaw (`scripts/brand-assets/make_wordmark.py`, derived from `ara-logo-dark.webp`; the first A is a copy of the last A because the macaw overlapped it). "INTELLIGENT SOLUTIONS" and the tagline are live text in `src/components/layout/logo.tsx`, so they stay readable at small sizes. |
| `src/assets/images/ara-logo-dark.webp` | Source only | The original ARA logo with the macaw, on a transparent background (`scripts/brand-assets/make_logo_dark.py`). |
| `src/app/icon.png`, `src/app/apple-icon.png`, `public/images/ara-emblem-192.png` | Favicons and structured-data logo | ARA wordmark on midnight blue, no macaw (`python3 scripts/brand-assets/make_icons.py`) |
| `src/assets/images/robot-hero.webp` | Homepage hero, About page | ARA robot artwork (robot at a laptop) with its own background; the outer edges fade into the hero |
| `src/assets/images/robot-office.webp` | Homepage about card, About page | The same robot artwork without edge fades (robot fully visible) |
| `src/assets/images/robot-ai-process.webp`, `robot-<specialisation>.webp` | AI-medewerkers hero and specialisation cards | AI-medewerkers infographic |
| `public/og/ara-og.jpg` | Social preview image | ARA promo artwork |
| `src/assets/images/suriname-river.webp` | Call-to-action band | Original brand artwork |

The macaw is no longer used anywhere on the site: the logo and icons use the ARA wordmark, illustrations use the ARA robot. `scripts/brand-assets/make_robot_assets.py` regenerates the robot images from the three supplied artworks: `python3 scripts/brand-assets/make_robot_assets.py 9.webp 10.webp 11.webp .`

## Editing content

All content lives in `src/content/`. Pages, cards, the footer, the sitemap and search pick up changes automatically.

- **Divisions and services**: `services.ts`. ARA works as four divisions under one brand: ARA AI Solutions, ARA Digital Solutions, ARA AI Academy and ARA IT & Business Technology. The three service divisions each have four services (offerings, examples, benefits) plus applications, benefits, working process, FAQ, CTA and SEO texts. `divisions` defines the order used by the header dropdown, footer, homepage and services page (the Academy entry links to `/academy`). The AI division note states human oversight; the IT note explains which services ARA delivers directly and which through partners.
- **Products**: `products.ts`. The catalogue contains ARA Payroll, ARA Accounting, ARA Tax, ARA HR and BouwFlow, all with status `coming-soon`. Their descriptions, features and FAQs are draft texts; check them before launch. Rules (also documented in the file):
  - `status`: `available`, `beta`, `in-development` or `coming-soon`. Only use `available`/`beta` for products that really exist. While any product is unreleased, the catalogue shows a "coming soon, details may change" notice.
  - `brand`: `{ kind: "ara-app", tone, label }` shows the ARA app style (a coloured tile with the product's `icon` + "ARA" + name as live text). `{ kind: "logo", src, width, height }` shows a product's own logo (BouwFlow, in `public/images/products/`). Without `brand`, generated artwork is used.
  - `pricing` is optional. Leave it out until prices are confirmed; the page then says pricing has not been announced.
  - `cta`: `{ type: "contact" }` sends visitors to the contact form with the product pre-selected. Only use `{ type: "external", url, label }` once a working destination such as a checkout exists.
  - `isSample: true` marks illustrative placeholder entries with a "Concept" label (none at the moment).
- **Pricing**: `pricing.ts`. Seven packages (USD), the extra Google Workspace users card, general terms and the pricing FAQ. Quote buttons open the contact form with `?topic=package:<id>` pre-selected.
- **ARA AI Medewerkers**: `ai-employees.ts`. The three AI packages (introductory prices), the five specialisations, the five-step "how it works", separate costs, safety principles and terms. The page lives at `/ai-medewerkers`; a teaser block appears on the homepage, services, the AI service area and the pricing page.
- **ARA AI Academy**: `academy.ts`. Prices for all courses are set in one place, `coursePrices` at the top of the file (USD; `null` means "price on request", which changes the card, the detail page and the form to "Request information"). Upcoming sessions go in `upcomingSessions` (empty = an honest "no dates scheduled" message; only add confirmed dates). The six trainings (duration, language, duration, included items, programme, audience, outcomes), training formats, what participants receive, the Claude topics, official Anthropic links, pricing terms and the FAQ. Each training has its own page at `/academy/<slug>`. The registration form posts to `/api/academy` and uses the same delivery integration as the contact form (Resend or webhook; the webhook payload has `type: "academy_registration"`). "Register" buttons pre-select the training via `?training=<id>`; the form shows the price and an estimated total. Submitting is a request, not a confirmed registration.
  - ARA is not presented as an Anthropic partner, no Anthropic or Claude logos are used, and the certificate is described as an ARA certificate of participation. Keep it that way unless a partnership is officially confirmed.
- **News**: create a file in `content/news/articles/`, then add it to the list in `content/news/index.ts`. Provide `translations.nl` and/or `translations.en`. The body uses structured blocks (`paragraph`, `heading`, `subheading`, `list`, `quote`, `callout`), so no HTML is needed and nothing unsafe gets rendered. Reading time is calculated automatically.
  - **Missing translations**: an article without English is still listed in the English section with an "Only available in Dutch" label. Its page shows the original text with a notice, is `noindex` and points its canonical URL at the original. The language switch on such a page goes to the news overview.
  - `isDemo: true` shows a "sample article" notice. **All seven current articles are demo content** (general, factual guidance; no company announcements). Review or replace them before launch.
- **Cases**: `cases.ts`. `type` must be honest: `client` (only with the client's permission), `internal-demo`, `in-progress` or `concept`. Leave `outcome` empty unless results are verified. There are currently **no client projects**. The entries are this website (work in progress) and three concepts, all clearly labeled.
- **Legal pages**: `legal.ts`. These are **drafts** with placeholders in `[square brackets]` and a visible draft notice.
- **UI text**: `src/i18n/dictionaries.ts`. The English dictionary is typed against the Dutch one, so a missing translation is a compile error.

## Environment variables

See `.env.example`. Nothing is hardcoded; any value left empty is simply not shown.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production URL. Used for canonical URLs, sitemap, Open Graph and structured data. **Required for launch.** |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_WHATSAPP_NUMBER` | Verified public contact details. Shown in the footer and on the contact page only when set. |
| `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_FACEBOOK_URL`, `NEXT_PUBLIC_INSTAGRAM_URL` | Social profiles. Icons appear in the footer only when set. |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact and AI Academy form delivery via [Resend](https://resend.com) (the sender domain must be verified there). |
| `CONTACT_WEBHOOK_URL`, `CONTACT_WEBHOOK_SECRET` | Alternative: POST each message as JSON to a webhook (n8n, Make, Zapier, …). The secret is sent as the `X-Webhook-Secret` header. |

`NEXT_PUBLIC_*` values are inlined at build time, so rebuild after changing them.

## Contact form

The form validates on the client and again on the server (`src/lib/contact.ts`), with localized messages. `POST /api/contact`:

- rejects cross-origin requests, non-JSON bodies and bodies over 16 KB
- blocks basic spam with a hidden honeypot field and a minimum fill time of 3 seconds
- rate-limits each IP to 5 messages per 10 minutes. This limiter is in memory and per server instance; on serverless or multi-instance hosting, replace it with a shared store such as Redis.
- delivers through Resend if configured, otherwise through the webhook if configured

It never fakes success:

| Situation | Result |
| --- | --- |
| Integration configured, delivery succeeded | Success message |
| Integration configured, delivery failed | Error message (HTTP 502) |
| No integration, development | Validated and logged on the server; the UI says *"Development mode: message not sent"* |
| No integration, production | The UI says the form is not set up yet (HTTP 503) |

Webhook payloads contain the visitor's raw text (validated and stripped of control characters). Escape it if your automation renders HTML. The Resend email is already escaped.

## SEO and accessibility

- Unique localized titles and descriptions, canonical URLs, `hreflang` alternates (including `x-default`), Open Graph and Twitter cards (`public/og/ara-og.jpg`)
- `sitemap.xml` with language alternates, `robots.txt`, JSON-LD (Organization, BreadcrumbList, Article)
- Correct `lang` on every page, and on any content shown in the other language
- Semantic landmarks, a skip link, visible focus states, labeled form fields with `aria-invalid` and linked error messages, an accessible mobile menu (focus trap, Escape to close, focus returns to the button), and filters exposed as toggle buttons with `aria-pressed`
- Status labels always combine text and an icon, so status is never shown by color alone
- `prefers-reduced-motion` is respected
- Security headers (HSTS, `X-Frame-Options`, `nosniff`, Referrer-Policy, Permissions-Policy) are set in `next.config.ts`

## Quality checks run during development

- `npm run lint`, `npm run typecheck` and `npm run build`: all pass (69 prerendered routes)
- `npm run check:links` against the production build: all 58 HTML pages plus the sitemap, robots.txt and 28 assets return 200
- Browser checks (Playwright/Chromium) of every sitemap URL at 320, 375, 768, 1024 and 1440 px: no horizontal overflow, broken images or console errors, and exactly one `<h1>` per page
- axe-core (WCAG 2.0/2.1/2.2 A and AA plus best practices) on every page at desktop and mobile width: 0 violations
- 30 interaction checks: mobile menu, language switching, product and news search and filters, load more, contact form validation, `?topic=` pre-fill and the honest not-configured response
- Contact API: validation, honeypot, rate limit, origin and content-type checks, and real delivery to a local test webhook

## Launch checklist

1. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
2. Configure contact delivery (Resend or a webhook) and send a test message.
3. Add verified contact details and social URLs, or leave them empty.
4. Have the privacy policy, terms and cookie policy reviewed and completed (all `[placeholders]`), then remove the draft notice (`legal.draftNotice` in the dictionaries).
5. Confirm or replace the concept products and the demo articles. Set `isSample`/`isDemo` to `false` only for real, confirmed content.
6. Add real client cases once clients have given permission.
7. If analytics are added later, update the cookie policy and add a consent mechanism where required.
8. On multi-instance or serverless hosting, move the contact rate limiter to a shared store.
