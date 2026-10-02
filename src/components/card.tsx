import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

// Each variant carries its own radius and padding: cn() does not merge
// conflicting Tailwind classes, so they cannot be overridden from outside.
const variants = {
  /** Surface card: work cards. 20px radius, 40px padding (24px on mobile). */
  default: "rounded-[20px] border border-border bg-surface p-6 md:p-10",
  /**
   * The contact card: ink background, page-colored text. The `inverse` class
   * (tokens.css) swaps the color tokens inside it, so children keep using
   * bg-bg, text-ink, Button variant="inverted" and get the inverted colors.
   * Larger than the default card, as in the design: 22px radius and 32px by
   * 24px padding on mobile; 24px radius and 32–64px padding from 768px.
   */
  inverse:
    "inverse rounded-[22px] bg-bg px-6 py-8 text-ink md:rounded-3xl md:p-[clamp(32px,6vw,64px)]",
} as const;

export type CardProps = ComponentProps<"div"> & {
  variant?: keyof typeof variants;
  /** <article> for self-contained items (a job, a project); <div> otherwise. */
  as?: "div" | "article";
};

/** Rounded card from the design. */
export function Card({
  variant = "default",
  as: Element = "div",
  className,
  ...props
}: CardProps) {
  return <Element className={cn(variants[variant], className)} {...props} />;
}
