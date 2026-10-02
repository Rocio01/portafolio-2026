"use client";

import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * The page header, stuck to the top while the page scrolls. It sets
 * data-scrolled once the page has moved, so the desktop header can show its
 * bottom border only then; at the top it looks as in the design.
 * The header's contents stay server-rendered; only this wrapper is a client
 * component.
 */
export function StickyHeader({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header data-scrolled={scrolled} className={cn("sticky top-0", className)}>
      {children}
    </header>
  );
}
