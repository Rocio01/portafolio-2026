import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

// Pill buttons from the design. Most "buttons" on the page are links (resume,
// GitHub, LinkedIn, Contact), so the same styles come as <Button> and
// <ButtonLink>; each keeps its native element and semantics.
const variants = {
  /** Accent fill: the main action (Download resume). */
  primary: "bg-accent text-white hover:brightness-110",
  /** Border in the current text color: works on the page and on inverse cards. */
  outline: "border-[1.5px] border-current hover:bg-ink/5",
  /** Ink fill with page-colored text (header Contact; the email button inside an inverse card). */
  inverted: "bg-ink text-bg hover:opacity-90",
} as const;

const sizes = {
  /** 48px tall: the design's standard button. */
  md: "min-h-12 px-[22px] text-base",
  /** 44px tall, the touch-target minimum: compact header actions. */
  sm: "min-h-11 px-[18px] text-[15px]",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

type StyleProps = { variant?: ButtonVariant; size?: ButtonSize };

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: StyleProps & { className?: string }) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium no-underline transition",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

export type ButtonProps = ComponentProps<"button"> & StyleProps;

export function Button({
  variant,
  size,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, className })}
      {...props}
    />
  );
}

export type ButtonLinkProps = ComponentProps<"a"> &
  StyleProps & { href: string };

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={buttonClasses({ variant, size, className })} {...props} />
  );
}
