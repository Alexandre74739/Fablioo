"use client";

import { motion, type MotionValue } from "motion/react";
import { BG_WORDS } from "./constants";

interface WordFieldProps {
  y: MotionValue<number> | number;
  opacity: MotionValue<number> | number;
}

export default function WordField({ y, opacity }: WordFieldProps) {
  return (
    <motion.div
      aria-hidden="true"
      style={{ y, opacity }}
      className="pointer-events-none absolute inset-0 [--bgw:0.5] font-heading leading-none tracking-tight whitespace-nowrap uppercase select-none sm:[--bgw:0.58] md:[--bgw:0.68] lg:[--bgw:0.82] xl:[--bgw:0.92] 2xl:[--bgw:1]"
    >
      {BG_WORDS.map((w, i) => (
        <span
          key={i}
          className={`absolute ${w.filled ? "text-encre/6" : "text-transparent"}`}
          style={{
            top: w.top,
            left: w.left,
            fontSize: `calc(var(--bgw) * ${w.size}vw)`,
            WebkitTextStroke: w.filled ? undefined : "1px rgba(158,82,82,0.18)",
          }}
        >
          Portfolio
        </span>
      ))}
    </motion.div>
  );
}
