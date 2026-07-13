"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/animations/Reveal";
import Button from "@/components/ui/Button";

export default function About() {
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
    <section className="relative -mt-4 overflow-hidden bg-prune">
      <div className="container relative z-10 mx-auto px-4">
        <Reveal delay={0}>
          <h2 className="text-center text-4xl font-bold text-paper md:text-5xl">
            Le récit derrière Fablioo
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-paper/80 md:text-xl">
            Un processus qui se vit comme une histoire derrière un écran.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              content="Découvrir nos récits"
              href="/recits"
              style="secondary"
            />
            <Button
              content="Voir le portfolio"
              href="/portfolio"
              style="tertiary"
            />
          </div>
        </Reveal>
      </div>

      <motion.div
        ref={waveRef}
        style={{ y: waveY }}
        className="relative z-10 mt-16 h-32 sm:h-40 md:mt-8 md:h-48 lg:h-56"
      >
        <Image
          src="/shapes/wave-divider.svg"
          alt=""
          fill
          className="object-cover object-bottom"
        />
        {/* comble l'espace laissé par la vague en montant */}
        <div
          className="absolute inset-x-0 bg-paper"
          style={{ top: "calc(100% - 2px)", height: waveMaxTranslate + 2 }}
        />
      </motion.div>
    </section>
  );
}
