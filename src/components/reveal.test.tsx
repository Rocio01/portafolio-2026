import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Reveal } from "./reveal";

describe("Reveal", () => {
  it("renders its children in a wrapper marked for the no-script fallback", () => {
    render(
      <Reveal>
        <p>content</p>
      </Reveal>,
    );
    const wrapper = screen.getByText("content").parentElement;
    expect(wrapper).toHaveAttribute("data-reveal");
  });
});
