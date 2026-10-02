import { Container } from "@/components/container";
import type { Dictionary } from "@/i18n/en";

/** The page footer, outside <main>, right under the contact card. */
export function Footer({ t }: { t: Dictionary }) {
  return (
    <footer>
      <Container className="pt-7 pb-16 text-center text-[13px] text-muted md:pt-8 md:pb-[120px] md:text-left md:text-sm">
        {t.footer}
      </Container>
    </footer>
  );
}
