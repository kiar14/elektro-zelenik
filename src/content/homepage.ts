import {
  BadgeCheck,
  BellRing,
  CalendarCheck,
  Cctv,
  ClipboardCheck,
  Handshake,
  History,
  Network,
  ThermometerSun,
  Timer,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { company } from "@/content/company";

/**
 * Homepage content.
 *
 * Facts trace back to the company's own material, to a public register, or to
 * figures the client has supplied. Anything supplied rather than verifiable
 * carries `needsClientConfirmation` so it can be found again before launch.
 *
 * No em dashes in any user-facing string.
 */

/* -------------------------------------------------------------------------
 * Trust strip
 * ---------------------------------------------------------------------- */

export interface TrustMetric {
  /** Numeric target for the count-up. */
  value: number;
  decimals?: number;
  suffix?: string;
  /** Finished string, server-rendered and read by assistive technology. */
  formatted: string;
  label: string;
  source: string;
  needsClientConfirmation?: true;
}

/**
 * Years of experience is derived rather than hardcoded, so the strip cannot go
 * stale between deploys the way a literal "26" would.
 */
const yearsOfExperience = new Date().getFullYear() - company.foundedYear;

export const trustMetrics: readonly TrustMetric[] = [
  {
    value: 1500,
    suffix: "+",
    formatted: "1.500+",
    label: "Dokončanih projektov",
    source:
      "TODO(stranka): podatek je posredovala stranka in ga ni mogoče preveriti v javnih virih. Pred objavo naj ga stranka pisno potrdi.",
    needsClientConfirmation: true,
  },
  {
    value: 1000,
    suffix: "+",
    formatted: "1.000+",
    label: "Zadovoljnih strank",
    source:
      "TODO(stranka): podatek je posredovala stranka in ga ni mogoče preveriti v javnih virih. Pred objavo naj ga stranka pisno potrdi.",
    needsClientConfirmation: true,
  },
  {
    value: yearsOfExperience,
    formatted: String(yearsOfExperience),
    label: "Let izkušenj",
    source: `Sodni register: dejavnost od leta ${company.foundedYear}. Izračunano ob gradnji, zato se ne postara.`,
  },
  {
    value: 5,
    decimals: 1,
    formatted: "5,0",
    label: "Ocena na Googlu",
    source:
      "Google Business Profile, 6 mnenj. Profil je voden pod imenom s.p., ne d.o.o. Pred objavo potrdi s stranko.",
    needsClientConfirmation: true,
  },
];

/* -------------------------------------------------------------------------
 * Storitve
 *
 * The seven homepage services, including the client's supplied consulting
 * offer and photograph.
 *
 * Nothing inferred and nothing added. Batteries, EV charging and electrical
 * measurements stay off the homepage until the client confirms them.
 * ---------------------------------------------------------------------- */

export interface HomeService {
  title: string;
  body: string;
  href: string;
  icon: LucideIcon;
  image: string;
  alt: string;
}

export const homeServices: readonly HomeService[] = [
  {
    title: "Elektroinštalacije",
    body: "Klasične in pametne elektroinštalacije, skupaj s strokovnim svetovanjem pri načrtovanju.",
    href: "/storitve/elektroinstalacije",
    icon: Zap,
    image: "/images/storitve/elektroinstalacije.jpg",
    alt: "Elektroinštalater vezuje elektro omarico v stanovanjskem objektu.",
  },
  {
    title: "Servisiranje",
    body: "Priklop naprav ter servis strojev in klimatskih naprav.",
    href: "/storitve/servis-in-priklop-naprav",
    icon: Wrench,
    image: "/images/storitve/servisiranje.jpg",
    alt: "Serviser med vzdrževanjem stenske klimatske naprave.",
  },
  {
    title: "Računalniške mreže",
    body: "Izvedba omrežij za poslovne in zasebne objekte.",
    href: "/storitve/racunalniske-mreze",
    icon: Network,
    image: "/images/storitve/racunalniske-mreze.jpg",
    alt: "Tehnik priklaplja mrežne kable v omrežno omaro.",
  },
  {
    title: "Alarmni sistemi",
    body: "Montaža alarmnih sistemov, po potrebi v sodelovanju s poslovnimi partnerji.",
    href: "/storitve/alarmni-sistemi",
    icon: BellRing,
    image: "/images/storitve/alarmni-sistemi.jpg",
    alt: "Monter namešča upravljalno enoto alarmnega sistema ob vhodu.",
  },
  {
    title: "Video nadzor",
    body: "Načrtovanje, montaža in vzdrževanje video-nadzornih sistemov.",
    href: "/storitve/video-nadzor",
    icon: Cctv,
    image: "/images/storitve/video-nadzor.jpg",
    alt: "Montaža zunanje nadzorne kamere pod napuščem objekta.",
  },
  {
    title: "Toplotne črpalke",
    body: "Dobava toplotnih črpalk Panasonic, montaža, priklop in zagon.",
    href: "/storitve/toplotne-crpalke",
    icon: ThermometerSun,
    image: "/images/storitve/toplotne-crpalke.jpg",
    alt: "Zunanja enota toplotne črpalke ob fasadi stanovanjske hiše.",
  },
  {
    title: "Svetovanje",
    body: "Nudimo vam strokovno svetovanje na področju električnih inštalacij.",
    href: "/storitve/svetovanje",
    icon: Handshake,
    image: "/images/storitve/service-svetovanje.png",
    alt: "Elektro strokovnjak stranki ob načrtih svetuje o električnih inštalacijah.",
  },
];

/* -------------------------------------------------------------------------
 * Quick enquiry
 *
 * Sončna elektrarna appears here even though it is not one of the six service
 * cards: the About page names photovoltaics as a principal activity, so it is
 * a confirmed thing to enquire about.
 * ---------------------------------------------------------------------- */

export const enquiryCategories = [
  { value: "elektroinstalacije", label: "Elektroinštalacije" },
  { value: "servis", label: "Servis" },
  { value: "toplotna-crpalka", label: "Toplotna črpalka" },
  { value: "soncna-elektrarna", label: "Sončna elektrarna" },
  { value: "drugo", label: "Drugo" },
] as const;

export type EnquiryCategory = (typeof enquiryCategories)[number]["value"];

/* -------------------------------------------------------------------------
 * Zakaj Zelenik
 * ---------------------------------------------------------------------- */

export const whyCards: ReadonlyArray<{
  icon: LucideIcon;
  title: string;
  body: string;
}> = [
  {
    icon: History,
    title: "26 let izkušenj",
    body: "Od leta 2000 smo pridobili veliko praktičnih izkušenj na področju elektrotehnike in elektroinštalacij.",
  },
  {
    icon: ClipboardCheck,
    title: "Strokovno svetovanje",
    body: "Pomagamo pri izbiri rešitve in pri odločitvah, ki jih je smiselno sprejeti še pred začetkom izvedbe.",
  },
  {
    icon: BadgeCheck,
    title: "Kakovostna izvedba",
    body: "Dela izvedemo skrbno in po dogovorjenem obsegu, z namenom, da je končna rešitev urejena in zanesljiva.",
  },
  {
    icon: CalendarCheck,
    title: "Dogovorjeni roki",
    body: "Termin in potek del uskladimo vnaprej ter se držimo dogovora, kolikor to dopuščajo razmere na objektu.",
  },
  {
    icon: Timer,
    title: "Hitra in učinkovita izvedba",
    body: "Delo organiziramo tako, da je izvedba čim bolj učinkovita in da so nepotrebne prekinitve za naročnika čim manjše.",
  },
  {
    icon: Workflow,
    title: "Več storitev pri enem izvajalcu",
    body: "Elektroinštalacije, servis, varnostni sistemi, računalniške mreže in toplotne črpalke lahko uskladite z enim izvajalcem.",
  },
];

/* -------------------------------------------------------------------------
 * Postopek
 * No response times and no guarantees: neither is verified.
 * ---------------------------------------------------------------------- */

export const processSteps: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: "Pošljete povpraševanje",
    body: "Opišete, kaj potrebujete, in dodate osnovne podatke o objektu.",
  },
  {
    title: "Dogovorimo se za ogled",
    body: "Po potrebi objekt pregledamo, uskladimo obseg del in pripravimo naslednji korak.",
  },
  {
    title: "Izvedemo dogovorjena dela",
    body: "Dela izvedemo natančno, v dogovorjenem obsegu in v usklajenem terminu.",
  },
  {
    title: "Predaja in nadaljnji kontakt",
    body: "Po zaključku preverimo izvedbo, objekt predamo in ostanemo dosegljivi za dodatna vprašanja.",
  },
];

/* -------------------------------------------------------------------------
 * Reference
 *
 * Exactly three, deliberately one of each kind: commercial, residential,
 * agricultural. All are the company's own photographs. Captions describe what
 * is in the frame and nothing more, because no towns, dates, capacities or
 * client names are documented anywhere.
 *
 * TODO(stranka): the veterinary centre photograph carries an "Albin Bezjak
 * Photography" watermark. It is published on the company's own site, but
 * confirm publication rights, and ask whether a watermark-free original
 * exists, before launch. Do not crop or retouch the watermark out.
 * ---------------------------------------------------------------------- */

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
];
