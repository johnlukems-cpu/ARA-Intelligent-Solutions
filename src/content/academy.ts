import type { Localized } from "@/i18n/config";
import type { FaqItem, IconName } from "./types";

/**
 * ARA AI ACADEMY
 *
 * Trainings, formats and supporting content for /academy (nl + en).
 * Prices are in USD. ARA AI Academy is not an official Anthropic or OpenAI
 * training programme; keep the disclaimers in place.
 */

/**
 * COURSE PRICES (USD) — edit prices here only.
 * `null` means "price on request" (no price is shown; visitors request information).
 */
export const coursePrices = {
  "ai-beginners": { amount: 35, unit: "per-person" },
  "claude-entrepreneurs": { amount: 75, unit: "per-person" },
  "chatgpt-business": null,
  "claude-code-automation": { amount: 125, unit: "per-person" },
  "ai-students-professionals": null,
  "ai-teams": { amount: 350, from: true, unit: "per-group" },
} as const satisfies Record<string, TrainingPrice | null>;

export type TrainingPrice = { amount: number; from?: boolean; unit: "per-person" | "per-group" };

export type TrainingFormat = "classroom" | "online" | "in-company";
export const trainingFormats: TrainingFormat[] = ["classroom", "online", "in-company"];

export type Training = {
  id: string;
  slug: Localized;
  icon: IconName;
  level: Localized;
  name: Localized;
  summary: Localized;
  description: Localized<string[]>;
  /** From `coursePrices`; null = price on request. */
  price: TrainingPrice | null;
  duration: Localized;
  /** Hours, for structured data (ISO 8601 duration is derived from it); 0 = not fixed yet. */
  durationHours: number;
  language: Localized;
  /** Programme topics (detail page). */
  topics: Localized<string[]>;
  /** Everything included, as shown on the price card. */
  included: Localized<string[]>;
  audience: Localized<string[]>;
  outcomes: Localized<string[]>;
  /** Shown as a highlighted note (prerequisites, pricing remarks). */
  note?: Localized;
  formats: TrainingFormat[];
  highlight?: boolean;
};

export const trainings: Training[] = [
  {
    id: "ai-beginners",
    slug: { nl: "ai-voor-beginners", en: "ai-for-beginners" },
    icon: "sparkles",
    level: { nl: "Beginner", en: "Beginner" },
    name: { nl: "AI voor beginners", en: "AI for beginners" },
    summary: {
      nl: "De ideale eerste kennismaking: begrijp wat AI is en leer ChatGPT en Claude direct goed gebruiken.",
      en: "The ideal first introduction: understand what AI is and learn to use ChatGPT and Claude well straight away.",
    },
    description: {
      nl: [
        "In deze praktische introductie leer je wat kunstmatige intelligentie is, wat AI-assistenten zoals ChatGPT en Claude wel en niet kunnen, en hoe je er in je dagelijkse werk direct mee aan de slag gaat.",
        "We werken met herkenbare voorbeelden en oefeningen. Je gaat naar huis met prompts die je meteen kunt gebruiken en met heldere afspraken om AI veilig en verantwoord in te zetten.",
      ],
      en: [
        "In this practical introduction you learn what artificial intelligence is, what AI assistants such as ChatGPT and Claude can and cannot do, and how to start using them in your daily work right away.",
        "We work with recognisable examples and exercises. You go home with prompts you can use immediately and clear guidelines for using AI safely and responsibly.",
      ],
    },
    price: coursePrices["ai-beginners"],
    language: { nl: "Nederlands (Engels op aanvraag)", en: "Dutch (English on request)" },
    duration: { nl: "2 uur", en: "2 hours" },
    durationHours: 2,
    topics: {
      nl: [
        "Introductie tot kunstmatige intelligentie",
        "Kennismaking met ChatGPT en Claude",
        "Effectief prompts schrijven",
        "AI gebruiken voor dagelijkse werkzaamheden",
      ],
      en: [
        "Introduction to artificial intelligence",
        "Getting to know ChatGPT and Claude",
        "Writing effective prompts",
        "Using AI for everyday work",
      ],
    },
    included: {
      nl: [
        "Introductie tot kunstmatige intelligentie",
        "Kennismaking met ChatGPT en Claude",
        "Effectief prompts schrijven",
        "AI gebruiken voor dagelijkse werkzaamheden",
        "Praktische oefeningen",
        "Digitaal trainingsmateriaal",
        "ARA AI Academy-certificaat van deelname",
      ],
      en: [
        "Introduction to artificial intelligence",
        "Getting to know ChatGPT and Claude",
        "Writing effective prompts",
        "Using AI for everyday work",
        "Practical exercises",
        "Digital training materials",
        "ARA AI Academy certificate of participation",
      ],
    },
    audience: {
      nl: ["Ondernemers en zzp'ers", "Professionals en medewerkers", "Studenten", "Iedereen die met AI wil beginnen"],
      en: ["Business owners and freelancers", "Professionals and employees", "Students", "Anyone who wants to get started with AI"],
    },
    outcomes: {
      nl: [
        "Je begrijpt wat AI is en waar de grenzen liggen",
        "Je schrijft duidelijke prompts die betere antwoorden opleveren",
        "Je weet welke informatie je wel en niet met AI deelt",
      ],
      en: [
        "You understand what AI is and where its limits are",
        "You write clear prompts that produce better answers",
        "You know which information you should and should not share with AI",
      ],
    },
    note: {
      nl: "Geen voorkennis nodig. Neem een laptop of tablet mee.",
      en: "No prior knowledge required. Bring a laptop or tablet.",
    },
    formats: ["classroom", "online", "in-company"],
  },
  {
    id: "claude-entrepreneurs",
    slug: { nl: "claude-ai-voor-ondernemers", en: "claude-ai-for-entrepreneurs" },
    icon: "brain",
    level: { nl: "Gevorderd beginner", en: "Advanced beginner" },
    name: { nl: "Claude AI voor ondernemers", en: "Claude AI for entrepreneurs" },
    summary: {
      nl: "Zet Claude in als slimme assistent voor administratie, communicatie, documenten en kennisbeheer.",
      en: "Use Claude as a smart assistant for administration, communication, documents and knowledge management.",
    },
    description: {
      nl: [
        "In deze training leer je hoe je Claude, de AI-assistent van Anthropic, inzet in je onderneming. Je analyseert documenten en bestanden, laat Claude helpen met administratie en communicatie en bouwt een eigen kennisbank met Projects.",
        "We laten ook zien hoe Claude Cowork taken met je bestanden en toepassingen kan uitvoeren, en hoe je praktische workflows opzet die je elke week tijd besparen.",
      ],
      en: [
        "In this training you learn how to use Claude, Anthropic's AI assistant, in your business. You analyse documents and files, let Claude help with administration and communication, and build your own knowledge base with Projects.",
        "We also show how Claude Cowork can carry out tasks with your files and applications, and how to set up practical workflows that save you time every week.",
      ],
    },
    price: coursePrices["claude-entrepreneurs"],
    language: { nl: "Nederlands (Engels op aanvraag)", en: "Dutch (English on request)" },
    duration: { nl: "4 uur", en: "4 hours" },
    durationHours: 4,
    topics: {
      nl: [
        "Introductie tot Claude AI van Anthropic",
        "Claude gebruiken voor zakelijke werkzaamheden",
        "Documenten en bestanden analyseren",
        "E-mails, rapportages en zakelijke teksten opstellen",
        "Claude Projects en kennisbeheer",
        "Introductie tot Claude Cowork en praktische workflows",
      ],
      en: [
        "Introduction to Claude AI by Anthropic",
        "Using Claude for business tasks",
        "Analysing documents and files",
        "Drafting emails, reports and business texts",
        "Claude Projects and knowledge management",
        "Introduction to Claude Cowork and practical workflows",
      ],
    },
    included: {
      nl: [
        "Introductie tot Claude AI van Anthropic",
        "Claude gebruiken voor zakelijke werkzaamheden",
        "Documenten en bestanden analyseren",
        "E-mails, rapportages en zakelijke teksten opstellen",
        "Claude Projects en kennisbeheer",
        "Introductie tot Claude Cowork en praktische workflows",
        "Praktische opdrachten",
        "Trainingsmateriaal",
        "ARA AI Academy-certificaat van deelname",
      ],
      en: [
        "Introduction to Claude AI by Anthropic",
        "Using Claude for business tasks",
        "Analysing documents and files",
        "Drafting emails, reports and business texts",
        "Claude Projects and knowledge management",
        "Introduction to Claude Cowork and practical workflows",
        "Hands-on assignments",
        "Training materials",
        "ARA AI Academy certificate of participation",
      ],
    },
    audience: {
      nl: ["Ondernemers en zzp'ers", "Office- en administratief medewerkers", "Managers en teamleiders"],
      en: ["Business owners and freelancers", "Office and administrative staff", "Managers and team leads"],
    },
    outcomes: {
      nl: [
        "Je gebruikt Claude zelfstandig voor documenten, e-mails en analyses",
        "Je hebt een eigen Project met instructies en kennis opgezet",
        "Je weet welke taken je met Cowork kunt automatiseren",
      ],
      en: [
        "You use Claude independently for documents, emails and analyses",
        "You have set up your own Project with instructions and knowledge",
        "You know which tasks you can automate with Cowork",
      ],
    },
    note: {
      nl: "Basiservaring met een computer is voldoende. Sommige functies, zoals Cowork, vereisen een betaald Claude-abonnement; we laten je vooraf weten wat je nodig hebt.",
      en: "Basic computer experience is enough. Some features, such as Cowork, require a paid Claude plan; we let you know in advance what you need.",
    },
    formats: ["classroom", "online", "in-company"],
    highlight: true,
  },
  {
    id: "chatgpt-business",
    slug: { nl: "chatgpt-voor-bedrijven", en: "chatgpt-for-business" },
    icon: "bot",
    level: { nl: "Beginner", en: "Beginner" },
    name: { nl: "ChatGPT voor bedrijven", en: "ChatGPT for Business" },
    summary: {
      nl: "Leer ChatGPT gericht inzetten voor communicatie, analyses en dagelijkse bedrijfstaken.",
      en: "Learn to use ChatGPT effectively for communication, analysis and everyday business tasks.",
    },
    description: {
      nl: [
        "In deze training leer je hoe je ChatGPT van OpenAI inzet in je onderneming: van het opstellen van e-mails en teksten tot het analyseren van informatie en het voorbereiden van rapportages.",
        "We werken met praktijkvoorbeelden en bespreken hoe je ChatGPT veilig gebruikt, welke informatie je wel en niet deelt en hoe je de resultaten controleert.",
      ],
      en: [
        "In this training you learn how to use OpenAI's ChatGPT in your business: from drafting emails and texts to analysing information and preparing reports.",
        "We work with practical examples and discuss how to use ChatGPT safely, which information you should and should not share, and how to check the results.",
      ],
    },
    price: coursePrices["chatgpt-business"],
    language: { nl: "Nederlands (Engels op aanvraag)", en: "Dutch (English on request)" },
    duration: { nl: "In overleg", en: "To be agreed" },
    durationHours: 0,
    topics: {
      nl: [
        "ChatGPT gebruiken voor zakelijke werkzaamheden",
        "E-mails, teksten en rapportages opstellen",
        "Informatie samenvatten en analyseren",
        "Effectieve prompts voor bedrijfstaken",
        "Veilig en verantwoord gebruik",
      ],
      en: [
        "Using ChatGPT for business tasks",
        "Drafting emails, texts and reports",
        "Summarising and analysing information",
        "Effective prompts for business tasks",
        "Safe and responsible use",
      ],
    },
    included: {
      nl: [
        "ChatGPT gebruiken voor zakelijke werkzaamheden",
        "E-mails, teksten en rapportages opstellen",
        "Informatie samenvatten en analyseren",
        "Effectieve prompts voor bedrijfstaken",
        "Veilig en verantwoord gebruik",
        "Trainingsmateriaal",
        "ARA AI Academy-certificaat van deelname",
      ],
      en: [
        "Using ChatGPT for business tasks",
        "Drafting emails, texts and reports",
        "Summarising and analysing information",
        "Effective prompts for business tasks",
        "Safe and responsible use",
        "Training materials",
        "ARA AI Academy certificate of participation",
      ],
    },
    audience: {
      nl: ["Ondernemers en zzp'ers", "Office- en administratief medewerkers", "Marketing- en salesmedewerkers"],
      en: ["Business owners and freelancers", "Office and administrative staff", "Marketing and sales staff"],
    },
    outcomes: {
      nl: [
        "Je zet ChatGPT doelgericht in voor je dagelijkse werk",
        "Je schrijft prompts die bruikbare resultaten opleveren",
        "Je weet hoe je resultaten controleert en gegevens beschermt",
      ],
      en: [
        "You use ChatGPT purposefully in your daily work",
        "You write prompts that produce usable results",
        "You know how to check results and protect data",
      ],
    },
    note: {
      nl: "Prijs en duur worden binnenkort bekendgemaakt. Vraag informatie aan via het inschrijfformulier.",
      en: "Price and duration will be announced soon. Request information through the registration form.",
    },
    formats: ["classroom", "online", "in-company"],
  },
  {
    id: "claude-code-automation",
    slug: { nl: "claude-code-en-ai-automation", en: "claude-code-and-ai-automation" },
    icon: "code",
    level: { nl: "Gevorderd", en: "Advanced" },
    name: { nl: "Claude Code & AI Automation", en: "Claude Code & AI Automation" },
    summary: {
      nl: "Bouw met AI: websites, automatiseringen en integraties met Claude Code, in één intensieve trainingsdag.",
      en: "Build with AI: websites, automations and integrations with Claude Code, in one intensive training day.",
    },
    description: {
      nl: [
        "Claude Code is de AI-programmeertool van Anthropic. In deze trainingsdag leer je hoe je er websites en AI-automatiseringen mee bouwt, hoe API's en integraties werken en hoe je AI-oplossingen test en verbetert.",
        "Je werkt de hele dag aan een praktische projectopdracht en sluit af met een werkend resultaat.",
      ],
      en: [
        "Claude Code is Anthropic's AI coding tool. In this training day you learn how to build websites and AI automations with it, how APIs and integrations work, and how to test and improve AI solutions.",
        "You work on a practical project assignment throughout the day and finish with a working result.",
      ],
    },
    price: coursePrices["claude-code-automation"],
    language: { nl: "Nederlands (Engels op aanvraag)", en: "Dutch (English on request)" },
    duration: { nl: "1 trainingsdag", en: "1 training day" },
    durationHours: 7,
    topics: {
      nl: [
        "Introductie tot Claude Code",
        "Websites bouwen met AI",
        "Werken met code en bestanden",
        "AI-automatiseringen ontwikkelen",
        "API's en applicatiekoppelingen begrijpen",
        "Een praktisch AI-project bouwen",
        "Testen en verbeteren",
      ],
      en: [
        "Introduction to Claude Code",
        "Building websites with AI",
        "Working with code and files",
        "Developing AI automations",
        "Understanding APIs and application integrations",
        "Building a practical AI project",
        "Testing and improving",
      ],
    },
    included: {
      nl: [
        "Introductie tot Claude Code",
        "Websites bouwen met AI",
        "Werken met code en bestanden",
        "AI-automatiseringen ontwikkelen",
        "API's en applicatiekoppelingen begrijpen",
        "Een praktisch AI-project bouwen",
        "Testen en verbeteren",
        "Trainingsmateriaal",
        "ARA AI Academy-certificaat van deelname",
      ],
      en: [
        "Introduction to Claude Code",
        "Building websites with AI",
        "Working with code and files",
        "Developing AI automations",
        "Understanding APIs and application integrations",
        "Building a practical AI project",
        "Testing and improving",
        "Training materials",
        "ARA AI Academy certificate of participation",
      ],
    },
    audience: {
      nl: ["Ondernemers die zelf willen bouwen", "Developers en IT-professionals", "Studenten informatica en techniek"],
      en: ["Business owners who want to build themselves", "Developers and IT professionals", "Computer science and engineering students"],
    },
    outcomes: {
      nl: [
        "Je zet een project op met Claude Code en stuurt het gericht aan",
        "Je bouwt een eenvoudige website of automatisering",
        "Je begrijpt hoe API's en integraties samenwerken",
      ],
      en: [
        "You set up a project with Claude Code and direct it effectively",
        "You build a simple website or automation",
        "You understand how APIs and integrations work together",
      ],
    },
    note: {
      nl: "Programmeerkennis kan nuttig zijn voor bepaalde oefeningen, maar is niet voor alle onderdelen noodzakelijk. Deelnemers nemen hun eigen laptop mee. Voor Claude Code is een betaald Claude-abonnement of API-toegang nodig.",
      en: "Programming knowledge can be useful for certain exercises, but is not required for every part. Participants bring their own laptop. Claude Code requires a paid Claude plan or API access.",
    },
    formats: ["classroom", "online", "in-company"],
  },
  {
    id: "ai-students-professionals",
    slug: { nl: "ai-voor-studenten-en-professionals", en: "ai-for-students-and-professionals" },
    icon: "user-check",
    level: { nl: "Beginner tot gevorderd", en: "Beginner to advanced" },
    name: { nl: "AI voor studenten en professionals", en: "AI for Students and Professionals" },
    summary: {
      nl: "Gebruik AI slim en verantwoord voor studie, onderzoek, loopbaan en dagelijks werk.",
      en: "Use AI smartly and responsibly for study, research, career and everyday work.",
    },
    description: {
      nl: [
        "Deze training helpt studenten en professionals om AI-tools zoals Claude en ChatGPT effectief te gebruiken bij leren, onderzoek, schrijven en plannen.",
        "We besteden aandacht aan kritisch denken, bronvermelding en de regels die onderwijsinstellingen en werkgevers stellen aan AI-gebruik.",
      ],
      en: [
        "This training helps students and professionals use AI tools such as Claude and ChatGPT effectively for learning, research, writing and planning.",
        "We pay attention to critical thinking, citing sources and the rules that educational institutions and employers set for AI use.",
      ],
    },
    price: coursePrices["ai-students-professionals"],
    language: { nl: "Nederlands (Engels op aanvraag)", en: "Dutch (English on request)" },
    duration: { nl: "In overleg", en: "To be agreed" },
    durationHours: 0,
    topics: {
      nl: [
        "AI gebruiken voor studie en onderzoek",
        "Schrijven, samenvatten en plannen met AI",
        "Kritisch omgaan met AI-resultaten",
        "Bronvermelding en regels voor AI-gebruik",
        "AI-vaardigheden voor je loopbaan",
      ],
      en: [
        "Using AI for study and research",
        "Writing, summarising and planning with AI",
        "Critically assessing AI results",
        "Citing sources and rules for AI use",
        "AI skills for your career",
      ],
    },
    included: {
      nl: [
        "AI gebruiken voor studie en onderzoek",
        "Schrijven, samenvatten en plannen met AI",
        "Kritisch omgaan met AI-resultaten",
        "Bronvermelding en regels voor AI-gebruik",
        "AI-vaardigheden voor je loopbaan",
        "Trainingsmateriaal",
        "ARA AI Academy-certificaat van deelname",
      ],
      en: [
        "Using AI for study and research",
        "Writing, summarising and planning with AI",
        "Critically assessing AI results",
        "Citing sources and rules for AI use",
        "AI skills for your career",
        "Training materials",
        "ARA AI Academy certificate of participation",
      ],
    },
    audience: {
      nl: ["Studenten in hoger en middelbaar onderwijs", "Starters op de arbeidsmarkt", "Professionals die zich willen ontwikkelen"],
      en: ["Students in higher and secondary education", "Graduates entering the job market", "Professionals who want to develop"],
    },
    outcomes: {
      nl: [
        "Je gebruikt AI als hulpmiddel zonder je eigen denkwerk uit te besteden",
        "Je werkt sneller aan opdrachten en projecten",
        "Je kent de regels en risico's van AI-gebruik",
      ],
      en: [
        "You use AI as a tool without outsourcing your own thinking",
        "You work faster on assignments and projects",
        "You know the rules and risks of AI use",
      ],
    },
    note: {
      nl: "Prijs en duur worden binnenkort bekendgemaakt; groepstarieven voor scholen en organisaties zijn mogelijk. Vraag informatie aan via het inschrijfformulier.",
      en: "Price and duration will be announced soon; group rates for schools and organisations are possible. Request information through the registration form.",
    },
    formats: ["classroom", "online", "in-company"],
  },
  {
    id: "ai-teams",
    slug: { nl: "ai-voor-bedrijven-en-teams", en: "ai-for-businesses-and-teams" },
    icon: "network",
    level: { nl: "Op maat", en: "Custom" },
    name: { nl: "AI voor bedrijven en teams", en: "AI for businesses and teams" },
    summary: {
      nl: "Een training voor je hele team over AI-toepassingen, automatisering en verantwoord AI-gebruik binnen je organisatie.",
      en: "A training for your whole team on AI applications, automation and responsible AI use within your organisation.",
    },
    description: {
      nl: [
        "Deze bedrijfstraining stemmen we af op jouw organisatie. Je team leert hoe AI wordt ingezet voor administratie, klantenservice en verkoop, wat AI-medewerkers en automatisering kunnen betekenen en hoe je praktische bedrijfsprocessen automatiseert.",
        "We besteden nadrukkelijk aandacht aan AI-beleid, privacy en menselijke controle, zodat je team AI veilig en met vertrouwen gebruikt.",
      ],
      en: [
        "We tailor this company training to your organisation. Your team learns how AI is used for administration, customer service and sales, what AI assistants and automation can mean, and how to automate practical business processes.",
        "We pay explicit attention to AI policy, privacy and human oversight, so your team uses AI safely and with confidence.",
      ],
    },
    price: coursePrices["ai-teams"],
    language: { nl: "Nederlands (Engels op aanvraag)", en: "Dutch (English on request)" },
    duration: { nl: "Halve of hele trainingsdag", en: "Half or full training day" },
    durationHours: 4,
    topics: {
      nl: [
        "AI-toepassingen binnen organisaties",
        "AI voor administratie, klantenservice en verkoop",
        "AI-medewerkers en bedrijfsautomatisering",
        "Praktische toepassingen binnen de eigen organisatie",
        "Veilig en verantwoord AI-gebruik",
        "Advies over AI-toepassingen voor bedrijfsprocessen",
      ],
      en: [
        "AI applications within organisations",
        "AI for administration, customer service and sales",
        "AI assistants and business automation",
        "Practical applications within your own organisation",
        "Safe and responsible AI use",
        "Advice on AI applications for business processes",
      ],
    },
    included: {
      nl: [
        "AI-toepassingen binnen organisaties",
        "AI voor administratie, klantenservice en verkoop",
        "AI-medewerkers en bedrijfsautomatisering",
        "Praktische toepassingen binnen de eigen organisatie",
        "Veilig en verantwoord AI-gebruik",
        "Advies over AI-toepassingen voor bedrijfsprocessen",
        "Trainingsmateriaal",
        "ARA AI Academy-certificaat van deelname voor deelnemers die de training afronden",
      ],
      en: [
        "AI applications within organisations",
        "AI for administration, customer service and sales",
        "AI assistants and business automation",
        "Practical applications within your own organisation",
        "Safe and responsible AI use",
        "Advice on AI applications for business processes",
        "Training materials",
        "ARA AI Academy certificate of participation for participants who complete the training",
      ],
    },
    audience: {
      nl: ["Teams en afdelingen", "Directie en management", "Organisaties die AI breed willen invoeren"],
      en: ["Teams and departments", "Executives and management", "Organisations that want to adopt AI broadly"],
    },
    outcomes: {
      nl: [
        "Je team kent de kansen en risico's van AI voor jullie werk",
        "Jullie hebben concrete processen geselecteerd om te automatiseren",
        "Er ligt een basis voor jullie eigen AI-beleid",
      ],
      en: [
        "Your team knows the opportunities and risks of AI for your work",
        "You have selected concrete processes to automate",
        "There is a foundation for your own AI policy",
      ],
    },
    note: {
      nl: "De definitieve prijs hangt af van groepsgrootte, trainingsduur en maatwerk. Je ontvangt altijd eerst een offerte.",
      en: "The final price depends on group size, training duration and customisation. You always receive a quote first.",
    },
    formats: ["in-company", "online"],
  },
];

/**
 * UPCOMING SESSIONS — add confirmed dates here. Only list sessions that are
 * actually scheduled; the page shows an honest empty state when this is empty.
 */
export type TrainingSession = {
  trainingId: string;
  /** ISO date, e.g. "2026-12-05". */
  date: string;
  /** Optional start and end time, e.g. "09:00–13:00". */
  time?: string;
  format: Exclude<TrainingFormat, "in-company">;
  location?: Localized;
  /** Optional remaining seats. */
  seats?: number;
};
export const upcomingSessions: TrainingSession[] = [];

export const formatIcons: Record<TrainingFormat, IconName> = {
  classroom: "user-check",
  online: "globe",
  "in-company": "network",
};

export const academyReceives: { icon: IconName; text: Localized }[] = [
  { icon: "file", text: { nl: "Praktische trainingsmaterialen", en: "Practical training materials" } },
  { icon: "clipboard", text: { nl: "Oefeningen en voorbeelden", en: "Exercises and examples" } },
  { icon: "log", text: { nl: "Prompts en templates, waar van toepassing", en: "Prompts and templates, where applicable" } },
  { icon: "app", text: { nl: "Praktische demonstraties", en: "Practical demonstrations" } },
  {
    icon: "shield",
    text: { nl: "Certificaat van deelname van ARA AI Academy na afronding", en: "ARA AI Academy certificate of participation upon completion" },
  },
];

/** Claude product areas covered in the trainings. Keep names exact. */
export const claudeTopics: { icon: IconName; name: Localized; text: Localized }[] = [
  {
    icon: "bot",
    name: { nl: "Claude", en: "Claude" },
    text: {
      nl: "De AI-assistent zelf: schrijven, samenvatten, analyseren en meedenken via het web, de desktop-app en de mobiele app.",
      en: "The AI assistant itself: writing, summarising, analysing and thinking along via the web, the desktop app and the mobile app.",
    },
  },
  {
    icon: "inbox",
    name: { nl: "Projects", en: "Projects" },
    text: {
      nl: "Werkruimtes met eigen documenten en instructies, zodat Claude antwoorden geeft op basis van jouw kennis.",
      en: "Workspaces with your own documents and instructions, so Claude answers based on your knowledge.",
    },
  },
  {
    icon: "workflow",
    name: { nl: "Claude Cowork", en: "Claude Cowork" },
    text: {
      nl: "Claude in de desktop-app die zelfstandig taken uitvoert met je bestanden en toepassingen, met jouw goedkeuring bij belangrijke stappen.",
      en: "Claude in the desktop app, carrying out tasks with your files and applications, with your approval for important steps.",
    },
  },
  {
    icon: "code",
    name: { nl: "Claude Code", en: "Claude Code" },
    text: {
      nl: "De AI-programmeertool van Anthropic om software, websites en automatiseringen te bouwen.",
      en: "Anthropic's AI coding tool for building software, websites and automations.",
    },
  },
  {
    icon: "plug",
    name: { nl: "Integraties", en: "Integrations" },
    text: {
      nl: "Claude verbinden met andere toepassingen via connectors, het Model Context Protocol (MCP) en de Claude API.",
      en: "Connecting Claude to other applications through connectors, the Model Context Protocol (MCP) and the Claude API.",
    },
  },
];

/**
 * Official Anthropic resources. anthropic.com/learn is Anthropic's official
 * entry point for its (free) Academy courses; it forwards to the current course
 * platform, so we do not hard-code the course host.
 */
export const ANTHROPIC_ACADEMY_URL = "https://www.anthropic.com/learn";
export const claudeLinks: { label: Localized; url: string }[] = [
  { label: { nl: "Anthropic", en: "Anthropic" }, url: "https://www.anthropic.com/" },
  { label: { nl: "Claude", en: "Claude" }, url: "https://claude.ai/" },
  { label: { nl: "Documentatie", en: "Documentation" }, url: "https://docs.anthropic.com/" },
  { label: { nl: "Anthropic Academy", en: "Anthropic Academy" }, url: ANTHROPIC_ACADEMY_URL },
];

export const academyTerms: Localized<string[]> = {
  nl: [
    "Alle prijzen zijn in USD.",
    "Deelnameprijzen gelden per persoon, behalve de bedrijfstraining.",
    "Bedrijfstrainingen worden op basis van een offerte aangeboden.",
    "Trainingen kunnen klassikaal of online worden verzorgd, afhankelijk van de planning.",
    "Eventuele betaalde softwareabonnementen, AI-licenties en API-gebruik zijn niet inbegrepen.",
    "Deelnemers kunnen voor bepaalde oefeningen een eigen Claude- of ChatGPT-account nodig hebben.",
    "Het ARA AI Academy-certificaat is een certificaat van deelname en geen officiële Anthropic-certificering.",
    "Trainingsdata worden bevestigd na registratie en afstemming.",
    "Annulerings- en betalingsvoorwaarden worden vooraf aan deelnemers meegedeeld.",
  ],
  en: [
    "All prices are in USD.",
    "Participation prices are per person, except for the company training.",
    "Company trainings are offered on the basis of a quote.",
    "Trainings can be delivered in a classroom or online, depending on the schedule.",
    "Any paid software subscriptions, AI licences and API usage are not included.",
    "Participants may need their own Claude or ChatGPT account for certain exercises.",
    "The ARA AI Academy certificate is a certificate of participation, not an official Anthropic certification.",
    "Training dates are confirmed after registration and coordination.",
    "Cancellation and payment terms are communicated to participants in advance.",
  ],
};

export const academyFaq: Localized<FaqItem[]> = {
  nl: [
    {
      question: "Heb ik technische kennis nodig om deel te nemen?",
      answer:
        "Nee. Voor AI voor beginners, Claude AI voor ondernemers en de bedrijfstraining is geen technische kennis nodig. Bij Claude Code & AI Automation kan programmeerkennis nuttig zijn voor bepaalde oefeningen, maar ook die training is niet voor alle onderdelen afhankelijk van programmeerervaring.",
    },
    {
      question: "Moet ik een eigen laptop meenemen?",
      answer:
        "Ja, voor klassikale trainingen neem je bij voorkeur je eigen laptop mee, zodat je direct in je eigen omgeving oefent. Voor Claude Code & AI Automation is een eigen laptop verplicht. Bij AI voor beginners volstaat eventueel een tablet.",
    },
    {
      question: "Heb ik een betaald Claude- of ChatGPT-account nodig?",
      answer:
        "Voor de meeste oefeningen in AI voor beginners volstaan de gratis versies. Sommige onderdelen, zoals Claude Cowork en Claude Code, vereisen een betaald Claude-abonnement of API-toegang. Deze kosten zijn niet inbegrepen in de trainingsprijs. We laten je vóór de training weten wat je nodig hebt.",
    },
    {
      question: "Kan ik de training online volgen?",
      answer:
        "Ja. Onze trainingen worden klassikaal in Suriname of als online live training gegeven, afhankelijk van de planning. Bij de inschrijving geef je aan welke vorm je voorkeur heeft.",
    },
    {
      question: "Ontvang ik een certificaat?",
      answer:
        "Ja. Na afronding ontvang je een certificaat van deelname van ARA AI Academy. Dit certificaat wordt door ARA uitgegeven en is geen officiële certificering van Anthropic of OpenAI.",
    },
    {
      question: "Zijn jullie een officiële Anthropic-partner?",
      answer:
        "Nee. ARA Intelligent Solutions verzorgt onafhankelijke trainingen en implementatiediensten rondom Claude AI en andere AI-technologieën en is op dit moment geen officieel door Anthropic erkende partner of certificeringsinstelling. Eventuele toekomstige partnererkenning of certificeringen vermelden we pas nadat deze officieel zijn toegekend.",
    },
    {
      question: "Kunnen jullie een AI-training voor mijn bedrijf op maat verzorgen?",
      answer:
        "Ja. Met de training AI voor bedrijven en teams stemmen we het programma, de duur en de voorbeelden af op jullie werkzaamheden, op locatie in Suriname of online. De prijs is vanaf $350 USD per groep; je ontvangt altijd eerst een offerte.",
    },
    {
      question: "Zijn softwareabonnementen inbegrepen in de trainingsprijs?",
      answer:
        "Nee. Eventuele betaalde softwareabonnementen, AI-licenties en API-gebruik zijn niet inbegrepen. Trainingsmateriaal, oefeningen en het certificaat van deelname zijn wel inbegrepen.",
    },
    {
      question: "Hoe kan ik mij inschrijven?",
      answer:
        "Via het inschrijfformulier op deze pagina. Kies de training, het aantal deelnemers en je voorkeur voor klassikaal of online. Je kunt ook op 'Schrijf je in' klikken bij een training; die training wordt dan automatisch geselecteerd.",
    },
    {
      question: "Wanneer ontvang ik de bevestiging van mijn inschrijving?",
      answer:
        "Na het versturen van het formulier nemen we contact met je op om de training, de datum en de betaling af te stemmen. Je inschrijving is definitief zodra we die samen hebben bevestigd. Het versturen van het formulier is dus nog geen definitieve inschrijving.",
    },
  ],
  en: [
    {
      question: "Do I need technical knowledge to take part?",
      answer:
        "No. AI for beginners, Claude AI for entrepreneurs and the company training require no technical knowledge. For Claude Code & AI Automation, programming knowledge can be useful for certain exercises, but that training does not depend on programming experience for every part either.",
    },
    {
      question: "Do I need to bring my own laptop?",
      answer:
        "Yes, for classroom trainings we recommend bringing your own laptop so you can practise in your own environment. For Claude Code & AI Automation your own laptop is required. For AI for beginners a tablet can also work.",
    },
    {
      question: "Do I need a paid Claude or ChatGPT account?",
      answer:
        "The free versions are enough for most exercises in AI for beginners. Some parts, such as Claude Cowork and Claude Code, require a paid Claude plan or API access. These costs are not included in the training price. We let you know before the training what you need.",
    },
    {
      question: "Can I take the training online?",
      answer:
        "Yes. Our trainings are given in a classroom in Suriname or as live online training, depending on the schedule. You indicate your preferred format when you register.",
    },
    {
      question: "Will I receive a certificate?",
      answer:
        "Yes. Upon completion you receive an ARA AI Academy certificate of participation. This certificate is issued by ARA and is not an official certification from Anthropic or OpenAI.",
    },
    {
      question: "Are you an official Anthropic partner?",
      answer:
        "No. ARA Intelligent Solutions independently provides training and implementation services related to Claude AI and other AI technologies, and is not currently an officially recognised Anthropic partner or certification provider. Any future partnership status or certifications will only be announced after official approval.",
    },
    {
      question: "Can you provide a tailored AI training for my company?",
      answer:
        "Yes. With the AI for businesses and teams training we tailor the programme, duration and examples to your work, on location in Suriname or online. Prices start at $350 USD per group; you always receive a quote first.",
    },
    {
      question: "Are software subscriptions included in the training price?",
      answer:
        "No. Any paid software subscriptions, AI licences and API usage are not included. Training materials, exercises and the certificate of participation are included.",
    },
    {
      question: "How do I register?",
      answer:
        "Use the registration form on this page. Choose the training, the number of participants and your preference for classroom or online. You can also click 'Register' on a training; that training is then selected automatically.",
    },
    {
      question: "When will I receive confirmation of my registration?",
      answer:
        "After you submit the form, we contact you to arrange the training, date and payment. Your registration is final once we have confirmed it together. Submitting the form is therefore not yet a final registration.",
    },
  ],
};

export function getTrainingBySlug(locale: "nl" | "en", slug: string): Training | undefined {
  return trainings.find((training) => training.slug[locale] === slug);
}

export function getTraining(id: string): Training | undefined {
  return trainings.find((training) => training.id === id);
}
