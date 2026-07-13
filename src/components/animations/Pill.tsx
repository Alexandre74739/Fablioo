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
      className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-full px-8 py-3.5 font-heading text-sm shadow-md select-none sm:text-base ${color}`}
    >
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-current opacity-50" />
      {label}
    </motion.div>
  );
}
