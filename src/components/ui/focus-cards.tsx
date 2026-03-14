import React, { useState } from "react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: Project;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (

    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative border-violet-600 rounded-2xl bg-transparent overflow-hidden w-full h-full aspect-[16/9] transition-all duration-500 ease-out",
        hovered === index && "brightness-110 saturate-150 scale-[1.02]",
        hovered !== null && hovered !== index && "blur-sm "
      )}
    >

      <img
        src={`/${card.img}`}
        alt={card.title}
        className="
      object-cover absolute inset-0 w-full h-full z-0
      brightness-90 contrast-110 saturate-90
      transition-transform duration-700
      group-hover:scale-105 will-change-transform
      "
      />

      {/* Gradient overlay: slate→indigo, fades out on hover */}
      <div
        className={cn(
          "absolute inset-0 z-10 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-transparent transition-opacity duration-500",
          hovered === index ? "opacity-0" : "opacity-100"
        )}
      />

      <div
        className={cn(
          "absolute inset-0 z-20  flex flex-row items-end justify-between transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="flex flex-row justify-between w-full bg-slate-900/90 py-8 px-10">
          <h3 className="text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
            {card.title}
          </h3>

          <div className="space-x-1 flex flex-row justify-center items-center">
            <button className="bg-slate-800 p-2 rounded-full size-9 shadow-[0_0_5px_2px] shadow-violet-900/50 hover:scale-110 transition duration-300">
              <a href={card.url.github}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
              </a>
            </button>

            {card.url.source && (
              <button className="bg-slate-800 p-2 rounded-full size-9 shadow-[0_0_5px_2px] shadow-violet-900/50 hover:scale-110 transition duration-300">
                <a href={card.url.source}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-link"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 15l6 -6" /><path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" /><path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" /></svg>
                </a>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
);

Card.displayName = "Card";



