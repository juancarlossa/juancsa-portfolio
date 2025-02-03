import { Card } from "@/components/ui/focus-cards";
import type { Project } from "@/types/project";
import { useState } from "react";

export function ProjectList ({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" className="grid grid-cols-2 justify-center w-full gap-1">
      {projects
        .sort((a, b) => a.index - b.index)
        .map((project) => (
          <Card
            key={project.index}
            card={project}
            index={project.index}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
    </section>
  );
}