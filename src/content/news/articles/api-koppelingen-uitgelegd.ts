import type { Article } from "../../types";

const article: Article = {
  id: "news-api-explained",
  slug: "api-koppelingen-uitgelegd",
  category: "guides",
  author: { name: "ARA Redactie", role: { nl: "Redactie", en: "Editorial team" } },
  publishedAt: "2026-07-30",
  icon: "plug",
  accent: "cyan",
  isDemo: true,
  ctaService: "automation",
  translations: {
    nl: {
      title: "API-koppelingen uitgelegd voor niet-technici",
      excerpt:
        "Wat is een API, en waarom is het belangrijk bij het kiezen van software? Een heldere uitleg zonder vakjargon.",
      content: [
        {
          type: "paragraph",
          text: "Een API (Application Programming Interface) is een afgesproken manier waarop twee softwaresystemen met elkaar communiceren. U kunt het zien als een loket: het ene systeem stelt een vraag volgens vaste regels en het andere systeem geeft antwoord.",
        },
        { type: "heading", text: "Een voorbeeld uit de praktijk" },
        {
          type: "paragraph",
          text: "Stel dat een klant een bestelling plaatst in uw webshop. Via een API kan de webshop de bestelling automatisch doorgeven aan uw voorraadsysteem en aan uw boekhouding. Niemand hoeft gegevens over te typen.",
        },
        { type: "heading", text: "Waarom dit belangrijk is" },
        {
          type: "list",
          items: [
            "Minder dubbele invoer en dus minder fouten.",
            "Gegevens zijn in alle systemen actueel.",
            "U kunt later makkelijker systemen toevoegen of vervangen.",
          ],
        },
        { type: "heading", text: "Waar let u op bij het kiezen van software?" },
        {
          type: "paragraph",
          text: "Vraag leveranciers of hun software een gedocumenteerde API heeft, welke gegevens ermee kunnen worden uitgewisseld en of er extra kosten aan verbonden zijn. Software zonder goede API kan later een beperking worden.",
        },
        {
          type: "callout",
          title: "Veiligheid",
          text: "Een koppeling geeft systemen toegang tot elkaars gegevens. Zorg voor beveiligde verbindingen, beperkte rechten en het veilig bewaren van toegangssleutels.",
        },
      ],
    },
    en: {
      title: "API integrations explained for non-technical readers",
      excerpt:
        "What is an API, and why does it matter when choosing software? A clear explanation without jargon.",
      content: [
        {
          type: "paragraph",
          text: "An API (Application Programming Interface) is an agreed way for two software systems to communicate. Think of it as a service counter: one system asks a question according to fixed rules and the other system answers.",
        },
        { type: "heading", text: "A practical example" },
        {
          type: "paragraph",
          text: "Suppose a customer places an order in your webshop. Through an API, the webshop can automatically pass the order to your inventory system and your accounting. Nobody needs to retype data.",
        },
        { type: "heading", text: "Why it matters" },
        {
          type: "list",
          items: [
            "Less duplicate entry and therefore fewer errors.",
            "Data is up to date in all systems.",
            "You can more easily add or replace systems later.",
          ],
        },
        { type: "heading", text: "What to look for when choosing software" },
        {
          type: "paragraph",
          text: "Ask suppliers whether their software has a documented API, which data can be exchanged and whether there are extra costs. Software without a good API can become a limitation later.",
        },
        {
          type: "callout",
          title: "Security",
          text: "An integration gives systems access to each other's data. Ensure secure connections, limited permissions and safe storage of access keys.",
        },
      ],
    },
  },
};

export default article;
