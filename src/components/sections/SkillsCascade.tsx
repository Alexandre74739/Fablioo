"use client";

import Pill from "@/components/animations/Pill";

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
    <div>
      <div className="flex flex-wrap justify-center gap-3 lg:hidden">
        {skills.map((skill, i) => (
          <Pill key={skill.label} {...skill} index={i} />
        ))}
      </div>

      <div className="hidden lg:flex lg:flex-col">
        {skillRows.map((row, ri) => (
          <div
            key={ri}
            className="flex gap-3"
            style={{
              marginTop: ri === 0 ? 0 : 10,
              marginLeft: ri % 2 === 1 ? 28 : 0,
            }}
          >
            {row.map((skill, ci) => (
              <Pill key={skill.label} {...skill} index={ri * 2 + ci} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
