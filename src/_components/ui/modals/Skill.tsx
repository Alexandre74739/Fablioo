"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useDragControls } from "motion/react";
import { X } from "lucide-react";
import type { Skill } from "@/_components/ui/cards/SkillCard";

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: Skill | null;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function SkillModal({
  isOpen,
  onClose,
  skill,
}: SkillModalProps) {
  const isMobile = useIsMobile();
  const dragControls = useDragControls();
  const mounted = useMounted();

  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.left = previous.left;
      body.style.right = previous.right;
      body.style.overflow = previous.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && skill && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-encre/50 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={
              isMobile
                ? { opacity: 0, y: "100%" }
                : { opacity: 0, scale: 0.9, y: 20 }
            }
            animate={
              isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              isMobile
                ? { opacity: 0, y: "100%" }
                : { opacity: 0, scale: 0.9, y: 20 }
            }
            transition={{ duration: 0.3, ease: "easeOut" }}
            drag={isMobile ? "y" : false}
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (isMobile && (info.offset.y > 100 || info.velocity.y > 500)) {
                onClose();
              }
            }}
            className="relative flex max-h-[75vh] w-full flex-col overflow-hidden rounded-t-3xl bg-paper shadow-xl sm:max-w-lg sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 opacity-70">
              <Image src="/shapes/blob-4.svg" alt="" fill />
            </div>
            <div className="pointer-events-none absolute -bottom-28 -left-28 h-64 w-64 opacity-70">
              <Image src="/shapes/blob-3.svg" alt="" fill />
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="absolute top-5 right-5 z-10 text-encre/60 transition-colors hover:text-rosewood"
            >
              <X className="h-6 w-6 cursor-pointer" />
            </button>

            <div
              onPointerDown={(e) => isMobile && dragControls.start(e)}
              className="relative shrink-0 touch-none px-8 pt-8 text-center select-none sm:touch-auto sm:px-10 sm:pt-10 sm:select-auto"
            >
              <div className="mx-auto mb-2 h-1.5 w-12 cursor-grab rounded-full bg-sand active:cursor-grabbing sm:hidden" />
              <div className="relative mx-auto h-14 w-14">
                <Image
                  src={`/logos/${skill.id}.svg`}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="mt-4 text-3xl font-bold text-encre">
                {skill.label}
              </h3>
            </div>

            <div className="relative min-h-0 flex-1 overflow-y-auto px-8 sm:px-10">
              <div className="mt-4 flex flex-col gap-4">
                {skill.details.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-encre/80">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="relative flex shrink-0 items-center justify-center gap-2 border-t border-sand/60 px-8 py-6 sm:px-10">
              <Image
                src="/logo/logo-ecrit.svg"
                alt="Fablioo"
                width={122}
                height={32}
                className="h-6 w-auto"
              />
              <Image
                src="/logo/logo-icone.svg"
                alt=""
                width={103}
                height={84}
                className="mt-1.5 h-8 w-auto"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
