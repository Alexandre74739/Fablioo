"use client";

import { motion } from "motion/react";

interface MarqueeProps {
  text: string;
  reverse?: boolean;
  duration?: number;
  className?: string;
}

export default function Marquee({
  text,
  reverse,
  duration = 30,
  className,
}: MarqueeProps) {
  return (
    <div className="w-full overflow-hidden pb-3 whitespace-nowrap">
      <motion.div
        className="flex w-max shrink-0"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className={`pr-4 font-quote text-4xl italic md:text-7xl lg:text-8xl ${className ?? ""}`}
          >
            "{text}"
          </span>
        ))}
      </motion.div>
    </div>
  );
}
