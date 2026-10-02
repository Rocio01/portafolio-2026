import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

/** Content width from the design: 1120px max, 20px side padding on mobile, 24px above. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1120px] px-5 md:px-6", className)}
      {...props}
    />
  );
}
