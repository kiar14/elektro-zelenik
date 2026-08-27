"use client";

import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";

import {
  beginAnimating,
  endAnimating,
  finishReveal,
  gsap,
  prefersReducedMotion,
  REVEAL,
} from "@/lib/motion";

/**
 * Wraps a block of server-rendered markup and reveals its `[data-reveal]`
 * descendants once, on a single ScrollTrigger.
 *
 * One trigger per group rather than one per element, that is what keeps the
 * page from accumulating dozens of triggers. Children stay server components:
 * they are passed straight through as `children`, so none of their markup ends
 * up in the client bundle.
 *
 * The hidden state lives in CSS (`[data-reveal]`), which is what a `<noscript>`
 * rule in the root layout can override when script never runs.
 */
export function RevealGroup({
  children,
  className,
  stagger = REVEAL.stagger,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    if (targets.length === 0) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1 });
      finishReveal(targets);
      return;
    }

    const context = gsap.context(() => {
      /**
       * `fromTo`, not `to`. With `to`, GSAP reads the start values off the
       * computed style at the moment the trigger fires — which on a fast scroll
       * can be a frame where the element is already partway through a resize or
       * a font swap, and the group then starts from subtly different offsets.
       * Stating both ends makes every element in every group travel the same
       * distance regardless of when it is caught.
       */
      gsap.fromTo(
        targets,
        { opacity: 0, y: REVEAL.y },
        {
          opacity: 1,
          y: 0,
          duration: REVEAL.duration,
          ease: REVEAL.ease,
          stagger,
          onStart: () => beginAnimating(targets),
          // Releases the hidden state and drops the inline transform, in that
          // order and in one frame. See finishReveal.
          onComplete: () => finishReveal(targets),
          scrollTrigger: { trigger: root, start: REVEAL.start, once: true },
        },
      );
    }, root);

    return () => {
      endAnimating(targets);
      context.revert();
    };
  }, [stagger]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
