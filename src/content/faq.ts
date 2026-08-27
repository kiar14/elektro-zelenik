import type { FaqItem } from "@/content/services";

/**
 * The site-wide FAQ.
 *
 * Ten questions, and every answer is supported by something already on this
 * site: the seven services in `content/services.ts`, the process the homepage
 * and the service pages describe, and the contact details in `content/company`.
 *
 * Nothing here promises a response time, a price, a warranty length, a
 * certification or a deadline, because none of those is documented anywhere in
 * the company's own material. Where the honest answer is "it depends on the
 * building", the answer says so rather than inventing a number.
 *
 * No em dashes in any user-facing string.
 */
export const faqItems: readonly FaqItem[] = [
  {
    question: "Katere elektro storitve izvajate?",
    answer:
      "Izvajamo elektroinštalacije, servisiranje in priklop naprav, računalniške mreže, alarmne sisteme, video nadzor, dobavo in montažo toplotnih črpalk ter svetovanje. Vsaka storitev ima svojo stran z opisom obsega in poteka izvedbe.",
  },
  {
    question: "Ali izvajate elektroinštalacije tudi v obstoječih objektih?",
    answer:
      "Da. Pri obstoječih objektih najprej preverimo trenutno stanje in skupaj določimo, kaj je smiselno ohraniti, zamenjati ali nadgraditi. Kaj je izvedljivo in na kakšen način, se pokaže ob ogledu, zato pred tem rešitve ne obljubljamo.",
  },
  {
    question: "Kdaj je najbolje stopiti v stik pri novogradnji?",
    answer:
      "Čim prej, najbolje še pred zapiranjem sten. Takrat se določijo položaji vtičnic, stikal, razsvetljave in priključkov za naprave, te odločitve pa je pozneje drago spreminjati.",
  },
  {
    question: "Ali pred izvedbo svetujete glede postavitve in izbire rešitev?",
    answer:
      "Da. Svetovanje je del našega dela in je najbolj koristno takrat, ko je odločitev še odprta. Skupaj pregledamo, kje bodo naprave, svetila in drugi porabniki, ter instalacijo pripravimo glede na dejansko uporabo prostorov.",
  },
  {
    question: "Ali izvajate tudi servis in priklop električnih naprav?",
    answer:
      "Da. Prevzemamo priklop električnih naprav, popravila strojev ter namestitev in servis klimatskih naprav. Če naprava ne sodi v ta obseg, vam to povemo takoj.",
  },
  {
    question:
      "Ali izvajate računalniške mreže, alarmne sisteme in video nadzor?",
    answer:
      "Da, vse tri. Napeljavo je najceneje izvesti hkrati z elektroinštalacijami, dokler je še dostopna. Del alarmnih sistemov izvedemo v sodelovanju s poslovnimi partnerji, kar povemo vnaprej.",
  },
  {
    question: "Ali dobavljate in montirate toplotne črpalke?",
    answer:
      "Da. Dobavljamo toplotne črpalke Panasonic ter poskrbimo za montažo, električni priklop in zagon. Katera izvedba je za vaš objekt primerna, opredelimo po ogledu.",
  },
  {
    question: "Kako poteka sodelovanje od povpraševanja do zaključka del?",
    answer:
      "Pošljete povpraševanje z osnovnimi podatki o objektu. Po potrebi se dogovorimo za ogled in uskladimo obseg del. Sledi priprava, nato izvedba v dogovorjenem terminu. Po zaključku del izvedbo preverimo in ostanemo dosegljivi za dodatna vprašanja.",
  },
  {
    question: "Kako lahko pošljem povpraševanje?",
    answer:
      "Izpolnite obrazec na strani Povpraševanje, kjer lahko izberete tudi več storitev hkrati, ali nas pokličite. Za krajše vprašanje je dovolj obrazec na strani Kontakt.",
  },
  {
    question: "Ali si lahko ogledam vaše izvedene projekte?",
    answer:
      "Da. Na strani Izvedeni projekti je izbor objektov, na katerih smo delali, s fotografijami, ki so naše. Kaj natančno je bilo izvedeno na posameznem projektu, vam povemo v pogovoru.",
  },
];
