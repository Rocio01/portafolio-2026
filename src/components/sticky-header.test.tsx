import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { StickyHeader } from "./sticky-header";

function scrollTo(y: number) {
  act(() => {
    window.scrollY = y;
    window.dispatchEvent(new Event("scroll"));
  });
}

afterEach(() => {
  window.scrollY = 0;
  vi.restoreAllMocks();
});

describe("StickyHeader", () => {
  it("renders a banner with its children", () => {
    render(<StickyHeader>name</StickyHeader>);
    expect(screen.getByRole("banner")).toHaveTextContent("name");
  });

  it("marks itself scrolled once the page moves, and not at the top", () => {
    render(<StickyHeader>name</StickyHeader>);
    const header = screen.getByRole("banner");
    expect(header).toHaveAttribute("data-scrolled", "false");

    scrollTo(200);
    expect(header).toHaveAttribute("data-scrolled", "true");

    scrollTo(0);
    expect(header).toHaveAttribute("data-scrolled", "false");
  });

  it("stops listening when it unmounts", () => {
    const remove = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<StickyHeader>name</StickyHeader>);
    unmount();
    expect(remove).toHaveBeenCalledWith("scroll", expect.any(Function));
  });
});
