import type { Localized } from "@/i18n/config";

/**
 * LEGAL PAGES — DRAFTS
 *
 * ⚠️  These texts are drafts. They must be reviewed by a qualified legal
 * advisor and completed before publication. Placeholders are written in
 * [square brackets]. Do not claim legal compliance without verification.
 */

export type LegalSection = { heading: string; paragraphs?: string[]; list?: string[] };
export type LegalDocument = { title: string; description: string; intro: string; sections: LegalSection[] };
export type LegalPageKey = "privacy" | "terms" | "cookies";

export const legalLastUpdated = "2026-10-22";

export const legalPages: Record<LegalPageKey, Localized<LegalDocument>> = {
  privacy: {
    nl: {
      title: "Privacyverklaring",
      description: "Hoe ARA Intelligent Solutions omgaat met persoonsgegevens die via deze website worden verzameld.",
      intro:
        "In deze privacyverklaring leggen wij uit welke persoonsgegevens wij via deze website verwerken, waarom wij dat doen en welke rechten u heeft.",
      sections: [
        {
          heading: "1. Wie zijn wij?",
          paragraphs: [
            "Deze website wordt beheerd door [Volledige juridische naam], handelend onder de naam ARA Intelligent Solutions, gevestigd te [Adres], Suriname, ingeschreven bij de Kamer van Koophandel en Fabrieken onder nummer [KKF-nummer].",
            "Voor vragen over privacy kunt u contact opnemen via [e-mailadres voor privacyvragen].",
          ],
        },
        {
          heading: "2. Welke gegevens verwerken wij?",
          paragraphs: ["Wanneer u het contactformulier invult, verwerken wij de volgende gegevens:"],
          list: [
            "Naam",
            "Zakelijk e-mailadres",
            "Bedrijfsnaam (optioneel)",
            "Onderwerp, interessegebied en de inhoud van uw bericht",
            "Technische gegevens die nodig zijn om misbruik te voorkomen, zoals een tijdelijk verwerkt IP-adres",
          ],
        },
        {
          heading: "3. Waarom verwerken wij deze gegevens?",
          paragraphs: [
            "Wij gebruiken uw gegevens uitsluitend om op uw aanvraag te reageren en eventueel een vervolggesprek in te plannen. Wij gebruiken uw gegevens niet voor marketingdoeleinden zonder uw uitdrukkelijke toestemming.",
            "[Grondslag voor de verwerking te bevestigen, bijvoorbeeld toestemming of gerechtvaardigd belang, conform de toepasselijke wetgeving.]",
          ],
        },
        {
          heading: "4. Hoe lang bewaren wij uw gegevens?",
          paragraphs: ["Wij bewaren uw gegevens niet langer dan nodig. [Bewaartermijn te bepalen, bijvoorbeeld 12 maanden na het laatste contact.]"],
        },
        {
          heading: "5. Met wie delen wij uw gegevens?",
          paragraphs: [
            "Wij verkopen uw gegevens nooit aan derden. Voor de werking van de website en het afleveren van berichten kunnen wij gebruikmaken van dienstverleners (verwerkers), zoals:",
          ],
          list: [
            "[Hostingprovider van de website]",
            "[E-maildienst of automatiseringsplatform voor het afleveren van contactberichten]",
          ],
        },
        {
          heading: "6. Beveiliging",
          paragraphs: [
            "Wij nemen passende technische en organisatorische maatregelen om uw gegevens te beschermen, zoals versleutelde verbindingen (HTTPS) en beperkte toegang tot gegevens.",
          ],
        },
        {
          heading: "7. Uw rechten",
          paragraphs: [
            "U kunt ons verzoeken om inzage, correctie of verwijdering van uw persoonsgegevens. Neem hiervoor contact op via [e-mailadres voor privacyvragen].",
          ],
        },
        {
          heading: "8. Wijzigingen",
          paragraphs: ["Wij kunnen deze privacyverklaring aanpassen. De meest actuele versie staat altijd op deze pagina."],
        },
      ],
    },
    en: {
      title: "Privacy policy",
      description: "How ARA Intelligent Solutions handles personal data collected through this website.",
      intro:
        "In this privacy policy we explain which personal data we process through this website, why we do so and what rights you have.",
      sections: [
        {
          heading: "1. Who are we?",
          paragraphs: [
            "This website is operated by [Full legal name], trading as ARA Intelligent Solutions, located at [Address], Suriname, registered with the Chamber of Commerce and Industry (KKF) under number [KKF number].",
            "For privacy questions, please contact [privacy contact email address].",
          ],
        },
        {
          heading: "2. What data do we process?",
          paragraphs: ["When you complete the contact form, we process the following data:"],
          list: [
            "Name",
            "Business email address",
            "Company name (optional)",
            "Subject, area of interest and the content of your message",
            "Technical data needed to prevent abuse, such as a temporarily processed IP address",
          ],
        },
        {
          heading: "3. Why do we process this data?",
          paragraphs: [
            "We use your data solely to respond to your enquiry and, where appropriate, to schedule a follow-up conversation. We do not use your data for marketing purposes without your explicit consent.",
            "[Legal basis for processing to be confirmed, e.g. consent or legitimate interest, in accordance with applicable law.]",
          ],
        },
        {
          heading: "4. How long do we keep your data?",
          paragraphs: ["We do not keep your data longer than necessary. [Retention period to be determined, e.g. 12 months after the last contact.]"],
        },
        {
          heading: "5. Who do we share your data with?",
          paragraphs: [
            "We never sell your data to third parties. For the operation of the website and the delivery of messages, we may use service providers (processors), such as:",
          ],
          list: ["[Website hosting provider]", "[Email service or automation platform used to deliver contact messages]"],
        },
        {
          heading: "6. Security",
          paragraphs: [
            "We take appropriate technical and organizational measures to protect your data, such as encrypted connections (HTTPS) and restricted access to data.",
          ],
        },
        {
          heading: "7. Your rights",
          paragraphs: ["You may request access to, correction of or deletion of your personal data. Please contact [privacy contact email address]."],
        },
        {
          heading: "8. Changes",
          paragraphs: ["We may update this privacy policy. The most recent version is always available on this page."],
        },
      ],
    },
  },
  terms: {
    nl: {
      title: "Algemene voorwaarden",
      description: "Voorwaarden voor het gebruik van de website van ARA Intelligent Solutions.",
      intro:
        "Deze voorwaarden zijn van toepassing op het gebruik van deze website. Voor opdrachten en diensten gelden aanvullende afspraken die in een offerte of overeenkomst worden vastgelegd.",
      sections: [
        {
          heading: "1. Toepasselijkheid",
          paragraphs: [
            "Door deze website te gebruiken, gaat u akkoord met deze voorwaarden. [Verwijzing naar de algemene leveringsvoorwaarden voor opdrachten, indien van toepassing.]",
          ],
        },
        {
          heading: "2. Informatie op de website",
          paragraphs: [
            "Wij streven ernaar de informatie op deze website juist en actueel te houden. Toch kan de informatie onvolledig zijn of fouten bevatten. Aan de inhoud van deze website kunnen geen rechten worden ontleend.",
            "Producten die als ‘concept’, ‘in ontwikkeling’ of ‘binnenkort’ worden aangeduid, zijn nog niet beschikbaar. Beschrijvingen kunnen wijzigen.",
          ],
        },
        {
          heading: "3. Intellectueel eigendom",
          paragraphs: [
            "Alle inhoud op deze website, waaronder teksten, het logo, beeldmateriaal en ontwerp, is eigendom van [Volledige juridische naam] of haar licentiegevers en mag niet zonder toestemming worden gebruikt.",
          ],
        },
        {
          heading: "4. Aansprakelijkheid",
          paragraphs: ["[Aansprakelijkheidsbepaling op te stellen in overleg met een juridisch adviseur.]"],
        },
        {
          heading: "5. Links naar andere websites",
          paragraphs: ["Deze website kan links bevatten naar websites van derden. Wij zijn niet verantwoordelijk voor de inhoud van die websites."],
        },
        {
          heading: "6. Toepasselijk recht",
          paragraphs: ["[Toepasselijk recht en bevoegde rechter te bevestigen, bijvoorbeeld Surinaams recht.]"],
        },
      ],
    },
    en: {
      title: "Terms of use",
      description: "Terms for using the ARA Intelligent Solutions website.",
      intro:
        "These terms apply to the use of this website. Additional agreements apply to assignments and services and are set out in a quotation or contract.",
      sections: [
        {
          heading: "1. Applicability",
          paragraphs: ["By using this website, you agree to these terms. [Reference to general terms and conditions for assignments, if applicable.]"],
        },
        {
          heading: "2. Information on the website",
          paragraphs: [
            "We strive to keep the information on this website accurate and up to date. Nevertheless, the information may be incomplete or contain errors. No rights can be derived from the content of this website.",
            "Products labeled ‘concept’, ‘in development’ or ‘coming soon’ are not yet available. Descriptions may change.",
          ],
        },
        {
          heading: "3. Intellectual property",
          paragraphs: [
            "All content on this website, including texts, the logo, imagery and design, is owned by [Full legal name] or its licensors and may not be used without permission.",
          ],
        },
        {
          heading: "4. Liability",
          paragraphs: ["[Liability clause to be drafted in consultation with a legal advisor.]"],
        },
        {
          heading: "5. Links to other websites",
          paragraphs: ["This website may contain links to third-party websites. We are not responsible for the content of those websites."],
        },
        {
          heading: "6. Governing law",
          paragraphs: ["[Governing law and competent court to be confirmed, e.g. the laws of Suriname.]"],
        },
      ],
    },
  },
  cookies: {
    nl: {
      title: "Cookiebeleid",
      description: "Informatie over het gebruik van cookies en vergelijkbare technieken op deze website.",
      intro:
        "Cookies zijn kleine tekstbestanden die een website op uw apparaat kan opslaan. Op deze pagina leest u welke cookies deze website gebruikt.",
      sections: [
        {
          heading: "1. Welke cookies gebruiken wij?",
          paragraphs: [
            "Deze website plaatst momenteel geen tracking-, analyse- of advertentiecookies en gebruikt geen vergelijkbare technieken om uw surfgedrag te volgen.",
            "Omdat wij geen cookies plaatsen waarvoor toestemming nodig is, tonen wij geen cookiebanner.",
          ],
        },
        {
          heading: "2. Technische gegevens",
          paragraphs: [
            "Bij het bezoeken van de website kan onze hostingprovider technische gegevens verwerken, zoals uw IP-adres en het type browser, om de website veilig en beschikbaar te houden. [Hostingprovider en bewaartermijn van serverlogs te bevestigen.]",
          ],
        },
        {
          heading: "3. Wijzigingen",
          paragraphs: [
            "Als wij in de toekomst analyse- of andere niet-noodzakelijke cookies gaan gebruiken, passen wij dit beleid aan en vragen wij waar nodig vooraf uw toestemming.",
          ],
        },
      ],
    },
    en: {
      title: "Cookie policy",
      description: "Information about the use of cookies and similar technologies on this website.",
      intro: "Cookies are small text files that a website can store on your device. On this page you can read which cookies this website uses.",
      sections: [
        {
          heading: "1. Which cookies do we use?",
          paragraphs: [
            "This website currently does not place tracking, analytics or advertising cookies and does not use similar technologies to follow your browsing behavior.",
            "Because we do not place cookies that require consent, we do not show a cookie banner.",
          ],
        },
        {
          heading: "2. Technical data",
          paragraphs: [
            "When you visit the website, our hosting provider may process technical data such as your IP address and browser type to keep the website secure and available. [Hosting provider and server log retention period to be confirmed.]",
          ],
        },
        {
          heading: "3. Changes",
          paragraphs: [
            "If we start using analytics or other non-essential cookies in the future, we will update this policy and ask for your consent in advance where required.",
          ],
        },
      ],
    },
  },
};
