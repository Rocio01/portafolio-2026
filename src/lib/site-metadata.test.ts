import { describe, expect, it } from "vitest";

import { OG_IMAGE, siteMetadata } from "./site-metadata";

describe("siteMetadata", () => {
  const metadata = siteMetadata({
    siteUrl: "https://example.com",
    path: "/",
  });

  it("gives every page a title, description and preview image", () => {
    expect(metadata.title).toMatchObject({
      default: expect.stringContaining("Zulma Rocio Martinez"),
    });
    expect(metadata.description).toBeTruthy();
    expect(metadata.openGraph?.images).toEqual([OG_IMAGE]);
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      images: [OG_IMAGE],
    });
  });

  it("uses the page path for og:url and the canonical link", () => {
    const es = siteMetadata({ siteUrl: "https://example.com", path: "/es" });
    expect(es.openGraph).toMatchObject({ url: "/es" });
    expect(es.alternates).toMatchObject({ canonical: "/es" });
  });

  it("resolves relative URLs against the site URL", () => {
    expect(String(metadata.metadataBase)).toBe("https://example.com/");
  });
});
