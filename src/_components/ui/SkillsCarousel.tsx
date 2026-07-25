"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import SkillCard from "@/_components/ui/cards/SkillCard";
import type { Skill } from "@/_components/ui/cards/SkillCard";
import SkillModal from "@/_components/ui/modals/Skill";

const MIN_TILES_PER_HALF = 28;
const SPEED = 60;
// Radius/reach are expressed relative to the container width (not fixed px)
// so the curve stays proportionally as wide and as gentle on any screen size.
const ARC_RADIUS_RATIO = 3.75;
const ARC_MAX_DX_RATIO = 1.5;

interface SkillsCarouselProps {
  skills: Skill[];
}

export default function SkillsCarousel({ skills }: SkillsCarouselProps) {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const halfWidthRef = useRef(0);
  const isInteractingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  // Each card's center, relative to the container and with the current
  // track offset removed, measured directly per card (not reconstructed
  // via index * pitch, which drifts if spacing isn't perfectly uniform).
  // Only recomputed on resize/breakpoint change, never per frame.
  const cardOffsetsRef = useRef<number[]>([]);
  const containerWidthRef = useRef(0);
  const arcRadiusRef = useRef(0);
  const arcMaxDxRef = useRef(0);

  const repeats = Math.max(1, Math.ceil(MIN_TILES_PER_HALF / skills.length));
  const halfTrack = Array.from({ length: repeats }, () => skills).flat();
  const fullTrack = [...halfTrack, ...halfTrack];

  function wrap() {
    const half = halfWidthRef.current;
    if (!half) return;
    // Modulo (not a single if-check) so a fast fling that overshoots by more
    // than one full loop still lands back in range instead of drifting off.
    const normalized = ((x.get() % half) + half) % half;
    x.set(normalized - half);
  }

  function measureLayout() {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const currentX = x.get();

    containerWidthRef.current = containerRect.width;
    arcRadiusRef.current = containerRect.width * ARC_RADIUS_RATIO;
    arcMaxDxRef.current = containerRect.width * ARC_MAX_DX_RATIO;
    cardOffsetsRef.current = cardRefs.current.map((el) => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      // Center of the card relative to the container, with the current
      // track transform subtracted out so it stays valid as x keeps moving.
      return rect.left + rect.width / 2 - containerRect.left - currentX;
    });
  }

  useEffect(() => {
    measureLayout();
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(measureLayout);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track) return;
    if (halfWidthRef.current === 0) {
      halfWidthRef.current = track.scrollWidth / 2;
    }
    if (!isInteractingRef.current) {
      x.set(x.get() - (SPEED * delta) / 1000);
      wrap();
    }

    const containerWidth = containerWidthRef.current;
    const offsets = cardOffsetsRef.current;
    const arcRadius = arcRadiusRef.current;
    const arcMaxDx = arcMaxDxRef.current;
    if (!containerWidth || offsets.length === 0 || !arcRadius) return;
    const currentX = x.get();
    const halfContainer = containerWidth / 2;

    cardRefs.current.forEach((el, index) => {
      if (!el) return;
      const cardCenter = offsets[index] + currentX;
      const dx = Math.max(
        -arcMaxDx,
        Math.min(arcMaxDx, cardCenter - halfContainer),
      );
      const arcDrop = arcRadius - Math.sqrt(arcRadius * arcRadius - dx * dx);
      const angle = (Math.asin(dx / arcRadius) * 180) / Math.PI;
      el.style.transform = `translateY(${arcDrop}px) rotate(${angle}deg)`;
    });
  });

  function handleRowClick(event: React.MouseEvent<HTMLDivElement>) {
    if (hasDraggedRef.current) return;
    const target = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-skill-id]",
    );
    const skillId = target?.dataset.skillId;
    if (!skillId) return;
    const skill = skills.find((s) => s.id === skillId);
    if (skill) setActiveSkill(skill);
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden pt-6 pb-28 md:pt-8 md:pb-32"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex w-max cursor-grab items-center gap-5 active:cursor-grabbing md:gap-6"
        drag="x"
        dragMomentum
        dragTransition={{ power: 0.25, timeConstant: 200 }}
        onMouseEnter={() => (isInteractingRef.current = true)}
        onMouseLeave={() => (isInteractingRef.current = false)}
        onPointerDown={() => (hasDraggedRef.current = false)}
        onDragStart={() => {
          isInteractingRef.current = true;
          hasDraggedRef.current = true;
        }}
        onDragEnd={() => {
          isInteractingRef.current = false;
          wrap();
        }}
        onClick={handleRowClick}
      >
        {fullTrack.map((skill, index) => (
          <div
            key={`${skill.id}-${index}`}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="shrink-0"
          >
            <SkillCard skill={skill} />
          </div>
        ))}
      </motion.div>

      <SkillModal
        isOpen={activeSkill !== null}
        onClose={() => setActiveSkill(null)}
        skill={activeSkill}
      />
    </div>
  );
}
