import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

/** A technology label (React, TypeScript, ...). Not interactive. */
export function Tag({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        // 12px on mobile, 13px from 768px, as in the design.
        "inline-block rounded-full bg-tag-bg px-2.5 py-[3px] text-xs font-medium text-tag-fg md:px-3 md:py-1 md:text-[13px]",
        className,
      )}
      {...props}
    />
  );
}
