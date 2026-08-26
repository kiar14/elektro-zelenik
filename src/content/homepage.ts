import {
  BellRing,
  Building2,
  Cctv,
  Layers,
  MapPin,
  Network,
  PencilRuler,
  ThermometerSun,
  Users,
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
 * The six services the company's own website presents, with their own scope.
 * Consulting is not a seventh card: it is folded into the electrical
 * installation description, where it actually belongs.
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

/** Three-cell proof strip. Deliberately not a repeat of the trust counters. */
export const proofCells: ReadonlyArray<{
  value: string;
  label: string;
  icon?: LucideIcon;
}> = [
  { value: company.sinceLabel, label: "lokalno elektro podjetje" },
  {
    value: "Različni tipi objektov",
    label: "stanovanjski, poslovni in kmetijski",
    icon: Layers,
  },
  {
    value: "Neposreden kontakt",
    label: `lokalna ekipa iz ${company.address.city}a`,
    icon: Users,
  },
];

export const whyCards: ReadonlyArray<{
  icon: LucideIcon;
  title: string;
  body: string;
}> = [
  {
    icon: PencilRuler,
    title: "Od načrtovanja do izvedbe",
    body: "Pomagamo pri načrtovanju inštalacije in izvedemo dogovorjena elektro dela vse do končnega priklopa.",
  },
  {
    icon: Building2,
    title: "Izkušnje na različnih objektih",
    body: "Med izvedenimi objekti so stanovanjske hiše, poslovni prostori in kmetijska poslopja.",
  },
  {
    icon: MapPin,
    title: "Lokalni izvajalec",
    body: "Sedež v Destrniku, neposredna komunikacija in delo po okoliškem območju.",
  },
];

/* -------------------------------------------------------------------------
 * Postopek
 * No response times and no guarantees: neither is verified.
 * ---------------------------------------------------------------------- */

export const processSteps: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: "Pošljete povpraševanje",
    body: "Opišete, kaj potrebujete, in navedete osnovne podatke o objektu.",
  },
  {
    title: "Dogovorimo se za ogled",
    body: "Pogovorimo se o projektu in se, kadar je potrebno, dogovorimo za ogled na objektu.",
  },
  {
    title: "Izvedemo dogovorjena dela",
    body: "Delo izvedemo v dogovorjenem obsegu in po dogovorjenem načrtu.",
  },
  {
    title: "Predaja in nadaljnji kontakt",
    body: "Objekt predamo v uporabo, za poznejša vprašanja pa veste, na koga se obrniti.",
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
    note: "Zunanja in fasadna razsvetljava",
  },
  {
    src: "/images/reference/stanovanjski-objekt-fasada.jpg",
    alt: "Sodobna stanovanjska hiša ob mraku z osvetljenim napuščem in teraso.",
    category: "Stanovanjski objekt",
    title: "Elektroinštalacije in razsvetljava",
  },
  {
    src: "/images/reference/kmetijski-objekt-razsvetljava.jpg",
    alt: "Notranjost hleva z nameščeno rdečo razsvetljavo po celotni dolžini objekta.",
    category: "Kmetijski objekt",
    title: "Razsvetljava gospodarskega objekta",
  },
];
