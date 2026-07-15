"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { BookOpen, Quote } from "lucide-react";
import Button from "../ui/Button";
import Reveal from "../animations/Reveal";

interface BandeauProps {
  title: string;
  description: string;
  label: string;
  href: string;
}

export default function Bandeau({
  title,
  description,
  label,
  href,
}: BandeauProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const quoteY = useTransform(sectionProgress, [0, 1], [-40, 40]);
  const bookY = useTransform(sectionProgress, [0, 1], [60, -60]);
  const quote2Y = useTransform(sectionProgress, [0, 1], [-20, 80]);

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
    <section ref={sectionRef} className="relative z-10">
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className="block h-8 w-full text-prune sm:h-12 md:h-14"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,56 C480,36 960,36 1440,56 L1440,56 L0,56 Z"
        />
      </svg>

      <div className="relative overflow-hidden bg-prune px-6 pt-10 pb-8 md:px-8 md:pt-14 md:pb-10">
        <motion.div
          style={{ y: quoteY }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0 }}
          className="pointer-events-none absolute -left-8 sm:left-16 top-4 h-40 w-40 md:h-56 md:w-56"
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
          className="pointer-events-none absolute right-10 top-0 h-28 w-28 rotate-12 md:h-36 md:w-36"
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
          className="pointer-events-none absolute -right-8 -bottom-8 h-48 w-48 -rotate-12 md:h-64 md:w-64"
        >
          <BookOpen
            strokeWidth={1}
            className="h-full w-full text-rosewood/10"
          />
        </motion.div>

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <Reveal delay={0}>
            <Image
              src="/logo/logo-icone.svg"
              alt=""
              width={103}
              height={84}
              className="h-16 w-auto md:h-20"
            />
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="text-4xl font-bold text-paper md:text-5xl">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="max-w-xl text-lg text-paper/80 leading-relaxed md:text-xl">
              {description}
            </p>
          </Reveal>
          <Reveal delay={0.6} className="mt-3">
            <Button content={label} href={href} style="secondary" />
          </Reveal>
        </div>
      </div>

      <motion.div
        ref={branchesRef}
        style={{ y: branchesY }}
        className="relative -mb-8 aspect-1516/111 w-full md:-mb-6"
        aria-hidden="true"
      >
        {/* comble l'espace entre le bloc prune et les branches quand elles montent */}
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
