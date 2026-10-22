import type { CaseStudy } from "./types";

/**
 * CASES & PROJECTS
 *
 * Every entry must have an honest `type`:
 * - "client":        completed client project (only with the client's permission)
 * - "internal-demo": a working demonstration built by ARA
 * - "in-progress":   work that is currently being built
 * - "concept":       an idea or design that has not been built
 *
 * Only fill `outcome` with verified, confirmed results. Never invent client
 * names, testimonials or figures.
 */
export const cases: CaseStudy[] = [
  {
    id: "case-ara-website",
    slug: "ara-website",
    type: "in-progress",
    icon: "globe",
    accent: "cyan",
    category: "digital",
    year: 2026,
    title: {
      nl: "Tweetalige website van ARA Intelligent Solutions",
      en: "Bilingual website for ARA Intelligent Solutions",
    },
    summary: {
      nl: "De website die u nu bekijkt: een snelle, toegankelijke en tweetalige bedrijfswebsite met productcatalogus en kennisbank.",
      en: "The website you are viewing now: a fast, accessible, bilingual corporate website with a product catalogue and knowledge base.",
    },
    challenge: {
      nl: "ARA had een professionele online aanwezigheid nodig die het merk uitstraalt, zowel lokale als internationale bezoekers bedient en eenvoudig kan meegroeien met nieuwe producten en artikelen.",
      en: "ARA needed a professional online presence that reflects the brand, serves both local and international visitors and can easily grow with new products and articles.",
    },
    solution: {
      nl: [
        "Volledig tweetalige opbouw (Nederlands en Engels) met taalspecifieke URL's",
        "Centraal beheerde content voor diensten, producten, nieuws en cases",
        "Zoek- en filterfunctionaliteit voor producten en artikelen",
        "Aandacht voor toegankelijkheid, snelheid en vindbaarheid in zoekmachines",
      ],
      en: [
        "Fully bilingual structure (Dutch and English) with language-specific URLs",
        "Centrally managed content for services, products, news and cases",
        "Search and filtering for products and articles",
        "Attention to accessibility, speed and search engine discoverability",
      ],
    },
    technology: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "case-document-intake",
    slug: "ai-documentverwerking",
    type: "concept",
    icon: "file",
    accent: "blue",
    category: "ai",
    title: {
      nl: "AI-ondersteunde verwerking van inkomende documenten",
      en: "AI-assisted processing of incoming documents",
    },
    summary: {
      nl: "Concept voor het automatisch herkennen, uitlezen en doorsturen van formulieren en facturen, met controle door medewerkers.",
      en: "Concept for automatically recognizing, reading and routing forms and invoices, with review by employees.",
    },
    challenge: {
      nl: "Administratieve teams typen gegevens uit documenten handmatig over in verschillende systemen. Dat is tijdrovend en foutgevoelig.",
      en: "Administrative teams manually retype data from documents into various systems. This is time-consuming and error-prone.",
    },
    solution: {
      nl: [
        "Documenttype en belangrijke velden automatisch herkennen",
        "Controlestap waarin een medewerker gegevens bevestigt of corrigeert",
        "Bevestigde gegevens via een koppeling doorsturen naar het juiste systeem",
      ],
      en: [
        "Automatically recognize document type and key fields",
        "Review step in which an employee confirms or corrects data",
        "Route confirmed data to the right system via an integration",
      ],
    },
    technology: ["Document AI", "Workflow automation", "REST API"],
  },
  {
    id: "case-booking-platform",
    slug: "online-boekingsplatform",
    type: "concept",
    icon: "calendar",
    accent: "yellow",
    category: "software",
    title: {
      nl: "Online boekingsplatform voor dienstverleners",
      en: "Online booking platform for service providers",
    },
    summary: {
      nl: "Concept voor een mobielvriendelijke webapplicatie waarmee klanten zelf afspraken inplannen.",
      en: "Concept for a mobile-friendly web application that lets customers schedule appointments themselves.",
    },
    challenge: {
      nl: "Dienstverleners plannen afspraken via telefoon en berichten, wat veel tijd kost en tot dubbele boekingen leidt.",
      en: "Service providers schedule appointments via phone and messages, which takes a lot of time and leads to double bookings.",
    },
    solution: {
      nl: [
        "Online agenda met realtime beschikbaarheid",
        "Automatische bevestigingen en herinneringen",
        "Eenvoudige beheeromgeving voor medewerkers",
      ],
      en: [
        "Online calendar with real-time availability",
        "Automatic confirmations and reminders",
        "Simple management environment for staff",
      ],
    },
    technology: ["Web application", "Notifications", "Calendar integration"],
  },
  {
    id: "case-reporting",
    slug: "geautomatiseerde-rapportages",
    type: "concept",
    icon: "chart",
    accent: "navy",
    category: "automation",
    title: {
      nl: "Geautomatiseerde maandrapportages",
      en: "Automated monthly reporting",
    },
    summary: {
      nl: "Concept voor het automatisch verzamelen van cijfers uit meerdere bronnen in één actueel dashboard en maandrapport.",
      en: "Concept for automatically collecting figures from multiple sources into one up-to-date dashboard and monthly report.",
    },
    challenge: {
      nl: "Managementrapportages worden elke maand handmatig samengesteld uit spreadsheets en exports, wat uren kost en tot verschillen leidt.",
      en: "Management reports are compiled manually every month from spreadsheets and exports, which takes hours and leads to discrepancies.",
    },
    solution: {
      nl: [
        "Koppelingen met de belangrijkste gegevensbronnen",
        "Centrale, gecontroleerde dataset",
        "Dashboard en automatisch verstuurd maandrapport",
      ],
      en: [
        "Integrations with the main data sources",
        "Central, validated dataset",
        "Dashboard and automatically sent monthly report",
      ],
    },
    technology: ["Data integration", "Dashboards", "Scheduled jobs"],
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((item) => item.slug === slug);
}

export function hasClientCases(): boolean {
  return cases.some((item) => item.type === "client");
}
