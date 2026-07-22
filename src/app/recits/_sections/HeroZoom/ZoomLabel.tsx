"use client";

import { useRef } from "react";
import type { MotionValue } from "motion/react";
import { useSyncedMotionValue } from "./useSyncedMotionValue";
import { LABEL_TEXT } from "./constants";

interface ZoomLabelProps {
  scaleY: MotionValue<number>;
  labelProgress: MotionValue<number>;
  isMobile: boolean;
}

const LABEL_GAP_PX = 28;

export default function ZoomLabel({
  scaleY,
  labelProgress,
  isMobile,
}: ZoomLabelProps) {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelAnchorRef = useRef<HTMLDivElement>(null);

  useSyncedMotionValue(scaleY, (v) => {
    if (labelAnchorRef.current) {
      const cardTopPercent = ((1 - v) / 2) * 100;
      const cardYOffset = isMobile ? 0 : 48;
      labelAnchorRef.current.style.top = `calc(${cardTopPercent}% + ${cardYOffset}px - ${LABEL_GAP_PX}px)`;
    }
  });

  useSyncedMotionValue(labelProgress, (v) => {
    const n = letterRefs.current.length;
    const windowWidth = 0.3;
    const step = n > 1 ? (1 - windowWidth) / (n - 1) : 0;
    letterRefs.current.forEach((el, i) => {
      if (!el) return;
      const start = i * step;
      const end = start + windowWidth;
      const t = Math.min(Math.max((v - start) / (end - start), 0), 1);
      el.style.opacity = String(t);
      const rise = (1 - t) * 28;
      const tilt = (1 - t) * (i % 2 === 0 ? 10 : -10);
      el.style.transform = `translateY(${rise}px) rotate(${tilt}deg)`;
    });
  });

  return (
    <div
      ref={labelAnchorRef}
      style={{ transform: "translateY(-100%)" }}
      className="pointer-events-none absolute inset-x-0 z-20 flex justify-center"
    >
      <p className="font-quote text-2xl text-paper/80 italic md:text-3xl lg:mb-6 xl:mb-10">
        {LABEL_TEXT.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              letterRefs.current[i] = el;
            }}
            style={{ display: "inline-block", opacity: 0 }}
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </p>
    </div>
  );
}
