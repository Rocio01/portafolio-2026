// Backlog item 23: hero entrance, scroll reveals and reduced motion.

const reveal = (section: string) => cy.get(`[data-reveal]:has(${section})`);

function emulateReducedMotion(value: "reduce" | "no-preference") {
  // Chrome DevTools Protocol: Cypress runs Chromium-based browsers here.
  return Cypress.automation("remote:debugger:protocol", {
    command: "Emulation.setEmulatedMedia",
    params: { features: [{ name: "prefers-reduced-motion", value }] },
  });
}

describe("motion", () => {
  afterEach(() => {
    emulateReducedMotion("no-preference");
  });

  it("keeps the hero headline fully opaque from the first frame", () => {
    cy.visit("/en");
    // The headline only moves; the other hero steps fade in.
    cy.get("h1").should("have.css", "animation-name", "hero-rise");
    cy.get("h1").should("have.css", "opacity", "1");
    cy.get("#top p")
      .first()
      .should("have.css", "animation-name", "hero-rise-in");
  });

  it("reveals a section the first time it scrolls into view", () => {
    cy.viewport(1280, 800);
    cy.visit("/en");
    reveal("#contact").should("have.css", "opacity", "0");
    cy.get("#contact").scrollIntoView();
    reveal("#contact").should("have.css", "opacity", "1");
  });

  it("does not move anything with prefers-reduced-motion", () => {
    emulateReducedMotion("reduce");
    cy.visit("/en");
    cy.get("h1").should("have.css", "animation-name", "none");

    // The reveal keeps its fade but drops the movement.
    cy.get("#contact").scrollIntoView();
    reveal("#contact").should("have.css", "opacity", "1");
    reveal("#contact").should("have.css", "transform", "none");
  });
});
