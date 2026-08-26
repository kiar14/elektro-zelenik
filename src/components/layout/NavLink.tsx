"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function useIsActive(href: string) {
  const pathname = usePathname();
  const isExact = pathname === href;
  const isWithinSection =
    href !== "/" && pathname.startsWith(`${href}/`);
  return { isExact, isWithinSection };
}

/**
 * A navigation link that marks itself as the current page.
 *
 * `aria-current="page"` is set only on an exact match. A parent whose section
 * the visitor is inside is marked visually but not announced as the page.
 */
export function NavLink({
  href,
  className,
  activeClassName = "text-ink",
  children,
  onClick,
}: {
  href: string;
  className?: string;
  activeClassName?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const { isExact, isWithinSection } = useIsActive(href);

  return (
    <Link
      href={href}
      aria-current={isExact ? "page" : undefined}
      data-active={isExact || isWithinSection ? "" : undefined}
      onClick={onClick}
      className={cn(className, (isExact || isWithinSection) && activeClassName)}
    >
      {children}
    </Link>
  );
}
