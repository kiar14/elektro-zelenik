import type { FaqItem, ProcessStep, ServiceSection } from "@/content/services";

/**
 * Sončne elektrarne.
 *
 * A confirmed principal activity with its own top-level route, kept separate
 * from the seven Storitve rather than becoming an eighth card.
 *
 * Deliberately absent: system sizes, output figures, savings, payback periods,
 * return on investment and any promise about paperwork or approvals. None of it
 * is documented anywhere for this company, and all of it depends on the
 * building. Where a visitor would expect a number, this copy says what the
 * number depends on instead.
 */

export const solarHero = {
  eyebrow: "Sončne elektrarne",
  title: "Sončne elektrarne za stanovanjske in poslovne objekte",
  lead: "Montaža fotovoltaičnih sistemov, od ogleda objekta in izbire postavitve do izvedbe in priklopa.",
  image: "/images/marketing/soncna-elektrarna.png",
  alt: "Enodružinska hiša s sončno elektrarno na strehi ob sončnem zahodu.",
} as const;

export const solarIntro: readonly ServiceSection[] = [
  {
    title: "Komu je namenjena",
    body: "Sončna elektrarna je smiselna tam, kjer je streha primerno usmerjena in kjer se električna energija tudi dejansko porablja. Oboje se preveri na objektu, ne po telefonu.",
    bullets: [
      "Stanovanjski objekti",
      "Poslovni objekti",
      "Gospodarski in kmetijski objekti",
    ],
  },
  {
    title: "Kaj vpliva na izbiro sistema",
    body: "Kakšen sistem je za objekt primeren, določi nekaj stvari, ki jih ni mogoče oceniti na daljavo.",
    body2:
      "Zato pri sončnih elektrarnah ne navajamo vnaprejšnjih velikosti in številk. Konkreten predlog nastane po ogledu, ko so ti podatki znani.",
    bullets: [
      "Usmerjenost in naklon strehe",
      "Razpoložljiva površina brez senčenja",
      "Stanje strešne kritine",
      "Obstoječa elektroinštalacija in elektro omarica",
      "Vaša dejanska poraba električne energije",
    ],
  },
];

export const solarProcess: readonly ProcessStep[] = [
  {
    title: "Povpraševanje",
    body: "Poveste, za kakšen objekt gre in kaj načrtujete.",
  },
  {
    title: "Ogled objekta",
    body: "Pregledamo streho, razpoložljivo površino in obstoječo elektroinštalacijo.",
  },
  {
    title: "Predlog in ponudba",
    body: "Na podlagi ogleda pripravimo predlog postavitve in ponudbo.",
  },
  {
    title: "Montaža",
    body: "Izvedemo montažo konstrukcije in modulov ter napeljavo do elektro omarice.",
  },
  {
    title: "Priklop in predaja",
    body: "Izvedemo električni priklop, sistem zaženemo in ga predamo.",
  },
];

export const solarConsumption: readonly ServiceSection[] = [
  {
    title: "Poraba in proizvodnja",
    body: "Sončna elektrarna proizvaja takrat, ko je sonce, in največ takrat, ko marsikoga ni doma. Koliko od proizvedenega dejansko porabite sami, je odvisno od tega, kdaj v dnevu se v objektu porablja največ.",
    body2:
      "Zato je pri ogledu koristno vedeti, kako objekt uporabljate: kdaj so v pogonu večji porabniki, ali se ogrevanje ali priprava tople vode napaja z elektriko in kaj se v prihodnje še načrtuje.",
  },
];

export const solarFaq: readonly FaqItem[] = [
  {
    question: "Kako velika sončna elektrarna je primerna za moj objekt?",
    answer:
      "Tega ne moremo povedati vnaprej. Odvisno je od strehe, razpoložljive površine brez senčenja in vaše dejanske porabe. Predlog pripravimo po ogledu objekta.",
  },
  {
    question: "Ali izvedete tudi električni priklop?",
    answer:
      "Da. Elektroinštalacije so naša osnovna dejavnost, zato montaža in električni priklop nista ločeni storitvi in za to ni treba iskati dodatnega izvajalca.",
  },
  {
    question: "Ali je sončna elektrarna smiselna na obstoječem objektu?",
    answer:
      "Pogosto je, vendar je odvisno od stanja strehe in obstoječe elektroinštalacije. Oboje pregledamo ob ogledu in vam povemo, kaj je izvedljivo.",
  },
  {
    question: "Koliko bom prihranil in v kolikšnem času se naložba povrne?",
    answer:
      "Takih izračunov vnaprej ne navajamo, ker so odvisni od objekta, porabe in cen energije. Konkretne številke dobite skupaj s ponudbo, ko objekt poznamo.",
  },
];
