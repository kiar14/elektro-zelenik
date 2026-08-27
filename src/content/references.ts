/**
 * Reference projects.
 *
 * One real-world property is one project. That is the rule this file exists to
 * enforce: the page used to show three photographs of the same modern house as
 * three separate references, which made one job look like three and made the
 * whole page less trustworthy, not more. A project now owns its photographs and
 * shows them together as a gallery.
 *
 * Every photograph here is the company's own. No generated or licensed service
 * imagery appears on the Reference page, and no caption describes work that is
 * not visible in the frame: nothing is inferred from a photograph. Where the
 * building is not documented, the title stays at the conservative category name
 * rather than being invented. No year, town, capacity, client name, equipment
 * or brand appears anywhere on this page, because none of it is documented.
 *
 * The one piece of scope confirmed beyond what a frame shows is the dental
 * centre: the client has confirmed that those five photographs are interior
 * lighting work carried out by the company.
 *
 * TODO_CLIENT: the veterinary centre photograph carries an "Albin Bezjak
 * Photography" watermark. It is published on the company's own site, but
 * publication rights should be confirmed and a watermark-free original
 * requested before launch. Do not crop or retouch the watermark out.
 *
 * TODO_CLIENT: no location, year, scope or client name is documented for any
 * project other than the dental centre. Supply them and the captions can say
 * more than the category.
 */

/**
 * A photograph inside a project gallery.
 *
 * `span` is the number of the twelve grid columns the cell takes from `lg` up.
 * `aspect` belongs to the row, not the image, so every cell in a row resolves
 * to the same height and the row never comes out ragged. Spans are chosen so
 * that the resulting cell ratio is close to the photograph's own, which is what
 * keeps the crops honest: no portrait is squeezed into a landscape box.
 */
export interface GalleryImage {
  kind: "image";
  span: number;
  src: string;
  alt: string;
  /** Steers the crop where the subject is not centred. */
  position?: string;
  /** Ratio used below `lg`, where every cell is full width. */
  mobileAspect?: string;
}

/** A short factual line occupying the columns a row's photographs leave. */
export interface GalleryText {
  kind: "text";
  span: number;
  body: string;
}

export interface GalleryRow {
  /** Ratio of the whole row from `lg` up. */
  aspect: string;
  cells: readonly (GalleryImage | GalleryText)[];
}

export interface ReferenceProject {
  slug: string;
  category: string;
  title: string;
  /** Only where the scope is genuinely confirmed. */
  description?: string;
  rows: readonly GalleryRow[];
  /** The single frame used where the project is shown as one card. */
  cover: { src: string; alt: string };
}

const VETERINARY_ALT =
  "Veterinarski center z osvetljeno okroglo fasado in urejenim parkiriščem ob mraku.";
const HOUSE_WINTER_ALT =
  "Sodobna dvonivojska stanovanjska hiša na pobočju pozimi, z dovozom in garažo.";
const DENTAL_WAITING_ALT =
  "Čakalnica zobozdravstvenega centra z linijsko stropno razsvetljavo in osvetlitvijo pod klopjo.";

export const references: readonly ReferenceProject[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: "veterinarski-center",
    category: "Poslovni objekt",
    title: "Veterinarski center",
    cover: {
      src: "/images/reference/veterinarski-center.webp",
      alt: VETERINARY_ALT,
    },
    rows: [
      {
        aspect: "16/9",
        cells: [
          {
            kind: "image",
            span: 12,
            src: "/images/reference/veterinarski-center.webp",
            alt: VETERINARY_ALT,
            mobileAspect: "16/10",
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "stanovanjski-objekt",
    category: "Stanovanjski objekt",
    title: "Sodobna novogradnja",
    cover: {
      src: "/images/reference/stanovanjski-objekt-zima.webp",
      alt: HOUSE_WINTER_ALT,
    },
    rows: [
      {
        aspect: "9/4",
        cells: [
          {
            kind: "image",
            span: 8,
            src: "/images/reference/stanovanjski-objekt-zima.webp",
            alt: HOUSE_WINTER_ALT,
            position: "50% 42%",
            mobileAspect: "4/3",
          },
          {
            kind: "image",
            span: 4,
            src: "/images/reference/stanovanjski-objekt-fasada.webp",
            alt: "Fasada iste hiše ob mraku, z osvetljenim napuščem in stekleno ograjo terase.",
            mobileAspect: "3/4",
          },
        ],
      },
      {
        aspect: "9/4",
        cells: [
          {
            kind: "image",
            span: 4,
            src: "/images/reference/stanovanjski-objekt-kopalnica.webp",
            alt: "Kopalnica s stropno linijsko razsvetljavo in vgrajenimi svetili pred vhodom v savno.",
            mobileAspect: "3/4",
          },
          {
            kind: "text",
            span: 8,
            body: "Vse fotografije so z istega objekta: zunanjost, terasa in notranji prostori.",
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "zobozdravstveni-center",
    category: "Poslovni objekt",
    title: "Zobozdravstveni center",
    description: "Razsvetljava notranjih prostorov.",
    cover: {
      src: "/images/reference/zobozdravstveni-center/cakalnica.webp",
      alt: DENTAL_WAITING_ALT,
    },
    rows: [
      {
        aspect: "16/10",
        cells: [
          {
            kind: "image",
            span: 12,
            src: "/images/reference/zobozdravstveni-center/cakalnica.webp",
            alt: DENTAL_WAITING_ALT,
            position: "50% 42%",
            mobileAspect: "4/3",
          },
        ],
      },
      {
        aspect: "9/4",
        cells: [
          {
            kind: "image",
            span: 8,
            src: "/images/reference/zobozdravstveni-center/recepcija.webp",
            alt: "Recepcija zobozdravstvenega centra z barvno razsvetljavo v stenskih in stropnih linijah.",
            mobileAspect: "4/3",
          },
          {
            kind: "image",
            span: 4,
            src: "/images/reference/zobozdravstveni-center/cakalnica-igralni-kotcek.webp",
            alt: "Vhodni del čakalnice z leseno hišico in linijsko razsvetljavo v stropu.",
            mobileAspect: "3/4",
          },
        ],
      },
      {
        aspect: "9/4",
        cells: [
          {
            kind: "image",
            span: 4,
            src: "/images/reference/zobozdravstveni-center/sanitarije-umivalnika.webp",
            alt: "Sanitarni prostor z visečimi svetili nad umivalnikoma in vgrajenimi stropnimi svetili.",
            mobileAspect: "3/4",
          },
          {
            kind: "image",
            span: 4,
            src: "/images/reference/zobozdravstveni-center/sanitarije-police.webp",
            alt: "Sanitarni prostor z osvetljenimi nišnimi policami.",
            mobileAspect: "3/4",
          },
          {
            kind: "text",
            span: 4,
            body: "Linijska razsvetljava v stropu, barvna razsvetljava ob recepciji in vgrajena svetila v sanitarnih prostorih.",
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "kmetijski-objekt",
    category: "Kmetijski objekt",
    title: "Gospodarski objekt",
    cover: {
      src: "/images/reference/kmetijski-objekt-razsvetljava.webp",
      alt: "Notranjost hleva z nameščeno rdečo razsvetljavo po celotni dolžini objekta.",
    },
    rows: [
      {
        aspect: "9/5",
        cells: [
          {
            kind: "image",
            span: 5,
            src: "/images/reference/kmetijski-objekt-razsvetljava.webp",
            alt: "Notranjost hleva z nameščeno rdečo razsvetljavo po celotni dolžini objekta.",
            mobileAspect: "3/4",
          },
          {
            kind: "text",
            span: 7,
            body: "Razsvetljava, nameščena po celotni dolžini objekta.",
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "elektro-omarica",
    category: "Elektroinštalacije",
    title: "Elektro omarica",
    cover: {
      src: "/images/reference/elektro-omarica.webp",
      alt: "Elektroinštalater na lestvi vezuje odprto elektro omarico v objektu med gradnjo.",
    },
    rows: [
      {
        aspect: "9/5",
        cells: [
          {
            kind: "text",
            span: 7,
            body: "Vezava elektro omarice med izvedbo inštalacij v objektu v gradnji.",
          },
          {
            kind: "image",
            span: 5,
            src: "/images/reference/elektro-omarica.webp",
            alt: "Elektroinštalater na lestvi vezuje odprto elektro omarico v objektu med gradnjo.",
            mobileAspect: "3/4",
          },
        ],
      },
    ],
  },
];

/** The three shown as single cards on the homepage and on O podjetju. */
export const homeReferences = references.slice(0, 3);
