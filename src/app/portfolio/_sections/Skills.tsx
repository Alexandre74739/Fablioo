"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { BookOpen, Quote } from "lucide-react";
import Reveal from "@/_components/animations/Reveal";
import Button from "@/_components/ui/Button";
import SkillsCarousel from "@/_components/ui/SkillsCarousel";
import { SKILLS } from "./skills-data";

export default function Skills() {
  const branchesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: branchesRef,
    offset: ["start end", "end start"],
  });
  const branchesMaxTranslate = 40;
  const branchesY = useTransform(
    scrollYProgress,
    [0, 1],
    [branchesMaxTranslate, -branchesMaxTranslate],
  );

  return (
    <section className="relative z-10">
      <div className="relative overflow-hidden bg-prune">
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-6 top-4 h-40 w-40 md:h-56 md:w-56"
          aria-hidden="true"
        >
          <Quote strokeWidth={1} className="h-full w-full text-sand/10" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 16, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="pointer-events-none absolute top-0 right-10 h-28 w-28 rotate-12 scale-x-[-1] md:h-36 md:w-36"
          aria-hidden="true"
        >
          <Quote strokeWidth={1} className="h-full w-full text-paper/10" />
        </motion.div>

        <BookOpen
          strokeWidth={1}
          className="pointer-events-none absolute -right-8 bottom-8 h-48 w-48 -rotate-12 text-rosewood/10 md:h-64 md:w-64"
          aria-hidden="true"
        />

        <Reveal className="relative z-10 mx-auto mt-8 max-w-2xl px-6 text-center md:mt-10">
          <h2 className="text-4xl font-bold text-paper md:text-5xl">
            Les compétences d'un dev à votre service
          </h2>
          <p className="mt-4 text-lg text-paper/80 md:text-xl">
            Du design à la création de site web sur mesure en passant par la
            maintenance, ces outils et technologies donnent vie à votre projet,
            du premier croquis à la mise en ligne.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="relative z-10 mt-10 md:mt-14">
          <SkillsCarousel skills={SKILLS} />
        </Reveal>

        <Reveal
          delay={0.2}
          className="relative z-10 -mt-8 mb-8 flex justify-center md:mb-10 md:-mt-10"
        >
          <Button
            content="Parlons de votre projet"
            href="/contact"
            style="secondary"
          />
        </Reveal>
      </div>

      <motion.div
        ref={branchesRef}
        style={{ y: branchesY }}
        className="relative -mb-8 aspect-1516/111 w-full md:-mb-6"
        aria-hidden="true"
      >
        <div
          className="absolute inset-x-0 bg-prune"
          style={{
            bottom: "calc(100% - 2px)",
            height: branchesMaxTranslate + 2,
          }}
        />
        <Image
          src="/parallaxe/Branches.svg"
          alt=""
          fill
          className="object-contain"
        />
      </motion.div>
    </section>
  );
}
