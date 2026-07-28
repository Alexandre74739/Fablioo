"use client";

import { useRef } from "react";
import { type MotionValue } from "motion/react";
import ShaderWaves from "@/_components/animations/ShaderWaves";
import Marquee from "./Marquee";
import { useSyncedMotionValue } from "./useSyncedMotionValue";
import { PRUNE, PAPER, PAPER_DIM } from "./constants";

interface BackgroundProps {
  quote1: string;
  quote2: string;
  scrollYProgress: MotionValue<number>;
}

export default function Background({
  quote1,
  quote2,
  scrollYProgress,
}: BackgroundProps) {
  const shaderActiveRef = useRef(false);
  useSyncedMotionValue(scrollYProgress, (v) => {
    shaderActiveRef.current = v > 0.03;
  });

  return (
    <div className="absolute inset-0 bg-prune">
      <ShaderWaves
        className="absolute inset-0 h-full w-full"
        background={PRUNE}
        lineNear={PAPER}
        lineFar={PAPER_DIM}
        activeRef={shaderActiveRef}
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-prune" />

      <div className="absolute inset-x-0 top-[74%] -translate-y-full md:top-[calc(50%+3rem)]">
        <Marquee text={quote1} duration={26} className="text-paper" />
      </div>
      <div className="absolute inset-x-0 top-[74%] md:top-[calc(50%+3rem)]">
        <Marquee
          text={quote2}
          reverse
          duration={32}
          className="text-paper/60"
        />
      </div>
    </div>
  );
}
