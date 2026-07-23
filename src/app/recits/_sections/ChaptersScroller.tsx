"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

export const CHAPTERS_SCROLLER_ID = "chapters-scroller";

interface ChapterSlideProps {
  children: ReactNode;
}

function ChapterSlide({ children }: ChapterSlideProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.6 },
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex h-dvh w-screen shrink-0 snap-start items-center justify-center"
    >
      <div
        className={`h-full w-full transition-all duration-500 ease-out ${
          active ? "scale-100 opacity-100" : "scale-90 opacity-40"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

interface ChaptersScrollerProps {
  children: ReactNode;
}

export default function ChaptersScroller({ children }: ChaptersScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lockedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Only trap the scroll once the section fills the whole viewport (100vh) —
    // this both avoids stealing the scroll mid-transition and gives a clean
    // unlock: reaching an edge and continuing releases the trap immediately.
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        lockedRef.current = entry.intersectionRatio >= 0.99;
      },
      { threshold: 0.99 },
    );
    visibilityObserver.observe(el);

    // At an edge, continuing to scroll in the outgoing direction releases
    // the trap instead of blocking it, so the page can scroll past the section.
    const releasesTrap = (delta: number) => {
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
      return (delta < 0 && atStart) || (delta > 0 && atEnd);
    };

    const onWheel = (e: WheelEvent) => {
      if (!lockedRef.current) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      if (releasesTrap(e.deltaY)) return;

      e.preventDefault();
      el.scrollBy({ left: e.deltaY });
    };

    let touchStartX = 0;
    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!lockedRef.current) return;

      const touch = e.touches[0];
      const deltaX = touchStartX - touch.clientX;
      const deltaY = touchStartY - touch.clientY;
      if (Math.abs(deltaY) <= Math.abs(deltaX)) return;
      if (releasesTrap(deltaY)) return;

      e.preventDefault();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      visibilityObserver.disconnect();
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div
      id={CHAPTERS_SCROLLER_ID}
      ref={containerRef}
      className="no-scrollbar flex h-dvh w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth"
    >
      {Children.map(children, (child) => (
        <ChapterSlide>{child}</ChapterSlide>
      ))}
    </div>
  );
}
