"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Reveal from "@/components/animations/Reveal";
import Button from "@/components/ui/Button";
import CardMap from "@/components/ui/modals/CardMap";

type Side = "left" | "right";
type Position = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

type Lines = 2 | 3 | 4;
const clampClasses: Record<Lines, string> = {
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
};

const steps: {
  title: string;
  description: string;
  details: string;
  side: Side;
  position?: Position;
  positionClass?: string;
  lines?: Lines;
  offsetY?: number;
}[] = [
  {
    title: "L'écoute",
    description:
      "On échange sur votre histoire, votre métier et vos objectifs pour poser les bases.",
    details:
      "On échange sur votre histoire, votre métier et vos objectifs pour poser les bases du récit. Cette première rencontre permet de comprendre votre univers, vos couleurs, votre ton... En bref, ce qui fait de votre projet quelque chose d'unique, et cela avant même d'esquisser quoi que ce soit. On parle de vos clients, de ce qui vous rend différent, des contraintes techniques et du budget, pour que chaque étape suivante s'appuie sur des bases claires et partagées. C'est aussi le moment où on définit ensemble le ton du récit : sérieux, ludique, chaleureux, épuré... Pour construire le conte qui vous ressemble vraiment.",
    side: "right",
    positionClass: "top-[16%] sm:top-[16%] lg:top-[17%] left-[22.5%]",
  },
  {
    title: "Le déclic créatif",
    description:
      "Une direction artistique se dessine, fidèle à votre univers et à ce qui vous rend unique.",
    details:
      "Une direction artistique se dessine, fidèle à votre univers et à ce qui vous rend unique. Palette, typographies, ambiance visuelle : chaque choix est pensé pour que votre identité raconte une histoire cohérente, du premier coup d'œil au moindre détail. On explore plusieurs pistes, on confronte les idées, jusqu'à trouver la direction qui capture le mieux l'esprit de votre marque. Rien n'est figé trop tôt : c'est une phase de recherche où l'on teste, on affine, on élimine, jusqu'à ce que l'évidence s'impose.",
    side: "left",
    positionClass:
      "top-[26.75%] sm:top-[28%] md:top-[29.5%] lg:top-[30.5%] right-[22.5%]",
    offsetY: 24,
  },
  {
    title: "La création",
    description:
      "Maquettes et développement prennent forme, chaque détail pensé avec soin.",
    details:
      "Maquettes et développement prennent forme, chaque détail pensé avec soin. Les pages s'articulent, les interactions prennent vie, et votre site commence à ressembler à l'histoire qu'on avait imaginée ensemble. C'est la phase la plus longue mais aussi la plus gratifiante : on construit l'architecture, on code chaque composant, on soigne les animations et les micro-interactions qui donnent du caractère à l'ensemble. Bien sûr, vous êtes tenu informé à chaque avancée, avec des points réguliers pour ajuster le cap si besoin.",
    side: "right",
    positionClass: "top-[46%] sm:top-[46%] md:top-[47%] left-[34%]",
  },
  {
    title: "Les ajustements",
    description:
      "Tests, retours et ajustements affinent le récit jusqu'à ce qu'il sonne juste.",
    details:
      "Tests, retours et ajustements affinent le récit jusqu'à ce qu'il sonne juste. On vérifie chaque écran, chaque parcours, pour que l'expérience soit fluide sur tous les appareils avant de passer à l'étape finale. C'est le moment des allers-retours : vous testez, vous nous faites vos retours, et on peaufine ensemble le résultat. On vérifie aussi les performances, l'accessibilité et le référencement pour que le site soit aussi solide en coulisses qu'à l'écran.",
    side: "left",
    positionClass: "top-[61.25%] sm:top-[61%] md:top-[62%] right-[11%]",
  },
  {
    title: "La publication",
    description:
      "Votre site est mis en ligne, suivi et accompagné pour continuer à grandir.",
    details:
      "Votre site est mis en ligne, suivi et accompagné pour continuer à grandir. Au-delà du lancement, on reste à vos côtés pour les mises à jour, les évolutions et les nouvelles envies de votre histoire. C'est un nouveau chapitre qui commence : on surveille la sécurité, on accompagne les premières visites, et on reste disponible pour faire évoluer le site au rythme de votre activité. Votre histoire ne s'arrête pas à la mise en ligne, elle continue de s'écrire avec vous.",
    side: "right",
    positionClass:
      "bottom-[15%] sm:bottom-[15.25%] md:bottom-[16%] lg:bottom-[17%], left-[11%]",
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-paper">
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 top-4 h-56 w-72 md:h-72 md:w-96"
      >
        <Image src="/shapes/blob-1.svg" alt="" fill />
      </motion.div>
      <motion.div
        animate={{ y: [0, 16, 0], rotate: [0, -5, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="pointer-events-none absolute -right-20 top-1/5 h-52 w-52 md:h-72 md:w-72"
      >
        <Image src="/shapes/blob-1.svg" alt="" fill />
      </motion.div>
      <motion.div
        animate={{ y: [0, -16, 0], rotate: [0, 5, 0] }}
        transition={{
          duration: 8.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
        className="hidden sm:block pointer-events-none absolute -left-20 top-1/2 h-60 w-60 md:h-80 md:w-80"
      >
        <Image src="/shapes/blob-3.svg" alt="" fill />
      </motion.div>
      <motion.div
        animate={{ y: [0, 18, 0], rotate: [0, -6, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="hidden sm:block pointer-events-none absolute -right-32 bottom-1/4 h-60 w-60 md:h-80 md:w-80"
      >
        <Image src="/shapes/blob-4.svg" alt="" fill />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, 6, 0] }}
        transition={{
          duration: 9.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.7,
        }}
        className="pointer-events-none absolute -left-40 md:-left-20 bottom-4 h-52 w-52 scale-x-[-1] md:h-72 md:w-72"
      >
        <Image src="/shapes/blob-1.svg" alt="" fill />
      </motion.div>

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

        <div
          className="relative mx-auto mt-16 w-full max-w-88 sm:max-w-lg md:max-w-2xl lg:max-w-4xl"
          style={{ aspectRatio: "1034 / 1588" }}
        >
          <Image
            src="/illustrations/map-chemin.svg"
            alt=""
            fill
            className="object-contain"
          />

          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`absolute w-64 sm:w-80 md:w-96 lg:w-md ${step.positionClass ?? ""}`}
              style={{
                top: step.position?.top,
                bottom: step.position?.bottom,
                left: step.position?.left,
                right: step.position?.right,
                transform: step.offsetY
                  ? `translateY(${step.offsetY}px)`
                  : undefined,
              }}
            >
              <Reveal delay={i * 0.2}>
                <div
                  className={`flex items-center gap-3 sm:gap-4 lg:gap-6 ${
                    step.side === "left" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <motion.button
                    type="button"
                    onClick={() => setActiveStep(i)}
                    whileHover={{ rotate: 1080 }}
                    transition={{ duration: 1.1, ease: "easeInOut" }}
                    className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-prune/90 shadow-md sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20"
                  >
                    <span className="font-heading text-base text-paper sm:text-xl md:text-2xl lg:text-3xl">
                      {i + 1}
                    </span>
                  </motion.button>
                  <div
                    className={
                      step.side === "left" ? "text-right" : "text-left"
                    }
                  >
                    <h3 className="text-sm font-bold text-encre sm:text-base md:text-lg lg:text-xl">
                      {step.title}
                    </h3>
                    <p
                      className={`hidden sm:block mt-1 w-48 text-xs leading-snug text-encre/80 sm:w-72 sm:text-sm md:w-86 md:text-base lg:w-108 lg:text-xl ${
                        step.lines ? clampClasses[step.lines] : ""
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      <CardMap
        isOpen={activeStep !== null}
        onClose={() => setActiveStep(null)}
        number={(activeStep ?? 0) + 1}
        title={activeStep !== null ? steps[activeStep].title : ""}
        description={activeStep !== null ? steps[activeStep].details : ""}
      />
    </section>
  );
}
