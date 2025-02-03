import type { InferEntrySchema, Render, RenderedContent } from "astro:content";


export type Project = {
  index: number;
  title: string;
  description: string;
  img: string;
  url: {
    github: string,
    source?: string
  };
};