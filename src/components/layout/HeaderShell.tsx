"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Sticky shell for the header.
 *
 * A one-pixel sentinel at the top of the document is observed rather than
 * listening to scroll, so nothing runs per frame and no continuous value is
 * held in React state. The only thing that changes is a boolean data attribute
 * the stylesheet reacts to.
 *
 * Children are server components, passing them through as `children` keeps the
 * navigation markup out of the client bundle.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting),
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Height-neutral: the negative margin cancels the sentinel's own pixel. */}
      <div ref={sentinelRef} aria-hidden className="-mb-px h-px" />
      {/* `sticky` is a positioned value, so this element is also the containing
          block for the full-width services panel that drops below it. */}
      <header
        data-scrolled={scrolled ? "" : undefined}
        className="site-header sticky top-0 z-50 bg-ground"
      >
        {children}
      </header>
    </>
  );
}
