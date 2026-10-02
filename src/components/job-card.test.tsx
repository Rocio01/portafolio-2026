import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EXPERIENCE, type Job } from "@/data/experience";

import { JobCard } from "./job-card";

const job: Job = {
  id: "test",
  meta: { en: "Acme · 2024", es: "Acme · 2024" },
  title: { en: "Billing app", es: "App de facturación" },
  summary: { en: "Built billing.", es: "Construí la facturación." },
  tags: ["React", "Zod"],
  highlights: [
    {
      title: { en: "Invoices", es: "Facturas" },
      text: { en: "PDF invoices.", es: "Facturas en PDF." },
    },
  ],
};

describe("JobCard", () => {
  it("renders the job in the page's language", () => {
    render(<JobCard job={job} locale="es" />);
    const card = screen.getByRole("article");
    expect(
      within(card).getByRole("heading", {
        level: 3,
        name: "App de facturación",
      }),
    ).toBeInTheDocument();
    expect(
      within(card).getByText("Construí la facturación."),
    ).toBeInTheDocument();
    expect(within(card).getByText("Facturas")).toBeInTheDocument();
    expect(within(card).getByText("Facturas en PDF.")).toBeInTheDocument();
  });

  it("lists the tags and the highlights as separate lists", () => {
    render(<JobCard job={job} locale="en" />);
    const lists = screen.getAllByRole("list");
    expect(lists).toHaveLength(2);
    const [tags, highlights] = lists as [HTMLElement, HTMLElement];
    expect(
      within(tags)
        .getAllByRole("listitem")
        .map((li) => li.textContent),
    ).toEqual(["React", "Zod"]);
    expect(within(highlights).getAllByRole("listitem")).toHaveLength(1);
  });

  it("renders no highlights list for a job without highlights", () => {
    render(<JobCard job={{ ...job, highlights: undefined }} locale="en" />);
    expect(screen.getAllByRole("list")).toHaveLength(1);
  });
});

describe("EXPERIENCE data", () => {
  it("has the two jobs from content.md, the first with four highlights", () => {
    expect(EXPERIENCE).toHaveLength(2);
    expect(EXPERIENCE[0]?.highlights).toHaveLength(4);
    expect(EXPERIENCE[1]?.highlights).toBeUndefined();
  });
});
