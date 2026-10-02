import type { Localized } from "@/data/experience";

// Copy from docs/content.md ("Projects"). To add a project, add one object
// to PROJECTS; to announce one, add it to UPCOMING.

export type Project = {
  id: string;
  title: Localized;
  text: Localized;
  /** Shown in mono under the text: "Vite · React · ...". */
  stack: readonly string[];
  /** A file in public/. The alt text describes the screenshot. */
  image: { src: string; width: number; height: number; alt: Localized };
  /** Each link is optional: a missing one hides its button. */
  demo?: string;
  code?: string;
};

export type UpcomingProject = { id: string; title: Localized; text: Localized };

export const PROJECTS: readonly Project[] = [
  {
    id: "attention-game",
    title: {
      en: "Attention training game",
      es: "Juego de entrenamiento de atención",
    },
    text: {
      en: "A cognitive training web app I built for my parents. Difficulty adapts to each player with a staircase algorithm, and peripheral traffic-sign stimuli train divided attention.",
      es: "Una app web de entrenamiento cognitivo que hice para mis papás. La dificultad se adapta a cada jugador con un algoritmo de escalera, y estímulos periféricos con señales de tránsito entrenan la atención dividida.",
    },
    stack: ["Vite", "React", "TypeScript", "Cloudflare Workers"],
    image: {
      src: "/projects/attention-game.png",
      width: 1280,
      height: 800,
      alt: {
        en: "Start screen of the attention training game, with a large Play button.",
        es: "Pantalla de inicio del juego de entrenamiento de atención, con un botón grande de Jugar.",
      },
    },
    demo: "https://juego-atencion.zrmartinezg.workers.dev/",
    // The repository is private; add `code` when it is public.
  },
];

// Empty until the next project has real copy in docs/content.md.
export const UPCOMING: readonly UpcomingProject[] = [];
