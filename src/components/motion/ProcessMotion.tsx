"use client";

import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";

import {
  beginAnimating,
  endAnimating,
  finishReveal,
  EASE,
  gsap,
  prefersReducedMotion,
  REVEAL,
} from "@/lib/motion";

/**
 * The process timeline's one ScrollTrigger.
 *
 * Sequence: the hairline draws left to right, then each step arrives in turn,
 * marker and its copy together, because they are one thing. The markers pick up
 * a little scale as they land — they are what the eye follows along the rule,
 * so they get the emphasis and the copy stays quiet. No bounce, no spring, no
 * loop; it runs once and never replays.
 *
 * Children stay server components. The hidden states live in CSS so nothing
 * flashes before hydration and so `<noscript>` can override them.
 */
export function ProcessMotion({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const line = root.querySelector<HTMLElement>("[data-process-line]");
    const steps = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const markers = root.querySelectorAll<HTMLElement>("[data-process-marker]");

    if (prefersReducedMotion()) {
      if (line) gsap.set(line, { clearProps: "transform" });
      gsap.set(steps, { opacity: 1 });
      finishReveal(steps);
      gsap.set(markers, { clearProps: "transform" });
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
        onStart: () => beginAnimating(steps),
        onComplete: () => finishReveal(steps),
      });

      if (line) {
        // Symmetric curve: this is a rule being drawn across the section, not
        // an object arriving at a resting place.
        timeline.to(line, {
          scaleX: 1,
          duration: 0.95,
          ease: EASE.settle,
        });
      }

      timeline.fromTo(
        steps,
        { opacity: 0, y: REVEAL.y },
        {
          opacity: 1,
          y: 0,
          duration: REVEAL.duration,
          ease: REVEAL.ease,
          stagger: 0.13,
        },
        // Overlapped, so the steps begin landing while the rule is still
        // travelling and the two read as one gesture rather than two.
        line ? "-=0.5" : 0,
      );

      timeline.fromTo(
        markers,
        { scale: 0.86 },
        {
          scale: 1,
          duration: 0.85,
          ease: EASE.smooth,
          stagger: 0.13,
          clearProps: "transform",
        },
        "<",
      );
    }, root);

    return () => {
      endAnimating(steps);
      context.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
