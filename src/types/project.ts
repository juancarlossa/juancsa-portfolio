import type { InferEntrySchema, Render, RenderedContent } from "astro:content";


export type Category = "React" | "Spring Boot" | "Unity";

export type Project = {
  index: number;
  title: string;
  description: string;
  img: string;
  category: Category[];
  url: {
    github: string,
    source?: string
  };
};