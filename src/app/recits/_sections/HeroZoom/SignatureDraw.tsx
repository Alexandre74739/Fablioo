"use client";

import { useRef } from "react";
import { motion, type MotionValue } from "motion/react";
import { useSyncedMotionValue } from "./useSyncedMotionValue";
import { SIGNATURE_VIEWBOX, SIGNATURE_PATH } from "./constants";

interface SignatureDrawProps {
  progress: MotionValue<number>;
}

export default function SignatureDraw({ progress }: SignatureDrawProps) {
  const signatureRef = useRef<SVGSVGElement>(null);

  // stroke-linecap="round" laisse un point visible à pathLength=0 :
  // masqué via opacity tant que le tracé n'a pas démarré.
  useSyncedMotionValue(progress, (v) => {
    if (signatureRef.current) signatureRef.current.style.opacity = String(v);
  });

  return (
    <svg
      ref={signatureRef}
      style={{ opacity: 0, overflow: "visible" }}
      viewBox={SIGNATURE_VIEWBOX}
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute top-1/2 left-1/2 z-20 h-[132%] w-[132%] -translate-x-1/2 -translate-y-1/2 md:h-[120%] md:w-[120%]"
    >
      <motion.path
        d={SIGNATURE_PATH}
        stroke="#9E5252"
        strokeWidth={52}
        strokeLinecap="round"
        fill="none"
        style={{ pathLength: progress }}
      />
    </svg>
  );
}
