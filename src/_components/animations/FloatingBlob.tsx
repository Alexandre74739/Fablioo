"use client";

import Image from "next/image";
import { motion } from "motion/react";

interface FloatingBlobProps {
  src: string;
  className: string;
  duration?: number;
  delay?: number;
  yRange?: number;
  rotateRange?: number;
}

export default function FloatingBlob({
  src,
  className,
  duration = 8,
  delay = 0,
  yRange = 20,
  rotateRange = 6,
}: FloatingBlobProps) {
  return (
    <motion.div
      animate={{ y: [0, -yRange, 0], rotate: [0, rotateRange, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      className={`pointer-events-none absolute ${className}`}
    >
      <Image src={src} alt="" fill />
    </motion.div>
  );
}
