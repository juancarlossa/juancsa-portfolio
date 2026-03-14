import { Card } from "@/components/ui/focus-cards";
import type { Project, Category } from "@/types/project";
import { useState } from "react";
import { GlowingEffect } from "./ui/glowing-effect";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, type Variants } from "framer-motion";

type Filter = "All" | Category;
const FILTERS: Filter[] = ["All", "React", "Spring Boot", "Unity"];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.07,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.92,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

/**
 * Returns Tailwind span classes based on total count of filtered projects
 * and the card's position (index) in the list.
 *
 * Layout rules:
 *  1  → full width + tall
 *  2  → two equally wide large cards
 *  3  → one full-width large + two small
 *  4  → two large top + two small bottom
 *  5  → one full-width large + four small
 *  6+ → original bento (positions 2 & 3 are large)
 */
function getSpanClasses(count: number, index: number): string {
  switch (count) {
    case 1:
      return "col-span-4 row-span-3 w-[800px] max-h-[400px] mt-10 mx-auto";

    case 2:
      return "col-span-2 row-span-2";

    case 3:
      if (index === 0) return "col-span-4 row-span-2";
      return "col-span-2 row-span-1";

    case 4:
      if (index < 2) return "col-span-2 row-span-2";
      return "col-span-2 row-span-1";

    case 5:
      if (index === 0 || index === 2) return "col-span-2 row-span-2";
      return "col-span-1 row-span-1";

    default:
      // 6+: original layout — positions 2 & 3 are large
      if (index === 2 || index === 3) return "col-span-2 row-span-2";
      return "col-span-1 row-span-1";
  }
}

export function ProjectList({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  console.log("projects length:", projects.length, "active filter:", activeFilter);
  const filtered = projects
    .sort((a, b) => a.index - b.index)
    .filter((p) => activeFilter === "All" || p.category.includes(activeFilter as Category));

  function handleFilter(filter: Filter) {
    if (filter === activeFilter) return;
    setActiveFilter(filter);
    setHovered(null);
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Filter buttons */}
      <div className="flex flex-row gap-2 justify-center flex-wrap">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilter(filter)}
            className={cn(
              "cursor-target relative px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
              "border border-slate-700/60 backdrop-blur-sm",
              activeFilter === filter
                ? "bg-violet-600/80 border-violet-500 text-white shadow-[0_0_12px_2px] shadow-violet-700/40"
                : "bg-slate-900/50 text-slate-400 hover:text-slate-200 hover:border-slate-500 hover:bg-slate-800/50"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Animated bento grid */}
      <section
        id="projects"
        className="lg:grid lg:grid-cols-4 gap-2 lg:auto-rows-[200px] lg:px-20 px-5 flex flex-col"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => {
            const spanClasses = getSpanClasses(filtered.length, i);

            return (
              <motion.div
                key={project.index}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className={cn(
                  "cursor-target relative border rounded-2xl border-slate-500 z-10",
                  spanClasses
                )}
              >
                <GlowingEffect
                  spread={30}
                  glow={true}
                  disabled={false}
                  proximity={100}
                  inactiveZone={0.07}
                  borderWidth={3}
                />
                <Card
                  card={project}
                  index={project.index}
                  hovered={hovered}
                  setHovered={setHovered}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </section>
    </div>
  );
}