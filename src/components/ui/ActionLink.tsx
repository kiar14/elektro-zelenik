import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ActionVariant = "solid" | "outline";
export type ActionSize = "md" | "lg";

const BASE =
  "inline-flex min-h-11 items-center justify-center gap-2.5 rounded-sm " +
  "font-sans font-semibold tracking-[-0.005em] " +
  "transition-[background-color,border-color,color,transform] duration-200 ease-smooth " +
  "hover:-translate-y-px active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const SIZES: Record<ActionSize, string> = {
  md: "min-h-[46px] px-4 text-[0.9375rem]",
  // Tighter gutters below sm so the longest Slovenian label stays on one line
  // inside a full-width button at 320px.
  lg: "min-h-[54px] px-5 text-[1rem] sm:px-6",
};

const VARIANTS: Record<ActionVariant, string> = {
  solid: "btn-solid",
  outline: "btn-outline",
};

/**
 * A single action affordance. Internal destinations route through `next/link`;
 * `tel:` and `mailto:` render a plain anchor.
 */
export function ActionLink({
  href,
  variant = "solid",
  size = "md",
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: ActionVariant;
  size?: ActionSize;
  className?: string;
  children: ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  const classes = cn(BASE, SIZES[size], VARIANTS[variant], className);

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
}
