import { Check, X } from "lucide-react";
import Reveal from "@/_components/animations/Reveal";

interface ProjectBeforeAfterProps {
  before: string[];
  after: string[];
}

export default function ProjectBeforeAfter({
  before = [],
  after = [],
}: ProjectBeforeAfterProps) {
  if (before.length === 0 && after.length === 0) {
    return null;
  }

  return (
    <Reveal>
      <h2 className="text-2xl font-bold">Avant / Après</h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-encre/80">
        Ce qui a concrètement changé entre la situation de départ et la mise
        en production du projet.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-encre/10 bg-paper p-6 md:p-8">
          <h3 className="font-heading text-sm text-encre/60 uppercase tracking-wide">
            Avant
          </h3>
          <ul className="mt-5 flex flex-col gap-4">
            {before.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-encre/70"
              >
                <X className="mt-0.5 h-4 w-4 shrink-0 text-encre/40" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-rosewood/30 bg-paper p-6 md:p-8">
          <h3 className="font-heading text-sm text-rosewood uppercase tracking-wide">
            Après
          </h3>
          <ul className="mt-5 flex flex-col gap-4">
            {after.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-encre/80"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-rosewood" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
