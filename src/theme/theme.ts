export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

/** The theme the visitor chose, or null if they never used the switch. */
export function getStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch {
    // localStorage can throw (blocked storage, some private modes).
    return null;
  }
}

/** The theme on screen: the stored choice, else the system setting. */
export function getResolvedTheme(): Theme {
  const forced = document.documentElement.dataset.theme;
  if (isTheme(forced)) return forced;
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

/** Shows the theme now and remembers it for the next visit. */
export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The choice still applies to this page view.
  }
}

/** Re-applies the stored theme to <html>, if there is one. */
export function applyStoredTheme() {
  const stored = getStoredTheme();
  if (stored) document.documentElement.dataset.theme = stored;
}

/**
 * Calls onChange when the resolved theme may have changed: the switch was
 * used, or the system setting changed. Returns an unsubscribe function.
 */
export function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
}

/**
 * Runs in <head> before first paint, so a stored theme that differs from the
 * system setting never flashes. Same logic as applyStoredTheme, written as
 * plain ES5 because it runs before any bundle loads.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}})()`;
