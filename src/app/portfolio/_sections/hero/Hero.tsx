"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Button from "@/_components/ui/Button";
import Highlight from "@/_components/ui/Highlight";
import Reveal from "@/_components/animations/Reveal";
import PawTrail from "@/_components/animations/PawTrail";
import PaperTexture from "./PaperTexture";
import WordField from "./WordField";
import { STONE_TRAVEL } from "./constants";

interface HeroProps {
  title: string;
  highlight: string;
  content: string;
  label: string;
  href: string;
}

export default function Hero({
  title,
  highlight,
  content,
  label,
  href,
}: HeroProps) {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const wordY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const wordOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const stoneY = useTransform(scrollYProgress, [0, 1], [0, -STONE_TRAVEL]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh w-full items-center overflow-hidden bg-paper"
    >
      <PaperTexture />
      <WordField y={reduce ? 0 : wordY} opacity={reduce ? 1 : wordOpacity} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-14 top-1/2 hidden h-140 w-56 -translate-y-1/2 -rotate-6 opacity-55 lg:block 2xl:h-180 2xl:w-72"
      >
        <PawTrail className="h-full w-full" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 bottom-[10%] hidden h-120 w-48 rotate-174 opacity-45 lg:block 2xl:h-160 2xl:w-64"
      >
        <PawTrail className="h-full w-full" />
      </div>

      <div className="relative z-10 -mt-8 flex w-full flex-col items-center justify-center gap-6 px-6 text-center">
        <Reveal>
          <h1 className="max-w-4xl sm:max-w-lg md:max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            {title} <Highlight reduce={reduce}>{highlight}</Highlight>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="max-w-xl text-base leading-relaxed font-medium text-encre/80 md:text-lg lg:text-xl">
            {content}
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <Button content={label} href={href} style="primary" />
        </Reveal>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 origin-bottom scale-y-[0.8] md:scale-y-[0.68]">
        <motion.div style={{ y: reduce ? 0 : stoneY }} className="relative">
          <Image
            src="/parallaxe/Grass.svg"
            alt=""
            width={1280}
            height={297}
            className="h-auto w-full"
          />
          <div
            className="absolute inset-x-0 bg-prune"
            style={{ top: "calc(100% - 2px)", height: STONE_TRAVEL + 20 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
