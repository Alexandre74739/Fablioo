import Reveal from "@/_components/animations/Reveal";

export interface StoryPart {
  number: string;
  title: string;
  paragraph: string;
}

export const GRID = "md:grid-cols-[minmax(0,280px)_1fr] md:gap-x-16";

export default function StoryPartSection({
  number,
  title,
  paragraph,
}: StoryPart) {
  const sectionId = `etape-${number}`;
  const headingId = `${sectionId}-titre`;

  return (
    <section id={sectionId} aria-labelledby={headingId}>
      <div className="container mx-auto max-w-6xl px-4">
        <div className={`grid grid-cols-1 gap-y-4 ${GRID}`}>
          <div>
            <div className="relative md:sticky md:top-32 md:mb-4">
              <span
                aria-hidden="true"
                className="absolute -top-4 left-0 block font-heading text-6xl leading-none font-extrabold text-rosewood/15 select-none md:-top-6 md:text-8xl"
              >
                {number}
              </span>

              <Reveal>
                <span className="block font-heading text-base text-rosewood uppercase tracking-wide">
                  Étape {number}
                </span>
                <span
                  aria-hidden="true"
                  className="relative mt-3 block h-0.5 w-12 rounded-full bg-rosewood/30"
                />
                <h2
                  id={headingId}
                  className="mt-4 text-2xl font-bold text-encre md:text-4xl"
                >
                  {title}
                </h2>
              </Reveal>

              <span
                aria-hidden="true"
                className="absolute top-6 left-full hidden h-1 w-8 bg-rosewood/50 md:block"
              />
              <span
                aria-hidden="true"
                className="absolute top-6 left-[calc(100%+2rem)] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rosewood md:block"
              />
            </div>
          </div>

          <Reveal className="pb-16 md:pb-24 xl:pb-40">
            <p className="text-lg leading-snug text-encre/80 first-letter:float-left first-letter:mt-0.5 first-letter:mr-2 first-letter:font-quote first-letter:text-5xl first-letter:leading-[0.8] first-letter:text-rosewood first-letter:italic md:leading-relaxed md:first-letter:mt-1 md:first-letter:mr-3 md:first-letter:text-7xl">
              {paragraph}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
