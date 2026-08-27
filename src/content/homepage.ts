import {
  BadgeCheck,
  CalendarCheck,
  ClipboardCheck,
  History,
  Timer,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { company } from "@/content/company";
import type { EnquiryValue } from "@/content/enquiry";
import { homeReferences } from "@/content/references";
import { services } from "@/content/services";

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
 * Derived from content/services.ts rather than restated here, so the homepage
 * grid, the header dropdown, the footer column and /storitve are guaranteed to
 * show the same seven services in the same order.
 * ---------------------------------------------------------------------- */

export interface HomeService {
  title: string;
  body: string;
  href: string;
  icon: LucideIcon;
  image: string;
  alt: string;
}

export const homeServices: readonly HomeService[] = services.map((service) => ({
  title: service.title,
  body: service.cardBody,
  href: service.href,
  icon: service.icon,
  image: service.image,
  alt: service.alt,
}));

/* -------------------------------------------------------------------------
 * Quick enquiry
 *
 * The five shortest paths, using the site-wide enquiry values from
 * content/enquiry.ts. The selection is carried to /povprasevanje as a search
 * param, so the strings have to be the same ones that page understands.
 *
 * Sončna elektrarna appears here even though it is not one of the seven service
 * cards: the About page names photovoltaics as a principal activity, so it is
 * a confirmed thing to enquire about.
 * ---------------------------------------------------------------------- */

export const enquiryCategories = [
  { value: "elektroinstalacije", label: "Elektroinštalacije" },
  { value: "servisiranje", label: "Servis" },
  { value: "toplotne-crpalke", label: "Toplotna črpalka" },
  { value: "soncna-elektrarna", label: "Sončna elektrarna" },
  { value: "drugo", label: "Drugo" },
] as const satisfies ReadonlyArray<{ value: EnquiryValue; label: string }>;

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
 * agricultural. Taken from content/references.ts, which holds the company's
 * own photographs and the notes on what is still unverified about them.
 * ---------------------------------------------------------------------- */

export type { ReferenceItem } from "@/content/references";

export const references = homeReferences;
