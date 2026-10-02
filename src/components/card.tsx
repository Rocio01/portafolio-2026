import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

const variants = {
  /** Surface card: work and project cards. */
  default: "border border-border bg-surface",
  /**
   * The contact card: ink background, page-colored text. The `inverse` class
   * (tokens.css) swaps the color tokens inside it, so children keep using
   * bg-bg, text-ink, Button variant="inverted" and get the inverted colors.
   */
  inverse: "inverse bg-bg text-ink",
} as const;

export type CardProps = ComponentProps<"div"> & {
  variant?: keyof typeof variants;
  /** <article> for self-contained items (a job, a project); <div> otherwise. */
  as?: "div" | "article";
};

/** Rounded card from the design: 20px radius, 40px padding (24px on mobile). */
export function Card({
  variant = "default",
  as: Element = "div",
  className,
  ...props
}: CardProps) {
  return (
    <Element
      className={cn("rounded-[20px] p-6 md:p-10", variants[variant], className)}
      {...props}
    />
  );
}
