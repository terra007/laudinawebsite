import { about, focusAreas, locations, practice, pricing } from "@/lib/site";

/** Suchmaschinen-Texte der Startseite. Titel bis etwa 60, Beschreibung bis etwa 155 Zeichen. */
export const seo = {
  title: "Psychotherapie & Hypnose in Wien 1010 | Mag. Laudina Pongrácz",
  description:
    "Psychotherapeutin in Wien 1010 und Eggendorf im Thale: Hypnosepsychotherapie, Traumatherapie, Paartherapie, Krisenintervention. Erstgespräch: +43 676 56 23 337.",
  siteName: "Psychotherapie Laudina Pongrácz",
};

const region: Record<string, string> = { wien: "Wien", eggendorf: "Niederösterreich" };

/**
 * Strukturierte Daten (schema.org) für Google und andere Suchmaschinen:
 * die Therapeutin, beide Praxisstandorte und die Website.
 */
export function structuredData(portrait: string | null) {
  const person = `${practice.url}/#laudina-pongracz`;
  const website = `${practice.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": website,
        url: practice.url,
        name: seo.siteName,
        inLanguage: "de-AT",
        publisher: { "@id": person },
      },
      {
        "@type": "Person",
        "@id": person,
        name: "Laudina Pongrácz",
        honorificPrefix: "Mag. phil.",
        jobTitle: practice.role,
        description: practice.methods.join(", "),
        url: practice.url,
        telephone: practice.phone,
        email: practice.email,
        ...(portrait ? { image: `${practice.url}${portrait}` } : {}),
        knowsAbout: focusAreas.map((area) => area.title),
        memberOf: about.memberships.map((name) => ({ "@type": "Organization", name })),
        workLocation: locations.map((location) => ({ "@id": `${practice.url}/#praxis-${location.id}` })),
      },
      ...locations.map((location) => ({
        "@type": "MedicalBusiness",
        "@id": `${practice.url}/#praxis-${location.id}`,
        name: `Psychotherapeutische Praxis ${practice.name}, ${location.place}`,
        url: practice.url,
        telephone: practice.phone,
        email: practice.email,
        ...(portrait ? { image: `${practice.url}${portrait}` } : {}),
        founder: { "@id": person },
        currenciesAccepted: "EUR",
        priceRange: "€ 130–260",
        address: {
          "@type": "PostalAddress",
          streetAddress: location.lines[0],
          postalCode: location.lines[1].slice(0, 4),
          addressLocality: location.lines[1].slice(5),
          addressRegion: region[location.id],
          addressCountry: "AT",
        },
        areaServed: region[location.id],
        makesOffer: pricing.map((offer) => ({
          "@type": "Offer",
          name: offer.title,
          description: `${offer.duration} pro Einheit`,
          price: offer.price.replace(/[^\d]/g, ""),
          priceCurrency: "EUR",
        })),
      })),
    ],
  };
}
