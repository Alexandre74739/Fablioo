"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import NavButton from "@/_components/ui/NavButton";

interface LightboxProps {
  images: string[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  alt: string;
}

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
  alt,
}: LightboxProps) {
  const mounted = useMounted();
  const isOpen = index !== null;
  const count = images.length;

  useEffect(() => {
    if (index === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (index === null) return;
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onIndexChange((index - 1 + count) % count);
      if (event.key === "ArrowRight") onIndexChange((index + 1) % count);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, count, onClose, onIndexChange]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-encre/90 px-4 pt-16 pb-24 backdrop-blur-sm sm:px-10"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} – image ${index + 1} sur ${count}`}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-5 right-5 z-10 cursor-pointer text-paper/80 transition-colors hover:text-paper"
          >
            <X className="h-8 w-8" />
          </button>

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative h-full w-full"
          >
            <Image
              src={images[index]}
              alt={alt}
              fill
              sizes="100vw"
              quality={95}
              className="object-contain"
            />
          </motion.div>

          {count > 1 && (
            <div
              className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full bg-paper p-1.5 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <NavButton
                direction="previous"
                onClick={() => onIndexChange((index - 1 + count) % count)}
                label="Voir l'image précédente"
              />
              <span className="min-w-10 text-center text-sm text-encre/70 tabular-nums">
                {index + 1} / {count}
              </span>
              <NavButton
                direction="next"
                onClick={() => onIndexChange((index + 1) % count)}
                label="Voir l'image suivante"
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
