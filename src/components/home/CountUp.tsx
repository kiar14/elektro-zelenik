"use client";

import { useLayoutEffect, useRef } from "react";

import { gsap, prefersReducedMotion } from "@/lib/motion";

/**
 * Counts a metric up once, when the strip reaches the viewport.
 *
 * The tween writes straight to `textContent` through a ref, no React state,
 * so no re-render per frame. The final value is also rendered server-side and
 * exposed to assistive technology, while the animating text is hidden from it:
 * a screen reader hears "1.500+" once, never the intermediate counts.
 *
 * Slovenian formatting throughout: `.` groups thousands, `,` is the decimal
 * separator.
 */
export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  formatted,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  /** The finished string, rendered on the server and read by screen readers. */
  formatted: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) return;

    // Slovenian CLDR does not group four-digit numbers, so `1500` would come
    // back as "1500" and drift from the server-rendered "1.500+". Grouping is
    // forced so the animated value and the accessible one always agree.
    const format = (n: number) =>
      n.toLocaleString("sl-SI", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: "always",
      }) + suffix;

    const counter = { current: 0 };
    node.textContent = format(0);

    const context = gsap.context(() => {
      gsap.to(counter, {
        current: value,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          node.textContent = format(counter.current);
        },
        scrollTrigger: { trigger: node, start: "top 90%", once: true },
      });
    }, node);

    return () => context.revert();
  }, [value, decimals, suffix]);

  return (
    <>
      {/* Announced once, in its final form. */}
      <span className="sr-only">{formatted}</span>
      <span ref={ref} aria-hidden>
        {formatted}
      </span>
    </>
  );
}
