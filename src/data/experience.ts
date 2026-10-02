import type { Locale } from "@/i18n/config";

// Copy from docs/content.md ("Experience"). Text that changes with the
// language is a Localized pair; tag names are the same in both.
export type Localized = Record<Locale, string>;

export type Job = {
  id: string;
  meta: Localized;
  title: Localized;
  summary: Localized;
  tags: readonly string[];
  /** Shown as a list beside the summary on desktop, below it on mobile. */
  highlights?: readonly { title: Localized; text: Localized }[];
};

export const EXPERIENCE: readonly Job[] = [
  {
    id: "healthcare",
    meta: {
      en: "Cressco · Jun 2022 – Sep 2026",
      es: "Cressco · jun 2022 – sep 2026",
    },
    title: {
      en: "UK healthcare care-management platform",
      es: "Plataforma de gestión de cuidados de salud (Reino Unido)",
    },
    summary: {
      en: "Main frontend developer. I worked across architecture, features, QA and releases for a platform that care providers use to manage scheduling, staff compliance and invoicing.",
      es: "Desarrolladora frontend principal. Trabajé en arquitectura, funcionalidades, QA y lanzamientos de una plataforma que los proveedores de cuidado usan para gestionar agendas, cumplimiento del personal y facturación.",
    },
    tags: [
      "React",
      "TypeScript",
      "Next.js",
      "TanStack Query",
      "Zustand",
      "Auth0",
      "Cypress",
    ],
    highlights: [
      {
        title: { en: "Scheduling module", es: "Módulo de agenda" },
        text: {
          en: "One-off and recurring appointments (RRULE), cancellations, check-in and check-out.",
          es: "Citas únicas y recurrentes (RRULE), cancelaciones, check-in y check-out.",
        },
      },
      {
        title: {
          en: "Auth0 session handling",
          es: "Manejo de sesiones con Auth0",
        },
        text: {
          en: "Token expiration, automatic logout, and sessions in browsers that block cookies.",
          es: "Expiración de tokens, cierre de sesión automático y sesiones en navegadores que bloquean cookies.",
        },
      },
      {
        title: {
          en: "Reusable data table",
          es: "Tabla de datos reutilizable",
        },
        text: {
          en: "Server-side pagination and filtering, with filter chips.",
          es: "Paginación y filtros del lado del servidor, con chips de filtro.",
        },
      },
      {
        title: { en: "Releases", es: "Lanzamientos" },
        text: {
          en: "Production, staging and a client-acceptance environment on Cloudflare Pages, so the client could test each release before it went live.",
          es: "Producción, staging y un entorno de aceptación en Cloudflare Pages, para que el cliente probara cada versión antes de salir a producción.",
        },
      },
    ],
  },
  {
    id: "visual-artists",
    meta: { en: "Cressco · Frontend", es: "Cressco · Frontend" },
    title: {
      en: "Platform for visual artists",
      es: "Plataforma para artistas visuales",
    },
    summary: {
      en: "Built frontend features for a platform that connects visual artists with organizations. Artists upload and manage their artwork and portfolios; organizations publish and run open calls for submissions.",
      es: "Desarrollé funcionalidades frontend para una plataforma que conecta artistas visuales con organizaciones. Los artistas suben y gestionan sus obras y portafolios; las organizaciones publican y gestionan convocatorias.",
    },
    tags: ["React", "JavaScript"],
  },
];
