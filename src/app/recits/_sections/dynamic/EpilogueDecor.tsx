"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

export default function EpilogueDecor() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ravenX = useTransform(scrollYProgress, [0, 1], [50, -90]);
  const foxX = useTransform(scrollYProgress, [0, 1], [-90, 50]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <motion.div
        style={{ x: ravenX }}
        className="hidden md:block absolute z-0 -right-20 top-6 h-64 w-64 lg:-right-32 lg:top-10 lg:h-88 lg:w-88"
      >
        <Image
          src="/illustrations/raven.svg"
          alt=""
          fill
          className="object-contain"
        />
      </motion.div>
      <motion.div
        style={{ x: foxX }}
        className="hidden md:block absolute z-0 -left-20 bottom-6 h-64 w-64 lg:-left-32 lg:bottom-10 lg:h-88 lg:w-88"
      >
        <Image
          src="/illustrations/fox.svg"
          alt=""
          fill
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}
