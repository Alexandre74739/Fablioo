import type { ReactNode } from "react";
import Reveal from "@/_components/animations/Reveal";
import Button from "@/_components/ui/Button";
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
  hideIllustrationOnMobile?: boolean;
  button?: ChapterButtonProps;
}

export default function Chapter({
  number,
  title,
  paragraphs,
  illustration,
  illustrationPosition = "right",
  hideIllustrationOnMobile = false,
  button,
}: ChapterProps) {
  const isRight = illustrationPosition === "right";

  return (
    <section className="relative -z-10 flex min-h-[80vh] w-full items-center overflow-hidden bg-paper px-6 py-16 md:px-16">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <Reveal
          delay={0}
          className={`w-full text-left ${isRight ? "md:order-1" : "md:order-2"}`}
        >
          <div className="relative w-full">
            <span
              aria-hidden="true"
              className="absolute -top-6 left-0 font-heading text-8xl leading-none font-extrabold text-rosewood/20 select-none md:-top-8 md:text-9xl"
            >
              {number}
            </span>
            <span className="block text-sm font-bold tracking-widest text-rosewood uppercase md:text-lg">
              Chapitre {number}
            </span>
            <h2 className="max-w-md mt-2 text-4xl font-extrabold text-encre md:text-5xl">
              {title}
            </h2>
            <Reveal
              delay={0.2}
              className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-encre/80 md:text-lg"
            >
              {paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </Reveal>
            {button && (
              <Reveal delay={0.4} className="mt-8">
                <Button
                  content={button.content}
                  href={button.href}
                  onClick={button.onClick}
                />
              </Reveal>
            )}
          </div>
        </Reveal>

        <Reveal
          delay={0.4}
          className={`relative h-128 items-center justify-center md:flex md:h-160 ${hideIllustrationOnMobile ? "hidden" : "flex"} ${isRight ? "md:order-2" : "md:order-1"}`}
        >
          {illustration}
        </Reveal>
      </div>
    </section>
  );
}
