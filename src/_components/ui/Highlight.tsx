"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

// Trait de marqueur (silhouette à bords irréguliers) qui se peint de gauche à droite.
const MARKER_PATH =
  "M4,30 C1,18 6,9 20,7 C70,2 140,6 210,5 C255,4 285,2 292,10 C299,17 300,26 295,34 C299,42 288,49 262,46 C180,50 90,47 34,45 C14,44 7,40 4,30 Z";
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

interface HighlightProps {
  children: ReactNode;
  /** Désactive l'animation d'entrée (prefers-reduced-motion). */
  reduce?: boolean;
  /** Couleur du marqueur. */
  fill?: string;
  /** Classe du texte posé sur le marqueur. */
  className?: string;
  delay?: number;
}

export default function Highlight({
  children,
  reduce = false,
  fill = "#5a3550",
  className = "font-quote font-semibold italic text-paper",
  delay = 0.75,
}: HighlightProps) {
  return (
    <span className="relative ml-[0.4em] inline-block">
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 300 50"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -rotate-1"
        style={{
          left: "-0.32em",
          right: "-0.5em",
          top: "0.02em",
          bottom: "-0.12em",
        }}
        initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 0.6, delay, ease: EASE_OUT }}
      >
        <path d={MARKER_PATH} fill={fill} fillOpacity={0.96} />
      </motion.svg>
      <span className={`relative ${className}`}>{children}</span>
    </span>
  );
}
