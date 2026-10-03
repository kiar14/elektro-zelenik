import localFont from "next/font/local";

/**
 * Self-hosted rather than `next/font/google`: the Google build step broke on
 * Vercel when Google served font URLs carrying their own query string
 * ("next/font/google queries have exactly one entry"). Local files make the
 * build independent of whatever the Google Fonts API returns that day.
 *
 * The files in `src/fonts/` are the Google Fonts releases (Inter v20, IBM
 * Plex Sans v23), subset to Latin + Latin Extended, which carries č/š/ž
 * (and Č/Š/Ž) for Slovenian. All OpenType features are kept, including
 * Inter's `tnum` for `tabular-nums` (Plex figures are tabular by default).
 * Only the weights the design actually uses are included.
 */
export const inter = localFont({
  src: [
    { path: "../fonts/inter-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/inter-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/inter-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const ibmPlexSans = localFont({
  src: [
    { path: "../fonts/ibmplexsans-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/ibmplexsans-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});
