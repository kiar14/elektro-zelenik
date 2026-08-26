import { IBM_Plex_Sans, Inter } from "next/font/google";

/**
 * `latin-ext` is required, it carries č/š/ž (and Č/Š/Ž) for Slovenian.
 * Only the weights the design actually uses are loaded.
 */
export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});
