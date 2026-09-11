import Reveal from "@/_components/animations/Reveal";
import FloatingBlob from "@/_components/animations/FloatingBlob";
import PawTrail from "@/_components/animations/PawTrail";
import WaveDivider from "@/_components/animations/WaveDivider";
import Button from "@/_components/ui/Button";
import ProloguePhoto from "./dynamic/ProloguePhoto";

interface PrologueProps {
  title: string;
  content: string;
  secondaryContent: string;
}

export default function Prologue({
  title,
  content,
  secondaryContent,
}: PrologueProps) {
  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute -right-10 top-10 hidden h-140 w-56 -scale-x-100 opacity-70 lg:block"
        aria-hidden="true"
      >
        <PawTrail className="h-full w-full" rotate={12} />
      </div>
      <FloatingBlob
        src="/shapes/blob-4.svg"
        className="hidden md:block top-32 -left-40 h-48 w-48 md:h-64 md:w-64"
        duration={9}
        delay={0.3}
        yRange={16}
        rotateRange={-5}
      />
      <FloatingBlob
        src="/shapes/blob-3.svg"
        className="-left-24 top-1/2 h-60 w-60 md:h-80 md:w-80"
        duration={8}
        delay={0.5}
        yRange={-16}
        rotateRange={6}
      />
      <FloatingBlob
        src="/shapes/blob-1.svg"
        className="hidden sm:block right-1/4 -bottom-20 h-56 w-72 md:h-72 md:w-96"
        duration={7.5}
        delay={0.9}
        yRange={14}
        rotateRange={5}
      />

      <div className="container relative z-10 mx-auto flex max-w-6xl flex-1 flex-col justify-center px-4 pt-28 pb-16 md:pt-16 md:pb-24">
        <div className="grid grid-cols-1 items-center gap-12 md:gap-16 lg:grid-cols-[3fr_2fr] lg:gap-20">
          <Reveal delay={0.6} className="lg:order-2">
            <ProloguePhoto />
          </Reveal>

          <div className="text-left px-4 py-16 lg:order-1">
            <div className="relative w-full">
              <Reveal>
                <span className="block text-xs font-bold tracking-widest text-rosewood uppercase md:text-lg">
                  Prologue
                </span>
                <span
                  aria-hidden="true"
                  className="relative mt-2 block h-0.5 w-10 rounded-full bg-rosewood/30 md:mt-3 md:w-14"
                />
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="mt-3 text-3xl font-extrabold text-encre md:mt-4 md:text-5xl">
                  {title}
                </h2>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="mt-4 text-lg font-bold text-prune md:mt-6 md:text-xl">
                  Hola, moi c'est Alexandre !
                </p>

                <p className="mt-2 max-w-xl text-base leading-relaxed text-encre/80 md:mt-4 md:text-lg">
                  {content}
                </p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-encre/80 md:mt-4 md:text-lg">
                  {secondaryContent}
                </p>
              </Reveal>
              <Reveal delay={0.6}>
                <div className="mt-6 flex flex-wrap items-center gap-6 md:mt-10">
                  <Button
                    content="Je prend rendez-vous"
                    href="/contact"
                    style="primary"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <WaveDivider
        src="/shapes/wave-divider-products.svg"
        fillerClassName="bg-paper"
      />
    </section>
  );
}
