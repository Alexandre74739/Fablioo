import Reveal from "@/_components/animations/Reveal";
import FloatingBlob from "@/_components/animations/FloatingBlob";
import Button from "@/_components/ui/Button";
import EpilogueDecor from "./dynamic/EpilogueDecor";
import EpilogueSignature from "./dynamic/EpilogueSignature";

export default function Epilogue() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-paper px-6 py-24">
      <EpilogueDecor />

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
        className="md:hidden -left-16 bottom-8 h-52 w-52"
        duration={7}
        delay={0.5}
        yRange={14}
        rotateRange={5}
      />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
        <Reveal delay={0}>
          <span className="block text-xs font-bold tracking-widest text-rosewood uppercase md:text-lg">
            Épilogue
          </span>
          <span
            aria-hidden="true"
            className="relative mx-auto mt-2 block h-0.5 w-10 rounded-full bg-rosewood/30 md:mt-3 md:w-14"
          />
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-col items-center gap-4">
            <h2 className="max-w-xl text-3xl font-extrabold text-encre md:text-5xl">
              Et si la suite s'écrivait avec vous ?
            </h2>
            <p className="max-w-lg font-quote text-lg italic text-prune md:text-xl">
              Une histoire ne s'arrête jamais vraiment au mot « fin ».
            </p>
            <p className="max-w-md text-base leading-relaxed text-encre/80 md:text-lg">
              Elle attend simplement que quelqu'un tourne la page suivante.
              Peut-être la vôtre ?
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button
              content="Découvrir mes services"
              href="/services"
              style="primary"
            />
            <Button
              content="Feuilleter le portfolio"
              href="/portfolio"
              style="link-base"
            />
          </div>
        </Reveal>

        <Reveal delay={0.6} className="flex flex-col items-center gap-2">
          <EpilogueSignature className="h-12 w-auto text-rosewood md:h-16" />
          <span className="font-quote text-sm italic text-encre/60 md:text-base">
            Merci d'avoir tout lu
          </span>
          <span className="text-sm font-bold tracking-wide text-prune md:text-base">
            Alexandre, fondateur de Fablioo
          </span>
        </Reveal>
      </div>
    </section>
  );
}
