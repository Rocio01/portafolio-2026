import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { es } from "@/i18n/es";

import { UpcomingCard } from "./upcoming-card";

describe("UpcomingCard", () => {
  it("shows the coming-soon label with the project's title and text", () => {
    render(
      <UpcomingCard
        project={{
          id: "next",
          title: { en: "Budget tracker", es: "Control de gastos" },
          text: { en: "Next.js and Zod.", es: "Next.js y Zod." },
        }}
        locale="es"
        t={es}
      />,
    );
    expect(screen.getByText("Próximamente")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Control de gastos" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Next.js y Zod.")).toBeInTheDocument();
  });
});
