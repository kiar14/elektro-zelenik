"use client";

import { Menu, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { NavLink } from "@/components/layout/NavLink";
import { ActionLink } from "@/components/ui/ActionLink";
import { company } from "@/content/company";
import {
  headerCta,
  headerPhone,
  primaryNav,
  serviceGroups,
} from "@/content/navigation";

/**
 * The narrow-viewport navigation.
 *
 * Built on a native modal `<dialog>`, which gives focus containment, Escape to
 * close and focus restoration to the trigger without a hand-rolled focus trap.
 * Focus return is also done explicitly so behaviour is identical in every
 * browser.
 */
export function MobileNav() {
  const dialogId = useId();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

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

    const onClose = () => {
      setOpen(false);
      triggerRef.current?.focus();
    };

    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={dialogId}
        onClick={() => setOpen(true)}
        className="inline-flex size-11 items-center justify-center rounded-sm border border-border-strong text-ink transition-colors duration-150 ease-standard hover:bg-surface xl:hidden"
      >
        <Menu aria-hidden className="size-5" />
        <span className="sr-only">Odpri meni</span>
      </button>

      <dialog
        id={dialogId}
        ref={dialogRef}
        aria-label="Glavni meni"
        className="mobile-nav m-0 h-dvh max-h-none w-full max-w-none bg-ground text-ink"
      >
        <div className="flex h-full flex-col overflow-y-auto overscroll-contain">
          <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
            <p className="text-eyebrow font-semibold uppercase text-ink-muted">
              Meni
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-11 items-center justify-center rounded-sm border border-border-strong text-ink transition-colors duration-150 ease-standard hover:bg-surface"
            >
              <X aria-hidden className="size-5" />
              <span className="sr-only">Zapri meni</span>
            </button>
          </div>

          <nav aria-label="Glavna navigacija" className="px-5 py-2">
            <ul>
              {primaryNav.map((item) => (
                <li key={item.href} className="border-b border-border">
                  <NavLink
                    href={item.href}
                    className="flex min-h-[56px] items-center text-lg font-medium text-ink-muted"
                    activeClassName="text-ink"
                  >
                    {item.label}
                  </NavLink>

                  {item.menu ? (
                    <ul className="-mt-1 pb-3 pl-3">
                      {serviceGroups
                        .filter((group) =>
                          item.menu?.some(
                            (service) => service.group === group.id,
                          ),
                        )
                        .map((group) => (
                          <li key={group.id} className="pt-2">
                            <p className="text-eyebrow font-semibold uppercase text-ink-muted/80">
                              {group.label}
                            </p>
                            <ul>
                              {item.menu
                                ?.filter(
                                  (service) => service.group === group.id,
                                )
                                .map((service) => (
                                  <li key={service.href}>
                                    <NavLink
                                      href={service.href}
                                      className="flex min-h-11 items-center text-sm text-ink-muted"
                                      activeClassName="text-ink"
                                    >
                                      {service.label}
                                    </NavLink>
                                  </li>
                                ))}
                            </ul>
                          </li>
                        ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto grid gap-2.5 border-t border-border bg-surface px-5 py-5">
            <ActionLink
              href={headerPhone.href}
              variant="outline"
              size="lg"
              aria-label={headerPhone.accessibleLabel}
            >
              <Phone aria-hidden className="size-[18px] text-brand-strong" />
              {headerPhone.label}
            </ActionLink>
            <ActionLink href={headerCta.href} variant="solid" size="lg">
              {headerCta.label}
            </ActionLink>
            <p className="pt-1 text-xs text-ink-muted">
              {company.address.full}
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
