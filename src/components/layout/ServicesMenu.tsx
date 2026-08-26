"use client";

import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { Container } from "@/components/layout/Container";
import { NavLink, useIsActive } from "@/components/layout/NavLink";
import { serviceGroups, type NavItem } from "@/content/navigation";

/**
 * The desktop services disclosure.
 *
 * The panel spans the full header width so it can never overflow the viewport,
 * and it stays in the server-rendered HTML (hidden) so every service link is
 * crawlable. Opening is click/Enter/Space or ArrowDown; Escape closes and
 * returns focus to the trigger; moving focus or pointing outside also closes.
 */
export function ServicesMenu({ item }: { item: NavItem }) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { isExact, isWithinSection } = useIsActive(item.href);

  // Close on navigation by adjusting state during render rather than in an
  // effect, so no extra render pass is scheduled.
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (renderedPathname !== pathname) {
    setRenderedPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const close = () => setOpen(false);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      triggerRef.current?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const menu = item.menu ?? [];
  const groups = serviceGroups.filter((group) =>
    menu.some((service) => service.group === group.id),
  );

  return (
    <li
      ref={rootRef}
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
          setOpen(true);
          requestAnimationFrame(() => {
            panelRef.current?.querySelector("a")?.focus();
          });
        }}
        className="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap px-1 text-[0.875rem] font-medium text-ink-muted transition-colors duration-150 ease-standard hover:text-ink aria-expanded:text-ink data-active:text-ink 2xl:text-sm"
      >
        {item.label}
        <ChevronDown
          aria-hidden
          className="size-4 transition-transform duration-200 ease-standard"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        />
      </button>

      <div
        id={panelId}
        ref={panelRef}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-border bg-ground shadow-raised"
      >
        <Container width="wide">
          <div className="grid grid-cols-3 gap-x-10 gap-y-8 py-9">
            {groups.map((group) => (
              <ServiceGroup
                key={group.id}
                label={group.label}
                services={menu.filter((service) => service.group === group.id)}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </div>
        </Container>
      </div>
    </li>
  );
}

function ServiceGroup({
  label,
  services,
  onNavigate,
}: {
  label: string;
  services: NavItem["menu"];
  onNavigate: () => void;
}) {
  const labelId = useId();

  return (
    <div>
      <p
        id={labelId}
        className="border-b border-border pb-2.5 text-eyebrow font-semibold uppercase text-ink-muted"
      >
        {label}
      </p>
      <ul aria-labelledby={labelId} className="mt-3">
        {services?.map((service) => (
          <li key={service.href}>
            <NavLink
              href={service.href}
              onClick={onNavigate}
              className="flex min-h-11 items-center text-sm text-ink-muted transition-colors duration-150 ease-standard hover:text-brand-strong"
              activeClassName="text-ink"
            >
              {service.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
