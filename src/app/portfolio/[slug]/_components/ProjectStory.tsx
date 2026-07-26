import { BookOpen, Compass, ShieldAlert, Target, TrendingUp } from "lucide-react";
import Reveal from "@/_components/animations/Reveal";

interface CaseStudy {
  contexte: string;
  objectifs: string;
  contraintes: string;
  resultats: string;
}

interface ProjectStoryProps {
  details: string;
  caseStudy: CaseStudy | null;
}

const STEPS = [
  { key: "contexte", label: "Contexte", icon: Compass },
  { key: "objectifs", label: "Mission & objectifs", icon: Target },
  { key: "contraintes", label: "Contraintes", icon: ShieldAlert },
  { key: "resultats", label: "Résultats", icon: TrendingUp },
] as const;

export default function ProjectStory({ details, caseStudy }: ProjectStoryProps) {
  return (
    <div className="flex flex-col divide-y divide-encre/10">
      <Reveal className="pb-10 md:pb-12">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rosewood/10 text-rosewood">
            <BookOpen className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <h2 className="text-2xl font-extrabold text-encre md:text-3xl">
            Le projet
          </h2>
        </div>
        <p className="mt-5 text-lg leading-relaxed text-encre/80 first-letter:float-left first-letter:mt-0.5 first-letter:mr-2 first-letter:font-quote first-letter:text-4xl first-letter:leading-[0.8] first-letter:text-rosewood first-letter:italic md:first-letter:mt-1 md:first-letter:mr-3 md:first-letter:text-6xl">
          {details}
        </p>
      </Reveal>

      {caseStudy &&
        STEPS.map(({ key, label, icon: Icon }, i) => (
          <Reveal key={key} delay={0.1 * (i + 1)} className="py-10 md:py-12">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-prune/10 text-prune">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <h3 className="font-heading text-lg text-prune">{label}</h3>
            </div>
            <p className="mt-4 leading-relaxed text-encre/80">
              {caseStudy[key]}
            </p>
          </Reveal>
        ))}
    </div>
  );
}
