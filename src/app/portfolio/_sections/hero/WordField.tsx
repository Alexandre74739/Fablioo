"use client";

import { motion, type MotionValue } from "motion/react";
import { BG_WORDS } from "./constants";

interface WordFieldProps {
  y: MotionValue<number> | number;
  opacity: MotionValue<number> | number;
  reduce?: boolean;
}

const DRIFT_LEFT = BG_WORDS.filter((_, i) => i % 2 === 0);
const DRIFT_RIGHT = BG_WORDS.filter((_, i) => i % 2 === 1);

type Words = typeof BG_WORDS;

function WordRow({ words }: { words: Words }) {
  return (
    <div className="relative h-full w-1/2 shrink-0">
      {words.map((w, i) => (
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
    </div>
  );
}
function Track({
  words,
  animation,
  reduce,
}: {
  words: Words;
  animation: string;
  reduce: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 flex w-[200%] will-change-transform ${
        reduce ? "" : animation
      }`}
    >
      <WordRow words={words} />
      <WordRow words={words} />
    </div>
  );
}

export default function WordField({ y, opacity, reduce = false }: WordFieldProps) {
  return (
    <motion.div
      aria-hidden="true"
      style={{ y, opacity }}
      className="pointer-events-none absolute inset-0 [--bgw:0.5] font-heading leading-none tracking-tight whitespace-nowrap uppercase select-none sm:[--bgw:0.58] md:[--bgw:0.68] lg:[--bgw:0.82] xl:[--bgw:0.92] 2xl:[--bgw:1]"
    >
      <Track
        words={DRIFT_LEFT}
        animation="animate-[marquee_150s_linear_infinite]"
        reduce={reduce}
      />
      <Track
        words={DRIFT_RIGHT}
        animation="animate-[marquee_190s_linear_infinite_reverse]"
        reduce={reduce}
      />
    </motion.div>
  );
}
