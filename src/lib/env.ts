import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().transform((url) => url.replace(/\/$/, "")),
});

// Each variable is referenced by its full name so Next.js can inline it at
// build time. Destructuring `process.env` would leave the values undefined.
const parsed = schema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables:\n${z.prettifyError(parsed.error)}\nSee .env.example.`,
  );
}

export const env = parsed.data;
