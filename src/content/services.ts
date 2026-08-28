import {
  BellRing,
  Cctv,
  Handshake,
  Network,
  ThermometerSun,
  Wrench,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * The seven services, defined once.
 *
 * This module is the single source of truth for the Storitve architecture: the
 * homepage grid, the header dropdown, the mobile accordion, the footer column,
 * `/storitve`, the seven detail routes and every related-services block all
 * read from here. Adding a service anywhere means adding it here, which is the
 * only way the seven stay identical in all six places.
 *
 * Scope discipline: nothing in this file is inferred. Every claim traces to the
 * company's own current material. Battery storage, photovoltaics, EV charging
 * and electrical measurements appear nowhere in that material, so they have no
 * entry here and therefore no route, no card and no link.
 *
 * No em dashes in any user-facing string.
 */

/**
 * How a block is laid out. See `components/sections/ContentSections`.
 *
 * Chosen per section, by what the section is actually saying, which is what
 * gives the seven service pages seven different rhythms instead of one shape
 * repeated down every page.
 *
 *   feature    the scope of the service, under a page-opening head: heading
 *              left, short explanation right, on one baseline
 *   list       the same technical grid under a quieter stacked head, for a
 *              block that qualifies something already argued above it
 *   editorial  the page's one long-form argument, closed by the line it turns
 *              on, pulled out against a brand rule
 *   split      two positions of equal weight, side by side across one rule
 *   note       a short aside that has to be said but does not carry the page
 */
export type SectionLayout =
  | "feature"
  | "list"
  | "editorial"
  | "split"
  | "note";

/** One half of a `split` block, where the two halves are named things. */
export interface SectionColumn {
  title: string;
  body: string;
}

export interface ServiceSection {
  /** Rendered as the section h2. */
  title: string;
  body?: string;
  /**
   * The second paragraph. In an `editorial` block this is the pulled-out line,
   * so it is written as one sentence that can carry that weight, not as a
   * continuation of the paragraph above it.
   */
  body2?: string;
  /** Rendered as the technical grid, or as compact chips inside `editorial`. */
  bullets?: readonly string[];
  /** A `split` block whose two halves are named. */
  columns?: readonly [SectionColumn, SectionColumn];
  layout?: SectionLayout;
  /**
   * Overrides the automatic surface. See `toneFor` in ContentSections: tone is
   * normally decided by role, and this exists for the one page whose sequence
   * would otherwise carry no warm band at all.
   */
  surface?: "ground" | "surface";
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  title: string;
  body: string;
}

export interface Service {
  slug: string;
  href: string;
  /** Navigation and card label. Short. */
  title: string;
  /** Page h1. May be longer and more descriptive than `title`. */
  h1: string;
  /** One line under the h1. Also the featured card's body on the two grids. */
  lead: string;
  /** The ordinary service card body. */
  cardBody: string;
  icon: LucideIcon;
  image: string;
  alt: string;
  sections: readonly ServiceSection[];
  process?: {
    eyebrow: string;
    title: string;
    steps: readonly ProcessStep[];
  };
  faq?: readonly FaqItem[];
  /** Slugs of the services shown at the foot of the page. */
  related: readonly string[];
}

export const services: readonly Service[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: "elektroinstalacije",
    href: "/storitve/elektroinstalacije",
    title: "Elektroinštalacije",
    h1: "Elektroinštalacije za stanovanjske in poslovne objekte",
    lead: "Izvedba elektroinštalacij za novogradnje, prenove in obstoječe objekte, od načrtovanja razporeditve do priklopa in zaključka del.",
    cardBody:
      "Klasične in pametne elektroinštalacije, skupaj s strokovnim svetovanjem pri načrtovanju.",
    icon: Zap,
    image: "/images/storitve/elektroinstalacije.webp",
    alt: "Elektroinštalater vezuje elektro omarico v stanovanjskem objektu.",
    sections: [
      {
        title: "Kaj zajemajo elektroinštalacije",
        layout: "feature",
        body: "Dobro načrtovana elektroinštalacija mora ustrezati načinu uporabe prostora danes in omogočati tudi poznejše spremembe. Pred izvedbo zato uskladimo potrebe objekta, razporeditev priključkov in druge pomembne podrobnosti.",
        bullets: [
          "Klasične elektroinštalacije",
          "Pametne inštalacije",
          "Notranja in zunanja razsvetljava",
          "Elektro omarice",
          "Priklop naprav",
          "Svetovanje pri izbiri rešitev",
        ],
      },
      {
        // Two named positions of equal weight, read across one rule.
        title: "Novogradnje in obstoječi objekti",
        layout: "split",
        columns: [
          {
            title: "Novogradnje",
            body: "Pri novogradnji je največ odločitev smiselno sprejeti še pred zapiranjem sten. Takrat se določijo položaji vtičnic, stikal, razsvetljave, priključkov za naprave in druge inštalacije.",
          },
          {
            title: "Obstoječi objekti",
            body: "Pri obstoječem objektu najprej preverimo trenutno stanje in skupaj določimo, kaj je smiselno ohraniti, zamenjati ali nadgraditi.",
          },
        ],
      },
      {
        // A long argument closed by one short line, which is exactly what the
        // editorial block's pull-out is for.
        title: "Dobro načrtovanje prihrani poznejše spremembe",
        layout: "editorial",
        body: "Pred izvedbo je pomembno razmisliti, kje bodo naprave, delovna mesta, svetila in drugi porabniki. Tako lahko inštalacijo pripravimo glede na dejansko uporabo prostorov in zmanjšamo potrebo po poznejših posegih.",
        body2:
          "Če še niste prepričani, kaj potrebujete, vam pri odločitvah svetujemo pred začetkom del.",
      },
    ],
    process: {
      eyebrow: "Postopek",
      title: "Kako poteka izvedba",
      steps: [
        {
          title: "Povpraševanje",
          body: "Povejte nam, za kakšen objekt gre in kaj potrebujete.",
        },
        {
          title: "Ogled objekta",
          body: "Po potrebi si objekt ogledamo in uskladimo obseg del.",
        },
        {
          title: "Dogovor",
          body: "Dogovorimo se o rešitvi, terminu in pripravi na izvedbo.",
        },
        {
          title: "Izvedba",
          body: "Izvedemo dogovorjena elektro dela in priklope.",
        },
        {
          title: "Zaključek",
          body: "Preverimo izvedbo ter vam predamo potrebne informacije.",
        },
      ],
    },
    faq: [
      {
        question: "Kdaj je pravi trenutek, da se dogovorimo?",
        answer:
          "Čim prej, najbolje še pred zaprtjem sten. Takrat je mogoče razporeditev postaviti brez kompromisov in brez naknadnih posegov v že dokončane površine.",
      },
      {
        question: "Ali izvajate elektroinštalacije tudi v obstoječih objektih?",
        answer:
          "Da. Obseg del in način izvedbe uskladimo po ogledu, ker je pri obstoječih objektih od stanja na mestu odvisno precej več kot pri novogradnji.",
      },
      {
        question: "Ali izvajate pametne inštalacije?",
        answer:
          "Da. Izvajamo klasične in pametne inštalacije. Kaj je za vaš objekt smiselno, se pogovorimo pri načrtovanju, saj je pametna inštalacija smiselna le tam, kjer se bo dejansko uporabljala.",
      },
      {
        question: "Kaj potrebujete od mene pred začetkom?",
        answer:
          "Koristno je vse, kar že obstaja: načrti, tlorisi, predvidena razporeditev opreme in seznam naprav, ki se bodo priklopile. Če tega še ni, to skupaj opredelimo ob ogledu.",
      },
    ],
    related: ["svetovanje", "servisiranje", "toplotne-crpalke"],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "servisiranje",
    href: "/storitve/servisiranje",
    title: "Servisiranje",
    h1: "Servisiranje, priklop naprav in klimatske naprave",
    lead: "Priklop električnih naprav, popravila strojev ter namestitev in servis klimatskih naprav.",
    cardBody: "Priklop naprav ter servis strojev in klimatskih naprav.",
    icon: Wrench,
    image: "/images/storitve/servisiranje.webp",
    alt: "Serviser med vzdrževanjem stenske klimatske naprave.",
    sections: [
      {
        title: "Kaj zajema servisiranje",
        layout: "feature",
        body: "Poleg izvedbe elektroinštalacij prevzemamo tudi posamezna servisna dela na napravah in strojih, ki so na objektu že nameščeni.",
        bullets: [
          "Priklop električnih naprav",
          "Popravilo strojev",
          "Namestitev klimatskih naprav",
          "Servis klimatskih naprav",
        ],
      },
      {
        title: "Kdaj se storitev uporablja",
        layout: "editorial",
        body: "Storitev je primerna, ko je treba napravo pravilno priklopiti, odpraviti napako, urediti popravilo ali namestiti oziroma servisirati klimatsko napravo.",
        body2:
          "Pogosto se servisiranje povezuje tudi z elektroinštalacijami, zato lahko več del na objektu uskladimo v enem obisku.",
      },
    ],
    process: {
      eyebrow: "Postopek",
      title: "Kako poteka servis",
      steps: [
        {
          title: "Opis težave",
          body: "Povejte, za katero napravo gre in kaj ste opazili.",
        },
        {
          title: "Dogovor za termin",
          body: "Uskladimo termin glede na vrsto posega in vašo lokacijo.",
        },
        {
          title: "Pregled na objektu",
          body: "Napravo pregledamo in določimo, kaj je treba urediti.",
        },
        {
          title: "Izvedba in preizkus",
          body: "Izvedemo dogovorjeno delo in preverimo pravilno delovanje.",
        },
      ],
    },
    faq: [
      {
        question: "Katere naprave servisirate?",
        answer:
          "Ukvarjamo se s priklopom električnih naprav, popravili strojev ter namestitvijo in servisom klimatskih naprav. Če naprava ne sodi v ta obseg, vam to povemo takoj.",
      },
      {
        question: "Ali lahko klimatsko napravo tudi namestite?",
        answer:
          "Da. Namestitev in servis klimatskih naprav sta del te storitve.",
      },
      {
        question: "Kako hitro se lahko oglasite?",
        answer:
          "Termin uskladimo ob dogovoru, odvisno od obsega dela in razpoložljivosti. Pokličite in se dogovorimo za konkreten datum.",
      },
    ],
    related: ["elektroinstalacije", "toplotne-crpalke", "svetovanje"],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "racunalniske-mreze",
    href: "/storitve/racunalniske-mreze",
    title: "Računalniške mreže",
    h1: "Računalniške mreže za poslovne in zasebne objekte",
    lead: "Izvedba mrežne napeljave v objektu, od razporeditve priključnih mest do omrežne omare.",
    cardBody: "Izvedba omrežij za poslovne in zasebne objekte.",
    icon: Network,
    image: "/images/storitve/racunalniske-mreze.webp",
    alt: "Tehnik priklaplja mrežne kable v omrežno omaro.",
    sections: [
      {
        title: "Kaj zajema izvedba",
        layout: "feature",
        body: "Ukvarjamo se s fizično mrežno infrastrukturo v objektu, torej z napeljavo, priključnimi mesti in omrežno omaro. To je del, ki se izvede skupaj z gradnjo ali prenovo in ga pozneje ni enostavno dopolnjevati.",
        bullets: [
          "Razporeditev priključnih mest",
          "Napeljava mrežne inštalacije",
          "Priprava in ureditev omrežne omare",
          "Priklop priključnih mest",
          "Usklajevanje z elektroinštalacijami",
        ],
      },
      {
        title: "Kje se uporablja",
        layout: "editorial",
        body: "Mrežna napeljava je smiselna povsod, kjer se pričakuje več stalnih naprav na eni lokaciji ali kjer brezžična povezava zaradi razporeditve prostorov ni zanesljiva.",
        bullets: ["Poslovni objekti", "Trgovski objekti", "Zasebni objekti"],
      },
      {
        title: "Načrtovanje",
        layout: "split",
        body: "Mrežno napeljavo je najbolje izvesti skupaj z elektroinštalacijami. Takrat se določijo lokacije priključnih mest, trase kablov in mesto omrežne omare.",
        body2:
          "Pri načrtovanju upoštevamo tudi prihodnje potrebe. Nekaj rezervnih priključnih mest je praviloma lažje pripraviti med izvedbo kot po zaključku sten.",
      },
    ],
    process: {
      eyebrow: "Postopek",
      title: "Kako poteka izvedba",
      steps: [
        {
          title: "Povpraševanje",
          body: "Povejte, za kakšen objekt gre in koliko priključnih mest potrebujete.",
        },
        {
          title: "Ogled in razporeditev",
          body: "Uskladimo lokacije priključkov, trase kablov in omrežne omare.",
        },
        {
          title: "Napeljave",
          body: "Izvedemo mrežno napeljavo in pripravimo priključna mesta.",
        },
        {
          title: "Priklop in preverjanje",
          body: "Zaključimo priklope, uredimo omaro in preverimo povezave.",
        },
      ],
    },
    related: ["elektroinstalacije", "video-nadzor", "alarmni-sistemi"],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "alarmni-sistemi",
    href: "/storitve/alarmni-sistemi",
    title: "Alarmni sistemi",
    h1: "Alarmni sistemi za stanovanjske in poslovne objekte",
    lead: "Montaža alarmnih sistemov, po potrebi v sodelovanju s poslovnimi partnerji.",
    cardBody:
      "Montaža alarmnih sistemov, po potrebi v sodelovanju s poslovnimi partnerji.",
    icon: BellRing,
    image: "/images/storitve/alarmni-sistemi.webp",
    alt: "Monter namešča upravljalno enoto alarmnega sistema ob vhodu.",
    sections: [
      {
        title: "Namen alarmnega sistema",
        layout: "editorial",
        body: "Alarmnega sistema ne načrtujemo samo glede na število senzorjev, ampak glede na sam objekt. Pri postavitvi upoštevamo vhode, dostopne točke, način uporabe in prostore, ki jih želite zaščititi.",
        body2:
          "Smiselna postavitev se določi pred montažo, saj sistem najbolje deluje takrat, ko je prilagojen dejanskemu objektu.",
      },
      {
        // The one page whose sequence has no long-form block after the opening
        // one, so the warm band is named here rather than left to the rule.
        title: "Vrste objektov",
        layout: "list",
        surface: "surface",
        body: "Razporeditev je pri vsaki vrsti objekta drugačna, ker so drugačne poti, po katerih se v objekt vstopa.",
        bullets: [
          "Stanovanjski objekti",
          "Poslovni objekti",
          "Gospodarski in kmetijski objekti",
        ],
      },
      {
        title: "Načrtovanje in izvedba",
        layout: "split",
        body: "Če je objekt v gradnji ali prenovi, je pripravo za alarmni sistem najbolje predvideti skupaj z elektroinštalacijami. Napeljava je takrat preprostejša in bolj urejena.",
        body2:
          "Pri že zaključenem objektu izvedbo prilagodimo obstoječemu stanju in možnosti postavitve določimo po ogledu.",
      },
      {
        title: "Sodelovanje s poslovnimi partnerji",
        layout: "note",
        body: "Del alarmnih sistemov izvedemo v sodelovanju s poslovnimi partnerji. To povemo vnaprej, da veste, kdo bo posamezni del prevzel, in da je jasno, na koga se lahko obrnete.",
      },
    ],
    process: {
      eyebrow: "Postopek",
      title: "Kako poteka izvedba",
      steps: [
        {
          title: "Povpraševanje",
          body: "Povejte, za kakšen objekt gre in kaj želite zaščititi.",
        },
        {
          title: "Ogled objekta",
          body: "Pregledamo dostopne točke, prostore in možnosti namestitve.",
        },
        {
          title: "Montaža",
          body: "Sistem namestimo, po potrebi skupaj s poslovnim partnerjem.",
        },
        {
          title: "Predaja sistema",
          body: "Preverimo delovanje in razložimo osnovno uporabo.",
        },
      ],
    },
    related: ["video-nadzor", "elektroinstalacije", "racunalniske-mreze"],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "video-nadzor",
    href: "/storitve/video-nadzor",
    title: "Video nadzor",
    h1: "Video nadzor za poslovne, industrijske in zasebne objekte",
    lead: "Načrtovanje postavitve, montaža in vzdrževanje video-nadzornih sistemov.",
    cardBody: "Načrtovanje, montaža in vzdrževanje video-nadzornih sistemov.",
    icon: Cctv,
    image: "/images/storitve/video-nadzor.webp",
    alt: "Montaža zunanje nadzorne kamere pod napuščem objekta.",
    sections: [
      {
        title: "Kaj zajema video nadzor",
        layout: "feature",
        body: "Prevzamemo celoten postopek, od dogovora o tem, kaj je treba pokriti, do delujočega sistema in poznejšega vzdrževanja.",
        bullets: [
          "Načrtovanje postavitve",
          "Vzpostavitev sistema",
          "Napeljava do posameznih mest",
          "Vzdrževanje",
        ],
      },
      {
        title: "Načrtovanje postavitve",
        layout: "editorial",
        body: "Postavitev kamer določimo glede na to, kaj je treba dejansko pokriti, s katere strani prihaja svetloba in kako je mogoče urediti napeljavo.",
        body2:
          "Te odločitve sprejmemo pred montažo, saj lahko pravilna postavitev prepreči nepotrebne posege in izboljša pregled nad objektom.",
      },
      {
        title: "Vrste objektov",
        layout: "list",
        body: "Sistem prilagodimo objektu in temu, kako se ta uporablja.",
        bullets: [
          "Poslovni objekti",
          "Industrijski objekti",
          "Zasebni objekti",
        ],
      },
    ],
    process: {
      eyebrow: "Postopek",
      title: "Kako poteka izvedba",
      steps: [
        {
          title: "Povpraševanje",
          body: "Povejte, kateri objekt želite pokriti in kaj želite nadzorovati.",
        },
        {
          title: "Ogled in načrt",
          body: "Določimo smiselna mesta kamer ter možnosti napeljave.",
        },
        {
          title: "Montaža sistema",
          body: "Izvedemo napeljavo, montažo kamer in vzpostavitev sistema.",
        },
        {
          title: "Predaja in vzdrževanje",
          body: "Preverimo delovanje, pokažemo uporabo in se po potrebi dogovorimo za vzdrževanje.",
        },
      ],
    },
    related: ["alarmni-sistemi", "racunalniske-mreze", "elektroinstalacije"],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "toplotne-crpalke",
    href: "/storitve/toplotne-crpalke",
    title: "Toplotne črpalke",
    h1: "Toplotne črpalke Panasonic z montažo in zagonom",
    lead: "Dobava toplotnih črpalk Panasonic, montaža, električni priklop in zagon.",
    cardBody: "Dobava toplotnih črpalk Panasonic, montaža, priklop in zagon.",
    icon: ThermometerSun,
    image: "/images/storitve/toplotne-crpalke.webp",
    alt: "Zunanja enota toplotne črpalke ob fasadi stanovanjske hiše.",
    sections: [
      {
        title: "Kaj zagotavljamo",
        layout: "feature",
        body: "Toplotno črpalko prevzamemo kot celoto, od dobave do zagona, tako da za posamezne faze ni treba iskati različnih izvajalcev.",
        bullets: [
          "Dobava toplotne črpalke",
          "Montaža",
          "Električni priklop",
          "Zagon",
        ],
      },
      {
        title: "Izbira in izvedba",
        layout: "split",
        body: "Pri izbiri je pomembno, kje bo zunanja enota stala, kako je do nje mogoče urediti napeljavo in kako je objekt ogrevan.",
        body2:
          "Primerno rešitev določimo glede na objekt in pogoje na lokaciji. Brez ogleda ne ugibamo o izvedbi ali zahtevnosti montaže.",
      },
      {
        title: "Električni priklop",
        layout: "editorial",
        body: "Toplotna črpalka je tudi električna naprava, zato je pri nas njen priklop povezan z elektroinštalacijami.",
        body2:
          "Če se objekt gradi ali prenavlja, lahko pripravo za toplotno črpalko uskladimo skupaj z drugimi elektro deli.",
      },
      {
        title: "Panasonic",
        layout: "note",
        body: "Pri toplotnih črpalkah delamo s Panasonicom. Poskrbimo za dobavo, montažo, električni priklop in zagon sistema, zato posameznih faz ni treba usklajevati z več izvajalci.",
      },
    ],
    process: {
      eyebrow: "Postopek",
      title: "Kako poteka izvedba",
      steps: [
        {
          title: "Povpraševanje",
          body: "Povejte, za kakšen objekt gre in kaj pričakujete od sistema.",
        },
        {
          title: "Ogled",
          body: "Po potrebi preverimo prostor, obstoječe stanje in možnosti postavitve.",
        },
        {
          title: "Dogovor in dobava",
          body: "Uskladimo rešitev in poskrbimo za dobavo dogovorjene opreme.",
        },
        {
          title: "Montaža in priklop",
          body: "Namestimo opremo ter izvedemo električni priklop.",
        },
        {
          title: "Zagon in predaja",
          body: "Sistem zaženemo, preverimo delovanje in zaključimo dogovorjena dela.",
        },
      ],
    },
    faq: [
      {
        question: "Katere toplotne črpalke dobavljate?",
        answer:
          "Dobavljamo toplotne črpalke Panasonic. Katera izvedba je za vaš objekt primerna, opredelimo po ogledu.",
      },
      {
        question: "Ali izvedete tudi električni priklop?",
        answer:
          "Da. Dobava, montaža, električni priklop in zagon so del iste storitve, zato za to ni treba iskati dodatnega izvajalca.",
      },
      {
        question: "Ali je toplotno črpalko mogoče vgraditi v obstoječ objekt?",
        answer:
          "Kaj je izvedljivo, je odvisno od objekta in obstoječega ogrevanja. To pregledamo ob ogledu in vam povemo, kaj je smiselno.",
      },
      {
        question: "Ali lahko dobim točne podatke o zmogljivosti in porabi?",
        answer:
          "Takih podatkov ne navajamo vnaprej, ker so odvisni od objekta in izbrane izvedbe. Konkretne vrednosti dobite skupaj s ponudbo, potem ko objekt poznamo.",
      },
    ],
    related: ["elektroinstalacije", "servisiranje", "svetovanje"],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "svetovanje",
    href: "/storitve/svetovanje",
    title: "Svetovanje",
    h1: "Svetovanje pred izvedbo elektroinštalacij",
    lead: "Strokovno svetovanje pred izvedbo in med njo, da so pomembne odločitve sprejete pravočasno.",
    cardBody:
      "Nudimo vam strokovno svetovanje na področju električnih inštalacij.",
    icon: Handshake,
    image: "/images/storitve/svetovanje.webp",
    alt: "Elektro strokovnjak stranki ob načrtih svetuje o električnih inštalacijah.",
    sections: [
      {
        title: "Kdaj je svetovanje koristno",
        layout: "feature",
        body: "Takrat, ko je odločitev še odprta. Ko je napeljava enkrat izvedena in so stene zaprte, se možnosti zožijo, spremembe pa postanejo posegi.",
        bullets: [
          "Pred začetkom gradnje ali prenove",
          "Pri razporeditvi elektroinštalacij po prostorih",
          "Pri izbiri med klasično in pametno inštalacijo",
          "Pred nakupom naprav, ki potrebujejo priklop",
          "Ko ponudbe med seboj niso primerljive",
        ],
      },
      {
        title: "Kaj se je smiselno odločiti pred izvedbo",
        layout: "editorial",
        body: "Nekatere odločitve je pozneje nesorazmerno drago spreminjati. Razporeditev vtičnic in stikal, mesta svetil, priprava za naprave in položaj elektro omarice je zato smiselno določiti pred začetkom izvedbe.",
        body2:
          "Cilj svetovanja je, da so odločitve sprejete zavestno in glede na to, kako boste objekt uporabljali, ne šele takrat, ko bi spremembe zahtevale dodatne posege.",
      },
      {
        title: "Kako svetovanje preide v izvedbo",
        layout: "split",
        body: "Svetovanje ni ločena storitev, ki bi se morala končati samo s priporočilom. Najpogosteje je prvi del pogovora, iz katerega nastane jasnejši obseg del.",
        body2:
          "Če se za izvedbo odločite pri nas, dogovorjene odločitve prenesemo neposredno v delo na objektu. Če se odločite drugače, ostane pri pogovoru in dogovorjenem obsegu svetovanja.",
      },
    ],
    process: {
      eyebrow: "Postopek",
      title: "Kako poteka svetovanje",
      steps: [
        {
          title: "Povpraševanje",
          body: "Povejte, kaj načrtujete in v kateri fazi je objekt.",
        },
        {
          title: "Pogovor",
          body: "Pregledamo ključne odločitve in kaj je smiselno razjasniti pred izvedbo.",
        },
        {
          title: "Ogled po potrebi",
          body: "Če je za dober nasvet potreben ogled, se dogovorimo za termin.",
        },
        {
          title: "Naslednji korak",
          body: "Na koncu določimo, kaj je treba pripraviti in ali svetovanje preide v izvedbo.",
        },
      ],
    },
    related: ["elektroinstalacije", "toplotne-crpalke", "racunalniske-mreze"],
  },
] as const;

/** Lookup used by the dynamic service route. */
export function findService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** Resolve a service's `related` slugs to full records. */
export function relatedServices(service: Service): readonly Service[] {
  return service.related
    .map((slug) => findService(slug))
    .filter((item): item is Service => Boolean(item));
}

/** The overview link that accompanies the seven everywhere they are listed. */
export const allServicesLink = {
  label: "Vse storitve",
  href: "/storitve",
} as const;
