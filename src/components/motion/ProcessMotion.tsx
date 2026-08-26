"use client";

import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";

import { gsap, prefersReducedMotion, REVEAL } from "@/lib/motion";

/**
 * The process timeline's one ScrollTrigger.
 *
 * Sequence: the hairline draws left to right, then each step arrives in turn,
 * marker and its copy together, because they are one thing. No bounce, no
 * spring, no loop; it runs once and never replays.
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

    if (prefersReducedMotion()) {
      if (line) gsap.set(line, { clearProps: "transform" });
      gsap.set(steps, { opacity: 1, y: 0 });
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });

      if (line) {
        timeline.to(line, {
          scaleX: 1,
          duration: 0.7,
          ease: "power2.inOut",
        });
      }

      timeline.to(
        steps,
        {
          opacity: 1,
          y: 0,
          duration: REVEAL.duration,
          ease: REVEAL.ease,
          stagger: 0.12,
        },
        line ? "-=0.35" : 0,
      );
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
