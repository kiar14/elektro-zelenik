"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One registration point for GSAP. `registerPlugin` is idempotent, so importing
 * from here means every consumer gets ScrollTrigger without any of them having
 * to remember to register it.
 */
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Single source of truth for the reduced-motion query. */
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * The one motion vocabulary used below the hero: a short opacity rise with a
 * little travel, once. The hero's illumination is the signature animation and
 * nothing down here competes with it.
 */
export const REVEAL = {
  duration: 0.6,
  y: 12,
  ease: "power2.out",
  stagger: 0.06,
  start: "top 85%",
} as const;
