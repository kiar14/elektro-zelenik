"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";

/**
 * Damped wheel scrolling, driven by the GSAP ticker.
 *
 * There is exactly one RAF loop on the page: GSAP's. Lenis is stepped from it
 * rather than running its own, and ScrollTrigger is updated from Lenis' scroll
 * event, so the three stay in lockstep instead of fighting over frames.
 *
 * `syncTouch` is left off, so touch devices keep native scrolling, damping a
 * finger drag feels wrong and costs responsiveness on exactly the devices that
 * can least afford it.
 *
 * Under `prefers-reduced-motion: reduce` Lenis never starts and the browser
 * scrolls natively. The visitor never loses control of the page either way.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      /**
       * Damping is a trade between weight and latency. At 0.08 the wheel felt
       * detached: roughly a third of a second passed between the gesture and
       * the page settling, which reads as lag rather than as smoothness. 0.11
       * keeps the glide but puts the page back under the visitor's hand, and
       * a 1:1 wheel multiplier means one notch still travels one notch.
       */
      lerp: 0.11,
      wheelMultiplier: 1,
      // Damping a finger drag feels worse than native, so leave touch alone.
      syncTouch: false,
    });

    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);

    // Lenis expects milliseconds; the GSAP ticker reports seconds.
    const step = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(step);
    gsap.ticker.lagSmoothing(0);

    /**
     * A mobile browser hiding its URL bar resizes the viewport, and every such
     * resize would otherwise refresh every trigger mid-scroll — a stutter at
     * the exact moment the visitor is moving. Height-only changes are ignored;
     * a real orientation or width change still refreshes.
     */
    ScrollTrigger.config({ ignoreMobileResize: true });

    /**
     * Trigger positions are measured against the layout at the moment they are
     * created, and this page is mostly photographs. Refreshing once on mount
     * measures a document that has not finished growing, which lands every
     * start position too low. Re-measuring after load — and after the fonts
     * settle, which changes heading heights — is what makes sections reveal
     * where they were meant to rather than early or not at all.
     */
    const refresh = () => ScrollTrigger.refresh();
    refresh();

    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });

    void document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      lenis.off("scroll", update);
      gsap.ticker.remove(step);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return null;
}
