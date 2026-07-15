"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Lightbulb,
  MessageCircle,
  PenTool,
  Rocket,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import FloatingBlob from "@/components/animations/FloatingBlob";
import PawTrail from "@/components/animations/PawTrail";
import Reveal from "@/components/animations/Reveal";
import Button from "@/components/ui/Button";
import CardMap, { type Lines } from "@/components/ui/cards/CardMap";
import CardMapModal from "@/components/ui/modals/CardMap";

const steps: {
  title: string;
  description: string;
  details: string;
  side: "left" | "right";
  icon: LucideIcon;
  lines?: Lines;
  positionClass: string;
}[] = [
  {
    title: "L'écoute",
    description:
      "On échange sur votre histoire, votre métier et vos objectifs pour poser les bases.",
    details:
      "On échange sur votre histoire, votre métier et vos objectifs pour poser les bases du récit. Cette première rencontre permet de comprendre votre univers, vos couleurs, votre ton... En bref, ce qui fait de votre projet quelque chose d'unique, et cela avant même d'esquisser quoi que ce soit. On parle de vos clients, de ce qui vous rend différent, des contraintes techniques et du budget, pour que chaque étape suivante s'appuie sur des bases claires et partagées. C'est aussi le moment où on définit ensemble le ton du récit : sérieux, ludique, chaleureux, épuré... Pour construire le conte qui vous ressemble vraiment.",
    side: "right",
    icon: MessageCircle,
    positionClass: "top-[6%] left-[45%] lg:left-[50%]",
  },
  {
    title: "Le déclic créatif",
    description:
      "Une direction artistique se dessine, fidèle à votre univers et à ce qui vous rend unique.",
    details:
      "Une direction artistique se dessine, fidèle à votre univers et à ce qui vous rend unique. Palette, typographies, ambiance visuelle : chaque choix est pensé pour que votre identité raconte une histoire cohérente, du premier coup d'œil au moindre détail. On explore plusieurs pistes, on confronte les idées, jusqu'à trouver la direction qui capture le mieux l'esprit de votre marque. Rien n'est figé trop tôt : c'est une phase de recherche où l'on teste, on affine, on élimine, jusqu'à ce que l'évidence s'impose.",
    side: "left",
    icon: Lightbulb,
    positionClass: "top-[25%] right-[16%]",
  },
  {
    title: "La création",
    description:
      "Maquettes et développement prennent forme, chaque détail pensé avec soin.",
    details:
      "Maquettes et développement prennent forme, chaque détail pensé avec soin. Les pages s'articulent, les interactions prennent vie, et votre site commence à ressembler à l'histoire qu'on avait imaginée ensemble. C'est la phase la plus longue mais aussi la plus gratifiante : on construit l'architecture, on code chaque composant, on soigne les animations et les micro-interactions qui donnent du caractère à l'ensemble. Bien sûr, vous êtes tenu informé à chaque avancée, avec des points réguliers pour ajuster le cap si besoin.",
    side: "right",
    icon: PenTool,
    positionClass: "top-[43.5%] left-[15%] lg:top-[45%]",
  },
  {
    title: "Les ajustements",
    description:
      "Tests, retours et ajustements affinent le récit jusqu'à ce qu'il sonne juste.",
    details:
      "Tests, retours et ajustements affinent le récit jusqu'à ce qu'il sonne juste. On vérifie chaque écran, chaque parcours, pour que l'expérience soit fluide sur tous les appareils avant de passer à l'étape finale. C'est le moment des allers-retours : vous testez, vous nous faites vos retours, et on peaufine ensemble le résultat. On vérifie aussi les performances, l'accessibilité et le référencement pour que le site soit aussi solide en coulisses qu'à l'écran.",
    side: "left",
    icon: SlidersHorizontal,
    positionClass: "top-[62%] right-[44%] lg:top-[64%] lg:right-[50%]",
  },
  {
    title: "La publication",
    description:
      "Votre site est mis en ligne, suivi et accompagné pour continuer à grandir.",
    details:
      "Votre site est mis en ligne, suivi et accompagné pour continuer à grandir. Au-delà du lancement, on reste à vos côtés pour les mises à jour, les évolutions et les nouvelles envies de votre histoire. C'est un nouveau chapitre qui commence : on surveille la sécurité, on accompagne les premières visites, et on reste disponible pour faire évoluer le site au rythme de votre activité. Votre histoire ne s'arrête pas à la mise en ligne, elle continue de s'écrire avec vous.",
    side: "right",
    icon: Rocket,
    positionClass: "top-[85.5%] left-[25%]",
  },
];

const pawTraces: { positionClass: string; rotate: number }[] = [
  { positionClass: "top-[8%] -left-[20%]", rotate: 170 },
  {
    positionClass:
      "top-[40%] md:top-[48%] -right-[45%] md:-right-[40%] lg:-right-[25%] xl:-right-[35%]",
    rotate: 188,
  },
  {
    positionClass:
      "hidden md:block top-[80%] -left-[23.5%] lg:-left-[17.5%] xl:-left-[27.5%]",
    rotate: 174,
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

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
            <div className="mt-8 flex flex-wrap justify-center gap-4">
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

        <div className="mt-8 flex flex-col gap-6 sm:hidden">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.2}>
              <CardMap
                number={i + 1}
                title={step.title}
                description={step.description}
                icon={step.icon}
                side={step.side}
                lines={step.lines}
                onDiscover={() => setActiveStep(i)}
              />
            </Reveal>
          ))}
        </div>

        <div
          className="relative mx-auto mt-8 hidden w-full sm:block sm:max-w-lg md:max-w-2xl lg:max-w-4xl"
          style={{ aspectRatio: "1067 / 2374" }}
        >
          <Image
            src="/illustrations/map-chemin.svg"
            alt=""
            fill
            className="object-fill"
          />

          {pawTraces.map((trace, i) => (
            <PawTrail
              key={i}
              className={`pointer-events-none absolute h-140 w-56 opacity-70 ${trace.positionClass}`}
              rotate={trace.rotate}
            />
          ))}

          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`absolute w-64 sm:w-80 md:w-96 lg:w-md ${step.positionClass}`}
            >
              <Reveal delay={i * 0.1}>
                <CardMap
                  number={i + 1}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  side={step.side}
                  lines={step.lines}
                  onDiscover={() => setActiveStep(i)}
                />
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      <CardMapModal
        isOpen={activeStep !== null}
        onClose={() => setActiveStep(null)}
        number={(activeStep ?? 0) + 1}
        title={activeStep !== null ? steps[activeStep].title : ""}
        description={activeStep !== null ? steps[activeStep].details : ""}
      />
    </section>
  );
}
