import { describe, expect, it } from "vitest";

import { en } from "./en";
import { es } from "./es";
import {
  detectLocale,
  isLocale,
  localeRedirectScript,
  otherLocale,
} from "./config";

describe("isLocale", () => {
  it("accepts the supported locales only", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("es")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("")).toBe(false);
  });
});

describe("otherLocale", () => {
  it("returns the other language", () => {
    expect(otherLocale("en")).toBe("es");
    expect(otherLocale("es")).toBe("en");
  });
});

describe("detectLocale", () => {
  it.each([
    [["es-CO", "en"], "es"],
    [["es"], "es"],
    [["ES-mx"], "es"],
    [["en-US", "es"], "en"],
    [["fr-FR"], "en"],
    [[], "en"],
  ])("%j -> %s", (languages, expected) => {
    expect(detectLocale(languages)).toBe(expected);
  });
});

describe("localeRedirectScript", () => {
  function runScript(navigator: Partial<Navigator>) {
    let target = "";
    const location = { replace: (url: string) => (target = url) };
    new Function("navigator", "location", localeRedirectScript)(
      navigator,
      location,
    );
    return target;
  }

  it("agrees with detectLocale", () => {
    for (const languages of [["es-CO"], ["en-US"], ["fr"], ["es"]]) {
      expect(runScript({ languages })).toBe(`/${detectLocale(languages)}`);
    }
  });

  it("falls back to navigator.language, then to English", () => {
    expect(runScript({ language: "es-ES" })).toBe("/es");
    expect(runScript({})).toBe("/en");
  });
});

describe("dictionaries", () => {
  // TypeScript already enforces the same keys; this catches empty strings.
  function values(object: object): string[] {
    return Object.values(object).flatMap((value) =>
      typeof value === "string" ? [value] : values(value),
    );
  }

  it("have no empty strings", () => {
    for (const dictionary of [en, es]) {
      expect(values(dictionary).every((value) => value.trim() !== "")).toBe(
        true,
      );
    }
  });
});
