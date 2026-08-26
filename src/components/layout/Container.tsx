import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * The two page containers.
 *
 * `content` (1200px) holds prose and ordinary UI.
 * `wide`    (1440px) is for large visual compositions such as the hero.
 *
 * Page padding is 20 / 32 / 48px and is defined only here.
 */
export function Container({
  width = "content",
  as: Tag = "div",
  className,
  children,
}: {
  width?: "content" | "wide";
  as?: "div" | "section";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 md:px-8 lg:px-12",
        width === "wide" ? "max-w-wide" : "max-w-content",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
