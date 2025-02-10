import { Card } from "@/components/ui/focus-cards";
import type { Project } from "@/types/project";
import { useState } from "react";
import { GlowingEffect } from "./ui/glowing-effect";

export function ProjectList ({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" className="grid grid-cols-3 justify-center w-full gap-5">
      {projects
        .sort((a, b) => a.index - b.index)
        .map((project) => (
          <div
            key={project.index}
            className="relative h-full border rounded-2xl border-slate-500 z-10 hover:border-none">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.07} borderWidth={2} />
            <Card
              card={project}
              index={project.index}
              hovered={hovered}
              setHovered={setHovered}
            />

          </div>
        ))}
    </section>
  );
}