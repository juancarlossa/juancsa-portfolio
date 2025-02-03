import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: z.object({
    index: z.number(),
    title: z.string(),
    description: z.string(),
    img: z.string(),
    url: z.object({
      github: z.string().url(),
      source: z.string().url().optional(),
    }),
  }),
})

export const collections = { projects };