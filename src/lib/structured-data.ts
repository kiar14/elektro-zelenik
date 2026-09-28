import { company } from "@/content/company";
import { publishedServices } from "@/content/navigation";
import { site } from "@/content/site";

/**
 * schema.org description of the business for search engines, rendered as
 * JSON-LD on the homepage. Only verified facts from `company.ts` go in here:
 * opening hours, reviews and social profiles stay out until the client
 * confirms them (see `unverifiedCompanyData`).
 */
export function businessJsonLd() {
  const businessId = `${site.url}/#business`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Electrician",
        "@id": businessId,
        name: company.tradingName,
        legalName: company.legalName,
        url: site.url,
        logo: `${site.url}/brand/zelenik-logo-horizontal.png`,
        image: `${site.url}/brand/zelenik-symbol.png`,
        description: site.description,
        telephone: company.phone.e164,
        email: company.email.primary,
        foundingDate: String(company.foundedYear),
        vatID: company.registration.davcnaStevilka,
        address: {
          "@type": "PostalAddress",
          streetAddress: company.address.street,
          postalCode: company.address.postalCode,
          addressLocality: company.address.city,
          addressRegion: company.serviceArea.region,
          addressCountry: "SI",
        },
        areaServed: [
          company.serviceArea.municipality,
          company.serviceArea.administrativeUnit,
          company.serviceArea.region,
        ].map((name) => ({ "@type": "AdministrativeArea", name })),
        knowsAbout: publishedServices.map((service) => service.label),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: company.tradingName,
        inLanguage: site.language,
        publisher: { "@id": businessId },
      },
    ],
  };
}

/**
 * Serialise for a `<script type="application/ld+json">`. Escaping `<` keeps
 * any string from closing the script element early.
 */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
