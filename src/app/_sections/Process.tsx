import FloatingBlob from "@/_components/animations/FloatingBlob";
import Reveal from "@/_components/animations/Reveal";
import Button from "@/_components/ui/Button";
import ProcessMap from "@/app/_sections/dynamic/ProcessMap";

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <FloatingBlob
        src="/shapes/blob-1.svg"
        className="-left-32 top-4 h-56 w-72 md:h-72 md:w-96"
        duration={9}
        yRange={20}
        rotateRange={6}
      />
      <FloatingBlob
        src="/shapes/blob-1.svg"
        className="-right-20 top-1/5 h-52 w-52 md:h-72 md:w-72"
        duration={7}
        delay={0.5}
        yRange={-16}
        rotateRange={-5}
      />
      <FloatingBlob
        src="/shapes/blob-3.svg"
        className="hidden sm:block -left-20 top-1/2 h-60 w-60 md:h-80 md:w-80"
        duration={8.5}
        delay={1.2}
        yRange={16}
        rotateRange={5}
      />
      <FloatingBlob
        src="/shapes/blob-4.svg"
        className="hidden sm:block -right-32 bottom-1/4 h-60 w-60 md:h-80 md:w-80"
        duration={8}
        delay={1}
        yRange={-18}
        rotateRange={-6}
      />
      <FloatingBlob
        src="/shapes/blob-1.svg"
        className="-left-40 md:-left-20 bottom-4 h-52 w-52 scale-x-[-1] md:h-72 md:w-72"
        duration={9.5}
        delay={0.7}
        yRange={-20}
        rotateRange={6}
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 py-16 md:py-24">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-encre md:text-5xl">
              Chapitre par chapitre, votre histoire prend forme
            </h2>
            <p className="mt-4 text-lg text-encre/80 md:text-xl">
              De la première rencontre à la mise en ligne, chaque étape est
              pensée pour donner vie à votre récit.
            </p>
            <div className="mt-8 mb-20 flex flex-wrap justify-center gap-4">
              <Button
                content="Feuilleter le portfolio"
                href="/portfolio"
                style="primary"
              />
              <Button
                content="Écrire votre histoire"
                href="/contact"
                style="link-base"
              />
            </div>
          </div>
        </Reveal>

        <ProcessMap />
      </div>
    </section>
  );
}
