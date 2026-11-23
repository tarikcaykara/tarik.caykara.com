import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const month = z.string().regex(/^\d{4}-\d{2}$/, "expected YYYY-MM");

// Notes: src/content/notes/<slug>.md → /notes/<slug>. A missing, invalid or unknown
// field fails the build. Dates are written as YYYY-MM-DD.
const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
  schema: z
    .object({
      title: z.string().trim().min(1).max(80),
      description: z.string().trim().min(1).max(200),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      // Shown in dev, left out of production builds (src/lib/notes.ts).
      draft: z.boolean().default(false),
    })
    .strict()
    .refine(
      (data) =>
        data.updatedAt === undefined || data.updatedAt >= data.publishedAt,
      {
        message: "updatedAt must not be before publishedAt",
        path: ["updatedAt"],
      },
    ),
});

// Roles on the home page, sorted by `order` ascending.
const experience = defineCollection({
  loader: file("src/content/experience.yaml"),
  schema: z
    .object({
      role: z.string().trim().min(1),
      org: z.string().trim().min(1),
      summary: z.string().trim().min(1),
      start: month,
      end: z.union([month, z.literal("present")]),
      highlights: z.array(z.string().trim().min(1)).min(1).max(5),
      order: z.number().int(),
    })
    .strict(),
});

// Selected work on the home page, sorted by `order` ascending.
const projects = defineCollection({
  loader: file("src/content/projects.yaml"),
  schema: z
    .object({
      name: z.string().trim().min(1),
      kind: z.string().trim().min(1),
      problem: z.string().trim().min(1),
      built: z.string().trim().min(1),
      outcome: z.string().trim().min(1),
      stack: z.array(z.string().trim().min(1)).min(1).max(6),
      // Shown above the facts, one row each.
      metrics: z
        .array(
          z
            .object({
              value: z.string().trim().min(1),
              label: z.string().trim().min(1),
            })
            .strict(),
        )
        .min(1)
        .max(2)
        .optional(),
      link: z
        .string()
        .regex(/^https:\/\//)
        .optional(),
      order: z.number().int(),
    })
    .strict(),
});

export const collections = { notes, experience, projects };
