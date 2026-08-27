import { company } from "@/content/company";
import { absoluteUrl, OG_DEFAULT, SITE_URL } from "@/lib/seo";

/**
 * LocalBusiness structured data.
 *
 * Every field below is verifiable: the legal name, the registered address, the
 * phone number and the two registration numbers come from the register, and the
 * founding year is the one the site states everywhere else.
 *
 * What is deliberately absent matters more than what is here.
 *
 *   aggregateRating   The Google profile shows 5.0 from six reviews, but it is
 *                     registered to the s.p. rather than to this d.o.o. Marking
 *                     up a rating the business cannot claim is exactly the kind
 *                     of thing that earns a manual action, so it stays out
 *                     until the client confirms the profile is theirs.
 *   openingHours      The existing website and the Google profile disagree.
 *                     Publishing either as machine-readable fact would be a
 *                     guess about when somebody can be reached.
 *   sameAs            No social URLs have been confirmed.
 *   priceRange        Not documented anywhere, and a made-up band is worse than
 *                     no band.
 *
 * `@id` is stable so the same entity is recognised across pages rather than
 * being read as a new business on each one.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": `${SITE_URL}/#business`,
    name: company.tradingName,
    legalName: company.legalName,
    url: absoluteUrl("/"),
    image: absoluteUrl(OG_DEFAULT.url),
    logo: absoluteUrl("/icon.png"),
    telephone: company.phone.e164,
    email: company.email.primary,
    foundingDate: String(company.foundedYear),
    vatID: company.registration.davcnaStevilka,
    taxID: company.registration.davcnaStevilka,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressCountry: "SI",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: company.serviceArea.municipality },
      {
        "@type": "AdministrativeArea",
        name: `Upravna enota ${company.serviceArea.administrativeUnit}`,
      },
      { "@type": "AdministrativeArea", name: company.serviceArea.region },
    ],
    knowsLanguage: "sl",
  };

  return (
    <script
      type="application/ld+json"
      // The object is built here from typed constants, so there is no untrusted
      // input in it and nothing to escape beyond the closing-tag sequence.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
