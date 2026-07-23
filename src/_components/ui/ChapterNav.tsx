"use client";

import { useEffect, useRef, useState } from "react";

interface ChapterNavItem {
  id: string;
  label: string;
}

interface ChapterNavProps {
  items: ChapterNavItem[];
  scrollerId: string;
}

export default function ChapterNav({ items, scrollerId }: ChapterNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const elements = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { threshold: 0.6 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [items]);

  const scrollerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const scroller = document.getElementById(scrollerId);
    if (!scroller) return;
    scrollerRef.current = scroller;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.4 },
    );

    observer.observe(scroller);

    return () => observer.disconnect();
  }, [scrollerId]);

  const activeIndex = items.findIndex((item) => item.id === activeId);

  const goToChapter = (index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.scrollTo({
      left: index * scroller.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-3 z-40 flex justify-center transition-all duration-300 lg:inset-x-auto lg:top-1/2 lg:right-5 lg:bottom-auto lg:block lg:-translate-y-1/2 ${
        visible
          ? "scale-100 opacity-100"
          : "pointer-events-none scale-95 opacity-0"
      }`}
    >
      <nav
        aria-label="Sommaire du récit"
        className="rounded-full border border-sand/50 bg-paper/90 px-4 py-2 shadow-lg backdrop-blur-sm lg:px-0 lg:py-4 lg:pt-2 lg:pb-4"
      >
        <ol className="flex flex-row items-center lg:flex-col">
          {items.map((item, index) => {
            const active = index === activeIndex;
            const done = index < activeIndex;

            return (
              <li
                key={item.id}
                className="flex flex-row items-center lg:flex-col"
              >
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className={`h-px w-3 shrink-0 transition-colors duration-300 lg:h-5 lg:w-px ${
                      done || active ? "bg-rosewood/60" : "bg-sand"
                    }`}
                  />
                )}
                <button
                  type="button"
                  onClick={() => goToChapter(index)}
                  aria-current={active ? "true" : undefined}
                  aria-label={`Aller au chapitre ${item.label}`}
                  className="group flex cursor-pointer items-center justify-center px-2 py-1"
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full font-heading text-[0.6rem] tracking-wide transition-all duration-300 md:h-7 md:w-7 md:text-[0.65rem] ${
                      active
                        ? "bg-rosewood text-paper"
                        : done
                          ? "text-rosewood/70 group-hover:text-rosewood"
                          : "text-encre/35 group-hover:text-encre/70"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
