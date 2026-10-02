import { ThemeToggle } from "@/components/theme-toggle";

// Placeholder until the header and hero sections land (backlog issues 8 and 9).
// Copy from docs/content.md (hero.label, theme.toDark, theme.toLight). The
// labels come from the dictionaries once the language switch lands (item 6).
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-4 px-6 py-16">
      <div className="flex justify-end">
        <ThemeToggle
          labels={{
            toDark: "Switch to dark mode",
            toLight: "Switch to light mode",
          }}
        />
      </div>
      <h1 className="text-4xl font-semibold tracking-tight">
        Zulma Rocio Martinez
      </h1>
      <p className="font-mono text-sm text-accent-text">
        Frontend Developer · React · TypeScript · Next.js
      </p>
    </main>
  );
}
