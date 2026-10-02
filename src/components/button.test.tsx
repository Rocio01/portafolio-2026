import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button, ButtonLink } from "./button";

describe("Button", () => {
  it("renders its label", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("defaults to type=button so it never submits a form by accident", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Save
      </Button>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it.each([
    ["md", "min-h-12"],
    ["sm", "min-h-11"],
  ] as const)("size %s is at least 44px tall (%s)", (size, minHeight) => {
    render(<Button size={size}>Save</Button>);
    expect(screen.getByRole("button")).toHaveClass(minHeight);
  });
});

describe("ButtonLink", () => {
  it("is a real link with the button styles", () => {
    render(
      <ButtonLink href="https://github.com/Rocio01" variant="outline">
        GitHub
      </ButtonLink>,
    );
    const link = screen.getByRole("link", { name: "GitHub" });
    expect(link).toHaveAttribute("href", "https://github.com/Rocio01");
    expect(link).toHaveClass("rounded-full", "border-current", "min-h-12");
  });
});
