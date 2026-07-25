import Image from "next/image";

export interface Skill {
  id: string;
  label: string;
  description: string;
  details: string[];
}

interface SkillCardProps {
  skill: Skill;
  onClick?: () => void;
}

export default function SkillCard({ skill, onClick }: SkillCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-skill-id={skill.id}
      className="flex h-44 w-40 shrink-0 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-encre/10 bg-paper px-4 py-5 text-center shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 hover:shadow-xl sm:h-52 sm:w-44 sm:gap-4 sm:px-5"
    >
      <div className="pointer-events-none relative h-11 w-11 shrink-0 sm:h-13 sm:w-13">
        <Image
          src={`/logos/${skill.id}.svg`}
          alt={skill.label}
          fill
          draggable={false}
          className="object-contain"
        />
      </div>
      <div>
        <p className="font-heading text-sm font-bold text-encre sm:text-base">
          {skill.label}
        </p>
        <p className="mt-1.5 line-clamp-3 text-xs leading-snug text-encre/80">
          {skill.description}
        </p>
      </div>
    </button>
  );
}
