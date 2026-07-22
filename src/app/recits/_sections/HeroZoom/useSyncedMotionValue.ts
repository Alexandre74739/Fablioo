"use client";

import { useEffect } from "react";
import { useMotionValueEvent, type MotionValue } from "motion/react";

export function useSyncedMotionValue(
  value: MotionValue<number>,
  apply: (v: number) => void,
) {
  useEffect(() => {
    apply(value.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useMotionValueEvent(value, "change", apply);
}
