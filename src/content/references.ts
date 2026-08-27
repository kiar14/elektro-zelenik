/**
 * Reference projects.
 *
 * One real-world property is one project. That is the rule this file exists to
 * enforce: the page used to show three photographs of the same modern house as
 * three separate references, which made one job look like three and made the
 * whole page less trustworthy, not more. A project owns its photographs and
 * shows them together as a gallery.
 *
 * Every photograph here is the company's own. No generated or licensed service
 * imagery appears on the Reference page. Nothing is inferred from a photograph:
 * a project carries a category, a title, and a short subtitle only where the
 * scope is genuinely confirmed. Where it is not, there is no subtitle, because
 * a sentence written to fill the space would be a guess about somebody's
 * building. No year, town, capacity, client name, equipment or brand appears
 * anywhere on this page.
 *
 * The one piece of scope confirmed beyond what a frame shows is the dental
 * centre: the client has confirmed that those photographs are interior lighting
 * work carried out by the company.
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
 * `span` is the number of the twelve grid columns the cell takes from `lg` up,
 * and `start` places it where a lone photograph should sit centred rather than
 * hard left. `aspect` belongs to the row, not the image, so every cell in a row
 * resolves to the same height and the row never comes out ragged.
 *
 * Spans are chosen against each photograph's real proportions: a landscape gets
 * the wide cell, a portrait the narrow one. Every portrait below lands on its
 * native 3:4 and is not cropped at all; the landscapes take a small crop off
 * the height, which in each case removes foreground floor rather than subject.
 */
export interface GalleryImage {
  span: number;
  /** 1-based grid column to start at. Only needed to centre a lone image. */
  start?: number;
  src: string;
  alt: string;
  /** Steers the crop where the subject is not centred. */
  position?: string;
  /** Ratio used below `lg`, where every cell is full width. */
  mobileAspect?: string;
}

export interface GalleryRow {
  /** Ratio of the whole row from `lg` up. */
  aspect: string;
  images: readonly GalleryImage[];
}

export interface ReferenceProject {
  slug: string;
  category: string;
  title: string;
  /** Only where the scope is genuinely confirmed. Usually absent. */
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
const BARN_ALT =
  "Notranjost hleva z nameščeno rdečo razsvetljavo po celotni dolžini objekta.";

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
        images: [
          {
            span: 12,
            src: "/images/reference/veterinarski-center.webp",
            alt: VETERINARY_ALT,
            mobileAspect: "16/10",
          },
        ],
      },
    ],
  },

  /* ----------------------------------------------------------------------
     Three frames of one house, as one row. A wide exterior carries the row and
     the two portraits sit beside it at their native ratio.
     ---------------------------------------------------------------------- */
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
        aspect: "3/1",
        images: [
          {
            span: 6,
            src: "/images/reference/stanovanjski-objekt-zima.webp",
            alt: HOUSE_WINTER_ALT,
            position: "50% 42%",
            mobileAspect: "4/3",
          },
          {
            span: 3,
            src: "/images/reference/stanovanjski-objekt-fasada.webp",
            alt: "Fasada iste hiše ob mraku, z osvetljenim napuščem in stekleno ograjo terase.",
            mobileAspect: "3/4",
          },
          {
            span: 3,
            src: "/images/reference/stanovanjski-objekt-kopalnica.webp",
            alt: "Kopalnica s stropno linijsko razsvetljavo in vgrajenimi svetili pred vhodom v savno.",
            mobileAspect: "3/4",
          },
        ],
      },
    ],
  },

  /* ----------------------------------------------------------------------
     Two rows, and the wide frame changes side between them so the pair reads
     as a composition rather than as the same row printed twice.
     ---------------------------------------------------------------------- */
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
        aspect: "9/4",
        images: [
          {
            span: 8,
            src: "/images/reference/zobozdravstveni-center/cakalnica.webp",
            alt: DENTAL_WAITING_ALT,
            position: "50% 40%",
            mobileAspect: "4/3",
          },
          {
            span: 4,
            src: "/images/reference/zobozdravstveni-center/sanitarije-umivalnika.webp",
            alt: "Sanitarni prostor z visečimi svetili nad umivalnikoma in vgrajenimi stropnimi svetili.",
            mobileAspect: "3/4",
          },
        ],
      },
      {
        aspect: "9/4",
        images: [
          {
            span: 4,
            src: "/images/reference/zobozdravstveni-center/sanitarije-police.webp",
            alt: "Sanitarni prostor z osvetljenimi nišnimi policami.",
            mobileAspect: "3/4",
          },
          {
            span: 8,
            src: "/images/reference/zobozdravstveni-center/recepcija.webp",
            alt: "Recepcija zobozdravstvenega centra z barvno razsvetljavo v stenskih in stropnih linijah.",
            mobileAspect: "4/3",
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
      alt: BARN_ALT,
    },
    rows: [
      {
        aspect: "9/4",
        images: [
          {
            // Centred rather than hard left: a lone portrait pushed to one edge
            // of a twelve-column grid reads as a layout that lost its second
            // cell.
            span: 4,
            start: 5,
            src: "/images/reference/kmetijski-objekt-razsvetljava.webp",
            alt: BARN_ALT,
            mobileAspect: "3/4",
          },
        ],
      },
    ],
  },
];

/** The three shown as single cards on the homepage and on O podjetju. */
export const homeReferences = references.slice(0, 3);
