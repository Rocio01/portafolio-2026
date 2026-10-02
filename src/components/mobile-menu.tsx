"use client";

import { useEffect, useId, useRef, useState } from "react";

import { buttonClasses } from "@/components/button";

export type MenuLink = { href: string; label: string };

/**
 * The menu button and its panel, under 768px only (md:hidden). The panel is
 * rendered after the header row and wraps onto its own line (basis-full), so
 * it pushes the page down, as in the design. It closes when a link is chosen
 * and on Escape; Escape also returns focus to the button.
 *
 * The panel is at most the screen height minus the header (5rem) and
 * scrolls inside, so on a short screen (a phone held sideways, a zoomed
 * page) the sticky header never hides its last link.
 *
 * The panel grows open and shrinks closed (.menu-panel in globals.css). On
 * close it stays mounted for CLOSE_MS, inert, so the animation can play;
 * with reduced motion it closes at once.
 */
/** Matches the closing animation in globals.css. */
const CLOSE_MS = 200;

function prefersReducedMotion() {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

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
  const [closing, setClosing] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  function close() {
    setOpen(false);
    setClosing(!prefersReducedMotion());
  }

  // A chosen link closes the menu at once, without the closing animation:
  // the browser jumps to the section right after the click, and a panel
  // still collapsing would then pull the page up under the sticky header.
  function closeForLink() {
    setOpen(false);
    setClosing(false);
  }

  function openMenu() {
    setClosing(false);
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setClosing(!prefersReducedMotion());
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(() => setClosing(false), CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [closing]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? labels.close : labels.open}
        onClick={open ? close : openMenu}
        className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-bg text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link md:hidden"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {(open || closing) && (
        <div
          data-state={open ? "open" : "closing"}
          inert={!open}
          className="menu-panel -mx-5 basis-[calc(100%+2.5rem)] md:hidden"
        >
          <nav
            id={panelId}
            aria-label={navLabel}
            className="max-h-[calc(100dvh-5rem)] min-h-0 overflow-y-auto"
          >
            <div className="flex flex-col border-t border-border bg-surface px-5 pt-2 pb-5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeForLink}
                  className="flex min-h-[52px] items-center border-b border-divider text-lg text-ink no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={contact.href}
                onClick={closeForLink}
                className={buttonClasses({
                  variant: "inverted",
                  className: "mt-4",
                })}
              >
                {contact.label}
              </a>
            </div>
          </nav>
        </div>
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
