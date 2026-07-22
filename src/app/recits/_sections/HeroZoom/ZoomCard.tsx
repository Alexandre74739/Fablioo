"use client";

import { motion, type MotionValue } from "motion/react";
import type { ReactNode } from "react";

interface ZoomCardProps {
  scaleX: MotionValue<number>;
  scaleY: MotionValue<number>;
  cardY: MotionValue<number>;
  children: ReactNode;
}

export default function ZoomCard({
  scaleX,
  scaleY,
  cardY,
  children,
}: ZoomCardProps) {
  return (
    <motion.div
      style={{ scaleX, scaleY, y: cardY }}
      className="pointer-events-auto relative z-10 h-full w-full origin-center"
    >
      {children}
    </motion.div>
  );
}
