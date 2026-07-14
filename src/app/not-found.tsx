import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Reveal from "@/components/animations/Reveal";
import PawTrail from "@/components/animations/PawTrail";
import FloatingBlob from "@/components/animations/FloatingBlob";

export const metadata: Metadata = {
  title: "404 – Page introuvable",
  description: "Cette page s'est égarée quelque part entre deux chapitres.",
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-paper px-6 pt-32 pb-16">
      <FloatingBlob
        src="/shapes/blob-1.svg"
        className="-left-24 top-16 h-44 w-64 md:h-56 md:w-80"
        duration={9}
        yRange={20}
        rotateRange={6}
      />
      <FloatingBlob
        src="/shapes/blob-2.svg"
        className="-right-16 bottom-20 h-64 w-40 md:h-80 md:w-52"
        duration={8}
        delay={1}
        yRange={18}
        rotateRange={-8}
      />
      <FloatingBlob
        src="/shapes/blob-3.svg"
        className="-left-16 bottom-8 h-52 w-52 md:h-64 md:w-64"
        duration={7}
        delay={0.5}
        yRange={14}
        rotateRange={5}
      />

      <div className="pointer-events-none absolute -left-10 top-1/2 hidden h-140 w-56 -translate-y-1/2 -rotate-6 opacity-60 md:block">
        <PawTrail className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute -right-10 top-1/2 hidden h-140 w-56 -translate-y-1/2 rotate-174 opacity-60 md:block">
        <PawTrail className="h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <Reveal delay={0}>
          <h1 className="font-heading text-[6.5rem] leading-none text-rosewood md:text-[9rem]">
            404
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-2xl font-bold md:text-3xl">
              Ce chapitre n'existe pas
            </h2>
            <p className="max-w-lg font-quote text-xl italic text-prune md:text-2xl">
              Cette page s'est perdue quelque part entre deux chapitres. Mais
              l'aventure continue juste ici.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <Button content="Je reviens à l'accueil" href="/" style="primary" />
        </Reveal>
      </div>
    </section>
  );
}
