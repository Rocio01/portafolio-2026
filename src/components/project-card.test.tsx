import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Project } from "@/data/projects";
import { en } from "@/i18n/en";
import { es } from "@/i18n/es";

import { ProjectCard } from "./project-card";

const project: Project = {
  id: "test",
  title: { en: "Weather app", es: "App del clima" },
  text: { en: "Shows the weather.", es: "Muestra el clima." },
  stack: ["Vite", "React"],
  image: {
    src: "/projects/test.png",
    width: 1280,
    height: 800,
    alt: { en: "Weather screen", es: "Pantalla del clima" },
  },
  demo: "https://example.com/demo",
  code: "https://github.com/example/weather",
};

describe("ProjectCard", () => {
  it("renders image, title, text, stack and both links in the page's language", () => {
    render(<ProjectCard project={project} locale="es" t={es} />);
    expect(
      screen.getByRole("img", { name: "Pantalla del clima" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "App del clima" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Muestra el clima.")).toBeInTheDocument();
    expect(screen.getByText("Vite · React")).toBeInTheDocument();
    // The arrow is aria-hidden, so the accessible name is just the label.
    expect(screen.getByRole("link", { name: "Ver demo" })).toHaveAttribute(
      "href",
      project.demo,
    );
    expect(screen.getByRole("link", { name: "Código" })).toHaveAttribute(
      "href",
      project.code,
    );
  });

  it("hides the button of a missing link", () => {
    render(
      <ProjectCard
        project={{ ...project, code: undefined }}
        locale="en"
        t={en}
      />,
    );
    expect(screen.getByRole("link", { name: "Live demo" })).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Code" }),
    ).not.toBeInTheDocument();
  });

  it("opens the demo and the code in a new tab", () => {
    render(<ProjectCard project={project} locale="en" t={en} />);
    for (const name of ["Live demo", "Code"]) {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});
