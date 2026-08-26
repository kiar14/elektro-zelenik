import Image from "next/image";
import Link from "next/link";

import { company } from "@/content/company";
import { cn } from "@/lib/cn";

/**
 * The genuine 2023 Zelenik d.o.o. horizontal lockup, used unmodified.
 * Source file is 2300x500 with a transparent background.
 */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center py-1.5", className)}
    >
      <Image
        src="/brand/zelenik-logo-horizontal.png"
        alt={`${company.tradingName}, domov`}
        width={230}
        height={50}
        priority
        className="h-auto w-[152px] md:w-[176px] 2xl:w-[196px]"
      />
    </Link>
  );
}
