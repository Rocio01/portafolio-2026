// The sticky header: it stays at the top while the page scrolls, and
// nothing the browser scrolls to (a section, a focused link) ends up under it.

function waitForHydration() {
  cy.get('button[aria-label^="Switch to"]').should("be.visible");
}

const headerBottom = () =>
  cy
    .get("header")
    .then(($header) => $header.get(0)!.getBoundingClientRect().bottom);

// The section starts right below the header: scroll padding is 3px more
// than the header height. A revealed section is measured once its fade-in
// has finished, so its 24px start offset does not count.
function expectSectionBelowHeader(id: string) {
  cy.get("body").then(($body) => {
    if ($body.find(`#${id} [data-reveal]`).length > 0) {
      cy.get(`#${id} [data-reveal]`)
        .should("have.css", "opacity", "1")
        .and("have.css", "transform", "none");
    }
  });
  headerBottom().then((bottom) => {
    cy.get(`#${id}`).should(($section) => {
      const top = $section.get(0)!.getBoundingClientRect().top;
      expect(top, `#${id} top`).to.be.within(bottom - 1, bottom + 30);
    });
  });
}

describe("sticky header", () => {
  it("stays at the top and shows its border once the page scrolls (desktop)", () => {
    cy.viewport(1280, 800);
    cy.visit("/en");
    waitForHydration();
    cy.get("header")
      .should("have.attr", "data-scrolled", "false")
      .and("have.css", "border-bottom-color", "rgba(0, 0, 0, 0)");

    cy.scrollTo(0, 1500);
    cy.get("header")
      .should("have.attr", "data-scrolled", "true")
      .and(($header) => {
        expect($header.get(0)!.getBoundingClientRect().top).to.equal(0);
        expect(
          getComputedStyle($header.get(0)!).borderBottomColor,
        ).to.not.equal("rgba(0, 0, 0, 0)");
      });
  });

  it("stops desktop section links below the header", () => {
    cy.viewport(1280, 800);
    cy.visit("/en");
    waitForHydration();
    for (const id of ["work", "projects", "about"]) {
      cy.get(`header nav a[href="#${id}"]`).click();
      expectSectionBelowHeader(id);
    }
  });

  it("stops mobile menu links below the header", () => {
    cy.viewport(390, 844);
    cy.visit("/en");
    waitForHydration();
    cy.get('button[aria-label="Open menu"]').click();
    cy.get('.menu-panel a[href="#projects"]').click();
    cy.get(".menu-panel").should("not.exist");
    expectSectionBelowHeader("projects");
  });

  // Shift+Tab to a link above the viewport scrolls it just into view. Firefox
  // aligns it with the top edge (Chrome centers it), which is where the
  // sticky header sits; scrollIntoView({ block: "nearest" }) reproduces that
  // in Cypress's Chrome. Scroll padding must keep the link below the header.
  for (const [name, width, height] of [
    ["phone", 390, 844],
    ["desktop", 1280, 800],
  ] as const) {
    it(`keeps a link scrolled to from below clear of the header (${name})`, () => {
      cy.viewport(width, height);
      cy.visit("/en");
      waitForHydration();
      cy.get("#contact").scrollIntoView();
      const link = '#projects a[href*="github.com/Rocio01/juego-atencion"]';
      cy.get(link).should(($link) => {
        expect($link.get(0)!.getBoundingClientRect().bottom).to.be.below(0);
      });
      cy.get(link).then(($link) => {
        $link.get(0)!.scrollIntoView({ block: "nearest" });
      });
      headerBottom().then((bottom) => {
        cy.get(link).should(($link) => {
          const top = $link.get(0)!.getBoundingClientRect().top;
          expect(top, "link top").to.be.at.least(bottom);
        });
      });
    });
  }

  it("keeps the open mobile menu within a short screen", () => {
    // A phone held sideways: under 768px wide, so the menu button shows.
    cy.viewport(700, 320);
    cy.visit("/en");
    waitForHydration();
    cy.get('button[aria-label="Open menu"]').click();
    cy.get(".menu-panel").should(
      "have.css",
      "animation-name",
      "menu-panel-open",
    );
    cy.get("header").should(($header) => {
      expect($header.get(0)!.getBoundingClientRect().bottom).to.be.at.most(320);
    });
    // The last link scrolls into view inside the panel.
    cy.get('.menu-panel a[href="#contact"]').scrollIntoView();
    cy.get('.menu-panel a[href="#contact"]').should("be.visible");
  });
});
