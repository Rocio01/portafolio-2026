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

  it("animates the mobile menu open and closed", () => {
    cy.viewport(390, 844);
    cy.visit("/en");
    cy.get('button[aria-label^="Switch to"]').should("be.visible");

    cy.get('button[aria-label="Open menu"]').click();
    cy.get(".menu-panel")
      .should("have.attr", "data-state", "open")
      .and("have.css", "animation-name", "menu-panel-open");
    // Halfway through, the panel is partly open: it grows, it does not jump.
    cy.get(".menu-panel").then(($panel) => {
      const panel = $panel.get(0)!;
      const [animation] = panel.getAnimations();
      expect(animation, "open animation").to.not.equal(undefined);
      animation!.pause();
      animation!.currentTime = 125;
      const halfway = panel.getBoundingClientRect().height;
      animation!.finish();
      const full = panel.getBoundingClientRect().height;
      expect(halfway).to.be.greaterThan(0).and.lessThan(full);
    });

    cy.get('button[aria-label="Close menu"]').click();
    cy.get(".menu-panel")
      .should("have.attr", "data-state", "closing")
      .and("have.attr", "inert");
    cy.get(".menu-panel").should("not.exist");
  });

  it("opens and closes the mobile menu at once with prefers-reduced-motion", () => {
    emulateReducedMotion("reduce");
    cy.viewport(390, 844);
    cy.visit("/en");
    cy.get('button[aria-label^="Switch to"]').should("be.visible");
    cy.get('button[aria-label="Open menu"]').click();
    cy.get(".menu-panel").should("have.css", "animation-name", "none");
    cy.get('button[aria-label="Close menu"]').click();
    // Checked once, without retrying: no 200ms closing state.
    cy.get("body").then(($body) => {
      expect($body.find(".menu-panel")).to.have.length(0);
    });
  });
});
