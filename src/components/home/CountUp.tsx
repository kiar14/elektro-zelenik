"use client";

import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";

import { gsap, prefersReducedMotion } from "@/lib/motion";

/**
 * Gives every metric in the strip one shared progress value and one shared
 * ScrollTrigger. This guarantees that all four counters begin on the same
 * frame, regardless of where their individual text nodes sit in the viewport.
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
    if (!root || prefersReducedMotion()) return;

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

    const context = gsap.context(() => {
      gsap.to(progress, {
        value: 1,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          nodes.forEach((node, index) => {
            node.textContent = format(
              metrics[index].value * progress.value,
              index,
            );
          });
        },
        scrollTrigger: { trigger: root, start: "top 92%", once: true },
      });
    }, root);

    return () => context.revert();
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
