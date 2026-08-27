"use client";

import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { NavLink } from "@/components/layout/NavLink";
import { ActionLink } from "@/components/ui/ActionLink";
import { company } from "@/content/company";
import {
  allServicesLink,
  headerCta,
  headerPhone,
  primaryNav,
} from "@/content/navigation";

/**
 * The narrow-viewport navigation.
 *
 * A full-height sheet rather than the desktop menu stacked vertically: the
 * destinations are set at display size with hairlines between them, the seven
 * services stay folded away behind an accordion until they are asked for, and
 * the phone number and the enquiry action sit together in a fixed footer, where
 * a thumb reaches them without scrolling.
 *
 * Built on a native modal `<dialog>`, which gives focus containment, Escape to
 * close and focus restoration to the trigger without a hand-rolled focus trap.
 * Focus return is also done explicitly so behaviour is identical in every
 * browser.
 */
export function MobileNav() {
  const dialogId = useId();
  const servicesId = useId();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  /**
   * Folded by default, which is the point of the accordion. The exception is
   * arriving from inside the section: on a service page the visitor is already
   * in Storitve, so showing the seven open is orientation rather than clutter.
   */
  const [servicesOpen, setServicesOpen] = useState(() =>
    pathname.startsWith("/storitve"),
  );

  // Close on navigation, including browser back/forward, by adjusting state
  // during render rather than in an effect, so no extra pass is scheduled.
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (renderedPathname !== pathname) {
    setRenderedPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();

    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const dismiss = () => {
      setOpen(false);
      triggerRef.current?.focus();
    };

    /**
     * Escape is handled here as well as through the `close` event below.
     *
     * The native dialog closes itself on Escape and then fires `close`, which
     * would be enough on its own. But that event is queued on a task source a
     * browser is free to starve, and if it is ever delayed the sheet would be
     * gone from the screen while React still believed it was open: the trigger
     * would keep announcing `aria-expanded="true"`, the document would stay
     * scroll-locked and focus would sit nowhere. Handling the key directly puts
     * the state change on the same tick as the dismissal.
     */
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };

    dialog.addEventListener("keydown", onKeyDown);
    dialog.addEventListener("close", dismiss);
    return () => {
      dialog.removeEventListener("keydown", onKeyDown);
      dialog.removeEventListener("close", dismiss);
    };
  }, []);

  const services = primaryNav.find((item) => item.menu)?.menu ?? [];
  const directLinks = primaryNav.filter((item) => !item.menu);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={dialogId}
        aria-label="Odpri meni"
        onClick={() => setOpen(true)}
        className="inline-flex size-11 items-center justify-center rounded-sm border border-border-strong text-ink transition-colors duration-150 ease-standard hover:bg-surface xl:hidden"
      >
        <Menu aria-hidden className="size-5" />
      </button>

      <dialog
        id={dialogId}
        ref={dialogRef}
        aria-label="Glavni meni"
        className="mobile-nav m-0 h-dvh max-h-none w-full max-w-none bg-ground text-ink"
      >
        <div className="flex h-full flex-col">
          <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-2.5">
            <BrandLogo className="-ml-0.5" />
            <button
              type="button"
              aria-label="Zapri meni"
              onClick={() => setOpen(false)}
              className="inline-flex size-11 items-center justify-center rounded-sm border border-border-strong text-ink transition-colors duration-150 ease-standard hover:bg-surface"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>

          <nav
            aria-label="Glavna navigacija"
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5"
            data-lenis-prevent
          >
            <ul>
              <li className="border-b border-border">
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls={servicesId}
                  onClick={() => setServicesOpen((previous) => !previous)}
                  className="flex min-h-[60px] w-full items-center justify-between gap-4 py-2 text-left text-xl font-semibold tracking-[-0.018em] text-ink sm:text-2xl"
                >
                  Storitve
                  <ChevronDown
                    aria-hidden
                    className="size-6 shrink-0 text-brand-strong transition-transform duration-300 ease-smooth motion-reduce:transition-none"
                    style={{
                      transform: servicesOpen ? "rotate(180deg)" : undefined,
                    }}
                  />
                </button>

                {/* Height is animated through the grid track rather than a
                    measured pixel value, so the panel opens to whatever it
                    happens to contain and nothing has to be re-measured. */}
                <div
                  id={servicesId}
                  inert={!servicesOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-smooth motion-reduce:transition-none ${
                    servicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="ml-1 border-l-2 border-brand-tint pb-4 pl-4">
                      <li>
                        <NavLink
                          href={allServicesLink.href}
                          onClick={() => setOpen(false)}
                          className="flex min-h-11 items-center text-base font-semibold text-brand-strong"
                          activeClassName="text-ink"
                        >
                          {allServicesLink.label}
                        </NavLink>
                      </li>

                      {services.map((service) => (
                        <li key={service.href}>
                          <NavLink
                            href={service.href}
                            onClick={() => setOpen(false)}
                            className="flex min-h-11 items-center gap-3 text-base text-ink-muted"
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
                  </div>
                </div>
              </li>

              {directLinks.map((item) => (
                <li key={item.href} className="border-b border-border">
                  <NavLink
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[60px] items-center py-2 text-xl font-semibold tracking-[-0.018em] text-ink-muted sm:text-2xl"
                    activeClassName="text-ink"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <p className="py-6 text-sm text-ink-muted">
              {company.address.full}
            </p>
          </nav>

          <div className="shrink-0 border-t border-border bg-surface px-5 pt-4 pb-5">
            <a
              href={headerPhone.href}
              aria-label={headerPhone.accessibleLabel}
              className="flex min-h-14 items-center gap-3 text-xl font-semibold tracking-[-0.018em] text-ink transition-colors duration-150 ease-standard hover:text-brand-strong"
            >
              <span
                aria-hidden
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-tint"
              >
                <Phone className="size-5 text-brand-strong" strokeWidth={1.8} />
              </span>
              {headerPhone.label}
            </a>

            <ActionLink
              href={headerCta.href}
              variant="solid"
              size="lg"
              onClick={() => setOpen(false)}
              className="mt-3 w-full"
            >
              {headerCta.label}
            </ActionLink>
          </div>
        </div>
      </dialog>
    </>
  );
}
