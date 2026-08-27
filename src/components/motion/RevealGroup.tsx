"use client";

import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";

import { gsap, prefersReducedMotion, REVEAL } from "@/lib/motion";

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
      gsap.set(targets, { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }

    const context = gsap.context(() => {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        clearProps: "transform,translate,rotate,scale",
        duration: REVEAL.duration,
        ease: REVEAL.ease,
        stagger,
        scrollTrigger: { trigger: root, start: REVEAL.start, once: true },
      });
    }, root);

    return () => context.revert();
  }, [stagger]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
