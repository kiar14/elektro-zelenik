"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { NavLink, useIsActive } from "@/components/layout/NavLink";
import { allServicesLink, services } from "@/content/navigation";

/**
 * The desktop Storitve disclosure.
 *
 * Seven services do not need a mega menu, so this is a compact panel on the
 * warm surface, with one restrained border, the system's only shadow and the
 * 12px radius ceiling. Each row carries the service's own Lucide mark, which is
 * the same mark that identifies it on its card, so the panel is scannable
 * without becoming decorated.
 *
 * The panel is always in the DOM, so every service link is crawlable and the
 * open and close states can be interpolated rather than snapped. `inert` is
 * what keeps the closed panel out of the tab order; opacity alone would leave
 * eight focusable links hidden in the header.
 *
 * The seven records are imported here rather than handed down from the server
 * header. Each one carries its Lucide mark, which is a component, and a
 * component cannot cross the server/client boundary as a prop. Importing the
 * module into this client component puts the icons in the client bundle where
 * they can actually be rendered.
 */

/**
 * How long the panel stays open after the pointer leaves.
 *
 * There is a small gap between the trigger and the panel, and crossing it fires
 * `pointerleave` for a frame or two. Without this delay the panel would close
 * underneath a pointer that was on its way into it, which is the single most
 * common way a dropdown like this feels broken. Entering the panel cancels the
 * timer, so a deliberate exit still closes promptly.
 */
const CLOSE_DELAY_MS = 160;

export function ServicesMenu({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef(0);
  /** Set only by the keyboard path, so a pointer opening the panel never steals
   *  focus out of the page. Consumed by the effect below, once. */
  const focusFirstOnOpen = useRef(false);
  const pathname = usePathname();
  const { isExact, isWithinSection } = useIsActive(href);

  // Close on navigation by adjusting state during render rather than in an
  // effect, so no extra render pass is scheduled.
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (renderedPathname !== pathname) {
    setRenderedPathname(pathname);
    setOpen(false);
  }

  const cancelClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(
      () => setOpen(false),
      CLOSE_DELAY_MS,
    );
  }, [cancelClose]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  /**
   * Move focus into the panel after React has committed the open state.
   *
   * An effect rather than a `requestAnimationFrame` inside the handler: rAF is
   * throttled to a standstill in a background tab, and the link would simply
   * never receive focus there. This runs on the commit that opened the panel,
   * whatever the frame rate.
   */
  useEffect(() => {
    if (!open || !focusFirstOnOpen.current) return;
    focusFirstOnOpen.current = false;
    panelRef.current?.querySelector("a")?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <li
      ref={rootRef}
      className="relative"
      // Mouse only. On a touch-capable desktop a tap also produces a pointer
      // enter, and opening on that would fight the tap that follows it.
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        scheduleClose();
      }}
      onFocus={cancelClose}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        data-active={isExact || isWithinSection ? "" : undefined}
        onClick={() => setOpen((previous) => !previous)}
        onKeyDown={(event) => {
          if (event.key !== "ArrowDown") return;
          event.preventDefault();
          focusFirstOnOpen.current = true;
          setOpen(true);
        }}
        className="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap px-1 text-[0.9375rem] font-medium text-ink-muted transition-colors duration-150 ease-standard hover:text-ink aria-expanded:text-ink data-active:text-ink 2xl:text-sm"
      >
        {label}
        <ChevronDown
          aria-hidden
          className="size-4 transition-transform duration-200 ease-standard"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        />
      </button>

      <div
        id={panelId}
        ref={panelRef}
        inert={!open}
        aria-hidden={!open}
        // The pseudo-element bridges the gap between the trigger and the panel,
        // so a pointer travelling down never crosses dead space.
        className={`absolute top-full left-0 z-10 mt-3 w-[19.5rem] origin-top rounded-lg border border-border bg-ground p-2 shadow-raised transition-[opacity,transform] duration-200 ease-smooth before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-[''] motion-reduce:transition-none ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <ul>
          {services.map((service) => (
            <li key={service.href}>
              <NavLink
                href={service.href}
                onClick={() => setOpen(false)}
                className="group flex min-h-11 items-center gap-3 rounded-sm px-3 text-sm text-ink-muted transition-colors duration-150 ease-standard hover:bg-surface hover:text-ink data-active:bg-brand-tint"
                activeClassName="font-semibold text-ink"
              >
                <service.icon
                  aria-hidden
                  className="size-[18px] shrink-0 text-brand-strong"
                  strokeWidth={1.7}
                />
                {service.title}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-2 border-t border-border pt-2">
          <NavLink
            href={allServicesLink.href}
            onClick={() => setOpen(false)}
            className="group flex min-h-11 items-center justify-between gap-3 rounded-sm px-3 text-sm font-semibold text-brand-strong transition-colors duration-150 ease-standard hover:bg-surface"
            activeClassName="bg-brand-tint"
          >
            {allServicesLink.label}
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-200 ease-smooth group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />
          </NavLink>
        </div>
      </div>
    </li>
  );
}
