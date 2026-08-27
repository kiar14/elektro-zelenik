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
 * company's own current material. Battery storage, EV charging and electrical
 * measurements are registered activities that appear nowhere in that material,
 * so they have no entry here and therefore no route, no card and no link.
 *
 * No em dashes in any user-facing string.
 */

/**
 * How a block is laid out. See `components/sections/ContentSections`.
 *
 * Chosen per section, by what the section is actually saying, which is what
 * gives the seven service pages seven different rhythms instead of one shape
 * repeated down every page.
 */
export type SectionLayout =
  | "feature"
  | "list"
  | "editorial"
  | "split"
  | "note";

export interface ServiceSection {
  /** Rendered as the section h2. */
  title: string;
  body?: string;
  /** Optional second paragraph, kept separate so the type stays readable. */
  body2?: string;
  /** Rendered as a checked list. */
  bullets?: readonly string[];
  layout?: SectionLayout;
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
  /** One line under the h1. */
  lead: string;
  /** The homepage / overview card body. Unchanged from the approved homepage. */
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
        // Two paragraphs of similar weight, read side by side.
        title: "Novogradnje in obstoječi objekti",
        layout: "split",
        body: "Pri novogradnji je največ odločitev smiselno sprejeti še pred zapiranjem sten. Takrat se določijo položaji vtičnic, stikal, razsvetljave, priključkov za naprave in druge instalacije.",
        body2:
          "Pri obstoječih objektih najprej preverimo trenutno stanje in skupaj določimo, kaj je smiselno ohraniti, zamenjati ali nadgraditi.",
      },
      {
        // A long argument closed by one short line, which is exactly what the
        // editorial block's pull-out is for.
        title: "Dobro načrtovanje prihrani poznejše spremembe",
        layout: "editorial",
        body: "Pred izvedbo je pomembno razmisliti, kje bodo naprave, delovna mesta, svetila in drugi porabniki. Tako lahko instalacijo pripravimo glede na dejansko uporabo prostorov in zmanjšamo potrebo po poznejših posegih.",
        body2:
          "Če niste prepričani, kaj potrebujete, vam pri odločitvah svetujemo pred začetkom del.",
      },
    ],
    process: {
      eyebrow: "Postopek",
      title: "Kako poteka izvedba",
      steps: [
        {
          title: "Povpraševanje",
          body: "Pošljete osnovne informacije o objektu in tem, kaj potrebujete.",
        },
        {
          title: "Ogled in dogovor",
          body: "Po potrebi si objekt ogledamo ter uskladimo obseg in način izvedbe.",
        },
        {
          title: "Priprava",
          body: "Določimo pomembne podrobnosti in pripravimo vse potrebno za izvedbo.",
        },
        {
          title: "Izvedba",
          body: "Dogovorjena elektro dela izvedemo in uredimo potrebne priklope.",
        },
        {
          title: "Zaključek del",
          body: "Izvedbo preverimo in ostanemo dosegljivi za nadaljnja vprašanja.",
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
        layout: "list",
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
        body: "Najpogosteje takrat, ko je naprava kupljena, objekt pa še nima ustreznega priklopa, ali ko naprava, ki je bila do zdaj v redu, začne delovati drugače kot prej.",
        body2:
          "Pogosta je tudi kombinacija: ob elektroinštalacijah se hkrati uredi še namestitev klimatske naprave, da se dela na objektu ne podvajajo.",
      },
    ],
    process: {
      eyebrow: "Postopek",
      title: "Kako poteka servis",
      steps: [
        {
          title: "Opis težave",
          body: "Poveste, za katero napravo gre in kaj ste opazili.",
        },
        {
          title: "Dogovor za termin",
          body: "Uskladimo termin obiska glede na obseg dela in razpoložljivost.",
        },
        {
          title: "Pregled na objektu",
          body: "Napravo pregledamo na mestu in opredelimo, kaj je treba narediti.",
        },
        {
          title: "Izvedba in preizkus",
          body: "Dogovorjeno delo izvedemo in delovanje naprave preverimo pred odhodom.",
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
        bullets: [
          "Poslovni objekti",
          "Trgovski objekti",
          "Zasebni objekti",
        ],
      },
      {
        title: "Načrtovanje",
        layout: "split",
        body: "Mrežno napeljavo je najceneje izvesti hkrati z elektroinštalacijami. Takrat se določi, kje bodo priključna mesta, koliko jih bo in kje bo stala omrežna omara.",
        body2:
          "Pri načrtovanju je smiselno računati tudi na to, kar bo prišlo pozneje. Nekaj rezervnih priključnih mest je ob izvedbi majhna postavka, po zaprtju sten pa ne več.",
      },
    ],
    process: {
      eyebrow: "Postopek",
      title: "Kako poteka izvedba",
      steps: [
        {
          title: "Povpraševanje",
          body: "Poveste, za kakšen objekt gre in kaj v njem načrtujete.",
        },
        {
          title: "Ogled in razporeditev",
          body: "Uskladimo število in mesta priključnih točk ter lokacijo omrežne omare.",
        },
        {
          title: "Napeljava",
          body: "Izvedemo mrežno napeljavo, po možnosti hkrati z elektroinštalacijami.",
        },
        {
          title: "Priklop in zaključek del",
          body: "Priključna mesta priklopimo, omrežno omaro uredimo in izvedbo skupaj pregledamo.",
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
        body: "Alarmni sistem javi, da se je v objektu nekaj zgodilo takrat, ko v njem ni nikogar. Njegova vrednost je odvisna predvsem od tega, kako je razporejen po objektu, in ne od števila nameščenih elementov.",
        body2:
          "Zato se pri montaži najprej pogovorimo o tem, kje so dejanske vstopne točke in kateri prostori so za vas občutljivi.",
      },
      {
        title: "Vrste objektov",
        layout: "list",
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
        body: "Če je objekt v gradnji ali prenovi, je pripravo za alarmni sistem najbolje izvesti hkrati z elektroinštalacijami. Napeljava je takrat še dostopna, kar pozneje ni.",
        body2:
          "V objektih, kjer so dela že zaključena, izvedbo prilagodimo obstoječemu stanju. Kaj je izvedljivo, opredelimo po ogledu.",
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
          body: "Poveste, za kakšen objekt gre in kaj želite zavarovati.",
        },
        {
          title: "Ogled objekta",
          body: "Pregledamo vstopne točke in prostore ter uskladimo razporeditev.",
        },
        {
          title: "Montaža",
          body: "Sistem namestimo, po potrebi skupaj s poslovnim partnerjem.",
        },
        {
          title: "Zaključek del in navodila",
          body: "Delovanje preverimo in vam pokažemo, kako se sistem uporablja.",
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
    h1: "Video nadzor, načrtovanje, montaža in vzdrževanje",
    lead: "Vzpostavitev video-nadzornih sistemov za poslovne, industrijske in zasebne objekte.",
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
        body: "Postavitev odloči, ali bo sistem uporaben. Pomembno je, kaj naj bi bilo dejansko vidno, s katere strani prihaja svetloba čez dan in kje je napeljavo sploh mogoče speljati.",
        body2:
          "Te odločitve sprejmemo skupaj ob ogledu, ker jih po montaži ni več mogoče popraviti brez ponovnega posega v objekt.",
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
          body: "Poveste, kakšen objekt je in kaj želite pokriti.",
        },
        {
          title: "Ogled in postavitev",
          body: "Na objektu določimo mesta in preverimo, kod je mogoče speljati napeljavo.",
        },
        {
          title: "Montaža in vzpostavitev",
          body: "Izvedemo napeljavo, namestimo opremo in sistem vzpostavimo.",
        },
        {
          title: "Zaključek del in vzdrževanje",
          body: "Pokažemo, kako se sistem uporablja, po dogovoru pa poskrbimo tudi za vzdrževanje.",
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
    h1: "Toplotne črpalke Panasonic, dobava in montaža",
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
        body: "Pri izbiri je pomembno, kje bo zunanja enota stala, kako je do nje mogoče speljati napeljavo in kako je objekt ogrevan zdaj.",
        body2:
          "Kaj je za vaš objekt primerno, se opredeli po ogledu. Brez tega bi šlo za ugibanje, zato številk in modelov vnaprej ne navajamo.",
      },
      {
        title: "Električni priklop",
        layout: "editorial",
        body: "Toplotna črpalka je tudi elektro naprava, kar je razlog, da je ta storitev pri nas povezana z elektroinštalacijami.",
        body2:
          "Če se objekt gradi ali prenavlja, je priprava za toplotno črpalko del elektroinštalacij in se izvede takrat, ko je to najenostavneje.",
      },
      {
        title: "Panasonic",
        layout: "note",
        body: "Dobavljamo in montiramo toplotne črpalke Panasonic. To je edini proizvajalec, ki ga navajamo, ker je edini, ki ga dejansko dobavljamo.",
      },
    ],
    process: {
      eyebrow: "Postopek",
      title: "Kako poteka izvedba",
      steps: [
        {
          title: "Povpraševanje",
          body: "Poveste, kakšen objekt je in kako je ogrevan zdaj.",
        },
        {
          title: "Ogled",
          body: "Pregledamo objekt, možna mesta postavitve in obstoječo napeljavo.",
        },
        {
          title: "Dobava in montaža",
          body: "Dobavimo toplotno črpalko in izvedemo montažo.",
        },
        {
          title: "Priklop in zagon",
          body: "Izvedemo električni priklop in zagon sistema.",
        },
        {
          title: "Zaključek del",
          body: "Delovanje preverimo in vam pokažemo, kako sistem upravljate.",
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
    h1: "Svetovanje pri električnih inštalacijah",
    lead: "Strokovno svetovanje pred izvedbo in med njo, da so odločitve sprejete v pravem trenutku.",
    cardBody:
      "Nudimo vam strokovno svetovanje na področju električnih inštalacij.",
    icon: Handshake,
    image: "/images/storitve/svetovanje.webp",
    alt: "Elektro strokovnjak stranki ob načrtih svetuje o električnih inštalacijah.",
    sections: [
      {
        title: "Kdaj je svetovanje koristno",
        layout: "list",
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
        body: "Nekaj odločitev je pozneje nesorazmerno dragih. Razporeditev vtičnic in stikal, mesta svetil, priprava za naprave, ki bodo prišle pozneje, in prostor v elektro omarici sodijo mednje.",
        body2:
          "Cilj pogovora je, da so te odločitve sprejete zavestno in glede na to, kako boste objekt uporabljali, ne pa po tem, kar je bilo na gradbišču najhitreje.",
      },
      {
        title: "Kako svetovanje preide v izvedbo",
        layout: "split",
        body: "Svetovanje ni ločena storitev, ki bi se končala s poročilom. Najpogosteje je prvi del pogovora, iz katerega nastane obseg del.",
        body2:
          "Če se za izvedbo odločite pri nas, se dogovorjeno prenese neposredno v delo na objektu. Če se odločite drugače, ostane pri pogovoru in vam to ne zapre nobene poti.",
      },
    ],
    process: {
      eyebrow: "Postopek",
      title: "Kako poteka svetovanje",
      steps: [
        {
          title: "Povpraševanje",
          body: "Poveste, v kateri fazi je objekt in kaj je odprto.",
        },
        {
          title: "Pogovor",
          body: "Pregledamo, kaj načrtujete, in opredelimo, katere odločitve so nujne zdaj.",
        },
        {
          title: "Ogled po potrebi",
          body: "Če je za smiselno oceno potreben ogled objekta, se dogovorimo zanj.",
        },
        {
          title: "Obseg del",
          body: "Iz dogovorjenega nastane obseg del, ki je podlaga za izvedbo.",
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
