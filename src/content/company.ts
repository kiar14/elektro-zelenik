/**
 * Single source of truth for every piece of company data used on the site.
 * Nothing here may be duplicated inline in a component.
 *
 * Facts marked `unverifiedCompanyData` are NOT to be rendered until the client
 * has confirmed them. They are recorded here so the gap stays visible.
 */

export const company = {
  /** Registered legal name (Sodni register / AJPES). */
  legalName:
    "ZELENIK, družba za posredništvo, elektro in druge storitve, d.o.o.",
  /** Name used in all customer-facing copy. */
  tradingName: "Elektroinštalacije Zelenik",
  /** Short form for tight spaces. */
  shortName: "Zelenik",

  owner: "Jožef Zelenik",

  /** Business trading continuously since 2000; current d.o.o. incorporated 2023. */
  foundedYear: 2000,
  incorporatedYear: 2023,
  /** Always use this phrase rather than computing a number of years. */
  sinceLabel: "od leta 2000",

  address: {
    street: "Janežovski Vrh 49",
    postalCode: "2253",
    city: "Destrnik",
    country: "Slovenija",
    /** Single-line form. */
    full: "Janežovski Vrh 49, 2253 Destrnik, Slovenija",
  },

  phone: {
    /** Dialable form, always used for the href. */
    e164: "+38641731214",
    href: "tel:+38641731214",
    /** Display form, always used for visible text. */
    display: "041 731 214",
  },

  email: {
    primary: "info@elektro-zelenik.si",
    secondary: "elektro.zelenik@siol.net",
  },

  registration: {
    maticnaStevilka: "9424504000",
    davcnaStevilka: "SI64948048",
  },

  /**
   * Only what the registered seat actually documents: the municipality, the
   * administrative unit it belongs to, and the statistical region. A wider
   * town list is in `unverifiedCompanyData.serviceAreaTowns` until the client
   * says how far they actually travel.
   */
  serviceArea: {
    municipality: "Destrnik",
    administrativeUnit: "Ptuj",
    region: "Podravje",
  },
} as const;

/**
 * Data that exists somewhere (old website, Google Business Profile, registry)
 * but is contradictory or unconfirmed. Do not render any of this.
 */
export const unverifiedCompanyData = {
  openingHours: {
    reason:
      "Odpiralni čas na obstoječi spletni strani in na Google Business Profile se razlikujeta. Ne prikazuj, dokler stranka ne potrdi.",
  },
  googleBusinessProfile: {
    reason:
      "Profil je registriran na s.p. ime, ne na d.o.o. Ocene se lahko prikažejo šele po uskladitvi.",
  },
  socialProfiles: {
    reason:
      "Ni potrjenih URL-jev za Google in Facebook. V nogo se dodajo šele, ko stranka posreduje prave povezave, praznega ali onemogočenega gumba ne objavljamo.",
  },
  serviceAreaTowns: {
    candidates: [
      "Ptuj",
      "Ormož",
      "Lenart",
      "Slovenska Bistrica",
      "Gornja Radgona",
    ],
    reason:
      "Sosednji kraji, a nikjer ni potrjeno, kako daleč podjetje dejansko hodi. Do potrditve pišemo le o Destrniku, Ptuju in širšem Podravju.",
  },
} as const;
