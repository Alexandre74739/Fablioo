import Reveal from "@/_components/animations/Reveal";
import Button from "@/_components/ui/Button";
import SkillsCascade from "@/_components/ui/SkillsCascade";
import WaveDivider from "@/_components/animations/WaveDivider";
import AboutDecor from "@/app/_sections/dynamic/AboutDecor";

export default function About() {
  return (
    <section className="relative -mt-4 overflow-hidden bg-prune">
      <AboutDecor />

      <div className="relative z-10 mx-auto max-w-7xl px-8 py-4 pb-0 md:py-12 md:pb-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <Reveal delay={0}>
              <h2 className="text-4xl font-bold text-paper md:text-5xl">
                Il était{" "}
                <span className="text-sand font-quote font-semibold italic">
                  deux fois
                </span>{" "}
                Fablioo
              </h2>
            </Reveal>

            <div className="mt-5 flex flex-col gap-4 text-lg text-paper/80 leading-relaxed md:text-xl">
              <Reveal delay={0.2}>
                <p className="max-w-2xl">
                  Les histoires commencent par "il était une fois". Fablioo
                  commence par "il était deux fois". Une fois pour{" "}
                  <strong className="text-paper">
                    {" "}
                    l'histoire qu'on raconte
                  </strong>
                  , la vôtre, celle de votre métier, de vos clients, de ce qui
                  vous rend différent.
                  <br />
                  Une fois pour{" "}
                  <strong className="text-paper">
                    {" "}
                    la façon de la raconter
                  </strong>{" "}
                  : un site pensé comme un récit, où chaque écran est une page
                  qu'on a envie de tourner.
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <p className="max-w-2xl">
                  Basé à Saint-Martin-d'Hères, Fablioo crée vos identités
                  visuelles et sites web sur mesure partout dans
                  la région de <strong className="text-paper">Grenoble</strong>.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.6}>
              <div className="mt-10 flex flex-wrap gap-4 ">
                <Button
                  content="Découvrir nos récits"
                  href="/recits"
                  style="secondary"
                />
                <div className="-ml-3 sm:ml-0">
                  <Button
                    content="Feuilleter le portfolio"
                    href="/portfolio"
                    style="link-muted"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <SkillsCascade />
          </div>
        </div>
      </div>

      <WaveDivider src="/shapes/wave-divider.svg" fillerClassName="bg-[#eee9db]" />
    </section>
  );
}
