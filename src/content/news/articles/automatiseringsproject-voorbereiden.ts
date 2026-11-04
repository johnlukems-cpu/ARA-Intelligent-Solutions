import type { Article } from "../../types";

/** Dutch-only article: demonstrates the missing-translation mechanism. */
const article: Article = {
  id: "news-prepare-automation",
  slug: "automatiseringsproject-voorbereiden",
  category: "guides",
  author: { name: "ARA Redactie", role: { nl: "Redactie", en: "Editorial team" } },
  publishedAt: "2026-07-16",
  icon: "kanban",
  accent: "blue",
  isDemo: true,
  ctaService: "ai-solutions",
  translations: {
    nl: {
      title: "Checklist: zo bereidt u een automatiseringsproject voor",
      excerpt:
        "Een goede voorbereiding bepaalt voor een groot deel het succes van een automatiseringsproject. Gebruik deze checklist voordat u begint.",
      content: [
        {
          type: "paragraph",
          text: "Automatiseringsprojecten lopen zelden vast op techniek. Veel vaker ontbreekt duidelijkheid over het proces, de doelen of de verantwoordelijkheden. Met deze checklist legt u een stevige basis.",
        },
        { type: "heading", text: "Proces" },
        {
          type: "list",
          items: [
            "Zijn alle stappen van het huidige proces beschreven?",
            "Weet u welke uitzonderingen regelmatig voorkomen?",
            "Is duidelijk welke systemen en documenten erbij betrokken zijn?",
          ],
        },
        { type: "heading", text: "Doelen" },
        {
          type: "list",
          items: [
            "Wat wilt u concreet verbeteren: tijd, fouten, overzicht of klanttevredenheid?",
            "Heeft u de huidige situatie gemeten?",
            "Wanneer noemt u het project geslaagd?",
          ],
        },
        { type: "heading", text: "Mensen" },
        {
          type: "list",
          items: [
            "Wie is eigenaar van het proces?",
            "Zijn de medewerkers die ermee werken betrokken bij het ontwerp?",
            "Is er tijd vrijgemaakt voor testen en training?",
          ],
        },
        { type: "heading", text: "Gegevens en beveiliging" },
        {
          type: "list",
          items: [
            "Welke gegevens worden verwerkt, en zitten daar persoonsgegevens bij?",
            "Wie mag welke gegevens zien en wijzigen?",
            "Hoe worden toegangsgegevens en koppelingen beveiligd?",
          ],
        },
        {
          type: "paragraph",
          text: "Kunt u de meeste vragen beantwoorden? Dan bent u klaar voor de volgende stap. Zo niet, dan is dat geen probleem: het beantwoorden van deze vragen is vaak de eerste fase van een goed project.",
        },
      ],
    },
  },
};

export default article;
