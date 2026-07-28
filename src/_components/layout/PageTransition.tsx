"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

type Phase = "idle" | "cover" | "reveal";

const ENTER_DURATION = 0.5;
const EXIT_DURATION = 0.5;
const MIN_COVER_MS = 1000;
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

const HOLE_OPEN = "150%";
const HOLE_CLOSED = "0%";
const HOLE_FEATHER = "8%";

export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("idle");
  const [sessionId, setSessionId] = useState(0);
  const pendingHref = useRef<string | null>(null);
  const coverStartedAt = useRef(0);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement).closest("a");
      if (!anchor || !anchor.href) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }

      event.preventDefault();
      pendingHref.current = `${url.pathname}${url.search}${url.hash}`;
      coverStartedAt.current = Date.now();
      setSessionId((id) => id + 1);
      setPhase("cover");
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Laisse le trou se refermer avant de déclencher réellement la navigation.
  useEffect(() => {
    if (phase !== "cover" || !pendingHref.current) return;
    const target = reduceMotion ? 0 : ENTER_DURATION * 1000;
    const elapsed = Date.now() - coverStartedAt.current;
    const timer = setTimeout(
      () => {
        if (pendingHref.current) router.push(pendingHref.current);
      },
      Math.max(0, target - elapsed),
    );
    return () => clearTimeout(timer);
  }, [phase, router, reduceMotion]);

  // Une fois la nouvelle page montée, on tient l'overlay au moins le temps
  // minimum prévu, puis on rouvre le trou vers l'extérieur. Sans transition
  // CSS (reduceMotion), "--hole" saute directement à sa valeur finale et
  // onTransitionEnd ne se déclenche jamais : on passe directement à idle.
  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    pendingHref.current = null;
    if (phase !== "cover") return;

    if (reduceMotion) {
      const timer = setTimeout(() => setPhase("idle"), 0);
      return () => clearTimeout(timer);
    }

    const elapsed = Date.now() - coverStartedAt.current;
    const wait = Math.max(0, MIN_COVER_MS - elapsed);
    const timer = setTimeout(() => setPhase("reveal"), wait);
    return () => clearTimeout(timer);
  }, [pathname, phase, reduceMotion]);

  const active = phase !== "idle";
  const duration = reduceMotion
    ? 0
    : phase === "cover"
      ? ENTER_DURATION
      : EXIT_DURATION;
  const hole = phase === "cover" ? HOLE_CLOSED : HOLE_OPEN;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-100 bg-prune"
        style={
          {
            "--hole": hole,
            WebkitMaskImage: `radial-gradient(circle at 50% 50%, transparent 0%, transparent calc(var(--hole) - ${HOLE_FEATHER}), black var(--hole))`,
            maskImage: `radial-gradient(circle at 50% 50%, transparent 0%, transparent calc(var(--hole) - ${HOLE_FEATHER}), black var(--hole))`,
            WebkitMaskMode: "alpha",
            maskMode: "alpha",
            transition: reduceMotion ? "none" : `--hole ${duration}s ${EASE}`,
          } as CSSProperties
        }
        onTransitionEnd={(event) => {
          if (event.propertyName === "--hole" && phase === "reveal") {
            setPhase("idle");
          }
        }}
      />

      {active && (
        <div
          key={sessionId}
          className={`fixed inset-0 z-101 flex items-center justify-center ${
            phase === "reveal" ? "pointer-events-none" : ""
          }`}
          role="status"
          aria-live="polite"
        >
          <span className="sr-only">Chargement en cours</span>

          {!reduceMotion && (
            <>
              <motion.span
                aria-hidden="true"
                className="absolute h-20 w-20 rounded-full border-[3px] border-paper sm:h-24 sm:w-24"
                initial={{ scale: 0.3, opacity: 0.9 }}
                animate={{ scale: 5, opacity: 0 }}
                transition={{
                  duration: 0.45,
                  delay: ENTER_DURATION,
                  ease: "easeOut",
                }}
              />
              <motion.span
                aria-hidden="true"
                className="absolute h-20 w-20 rounded-full border-[3px] border-rosewood sm:h-24 sm:w-24"
                initial={{ scale: 0.3, opacity: 0.7 }}
                animate={{ scale: 3.6, opacity: 0 }}
                transition={{
                  duration: 0.4,
                  delay: ENTER_DURATION + 0.1,
                  ease: "easeOut",
                }}
              />
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const dx = Math.round(Math.cos(angle) * 110);
                const dy = Math.round(Math.sin(angle) * 110);
                return (
                  <motion.span
                    key={i}
                    aria-hidden="true"
                    className={`absolute h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3 ${
                      i % 2 === 0 ? "bg-paper" : "bg-sand"
                    }`}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                    animate={{ x: dx, y: dy, opacity: [0, 1, 0], scale: 1 }}
                    transition={{
                      duration: 0.55,
                      delay: ENTER_DURATION + 0.05,
                      ease: "easeOut",
                    }}
                  />
                );
              })}
            </>
          )}

          <motion.svg
            aria-hidden="true"
            width="103"
            height="84"
            viewBox="0 0 103 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-auto drop-shadow-[0_4px_16px_rgba(0,0,0,0.25)] sm:h-20 md:h-24"
            initial={
              reduceMotion ? false : { scale: 1.7, rotate: -12, opacity: 0 }
            }
            animate={
              reduceMotion
                ? undefined
                : phase === "cover"
                  ? { scale: 1, rotate: 0, opacity: 1 }
                  : { scale: 0.75, rotate: 6, opacity: 0 }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : phase === "cover"
                  ? {
                      delay: ENTER_DURATION,
                      type: "spring",
                      stiffness: 380,
                      damping: 16,
                    }
                  : { duration: EXIT_DURATION, ease: "easeIn" }
            }
          >
              <path
                d="M67.8333 2.5C70.9965 2.5 74.5898 3.75878 78.306 6.09277C81.9998 8.41267 85.6548 11.6964 88.8919 15.4844C95.4553 23.1647 99.8607 32.3781 99.8607 39.1113C99.8606 42.321 98.8621 44.5903 97.2728 46.2969C95.6274 48.0635 93.1861 49.3976 90.057 50.3613C83.7395 52.307 75.4823 52.5 67.8333 52.5C54.0262 52.5 42.8333 41.3071 42.8333 27.5C42.8333 13.6929 54.0262 2.5 67.8333 2.5Z"
                fill="#5A3550"
                stroke="#F7F1E6"
                strokeWidth="5"
              />
              <circle cx="67.8333" cy="27.5" r="17.1111" fill="#F7F1E6" />
              <ellipse cx="69.5" cy="28" rx="4.5" ry="6" fill="#5A3550" />
              <path
                d="M34.5278 2.5C31.3646 2.5 27.7714 3.75878 24.0551 6.09277C20.3614 8.41267 16.7063 11.6964 13.4692 15.4844C6.90578 23.1647 2.50043 32.3781 2.50043 39.1113C2.50047 42.321 3.49902 44.5903 5.08832 46.2969C6.73368 48.0635 9.17504 49.3976 12.3041 50.3613C18.6216 52.307 26.8788 52.5 34.5278 52.5C48.3349 52.5 59.5278 41.3071 59.5278 27.5C59.5278 13.6929 48.3349 2.5 34.5278 2.5Z"
                fill="#5A3550"
                stroke="#F7F1E6"
                strokeWidth="5"
              />
              <circle
                cx="17.1111"
                cy="17.1111"
                r="17.1111"
                transform="matrix(-1 0 0 1 51.6389 10.3889)"
                fill="#F7F1E6"
              />
              <ellipse cx="35" cy="28" rx="4" ry="6" fill="#5A3550" />
              <path
                d="M67.7691 43.848C54.4283 38.9455 49.7198 39.7391 42.2656 44.5712C34.8114 49.4033 35.3675 49.6076 36.9545 59.024C38.5415 68.4404 56.6478 70.6774 66.972 70.0547C77.2962 69.432 93.6439 67.868 94.4613 65.6446C95.2786 63.4212 81.1099 48.7504 67.7691 43.848Z"
                fill="#5A3550"
                stroke="#F7F1E6"
                strokeWidth="5"
              />
              <path
                d="M41.5 54C41.5 54 50.9812 58.3657 60.9906 60.4329C71 62.5 87.1109 63.4702 87.1109 63.4702"
                stroke="#F7F1E6"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </motion.svg>
        </div>
      )}
    </>
  );
}
