"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

export default function FaqRaven() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ravenX = useTransform(scrollYProgress, [0, 1], [60, -120]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <motion.div
        style={{ x: ravenX }}
        className="hidden lg:block absolute z-0 -right-40 top-0 w-md xl:w-lg xl:-right-44"
      >
        <Image
          src="/illustrations/raven.svg"
          alt=""
          width={430}
          height={402}
          className="h-auto w-full"
        />
      </motion.div>
    </div>
  );
}
