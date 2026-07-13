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
      <div className="container relative z-10 mx-auto px-4 py-4 md:py-12 pb-0 md:pb-12 max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-8">
            <Reveal delay={0}>
              <h2 className="text-4xl font-bold text-paper md:text-5xl">
                Il était{" "}
                <span className="text-sand font-quote font-semibold italic">
                  deux fois
                </span>{" "}
                Fablioo
              </h2>
            </Reveal>

            <div className="mt-6 flex flex-col gap-4 text-lg text-paper/80 leading-relaxed md:text-xl">
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
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="max-w-2xl">
                  Une fois pour{" "}
                  <strong className="text-paper">
                    {" "}
                    la façon de la raconter
                  </strong>{" "}
                  : un site pensé comme un récit, où chaque écran est une page
                  qu'on a envie de tourner.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.6}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  content="Découvrir nos récits"
                  href="/recits"
                  style="secondary"
                />
                <Button
                  content="Voir le portfolio"
                  href="/portfolio"
                  style="link-muted"
                />
              </div>
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
