import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { THEME_STORAGE_KEY } from "@/theme/theme";

import { ThemeToggle } from "./theme-toggle";

const labels = {
  toDark: "Switch to dark mode",
  toLight: "Switch to light mode",
};

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
});

describe("ThemeToggle", () => {
  it("offers dark mode when the system is light", () => {
    mockSystemTheme(false);
    render(<ThemeToggle labels={labels} />);
    expect(
      screen.getByRole("button", { name: "Switch to dark mode" }),
    ).toBeInTheDocument();
  });

  it("offers light mode when the system is dark", () => {
    mockSystemTheme(true);
    render(<ThemeToggle labels={labels} />);
    expect(
      screen.getByRole("button", { name: "Switch to light mode" }),
    ).toBeInTheDocument();
  });

  it("switches the theme, remembers it and updates its label", async () => {
    mockSystemTheme(false);
    render(<ThemeToggle labels={labels} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Switch to dark mode" }),
    );

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(
      await screen.findByRole("button", { name: "Switch to light mode" }),
    ).toBeInTheDocument();
  });

  it("starts from the stored choice over the system setting", async () => {
    mockSystemTheme(false);
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    render(<ThemeToggle labels={labels} />);
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(
      await screen.findByRole("button", { name: "Switch to light mode" }),
    ).toBeInTheDocument();
  });
});
