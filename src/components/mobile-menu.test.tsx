import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { MobileMenu } from "./mobile-menu";

function renderMenu() {
  render(
    <MobileMenu
      links={[
        { href: "#work", label: "Work" },
        { href: "#projects", label: "Projects" },
      ]}
      contact={{ href: "#contact", label: "Contact" }}
      labels={{ open: "Open menu", close: "Close menu" }}
      navLabel="Main"
    />,
  );
}

describe("MobileMenu", () => {
  it("starts closed", () => {
    renderMenu();
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("opens the links and switches its label", async () => {
    renderMenu();
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));

    const button = screen.getByRole("button", { name: "Close menu" });
    expect(button).toHaveAttribute("aria-expanded", "true");
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(button).toHaveAttribute("aria-controls", nav.id);
    expect(screen.getByRole("link", { name: "Work" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  it("closes after choosing a link", async () => {
    renderMenu();
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    await userEvent.click(screen.getByRole("link", { name: "Projects" }));
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("closes on Escape and returns focus to the button", async () => {
    renderMenu();
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    await userEvent.tab();
    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
  });
});
