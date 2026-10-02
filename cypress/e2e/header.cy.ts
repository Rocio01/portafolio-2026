// The sticky header: it stays at the top while the page scrolls, and the
// section links stop below it instead of hiding the section titles.

function waitForHydration() {
  cy.get('button[aria-label^="Switch to"]').should("be.visible");
}

function expectBelowHeader(section: string) {
  cy.get("header").then(($header) => {
    const headerBottom = $header.get(0)!.getBoundingClientRect().bottom;
    cy.get(`${section} h2`).should(($title) => {
      const top = $title.get(0)!.getBoundingClientRect().top;
      expect(top, "title top").to.be.at.least(headerBottom);
      // Not far below either: only the section's own top padding (up to
      // 104px) and its label sit in between.
      expect(top, "title top").to.be.lessThan(headerBottom + 160);
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
      expectBelowHeader(`#${id}`);
    }
  });

  it("stops mobile menu links below the header", () => {
    cy.viewport(390, 844);
    cy.visit("/en");
    waitForHydration();
    cy.get('button[aria-label="Open menu"]').click();
    cy.get('.menu-panel a[href="#projects"]').click();
    cy.get(".menu-panel").should("not.exist");
    expectBelowHeader("#projects");
  });
});
