"use client";

import { useRef } from "react";
import { motion, type MotionValue } from "motion/react";
import Hero from "../Hero";
import { useSyncedMotionValue } from "./useSyncedMotionValue";

interface HeroCardProps {
  radius: MotionValue<number>;
  fadeProgress: MotionValue<number>;
  title: string;
  highlight: string;
  content: string;
}

export default function HeroCard({
  radius,
  fadeProgress,
  title,
  highlight,
  content,
}: HeroCardProps) {
  const fadeRef = useRef<HTMLDivElement>(null);

  useSyncedMotionValue(fadeProgress, (v) => {
    if (fadeRef.current) {
      fadeRef.current.style.filter = `grayscale(${v}) blur(${v * 14}px)`;
    }
  });

  return (
    <motion.div
      style={{ borderRadius: radius }}
      className="relative h-full w-full overflow-hidden shadow-2xl"
    >
      <div ref={fadeRef} className="h-full w-full">
        <Hero title={title} highlight={highlight} content={content} />
      </div>
    </motion.div>
  );
}
