"use client";

import { SplitText } from "gsap/SplitText";
import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";

import { EASE, gsap, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(SplitText);

/**
 * If the fonts have not settled by this point the entrance runs anyway. The
 * heading would split against the fallback metrics and land on the wrong line
 * breaks, so in that case it is animated whole rather than by line — a worse
 * entrance is still enormously better than a hero that stays blank because a
 * font never arrived.
 */
const FONT_WAIT_MS = 900;

/**
 * The hero entrance.
 *
 * The heading arrives a line at a time from behind its own baseline, and the
 * eyebrow, the rule, the lead and the two actions come in around it. It is one
 * timeline, so the relationships between those parts are fixed rather than
 * being four independent delays that drift apart on a slow machine.
 *
 * This runs on mount rather than on a ScrollTrigger: the hero is already in
 * view. It runs exactly once — there is no scroll position, no navigation and
 * no re-render that can replay it.
 *
 * Everything animated here is server-rendered. This component contributes the
 * timeline and nothing else; the heading, the copy and both calls to action are
 * passed straight through as `children` and never wait on hydration to exist.
 */
export function HeroReveal({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const heading = root.querySelector<HTMLElement>("[data-hero-title]");
    const rule = root.querySelector<HTMLElement>("[data-hero-rule]");
    const items = root.querySelectorAll<HTMLElement>("[data-hero-item]");

    // The stylesheet hides the copy so nothing flashes before this runs. Under
    // reduced motion there is no entrance to run, so simply hand it back.
    if (prefersReducedMotion()) {
      gsap.set([heading, rule, ...items].filter(Boolean), {
        opacity: 1,
        clearProps: "transform",
      });
      return;
    }

    let split: SplitText | null = null;
    let started = false;
    let cancelled = false;
    /**
     * Whether the heading has finished arriving — not whether it has begun.
     *
     * `autoSplit` re-cuts the lines whenever the metrics change, and the first
     * such re-cut normally lands a beat after mount, when the web font replaces
     * the fallback. Keyed off "has begun", that re-cut would arrive mid-flight
     * and slam the heading to its final position, which is the entrance simply
     * not happening. Keyed off "has finished", a font swap restarts the reveal
     * cleanly and only a genuine later resize skips it.
     */
    let entranceComplete = false;
    let timer = 0;

    const build = () => {
      const timeline = gsap.timeline({
        defaults: { ease: EASE.smooth, duration: 1.1 },
      });

      // The brand rule draws out from its left edge; it is the first thing
      // that moves, and it is what the eyebrow appears to hang off.
      if (rule) {
        timeline.fromTo(
          rule,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: EASE.settle },
          0,
        );
      }

      /**
       * Lines, not words or characters. A house is a calm subject and the
       * company sells reliability; letters flying in individually would be
       * selling something else. Each line rises out of a mask sized to it, so
       * the type appears from behind its own edge rather than sliding over
       * the photograph.
       */
      if (heading) {
        split = SplitText.create(heading, {
          type: "lines",
          mask: "lines",
          linesClass: "hero-line",
          autoSplit: true,
          onSplit: (self) => {
            /**
             * The heading sets `line-height: 1.06`, which is tighter than the
             * font's own descent — so the line box stops a few pixels above the
             * bottom of the "j" in Elektroinštalacije and the "g" in
             * energetske. A mask clipped to that box shears those tails off for
             * the whole of the reveal.
             *
             * `overflow-clip-margin` widens the clip region without touching
             * layout, which padding and a compensating negative margin cannot
             * quite manage: that pairing leaves the heading a few pixels taller
             * than it was, and this hero's vertical composition is measured.
             * Where it is unsupported the reveal simply clips as it would have
             * anyway — the landed state is identical either way.
             */
            self.masks.forEach((mask) => {
              (mask as HTMLElement).style.overflowClipMargin = "0.16em";
            });

            gsap.set(heading, { opacity: 1 });

            // Already landed: this is a resize, not a re-entrance.
            if (entranceComplete) {
              return gsap.set(self.lines, { yPercent: 0, opacity: 1 });
            }

            // Returned, not just created. GSAP tracks the animation an
            // `onSplit` returns and reverts it before the next re-cut, so a
            // font swap cannot leave a half-finished tween writing to lines
            // that no longer exist.
            return gsap.fromTo(
              self.lines,
              { yPercent: 108, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 1.15,
                ease: EASE.smooth,
                stagger: 0.11,
                onComplete: () => {
                  entranceComplete = true;
                  gsap.set(self.lines, { clearProps: "will-change" });
                },
              },
            );
          },
        });
      }

      if (items.length > 0) {
        timeline.fromTo(
          items,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.09,
            clearProps: "transform",
          },
          0.45,
        );
      }
    };

    // The context exists to own the split and the entrance timeline, both of
    // which are added to it below once the fonts have resolved. There is no
    // scroll-linked motion on the hero: the copy simply scrolls away with the
    // photograph, which is the correct behaviour and one less thing running
    // per frame.
    const context = gsap.context(() => {}, root);

    /**
     * `context.add` rather than a bare call. Everything here runs a tick or
     * more after mount, by which point `gsap.context` has stopped collecting
     * automatically — a timeline created out here would escape the context and
     * survive the cleanup below. In React's development double-mount that means
     * a second SplitText cutting an already-cut heading, and four line elements
     * where the design has two. Adding it to the context puts the deferred work
     * back under the same ownership as everything created synchronously.
     */
    const run = () => {
      if (cancelled || started) return;
      started = true;
      window.clearTimeout(timer);
      context.add(build);
    };

    // Split against the real metrics if they are ready in time, and against
    // whatever is available if they are not.
    if (document.fonts?.status === "loaded") run();
    else {
      void document.fonts?.ready.then(run);
      timer = window.setTimeout(run, FONT_WAIT_MS);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      // Before the context: reverting the split puts the original heading text
      // back, so the context has real elements to clear its tweens off.
      split?.revert();
      context.revert();
    };
  }, []);

  return (
    // `data-surface="photo"` inverts the focus ring for everything inside: the
    // brand green is invisible against the photograph at every width.
    <div ref={rootRef} data-surface="photo" className="hero-copy @container">
      {children}
    </div>
  );
}
