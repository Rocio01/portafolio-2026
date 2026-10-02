import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { LanguageToggle } from "@/components/language-toggle";
import { MobileMenu } from "@/components/mobile-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";

/**
 * Desktop (768px and up): name, section links, theme, language, Contact.
 * Mobile: name, theme, language and a menu button that opens the links.
 * A server component: only the theme toggle and the menu ship JavaScript.
 */
export function Header({ locale, t }: { locale: Locale; t: Dictionary }) {
  const links = [
    { href: "#work", label: t.nav.work },
    { href: "#projects", label: t.nav.projects },
    { href: "#about", label: t.nav.about },
  ];
  const contact = { href: "#contact", label: t.nav.contact };

  return (
    <header className="border-b border-border md:border-b-0">
      <Container className="flex flex-wrap items-center gap-1 py-4 md:gap-2 md:py-7">
        {/* The design's header shows the short name. */}
        <a
          href="#top"
          className="mr-auto font-heading text-lg font-bold text-ink no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link md:text-xl"
        >
          Zulma Martinez
        </a>

        <nav aria-label={t.nav.label} className="hidden items-center md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center px-3.5 text-[15px] text-text2 no-underline hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <ThemeToggle labels={t.theme} />
        <LanguageToggle locale={locale} switchToLabel={t.language.switchTo} />

        {/* Wrapped, not className="hidden": the button's own inline-flex
            class would win over hidden and show it on mobile. */}
        <div className="hidden md:block">
          <ButtonLink href={contact.href} variant="inverted" size="sm">
            {contact.label}
          </ButtonLink>
        </div>

        <MobileMenu
          links={links}
          contact={contact}
          labels={t.menu}
          navLabel={t.nav.label}
        />
      </Container>
    </header>
  );
}
