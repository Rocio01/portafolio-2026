import { describe, expect, it } from "vitest";

import { en } from "@/i18n/en";
import { es } from "@/i18n/es";

import { languageAlternates, OG_IMAGE, siteMetadata } from "./site-metadata";

const siteUrl = "https://example.com";

describe("siteMetadata", () => {
  it.each([
    ["en", en],
    ["es", es],
  ] as const)("uses the %s title and description", (locale, t) => {
    const metadata = siteMetadata({ siteUrl, path: `/${locale}`, locale });
    const title = `Zulma Rocio Martinez · ${t.meta.role}`;
    expect(metadata.title).toMatchObject({ default: title });
    expect(metadata.description).toBe(t.hero.intro);
    expect(metadata.openGraph).toMatchObject({
      title,
      description: t.hero.intro,
    });
  });

  it("shares one preview image, with alt text in the page's language", () => {
    const metadata = siteMetadata({ siteUrl, path: "/es", locale: "es" });
    const image = { ...OG_IMAGE, alt: es.meta.ogImageAlt };
    expect(metadata.openGraph?.images).toEqual([image]);
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      images: [image],
    });
  });

  it("sets the Open Graph locale and the other language as alternate", () => {
    const metadata = siteMetadata({ siteUrl, path: "/es", locale: "es" });
    expect(metadata.openGraph).toMatchObject({
      locale: "es_CO",
      alternateLocale: ["en_US"],
    });
  });

  it("uses the page path for og:url and the canonical link", () => {
    const metadata = siteMetadata({ siteUrl, path: "/es", locale: "es" });
    expect(metadata.openGraph).toMatchObject({ url: "/es" });
    expect(metadata.alternates).toMatchObject({ canonical: "/es" });
  });

  it("links both languages with hreflang, and / as the default", () => {
    const metadata = siteMetadata({ siteUrl, path: "/en", locale: "en" });
    expect(metadata.alternates?.languages).toEqual({
      en: "/en",
      es: "/es",
      "x-default": "/",
    });
  });

  it("resolves relative URLs against the site URL", () => {
    const metadata = siteMetadata({ siteUrl, path: "/", locale: "en" });
    expect(String(metadata.metadataBase)).toBe("https://example.com/");
  });
});

describe("languageAlternates", () => {
  it("builds absolute URLs for the sitemap", () => {
    expect(languageAlternates(siteUrl)).toEqual({
      en: "https://example.com/en",
      es: "https://example.com/es",
      "x-default": "https://example.com/",
    });
  });
});
