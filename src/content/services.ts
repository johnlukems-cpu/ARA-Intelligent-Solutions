import type { Locale, Localized } from "@/i18n/config";
import type { DivisionId, IconName, ServiceCategory, ServiceCategoryId } from "./types";

/**
 * SERVICE DIVISIONS
 *
 * ARA is organised in four divisions. Three have a page under /diensten/<slug>
 * (defined here); the fourth, ARA AI Academy, has its own section (/academy,
 * content in academy.ts). `divisions` combines all four for menus and cards.
 */
export const serviceCategories: ServiceCategory[] = [
  /* ---------------------------------------------------------------- */
  /* ARA AI Solutions                                                   */
  /* ---------------------------------------------------------------- */
  {
    id: "ai-solutions",
    slug: { nl: "ai-solutions", en: "ai-solutions" },
    icon: "brain",
    accent: "cyan",
    name: { nl: "ARA AI Solutions", en: "ARA AI Solutions" },
    shortName: { nl: "AI Solutions", en: "AI Solutions" },
    positioning: {
      nl: "Intelligente AI-oplossingen waarmee bedrijven slimmer, sneller en efficiënter werken.",
      en: "Intelligent AI solutions that help businesses work smarter, faster and more efficiently.",
    },
    summary: {
      nl: "AI-medewerkers, automatisering, chatbots en AI-integraties die terugkerend werk uit handen nemen.",
      en: "AI assistants, automation, chatbots and AI integrations that take recurring work off your hands.",
    },
    intro: {
      nl: "Van een AI-medewerker die e-mails verwerkt tot een chatbot op je website: wij zetten AI in waar het aantoonbaar tijd bespaart en de kwaliteit verbetert. Altijd binnen duidelijke regels en met menselijke controle waar het telt.",
      en: "From an AI assistant that processes emails to a chatbot on your website: we apply AI where it demonstrably saves time and improves quality. Always within clear rules and with human oversight where it matters.",
    },
    highlights: {
      nl: ["AI-medewerkers", "Bedrijfsautomatisering", "AI-chatbots"],
      en: ["AI assistants", "Business automation", "AI chatbots"],
    },
    services: [
      {
        id: "ai-employees",
        icon: "cpu",
        name: { nl: "AI-medewerkers", en: "AI Employees" },
        description: {
          nl: "Digitale AI-medewerkers die bedrijfsprocessen ondersteunen: ze verwerken informatie, voeren afgesproken taken uit en werken met je bestaande software.",
          en: "Digital AI assistants that support business processes: they process information, carry out agreed tasks and work with your existing software.",
        },
        offerings: {
          nl: [
            "AI Administratief Medewerker",
            "AI Klantenservice Medewerker",
            "AI Verkoopmedewerker",
            "AI Financieel Medewerker",
            "AI Operationeel Medewerker",
          ],
          en: [
            "AI Administrative Assistant",
            "AI Customer Service Assistant",
            "AI Sales Assistant",
            "AI Finance Assistant",
            "AI Operations Assistant",
          ],
        },
        useCases: {
          nl: ["Inkomende e-mails categoriseren en opvolgtaken aanmaken", "Factuurgegevens verzamelen voor controle"],
          en: ["Categorising incoming emails and creating follow-up tasks", "Collecting invoice data for review"],
        },
        benefits: {
          nl: ["Minder repetitief werk", "Snellere afhandeling"],
          en: ["Less repetitive work", "Faster handling"],
        },
        more: { routeKey: "aiEmployees", label: { nl: "Meer over AI-medewerkers", en: "More about AI assistants" } },
      },
      {
        id: "ai-automation",
        icon: "workflow",
        name: { nl: "AI-automatisering", en: "AI Automation" },
        description: {
          nl: "We automatiseren terugkerende processen met slimme workflows, zodat informatie automatisch op de juiste plek komt.",
          en: "We automate recurring processes with smart workflows, so information automatically ends up in the right place.",
        },
        offerings: {
          nl: [
            "Automatisering van bedrijfsprocessen",
            "Documentverwerking",
            "Workflowautomatisering",
            "E-mailautomatisering",
            "Gegevensverwerking",
            "Geautomatiseerde rapportages",
            "Applicatiekoppelingen",
          ],
          en: [
            "Business process automation",
            "Document processing",
            "Workflow automation",
            "Email automation",
            "Data processing",
            "Automated reporting",
            "Application integrations",
          ],
        },
        useCases: {
          nl: ["Webformulieren automatisch verwerken in je administratie", "Maandrapportages die zichzelf samenstellen"],
          en: ["Processing web forms automatically into your administration", "Monthly reports that compile themselves"],
        },
        benefits: {
          nl: ["Minder invoerfouten", "Meer overzicht"],
          en: ["Fewer input errors", "Better oversight"],
        },
      },
      {
        id: "ai-chatbots",
        icon: "bot",
        name: { nl: "AI-chatbots", en: "AI Chatbots" },
        description: {
          nl: "Chatbots en assistenten die vragen beantwoorden op basis van jouw eigen informatie, voor klanten of voor je eigen team.",
          en: "Chatbots and assistants that answer questions based on your own information, for customers or for your own team.",
        },
        offerings: {
          nl: ["AI-chatbots voor websites", "Klantenservice-assistenten", "Interne kennisassistenten", "Assistenten voor bedrijfsinformatie"],
          en: ["Website AI chatbots", "Customer support assistants", "Internal knowledge assistants", "Business information assistants"],
        },
        useCases: {
          nl: ["Veelgestelde vragen 24/7 beantwoorden", "Procedures en beleid snel terugvinden"],
          en: ["Answering frequently asked questions 24/7", "Quickly finding procedures and policies"],
        },
        benefits: {
          nl: ["Klanten sneller geholpen", "Minder herhaalde vragen"],
          en: ["Customers helped faster", "Fewer repeated questions"],
        },
        more: { routeKey: "pricing", label: { nl: "Bekijk de prijzen", en: "View pricing" } },
      },
      {
        id: "ai-integration",
        icon: "plug",
        name: { nl: "AI-integratie", en: "AI Integration" },
        description: {
          nl: "We koppelen AI-modellen zoals Claude en ChatGPT aan je bedrijfsprocessen en applicaties, veilig en afgebakend.",
          en: "We connect AI models such as Claude and ChatGPT to your business processes and applications, securely and with a clear scope.",
        },
        offerings: {
          nl: [
            "Claude AI-integratie",
            "ChatGPT-integratie",
            "AI-gestuurde bedrijfsworkflows",
            "API-koppelingen",
            "AI-ondersteunde bedrijfsprocessen",
          ],
          en: [
            "Claude AI integration",
            "ChatGPT integration",
            "AI-powered business workflows",
            "API integrations",
            "AI-assisted business processes",
          ],
        },
        useCases: {
          nl: ["Documenten laten samenvatten binnen je eigen systeem", "AI-analyse van klantaanvragen"],
          en: ["Summarising documents within your own system", "AI analysis of customer requests"],
        },
        benefits: {
          nl: ["AI waar je al werkt", "Duidelijke afspraken over data"],
          en: ["AI where you already work", "Clear agreements on data"],
        },
      },
    ],
    applications: {
      nl: [
        { title: "Administratie", text: "E-mails sorteren, documenten uitlezen en gegevens klaarzetten voor controle." },
        { title: "Klantenservice", text: "Veelgestelde vragen beantwoorden en complexe vragen doorsturen naar een medewerker." },
        { title: "Verkoop", text: "Leads registreren, aanvragen classificeren en offerteconcepten voorbereiden." },
        { title: "Rapportage", text: "Cijfers uit meerdere bronnen verzamelen tot een overzichtelijk rapport." },
      ],
      en: [
        { title: "Administration", text: "Sorting emails, reading documents and preparing data for review." },
        { title: "Customer service", text: "Answering frequently asked questions and forwarding complex questions to a colleague." },
        { title: "Sales", text: "Registering leads, classifying requests and preparing draft quotes." },
        { title: "Reporting", text: "Collecting figures from several sources into a clear report." },
      ],
    },
    benefits: {
      nl: [
        { title: "Tijd voor waardevol werk", text: "Repetitieve taken worden overgenomen, zodat je team zich op klanten en groei richt." },
        { title: "Consistente kwaliteit", text: "Vaste regels zorgen voor dezelfde aanpak, elke keer." },
        { title: "Controle blijft bij jou", text: "Gevoelige acties vereisen menselijke goedkeuring." },
      ],
      en: [
        { title: "Time for valuable work", text: "Repetitive tasks are taken over, so your team can focus on customers and growth." },
        { title: "Consistent quality", text: "Fixed rules ensure the same approach, every time." },
        { title: "You stay in control", text: "Sensitive actions require human approval." },
      ],
    },
    process: {
      nl: [
        { title: "Verkenning", text: "We bespreken je processen en bepalen waar AI waarde toevoegt." },
        { title: "Ontwerp", text: "We leggen taken, regels, toegangsrechten en controlemomenten vast." },
        { title: "Bouw en test", text: "We bouwen de oplossing en testen met echte voorbeelden." },
        { title: "Livegang", text: "We nemen de oplossing in gebruik en instrueren je team." },
        { title: "Onderhoud", text: "We monitoren, verhelpen fouten en verbeteren waar nodig." },
      ],
      en: [
        { title: "Discovery", text: "We discuss your processes and determine where AI adds value." },
        { title: "Design", text: "We define tasks, rules, access rights and review points." },
        { title: "Build and test", text: "We build the solution and test it with real examples." },
        { title: "Go-live", text: "We put the solution into use and instruct your team." },
        { title: "Maintenance", text: "We monitor, fix errors and improve where needed." },
      ],
    },
    note: {
      title: { nl: "AI met menselijke controle", en: "AI with human oversight" },
      text: {
        nl: "AI kan fouten maken. Daarom vereisen AI-oplossingen passend menselijk toezicht, zeker bij financiële, juridische en andere gevoelige processen. Definitieve boekingen, betalingen, belastingaangiften en juridische beslissingen worden nooit zonder expliciete goedkeuring van een medewerker uitgevoerd.",
        en: "AI can make mistakes. That is why AI solutions require appropriate human supervision, especially for financial, legal and other sensitive processes. Final bookkeeping entries, payments, tax returns and legal decisions are never carried out without explicit approval from a person.",
      },
    },
    faq: {
      nl: [
        {
          question: "Wat is het verschil tussen een chatbot en een AI-medewerker?",
          answer:
            "Een chatbot beantwoordt vooral vragen in een gesprek. Een AI-medewerker voert binnen vaste regels en toegangsrechten ook taken uit, zoals gegevens verwerken, taken aanmaken of informatie tussen systemen overdragen.",
        },
        {
          question: "Welke AI-modellen gebruiken jullie?",
          answer:
            "We werken onder meer met Claude van Anthropic en ChatGPT van OpenAI. We kiezen per toepassing het model dat het beste past bij de taak, de kosten en de afspraken over gegevens.",
        },
        {
          question: "Zijn AI-gebruikskosten inbegrepen?",
          answer:
            "Nee. Kosten voor AI-gebruik, API-aanroepen en externe platformen worden apart berekend. We geven vooraf een inschatting op basis van het verwachte gebruik.",
        },
        {
          question: "Wat gebeurt er met onze gegevens?",
          answer:
            "AI-oplossingen krijgen alleen toegang tot de gegevens die nodig zijn. Per project leggen we vast welke gegevens worden verwerkt, waar en door wie.",
        },
      ],
      en: [
        {
          question: "What is the difference between a chatbot and an AI assistant?",
          answer:
            "A chatbot mainly answers questions in a conversation. An AI assistant also carries out tasks within fixed rules and access rights, such as processing data, creating tasks or transferring information between systems.",
        },
        {
          question: "Which AI models do you use?",
          answer:
            "Among others, we work with Claude by Anthropic and ChatGPT by OpenAI. For each application we choose the model that best fits the task, the costs and the agreements on data.",
        },
        {
          question: "Are AI usage costs included?",
          answer:
            "No. Costs for AI usage, API calls and external platforms are charged separately. We give you an estimate in advance based on expected usage.",
        },
        {
          question: "What happens to our data?",
          answer:
            "AI solutions only get access to the data they need. For each project we define which data is processed, where and by whom.",
        },
      ],
    },
    cta: { nl: "Plan een gratis kennismaking", en: "Book a consultation" },
    seo: {
      nl: {
        title: "ARA AI Solutions — AI-medewerkers, automatisering en chatbots in Suriname",
        description:
          "AI-medewerkers, AI-automatisering, chatbots en Claude- en ChatGPT-integraties voor bedrijven in Suriname en daarbuiten. Met menselijke controle waar het telt.",
      },
      en: {
        title: "ARA AI Solutions — AI assistants, automation and chatbots in Suriname",
        description:
          "AI assistants, AI automation, chatbots and Claude and ChatGPT integrations for businesses in Suriname and beyond. With human oversight where it matters.",
      },
    },
  },

  /* ---------------------------------------------------------------- */
  /* ARA Digital Solutions                                              */
  /* ---------------------------------------------------------------- */
  {
    id: "digital-solutions",
    slug: { nl: "digital-solutions", en: "digital-solutions" },
    icon: "code",
    accent: "blue",
    name: { nl: "ARA Digital Solutions", en: "ARA Digital Solutions" },
    shortName: { nl: "Digital Solutions", en: "Digital Solutions" },
    positioning: {
      nl: "Digitale platformen en software waarmee bedrijven hun online activiteiten opzetten, verbeteren en laten groeien.",
      en: "Digital platforms and software solutions that help businesses establish, improve and scale their online operations.",
    },
    summary: {
      nl: "Websites, webapplicaties, cloudsoftware en koppelingen die meegroeien met je onderneming.",
      en: "Websites, web applications, cloud software and integrations that grow with your business.",
    },
    intro: {
      nl: "Een professionele website, een klantportaal of een dashboard dat je cijfers bij elkaar brengt: wij bouwen digitale oplossingen die snel, veilig en goed te onderhouden zijn.",
      en: "A professional website, a customer portal or a dashboard that brings your figures together: we build digital solutions that are fast, secure and easy to maintain.",
    },
    highlights: {
      nl: ["Websites en webshops", "Webapplicaties", "Cloud en koppelingen"],
      en: ["Websites and webshops", "Web applications", "Cloud and integrations"],
    },
    services: [
      {
        id: "website-development",
        icon: "globe",
        name: { nl: "Websiteontwikkeling", en: "Website Development" },
        description: {
          nl: "Snelle, vindbare en toegankelijke websites die je onderneming professioneel presenteren, in één of meer talen.",
          en: "Fast, discoverable and accessible websites that present your business professionally, in one or more languages.",
        },
        offerings: {
          nl: ["Bedrijfswebsites", "Corporate websites", "Landingspagina's", "E-commercewebsites", "Website-redesign"],
          en: ["Business websites", "Corporate websites", "Landing pages", "E-commerce websites", "Website redesign"],
        },
        useCases: {
          nl: ["Tweetalige bedrijfswebsite met contactformulier", "Webshop met online betalingen"],
          en: ["Bilingual business website with contact form", "Webshop with online payments"],
        },
        benefits: {
          nl: ["Professionele uitstraling", "Beter vindbaar in Google"],
          en: ["Professional presence", "Easier to find on Google"],
        },
        more: { routeKey: "pricing", label: { nl: "Bekijk het websitepakket", en: "View the website package" } },
      },
      {
        id: "web-applications",
        icon: "app",
        name: { nl: "Webapplicaties", en: "Web Applications" },
        description: {
          nl: "Maatwerkapplicaties in de browser, voor je team of je klanten, op elk apparaat en zonder installatie.",
          en: "Custom browser-based applications for your team or your customers, on any device and without installation.",
        },
        offerings: {
          nl: ["Maatwerk webapplicaties", "Bedrijfsdashboards", "Klantportalen", "Administratieve systemen", "Online platformen"],
          en: ["Custom web applications", "Business dashboards", "Customer portals", "Administrative systems", "Online platforms"],
        },
        useCases: {
          nl: ["Klantportaal voor aanvragen en documenten", "Dashboard met actuele bedrijfscijfers"],
          en: ["Customer portal for requests and documents", "Dashboard with up-to-date business figures"],
        },
        benefits: {
          nl: ["Overal toegang", "Past precies bij je proces"],
          en: ["Access from anywhere", "Fits your process exactly"],
        },
      },
      {
        id: "cloud-solutions",
        icon: "network",
        name: { nl: "Cloudoplossingen", en: "Cloud Solutions" },
        description: {
          nl: "Applicaties en documenten in de cloud, veilig ingericht en gekoppeld aan je andere systemen.",
          en: "Applications and documents in the cloud, securely configured and connected to your other systems.",
        },
        offerings: {
          nl: ["Cloudapplicaties", "Configuratie van cloudinfrastructuur", "Koppeling van bedrijfssystemen", "Digitaal documentbeheer"],
          en: ["Cloud-based applications", "Cloud infrastructure configuration", "Business system integrations", "Digital document management"],
        },
        useCases: {
          nl: ["Documenten centraal en veilig opslaan", "Bedrijfsapplicatie in de cloud hosten"],
          en: ["Storing documents centrally and securely", "Hosting a business application in the cloud"],
        },
        benefits: {
          nl: ["Schaalbaar", "Minder afhankelijk van één computer"],
          en: ["Scalable", "Less dependent on a single computer"],
        },
      },
      {
        id: "software-integrations",
        icon: "plug",
        name: { nl: "Software en koppelingen", en: "Software & Integrations" },
        description: {
          nl: "Software op maat en koppelingen die je systemen laten samenwerken, zodat gegevens niet dubbel worden ingevoerd.",
          en: "Custom software and integrations that make your systems work together, so data is not entered twice.",
        },
        offerings: {
          nl: ["Maatwerksoftware", "API-koppelingen", "Integratie van bedrijfsprocessen", "Database-oplossingen", "Rapportagedashboards"],
          en: ["Custom software development", "API integrations", "Business process integrations", "Database solutions", "Reporting dashboards"],
        },
        useCases: {
          nl: ["Webshop koppelen aan voorraad en boekhouding", "Centrale database voor rapportages"],
          en: ["Connecting a webshop to inventory and accounting", "Central database for reporting"],
        },
        benefits: {
          nl: ["Eén bron van waarheid", "Minder handwerk"],
          en: ["One source of truth", "Less manual work"],
        },
      },
    ],
    applications: {
      nl: [
        { title: "Online zichtbaarheid", text: "Een professionele website die klanten vertrouwen en die goed vindbaar is." },
        { title: "Online verkopen", text: "Een webshop met betalingen, voorraadkoppeling en overzichtelijk beheer." },
        { title: "Interne processen", text: "Een webapplicatie die spreadsheets en losse lijsten vervangt." },
        { title: "Managementinformatie", text: "Een dashboard dat cijfers uit verschillende systemen samenbrengt." },
      ],
      en: [
        { title: "Online visibility", text: "A professional website that customers trust and that is easy to find." },
        { title: "Selling online", text: "A webshop with payments, inventory integration and clear management." },
        { title: "Internal processes", text: "A web application that replaces spreadsheets and separate lists." },
        { title: "Management information", text: "A dashboard that brings together figures from different systems." },
      ],
    },
    benefits: {
      nl: [
        { title: "Gebouwd om te groeien", text: "Moderne technologie die meegroeit met je onderneming." },
        { title: "Snel en veilig", text: "Aandacht voor prestaties, beveiliging en toegankelijkheid." },
        { title: "Goed overdraagbaar", text: "Gedocumenteerd, zodat je niet afhankelijk bent van één partij." },
      ],
      en: [
        { title: "Built to grow", text: "Modern technology that grows with your business." },
        { title: "Fast and secure", text: "Attention to performance, security and accessibility." },
        { title: "Easy to hand over", text: "Documented, so you never depend on a single party." },
      ],
    },
    process: {
      nl: [
        { title: "Kennismaking", text: "We leren je onderneming, doelen en uitdagingen kennen." },
        { title: "Eisen", text: "We leggen vast wat de oplossing moet kunnen." },
        { title: "Ontwerp", text: "We ontwerpen structuur, schermen en gebruikerservaring." },
        { title: "Ontwikkeling", text: "We bouwen in korte stappen met regelmatige demo's." },
        { title: "Testen", text: "We testen functionaliteit, snelheid en gebruiksgemak." },
        { title: "Lancering", text: "We zetten de oplossing live en begeleiden de ingebruikname." },
        { title: "Onderhoud", text: "We houden alles veilig, actueel en goed werkend." },
      ],
      en: [
        { title: "Discovery", text: "We get to know your business, goals and challenges." },
        { title: "Requirements", text: "We define what the solution needs to do." },
        { title: "Design", text: "We design the structure, screens and user experience." },
        { title: "Development", text: "We build in short iterations with regular demos." },
        { title: "Testing", text: "We test functionality, speed and usability." },
        { title: "Launch", text: "We put the solution live and support the roll-out." },
        { title: "Maintenance", text: "We keep everything secure, up to date and working." },
      ],
    },
    faq: {
      nl: [
        {
          question: "Wat kost een website?",
          answer:
            "Ons Business Website Package begint bij $150 USD eenmalig voor een website tot 5 pagina's. Voor webapplicaties en maatwerk ontvang je een offerte op basis van je wensen. Bekijk de prijspagina voor details.",
        },
        {
          question: "Is hosting inbegrepen?",
          answer:
            "Hosting is niet inbegrepen, tenzij dat expliciet in de offerte staat. We adviseren over een passende hostingoplossing.",
        },
        {
          question: "Kan ik de website zelf aanpassen?",
          answer:
            "Ja, waar mogelijk richten we de website zo in dat je zelf teksten kunt wijzigen. Met ARA Website Care kunnen wij kleine wijzigingen voor je doen.",
        },
        {
          question: "Wie is eigenaar van de software?",
          answer: "Afspraken over eigendom, broncode en overdracht leggen we per project vast in de offerte.",
        },
      ],
      en: [
        {
          question: "How much does a website cost?",
          answer:
            "Our Business Website Package starts at $150 USD one-time for a website of up to 5 pages. For web applications and custom work you receive a quote based on your requirements. See the pricing page for details.",
        },
        {
          question: "Is hosting included?",
          answer: "Hosting is not included unless explicitly stated in the quote. We advise you on a suitable hosting solution.",
        },
        {
          question: "Can I edit the website myself?",
          answer:
            "Yes, where possible we set up the website so you can change texts yourself. With ARA Website Care we can make small changes for you.",
        },
        {
          question: "Who owns the software?",
          answer: "Agreements on ownership, source code and handover are defined per project in the quote.",
        },
      ],
    },
    cta: { nl: "Start je digitale project", en: "Start your digital project" },
    seo: {
      nl: {
        title: "ARA Digital Solutions — websites, webapplicaties en software in Suriname",
        description:
          "Websiteontwikkeling, webapplicaties, cloudoplossingen en maatwerksoftware met koppelingen voor bedrijven in Suriname en daarbuiten.",
      },
      en: {
        title: "ARA Digital Solutions — websites, web applications and software in Suriname",
        description:
          "Website development, web applications, cloud solutions and custom software with integrations for businesses in Suriname and beyond.",
      },
    },
  },

  /* ---------------------------------------------------------------- */
  /* ARA IT & Business Technology                                       */
  /* ---------------------------------------------------------------- */
  {
    id: "it-business-technology",
    slug: { nl: "it-business-technology", en: "it-business-technology" },
    icon: "shield",
    accent: "navy",
    name: { nl: "ARA IT & Business Technology", en: "ARA IT & Business Technology" },
    shortName: { nl: "IT & Business Technology", en: "IT & Business Technology" },
    positioning: {
      nl: "Betrouwbaar technologieadvies en IT-oplossingen die moderne bedrijven ondersteunen.",
      en: "Reliable technology consulting and IT solutions that support modern businesses.",
    },
    summary: {
      nl: "IT-advies, cloud en infrastructuur, IT-ondersteuning en implementatiebegeleiding.",
      en: "IT consulting, cloud and infrastructure, IT support and implementation guidance.",
    },
    intro: {
      nl: "De juiste technologie kiezen, je zakelijke e-mail goed inrichten of snel hulp bij een technisch probleem: wij helpen je met heldere adviezen en praktische ondersteuning.",
      en: "Choosing the right technology, setting up your business email properly or getting quick help with a technical problem: we help with clear advice and practical support.",
    },
    highlights: {
      nl: ["IT-consultancy", "Cloud en zakelijke e-mail", "IT-ondersteuning op afstand"],
      en: ["IT consultancy", "Cloud and business email", "Remote IT support"],
    },
    services: [
      {
        id: "it-consultancy",
        icon: "sparkles",
        name: { nl: "IT-consultancy", en: "IT Consultancy" },
        description: {
          nl: "Onafhankelijk advies over de technologie die bij je onderneming past, nu en in de toekomst.",
          en: "Independent advice on the technology that fits your business, now and in the future.",
        },
        offerings: {
          nl: ["IT-strategie", "Technologiekeuze", "Advies over digitale transformatie", "Technologie-assessments voor bedrijven"],
          en: ["IT strategy", "Technology selection", "Digital transformation advice", "Business technology assessments"],
        },
        useCases: {
          nl: ["Een onderbouwde keuze voor nieuwe bedrijfssoftware", "Een routekaart voor digitalisering"],
          en: ["A well-founded choice of new business software", "A roadmap for digitalisation"],
        },
        benefits: {
          nl: ["Betere investeringsbeslissingen", "Duidelijke prioriteiten"],
          en: ["Better investment decisions", "Clear priorities"],
        },
      },
      {
        id: "cloud-infrastructure",
        icon: "network",
        name: { nl: "Cloud en infrastructuur", en: "Cloud & Infrastructure" },
        description: {
          nl: "We helpen je met clouddiensten, zakelijke e-mail, domeinen en hosting, en met de planning van je infrastructuur.",
          en: "We help you with cloud services, business email, domains and hosting, and with planning your infrastructure.",
        },
        offerings: {
          nl: [
            "Clouddiensten",
            "Ondersteuning bij cloudmigratie",
            "Configuratie van zakelijke e-mail",
            "Ondersteuning bij domein en hosting",
            "Infrastructuurplanning",
          ],
          en: ["Cloud services", "Cloud migration support", "Business email configuration", "Domain and hosting support", "Infrastructure planning"],
        },
        useCases: {
          nl: ["Overstappen naar Google Workspace of Microsoft 365", "Domein en e-mail correct instellen"],
          en: ["Moving to Google Workspace or Microsoft 365", "Setting up a domain and email correctly"],
        },
        benefits: {
          nl: ["Betrouwbare e-mail", "Overal toegang tot je bestanden"],
          en: ["Reliable email", "Access to your files anywhere"],
        },
      },
      {
        id: "it-support",
        icon: "headset",
        name: { nl: "IT-ondersteuning", en: "IT Support" },
        description: {
          nl: "Praktische hulp op afstand bij technische problemen, softwareconfiguratie en bedrijfssystemen.",
          en: "Practical remote help with technical problems, software configuration and business systems.",
        },
        offerings: {
          nl: ["IT-ondersteuning op afstand", "Technische probleemoplossing", "Softwareconfiguratie", "Ondersteuning van bedrijfssystemen"],
          en: ["Remote IT support", "Technical troubleshooting", "Software configuration", "Business system support"],
        },
        useCases: {
          nl: ["Hulp bij e-mailproblemen", "Software installeren en instellen"],
          en: ["Help with email problems", "Installing and configuring software"],
        },
        benefits: {
          nl: ["Snel weer aan het werk", "Vast aanspreekpunt"],
          en: ["Back to work quickly", "A fixed point of contact"],
        },
        more: { routeKey: "pricing", label: { nl: "Bekijk IT Support Basic", en: "View IT Support Basic" } },
      },
      {
        id: "business-technology",
        icon: "wrench",
        name: { nl: "Business Technology", en: "Business Technology" },
        description: {
          nl: "We begeleiden de implementatie van technologie en verbeteren bestaande systemen en digitale werkprocessen.",
          en: "We guide the implementation of technology and improve existing systems and digital workflows.",
        },
        offerings: {
          nl: ["Technologie-implementatie", "Softwareselectie", "Systeemoptimalisatie", "Verbetering van digitale werkprocessen"],
          en: ["Technology implementation", "Software selection", "System optimisation", "Digital workflow improvement"],
        },
        useCases: {
          nl: ["Nieuwe boekhoudsoftware invoeren", "Bestaande systemen beter laten samenwerken"],
          en: ["Introducing new accounting software", "Making existing systems work together better"],
        },
        benefits: {
          nl: ["Soepele ingebruikname", "Meer rendement uit je software"],
          en: ["Smooth roll-out", "More value from your software"],
        },
      },
    ],
    applications: {
      nl: [
        { title: "Nieuwe software kiezen", text: "Een onderbouwde vergelijking van opties op functionaliteit, kosten en ondersteuning." },
        { title: "Zakelijke e-mail", text: "Domein en e-mail professioneel en veilig ingericht." },
        { title: "Naar de cloud", text: "Bestanden en applicaties stap voor stap naar de cloud." },
        { title: "Hulp bij storingen", text: "Snelle diagnose en oplossing van technische problemen op afstand." },
      ],
      en: [
        { title: "Choosing new software", text: "A well-founded comparison of options on functionality, cost and support." },
        { title: "Business email", text: "Domain and email set up professionally and securely." },
        { title: "Moving to the cloud", text: "Files and applications moved to the cloud step by step." },
        { title: "Help with issues", text: "Quick remote diagnosis and resolution of technical problems." },
      ],
    },
    benefits: {
      nl: [
        { title: "Heldere adviezen", text: "Begrijpelijke uitleg en concrete aanbevelingen." },
        { title: "Minder storingen", text: "Goed ingerichte systemen werken betrouwbaarder." },
        { title: "Eén aanspreekpunt", text: "Wij coördineren, ook als externe partners betrokken zijn." },
      ],
      en: [
        { title: "Clear advice", text: "Understandable explanations and concrete recommendations." },
        { title: "Fewer issues", text: "Well-configured systems work more reliably." },
        { title: "One point of contact", text: "We coordinate, even when external partners are involved." },
      ],
    },
    process: {
      nl: [
        { title: "Inventarisatie", text: "We brengen je huidige systemen en wensen in kaart." },
        { title: "Advies", text: "We geven een helder advies met prioriteiten en kosten." },
        { title: "Implementatie", text: "We voeren uit of begeleiden de uitvoering." },
        { title: "Ondersteuning", text: "We blijven beschikbaar voor vragen en verbeteringen." },
      ],
      en: [
        { title: "Assessment", text: "We map your current systems and needs." },
        { title: "Advice", text: "We give clear advice with priorities and costs." },
        { title: "Implementation", text: "We carry out or guide the implementation." },
        { title: "Support", text: "We remain available for questions and improvements." },
      ],
    },
    note: {
      title: { nl: "Wat we zelf doen en wat via partners loopt", en: "What we do ourselves and what runs through partners" },
      text: {
        nl: "IT-advies, ondersteuning op afstand, softwareconfiguratie, de inrichting van zakelijke e-mail en domeinen en implementatiebegeleiding verzorgt ARA zelf. Hosting, cloudinfrastructuur, softwarelicenties, hardware en ondersteuning op locatie kunnen via externe technologiepartners lopen. Dat geven we vooraf duidelijk aan in de offerte.",
        en: "IT consulting, remote support, software configuration, business email and domain setup and implementation guidance are delivered by ARA directly. Hosting, cloud infrastructure, software licences, hardware and on-site support may be delivered through external technology partners. We state this clearly in the quote in advance.",
      },
    },
    faq: {
      nl: [
        {
          question: "Bieden jullie ondersteuning op locatie?",
          answer:
            "Onze standaardondersteuning is op afstand. Ondersteuning op locatie is in overleg mogelijk of kan via een partner lopen; dat spreken we vooraf af.",
        },
        {
          question: "Wat kost IT-ondersteuning?",
          answer:
            "ARA IT Support Basic kost $35 USD per maand voor maximaal één uur ondersteuning op afstand. Extra ondersteuning is $20 per uur, na jouw akkoord.",
        },
        {
          question: "Leveren jullie ook hardware en licenties?",
          answer:
            "We adviseren over hardware en licenties en kunnen de aanschaf via partners begeleiden. Deze kosten zijn niet inbegrepen in onze tarieven.",
        },
      ],
      en: [
        {
          question: "Do you offer on-site support?",
          answer: "Our standard support is remote. On-site support is possible by arrangement or may be delivered through a partner; we agree on this in advance.",
        },
        {
          question: "How much does IT support cost?",
          answer: "ARA IT Support Basic costs $35 USD per month for up to one hour of remote support. Additional support is $20 per hour, after your approval.",
        },
        {
          question: "Do you also supply hardware and licences?",
          answer: "We advise on hardware and licences and can guide the purchase through partners. These costs are not included in our rates.",
        },
      ],
    },
    cta: { nl: "Vraag IT-ondersteuning aan", en: "Request IT support" },
    seo: {
      nl: {
        title: "ARA IT & Business Technology — IT-advies, cloud en IT-ondersteuning in Suriname",
        description:
          "IT-consultancy, cloud en infrastructuur, zakelijke e-mail, IT-ondersteuning op afstand en implementatiebegeleiding voor bedrijven in Suriname.",
      },
      en: {
        title: "ARA IT & Business Technology — IT consulting, cloud and IT support in Suriname",
        description:
          "IT consultancy, cloud and infrastructure, business email, remote IT support and implementation guidance for businesses in Suriname.",
      },
    },
  },
];

/** Card/menu information for all four divisions, including the AI Academy. */
export type DivisionCard = {
  id: DivisionId;
  icon: IconName;
  accent: ServiceCategory["accent"];
  name: Localized;
  summary: Localized;
  highlights: Localized<string[]>;
};

export const academyDivision: DivisionCard = {
  id: "academy",
  icon: "sparkles",
  accent: "yellow",
  name: { nl: "ARA AI Academy", en: "ARA AI Academy" },
  summary: {
    nl: "Praktische AI-trainingen voor ondernemers, professionals, bedrijven en studenten.",
    en: "Practical AI training for entrepreneurs, professionals, businesses and students.",
  },
  highlights: {
    nl: ["Claude AI-training", "ChatGPT-training", "Bedrijfstrainingen"],
    en: ["Claude AI training", "ChatGPT training", "Corporate training"],
  },
};

const [aiSolutions, digitalSolutions, itBusiness] = serviceCategories as [ServiceCategory, ServiceCategory, ServiceCategory];

/** The four divisions in display order. */
export const divisions: DivisionCard[] = [aiSolutions, digitalSolutions, academyDivision, itBusiness];

/** General topic for the "book a consultation" call to action. */
export const CONSULTATION_TOPIC = "consultation";

export function getServiceCategoryBySlug(locale: Locale, slug: string): ServiceCategory | undefined {
  return serviceCategories.find((category) => category.slug[locale] === slug);
}

export function getServiceCategory(id: ServiceCategoryId): ServiceCategory {
  const category = serviceCategories.find((c) => c.id === id);
  if (!category) throw new Error(`Unknown service category: ${id}`);
  return category;
}

/** Flat list of all services, used for the contact form topic selector. */
export function getAllServices() {
  return serviceCategories.flatMap((category) => category.services.map((service) => ({ ...service, categoryId: category.id })));
}
