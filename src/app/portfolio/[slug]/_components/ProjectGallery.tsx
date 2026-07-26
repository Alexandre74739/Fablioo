"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/_components/animations/Reveal";

interface ProjectGalleryProps {
  images: string[];
  alt: string;
}

export default function ProjectGallery({ images, alt }: ProjectGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  if (images.length === 0) {
    return null;
  }

  function scroll(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>("[data-gallery-slide]");
    const amount = slide ? slide.offsetWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <Reveal>
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl font-bold">Images du projet</h2>

        {images.length > 1 && (
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Image précédente"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-encre/15 text-encre/70 transition-colors duration-300 hover:bg-sand/30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Image suivante"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-encre/15 text-encre/70 transition-colors duration-300 hover:bg-sand/30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src) => (
          <div
            key={src}
            data-gallery-slide
            className="group relative aspect-video w-[88%] shrink-0 snap-center overflow-hidden rounded-2xl shadow-md sm:w-[75%] md:w-[70%]"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 768px) 70vw, 88vw"
              className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </Reveal>
  );
}
