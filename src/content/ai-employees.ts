import type { Localized } from "@/i18n/config";
import type { IconName } from "./types";

/**
 * ARA AI MEDEWERKERS / ARA AI ASSISTANTS
 *
 * Packages, specialisations and supporting content for /ai-medewerkers and
 * /en/ai-assistants. Prices are introductory prices in USD.
 */

export type AiPackage = {
  id: string;
  icon: IconName;
  name: Localized;
  audience: Localized;
  price: { amount: number; from?: boolean; period: "one-time" | "per-project" };
  maintenance: { amount: number; from?: boolean };
  includedTitle?: Localized;
  included: Localized<string[]>;
  examples?: Localized<string[]>;
  note?: Localized;
  highlight?: boolean;
};

export type AiSpecialisation = {
  id: string;
  icon: IconName;
  name: Localized;
  tasks: Localized<string[]>;
  note?: Localized;
};

/** Contact-form topic for general AI-employee enquiries (also a service id). */
export const AI_EMPLOYEES_TOPIC = "ai-employees";

export const aiPackages: AiPackage[] = [
  {
    id: "ai-employee-starter",
    icon: "bot",
    name: { nl: "AI Medewerker Starter", en: "AI Assistant Starter" },
    audience: {
      nl: "Geschikt voor ondernemers die één terugkerend proces willen automatiseren.",
      en: "For business owners who want to automate one recurring process.",
    },
    price: { amount: 250, period: "one-time" },
    maintenance: { amount: 50 },
    included: {
      nl: [
        "Eén duidelijk afgebakende taak",
        "Eén eenvoudige workflow",
        "Eén applicatiekoppeling",
        "Basisconfiguratie en testen",
        "Korte gebruikersinstructie",
        "Basisfoutafhandeling",
      ],
      en: [
        "One clearly defined task",
        "One simple workflow",
        "One application connection",
        "Basic configuration and testing",
        "Short user instructions",
        "Basic error handling",
      ],
    },
    examples: {
      nl: [
        "Inkomende e-mails categoriseren",
        "Formulierinzendingen verwerken",
        "Een taak aanmaken wanneer een aanvraag binnenkomt",
        "Documentgegevens verzamelen voor menselijke controle",
      ],
      en: [
        "Categorizing incoming emails",
        "Processing form submissions",
        "Creating a task when a request comes in",
        "Collecting document data for human review",
      ],
    },
  },
  {
    id: "ai-employee-business",
    icon: "cpu",
    name: { nl: "AI Medewerker Business", en: "AI Assistant Business" },
    audience: {
      nl: "Geschikt voor kleine bedrijven die meerdere werkzaamheden willen automatiseren.",
      en: "For small businesses that want to automate several tasks.",
    },
    price: { amount: 500, period: "one-time" },
    maintenance: { amount: 100 },
    highlight: true,
    included: {
      nl: [
        "Meerdere vooraf afgesproken taken",
        "Meerdere eenvoudige workflows",
        "Maximaal twee applicatiekoppelingen",
        "Basislogging en foutafhandeling",
        "Testen en documentatie",
        "Menselijke goedkeuring voor gevoelige acties",
      ],
      en: [
        "Several pre-agreed tasks",
        "Several simple workflows",
        "Up to two application connections",
        "Basic logging and error handling",
        "Testing and documentation",
        "Human approval for sensitive actions",
      ],
    },
    examples: {
      nl: [
        "Klantaanvragen registreren en categoriseren",
        "E-mails verwerken en opvolgtaken aanmaken",
        "Rapportages voorbereiden",
        "Gegevens tussen ondersteunde applicaties overdragen",
      ],
      en: [
        "Registering and categorizing customer requests",
        "Processing emails and creating follow-up tasks",
        "Preparing reports",
        "Transferring data between supported applications",
      ],
    },
  },
  {
    id: "ai-employee-pro",
    icon: "workflow",
    name: { nl: "AI Medewerker Pro", en: "AI Assistant Pro" },
    audience: {
      nl: "Voor ondernemingen die meerdere bedrijfsprocessen willen automatiseren.",
      en: "For companies that want to automate several business processes.",
    },
    price: { amount: 1000, from: true, period: "per-project" },
    maintenance: { amount: 200, from: true },
    includedTitle: {
      nl: "Inbegrepen, afhankelijk van de overeengekomen scope",
      en: "Included, depending on the agreed scope",
    },
    included: {
      nl: [
        "Meerdere bedrijfsprocessen",
        "Uitgebreidere workflows en integraties",
        "Aangepaste bedrijfsregels",
        "Logging, monitoring en foutmeldingen",
        "Testplan en implementatiedocumentatie",
        "Persoonlijke configuratie op basis van uw bedrijfsbehoeften",
      ],
      en: [
        "Multiple business processes",
        "More extensive workflows and integrations",
        "Custom business rules",
        "Logging, monitoring and error notifications",
        "Test plan and implementation documentation",
        "Personal configuration based on your business needs",
      ],
    },
    note: {
      nl: "Voor dit pakket wordt altijd eerst een offerte opgesteld.",
      en: "A quote is always prepared first for this package.",
    },
  },
];

export const aiSpecialisations: AiSpecialisation[] = [
  {
    id: "administrative",
    icon: "inbox",
    name: { nl: "AI Administratief Medewerker", en: "AI Administrative Assistant" },
    tasks: {
      nl: [
        "Inkomende e-mails categoriseren",
        "Documenten samenvatten",
        "Conceptantwoorden voorbereiden",
        "Taken en opvolgherinneringen aanmaken",
        "Informatie tussen ondersteunde systemen overdragen",
      ],
      en: [
        "Categorizing incoming emails",
        "Summarizing documents",
        "Preparing draft replies",
        "Creating tasks and follow-up reminders",
        "Transferring information between supported systems",
      ],
    },
  },
  {
    id: "customer-service",
    icon: "headset",
    name: { nl: "AI Klantenservice Medewerker", en: "AI Customer Service Assistant" },
    tasks: {
      nl: [
        "Veelgestelde vragen beantwoorden",
        "Klantgegevens en aanvragen verzamelen",
        "Beschikbare bedrijfsinformatie raadplegen",
        "Aanvragen categoriseren",
        "Complexe vragen doorsturen naar een menselijke medewerker",
      ],
      en: [
        "Answering frequently asked questions",
        "Collecting customer details and requests",
        "Consulting available company information",
        "Categorizing requests",
        "Forwarding complex questions to a human colleague",
      ],
    },
  },
  {
    id: "sales",
    icon: "trending",
    name: { nl: "AI Verkoopmedewerker", en: "AI Sales Assistant" },
    tasks: {
      nl: [
        "Nieuwe leads registreren",
        "Aanvragen classificeren",
        "Offerteconcepten voorbereiden",
        "Opvolgherinneringen aanmaken",
        "Het CRM-systeem bijwerken via toegestane integraties",
      ],
      en: [
        "Registering new leads",
        "Classifying requests",
        "Preparing draft quotes",
        "Creating follow-up reminders",
        "Updating the CRM system through permitted integrations",
      ],
    },
  },
  {
    id: "finance",
    icon: "coins",
    name: { nl: "AI Financieel Medewerker", en: "AI Finance Assistant" },
    tasks: {
      nl: [
        "Facturen uitlezen",
        "Factuurgegevens verzamelen",
        "Voorstellen voor transactiecategorieën maken",
        "Ontbrekende documenten signaleren",
        "Financiële overzichten voorbereiden",
      ],
      en: [
        "Reading invoices",
        "Collecting invoice data",
        "Suggesting transaction categories",
        "Flagging missing documents",
        "Preparing financial overviews",
      ],
    },
    note: {
      nl: "Definitieve boekingen, betalingen, belastingaangiften en andere belangrijke financiële handelingen vereisen altijd menselijke controle en goedkeuring.",
      en: "Final bookkeeping entries, payments, tax returns and other important financial actions always require human review and approval.",
    },
  },
  {
    id: "operations",
    icon: "clipboard",
    name: { nl: "AI Operationeel Medewerker", en: "AI Operations Assistant" },
    tasks: {
      nl: [
        "Projectstatussen bijhouden",
        "Taken en deadlines opvolgen",
        "Achterstanden signaleren",
        "Periodieke rapportages voorbereiden",
        "Meldingen sturen wanneer actie nodig is",
      ],
      en: [
        "Tracking project statuses",
        "Following up on tasks and deadlines",
        "Flagging backlogs",
        "Preparing periodic reports",
        "Sending notifications when action is needed",
      ],
    },
  },
];

export const aiSteps: { icon: IconName; title: Localized; text: Localized }[] = [
  {
    icon: "inbox",
    title: { nl: "Invoer", en: "Input" },
    text: {
      nl: "De AI-medewerker ontvangt informatie via bijvoorbeeld e-mail, een formulier of een document.",
      en: "The AI assistant receives information, for example through email, a form or a document.",
    },
  },
  {
    icon: "brain",
    title: { nl: "Analyse", en: "Analysis" },
    text: {
      nl: "De AI interpreteert de opdracht op basis van ingestelde instructies en bedrijfsinformatie.",
      en: "The AI interprets the request based on configured instructions and company information.",
    },
  },
  {
    icon: "plug",
    title: { nl: "Uitvoering", en: "Execution" },
    text: {
      nl: "De AI gebruikt alleen de toegestane tools en applicaties.",
      en: "The AI only uses the permitted tools and applications.",
    },
  },
  {
    icon: "shield",
    title: { nl: "Controle", en: "Control" },
    text: {
      nl: "Regels, foutafhandeling en menselijke goedkeuring worden toegepast waar nodig.",
      en: "Rules, error handling and human approval are applied where needed.",
    },
  },
  {
    icon: "user-check",
    title: { nl: "Resultaat", en: "Result" },
    text: {
      nl: "Een taak wordt uitgevoerd, een registratie bijgewerkt of een document voorbereid.",
      en: "A task is completed, a record updated or a document prepared.",
    },
  },
];

export const aiSeparateCosts: Localized<string[]> = {
  nl: [
    "AI-gebruik en tokens",
    "API-aanroepen",
    "Hosting en cloudinfrastructuur",
    "Externe softwarelicenties",
    "Betaalde automatiseringsplatformen",
    "Extra ontwikkelwerk en nieuwe functionaliteiten",
  ],
  en: [
    "AI usage and tokens",
    "API calls",
    "Hosting and cloud infrastructure",
    "External software licenses",
    "Paid automation platforms",
    "Additional development work and new functionality",
  ],
};

export const aiSafety: { icon: IconName; text: Localized }[] = [
  { icon: "lock", text: { nl: "AI-medewerkers krijgen alleen de noodzakelijke toegangsrechten.", en: "AI assistants only receive the access rights they need." } },
  { icon: "shield", text: { nl: "Gevoelige informatie wordt zorgvuldig behandeld.", en: "Sensitive information is handled with care." } },
  { icon: "user-check", text: { nl: "Risicovolle acties vereisen menselijke goedkeuring.", en: "Risky actions require human approval." } },
  {
    icon: "coins",
    text: {
      nl: "Definitieve financiële boekingen, betalingen en officiële belastingaangiften worden niet zonder expliciete autorisatie uitgevoerd.",
      en: "Final financial entries, payments and official tax returns are never carried out without explicit authorization.",
    },
  },
  {
    icon: "log",
    text: {
      nl: "Logging en foutmeldingen worden waar technisch mogelijk toegepast.",
      en: "Logging and error notifications are applied where technically possible.",
    },
  },
  {
    icon: "sparkles",
    text: {
      nl: "AI kan fouten maken; belangrijke resultaten moeten controleerbaar blijven.",
      en: "AI can make mistakes; important results must remain verifiable.",
    },
  },
  {
    icon: "network",
    text: {
      nl: "De mogelijkheden hangen af van de gekozen applicaties en beschikbare integraties.",
      en: "Capabilities depend on the chosen applications and available integrations.",
    },
  },
];

export const aiTerms: Localized<string[]> = {
  nl: [
    "Projecten beginnen na een aanbetaling van 50%.",
    "Het resterende bedrag wordt vóór of bij oplevering betaald.",
    "Onderhoud wordt maandelijks vooraf gefactureerd.",
    "Externe licenties en gebruikskosten zijn niet inbegrepen, tenzij expliciet vermeld.",
    "Meerwerk wordt vooraf geoffreerd en pas na goedkeuring uitgevoerd.",
    "Ongebruikte onderhoudsuren vervallen aan het einde van de maand, indien met urenlimieten wordt gewerkt.",
    "De precieze scope, toegangsrechten en verantwoordelijkheden worden per project vastgelegd.",
  ],
  en: [
    "Projects start after a 50% deposit.",
    "The remaining amount is paid before or upon delivery.",
    "Maintenance is invoiced monthly in advance.",
    "External licenses and usage costs are not included, unless explicitly stated.",
    "Additional work is quoted in advance and only carried out after approval.",
    "Unused maintenance hours expire at the end of the month, where hour limits apply.",
    "The exact scope, access rights and responsibilities are defined per project.",
  ],
};
