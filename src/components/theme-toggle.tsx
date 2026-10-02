"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";

import {
  applyStoredTheme,
  getResolvedTheme,
  setTheme,
  subscribeToTheme,
  type Theme,
} from "@/theme/theme";

export type ThemeToggleLabels = {
  toDark: string;
  toLight: string;
};

// The server cannot know the visitor's theme, so it renders a placeholder.
const getServerTheme = () => null;

export function ThemeToggle({ labels }: { labels: ThemeToggleLabels }) {
  const theme = useSyncExternalStore<Theme | null>(
    subscribeToTheme,
    getResolvedTheme,
    getServerTheme,
  );

  // The inline script already set data-theme in production. In development,
  // Strict Mode's remount clears attributes on <html>; this re-applies it
  // before paint. A no-op in production.
  useLayoutEffect(() => {
    applyStoredTheme();
  }, []);

  if (theme === null) {
    // Same size as the button, so nothing shifts when it appears.
    return <span className="inline-block size-11" aria-hidden="true" />;
  }

  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={next === "dark" ? labels.toDark : labels.toLight}
      className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-ink transition-colors hover:bg-divider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
    >
      {next === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
