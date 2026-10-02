import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LINKS } from "@/data/links";
import { en } from "@/i18n/en";
import { es } from "@/i18n/es";

import { Contact } from "./contact";

describe("Contact", () => {
  it.each([
    ["English", en],
    ["Spanish", es],
  ])("shows the title, text and three links in %s", (_, t) => {
    render(<Contact t={t} />);
    const region = screen.getByRole("region", { name: t.contact.title });
    expect(region).toHaveAttribute("id", "contact");
    expect(region).toHaveTextContent(t.contact.text);

    const links = within(region).getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      LINKS.email,
      LINKS.linkedin,
      LINKS.github,
    ]);
  });

  it("puts the card in the inverse color scope", () => {
    render(<Contact t={en} />);
    const title = screen.getByRole("heading", { name: en.contact.title });
    expect(title.closest(".inverse")).not.toBeNull();
  });

  // jsdom applies no CSS, so both labels are in the text; the browser shows
  // one per breakpoint (md:hidden / hidden md:inline).
  it("labels the email button with the short text and the address", () => {
    render(<Contact t={es} />);
    const email = screen.getByRole("link", { name: /Escríbeme/ });
    expect(email).toHaveTextContent("zrmartinezg@gmail.com");
  });
});
