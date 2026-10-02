// Token values from CLAUDE.md, as the browser reports them.
const LIGHT_BG = "rgb(243, 244, 241)"; // --bg light #F3F4F1
const DARK_BG = "rgb(17, 18, 21)"; // --bg dark #111215

const themeButton = (label: string) => cy.get(`button[aria-label="${label}"]`);

describe("smoke", () => {
  it("loads the home page", () => {
    cy.visit("/");
    cy.get("h1").should("be.visible");
    cy.title().should("not.be.empty");
  });

  it("applies a stored theme before the app loads", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.setItem("theme", "dark");
      },
    });
    // Set by the inline script in <head>, before React or any bundle runs.
    cy.document().its("documentElement.dataset.theme").should("eq", "dark");
    cy.get("body").should("have.css", "background-color", DARK_BG);
  });

  it("switches the theme and remembers it after a reload", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.setItem("theme", "light");
      },
    });
    cy.get("body").should("have.css", "background-color", LIGHT_BG);

    themeButton("Switch to dark mode").click();
    cy.get("body").should("have.css", "background-color", DARK_BG);
    themeButton("Switch to light mode");

    cy.reload();
    cy.get("body").should("have.css", "background-color", DARK_BG);
    themeButton("Switch to light mode");
  });
});
