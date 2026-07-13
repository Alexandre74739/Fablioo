"use client";

import { RefObject, useEffect, useState } from "react";
import { useScroll, useTransform } from "motion/react";

const MOBILE_BREAKPOINT = 768;

export function useHeroParallax(sectionRef: RefObject<HTMLElement | null>) {
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () =>
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const { width: viewportWidth, height: viewportHeight } = viewportSize;
  const isMobile = viewportWidth > 0 && viewportWidth < MOBILE_BREAKPOINT;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const skyY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, viewportHeight * (isMobile ? -0.05 : -0.1)],
  );
  const decorY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, viewportHeight * (isMobile ? -0.2 : -0.4)],
  );
  const forestMaxTranslate = viewportHeight * (isMobile ? 0.5 : 0.65);
  const forestY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -forestMaxTranslate],
  );
  const stoneMaxTranslate = viewportHeight * 0.2;
  const stoneY = useTransform(scrollYProgress, [0, 1], [0, -stoneMaxTranslate]);
  const birdX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(viewportWidth + 400)],
  );

  return {
    skyY,
    decorY,
    birdX,
    forestY,
    forestMaxTranslate,
    stoneY,
    stoneMaxTranslate,
  };
}
