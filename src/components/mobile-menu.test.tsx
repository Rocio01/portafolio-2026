import { render, screen, waitFor } from "@testing-library/react";
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

  it("closes at once after choosing a link, so the jump lands right", async () => {
    renderMenu();
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    await userEvent.click(screen.getByRole("link", { name: "Projects" }));
    // No closing animation: the panel is gone before the browser scrolls.
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("animates closed from the button: inert while it shrinks, then removed", async () => {
    renderMenu();
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const nav = screen.getByRole("navigation");
    await userEvent.click(screen.getByRole("button", { name: "Close menu" }));

    expect(nav.parentElement).toHaveAttribute("inert");
    await waitFor(() =>
      expect(screen.queryByRole("navigation")).not.toBeInTheDocument(),
    );
  });

  it("closes on Escape and returns focus to the button", async () => {
    renderMenu();
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    await userEvent.tab();
    await userEvent.keyboard("{Escape}");

    expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
    await waitFor(() =>
      expect(screen.queryByRole("navigation")).not.toBeInTheDocument(),
    );
  });

  it("opens again if pressed while it is closing", async () => {
    renderMenu();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("button", { name: "Close menu" }));
    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(nav.parentElement).not.toHaveAttribute("inert");
    expect(nav.parentElement).toHaveAttribute("data-state", "open");
  });
});
