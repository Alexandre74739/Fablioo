"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

interface WaveDividerProps {
  src: string;
  /** Classe Tailwind de l'aplat qui comble l'espace laissé par la vague en montant. */
  fillerClassName: string;
  className?: string;
}

const MAX_TRANSLATE = 100;

export default function WaveDivider({
  src,
  fillerClassName,
  className = "relative z-10 mt-16 h-32 sm:h-40 md:mt-8 md:h-48 lg:h-56",
}: WaveDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [MAX_TRANSLATE, -MAX_TRANSLATE],
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      <Image src={src} alt="" fill className="object-cover object-bottom" />
      <div
        className={`absolute inset-x-0 ${fillerClassName}`}
        style={{ top: "calc(100% - 2px)", height: MAX_TRANSLATE + 2 }}
      />
    </motion.div>
  );
}
