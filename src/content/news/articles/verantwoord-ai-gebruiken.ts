import type { Article } from "../../types";

const article: Article = {
  id: "news-responsible-ai",
  slug: "verantwoord-ai-gebruiken",
  category: "ai",
  author: { name: "ARA Redactie", role: { nl: "Redactie", en: "Editorial team" } },
  publishedAt: "2026-08-13",
  icon: "shield",
  accent: "navy",
  isDemo: true,
  ctaService: "ai-solutions",
  translations: {
    nl: {
      title: "Verantwoord AI gebruiken: zes afspraken voor uw team",
      excerpt:
        "Medewerkers gebruiken AI-tools vaak al, met of zonder beleid. Zes heldere afspraken helpen om dat veilig en verstandig te doen.",
      content: [
        {
          type: "paragraph",
          text: "Generatieve AI-tools zijn eenvoudig toegankelijk. Grote kans dat collega's ze al gebruiken om teksten te schrijven of informatie samen te vatten. Een verbod werkt zelden; duidelijke afspraken wel.",
        },
        { type: "heading", text: "Zes afspraken om mee te beginnen" },
        {
          type: "list",
          ordered: true,
          items: [
            "Voer geen vertrouwelijke of persoonsgegevens in bij tools die daar niet voor zijn goedgekeurd.",
            "Controleer feiten, cijfers en bronnen altijd zelf; AI kan overtuigend klinkende fouten maken.",
            "Wees open naar collega's en klanten wanneer AI een wezenlijke rol speelde in een resultaat.",
            "Gebruik AI niet als enige basis voor beslissingen over mensen, zoals sollicitanten of klanten.",
            "Leg vast welke tools zijn goedgekeurd en voor welke doeleinden.",
            "Benoem een aanspreekpunt voor vragen en twijfelgevallen.",
          ],
        },
        { type: "heading", text: "Maak het praktisch" },
        {
          type: "paragraph",
          text: "Houd de afspraken kort en concreet, en geef voorbeelden van wat wel en niet mag. Een richtlijn van één pagina die iedereen leest, is waardevoller dan een uitgebreid document dat niemand opent.",
        },
        {
          type: "quote",
          text: "Goede AI-afspraken beperken niet, ze geven medewerkers het vertrouwen om nieuwe tools verstandig te gebruiken.",
        },
        { type: "heading", text: "Evalueer regelmatig" },
        {
          type: "paragraph",
          text: "AI-tools veranderen snel. Plan daarom periodiek een moment om de afspraken te evalueren en bij te werken op basis van ervaringen uit de praktijk.",
        },
      ],
    },
    en: {
      title: "Using AI responsibly: six agreements for your team",
      excerpt:
        "Employees often already use AI tools, with or without a policy. Six clear agreements help them do so safely and sensibly.",
      content: [
        {
          type: "paragraph",
          text: "Generative AI tools are easily accessible. Chances are colleagues already use them to write texts or summarize information. A ban rarely works; clear agreements do.",
        },
        { type: "heading", text: "Six agreements to start with" },
        {
          type: "list",
          ordered: true,
          items: [
            "Don't enter confidential or personal data into tools not approved for that purpose.",
            "Always check facts, figures and sources yourself; AI can make convincing-sounding mistakes.",
            "Be open with colleagues and customers when AI played a substantial role in a result.",
            "Don't use AI as the sole basis for decisions about people, such as applicants or customers.",
            "Record which tools are approved and for which purposes.",
            "Appoint a point of contact for questions and doubtful cases.",
          ],
        },
        { type: "heading", text: "Make it practical" },
        {
          type: "paragraph",
          text: "Keep the agreements short and concrete, and give examples of what is and isn't allowed. A one-page guideline that everyone reads is more valuable than an extensive document nobody opens.",
        },
        {
          type: "quote",
          text: "Good AI agreements don't restrict; they give employees the confidence to use new tools wisely.",
        },
        { type: "heading", text: "Evaluate regularly" },
        {
          type: "paragraph",
          text: "AI tools change quickly. Schedule a regular moment to evaluate and update the agreements based on practical experience.",
        },
      ],
    },
  },
};

export default article;
