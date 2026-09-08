"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";

export default function SkillsDecor() {
  return (
    <>
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
    </>
  );
}
