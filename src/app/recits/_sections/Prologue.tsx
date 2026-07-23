"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/_components/animations/Reveal";
import FloatingBlob from "@/_components/animations/FloatingBlob";
import PawTrail from "@/_components/animations/PawTrail";
import Button from "@/_components/ui/Button";

interface PrologueProps {
  title: string;
  content: string;
}

export default function Prologue({ title, content }: PrologueProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [32, -32]);

  const waveRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: waveProgress } = useScroll({
    target: waveRef,
    offset: ["start end", "end start"],
  });
  const waveMaxTranslate = 100;
  const waveY = useTransform(
    waveProgress,
    [0, 1],
    [waveMaxTranslate, -waveMaxTranslate],
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-dvh flex-col overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -left-10 top-10 hidden h-140 w-56 opacity-70 lg:block"
        aria-hidden="true"
      >
        <PawTrail className="h-full w-full" rotate={12} />
      </div>
      <FloatingBlob
        src="/shapes/blob-4.svg"
        className="hidden md:block top-32 -right-40 h-48 w-48 md:h-64 md:w-64"
        duration={9}
        delay={0.3}
        yRange={16}
        rotateRange={-5}
      />
      <FloatingBlob
        src="/shapes/blob-3.svg"
        className="-right-24 top-1/2 h-60 w-60 md:h-80 md:w-80"
        duration={8}
        delay={0.5}
        yRange={-16}
        rotateRange={6}
      />
      <FloatingBlob
        src="/shapes/blob-1.svg"
        className="hidden sm:block left-1/4 -bottom-20 h-56 w-72 md:h-72 md:w-96"
        duration={7.5}
        delay={0.9}
        yRange={14}
        rotateRange={5}
      />

      <div className="container relative z-10 mx-auto flex max-w-6xl flex-1 flex-col justify-center px-4 pt-28 pb-16 md:pt-16 md:pb-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[2fr_3fr]">
          <Reveal>
            <motion.div
              style={{ y: photoY }}
              className="relative mx-auto w-72 md:w-96"
            >
              <div
                className="relative z-10 aspect-square overflow-hidden shadow-xl"
                style={{ borderRadius: "63% 37% 54% 46% / 43% 37% 63% 57%" }}
              >
                <Image
                  src="/illustrations/image de profil.jpg"
                  alt="Alexandre, fondateur de Fablioo"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </Reveal>

          <div className="text-left px-4 py-16">
            <Reveal delay={0.2}>
              <h2 className="text-3xl font-extrabold text-encre md:text-5xl">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="mt-4 text-lg font-bold text-prune md:text-xl">
                Hola, moi c'est Alexandre !
              </p>

              <p className="mt-2 max-w-xl text-base leading-relaxed text-encre/80 md:mt-3 md:text-lg">
                {content}
              </p>
            </Reveal>
            <Reveal
              delay={0.6}
              className="mt-6 flex flex-wrap items-center gap-6 md:mt-8"
            >
              <Button
                content="Je prend rendez-vous"
                href="/contact"
                style="primary"
              />
              <div className="-ml-4 sm:ml-0">
                <Button
                  content="Découvrir mon histoire"
                  href="#chapters-scroller"
                  style="link-base"
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
          src="/shapes/wave-divider-products.svg"
          alt=""
          fill
          className="object-cover object-bottom"
        />
        <div
          className="absolute inset-x-0 bg-paper"
          style={{ top: "calc(100% - 2px)", height: waveMaxTranslate + 2 }}
        />
      </motion.div>
    </section>
  );
}
