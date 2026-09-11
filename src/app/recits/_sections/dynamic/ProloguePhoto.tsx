"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

export default function ProloguePhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [32, -32]);

  return (
    <motion.div style={{ y }} ref={ref} className="relative mx-auto w-80 md:w-104">
      <span
        aria-hidden="true"
        className="absolute -inset-4 rotate-6 rounded-[3rem] bg-prune/10 md:-inset-6"
      />
      <span
        aria-hidden="true"
        className="absolute -inset-1 -rotate-3 rounded-[3rem] bg-sand/50 md:-inset-2"
      />
      <span
        aria-hidden="true"
        className="absolute -inset-3 rounded-full border border-dashed border-rosewood/30 md:-inset-5"
      />
      <div
        className="relative z-10 m-8 aspect-square overflow-hidden shadow-xl md:m-12"
        style={{ borderRadius: "63% 37% 54% 46% / 43% 37% 63% 57%" }}
      >
        <Image
          src="/illustrations/image de profil.jpg"
          alt="Alexandre, fondateur de Fablioo"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute -bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-paper px-4 py-1.5 shadow-md ring-1 ring-rosewood/15 md:-bottom-4">
        <span className="font-heading text-xs font-bold tracking-wide text-rosewood uppercase whitespace-nowrap md:text-sm">
          Fondateur de Fablioo
        </span>
      </div>
    </motion.div>
  );
}
