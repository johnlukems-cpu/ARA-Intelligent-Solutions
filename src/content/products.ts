import type { Localized } from "@/i18n/config";
import type { Product, ProductCategory } from "./types";

/**
 * PRODUCT CATALOGUE
 *
 * ⚠️  All entries below are CONCEPT products (isSample: true). They illustrate
 * the catalogue structure and ARA's product direction, but are NOT released or
 * commercially available. Replace or confirm each entry before launch.
 *
 * Rules:
 * - Only use status "available" or "beta" when the product really exists.
 * - Only add `pricing` once prices are confirmed.
 * - Only use an "external" CTA when a working destination (e.g. checkout) exists.
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
    id: "prod-knowledge",
    slug: "ara-kennisassistent",
    name: "ARA Knowledge Assistant",
    icon: "bot",
    accent: "cyan",
    category: "ai-tools",
    status: "in-development",
    isSample: true,
    featured: true,
    tagline: {
      nl: "Antwoorden uit uw eigen documenten, met bronvermelding.",
      en: "Answers from your own documents, with source references.",
    },
    summary: {
      nl: "Een AI-assistent die vragen van medewerkers beantwoordt op basis van interne documenten, procedures en beleid.",
      en: "An AI assistant that answers employee questions based on internal documents, procedures and policies.",
    },
    description: {
      nl: [
        "ARA Knowledge Assistant is een conceptproduct dat organisaties helpt hun interne kennis beter toegankelijk te maken. Medewerkers stellen een vraag in gewone taal en krijgen een antwoord op basis van goedgekeurde documenten — met verwijzingen naar de bron.",
        "Het uitgangspunt is betrouwbaarheid: de assistent antwoordt alleen op basis van de documenten die u toevoegt en geeft aan wanneer het antwoord niet in de bronnen te vinden is.",
      ],
      en: [
        "ARA Knowledge Assistant is a concept product that helps organizations make their internal knowledge more accessible. Employees ask a question in plain language and get an answer based on approved documents — with references to the source.",
        "Reliability is the starting point: the assistant only answers based on the documents you add and indicates when an answer cannot be found in the sources.",
      ],
    },
    problem: {
      nl: "Medewerkers zoeken lang naar procedures en beleid, of stellen steeds dezelfde vragen aan collega's. Kennis is moeilijk vindbaar en raakt verloren als mensen vertrekken.",
      en: "Employees spend a long time searching for procedures and policies, or keep asking colleagues the same questions. Knowledge is hard to find and gets lost when people leave.",
    },
    features: {
      nl: [
        "Vragen stellen in gewone taal (Nederlands en Engels)",
        "Antwoorden met verwijzing naar het brondocument",
        "Beheer van welke documenten de assistent mag gebruiken",
        "Rolgebaseerde toegang tot gevoelige informatie",
      ],
      en: [
        "Ask questions in plain language (Dutch and English)",
        "Answers with references to the source document",
        "Control over which documents the assistant may use",
        "Role-based access to sensitive information",
      ],
    },
    audience: {
      nl: ["HR- en operationele teams", "Organisaties met veel procedures en beleid", "Klantenservice-afdelingen"],
      en: ["HR and operations teams", "Organizations with many procedures and policies", "Customer service departments"],
    },
    benefits: {
      nl: ["Minder tijd kwijt aan zoeken", "Consistente antwoorden", "Kennis blijft behouden binnen de organisatie"],
      en: ["Less time spent searching", "Consistent answers", "Knowledge stays within the organization"],
    },
    faq: {
      nl: [
        {
          question: "Is ARA Knowledge Assistant al beschikbaar?",
          answer: "Nee. Het product is in ontwikkeling. Laat uw interesse achter via het contactformulier, dan houden we u op de hoogte.",
        },
        {
          question: "Waar worden de documenten opgeslagen?",
          answer: "Dit wordt in het ontwerp per klant bepaald. Privacy en gegevensbeveiliging zijn uitgangspunten bij de ontwikkeling.",
        },
      ],
      en: [
        {
          question: "Is ARA Knowledge Assistant available yet?",
          answer: "No. The product is in development. Register your interest through the contact form and we will keep you informed.",
        },
        {
          question: "Where are the documents stored?",
          answer: "This is determined per customer during design. Privacy and data security are core principles in development.",
        },
      ],
    },
    cta: { type: "contact" },
  },
  {
    id: "prod-docflow",
    slug: "ara-docflow",
    name: "ARA DocFlow",
    icon: "file",
    accent: "blue",
    category: "business-automation",
    status: "in-development",
    isSample: true,
    featured: true,
    tagline: {
      nl: "Van inkomend document naar verwerkte gegevens.",
      en: "From incoming document to processed data.",
    },
    summary: {
      nl: "Automatische verwerking van inkomende documenten zoals formulieren en facturen, met controle door een medewerker.",
      en: "Automatic processing of incoming documents such as forms and invoices, with review by an employee.",
    },
    description: {
      nl: [
        "ARA DocFlow is een conceptproduct voor het automatisch uitlezen, classificeren en doorsturen van documenten. Gegevens worden herkend en klaargezet voor controle, waarna ze naar het juiste systeem gaan.",
        "Een medewerker houdt altijd de regie: twijfelgevallen worden gemarkeerd en niets wordt definitief verwerkt zonder dat de ingestelde controles zijn doorlopen.",
      ],
      en: [
        "ARA DocFlow is a concept product for automatically reading, classifying and routing documents. Data is recognized and prepared for review, after which it goes to the right system.",
        "An employee always stays in control: uncertain cases are flagged and nothing is finalized without passing the configured checks.",
      ],
    },
    problem: {
      nl: "Documenten worden handmatig overgetypt in verschillende systemen. Dat kost tijd, leidt tot fouten en zorgt voor achterstanden in drukke periodes.",
      en: "Documents are manually retyped into various systems. This takes time, causes errors and creates backlogs during busy periods.",
    },
    features: {
      nl: [
        "Herkennen van documenttype en belangrijke velden",
        "Controlescherm voor medewerkers",
        "Doorsturen naar bestaande systemen via koppelingen",
        "Overzicht van status en doorlooptijd",
      ],
      en: [
        "Recognizing document type and key fields",
        "Review screen for employees",
        "Routing to existing systems via integrations",
        "Overview of status and processing time",
      ],
    },
    audience: {
      nl: ["Administratieve afdelingen", "Organisaties met veel formulieren", "Financiële teams"],
      en: ["Administrative departments", "Organizations with many forms", "Finance teams"],
    },
    benefits: {
      nl: ["Minder handmatige invoer", "Minder invoerfouten", "Beter overzicht van de verwerking"],
      en: ["Less manual entry", "Fewer input errors", "Better overview of processing"],
    },
    faq: {
      nl: [
        {
          question: "Welke documenttypen worden ondersteund?",
          answer: "Dit wordt tijdens de ontwikkeling bepaald op basis van gesprekken met potentiële gebruikers.",
        },
        {
          question: "Kan ik meedenken over de ontwikkeling?",
          answer: "Ja. Neem contact op als u interesse heeft om mee te denken of later deel te nemen aan een pilot.",
        },
      ],
      en: [
        {
          question: "Which document types are supported?",
          answer: "This will be determined during development based on conversations with potential users.",
        },
        {
          question: "Can I contribute to the development?",
          answer: "Yes. Get in touch if you would like to share input or take part in a pilot later on.",
        },
      ],
    },
    cta: { type: "contact" },
  },
  {
    id: "prod-invoice",
    slug: "ara-invoicedesk",
    name: "ARA InvoiceDesk",
    icon: "receipt",
    accent: "yellow",
    category: "finance",
    status: "coming-soon",
    isSample: true,
    featured: true,
    tagline: {
      nl: "Facturen en openstaande posten in één overzicht.",
      en: "Invoices and receivables in one overview.",
    },
    summary: {
      nl: "Eenvoudige facturatie en debiteurenopvolging voor kleine en middelgrote ondernemingen, met ondersteuning voor meerdere valuta.",
      en: "Simple invoicing and receivables follow-up for small and medium-sized businesses, with multi-currency support.",
    },
    description: {
      nl: [
        "ARA InvoiceDesk is een gepland product dat facturatie en de opvolging van openstaande facturen overzichtelijk maakt. Het concept is ontworpen met ondernemingen in Suriname in gedachten, waar werken met meerdere valuta gebruikelijk is.",
        "De nadruk ligt op eenvoud: snel een factuur opstellen, inzicht in wat openstaat en tijdige herinneringen.",
      ],
      en: [
        "ARA InvoiceDesk is a planned product that makes invoicing and following up on outstanding invoices straightforward. The concept is designed with businesses in Suriname in mind, where working with multiple currencies is common.",
        "The focus is simplicity: quickly create an invoice, see what is outstanding and send timely reminders.",
      ],
    },
    problem: {
      nl: "Facturen worden in losse bestanden bijgehouden, waardoor het lastig is te zien wat er openstaat en betalingen te laat worden opgevolgd.",
      en: "Invoices are kept in separate files, making it hard to see what is outstanding and causing late follow-up on payments.",
    },
    features: {
      nl: [
        "Facturen opstellen op basis van sjablonen",
        "Ondersteuning voor meerdere valuta (bijv. SRD, USD, EUR)",
        "Overzicht van openstaande posten",
        "Herinneringen voor vervallen facturen",
      ],
      en: [
        "Create invoices from templates",
        "Multi-currency support (e.g. SRD, USD, EUR)",
        "Overview of outstanding items",
        "Reminders for overdue invoices",
      ],
    },
    audience: {
      nl: ["Zzp'ers en kleine ondernemingen", "Dienstverleners", "Organisaties met klanten in meerdere valuta"],
      en: ["Freelancers and small businesses", "Service providers", "Organizations with customers in multiple currencies"],
    },
    benefits: {
      nl: ["Meer overzicht over uw cashflow", "Minder tijd aan administratie", "Tijdiger betalingen opvolgen"],
      en: ["Better overview of your cash flow", "Less time on administration", "More timely payment follow-up"],
    },
    faq: {
      nl: [
        {
          question: "Wanneer komt ARA InvoiceDesk beschikbaar?",
          answer: "Er is nog geen lanceringsdatum. Registreer uw interesse om op de hoogte te blijven.",
        },
        {
          question: "Vervangt dit mijn boekhoudsoftware?",
          answer: "Nee, het concept richt zich op facturatie en debiteurenbeheer. Koppelingen met boekhoudsoftware worden onderzocht.",
        },
      ],
      en: [
        {
          question: "When will ARA InvoiceDesk be available?",
          answer: "There is no launch date yet. Register your interest to stay informed.",
        },
        {
          question: "Does this replace my accounting software?",
          answer: "No, the concept focuses on invoicing and receivables management. Integrations with accounting software are being explored.",
        },
      ],
    },
    cta: { type: "contact" },
  },
  {
    id: "prod-booking",
    slug: "ara-booking",
    name: "ARA Booking",
    icon: "calendar",
    accent: "cyan",
    category: "web-applications",
    status: "coming-soon",
    isSample: true,
    tagline: {
      nl: "Online afspraken maken, zonder heen-en-weer bellen.",
      en: "Online appointments, without back-and-forth calls.",
    },
    summary: {
      nl: "Een online boekingssysteem waarmee klanten zelf een afspraak inplannen op basis van uw beschikbaarheid.",
      en: "An online booking system that lets customers schedule appointments themselves based on your availability.",
    },
    description: {
      nl: [
        "ARA Booking is een gepland webproduct voor dienstverleners die afspraken met klanten plannen. Klanten kiezen zelf een beschikbaar tijdstip en ontvangen automatisch een bevestiging.",
        "Het systeem wordt ontworpen om goed te werken op mobiele telefoons, omdat veel klanten via hun telefoon boeken.",
      ],
      en: [
        "ARA Booking is a planned web product for service providers who schedule appointments with customers. Customers choose an available time slot themselves and automatically receive a confirmation.",
        "The system is designed to work well on mobile phones, since many customers book via their phone.",
      ],
    },
    problem: {
      nl: "Afspraken plannen via telefoon en berichten kost veel tijd en leidt tot dubbele boekingen en no-shows.",
      en: "Scheduling appointments via phone and messages takes a lot of time and leads to double bookings and no-shows.",
    },
    features: {
      nl: ["Online agenda met beschikbare tijden", "Automatische bevestigingen en herinneringen", "Beheeromgeving voor medewerkers", "Geschikt voor mobiel"],
      en: ["Online calendar with available times", "Automatic confirmations and reminders", "Management environment for staff", "Mobile-friendly"],
    },
    audience: {
      nl: ["Praktijken en salons", "Adviseurs en consultants", "Servicebedrijven"],
      en: ["Practices and salons", "Advisors and consultants", "Service companies"],
    },
    benefits: {
      nl: ["Minder tijd aan plannen", "Minder gemiste afspraken", "Klanten kunnen 24/7 boeken"],
      en: ["Less time spent scheduling", "Fewer missed appointments", "Customers can book 24/7"],
    },
    faq: {
      nl: [{ question: "Is ARA Booking al te gebruiken?", answer: "Nee, het product is gepland en nog niet beschikbaar." }],
      en: [{ question: "Can I use ARA Booking already?", answer: "No, the product is planned and not yet available." }],
    },
    cta: { type: "contact" },
  },
  {
    id: "prod-insights",
    slug: "ara-insights",
    name: "ARA Insights",
    icon: "chart",
    accent: "navy",
    category: "business-software",
    status: "coming-soon",
    isSample: true,
    tagline: {
      nl: "Uw belangrijkste cijfers in één dashboard.",
      en: "Your key figures in one dashboard.",
    },
    summary: {
      nl: "Een dashboard dat gegevens uit verschillende bronnen samenbrengt tot actuele, begrijpelijke bedrijfsinformatie.",
      en: "A dashboard that brings together data from different sources into current, understandable business information.",
    },
    description: {
      nl: [
        "ARA Insights is een gepland product dat gegevens uit bijvoorbeeld uw verkoop, administratie en planning combineert in overzichtelijke dashboards.",
        "Het doel is beslissingen te onderbouwen met actuele cijfers in plaats van handmatig samengestelde spreadsheets.",
      ],
      en: [
        "ARA Insights is a planned product that combines data from sources such as sales, administration and planning into clear dashboards.",
        "The goal is to support decisions with up-to-date figures instead of manually compiled spreadsheets.",
      ],
    },
    problem: {
      nl: "Managementinformatie wordt handmatig samengesteld, is vaak verouderd en verschilt per afdeling.",
      en: "Management information is compiled manually, is often outdated and differs per department.",
    },
    features: {
      nl: ["Koppelingen met veelgebruikte bronnen", "Configureerbare dashboards", "Periodieke rapportages per e-mail", "Toegangsbeheer per gebruiker"],
      en: ["Integrations with common data sources", "Configurable dashboards", "Periodic email reports", "Per-user access control"],
    },
    audience: {
      nl: ["Directie en management", "Teamleiders", "Financiële afdelingen"],
      en: ["Executives and management", "Team leads", "Finance departments"],
    },
    benefits: {
      nl: ["Eén versie van de waarheid", "Tijdwinst bij rapportages", "Sneller bijsturen"],
      en: ["One version of the truth", "Time saved on reporting", "Faster course correction"],
    },
    faq: {
      nl: [{ question: "Met welke systemen kan ARA Insights koppelen?", answer: "Dit wordt tijdens de ontwikkeling vastgesteld. Laat ons weten welke systemen u gebruikt." }],
      en: [{ question: "Which systems can ARA Insights connect to?", answer: "This will be determined during development. Let us know which systems you use." }],
    },
    cta: { type: "contact" },
  },
  {
    id: "prod-taskboard",
    slug: "ara-taskboard",
    name: "ARA Taskboard",
    icon: "kanban",
    accent: "blue",
    category: "productivity",
    status: "in-development",
    isSample: true,
    tagline: {
      nl: "Overzicht van taken en opvolging voor het hele team.",
      en: "Task overview and follow-up for the whole team.",
    },
    summary: {
      nl: "Een eenvoudige takenomgeving voor teams, met duidelijke verantwoordelijkheden, deadlines en voortgang.",
      en: "A simple task environment for teams, with clear responsibilities, deadlines and progress.",
    },
    description: {
      nl: [
        "ARA Taskboard is een conceptproduct dat teams helpt werk te verdelen en op te volgen. Iedereen ziet wat er moet gebeuren, wie verantwoordelijk is en wat de status is.",
        "Het ontwerp richt zich op eenvoud, zodat teams er zonder lange training mee aan de slag kunnen.",
      ],
      en: [
        "ARA Taskboard is a concept product that helps teams divide and follow up on work. Everyone can see what needs to be done, who is responsible and what the status is.",
        "The design focuses on simplicity, so teams can get started without lengthy training.",
      ],
    },
    problem: {
      nl: "Taken worden via chatberichten en e-mail verdeeld en raken uit beeld. Niemand heeft een volledig overzicht.",
      en: "Tasks are assigned via chat messages and email and get lost. Nobody has a complete overview.",
    },
    features: {
      nl: ["Takenborden per team of project", "Deadlines en herinneringen", "Opmerkingen en bijlagen per taak", "Voortgangsoverzicht"],
      en: ["Task boards per team or project", "Deadlines and reminders", "Comments and attachments per task", "Progress overview"],
    },
    audience: {
      nl: ["Kleine en middelgrote teams", "Projectteams", "Operationele afdelingen"],
      en: ["Small and medium-sized teams", "Project teams", "Operations departments"],
    },
    benefits: {
      nl: ["Minder vergeten taken", "Heldere verantwoordelijkheden", "Minder statusoverleg"],
      en: ["Fewer forgotten tasks", "Clear responsibilities", "Fewer status meetings"],
    },
    faq: {
      nl: [{ question: "Is ARA Taskboard al beschikbaar?", answer: "Nee, het product is in ontwikkeling." }],
      en: [{ question: "Is ARA Taskboard available yet?", answer: "No, the product is in development." }],
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
