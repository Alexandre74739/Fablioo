"use client";

import ShaderWaves from "@/_components/animations/ShaderWaves";
import Marquee from "./Marquee";
import { PRUNE, PAPER, PAPER_DIM } from "./constants";

interface BackgroundProps {
  quote1: string;
  quote2: string;
}

export default function Background({ quote1, quote2 }: BackgroundProps) {
  return (
    <div className="absolute inset-0 bg-prune">
      <ShaderWaves
        className="absolute inset-0 h-full w-full"
        background={PRUNE}
        lineNear={PAPER}
        lineFar={PAPER_DIM}
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
