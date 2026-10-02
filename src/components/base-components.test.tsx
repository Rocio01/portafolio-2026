import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Card } from "./card";
import { Container } from "./container";
import { SectionHeading } from "./section-heading";
import { Tag } from "./tag";

describe("Container", () => {
  it("limits the width to the design's 1120px", () => {
    render(<Container>content</Container>);
    expect(screen.getByText("content")).toHaveClass("max-w-[1120px]");
  });
});

describe("Tag", () => {
  it("renders its text with the tag colors", () => {
    render(<Tag>React</Tag>);
    expect(screen.getByText("React")).toHaveClass("bg-tag-bg", "text-tag-fg");
  });
});

describe("Card", () => {
  it("renders an <article> when asked", () => {
    render(<Card as="article">job</Card>);
    expect(screen.getByRole("article")).toHaveTextContent("job");
  });

  it("swaps the color tokens in the inverse variant", () => {
    render(<Card variant="inverse">contact</Card>);
    expect(screen.getByText("contact")).toHaveClass("inverse");
  });
});

describe("SectionHeading", () => {
  it("renders the title as a level-2 heading with its id", () => {
    render(
      <SectionHeading
        label="01 — Experience"
        title="Selected work"
        id="work-title"
      />,
    );
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Selected work",
    });
    expect(heading).toHaveAttribute("id", "work-title");
    expect(screen.getByText("01 — Experience")).toBeInTheDocument();
  });
});
