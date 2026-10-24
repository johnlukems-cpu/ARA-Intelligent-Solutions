import type { Localized } from "@/i18n/config";
import type { Product, ProductCategory } from "./types";

/**
 * PRODUCT CATALOGUE
 *
 * ARA's own products. All are currently "coming-soon": they are not yet
 * commercially available, and the texts below are draft descriptions that may
 * change before launch.
 *
 * Rules:
 * - Only use status "available" or "beta" when the product can really be used.
 * - Only add `pricing` once prices are confirmed.
 * - Only use an "external" CTA when a working destination (e.g. checkout) exists.
 * - `isSample: true` marks illustrative placeholder entries (shows a "Concept" label).
 */

export const productCategoryLabels: Record<ProductCategory, Localized> = {
  "ai-tools": { nl: "AI-tools", en: "AI Tools" },
  "business-automation": { nl: "Bedrijfsautomatisering", en: "Business Automation" },
  "business-software": { nl: "Bedrijfssoftware", en: "Business Software" },
  "web-applications": { nl: "Webapplicaties", en: "Web Applications" },
  productivity: { nl: "Productiviteit", en: "Productivity" },
  finance: { nl: "Financiële oplossingen", en: "Finance Solutions" },
};

export const products: Product[] = [
  {
    id: "prod-payroll",
    slug: "ara-payroll",
    name: "ARA Payroll",
    icon: "receipt",
    accent: "blue",
    brand: { kind: "ara-app", tone: "blue", icon: "/images/products/ara-payroll-icon.png", label: "Payroll" },
    category: "finance",
    status: "coming-soon",
    isSample: false,
    featured: true,
    tagline: {
      nl: "Salarisadministratie en loonverwerking.",
      en: "Payroll administration and processing.",
    },
    summary: {
      nl: "Software voor de salarisadministratie: van personeelsgegevens en looncomponenten tot loonstroken en overzichten per periode.",
      en: "Payroll software: from employee data and pay components to payslips and per-period overviews.",
    },
    description: {
      nl: [
        "ARA Payroll brengt de salarisadministratie samen in één omgeving. Medewerkergegevens, looncomponenten en verwerkingen per periode worden centraal vastgelegd, zodat de loonverwerking overzichtelijk en controleerbaar blijft.",
        "Het product wordt ontwikkeld met de praktijk van organisaties in Suriname in gedachten en sluit aan op ARA Accounting en ARA HR.",
      ],
      en: [
        "ARA Payroll brings payroll administration together in one environment. Employee data, pay components and per-period processing are recorded centrally, keeping payroll clear and verifiable.",
        "The product is being developed with the practice of organizations in Suriname in mind and connects to ARA Accounting and ARA HR.",
      ],
    },
    problem: {
      nl: "Salarissen worden vaak in spreadsheets berekend. Dat kost elke periode veel tijd, is foutgevoelig en maakt het lastig om terug te zien hoe een bedrag tot stand kwam.",
      en: "Salaries are often calculated in spreadsheets. That takes a lot of time every period, is error-prone and makes it hard to trace how an amount was calculated.",
    },
    features: {
      nl: [
        "Centrale vastlegging van medewerkers en looncomponenten",
        "Loonverwerking per periode",
        "Digitale loonstroken",
        "Overzichten en rapportages voor administratie en management",
      ],
      en: [
        "Central records of employees and pay components",
        "Per-period payroll processing",
        "Digital payslips",
        "Overviews and reports for administration and management",
      ],
    },
    audience: {
      nl: ["Kleine en middelgrote ondernemingen", "Administratiekantoren", "HR- en financiële afdelingen"],
      en: ["Small and medium-sized businesses", "Accounting firms", "HR and finance departments"],
    },
    benefits: {
      nl: ["Minder handwerk per loonperiode", "Minder rekenfouten", "Alle salarisgegevens op één plek"],
      en: ["Less manual work per pay period", "Fewer calculation errors", "All payroll data in one place"],
    },
    faq: {
      nl: [
        {
          question: "Wanneer komt ARA Payroll beschikbaar?",
          answer: "ARA Payroll komt binnenkort beschikbaar. Laat uw interesse achter via het contactformulier, dan houden we u op de hoogte.",
        },
        {
          question: "Werkt ARA Payroll samen met de andere ARA-producten?",
          answer: "Ja, ARA Payroll wordt ontwikkeld om aan te sluiten op ARA Accounting en ARA HR.",
        },
      ],
      en: [
        {
          question: "When will ARA Payroll be available?",
          answer: "ARA Payroll is coming soon. Register your interest through the contact form and we will keep you informed.",
        },
        {
          question: "Does ARA Payroll work with the other ARA products?",
          answer: "Yes, ARA Payroll is being developed to connect with ARA Accounting and ARA HR.",
        },
      ],
    },
    cta: { type: "contact" },
  },
  {
    id: "prod-accounting",
    slug: "ara-accounting",
    name: "ARA Accounting",
    icon: "chart",
    accent: "cyan",
    brand: { kind: "ara-app", tone: "green", icon: "/images/products/ara-accounting-icon.png", label: "Accounting" },
    category: "finance",
    status: "coming-soon",
    isSample: false,
    featured: true,
    tagline: {
      nl: "Boekhouding en financiële administratie.",
      en: "Bookkeeping and financial administration.",
    },
    summary: {
      nl: "Overzichtelijke boekhoudsoftware voor de dagelijkse financiële administratie, met inzicht in uw cijfers wanneer u het nodig heeft.",
      en: "Clear accounting software for day-to-day financial administration, with insight into your figures whenever you need it.",
    },
    description: {
      nl: [
        "ARA Accounting ondersteunt de dagelijkse boekhouding: het vastleggen van inkomsten en uitgaven, het bijhouden van debiteuren en crediteuren en het opstellen van financiële overzichten.",
        "Omdat veel ondernemingen in Suriname met meerdere valuta werken, is dat vanaf het begin een uitgangspunt in het ontwerp.",
      ],
      en: [
        "ARA Accounting supports day-to-day bookkeeping: recording income and expenses, keeping track of receivables and payables and producing financial overviews.",
        "Because many businesses in Suriname work with multiple currencies, that is a design principle from the start.",
      ],
    },
    problem: {
      nl: "Financiële gegevens staan verspreid over bonnen, spreadsheets en bankafschriften. Daardoor is er pas laat inzicht in de cijfers en kost de periodeafsluiting veel tijd.",
      en: "Financial data is scattered across receipts, spreadsheets and bank statements. Insight into the figures comes late, and closing a period takes a lot of time.",
    },
    features: {
      nl: [
        "Vastleggen van inkomsten en uitgaven",
        "Debiteuren- en crediteurenbeheer",
        "Ondersteuning voor meerdere valuta",
        "Financiële overzichten en rapportages",
      ],
      en: [
        "Recording income and expenses",
        "Receivables and payables management",
        "Multi-currency support",
        "Financial overviews and reports",
      ],
    },
    audience: {
      nl: ["Ondernemers en zzp'ers", "Kleine en middelgrote ondernemingen", "Administratiekantoren"],
      en: ["Entrepreneurs and freelancers", "Small and medium-sized businesses", "Accounting firms"],
    },
    benefits: {
      nl: ["Actueel inzicht in uw financiën", "Snellere periodeafsluiting", "Minder losse bestanden"],
      en: ["Up-to-date insight into your finances", "Faster period closing", "Fewer scattered files"],
    },
    faq: {
      nl: [
        {
          question: "Wanneer komt ARA Accounting beschikbaar?",
          answer: "ARA Accounting komt binnenkort beschikbaar. Laat uw interesse achter, dan houden we u op de hoogte.",
        },
        {
          question: "Kan ik met meerdere valuta werken?",
          answer: "Ondersteuning voor meerdere valuta, zoals SRD, USD en EUR, is een uitgangspunt bij de ontwikkeling.",
        },
      ],
      en: [
        {
          question: "When will ARA Accounting be available?",
          answer: "ARA Accounting is coming soon. Register your interest and we will keep you informed.",
        },
        {
          question: "Can I work with multiple currencies?",
          answer: "Support for multiple currencies, such as SRD, USD and EUR, is a design principle in its development.",
        },
      ],
    },
    cta: { type: "contact" },
  },
  {
    id: "prod-tax",
    slug: "ara-tax",
    name: "ARA Tax",
    icon: "file",
    accent: "yellow",
    brand: { kind: "ara-app", tone: "amber", icon: "/images/products/ara-tax-icon.png", label: "Tax" },
    category: "finance",
    status: "coming-soon",
    isSample: false,
    tagline: {
      nl: "Belastingaangiften en fiscale overzichten.",
      en: "Tax returns and tax overviews.",
    },
    summary: {
      nl: "Ondersteuning bij het voorbereiden van belastingaangiften, met heldere fiscale overzichten en grip op deadlines.",
      en: "Support for preparing tax returns, with clear tax overviews and a firm grip on deadlines.",
    },
    description: {
      nl: [
        "ARA Tax helpt bij het verzamelen en voorbereiden van de gegevens die nodig zijn voor belastingaangiften. Fiscale overzichten per periode maken zichtbaar wat er speelt en wat er nog moet gebeuren.",
        "ARA Tax wordt ontwikkeld om samen te werken met ARA Accounting en ARA Payroll, zodat gegevens niet opnieuw ingevoerd hoeven te worden.",
      ],
      en: [
        "ARA Tax helps collect and prepare the data needed for tax returns. Tax overviews per period show what is going on and what still needs to be done.",
        "ARA Tax is being developed to work together with ARA Accounting and ARA Payroll, so data does not need to be entered twice.",
      ],
    },
    problem: {
      nl: "Het voorbereiden van belastingaangiften kost veel zoekwerk in losse administraties, en deadlines komen vaak onverwacht snel dichterbij.",
      en: "Preparing tax returns involves a lot of searching through separate records, and deadlines often approach unexpectedly fast.",
    },
    features: {
      nl: [
        "Voorbereiding van aangiftegegevens",
        "Fiscale overzichten per periode",
        "Overzicht van deadlines en herinneringen",
        "Aansluiting op ARA Accounting en ARA Payroll",
      ],
      en: [
        "Preparation of tax return data",
        "Tax overviews per period",
        "Overview of deadlines and reminders",
        "Connection with ARA Accounting and ARA Payroll",
      ],
    },
    audience: {
      nl: ["Ondernemers", "Financiële afdelingen", "Administratie- en belastingadvieskantoren"],
      en: ["Business owners", "Finance departments", "Accounting and tax advisory firms"],
    },
    benefits: {
      nl: ["Minder zoekwerk bij aangiftes", "Beter overzicht van fiscale verplichtingen", "Deadlines tijdig in beeld"],
      en: ["Less searching when filing", "Better overview of tax obligations", "Deadlines in view on time"],
    },
    faq: {
      nl: [
        {
          question: "Dient ARA Tax de aangifte voor mij in?",
          answer: "Hoe aangiftes worden ingediend, wordt tijdens de ontwikkeling bepaald. Laat ons weten wat u nodig heeft via het contactformulier.",
        },
        {
          question: "Wanneer komt ARA Tax beschikbaar?",
          answer: "ARA Tax komt binnenkort beschikbaar. Registreer uw interesse om op de hoogte te blijven.",
        },
      ],
      en: [
        {
          question: "Does ARA Tax file the return for me?",
          answer: "How returns are filed will be determined during development. Let us know what you need through the contact form.",
        },
        {
          question: "When will ARA Tax be available?",
          answer: "ARA Tax is coming soon. Register your interest to stay informed.",
        },
      ],
    },
    cta: { type: "contact" },
  },
  {
    id: "prod-hr",
    slug: "ara-hr",
    name: "ARA HR",
    icon: "network",
    accent: "navy",
    brand: { kind: "ara-app", tone: "purple", icon: "/images/products/ara-hr-icon.png", label: "HR" },
    category: "business-software",
    status: "coming-soon",
    isSample: false,
    tagline: {
      nl: "Personeelsbeheer en HR-processen.",
      en: "Personnel management and HR processes.",
    },
    summary: {
      nl: "Eén plek voor personeelsgegevens en HR-processen, zoals verlof, contracten en onboarding van nieuwe medewerkers.",
      en: "One place for employee data and HR processes, such as leave, contracts and onboarding of new employees.",
    },
    description: {
      nl: [
        "ARA HR brengt personeelsgegevens en HR-processen samen. Medewerkers, contracten, verlof en documenten worden centraal beheerd, met duidelijke rollen en rechten.",
        "Door de koppeling met ARA Payroll hoeven medewerkergegevens maar één keer te worden vastgelegd.",
      ],
      en: [
        "ARA HR brings employee data and HR processes together. Employees, contracts, leave and documents are managed centrally, with clear roles and permissions.",
        "Thanks to the connection with ARA Payroll, employee data only needs to be recorded once.",
      ],
    },
    problem: {
      nl: "Personeelsdossiers, verlofaanvragen en contracten worden vaak op papier of in losse bestanden bijgehouden. Dat maakt HR-processen traag en foutgevoelig.",
      en: "Personnel files, leave requests and contracts are often kept on paper or in separate files. That makes HR processes slow and error-prone.",
    },
    features: {
      nl: [
        "Digitale personeelsdossiers",
        "Verlofaanvragen en -goedkeuring",
        "Beheer van contracten en documenten",
        "Onboarding van nieuwe medewerkers",
      ],
      en: [
        "Digital personnel files",
        "Leave requests and approval",
        "Contract and document management",
        "Onboarding of new employees",
      ],
    },
    audience: {
      nl: ["HR-afdelingen", "Leidinggevenden", "Groeiende organisaties"],
      en: ["HR departments", "Managers", "Growing organizations"],
    },
    benefits: {
      nl: ["Alle personeelsinformatie op één plek", "Snellere afhandeling van aanvragen", "Minder papierwerk"],
      en: ["All personnel information in one place", "Faster handling of requests", "Less paperwork"],
    },
    faq: {
      nl: [
        {
          question: "Wanneer komt ARA HR beschikbaar?",
          answer: "ARA HR komt binnenkort beschikbaar. Laat uw interesse achter, dan houden we u op de hoogte.",
        },
      ],
      en: [
        {
          question: "When will ARA HR be available?",
          answer: "ARA HR is coming soon. Register your interest and we will keep you informed.",
        },
      ],
    },
    cta: { type: "contact" },
  },
  {
    id: "prod-bouwflow",
    slug: "bouwflow",
    name: "BouwFlow",
    icon: "kanban",
    accent: "blue",
    brand: { kind: "logo", src: "/images/products/bouwflow-logo.png", width: 1183, height: 1010 },
    category: "business-software",
    status: "coming-soon",
    isSample: false,
    featured: true,
    tagline: {
      nl: "Bouw • Installatie • Projecten",
      en: "Construction • Installation • Projects",
    },
    summary: {
      nl: "Projectsoftware voor bouw- en installatiebedrijven: planning, uitvoering en administratie van projecten in één overzicht.",
      en: "Project software for construction and installation companies: planning, execution and administration of projects in one overview.",
    },
    description: {
      nl: [
        "BouwFlow is ontworpen voor bedrijven in de bouw en installatietechniek. Projecten, planning, medewerkers en voortgang komen samen in één omgeving, zodat kantoor en werkvloer met dezelfde informatie werken.",
        "Het product richt zich op overzicht en eenvoud, zodat ook teams op de bouwplaats er zonder lange training mee kunnen werken.",
      ],
      en: [
        "BouwFlow is designed for companies in construction and installation. Projects, planning, staff and progress come together in one environment, so the office and the work site use the same information.",
        "The product focuses on clarity and simplicity, so teams on site can use it without lengthy training.",
      ],
    },
    problem: {
      nl: "Bij bouw- en installatieprojecten raakt informatie verspreid over telefoon, berichten, papier en spreadsheets. Dat leidt tot misverstanden, vertraging en onduidelijkheid over de voortgang.",
      en: "In construction and installation projects, information gets scattered across phone calls, messages, paper and spreadsheets. That leads to misunderstandings, delays and unclear progress.",
    },
    features: {
      nl: [
        "Projectoverzicht met planning en voortgang",
        "Inzet van medewerkers en ploegen",
        "Urenregistratie per project",
        "Documenten en foto's per project",
      ],
      en: [
        "Project overview with planning and progress",
        "Scheduling of staff and crews",
        "Time tracking per project",
        "Documents and photos per project",
      ],
    },
    audience: {
      nl: ["Bouwbedrijven", "Installatiebedrijven", "Projectleiders en uitvoerders"],
      en: ["Construction companies", "Installation companies", "Project managers and site supervisors"],
    },
    benefits: {
      nl: ["Eén actueel beeld van elk project", "Betere afstemming tussen kantoor en bouwplaats", "Minder misverstanden en vertraging"],
      en: ["One up-to-date picture of every project", "Better coordination between office and site", "Fewer misunderstandings and delays"],
    },
    faq: {
      nl: [
        {
          question: "Wanneer komt BouwFlow beschikbaar?",
          answer: "BouwFlow komt binnenkort beschikbaar. Laat uw interesse achter via het contactformulier, dan houden we u op de hoogte.",
        },
        {
          question: "Werkt BouwFlow ook op een telefoon?",
          answer: "BouwFlow wordt ontworpen om ook op de bouwplaats bruikbaar te zijn. De precieze mogelijkheden worden bij de lancering bekendgemaakt.",
        },
      ],
      en: [
        {
          question: "When will BouwFlow be available?",
          answer: "BouwFlow is coming soon. Register your interest through the contact form and we will keep you informed.",
        },
        {
          question: "Does BouwFlow work on a phone?",
          answer: "BouwFlow is being designed to be usable on the work site as well. The exact capabilities will be announced at launch.",
        },
      ],
    },
    cta: { type: "contact" },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(limit = 3): Product[] {
  const featured = products.filter((product) => product.featured);
  return (featured.length ? featured : products).slice(0, limit);
}

export function hasSampleProducts(): boolean {
  return products.some((product) => product.isSample);
}

/** True when any product is not yet usable (coming soon / in development). */
export function hasUnreleasedProducts(): boolean {
  return products.some((product) => product.status === "coming-soon" || product.status === "in-development");
}
