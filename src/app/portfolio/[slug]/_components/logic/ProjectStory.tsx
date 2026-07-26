import StoryPath from "../views/StoryPath";
import StoryPartSection, {
  GRID,
  type StoryPart,
} from "../views/StoryPartSection";

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

export default function ProjectStory({
  details,
  caseStudy,
}: ProjectStoryProps) {
  const parts: StoryPart[] = [
    { number: "1", title: "Le projet", paragraph: details },
  ];

  if (caseStudy) {
    parts.push(
      { number: "2", title: "Contexte", paragraph: caseStudy.contexte },
      {
        number: "3",
        title: "Mission et objectifs",
        paragraph: caseStudy.objectifs,
      },
      { number: "4", title: "Contraintes", paragraph: caseStudy.contraintes },
      { number: "5", title: "Résultats", paragraph: caseStudy.resultats },
    );
  }

  return (
    <div className="relative pt-16 md:pt-24">
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        aria-hidden="true"
      >
        <div className="container mx-auto h-full max-w-6xl px-4">
          <div className={`grid h-full grid-cols-1 ${GRID}`}>
            <div className="relative h-full">
              <div className="absolute top-0 bottom-0 left-[calc(100%+2rem)] w-1">
                <StoryPath className="h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {parts.map((part) => (
        <StoryPartSection key={part.number} {...part} />
      ))}
    </div>
  );
}
