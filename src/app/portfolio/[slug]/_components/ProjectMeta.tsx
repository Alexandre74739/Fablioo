import { ArrowUpRight, Code2 } from "lucide-react";
import Reveal from "@/_components/animations/Reveal";

interface ProjectMetaProps {
  tech: string[];
  siteUrl: string;
}

export default function ProjectMeta({ tech, siteUrl }: ProjectMetaProps) {
  return (
    <Reveal
      delay={0.1}
      className="flex flex-col gap-6 rounded-2xl border border-encre/20 bg-paper shadow-md p-6 sm:flex-row sm:items-center sm:justify-between md:p-8"
    >
      <div>
        <div className="flex items-center gap-2 text-encre/60">
          <Code2 className="h-4 w-4" />
          <h2 className="font-heading text-sm uppercase tracking-wide">
            Technologies
          </h2>
        </div>
        <ul className="mt-3 flex flex-wrap gap-2">
          {tech.map((item) => (
            <li
              key={item}
              className="rounded-full border border-encre/10 bg-sand/20 px-3 py-1 text-sm text-encre/80 font-medium"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={siteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex w-fit shrink-0 items-center gap-1.5 rounded-xl bg-rosewood px-6 py-3 text-center font-heading text-base text-paper transition-ease duration-300 hover:bg-prune"
      >
        <span>Visiter le site</span>
        <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </Reveal>
  );
}
