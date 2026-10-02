// Token values from CLAUDE.md, as the browser reports them.
const LIGHT_BG = "rgb(243, 244, 241)"; // --bg light #F3F4F1
const DARK_BG = "rgb(17, 18, 21)"; // --bg dark #111215

const themeButton = (label: string) => cy.get(`button[aria-label="${label}"]`);

function visitWithLanguages(path: string, languages: string[]) {
  cy.visit(path, {
    onBeforeLoad(win) {
      Object.defineProperty(win.navigator, "languages", { value: languages });
    },
  });
}

describe("smoke", () => {
  it("loads the English page", () => {
    cy.visit("/en");
    cy.get("html").should("have.attr", "lang", "en");
    cy.get("h1").should("have.length", 1).and("be.visible");
    cy.title().should("not.be.empty");
  });

  it("redirects / to Spanish for a Spanish browser", () => {
    visitWithLanguages("/", ["es-CO", "en"]);
    cy.location("pathname").should("match", /^\/es\/?$/);
    cy.get("html").should("have.attr", "lang", "es");
  });

  it("redirects / to English for any other browser language", () => {
    visitWithLanguages("/", ["fr-FR"]);
    cy.location("pathname").should("match", /^\/en\/?$/);
  });

  // cy.request fetches the HTML without running scripts, like the LinkedIn
  // and WhatsApp crawlers that build link previews.
  it("serves preview metadata on / for crawlers that skip the redirect", () => {
    cy.request("/").then(({ body }) => {
      const html = String(body);
      expect(html).to.match(/<title>[^<]*Zulma Rocio Martinez/);
      expect(html).to.match(/property="og:image" content="[^"]*\/og\.png"/);
      expect(html).to.match(/name="description" content="[^"]+"/);
    });
    cy.request("/og.png").its("status").should("eq", 200);
  });

  it("serves the resume the hero links to", () => {
    cy.visit("/en");
    cy.contains("a", "Download resume")
      .invoke("attr", "href")
      .then((href) => cy.request(String(href)))
      .its("headers.content-type")
      .should("include", "application/pdf");
  });

  it("switches language from the toggle", () => {
    cy.visit("/en");
    cy.get('a[aria-label="Español"]').click();
    cy.location("pathname").should("match", /^\/es\/?$/);
    cy.get('a[aria-label="English"]').should("be.visible");
  });

  it("applies a stored theme before the app loads", () => {
    cy.visit("/en", {
      onBeforeLoad(win) {
        win.localStorage.setItem("theme", "dark");
      },
    });
    // Set by the inline script, before React or any bundle runs.
    cy.document().its("documentElement.dataset.theme").should("eq", "dark");
    cy.get("body").should("have.css", "background-color", DARK_BG);
  });

  it("switches the theme and remembers it after a reload", () => {
    cy.visit("/en", {
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

describe("contact card", () => {
  // innerText skips display:none, like the accessible name: it is the one
  // label a screen reader reads at each width.
  const emailLink = () => cy.get('#contact a[href^="mailto:"]');

  it("shows 'Email me' on a phone and the address on desktop", () => {
    cy.viewport(390, 844);
    cy.visit("/en");
    emailLink().invoke("prop", "innerText").should("eq", "Email me");

    cy.viewport(1280, 900);
    emailLink()
      .invoke("prop", "innerText")
      .should("eq", "zrmartinezg@gmail.com");
  });

  it("uses the Spanish label on a phone", () => {
    cy.viewport(390, 844);
    cy.visit("/es");
    emailLink().invoke("prop", "innerText").should("eq", "Escríbeme");
  });

  it("draws the focus ring in the inverted link color", () => {
    cy.visit("/en", {
      onBeforeLoad(win) {
        win.localStorage.setItem("theme", "light");
      },
    });
    // --link inside .inverse in light mode: #9db0ff, readable on the dark card.
    emailLink()
      .focus()
      .should("have.css", "outline-color", "rgb(157, 176, 255)");
  });
});
