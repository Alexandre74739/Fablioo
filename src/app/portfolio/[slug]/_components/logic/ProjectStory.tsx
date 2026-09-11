import FloatingBlob from "@/_components/animations/FloatingBlob";
import StoryPath from "./StoryPath";
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
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <FloatingBlob
          src="/shapes/blob-3.svg"
          className="-left-24 top-1/4 h-56 w-56 md:h-80 md:w-80"
          duration={8}
          delay={0.2}
          yRange={16}
          rotateRange={5}
        />
        <FloatingBlob
          src="/shapes/blob-4.svg"
          className="-right-20 top-2/3 h-52 w-52 md:h-72 md:w-72"
          duration={9}
          delay={0.6}
          yRange={-16}
          rotateRange={-5}
        />
      </div>

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

      <div className="relative z-10">
        {parts.map((part) => (
          <StoryPartSection key={part.number} {...part} />
        ))}
      </div>
    </div>
  );
}
