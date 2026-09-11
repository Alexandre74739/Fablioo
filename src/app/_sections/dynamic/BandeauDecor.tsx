"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BookOpen, Quote } from "lucide-react";

export default function BandeauDecor() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const quoteY = useTransform(sectionProgress, [0, 1], [-40, 40]);
  const bookY = useTransform(sectionProgress, [0, 1], [60, -60]);
  const quote2Y = useTransform(sectionProgress, [0, 1], [-20, 80]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
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
        <BookOpen strokeWidth={1} className="h-full w-full text-rosewood/10" />
      </motion.div>
    </div>
  );
}
