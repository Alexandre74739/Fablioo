"use client";

import { useRef, useState, type RefObject } from "react";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import SkillCard, { type Skill } from "@/_components/ui/cards/SkillCard";
import SkillModal from "@/_components/ui/modals/Skill";

const MIN_TILES_PER_HALF = 28;
const SPEED = 60;
const ARC_RADIUS = 2200;
const ARC_MAX_DX = 640;

interface ArcCardProps {
  skill: Skill;
  containerRef: RefObject<HTMLDivElement | null>;
}

function ArcCard({ skill, containerRef }: ArcCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);

  useAnimationFrame(() => {
    const el = ref.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const cardRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const halfWidth = containerRect.width / 2;
    if (!halfWidth) return;

    const cardCenter = cardRect.left + cardRect.width / 2;
    const containerCenter = containerRect.left + halfWidth;
    const dx = Math.max(
      -ARC_MAX_DX,
      Math.min(ARC_MAX_DX, cardCenter - containerCenter),
    );

    const arcDrop = ARC_RADIUS - Math.sqrt(ARC_RADIUS * ARC_RADIUS - dx * dx);
    const angle = (Math.asin(dx / ARC_RADIUS) * 180) / Math.PI;

    y.set(arcDrop);
    rotate.set(angle);
  });

  return (
    <motion.div ref={ref} style={{ y, rotate }} className="shrink-0">
      <SkillCard skill={skill} />
    </motion.div>
  );
}

interface SkillsCarouselProps {
  skills: Skill[];
}

export default function SkillsCarousel({ skills }: SkillsCarouselProps) {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const halfWidthRef = useRef(0);
  const isInteractingRef = useRef(false);
  const hasDraggedRef = useRef(false);

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
      className="relative overflow-x-hidden pt-6 pb-28 md:pt-8 md:pb-32"
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
          <ArcCard
            key={`${skill.id}-${index}`}
            skill={skill}
            containerRef={containerRef}
          />
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
