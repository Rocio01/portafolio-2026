import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { STACK } from "@/data/stack";
import { en } from "@/i18n/en";
import { es } from "@/i18n/es";

import { StackStrip } from "./stack-strip";

describe("StackStrip", () => {
  it("lists every tool from the stack array, in order", () => {
    render(<StackStrip t={en} />);
    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items.map((item) => item.textContent)).toEqual([...STACK]);
  });

  it.each([
    ["English", en],
    ["Spanish", es],
  ])("names the section in %s", (_, t) => {
    render(<StackStrip t={t} />);
    expect(
      screen.getByRole("region", { name: t.stack.label }),
    ).toBeInTheDocument();
  });
});
