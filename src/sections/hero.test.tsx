import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LINKS } from "@/data/links";
import { en } from "@/i18n/en";
import { es } from "@/i18n/es";

import { Hero } from "./hero";

describe("Hero", () => {
  it.each([
    ["English", en],
    ["Spanish", es],
  ])("renders the %s copy with the headline as the page's h1", (_, t) => {
    render(<Hero t={t} />);
    expect(
      screen.getByRole("heading", { level: 1, name: t.hero.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(t.hero.label)).toBeInTheDocument();
    expect(screen.getByText(t.hero.intro)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: t.hero.resume })).toHaveAttribute(
      "href",
      LINKS.resume,
    );
  });

  it("links to GitHub and LinkedIn", () => {
    render(<Hero t={en} />);
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      LINKS.github,
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      LINKS.linkedin,
    );
  });

  it("is the target of the header's #top link", () => {
    render(<Hero t={en} />);
    expect(screen.getByRole("region", { name: en.hero.title })).toHaveAttribute(
      "id",
      "top",
    );
  });
});
