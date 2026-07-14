"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/animations/Reveal";
import PawTrail from "@/components/animations/PawTrail";
import Card from "@/components/ui/Card";

export default function Products() {
  const waveRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: waveRef,
    offset: ["start end", "end start"],
  });
  const waveMaxTranslate = 100;
  const waveY = useTransform(
    scrollYProgress,
    [0, 1],
    [waveMaxTranslate, -waveMaxTranslate],
  );

  return (
    <section className="relative overflow-hidden bg-sand/20">
      <div className="relative">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-24 top-8 h-44 w-64 md:h-56 md:w-80"
        >
          <Image src="/shapes/blob-1.svg" alt="" fill />
        </motion.div>
        <motion.div
          animate={{ y: [0, 18, 0], rotate: [0, -8, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="pointer-events-none absolute -right-16 top-1/4 h-64 w-40 md:h-80 md:w-52"
        >
          <Image src="/shapes/blob-2.svg" alt="" fill />
        </motion.div>
        <motion.div
          animate={{ y: [0, -14, 0], rotate: [0, 5, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="pointer-events-none absolute -bottom-20 left-1/5 h-52 w-52 md:h-64 md:w-64"
        >
          <Image src="/shapes/blob-3.svg" alt="" fill />
        </motion.div>
        <motion.div
          animate={{ y: [0, 16, 0], rotate: [0, -6, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="pointer-events-none absolute right-1/8 -bottom-16 hidden h-60 w-60 lg:block"
        >
          <Image src="/shapes/blob-4.svg" alt="" fill />
        </motion.div>
        <div className="pointer-events-none absolute -right-8 -bottom-92 hidden h-140 w-56 -translate-y-1/2 rotate-180 opacity-70 md:block">
          <PawTrail className="h-full w-full" />
        </div>
        <div className="pointer-events-none absolute -left-8 bottom-20 hidden h-140 w-56 -translate-y-1/2 opacity-70 md:block">
          <PawTrail className="h-full w-full" />
        </div>

        <div className="container relative z-10 mx-auto max-w-6xl px-4 py-16 md:py-12">
          <Reveal delay={0.2}>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-bold md:text-5xl">
                Des idées qui vous ressemblent
              </h2>
              <p className="mt-4 text-lg md:text-xl">
                Chaque projet est une histoire à découvrir, et Fablioo vous
                accompagne dans cette aventure.
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
                href="tarifs"
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
                href="tarifs"
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
                href="tarifs"
              />
            </Reveal>
          </div>
        </div>
      </div>

      <motion.div
        ref={waveRef}
        style={{ y: waveY }}
        className="relative z-10 mt-16 h-32 sm:h-40 md:mt-8 md:h-48 lg:h-56"
      >
        <Image
          src="/shapes/wave-divider-products.svg"
          alt=""
          fill
          className="object-cover object-bottom"
        />
        <div
          className="absolute inset-x-0 bg-[#f7f1e6]"
          style={{ top: "calc(100% - 2px)", height: waveMaxTranslate + 2 }}
        />
      </motion.div>
    </section>
  );
}
