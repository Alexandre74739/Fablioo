"use client";

import Pill from "@/_components/animations/Pill";

const skillRows: { label: string; color: string; rotate: number }[][] = [
  [
    {
      label: "Comprendre vos clients",
      color: "bg-sand text-encre",
      rotate: -4,
    },
    { label: "Design", color: "bg-rosewood text-paper", rotate: 3 },
  ],
  [
    { label: "Prototypage", color: "bg-paper text-prune", rotate: -3 },
    { label: "Donner envie", color: "bg-encre text-paper", rotate: 5 },
  ],
  [
    { label: "Dev web", color: "bg-rosewood text-paper", rotate: -5 },
    { label: "Storytelling", color: "bg-sand text-encre", rotate: 2 },
  ],
  [
    { label: "Accessibilité", color: "bg-encre text-paper", rotate: -3 },
    { label: "Interactions", color: "bg-paper text-prune", rotate: 4 },
  ],
  [
    { label: "Front-end", color: "bg-sand text-encre", rotate: -4 },
    { label: "A votre écoute", color: "bg-rosewood text-paper", rotate: 5 },
  ],
];

const skills = skillRows.flat();

export default function SkillsCascade() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center sm:hidden lg:flex">
        {skillRows.map((row, ri) => (
          <div
            key={ri}
            className={`flex gap-[clamp(0.5rem,0.3rem+1vw,1rem)] ${
              ri === 0 ? "mt-0" : "mt-[clamp(0.5rem,0.35rem+0.6vw,0.75rem)]"
            } ${
              ri % 2 === 1
                ? "ml-[clamp(1.5rem,0.8rem+3vw,2.5rem)]"
                : "ml-[clamp(-1rem,-0.6rem-2vw,0px)]"
            }`}
          >
            {row.map((skill, ci) => (
              <Pill key={skill.label} {...skill} index={ri * 2 + ci} />
            ))}
          </div>
        ))}
      </div>

      <div className="hidden flex-wrap items-center justify-center gap-3 sm:flex lg:hidden">
        {skills.map((skill, i) => (
          <Pill key={skill.label} {...skill} index={i} />
        ))}
      </div>
    </div>
  );
}
