"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * How long the scene holds unlit once the lit frame is decoded and ready.
 *
 * Tuned against the copy entrance in HeroReveal, which starts on mount and runs
 * for a little over a second. The light begins while the heading is still
 * arriving and finishes well after it has settled, so the first screen reads as
 * one slow event rather than as type, then a pause, then a light.
 */
const SETTLE_PAUSE_MS = 420;

type Phase = "waiting" | "running" | "done";

/**
 * The lit frame of the hero photograph.
 *
 * This is the only client component in the hero. The heading, the copy and both
 * calls to action are server-rendered and never wait on it.
 *
 * The frame is fetched at low priority behind the unlit one, is decoded before
 * it is allowed to matter, holds for a beat, then fades in. It ends in `done`
 * and there is no path back, the sequence cannot replay on scroll, on
 * navigation or on re-render.
 *
 * Under `prefers-reduced-motion: reduce` the stylesheet paints this layer at
 * full opacity from the first frame, so the lit state is simply the state; no
 * JavaScript decision is involved and there is nothing to flash.
 */
export function HeroIlluminationLayer({
  src,
  sizes,
  quality,
}: {
  src: string;
  sizes: string;
  /** Must match the unlit frame exactly, or the two frames would not match. */
  quality: number;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [phase, setPhase] = useState<Phase>("waiting");

  useEffect(() => {
    // Nothing to schedule: the stylesheet already paints this layer at full
    // opacity, so the lit state is present without the sequence ever running.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const image = imageRef.current;
    if (!image) return;

    let cancelled = false;
    let timer = 0;

    const begin = () => {
      if (cancelled) return;
      timer = window.setTimeout(() => {
        if (!cancelled) setPhase("running");
      }, SETTLE_PAUSE_MS);
    };

    // Decoding before starting is what keeps the first frame of the transition
    // from stuttering, and guarantees nothing flashes in half-painted.
    const onReady = () => void image.decode().then(begin, begin);

    if (image.complete && image.naturalWidth > 0) onReady();
    else image.addEventListener("load", onReady, { once: true });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      image.removeEventListener("load", onReady);
    };
  }, []);

  return (
    <Image
      ref={imageRef}
      src={src}
      alt=""
      aria-hidden
      fill
      sizes={sizes}
      quality={quality}
      loading="eager"
      fetchPriority="low"
      data-hero-layer="on"
      data-hero-phase={phase}
      onAnimationEnd={() => setPhase("done")}
      className="hero-frame"
    />
  );
}
