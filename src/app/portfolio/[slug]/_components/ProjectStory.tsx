import { Quote } from "lucide-react";
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
  { key: "contexte", number: "01", label: "Contexte" },
  { key: "objectifs", number: "02", label: "Mission & objectifs" },
  { key: "contraintes", number: "03", label: "Contraintes" },
  { key: "resultats", number: "04", label: "Résultats" },
] as const;

export default function ProjectStory({ details, caseStudy }: ProjectStoryProps) {
  return (
    <div>
      <Reveal className="relative">
        <Quote
          strokeWidth={1}
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 -left-3 h-16 w-16 text-rosewood/10 md:h-20 md:w-20"
        />

        <div className="relative flex items-center gap-3">
          <span className="h-px w-8 bg-rosewood" aria-hidden="true" />
          <span className="font-heading text-xs tracking-widest text-rosewood uppercase">
            Aperçu du projet
          </span>
        </div>
        <h2 className="relative mt-4 text-2xl font-bold md:text-3xl">
          Le projet
        </h2>
        <p className="relative mt-5 max-w-2xl text-lg leading-relaxed text-encre/80">
          {details}
        </p>
      </Reveal>

      {caseStudy && (
        <Reveal
          delay={0.1}
          className="mt-14 flex flex-col divide-y divide-encre/10 border-t border-encre/10"
        >
          {STEPS.map(({ key, number, label }) => (
            <div key={key} className="flex gap-6 py-10 first:pt-0 md:gap-10">
              <span className="shrink-0 font-heading text-4xl text-encre/15 md:text-5xl">
                {number}
              </span>
              <div className="max-w-2xl">
                <h3 className="font-heading text-lg text-prune">{label}</h3>
                <p className="mt-4 leading-relaxed text-encre/80">
                  {caseStudy[key]}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      )}
    </div>
  );
}
