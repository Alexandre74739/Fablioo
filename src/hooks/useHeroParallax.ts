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
    [0, viewportHeight * (isMobile ? -0.09 : -0.18)],
  );
  // Le premier plan monte pour recouvrir le centre, puis continue de monter
  // jusqu'à couvrir tout l'écran en fin de scroll : la section suivante
  // s'enchaîne alors directement sur "Pierre" plutôt que sur un vide.
  const forestY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, viewportHeight * (isMobile ? -0.5 : -0.65)],
  );
  const stoneY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, viewportHeight * -0.95],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, viewportHeight * (isMobile ? 0.1 : 0.2)],
  );
  // L'oiseau ne fait que sortir par la gauche : jamais de mouvement vertical,
  // donc il ne peut jamais passer au-dessus du header.
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
    stoneY,
    contentY,
  };
}
