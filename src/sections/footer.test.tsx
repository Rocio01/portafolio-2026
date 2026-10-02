import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { en } from "@/i18n/en";

import { Footer } from "./footer";

describe("Footer", () => {
  it("is the page's contentinfo landmark with the copyright line", () => {
    render(<Footer t={en} />);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(en.footer);
  });
});
