"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  motionValue,
  useMotionValue,
  animate,
  type MotionValue,
} from "motion/react";
import Reveal from "@/_components/animations/Reveal";

export const CHAPTERS_SCROLLER_ID = "chapters-scroller";

// A single hand-picked easing/duration drives every transition, instead of
// however fast the browser's native smooth-scroll happens to animate — that
// mismatch (visual reactively following an independently-timed native
// scroll) is what made transitions feel abrupt.
const TRANSITION = { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };

interface ChapterSlideProps {
  opacity: MotionValue<number>;
  children: ReactNode;
}

function ChapterSlide({ opacity, children }: ChapterSlideProps) {
  return (
    <motion.div
      style={{ opacity }}
      className="flex h-dvh w-screen shrink-0 items-center justify-center overflow-hidden"
    >
      <Reveal className="h-full w-full">{children}</Reveal>
    </motion.div>
  );
}

interface ChaptersScrollerProps {
  children: ReactNode;
}

export default function ChaptersScroller({ children }: ChaptersScrollerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const count = Children.count(children);

  const x = useMotionValue(0);
  // One value per chapter, created once outside the render loop (hooks can't
  // run inside .map) — chapter 0 starts the only one visible.
  const [opacities] = useState<MotionValue<number>[]>(() =>
    Array.from({ length: count }, (_, i) => motionValue(i === 0 ? 1 : 0)),
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const currentIndexRef = { current: 0 };
    const isSyncingScrollRef = { current: false };
    // A single scroll/trackpad gesture fires many wheel events in a row —
    // without this, each one advanced the chapter independently, so one
    // strong flick could blow straight through several chapters at once.
    const isCoolingDownRef = { current: false };

    const isSectionActive = () => {
      const rect = section.getBoundingClientRect();
      return rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
    };

    const getScrollIndex = () => {
      const rect = section.getBoundingClientRect();
      const raw = -rect.top / window.innerHeight;
      return Math.min(count - 1, Math.max(0, Math.round(raw)));
    };

    // `opacities`/`x` and `currentIndexRef` default to chapter 0 regardless
    // of where the page actually loads — the browser can restore scroll
    // position on reload, landing anywhere in or past the section. Sync
    // once, instantly (no animation), so the visuals match reality before
    // any gesture fires and "corrects" it with a jarring jump.
    const initialIndex = getScrollIndex();
    currentIndexRef.current = initialIndex;
    x.set(-initialIndex * window.innerWidth);
    opacities.forEach((opacity, i) => opacity.set(i === initialIndex ? 1 : 0));

    // Animates the visuals to `index`. `syncScroll` additionally jumps the
    // real scroll position there (for wheel/touch, which never move it
    // natively since the event gets prevented) — as an instant jump, not an
    // animated one, so it doesn't race or compound with the animation above.
    const goToChapter = (index: number, syncScroll: boolean) => {
      currentIndexRef.current = index;
      animate(x, -index * window.innerWidth, TRANSITION);
      opacities.forEach((opacity, i) => {
        animate(opacity, i === index ? 1 : 0, TRANSITION);
      });

      if (syncScroll) {
        isCoolingDownRef.current = true;
        window.setTimeout(() => {
          isCoolingDownRef.current = false;
        }, TRANSITION.duration * 1000);

        const rect = section.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        isSyncingScrollRef.current = true;
        window.scrollTo({ top: sectionTop + index * window.innerHeight });
        requestAnimationFrame(() => {
          isSyncingScrollRef.current = false;
        });
      }
    };

    // Returns true if the gesture should stay trapped in the section (the
    // caller must then block the native scroll); false at an edge, letting
    // the page scroll on to whatever comes before/after the chapters.
    const handleDirection = (direction: 1 | -1) => {
      const index = currentIndexRef.current;
      const atFirst = index <= 0;
      const atLast = index >= count - 1;
      if ((direction < 0 && atFirst) || (direction > 0 && atLast)) return false;

      // Still swallow the event during the cooldown — otherwise the same
      // gesture leaks into a native scroll once we stop calling goToChapter.
      if (!isCoolingDownRef.current) goToChapter(index + direction, true);
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (!isSectionActive()) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      if (handleDirection(direction)) e.preventDefault();
    };

    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isSectionActive()) return;

      const deltaY = touchStartY - e.touches[0].clientY;
      if (Math.abs(deltaY) < 40) return;

      const direction = deltaY > 0 ? 1 : -1;
      if (handleDirection(direction)) {
        e.preventDefault();
        touchStartY = e.touches[0].clientY;
      }
    };

    // A scrollbar drag isn't a wheel/touch event and can't be intercepted —
    // it moves the real scroll position directly. Instead of fighting it,
    // just follow: once it crosses into a different chapter's territory,
    // animate the visuals to match (scroll itself needs no syncing, it's
    // already there).
    const onScroll = () => {
      if (isSyncingScrollRef.current) return;
      if (!isSectionActive()) return;

      const index = getScrollIndex();
      if (index !== currentIndexRef.current) goToChapter(index, false);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [count, x, opacities]);

  return (
    <section
      id={CHAPTERS_SCROLLER_ID}
      ref={sectionRef}
      className="relative"
      style={{ height: `${count * 100}dvh` }}
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <motion.div className="flex h-full" style={{ x }}>
          {Children.map(children, (child, i) => (
            <ChapterSlide opacity={opacities[i]}>{child}</ChapterSlide>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
