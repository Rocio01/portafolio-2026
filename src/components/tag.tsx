import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

/** A technology label (React, TypeScript, ...). Not interactive. */
export function Tag({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-block rounded-full bg-tag-bg px-3 py-1 text-[13px] font-medium text-tag-fg",
        className,
      )}
      {...props}
    />
  );
}
