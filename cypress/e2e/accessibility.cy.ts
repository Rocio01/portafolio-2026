// Backlog item 17: axe-core checks in both languages and both themes, on a
// phone and a desktop width. The WCAG 2.1 A/AA rules cover contrast (4.5:1
// for text), names and roles; the best-practice rules add one h1, heading
// order and landmarks. Keyboard use is checked by the tests further down.

type AxeViolation = {
  id: string;
  impact: string | null;
  help: string;
  nodes: { target: string[] }[];
};

function runAxe() {
  cy.readFile("node_modules/axe-core/axe.min.js").then((source: string) => {
    cy.window().then((win) => {
      win.eval(source);
    });
  });
  return cy.window().then((win) =>
    (
      win as unknown as {
        axe: {
          run: (
            context: Document,
            options: object,
          ) => Promise<{ violations: AxeViolation[] }>;
        };
      }
    ).axe
      .run(win.document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"],
        },
      })
      .then((result) => result.violations),
  );
}

// Scroll reveals start at opacity 0, which axe cannot measure contrast on.
// Bring each one into view in turn (a fast scroll can skip past a section
// before the observer fires) and wait until it is fully visible.
function revealEverything() {
  cy.get("[data-reveal]").each(($el) => {
    cy.wrap($el).scrollIntoView();
    cy.wrap($el).should("have.css", "opacity", "1");
  });
}

const viewports: [string, number, number][] = [
  ["phone", 390, 844],
  ["desktop", 1280, 900],
];

for (const lang of ["en", "es"]) {
  for (const theme of ["light", "dark"]) {
    for (const [name, width, height] of viewports) {
      it(`has no axe violations (${lang}, ${theme}, ${name})`, () => {
        cy.viewport(width, height);
        cy.visit(`/${lang}`, {
          onBeforeLoad(win) {
            win.localStorage.setItem("theme", theme);
          },
        });
        cy.document().its("fonts.status").should("eq", "loaded");
        revealEverything();
        runAxe().then((violations) => {
          const summary = violations.map(
            (v) =>
              `${v.id} (${v.impact}): ${v.help} → ${v.nodes
                .map((n) => n.target.join(" "))
                .join(", ")}`,
          );
          expect(summary, "axe violations").to.deep.equal([]);
        });
      });
    }
  }
}

// Keyboard: Tab reaches every link and button on the page, in reading
// order, and each one shows a focus outline and a pointer cursor.
const FOCUSABLE = "a[href], button:not([disabled])";

function tabThroughPage() {
  cy.get("body").then(($body) => {
    const expected = [...$body.get(0)!.querySelectorAll<HTMLElement>(FOCUSABLE)]
      .filter((el) => el.getClientRects().length > 0)
      .filter((el) => getComputedStyle(el).visibility !== "hidden");
    expect(expected.length, "focusable elements").to.be.greaterThan(5);

    expected.forEach((el, index) => {
      cy.press(Cypress.Keyboard.Keys.TAB);
      cy.focused().then(($focused) => {
        const label =
          el.getAttribute("aria-label") ?? el.textContent?.trim() ?? "";
        const focused = $focused.get(0)!;
        expect(focused, `tab stop ${index + 1}: ${label}`).to.equal(el);
        const style = getComputedStyle(focused);
        expect(style.cursor, `${label} cursor`).to.equal("pointer");
        expect(style.outlineStyle, `${label} outline`).to.not.equal("none");
        expect(
          parseFloat(style.outlineWidth),
          `${label} outline`,
        ).to.be.at.least(2);
      });
    });
  });
}

for (const [name, width, height] of viewports) {
  it(`reaches every link and button with Tab, with a visible focus and a pointer cursor (${name})`, () => {
    cy.viewport(width, height);
    cy.visit("/en");
    cy.get('button[aria-label^="Switch to"]').should("be.visible");
    revealEverything();
    cy.scrollTo("top");
    tabThroughPage();
  });
}

it("opens and closes the mobile menu with the keyboard", () => {
  cy.viewport(390, 844);
  cy.visit("/en");
  // The button only works once React has hydrated; the theme toggle
  // appears at that point.
  cy.get('button[aria-label^="Switch to"]').should("be.visible");
  cy.get('button[aria-label="Open menu"]').focus();
  // Space, not Enter: in our runs cy.press(ENTER) did not activate the
  // button, although Enter works in a real browser. Space does.
  cy.press(Cypress.Keyboard.Keys.SPACE);
  cy.get('button[aria-label="Close menu"]').should(
    "have.attr",
    "aria-expanded",
    "true",
  );
  cy.press(Cypress.Keyboard.Keys.TAB);
  cy.focused().should("have.attr", "href", "#work");
  cy.get("body").type("{esc}");
  cy.focused().should("have.attr", "aria-label", "Open menu");
  cy.get('button[aria-label="Open menu"]').should(
    "have.attr",
    "aria-expanded",
    "false",
  );
});
