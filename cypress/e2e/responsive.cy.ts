// Backlog item 16: at each width, in both languages, the page has no
// horizontal scroll, no text is cut off, and the header stays on one row.
// 320px is the smallest phone width we support; the others are the
// acceptance criteria (390, 768, 1280) plus 1024 for small laptops.
const widths = [320, 390, 768, 1024, 1280];

function visible(el: Element) {
  const style = getComputedStyle(el);
  return style.display !== "none" && style.visibility !== "hidden";
}

for (const lang of ["en", "es"]) {
  describe(`responsive (${lang})`, () => {
    for (const width of widths) {
      it(`fits ${width}px`, () => {
        cy.viewport(width, 900);
        cy.visit(`/${lang}`);
        // The theme toggle renders after hydration; wait so it is measured.
        cy.get("header button").should("have.length.at.least", 1);

        cy.document().then((doc) => {
          const root = doc.documentElement;
          expect(root.scrollWidth, "page width").to.be.at.most(
            root.clientWidth,
          );

          // Text cut off: a visible element whose content is wider than its
          // box while its overflow is hidden, clipped or scrolled.
          const clipped = [...doc.querySelectorAll("body *")]
            .filter(visible)
            .filter((el) => getComputedStyle(el).overflowX !== "visible")
            .filter((el) => el.scrollWidth > el.clientWidth + 1)
            .map((el) => `${el.tagName} "${el.textContent?.slice(0, 30)}"`);
          expect(clipped, "clipped elements").to.deep.equal([]);

          const row = doc.querySelector("header > div");
          const tops = [...(row?.children ?? [])].filter(visible).map((el) => {
            const rect = el.getBoundingClientRect();
            return Math.round(rect.top + rect.height / 2);
          });
          expect(new Set(tops).size, "header rows").to.equal(1);
        });
      });
    }
  });
}
