"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Reveal from "@/_components/animations/Reveal";
import NavButton from "@/_components/ui/NavButton";
import ProjectMeta from "../views/ProjectMeta";

interface ProjectGalleryProps {
  images: string[];
  alt: string;
  tech: string[];
  siteUrl: string;
}

export default function ProjectGallery({
  images,
  alt,
  tech,
  siteUrl,
}: ProjectGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const looping = images.length > 1;
  // Clone the last slide before the first and the first slide after the last,
  // so scrolling past an edge keeps moving in the same direction instead of
  // snapping back to the start — the reset onto the real slide happens
  // invisibly once the scroll settles on a clone.
  const slides = looping
    ? [images[images.length - 1], ...images, images[0]]
    : images;

  useEffect(() => {
    if (!looping) return;
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>("[data-gallery-slide]");
    const amount = slide ? slide.offsetWidth + 20 : track.clientWidth;
    track.scrollLeft = amount;
  }, [looping]);

  useEffect(() => {
    if (!looping) return;
    const track = trackRef.current;
    if (!track) return;

    let settleTimeout: ReturnType<typeof setTimeout>;
    function handleScroll() {
      clearTimeout(settleTimeout);
      settleTimeout = setTimeout(() => {
        if (!track) return;
        const slide = track.querySelector<HTMLElement>("[data-gallery-slide]");
        const amount = slide ? slide.offsetWidth + 20 : track.clientWidth;
        const index = Math.round(track.scrollLeft / amount);

        if (index === 0) {
          track.scrollLeft = images.length * amount;
        } else if (index === slides.length - 1) {
          track.scrollLeft = amount;
        }
      }, 120);
    }

    track.addEventListener("scroll", handleScroll);
    return () => {
      track.removeEventListener("scroll", handleScroll);
      clearTimeout(settleTimeout);
    };
  }, [looping, images.length, slides.length]);

  function goToPrevious() {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>("[data-gallery-slide]");
    const amount = slide ? slide.offsetWidth + 20 : track.clientWidth;
    track.scrollBy({ left: -amount, behavior: "smooth" });
  }

  function goToNext() {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>("[data-gallery-slide]");
    const amount = slide ? slide.offsetWidth + 20 : track.clientWidth;
    track.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section className="relative overflow-hidden border-t border-encre/10 bg-paper py-20 md:py-28">
      <div className="container relative z-10 mx-auto flex max-w-6xl flex-col gap-14 px-4">
        {images.length > 0 && (
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold">Images du projet</h2>

              {images.length > 1 && (
                <div className="flex shrink-0 gap-2">
                  <NavButton
                    direction="previous"
                    onClick={goToPrevious}
                    label="Voir l'image précédente"
                  />
                  <NavButton
                    direction="next"
                    onClick={goToNext}
                    label="Voir l'image suivante"
                  />
                </div>
              )}
            </div>

            <div
              ref={trackRef}
              className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
            >
              {slides.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  data-gallery-slide
                  className="relative aspect-video w-full shrink-0 snap-center overflow-hidden rounded-2xl shadow-lg"
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(min-width: 1024px) 1152px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <ProjectMeta tech={tech} siteUrl={siteUrl} />
      </div>
    </section>
  );
}
