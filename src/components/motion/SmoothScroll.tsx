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
      lerp: 0.08,
      wheelMultiplier: 0.85,
      // Damping a finger drag feels worse than native, so leave touch alone.
      syncTouch: false,
    });

    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);

    // Lenis expects milliseconds; the GSAP ticker reports seconds.
    const step = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(step);
    gsap.ticker.lagSmoothing(0);

    // Layout settles after fonts and images land; triggers need the final one.
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", update);
      gsap.ticker.remove(step);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return null;
}
