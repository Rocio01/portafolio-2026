describe("smoke", () => {
  it("loads the home page", () => {
    cy.visit("/");
    cy.get("h1").should("be.visible");
    cy.title().should("not.be.empty");
  });
});
