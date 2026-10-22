import type { Locale } from "@/i18n/config";
import type { ServiceCategory } from "./types";

export const serviceCategories: ServiceCategory[] = [
  {
    id: "ai",
    slug: { nl: "ai-oplossingen", en: "ai-solutions" },
    icon: "brain",
    accent: "cyan",
    name: { nl: "AI-oplossingen", en: "AI Solutions" },
    shortName: { nl: "AI", en: "AI" },
    summary: {
      nl: "Benut de kracht van kunstmatige intelligentie om slimmer en sneller te werken.",
      en: "Leverage the power of artificial intelligence to work smarter and faster.",
    },
    intro: {
      nl: "AI kan veel opleveren, maar alleen als het een concreet probleem oplost. Wij helpen u kansen te herkennen, de juiste toepassing te kiezen en die verantwoord in te bouwen in uw dagelijkse werk.",
      en: "AI can deliver a lot, but only when it solves a concrete problem. We help you recognize opportunities, choose the right use case and embed it responsibly in your daily work.",
    },
    seo: {
      nl: {
        title: "AI-oplossingen in Suriname — advies en implementatie",
        description:
          "AI-advies, AI-assistenten en kennissystemen voor organisaties in Suriname en daarbuiten. Praktisch, verantwoord en afgestemd op uw processen.",
      },
      en: {
        title: "AI solutions in Suriname — consulting and implementation",
        description:
          "AI consulting, AI assistants and knowledge systems for organizations in Suriname and beyond. Practical, responsible and tailored to your processes.",
      },
    },
    services: [
      {
        id: "ai-consulting",
        icon: "sparkles",
        name: { nl: "AI-advies en implementatie", en: "AI consulting and implementation" },
        description: {
          nl: "We onderzoeken waar AI in uw organisatie aantoonbaar waarde toevoegt, maken een realistisch plan en begeleiden de implementatie — van proof of concept tot ingebruikname.",
          en: "We explore where AI adds demonstrable value in your organization, create a realistic plan and guide the implementation — from proof of concept to adoption.",
        },
        problem: {
          nl: "Veel organisaties willen ‘iets met AI’, maar weten niet waar te beginnen, welke risico's er zijn of wat het echt oplevert.",
          en: "Many organizations want to ‘do something with AI’ but don't know where to start, what the risks are or what it actually delivers.",
        },
        examples: {
          nl: [
            "AI-kansenscan van uw belangrijkste processen",
            "Proof of concept voor tekst- of documentanalyse",
            "Richtlijnen voor verantwoord AI-gebruik door medewerkers",
          ],
          en: [
            "AI opportunity scan of your key processes",
            "Proof of concept for text or document analysis",
            "Guidelines for responsible AI use by employees",
          ],
        },
      },
      {
        id: "ai-assistants",
        icon: "bot",
        name: { nl: "AI-assistenten en kennissystemen", en: "AI assistants and knowledge systems" },
        description: {
          nl: "We bouwen assistenten die vragen beantwoorden op basis van uw eigen documenten, procedures en kennis — met bronvermelding en duidelijke grenzen.",
          en: "We build assistants that answer questions based on your own documents, procedures and knowledge — with source references and clear boundaries.",
        },
        problem: {
          nl: "Kennis zit verspreid over mappen, e-mails en hoofden van collega's. Medewerkers en klanten verliezen tijd met zoeken en herhaalde vragen.",
          en: "Knowledge is scattered across folders, emails and colleagues' heads. Employees and customers lose time searching and asking the same questions.",
        },
        examples: {
          nl: [
            "Interne kennisassistent voor beleid en procedures",
            "Klantenservice-assistent voor veelgestelde vragen",
            "Zoeken in grote documentcollecties in gewone taal",
          ],
          en: [
            "Internal knowledge assistant for policies and procedures",
            "Customer service assistant for frequently asked questions",
            "Searching large document collections in plain language",
          ],
        },
      },
    ],
  },
  {
    id: "automation",
    slug: { nl: "bedrijfsautomatisering", en: "business-automation" },
    icon: "workflow",
    accent: "blue",
    name: { nl: "Bedrijfsautomatisering", en: "Business Automation" },
    shortName: { nl: "Automatisering", en: "Automation" },
    summary: {
      nl: "Automatiseer processen en bespaar tijd, kosten en middelen.",
      en: "Automate processes and save time, costs and resources.",
    },
    intro: {
      nl: "Repetitief handwerk kost tijd en leidt tot fouten. Wij analyseren uw processen, ontwerpen slimme workflows en verbinden uw systemen, zodat informatie automatisch op de juiste plek komt.",
      en: "Repetitive manual work costs time and leads to errors. We analyze your processes, design smart workflows and connect your systems, so information automatically ends up in the right place.",
    },
    seo: {
      nl: {
        title: "Bedrijfsautomatisering in Suriname — workflows en integraties",
        description:
          "Procesautomatisering, workflowontwerp en API-koppelingen voor organisaties in Suriname. Minder handwerk, minder fouten en meer overzicht.",
      },
      en: {
        title: "Business automation in Suriname — workflows and integrations",
        description:
          "Process automation, workflow design and API integrations for organizations in Suriname. Less manual work, fewer errors and more oversight.",
      },
    },
    services: [
      {
        id: "process-automation",
        icon: "workflow",
        name: { nl: "Bedrijfsprocesautomatisering", en: "Business process automation" },
        description: {
          nl: "We automatiseren terugkerende taken zoals gegevensinvoer, documentverwerking, notificaties en rapportages, met aandacht voor uitzonderingen en controle.",
          en: "We automate recurring tasks such as data entry, document processing, notifications and reports, with attention to exceptions and control.",
        },
        problem: {
          nl: "Medewerkers besteden uren aan overtypen, kopiëren en nabellen. Dat is foutgevoelig en houdt mensen af van waardevoller werk.",
          en: "Employees spend hours retyping, copying and chasing. That is error-prone and keeps people from more valuable work.",
        },
        examples: {
          nl: [
            "Automatische verwerking van inkomende formulieren en e-mails",
            "Periodieke rapportages die zichzelf samenstellen",
            "Herinneringen en opvolging zonder handmatige lijsten",
          ],
          en: [
            "Automatic processing of incoming forms and emails",
            "Periodic reports that compile themselves",
            "Reminders and follow-ups without manual lists",
          ],
        },
      },
      {
        id: "workflow-design",
        icon: "network",
        name: { nl: "Workflowontwerp en -implementatie", en: "Workflow design and implementation" },
        description: {
          nl: "We brengen uw huidige werkwijze in kaart, ontwerpen een duidelijke workflow met rollen en goedkeuringen en implementeren die in passende tools.",
          en: "We map your current way of working, design a clear workflow with roles and approvals and implement it in suitable tools.",
        },
        problem: {
          nl: "Onduidelijke stappen, ontbrekende overdrachten en ‘wie heeft dit nu?’ leiden tot vertraging en frustratie.",
          en: "Unclear steps, missing handovers and ‘who has this now?’ lead to delays and frustration.",
        },
        examples: {
          nl: [
            "Goedkeuringsflows voor inkoop of verlof",
            "Onboardingproces voor nieuwe klanten of medewerkers",
            "Statusoverzicht van aanvragen voor het hele team",
          ],
          en: [
            "Approval flows for purchasing or leave",
            "Onboarding process for new clients or employees",
            "Status overview of requests for the whole team",
          ],
        },
      },
      {
        id: "api-integrations",
        icon: "plug",
        name: { nl: "API-koppelingen", en: "API integrations" },
        description: {
          nl: "We verbinden applicaties via API's, zodat gegevens betrouwbaar en veilig tussen systemen stromen — zonder dubbele invoer.",
          en: "We connect applications through APIs so data flows reliably and securely between systems — without duplicate entry.",
        },
        problem: {
          nl: "Systemen die niet met elkaar praten zorgen voor dubbel werk, inconsistente gegevens en gebrek aan overzicht.",
          en: "Systems that don't talk to each other cause duplicate work, inconsistent data and a lack of oversight.",
        },
        examples: {
          nl: [
            "Webshop koppelen aan boekhouding of voorraadbeheer",
            "CRM synchroniseren met e-mail en agenda",
            "Gegevens uitwisselen met externe partners",
          ],
          en: [
            "Connecting a webshop to accounting or inventory",
            "Synchronizing a CRM with email and calendar",
            "Exchanging data with external partners",
          ],
        },
      },
    ],
  },
  {
    id: "software",
    slug: { nl: "softwareontwikkeling", en: "software-development" },
    icon: "code",
    accent: "navy",
    name: { nl: "Softwareontwikkeling", en: "Software Development" },
    shortName: { nl: "Software", en: "Software" },
    summary: {
      nl: "Software op maat die meegroeit met uw organisatie.",
      en: "Custom software solutions that grow with your business.",
    },
    intro: {
      nl: "Wanneer standaardsoftware niet past, bouwen wij oplossingen op maat. Modern, veilig, goed gedocumenteerd en ontworpen om mee te groeien.",
      en: "When off-the-shelf software doesn't fit, we build custom solutions. Modern, secure, well documented and designed to grow with you.",
    },
    seo: {
      nl: {
        title: "Softwareontwikkeling in Suriname — maatwerk en webapplicaties",
        description:
          "Maatwerksoftware, webapplicaties en systeemintegratie voor organisaties in Suriname en internationaal. Modern, veilig en schaalbaar.",
      },
      en: {
        title: "Software development in Suriname — custom software and web apps",
        description:
          "Custom software, web applications and system integration for organizations in Suriname and internationally. Modern, secure and scalable.",
      },
    },
    services: [
      {
        id: "custom-software",
        icon: "code",
        name: { nl: "Maatwerksoftware", en: "Custom software development" },
        description: {
          nl: "We ontwikkelen software die precies aansluit op uw processen, van eerste ontwerp tot livegang, in korte iteraties met regelmatige demo's.",
          en: "We develop software that fits your processes precisely, from first design to go-live, in short iterations with regular demos.",
        },
        problem: {
          nl: "Spreadsheets en standaardpakketten schieten tekort: processen worden eromheen gebouwd in plaats van andersom.",
          en: "Spreadsheets and standard packages fall short: processes get built around them instead of the other way around.",
        },
        examples: {
          nl: [
            "Registratie- en beheersystemen voor specifieke processen",
            "Klant- of partnerportalen",
            "Interne tools die spreadsheets vervangen",
          ],
          en: [
            "Registration and management systems for specific processes",
            "Customer or partner portals",
            "Internal tools that replace spreadsheets",
          ],
        },
      },
      {
        id: "web-applications",
        icon: "app",
        name: { nl: "Webapplicaties", en: "Web application development" },
        description: {
          nl: "We bouwen snelle, toegankelijke webapplicaties die op elk apparaat werken — zonder installatie en eenvoudig te onderhouden.",
          en: "We build fast, accessible web applications that work on any device — no installation required and easy to maintain.",
        },
        problem: {
          nl: "Medewerkers en klanten verwachten overal toegang, op telefoon en laptop. Verouderde systemen bieden dat niet.",
          en: "Employees and customers expect access anywhere, on phone and laptop. Outdated systems don't provide that.",
        },
        examples: {
          nl: [
            "Online boekings- en reserveringssystemen",
            "Dashboards met actuele bedrijfsinformatie",
            "Self-service omgevingen voor klanten",
          ],
          en: [
            "Online booking and reservation systems",
            "Dashboards with up-to-date business information",
            "Self-service environments for customers",
          ],
        },
      },
      {
        id: "system-integration",
        icon: "network",
        name: { nl: "Systeemintegratie", en: "System integration" },
        description: {
          nl: "We zorgen dat bestaande en nieuwe systemen samen één geheel vormen, met heldere gegevensstromen en goed beheerde toegang.",
          en: "We make existing and new systems work as one, with clear data flows and well-managed access.",
        },
        problem: {
          nl: "Een lappendeken van losse systemen maakt rapportage lastig en verhoogt risico's rond gegevenskwaliteit en beveiliging.",
          en: "A patchwork of separate systems makes reporting difficult and increases risks around data quality and security.",
        },
        examples: {
          nl: [
            "Centrale gegevensbron voor rapportages",
            "Single sign-on voor interne applicaties",
            "Migratie van oude naar nieuwe systemen",
          ],
          en: [
            "A central data source for reporting",
            "Single sign-on for internal applications",
            "Migration from legacy to new systems",
          ],
        },
      },
    ],
  },
  {
    id: "digital",
    slug: { nl: "web-en-digitaal", en: "web-and-digital" },
    icon: "globe",
    accent: "yellow",
    name: { nl: "Web & digitale oplossingen", en: "Web & Digital Solutions" },
    shortName: { nl: "Digitaal", en: "Digital" },
    summary: {
      nl: "Versterk uw digitale aanwezigheid en bereik nieuwe markten.",
      en: "Strengthen your digital presence and reach new markets.",
    },
    intro: {
      nl: "Uw website en digitale kanalen zijn vaak het eerste contact met klanten. Wij bouwen professionele websites en webshops en begeleiden de bredere digitale transformatie van uw organisatie.",
      en: "Your website and digital channels are often the first contact with customers. We build professional websites and webshops and guide the broader digital transformation of your organization.",
    },
    seo: {
      nl: {
        title: "Webontwikkeling in Suriname — websites, webshops en digitale transformatie",
        description:
          "Professionele websites, webshops, digitale transformatie en technisch onderhoud voor organisaties in Suriname en daarbuiten.",
      },
      en: {
        title: "Web development in Suriname — websites, webshops and digital transformation",
        description:
          "Professional websites, webshops, digital transformation and technical maintenance for organizations in Suriname and beyond.",
      },
    },
    services: [
      {
        id: "websites-webshops",
        icon: "globe",
        name: { nl: "Websites en webshops", en: "Website and webshop development" },
        description: {
          nl: "We ontwikkelen snelle, vindbare en toegankelijke websites en webshops, die u zelf eenvoudig kunt bijhouden.",
          en: "We develop fast, discoverable and accessible websites and webshops that you can easily maintain yourself.",
        },
        problem: {
          nl: "Een verouderde of trage website kost vertrouwen en klanten, en is lastig te vinden in zoekmachines.",
          en: "An outdated or slow website costs trust and customers, and is hard to find in search engines.",
        },
        examples: {
          nl: [
            "Tweetalige bedrijfswebsite",
            "Webshop met koppeling aan voorraad en betalingen",
            "Landingspagina's voor campagnes",
          ],
          en: [
            "Bilingual corporate website",
            "Webshop connected to inventory and payments",
            "Landing pages for campaigns",
          ],
        },
      },
      {
        id: "digital-transformation",
        icon: "transform",
        name: { nl: "Digitale transformatie", en: "Digital transformation" },
        description: {
          nl: "We helpen u stap voor stap van papier en losse bestanden naar digitale processen, met aandacht voor mensen, prioriteiten en haalbaarheid.",
          en: "We help you move step by step from paper and scattered files to digital processes, with attention to people, priorities and feasibility.",
        },
        problem: {
          nl: "Digitaliseren voelt groot en onoverzichtelijk. Zonder plan worden losse tools gekocht die niet op elkaar aansluiten.",
          en: "Digitalization feels big and overwhelming. Without a plan, separate tools get bought that don't fit together.",
        },
        examples: {
          nl: [
            "Digitale routekaart met prioriteiten en quick wins",
            "Selectie en inrichting van standaardsoftware",
            "Training en begeleiding van medewerkers",
          ],
          en: [
            "Digital roadmap with priorities and quick wins",
            "Selection and setup of standard software",
            "Training and support for employees",
          ],
        },
      },
      {
        id: "maintenance-support",
        icon: "wrench",
        name: { nl: "Technisch onderhoud en support", en: "Technical maintenance and support" },
        description: {
          nl: "We houden uw applicaties en websites veilig, actueel en beschikbaar, met afspraken over updates, monitoring en ondersteuning.",
          en: "We keep your applications and websites secure, up to date and available, with clear agreements on updates, monitoring and support.",
        },
        problem: {
          nl: "Software die niet wordt onderhouden veroudert, wordt kwetsbaar en valt uit op het slechtst mogelijke moment.",
          en: "Software that isn't maintained ages, becomes vulnerable and fails at the worst possible moment.",
        },
        examples: {
          nl: [
            "Periodieke beveiligingsupdates",
            "Monitoring van beschikbaarheid en prestaties",
            "Doorontwikkeling op basis van gebruikersfeedback",
          ],
          en: [
            "Periodic security updates",
            "Availability and performance monitoring",
            "Continuous improvement based on user feedback",
          ],
        },
      },
    ],
  },
];

export function getServiceCategoryBySlug(locale: Locale, slug: string): ServiceCategory | undefined {
  return serviceCategories.find((category) => category.slug[locale] === slug);
}

export function getServiceCategory(id: ServiceCategory["id"]): ServiceCategory {
  const category = serviceCategories.find((c) => c.id === id);
  if (!category) throw new Error(`Unknown service category: ${id}`);
  return category;
}

/** Flat list of all services, used for the contact form topic selector. */
export function getAllServices() {
  return serviceCategories.flatMap((category) =>
    category.services.map((service) => ({ ...service, categoryId: category.id })),
  );
}
