import FloatingBlob from "@/_components/animations/FloatingBlob";
import Reveal from "@/_components/animations/Reveal";
import PawTrail from "@/_components/animations/PawTrail";
import Card from "@/_components/ui/cards/Card";
import WaveDivider from "@/_components/animations/WaveDivider";

export default function Products() {
  return (
    <section className="relative overflow-hidden bg-sand/20">
      <div className="relative">
        <FloatingBlob
          src="/shapes/blob-1.svg"
          className="-left-24 top-8 h-44 w-64 md:h-56 md:w-80"
          duration={9}
          yRange={20}
          rotateRange={6}
        />
        <FloatingBlob
          src="/shapes/blob-2.svg"
          className="-right-16 top-1/4 h-64 w-40 md:h-80 md:w-52"
          duration={8}
          delay={1}
          yRange={-18}
          rotateRange={-8}
        />
        <FloatingBlob
          src="/shapes/blob-3.svg"
          className="-bottom-20 left-1/5 h-52 w-52 md:h-64 md:w-64"
          duration={7}
          delay={0.5}
          yRange={14}
          rotateRange={5}
        />
        <FloatingBlob
          src="/shapes/blob-4.svg"
          className="right-1/8 -bottom-16 hidden h-60 w-60 lg:block"
          duration={10}
          delay={1.5}
          yRange={-16}
          rotateRange={-6}
        />
        <div className="pointer-events-none absolute -right-8 -bottom-92 hidden h-140 w-56 -translate-y-1/2 rotate-180 opacity-70 md:block">
          <PawTrail className="h-full w-full" />
        </div>
        <div className="pointer-events-none absolute -left-8 bottom-4 hidden h-140 w-56 -translate-y-1/2 opacity-70 md:block">
          <PawTrail className="h-full w-full" />
        </div>

        <div className="container relative z-10 mx-auto max-w-6xl px-4 py-16 md:py-12">
          <Reveal delay={0.2}>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-bold md:text-5xl">
                Des idées qui vous ressemblent
              </h2>
              <p className="mt-4 text-lg md:text-xl">
                Logo, identité visuelle ou site web sur mesure : chaque projet
                est une histoire à découvrir, et Fablioo vous accompagne à chaque
                chapitre.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            <Reveal delay={0.2} className="lg:mt-8">
              <Card
                imageSrc="/illustrations/left-fox.png"
                width={219}
                height={275}
                title="Logo et identité graphique"
                description="Une identité pensée pour vous, clair, cohérente et mémorable qui pose les bases de votre univers."
                button="Je veux un super design"
                href="/services"
              />
            </Reveal>
            <Reveal delay={0.4}>
              <Card
                imageSrc="/illustrations/face-fox.png"
                width={316}
                height={271}
                title="Site web pensée pour vous"
                description="Un site fluide et élégant, conçu pour raconter votre histoire, séduire vos visiteurs et faire grandir votre activité."
                button="Je veux mon site web"
                href="/services"
              />
            </Reveal>
            <Reveal
              delay={0.6}
              className="sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[calc(50%-0.75rem)] lg:col-span-1 lg:mx-0 lg:mt-8 lg:max-w-none"
            >
              <Card
                imageSrc="/illustrations/right-fox.png"
                width={242}
                height={272}
                title="Maintenance et sécurité"
                description="Mises à jour, surveillance et assistance continue pour un site fiable, rapide et protégé au fil du temps."
                button="Je veux être tranquille"
                href="/services"
              />
            </Reveal>
          </div>
        </div>
      </div>

      <WaveDivider
        src="/shapes/wave-divider-products.svg"
        fillerClassName="bg-[#f7f1e6]"
      />
    </section>
  );
}
