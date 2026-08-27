/**
 * Reference projects.
 *
 * Every photograph here is the company's own. No generated or licensed service
 * imagery appears on the Reference page, and no caption describes work that is
 * not visible in the frame: nothing is inferred from a photograph. Where the
 * building is not documented, the title stays at the conservative category
 * name rather than being invented.
 *
 * TODO_CLIENT: the veterinary centre photograph carries an "Albin Bezjak
 * Photography" watermark. It is published on the company's own site, but
 * publication rights should be confirmed and a watermark-free original
 * requested before launch. Do not crop or retouch the watermark out.
 *
 * TODO_CLIENT: no location, year, scope or client name is documented for any of
 * these projects. Supply them and the captions can say more than the category.
 */

export interface ReferenceItem {
  src: string;
  alt: string;
  category: string;
  title: string;
  note?: string;
}

export const references: readonly ReferenceItem[] = [
  {
    src: "/images/reference/poslovni-objekt-veterinarski-center.jpg",
    alt: "Veterinarski center z osvetljeno okroglo fasado in urejenim parkiriščem ob mraku.",
    category: "Poslovni objekt",
    title: "Veterinarski center",
  },
  {
    src: "/images/reference/stanovanjski-objekt-fasada.jpg",
    alt: "Sodobna stanovanjska hiša ob mraku z osvetljenim napuščem in teraso.",
    category: "Stanovanjski objekt",
    title: "Stanovanjski objekt",
  },
  {
    src: "/images/reference/kmetijski-objekt-razsvetljava.jpg",
    alt: "Notranjost hleva z nameščeno rdečo razsvetljavo po celotni dolžini objekta.",
    category: "Kmetijski objekt",
    title: "Gospodarski objekt",
  },
  {
    src: "/images/reference/stanovanjski-objekt-razsvetljava.jpg",
    alt: "Kopalnica s stropno linijsko razsvetljavo in vgrajenimi svetili pred vhodom v savno.",
    category: "Stanovanjski objekt",
    title: "Notranja razsvetljava",
  },
  {
    src: "/images/reference/stanovanjski-objekt-zima.jpg",
    alt: "Sodobna dvonivojska stanovanjska hiša na pobočju pozimi, z dostopno potjo in garažo.",
    category: "Stanovanjski objekt",
    title: "Stanovanjski objekt",
  },
  {
    src: "/images/reference/elektricar-elektro-omarica.jpg",
    alt: "Elektroinštalater na lestvi vezuje odprto elektro omarico v objektu med gradnjo.",
    category: "Elektroinštalacije",
    title: "Elektro omarica",
  },
];

/** The three shown on the homepage, one of each kind. Order is deliberate. */
export const homeReferences = references.slice(0, 3);
