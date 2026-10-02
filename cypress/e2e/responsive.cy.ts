// Backlog item 16: at each width, in both languages and both themes, the
// page has no horizontal scroll, no text is cut off, and the header stays on
// one row. 320px is the smallest phone width we support; the others are the
// acceptance criteria (390, 768, 1280) plus 1024 for small laptops.
const widths = [320, 390, 768, 1024, 1280];

// The theme toggle's name before switching, per language: it renders only
// after hydration, so waiting for it means the header is complete.
const toggleLabel = {
  en: { light: "Switch to dark mode", dark: "Switch to light mode" },
  es: { light: "Activar modo oscuro", dark: "Activar modo claro" },
} as const;

// Visible on screen: not display:none, inside a hidden parent or empty.
function rendered(el: Element) {
  return el.getClientRects().length > 0;
}

function hasOwnText(el: Element) {
  return [...el.childNodes].some(
    (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
  );
}

function describeEl(el: Element) {
  return `${el.tagName} "${el.textContent?.trim().slice(0, 30)}"`;
}

for (const lang of ["en", "es"] as const) {
  for (const theme of ["light", "dark"] as const) {
    describe(`responsive (${lang}, ${theme})`, () => {
      for (const width of widths) {
        it(`fits ${width}px`, () => {
          cy.viewport(width, 900);
          cy.visit(`/${lang}`, {
            onBeforeLoad(win) {
              win.localStorage.setItem("theme", theme);
            },
          });
          cy.get(`button[aria-label="${toggleLabel[lang][theme]}"]`).should(
            "be.visible",
          );
          // Measure with the real fonts, not the fallback.
          cy.document().its("fonts.status").should("eq", "loaded");

          cy.document().then((doc) => {
            const root = doc.documentElement;
            const pageWidth = root.clientWidth;
            expect(root.scrollWidth, "page width").to.be.at.most(pageWidth);

            const elements = [...doc.querySelectorAll("body *")].filter(
              rendered,
            );

            // Text that runs off either side of the screen.
            const offScreen = elements.filter(hasOwnText).filter((el) => {
              const rect = el.getBoundingClientRect();
              return rect.left < -0.5 || rect.right > pageWidth + 0.5;
            });
            expect(offScreen.map(describeEl), "text off screen").to.deep.equal(
              [],
            );

            // Content cut off by a box that hides or scrolls its overflow.
            const clipped = elements.filter((el) => {
              const style = getComputedStyle(el);
              const cutX =
                style.overflowX !== "visible" &&
                el.scrollWidth > el.clientWidth + 1;
              const cutY =
                style.overflowY !== "visible" &&
                el.scrollHeight > el.clientHeight + 1;
              return cutX || cutY;
            });
            expect(clipped.map(describeEl), "clipped boxes").to.deep.equal([]);

            // One header row: every visible item has about the same center.
            const centers = [
              ...(doc.querySelector("header > div")?.children ?? []),
            ]
              .filter(rendered)
              .map((el) => {
                const rect = el.getBoundingClientRect();
                return rect.top + rect.height / 2;
              });
            expect(
              Math.max(...centers) - Math.min(...centers),
              "header rows",
            ).to.be.lessThan(2);
          });
        });
      }
    });
  }
}
