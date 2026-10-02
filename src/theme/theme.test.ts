import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  getResolvedTheme,
  getStoredTheme,
  setTheme,
  THEME_STORAGE_KEY,
  themeInitScript,
} from "./theme";

function mockSystemTheme(dark: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches: dark && query === "(prefers-color-scheme: dark)",
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}

beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("getStoredTheme", () => {
  it("returns null when nothing is stored", () => {
    expect(getStoredTheme()).toBeNull();
  });

  it("returns a stored valid theme", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    expect(getStoredTheme()).toBe("dark");
  });

  it("ignores an invalid stored value", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "purple");
    expect(getStoredTheme()).toBeNull();
  });

  it("returns null when localStorage throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(getStoredTheme()).toBeNull();
  });
});

describe("getResolvedTheme", () => {
  it("follows the system setting when no theme is forced", () => {
    mockSystemTheme(true);
    expect(getResolvedTheme()).toBe("dark");
    mockSystemTheme(false);
    expect(getResolvedTheme()).toBe("light");
  });

  it("prefers the forced theme over the system setting", () => {
    mockSystemTheme(true);
    document.documentElement.dataset.theme = "light";
    expect(getResolvedTheme()).toBe("light");
  });
});

describe("setTheme", () => {
  it("applies the theme and remembers it", () => {
    setTheme("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
  });

  it("still applies the theme when localStorage throws", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    setTheme("light");
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  describe("cross-fade", () => {
    afterEach(() => {
      // jsdom has no startViewTransition; remove the stub.
      delete (document as Partial<Document>).startViewTransition;
    });

    function stubViewTransition() {
      const start = vi.fn((update: () => void) => {
        update();
        return {} as ViewTransition;
      });
      document.startViewTransition =
        start as unknown as Document["startViewTransition"];
      return start;
    }

    function stubReducedMotion(reduce: boolean) {
      vi.stubGlobal(
        "matchMedia",
        vi.fn((query: string) => ({
          matches: reduce && query === "(prefers-reduced-motion: reduce)",
        })),
      );
    }

    it("switches the theme inside a view transition when supported", () => {
      const start = stubViewTransition();
      stubReducedMotion(false);
      setTheme("dark");
      expect(start).toHaveBeenCalledOnce();
      expect(document.documentElement.dataset.theme).toBe("dark");
    });

    it("switches without a transition when the visitor prefers reduced motion", () => {
      const start = stubViewTransition();
      stubReducedMotion(true);
      setTheme("dark");
      expect(start).not.toHaveBeenCalled();
      expect(document.documentElement.dataset.theme).toBe("dark");
    });
  });
});

describe("themeInitScript", () => {
  it("applies a stored theme before first paint", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    new Function(themeInitScript)();
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("does nothing without a stored theme, so the system setting applies", () => {
    new Function(themeInitScript)();
    expect(document.documentElement.dataset.theme).toBeUndefined();
  });

  it("ignores an invalid stored value", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "purple");
    new Function(themeInitScript)();
    expect(document.documentElement.dataset.theme).toBeUndefined();
  });
});
