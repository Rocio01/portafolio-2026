import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PROJECTS, UPCOMING } from "@/data/projects";
import { en } from "@/i18n/en";
import { es } from "@/i18n/es";

import { Projects } from "./projects";

describe("Projects", () => {
  it.each([
    ["en", en],
    ["es", es],
  ] as const)(
    "is a region named by its heading, with one card per project (%s)",
    (locale, t) => {
      render(<Projects locale={locale} t={t} />);
      const region = screen.getByRole("region", { name: t.projects.title });
      expect(region).toHaveAttribute("id", "projects");
      expect(within(region).getAllByRole("article")).toHaveLength(
        PROJECTS.length + UPCOMING.length,
      );
    },
  );

  it("shows no coming-soon card while UPCOMING is empty", () => {
    expect(UPCOMING).toHaveLength(0);
    render(<Projects locale="en" t={en} />);
    expect(screen.queryByText(en.projects.soon)).not.toBeInTheDocument();
  });

  it("links the attention game's demo and public repository", () => {
    render(<Projects locale="en" t={en} />);
    expect(
      screen.getByRole("link", { name: en.projects.demo }),
    ).toHaveAttribute(
      "href",
      "https://juego-atencion.zrmartinezg.workers.dev/",
    );
    expect(
      screen.getByRole("link", { name: en.projects.code }),
    ).toHaveAttribute("href", "https://github.com/Rocio01/juego-atencion");
  });
});
