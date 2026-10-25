import type { Localized } from "@/i18n/config";
import type { FaqItem, IconName } from "./types";

/**
 * PRICING
 *
 * All prices are in USD. Edit packages, terms and FAQs here; the pricing page,
 * contact-form topics and structured data update automatically.
 */

export type BillingPeriod = "one-time" | "per-month" | "per-project";

export type PricingPackage = {
  id: string;
  icon: IconName;
  group: "website" | "automation-ai" | "software-support";
  name: Localized;
  description: Localized;
  price: {
    amount: number;
    /** Shown as "Vanaf" / "From". */
    from?: boolean;
    period: BillingPeriod;
  };
  included: Localized<string[]>;
  /** Optional monthly maintenance for this package. */
  maintenance?: { amount: number; label?: Localized };
  /** Optional additional paid support. */
  extra?: Localized;
  /** What is not included / conditions. */
  excluded: Localized<string[]>;
};

export const pricingGroups: Record<PricingPackage["group"], Localized> = {
  website: { nl: "Websites", en: "Websites" },
  "automation-ai": { nl: "Automatisering & AI", en: "Automation & AI" },
  "software-support": { nl: "Software & support", en: "Software & support" },
};

export const pricingPackages: PricingPackage[] = [
  {
    id: "business-website",
    icon: "globe",
    group: "website",
    name: { nl: "Business Website Package", en: "Business Website Package" },
    description: {
      nl: "Een professionele zakelijke website, inclusief domeinnaam en zakelijke e-mail voor het eerste jaar.",
      en: "A professional business website, including a domain name and business email for the first year.",
    },
    price: { amount: 150, period: "one-time" },
    included: {
      nl: [
        "Professionele zakelijke website met maximaal 5 pagina's",
        "Responsive ontwerp voor mobiel, tablet en desktop",
        "Contactformulier en WhatsApp-knop",
        "Socialmediakoppelingen en basis-SEO",
        "Domeinnaam voor het eerste jaar",
        "Eén Google Workspace-gebruiker met zakelijke e-mail voor het eerste jaar",
        "Publicatie en basisconfiguratie",
      ],
      en: [
        "Professional business website with up to 5 pages",
        "Responsive design for mobile, tablet and desktop",
        "Contact form and WhatsApp button",
        "Social media links and basic SEO",
        "Domain name for the first year",
        "One Google Workspace user with business email for the first year",
        "Publication and basic configuration",
      ],
    },
    maintenance: { amount: 50, label: { nl: "ARA Website Care", en: "ARA Website Care" } },
    excluded: {
      nl: [
        "Hosting is niet inbegrepen, tenzij expliciet vermeld",
        "Extra gebruikers, betaalde plugins en maatwerkfunctionaliteiten zijn niet inbegrepen",
        "Domein en Google Workspace worden na het eerste jaar apart verlengd of rechtstreeks door de klant betaald",
      ],
      en: [
        "Hosting is not included unless explicitly stated",
        "Additional users, paid plugins and custom functionality are not included",
        "After the first year, the domain and Google Workspace are renewed separately or paid directly by the client",
      ],
    },
  },
  {
    id: "website-care",
    icon: "wrench",
    group: "website",
    name: { nl: "ARA Website Care", en: "ARA Website Care" },
    description: {
      nl: "Maandelijks onderhoud zodat uw website veilig, actueel en goed werkend blijft.",
      en: "Monthly maintenance to keep your website secure, up to date and working properly.",
    },
    price: { amount: 50, period: "per-month" },
    included: {
      nl: [
        "Technische websitecontroles",
        "Kleine inhoudelijke wijzigingen",
        "Controle van formulieren en belangrijke links",
        "Basisbeveiligingscontroles",
        "Back-upcontrole, indien ondersteund",
        "Maximaal één uur kleine wijzigingen of ondersteuning per maand",
      ],
      en: [
        "Technical website checks",
        "Small content changes",
        "Checks of forms and important links",
        "Basic security checks",
        "Backup check, where supported",
        "Up to one hour of small changes or support per month",
      ],
    },
    excluded: {
      nl: ["Ongebruikte uren vervallen aan het einde van de maand"],
      en: ["Unused hours expire at the end of the month"],
    },
  },
  {
    id: "automation-starter",
    icon: "workflow",
    group: "automation-ai",
    name: { nl: "ARA Automation Starter", en: "ARA Automation Starter" },
    description: {
      nl: "Uw eerste automatisering: één eenvoudige workflow die terugkerend handwerk overneemt.",
      en: "Your first automation: one simple workflow that takes over recurring manual work.",
    },
    price: { amount: 100, from: true, period: "one-time" },
    included: {
      nl: [
        "Eén eenvoudige workflow",
        "Koppeling tussen maximaal twee ondersteunde applicaties",
        "Eenvoudige automatisering, bijvoorbeeld een formulier naar een spreadsheet met e-mailmelding",
        "Testen en basisdocumentatie",
      ],
      en: [
        "One simple workflow",
        "Connection between up to two supported applications",
        "Simple automation, for example a form to a spreadsheet with an email notification",
        "Testing and basic documentation",
      ],
    },
    maintenance: { amount: 25 },
    excluded: {
      nl: ["Betaalde automatiseringsplatformen", "API-kosten en verbruikskosten", "Complexe workflows"],
      en: ["Paid automation platforms", "API and usage costs", "Complex workflows"],
    },
  },
  {
    id: "ai-chatbot-starter",
    icon: "bot",
    group: "automation-ai",
    name: { nl: "ARA AI Chatbot Starter", en: "ARA AI Chatbot Starter" },
    description: {
      nl: "Een eenvoudige AI-chatbot op uw website die veelgestelde vragen van bezoekers beantwoordt.",
      en: "A simple AI chatbot on your website that answers visitors' frequently asked questions.",
    },
    price: { amount: 150, from: true, period: "one-time" },
    included: {
      nl: [
        "Eén eenvoudige websitechatbot",
        "Configuratie op basis van door u aangeleverde informatie",
        "Instellen van veelgestelde vragen",
        "Installatie op één website en basistesten",
      ],
      en: [
        "One simple website chatbot",
        "Configuration based on information you provide",
        "Setting up frequently asked questions",
        "Installation on one website and basic testing",
      ],
    },
    maintenance: { amount: 35 },
    excluded: {
      nl: ["AI-gebruikskosten", "Betaalde chatbotplatformen", "Complexe CRM-integraties"],
      en: ["AI usage costs", "Paid chatbot platforms", "Complex CRM integrations"],
    },
  },
  {
    id: "ai-integration",
    icon: "brain",
    group: "automation-ai",
    name: { nl: "ARA AI Integration", en: "ARA AI Integration" },
    description: {
      nl: "Eén afgebakende AI-toepassing, gekoppeld aan uw eigen gegevens of applicatie.",
      en: "One well-defined AI application, connected to your own data or application.",
    },
    price: { amount: 250, from: true, period: "per-project" },
    included: {
      nl: [
        "Eén afgebakende AI-integratie",
        "Eén ondersteunde gegevensbron of applicatiekoppeling",
        "Basisconfiguratie, testen en documentatie",
      ],
      en: [
        "One well-defined AI integration",
        "One supported data source or application connection",
        "Basic configuration, testing and documentation",
      ],
    },
    maintenance: { amount: 50 },
    excluded: {
      nl: ["API-gebruik", "Externe licenties", "Complexe migraties en grote maatwerkintegraties"],
      en: ["API usage", "External licenses", "Complex migrations and large custom integrations"],
    },
  },
  {
    id: "software-starter",
    icon: "code",
    group: "software-support",
    name: { nl: "ARA Software Starter", en: "ARA Software Starter" },
    description: {
      nl: "Een eenvoudige webapplicatie of dashboard voor één belangrijk bedrijfsproces.",
      en: "A simple web application or dashboard for one key business process.",
    },
    price: { amount: 500, from: true, period: "per-project" },
    included: {
      nl: [
        "Eén eenvoudige webapplicatie of dashboard",
        "Eén hoofdproces",
        "Basisinterface en gegevensopslag",
        "Testen, oplevering en basisinstructie",
      ],
      en: [
        "One simple web application or dashboard",
        "One main process",
        "Basic interface and data storage",
        "Testing, delivery and basic instruction",
      ],
    },
    maintenance: { amount: 50 },
    excluded: {
      nl: ["Complexe databases en geavanceerde gebruikersrollen", "Hosting en externe licenties", "Aanvullende modules"],
      en: ["Complex databases and advanced user roles", "Hosting and external licenses", "Additional modules"],
    },
  },
  {
    id: "it-support-basic",
    icon: "shield",
    group: "software-support",
    name: { nl: "ARA IT Support Basic", en: "ARA IT Support Basic" },
    description: {
      nl: "Laagdrempelige IT-ondersteuning op afstand voor zakelijke e-mail en software.",
      en: "Accessible remote IT support for business email and software.",
    },
    price: { amount: 35, period: "per-month" },
    included: {
      nl: [
        "Maximaal één uur ondersteuning op afstand per maand",
        "Hulp bij zakelijke e-mail en softwareconfiguratie",
        "Basale probleemdiagnose",
        "Reactie binnen twee werkdagen tijdens kantooruren",
      ],
      en: [
        "Up to one hour of remote support per month",
        "Help with business email and software configuration",
        "Basic problem diagnosis",
        "Response within two business days during office hours",
      ],
    },
    extra: {
      nl: "Extra ondersteuning: $20 per uur, na uw akkoord.",
      en: "Additional support: $20 per hour, after your approval.",
    },
    excluded: {
      nl: ["Hardware en onderdelen", "Bezoeken op locatie", "Externe licenties"],
      en: ["Hardware and parts", "On-site visits", "External licenses"],
    },
  },
];

/** Extra Google Workspace users (ARA sales rate). */
export const workspaceUsers = {
  amount: 10,
  title: { nl: "Extra zakelijke e-mailgebruiker", en: "Additional business email user" },
  description: {
    nl: "Meer collega's met een eigen zakelijk e-mailadres via Google Workspace.",
    en: "More colleagues with their own business email address through Google Workspace.",
  },
  points: {
    nl: [
      "Eén gebruiker is inbegrepen in het Business Website Package voor het eerste jaar.",
      "Extra gebruikers worden apart berekend.",
      "Een extra gebruiker heeft een eigen account met eigen inbox, wachtwoord en opslag. Een e-mailalias (bijvoorbeeld info@) is een extra adres dat binnenkomt in de inbox van een bestaande gebruiker en vaak geen extra gebruiker vereist.",
      "$10 is het ARA-verkoopstarief en niet noodzakelijk de officiële prijs van Google. Het tarief kan wijzigen als de licentiekosten van Google of belastingen veranderen.",
    ],
    en: [
      "One user is included in the Business Website Package for the first year.",
      "Additional users are charged separately.",
      "An additional user has their own account with their own inbox, password and storage. An email alias (for example info@) is an extra address that arrives in an existing user's inbox and often does not require an additional user.",
      "$10 is ARA's sales rate and not necessarily Google's official price. The rate may change if Google's license costs or taxes change.",
    ],
  },
};

export const pricingTerms: Localized<string[]> = {
  nl: [
    "Projectwerk begint na een aanbetaling van 50%.",
    "Het resterende projectbedrag wordt vóór of bij oplevering betaald.",
    "Maandelijkse onderhouds- en supportdiensten worden vooraf gefactureerd.",
    "Externe licenties, hosting, API-gebruik en verbruikskosten worden apart berekend, tenzij anders vermeld.",
    "Meerwerk wordt vooraf geoffreerd en pas na goedkeuring uitgevoerd.",
    "Ongebruikte onderhoudsuren vervallen aan het einde van de maand.",
    "Maandelijkse diensten zijn maandelijks opzegbaar met een opzegtermijn van 30 dagen, tenzij schriftelijk anders overeengekomen.",
    "De klant levert tijdig alle noodzakelijke teksten, afbeeldingen, logo's en toegangsgegevens aan.",
  ],
  en: [
    "Project work starts after a 50% deposit.",
    "The remaining project amount is paid before or upon delivery.",
    "Monthly maintenance and support services are invoiced in advance.",
    "External licenses, hosting, API usage and usage costs are charged separately, unless stated otherwise.",
    "Additional work is quoted in advance and only carried out after approval.",
    "Unused maintenance hours expire at the end of the month.",
    "Monthly services can be cancelled monthly with a 30-day notice period, unless otherwise agreed in writing.",
    "The client provides all necessary texts, images, logos and access details on time.",
  ],
};

export const pricingFaq: Localized<FaqItem[]> = {
  nl: [
    {
      question: "Wat gebeurt er met mijn domeinnaam na het eerste jaar?",
      answer:
        "De domeinnaam is het eerste jaar inbegrepen in het Business Website Package. Daarna wordt het domein apart verlengd via ARA of betaalt u de verlenging rechtstreeks. Hosting is niet inbegrepen, tenzij dat expliciet in de offerte staat.",
    },
    {
      question: "Hoe werkt zakelijke e-mail via Google Workspace?",
      answer:
        "Bij het Business Website Package is één Google Workspace-gebruiker met zakelijk e-mailadres voor het eerste jaar inbegrepen. Extra gebruikers kosten $10 per gebruiker per maand. Heeft u alleen een extra adres nodig, zoals info@, dan volstaat vaak een e-mailalias zonder extra gebruiker.",
    },
    {
      question: "Wat houdt maandelijks onderhoud in?",
      answer:
        "Met onderhoud blijven uw website of oplossing veilig en goed werkend. Bij ARA Website Care controleren we onder meer de techniek, formulieren, links en beveiliging en voeren we maximaal één uur kleine wijzigingen per maand uit. Ongebruikte uren vervallen aan het einde van de maand. Onderhoud is maandelijks opzegbaar met 30 dagen opzegtermijn.",
    },
    {
      question: "Wat zijn externe licenties en worden die apart berekend?",
      answer:
        "Externe licenties zijn kosten voor software of diensten van andere partijen, zoals betaalde plugins, automatiseringsplatformen, chatbotplatformen of hosting. Deze kosten zijn niet inbegrepen in onze prijzen en worden apart berekend of rechtstreeks door u betaald, tenzij anders vermeld.",
    },
    {
      question: "Welke kosten komen er bij AI-oplossingen bij?",
      answer:
        "AI-diensten rekenen vaak per gebruik, bijvoorbeeld per verwerkte vraag of hoeveelheid tekst. Deze AI- en API-gebruikskosten zijn niet inbegrepen in de projectprijs of het onderhoud. Vooraf geven we een inschatting op basis van het verwachte gebruik, zodat u niet voor verrassingen komt te staan.",
    },
    {
      question: "Wat als ik meer nodig heb dan in een pakket zit?",
      answer:
        "Dat kan altijd. Meerwerk bespreken we vooraf, we sturen u een offerte en voeren het pas uit na uw goedkeuring. De vanaf-prijzen gelden voor de beschreven basisomvang; voor grotere wensen ontvangt u een offerte op maat.",
    },
  ],
  en: [
    {
      question: "What happens to my domain name after the first year?",
      answer:
        "The domain name is included in the Business Website Package for the first year. After that, the domain is renewed separately through ARA or you pay the renewal directly. Hosting is not included unless explicitly stated in the quote.",
    },
    {
      question: "How does business email through Google Workspace work?",
      answer:
        "The Business Website Package includes one Google Workspace user with a business email address for the first year. Additional users cost $10 per user per month. If you only need an extra address, such as info@, an email alias without an additional user is often enough.",
    },
    {
      question: "What does monthly maintenance include?",
      answer:
        "Maintenance keeps your website or solution secure and working properly. With ARA Website Care we check the technology, forms, links and security, among other things, and carry out up to one hour of small changes per month. Unused hours expire at the end of the month. Maintenance can be cancelled monthly with a 30-day notice period.",
    },
    {
      question: "What are external licenses, and are they charged separately?",
      answer:
        "External licenses are costs for software or services from other parties, such as paid plugins, automation platforms, chatbot platforms or hosting. These costs are not included in our prices and are charged separately or paid directly by you, unless stated otherwise.",
    },
    {
      question: "Which additional costs apply to AI solutions?",
      answer:
        "AI services often charge per use, for example per processed question or amount of text. These AI and API usage costs are not included in the project price or maintenance. We give you an estimate in advance based on the expected usage, so there are no surprises.",
    },
    {
      question: "What if I need more than a package includes?",
      answer:
        "That is always possible. We discuss additional work in advance, send you a quote and only carry it out after your approval. The 'from' prices apply to the described basic scope; for larger requirements you will receive a custom quote.",
    },
  ],
};

export function getPricingPackage(id: string): PricingPackage | undefined {
  return pricingPackages.find((item) => item.id === id);
}
