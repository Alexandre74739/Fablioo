"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { BookOpen, Quote } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import Button from "@/components/ui/Button";
import SkillsCascade from "@/components/ui/SkillsCascade";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const quoteY = useTransform(sectionProgress, [0, 1], [-40, 40]);
  const bookY = useTransform(sectionProgress, [0, 1], [60, -60]);
  const quote2Y = useTransform(sectionProgress, [0, 1], [-20, 80]);

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
    <section
      ref={sectionRef}
      className="relative -mt-4 overflow-hidden bg-prune"
    >
      <motion.div
        style={{ y: quoteY }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0 }}
        className="pointer-events-none absolute -left-6 top-4 h-40 w-40 md:h-56 md:w-56"
      >
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [0, 4, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-full w-full"
        >
          <Quote strokeWidth={1} className="h-full w-full text-sand/10" />
        </motion.div>
      </motion.div>
      <motion.div
        style={{ y: quote2Y }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="pointer-events-none absolute right-10 top-56 h-28 w-28 rotate-12 md:h-36 md:w-36 lg:top-10"
      >
        <motion.div
          animate={{ y: [0, 16, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="h-full w-full scale-x-[-1]"
        >
          <Quote strokeWidth={1} className="h-full w-full text-paper/10" />
        </motion.div>
      </motion.div>
      <motion.div
        style={{ y: bookY }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="pointer-events-none absolute -right-8 bottom-8 h-48 w-48 -rotate-12 md:h-64 md:w-64"
      >
        <BookOpen strokeWidth={1} className="h-full w-full text-rosewood/10" />
      </motion.div>

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

          <div className="lg:col-span-5">
            <SkillsCascade />
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
