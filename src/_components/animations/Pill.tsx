"use client";

import { motion } from "motion/react";

interface PillProps {
  label: string;
  color: string;
  rotate: number;
  index: number;
}

export default function Pill({ label, color, rotate, index }: PillProps) {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0, rotate }}
      whileInView={{ y: 0, opacity: 1, rotate }}
      whileHover={{ scale: 1.04 }}
      transition={{
        y: { type: "spring", stiffness: 260, damping: 14, delay: index * 0.12 },
        opacity: { duration: 0.2, delay: index * 0.12 },
        scale: { duration: 0.18 },
      }}
      viewport={{ once: true, amount: 0 }}
      style={{ zIndex: index, position: "relative" }}
      className={`inline-flex items-center whitespace-nowrap rounded-full shadow-md select-none gap-[clamp(0.375rem,0.3rem+0.5vw,0.625rem)] px-[clamp(0.75rem,0.4rem+2.5vw,2rem)] py-[clamp(0.5rem,0.35rem+1vw,0.875rem)] font-heading text-[clamp(0.75rem,0.68rem+0.5vw,1rem)] ${color}`}
    >
      <span className="size-[clamp(0.375rem,0.3rem+0.5vw,0.625rem)] shrink-0 rounded-full bg-current opacity-50" />
      {label}
    </motion.div>
  );
}
