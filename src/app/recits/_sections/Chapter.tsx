import type { ReactNode } from "react";
import Button from "@/_components/ui/Button";
import FloatingBlob from "@/_components/animations/FloatingBlob";

interface ChapterButtonProps {
  content: string;
  href?: string;
  onClick?: () => void;
}

interface ChapterProps {
  number: string;
  title: string;
  paragraphs: string[];
  illustration: ReactNode;
  illustrationPosition?: "left" | "right";
  button?: ChapterButtonProps;
}

export default function Chapter({
  number,
  title,
  paragraphs,
  illustration,
  illustrationPosition = "right",
  button,
}: ChapterProps) {
  const isRight = illustrationPosition === "right";
  const sectionId = `chapitre-${number.toLowerCase()}`;
  const headingId = `${sectionId}-titre`;

  const textOrder = isRight ? "lg:order-1" : "lg:order-2";
  const illustrationOrder = isRight ? "lg:order-2" : "lg:order-1";
  const gridCols = isRight
    ? "lg:grid-cols-[3fr_2fr]"
    : "lg:grid-cols-[2fr_3fr]";

  const blobs = [
    {
      src: "/shapes/blob-1.svg",
      base: "-top-8 h-48 w-48 md:h-72 md:w-72",
      side: "-right-16 md:-right-24",
      mirroredSide: "-left-16 md:-left-24",
      duration: 8,
      yRange: 6,
      rotateRange: 5,
    },
    {
      src: "/shapes/blob-2.svg",
      base: "top-1/2 h-48 w-48 md:h-64 md:w-64",
      side: "-left-20 md:-left-28",
      mirroredSide: "-right-20 md:-right-28",
      duration: 9,
      delay: 0.4,
      yRange: -18,
      rotateRange: -6,
    },
    {
      src: "/shapes/blob-4.svg",
      base: "bottom-0 h-48 w-48 md:h-72 md:w-72",
      side: "right-10 md:right-20",
      mirroredSide: "left-10 md:left-20",
      duration: 7.5,
      delay: 0.8,
      yRange: 14,
      rotateRange: 6,
    },
  ];

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className="relative flex h-full w-full items-start pt-28 pb-8 pl-6 pr-14 md:items-center md:py-16 md:pl-16 md:pr-20 lg:pr-24"
    >
      {blobs.map((blob) => (
        <FloatingBlob
          key={blob.src + blob.base}
          src={blob.src}
          className={`${blob.base} ${isRight ? blob.side : blob.mirroredSide}`}
          duration={blob.duration}
          delay={blob.delay}
          yRange={blob.yRange}
          rotateRange={blob.rotateRange}
        />
      ))}

      <div
        className={`relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 lg:gap-12 ${gridCols}`}
      >
        <div className={`w-full text-left ${textOrder}`}>
          <div className="relative w-full">
            <span
              aria-hidden="true"
              className="absolute -top-8 left-0 hidden font-heading text-9xl leading-none font-extrabold text-rosewood/15 select-none md:block"
            >
              {number}
            </span>

            <span className="block text-xs font-bold tracking-widest text-rosewood uppercase md:text-lg">
              Chapitre {number}
            </span>
            <span
              aria-hidden="true"
              className="relative mt-2 block h-0.5 w-10 rounded-full bg-rosewood/30 md:mt-3 md:w-14"
            />

            <h2
              id={headingId}
              className="mt-3 max-w-xl text-2xl font-extrabold text-encre md:mt-4 md:text-5xl"
            >
              {title}
            </h2>

            <div className="mt-4 flex flex-col gap-3 text-sm leading-snug text-encre/80 md:mt-6 md:gap-4 md:text-lg md:leading-relaxed">
              {paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "first-letter:float-left first-letter:mr-2 first-letter:mt-0.5 first-letter:font-quote first-letter:text-4xl first-letter:leading-[0.8] first-letter:text-rosewood first-letter:italic md:first-letter:mr-3 md:first-letter:mt-1 md:first-letter:text-7xl"
                      : undefined
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {button && (
              <div className="mt-4 md:mt-8">
                <Button
                  content={button.content}
                  href={button.href}
                  onClick={button.onClick}
                />
              </div>
            )}
          </div>
        </div>

        <div
          className={`relative hidden items-center justify-center lg:flex ${illustrationOrder}`}
        >
          <div className="relative flex items-center justify-center p-16 lg:p-24">
            <span
              aria-hidden="true"
              className="absolute inset-0 rotate-3 rounded-[3rem] bg-paper"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 rotate-3 rounded-[3rem] bg-sand/40"
            />
            <span
              aria-hidden="true"
              className="absolute inset-5 -rotate-2 rounded-[2.5rem] border border-rosewood/15"
            />
            <div className="relative z-10 drop-shadow-xl">{illustration}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
