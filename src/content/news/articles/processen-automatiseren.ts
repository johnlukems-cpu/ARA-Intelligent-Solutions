import type { Article } from "../../types";

const article: Article = {
  id: "news-automation-five",
  slug: "vijf-processen-om-te-automatiseren",
  category: "automation",
  author: { name: "ARA Redactie", role: { nl: "Redactie", en: "Editorial team" } },
  publishedAt: "2026-09-24",
  icon: "workflow",
  accent: "blue",
  isDemo: true,
  ctaService: "ai-solutions",
  translations: {
    nl: {
      title: "Vijf processen die bijna elke organisatie kan automatiseren",
      excerpt:
        "Automatisering hoeft niet groot en ingewikkeld te zijn. Deze vijf processen zijn in veel organisaties een logisch startpunt.",
      content: [
        {
          type: "paragraph",
          text: "Bij automatisering denken veel mensen aan grote, dure systemen. In de praktijk zit de meeste winst vaak in kleine, terugkerende taken. Hieronder vijf processen die in bijna elke organisatie voorkomen en zich goed lenen voor automatisering.",
        },
        { type: "heading", text: "1. Verwerking van webformulieren" },
        {
          type: "paragraph",
          text: "Aanvragen via de website worden vaak handmatig overgenomen in een spreadsheet of CRM. Met een eenvoudige koppeling komen gegevens direct op de juiste plek en krijgt de juiste collega automatisch een melding.",
        },
        { type: "heading", text: "2. Facturen en betalingsherinneringen" },
        {
          type: "paragraph",
          text: "Het opstellen van terugkerende facturen en het versturen van herinneringen volgt vaste regels. Dat maakt het een ideale kandidaat om te automatiseren, met een controlemoment voordat iets wordt verstuurd.",
        },
        { type: "heading", text: "3. Interne goedkeuringen" },
        {
          type: "paragraph",
          text: "Inkoopaanvragen, verlof of declaraties gaan vaak via e-mail heen en weer. Een digitale goedkeuringsflow zorgt voor een vaste route, een duidelijk overzicht en een spoor van wie wat heeft goedgekeurd.",
        },
        { type: "heading", text: "4. Periodieke rapportages" },
        {
          type: "paragraph",
          text: "Elke maand dezelfde cijfers verzamelen, kopiëren en opmaken kost uren. Een automatisch gegenereerd rapport bespaart die tijd en vermindert de kans op fouten.",
        },
        { type: "heading", text: "5. Klantcommunicatie bij vaste momenten" },
        {
          type: "paragraph",
          text: "Bevestigingen, herinneringen voor afspraken en welkomstberichten kunnen automatisch worden verstuurd, zodat klanten tijdig worden geïnformeerd.",
        },
        {
          type: "callout",
          title: "Tip",
          text: "Automatiseer een proces pas als het duidelijk is. Een rommelig proces automatiseren levert vooral sneller rommel op. Breng daarom eerst de stappen in kaart.",
        },
      ],
    },
    en: {
      title: "Five processes almost every organization can automate",
      excerpt:
        "Automation doesn't have to be big and complicated. These five processes are a logical starting point for many organizations.",
      content: [
        {
          type: "paragraph",
          text: "When people think of automation, they often picture large, expensive systems. In practice, most gains are found in small, recurring tasks. Here are five processes found in almost every organization that lend themselves well to automation.",
        },
        { type: "heading", text: "1. Processing web forms" },
        {
          type: "paragraph",
          text: "Requests via the website are often manually copied into a spreadsheet or CRM. With a simple integration, data lands directly in the right place and the right colleague is notified automatically.",
        },
        { type: "heading", text: "2. Invoices and payment reminders" },
        {
          type: "paragraph",
          text: "Creating recurring invoices and sending reminders follows fixed rules. That makes it an ideal candidate for automation, with a review step before anything is sent.",
        },
        { type: "heading", text: "3. Internal approvals" },
        {
          type: "paragraph",
          text: "Purchase requests, leave or expense claims often bounce around via email. A digital approval flow provides a fixed route, a clear overview and a record of who approved what.",
        },
        { type: "heading", text: "4. Periodic reports" },
        {
          type: "paragraph",
          text: "Collecting, copying and formatting the same figures every month takes hours. An automatically generated report saves that time and reduces the chance of errors.",
        },
        { type: "heading", text: "5. Customer communication at fixed moments" },
        {
          type: "paragraph",
          text: "Confirmations, appointment reminders and welcome messages can be sent automatically, so customers are informed on time.",
        },
        {
          type: "callout",
          title: "Tip",
          text: "Only automate a process once it is clear. Automating a messy process mostly produces mess faster. Map out the steps first.",
        },
      ],
    },
  },
};

export default article;
