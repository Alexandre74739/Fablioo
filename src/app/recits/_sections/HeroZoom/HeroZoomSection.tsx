"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import Background from "./Background";
import ZoomCard from "./ZoomCard";
import HeroCard from "./HeroCard";
import SignatureDraw from "./SignatureDraw";
import ZoomLabel from "./ZoomLabel";
import { useIsMobile } from "./useIsMobile";

interface HeroZoomSectionProps {
  title: string;
  highlight: string;
  content: string;
  quote1: string;
  quote2: string;
}

export default function HeroZoomSection({
  title,
  highlight,
  content,
  quote1,
  quote2,
}: HeroZoomSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.6],
    [1, isMobile ? 0.58 : 0.33],
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.6],
    [1, isMobile ? 0.32 : 0.44],
  );
  const cardY = useTransform(scrollYProgress, [0, 0.6], [0, isMobile ? 0 : 48]);
  const radius = useTransform(scrollYProgress, [0, 0.6], [0, 6]);
  const fadeProgress = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const labelProgress = useTransform(scrollYProgress, [0.42, 0.58], [0, 1]);
  const signatureProgress = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <section ref={sectionRef} className="relative h-[280vh] w-full bg-prune">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Background quote1={quote1} quote2={quote2} />

        <div className="absolute inset-0 z-20">
          <ZoomLabel
            scaleY={scaleY}
            labelProgress={labelProgress}
            isMobile={isMobile}
          />

          <ZoomCard scaleX={scaleX} scaleY={scaleY} cardY={cardY}>
            <HeroCard
              radius={radius}
              fadeProgress={fadeProgress}
              title={title}
              highlight={highlight}
              content={content}
            />
            <SignatureDraw progress={signatureProgress} />
          </ZoomCard>
        </div>
      </div>
    </section>
  );
}
