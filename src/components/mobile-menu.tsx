"use client";

import { useEffect, useId, useRef, useState } from "react";

import { buttonClasses } from "@/components/button";

export type MenuLink = { href: string; label: string };

/**
 * The menu button and its panel, under 768px only (md:hidden). The panel is
 * rendered after the header row and wraps onto its own line (basis-full), so
 * it pushes the page down, as in the design. It closes when a link is chosen
 * and on Escape; Escape also returns focus to the button.
 */
export function MobileMenu({
  links,
  contact,
  labels,
  navLabel,
}: {
  links: MenuLink[];
  contact: MenuLink;
  labels: { open: string; close: string };
  /** Accessible name of the <nav> landmark. */
  navLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpen(!open)}
        className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-bg text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link md:hidden"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open && (
        <nav
          id={panelId}
          aria-label={navLabel}
          className="-mx-5 flex basis-[calc(100%+2.5rem)] flex-col border-t border-border bg-surface px-5 pt-2 pb-5 md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className="flex min-h-[52px] items-center border-b border-divider text-lg text-ink no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
            >
              {link.label}
            </a>
          ))}
          <a
            href={contact.href}
            onClick={close}
            className={buttonClasses({
              variant: "inverted",
              className: "mt-4",
            })}
          >
            {contact.label}
          </a>
        </nav>
      )}
    </>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
