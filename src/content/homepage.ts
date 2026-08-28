import {
  BadgeCheck,
  CalendarCheck,
  ClipboardCheck,
  History,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { company } from "@/content/company";
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
 * Zakaj Zelenik
 *
 * Five, not six. "Hitra in učinkovita izvedba" was removed: it says the same
 * thing as "Dogovorjeni roki" from the other end, and it is the one claim in
 * the set that the company cannot actually be held to on a building site.
 * ---------------------------------------------------------------------- */

export const whyCards: ReadonlyArray<{
  icon: LucideIcon;
  title: string;
  body: string;
}> = [
  {
    icon: History,
    title: "Z vami že od leta 2000",
    body: "Izkušnje gradimo z delom na različnih vrstah objektov in projektov.",
  },
  {
    icon: ClipboardCheck,
    title: "Strokovno svetovanje",
    body: "Pred izvedbo skupaj pregledamo možnosti in uskladimo rešitev glede na objekt.",
  },
  {
    icon: BadgeCheck,
    title: "Kakovostna izvedba",
    body: "Dela izvajamo premišljeno, urejeno in skladno z dogovorjenim obsegom.",
  },
  {
    icon: CalendarCheck,
    title: "Dogovorjeni roki",
    body: "Termin in potek del uskladimo vnaprej, da veste, kaj lahko pričakujete.",
  },
  {
    icon: Workflow,
    title: "Več storitev pri enem izvajalcu",
    body: "Elektroinštalacije, mreže, varnostni sistemi, toplotne črpalke, servis in svetovanje na enem mestu.",
  },
];

/* -------------------------------------------------------------------------
 * Postopek
 * No response times and no guarantees: neither is verified.
 * ---------------------------------------------------------------------- */

export const processSteps: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: "Povpraševanje",
    body: "Opišite, kaj potrebujete, in dodajte osnovne podatke o objektu.",
  },
  {
    title: "Dogovor in ogled",
    body: "Uskladimo prvi pogovor in se po potrebi dogovorimo za ogled.",
  },
  {
    title: "Izvedba",
    body: "Dela izvedemo v dogovorjenem obsegu in usklajenem terminu.",
  },
  {
    title: "Zaključek",
    body: "Preverimo dogovorjena dela in predamo potrebne informacije.",
  },
];

/* -------------------------------------------------------------------------
 * Reference
 *
 * The first three projects from content/references.ts, shown as one card each.
 * A project with several photographs contributes its cover here and its full
 * gallery on /reference; the homepage never splits one building across more
 * than one card.
 * ---------------------------------------------------------------------- */

export type { ReferenceProject } from "@/content/references";

export const references = homeReferences;
