// Backlog item 23: hero entrance, scroll reveals and reduced motion.

const reveal = (section: string) => cy.get(`[data-reveal]:has(${section})`);

// The wrapper's transform on the first frame where the fade has started. No
// retry after that point: by the end of the animation both cases are "none".
function transformOnceFading(section: string) {
  return reveal(section)
    .should(($el) => {
      expect(Number(getComputedStyle($el.get(0)!).opacity)).to.be.greaterThan(
        0,
      );
    })
    .then(($el) => getComputedStyle($el.get(0)!).transform);
}

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
    // It moves while it fades in...
    transformOnceFading("#contact").should("not.eq", "none");
    // ...and ends fully visible in place.
    reveal("#contact").should("have.css", "opacity", "1");
    reveal("#contact").should("have.css", "transform", "none");
  });

  it("does not move anything with prefers-reduced-motion", () => {
    emulateReducedMotion("reduce");
    cy.visit("/en");
    cy.get("h1").should("have.css", "animation-name", "none");

    // The reveal keeps its fade but drops the movement.
    cy.get("#contact").scrollIntoView();
    transformOnceFading("#contact").should("eq", "none");
    reveal("#contact").should("have.css", "opacity", "1");
  });

  it("cross-fades the theme switch over 450ms", () => {
    cy.visit("/en", {
      onBeforeLoad(win) {
        win.localStorage.setItem("theme", "light");
      },
    });
    cy.get('button[aria-label="Switch to dark mode"]').click();
    // The browser's view-transition animations, on the page snapshots.
    cy.document().should((doc) => {
      const durations = doc
        .getAnimations()
        .filter((animation) =>
          String(
            (animation.effect as KeyframeEffect | null)?.pseudoElement,
          ).startsWith("::view-transition"),
        )
        .map((animation) => animation.effect?.getTiming().duration);
      expect(durations).to.include(450);
    });
  });
});
