import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { en } from "@/i18n/en";
import { es } from "@/i18n/es";

import { About } from "./about";

describe("About", () => {
  it.each([
    ["English", en],
    ["Spanish", es],
  ])("shows the label, title and both paragraphs in %s", (_, t) => {
    render(<About t={t} />);
    const region = screen.getByRole("region", { name: t.about.title });
    expect(region).toHaveAttribute("id", "about");
    expect(region).toHaveTextContent(t.about.label);
    expect(region).toHaveTextContent(t.about.p1);
    expect(region).toHaveTextContent(t.about.p2);
  });
});
