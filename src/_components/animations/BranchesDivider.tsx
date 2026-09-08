"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

const MAX_TRANSLATE = 40;

export default function BranchesDivider() {
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
    <motion.div
      ref={ref}
      style={{ y }}
      className="relative -mb-8 aspect-1516/111 w-full md:-mb-6"
      aria-hidden="true"
    >
      {/* comble l'espace entre le bloc prune et les branches quand elles montent */}
      <div
        className="absolute inset-x-0 bg-prune"
        style={{ bottom: "calc(100% - 2px)", height: MAX_TRANSLATE + 2 }}
      />
      <Image
        src="/parallaxe/Branches.svg"
        alt=""
        fill
        className="object-contain"
      />
    </motion.div>
  );
}
