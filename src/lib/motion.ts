"use client";

import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One registration point for GSAP. `registerPlugin` is idempotent, so importing
 * from here means every consumer gets ScrollTrigger without any of them having
 * to remember to register it.
 */
gsap.registerPlugin(CustomEase, ScrollTrigger);

/**
 * The curves, defined once, in both languages.
 *
 * Every name below exists twice: as a GSAP ease registered here and as a CSS
 * custom property in globals.css, built from the identical control points. A
 * hover handled by CSS and a reveal handled by GSAP therefore decelerate along
 * exactly the same curve, which is what stops the page from feeling like two
 * motion systems bolted together.
 *
 * CustomEase takes the same four control points as `cubic-bezier()`, written as
 * an SVG path: `cubic-bezier(x1,y1,x2,y2)` is `M0,0 C{x1},{y1} {x2},{y2} 1,1`.
 */
CustomEase.create("smooth", "M0,0 C0.16,1 0.3,1 1,1"); //  ease-out-expo
CustomEase.create("glide", "M0,0 C0.33,1 0.68,1 1,1"); //  ease-out-cubic
CustomEase.create("settle", "M0,0 C0.65,0 0.35,1 1,1"); // ease-in-out-cubic

export const EASE = {
  /** Leaves fast, lands long. The default for anything arriving on screen. */
  smooth: "smooth",
  /** Gentler entry than `smooth`; for longer travel, where expo reads abrupt. */
  glide: "glide",
  /** Symmetric. For something drawing across the page rather than arriving. */
  settle: "settle",
} as const;

export { gsap, ScrollTrigger };

/** Single source of truth for the reduced-motion query. */
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * The one motion vocabulary used below the hero: an opacity rise with a little
 * travel, once. The hero is the signature sequence and nothing down here
 * competes with it — but the curve is shared, so the page reads as one piece.
 */
export const REVEAL = {
  duration: 0.9,
  y: 20,
  ease: EASE.smooth,
  stagger: 0.07,
  start: "top 85%",
} as const;

/**
 * Marks a set of elements as actively animating.
 *
 * Two jobs, both about smoothness. It promotes the elements for the duration of
 * the tween and drops the hint afterwards, so a page holding two dozen reveal
 * targets never holds two dozen permanent compositor layers. And it suppresses
 * CSS transitions while GSAP is writing transforms every frame — without this,
 * a card that declares `transition: transform 300ms` for its hover state makes
 * the browser re-interpolate every single frame GSAP produces, and the reveal
 * arrives visibly late and soft.
 *
 * The class is only ever added by script, so no-script rendering is unaffected.
 */
const ANIMATING_CLASS = "is-animating";

/**
 * Marks a set of elements as having landed.
 *
 * This is what releases the hidden state. Those states are written as
 * `[data-reveal]:not(.is-revealed)`, so the rule stops matching the moment this
 * class is added — which is the only reason the inline transform can safely be
 * dropped on the next line.
 *
 * Dropping it matters: an inline `transform` left on a card outranks the
 * `hover:-translate-y-1` these cards declare in CSS, and the lift would simply
 * never happen. Clearing it without releasing the hidden state first is worse
 * still — the CSS offset reasserts itself and every card snaps back down the
 * full travel distance on the frame it finishes arriving.
 */
const REVEALED_CLASS = "is-revealed";

function toArray(targets: Element | Element[] | NodeListOf<Element>) {
  return targets instanceof Element ? [targets] : Array.from(targets);
}

export function beginAnimating(
  targets: Element | Element[] | NodeListOf<Element>,
) {
  toArray(targets).forEach((node) => node.classList.add(ANIMATING_CLASS));
}

export function endAnimating(
  targets: Element | Element[] | NodeListOf<Element>,
) {
  toArray(targets).forEach((node) => node.classList.remove(ANIMATING_CLASS));
}

/**
 * Release the hidden state, drop the compositor hint, then drop the transform.
 * The order is the whole point, and all three happen in one frame, so nothing
 * is ever painted in between.
 */
export function finishReveal(
  targets: Element | Element[] | NodeListOf<Element>,
) {
  const list = toArray(targets);
  list.forEach((node) => {
    node.classList.add(REVEALED_CLASS);
    node.classList.remove(ANIMATING_CLASS);
  });
  gsap.set(list, { clearProps: "transform,translate,rotate,scale" });
}
