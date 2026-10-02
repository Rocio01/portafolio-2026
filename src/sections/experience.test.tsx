import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EXPERIENCE } from "@/data/experience";
import { en } from "@/i18n/en";
import { es } from "@/i18n/es";

import { Experience } from "./experience";

describe("Experience", () => {
  it.each([
    ["en", en],
    ["es", es],
  ] as const)(
    "is a region named by its heading, with one card per job (%s)",
    (locale, t) => {
      render(<Experience locale={locale} t={t} />);
      const region = screen.getByRole("region", { name: t.work.title });
      expect(region).toHaveAttribute("id", "work");
      const cards = within(region).getAllByRole("article");
      expect(cards).toHaveLength(EXPERIENCE.length);
      EXPERIENCE.forEach((job, i) => {
        expect(cards[i]).toHaveTextContent(job.title[locale]);
      });
    },
  );
});
