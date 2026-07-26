"use client";

import { motion } from "motion/react";

interface StoryPathProps {
  className?: string;
}

export default function StoryPath({ className }: StoryPathProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
    >
      <motion.line
        x1="50%"
        y1="0"
        x2="50%"
        y2="100%"
        stroke="var(--color-rosewood)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeOpacity="0.65"
        style={{ strokeDasharray: "9 13" }}
        animate={{ strokeDashoffset: [0, -66] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}
