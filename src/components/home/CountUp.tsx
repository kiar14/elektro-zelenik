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
} from "@/lib/motion";

/**
 * Gives every metric in the strip one shared progress value and one shared
 * ScrollTrigger. This guarantees that all four counters begin on the same
 * frame, regardless of where their individual text nodes sit in the viewport.
 *
 * The columns fade up on that same trigger, slightly ahead of the counting, so
 * the strip arrives as one object rather than as four numbers that were already
 * there. Their travel is deliberately shorter than the page's standard reveal:
 * this band sits directly under the hero and a full-height rise here would
 * read as a second, competing entrance.
 *
 * The tween writes straight to `textContent` through a ref, no React state,
 * so no re-render per frame. The final value is also rendered server-side and
 * exposed to assistive technology, while the animating text is hidden from it:
 * a screen reader hears "1.500+" once, never the intermediate counts.
 *
 * Slovenian formatting throughout: `.` groups thousands, `,` is the decimal
 * separator.
 */
export function CountUpGroup({
  metrics,
  children,
  className,
}: {
  metrics: ReadonlyArray<{
    value: number;
    decimals?: number;
    suffix?: string;
  }>;
  children: ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const columns = root.querySelectorAll<HTMLElement>("[data-trust-column]");

    if (prefersReducedMotion()) {
      gsap.set(columns, { opacity: 1 });
      finishReveal(columns);
      return;
    }

    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-trust-counter]"),
    );
    if (nodes.length !== metrics.length) return;

    // Slovenian CLDR does not group four-digit numbers, so `1500` would come
    // back as "1500" and drift from the server-rendered "1.500+". Grouping is
    // forced so the animated value and the accessible one always agree.
    const format = (value: number, index: number) => {
      const metric = metrics[index];
      const decimals = metric.decimals ?? 0;

      return (
        value.toLocaleString("sl-SI", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
          useGrouping: "always",
        }) + (metric.suffix ?? "")
      );
    };

    const progress = { value: 0 };
    nodes.forEach((node, index) => {
      node.textContent = format(0, index);
    });

    /**
     * From `lg` up this strip is not a scroll target at all: the stylesheet
     * sizes header + hero + strip to exactly 100svh, so it is part of the first
     * screen and is already on show when the page paints. Hung off a scroll
     * trigger it would sit blank at nought until the visitor happened to move
     * the page, which is the one thing a set of credibility figures must not
     * do. Measured rather than assumed from a breakpoint, because what decides
     * this is whether the strip is actually in view, not how wide the window is.
     */
    const inViewOnLoad =
      root.getBoundingClientRect().top < window.innerHeight * 0.9;

    const context = gsap.context(() => {
      const timeline = gsap.timeline(
        inViewOnLoad
          ? // Held back just long enough to land after the hero copy, so the
            // first screen resolves top to bottom rather than all at once.
            { delay: 0.55 }
          : { scrollTrigger: { trigger: root, start: "top 90%", once: true } },
      );

      timeline.fromTo(
        columns,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: EASE.smooth,
          stagger: 0.06,
          onStart: () => beginAnimating(columns),
          onComplete: () => finishReveal(columns),
        },
        0,
      );

      /**
       * Counting is longer than the fade and starts underneath it, so the last
       * digits are still settling once the strip itself has arrived. `glide`
       * rather than an expo curve: an expo counter spends most of its run on
       * the final value and barely reads as counting at all.
       */
      timeline.to(
        progress,
        {
          value: 1,
          duration: 1.9,
          ease: EASE.glide,
          onUpdate: () => {
            nodes.forEach((node, index) => {
              node.textContent = format(
                metrics[index].value * progress.value,
                index,
              );
            });
          },
        },
        0.12,
      );
    }, root);

    return () => {
      endAnimating(columns);
      context.revert();
    };
  }, [metrics]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}

/** Server-rendered final value with a client-animation target beside it. */
export function CountUp({ formatted }: { formatted: string }) {
  return (
    <>
      {/* Announced once, in its final form. */}
      <span className="sr-only">{formatted}</span>
      <span data-trust-counter aria-hidden>
        {formatted}
      </span>
    </>
  );
}
