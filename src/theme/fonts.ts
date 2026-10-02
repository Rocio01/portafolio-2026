import { IBM_Plex_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";

// Downloaded at build time and self-hosted: no runtime request to Google.
// Each font exposes a CSS variable that globals.css maps to a Tailwind
// family: font-heading, font-sans and font-mono. Only the weights in the
// design are loaded, to keep the font files small.

export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600"],
});

export const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
});

/** Class names that define the font variables; put them on <html>. */
export const fontVariables = [spaceGrotesk, plexSans, jetbrainsMono]
  .map((font) => font.variable)
  .join(" ");
