"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Hero from "./Hero";
import ShaderWaves from "@/_components/animations/ShaderWaves";

const PRUNE: [number, number, number] = [0.353, 0.208, 0.314];
const PAPER: [number, number, number] = [0.969, 0.945, 0.902];
const PAPER_DIM: [number, number, number] = [0.78, 0.72, 0.74];

interface HeroZoomProps {
  title: string;
  highlight: string;
  content: string;
  quote1: string;
  quote2: string;
}

const SIGNATURE_VIEWBOX = "0 0 2396 1400";
const SIGNATURE_PATH =
  "M1009.63 390.988C1121.65 759.698 1138.7 1019.41 1145.71 1234.15C1152.71 1448.9 1133.07 1437.35 1081.64 1167.63C1030.21 897.912 968.826 407.385 1009.63 390.988ZM1009.63 390.988C1112.93 333.431 1531.73 321.449 1661.04 510.773C1790.36 700.096 1346.17 1032.06 566.606 1072.83C-85.7062 1069.82 238.624 718.397 868.68 300.892C1498.74 -116.613 2162.4 19.0158 1973.68 122.565C1754.12 243.04 75.8916 1483.67 17.0609 1339.43C-41.7698 1195.2 2379.03 210.878 2379.03 210.878";
const LABEL_TEXT = "Signé, Alexandre";

// useMotionValueEvent("change", ...) ne se déclenche que sur une variation
// après montage : si le composant remonte (Fast Refresh, navigation) alors
// que la page est déjà scrollée, la valeur courante n'est jamais reçue et
// le style reste bloqué à son état initial. On resynchronise donc aussi
// une fois au montage via `.get()`.
function useSyncedMotionValue(
  value: MotionValue<number>,
  apply: (v: number) => void,
) {
  useEffect(() => {
    apply(value.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useMotionValueEvent(value, "change", apply);
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

interface MarqueeProps {
  text: string;
  reverse?: boolean;
  duration?: number;
  className?: string;
}

function Marquee({ text, reverse, duration = 30, className }: MarqueeProps) {
  return (
    <div className="w-full overflow-hidden pb-3 whitespace-nowrap">
      <motion.div
        className="flex w-max shrink-0"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className={`pr-4 font-quote text-4xl italic md:text-7xl lg:text-8xl ${className ?? ""}`}
          >
            "{text}"
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function HeroZoom({
  title,
  highlight,
  content,
  quote1,
  quote2,
}: HeroZoomProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const signatureRef = useRef<SVGSVGElement>(null);
  const labelAnchorRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // L'animation se termine à 0.6 ; le reste sert de marge de "tenue" avant
  // de débloquer le scroll vers le bas. Sur mobile, la carte finit plus
  // large mais moins haute une fois floutée.
  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.6],
    [1, isMobile ? 0.58 : 0.33],
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.6],
    [1, isMobile ? 0.32 : 0.44],
  );
  // Le décalage vers le bas (md+) doit lui aussi suivre le scroll : sinon,
  // constant dès le départ, il laisse un espace vide en haut de l'écran
  // avant même que la carte ait commencé à rétrécir.
  const cardY = useTransform(scrollYProgress, [0, 0.6], [0, isMobile ? 0 : 48]);
  const radius = useTransform(scrollYProgress, [0, 0.6], [0, 6]);
  const fadeProgress = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  // Démarre une fois la carte déjà bien rétrécie (au-delà de 0.4, elle est
  // sous les 60% de sa hauteur initiale) pour ne jamais chevaucher le label.
  const labelProgress = useTransform(scrollYProgress, [0.42, 0.58], [0, 1]);
  const signatureProgress = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  useSyncedMotionValue(fadeProgress, (v) => {
    if (fadeRef.current) {
      fadeRef.current.style.filter = `grayscale(${v}) blur(${v * 14}px)`;
    }
  });
  // La carte rétrécit depuis son centre (origin-center) : son bord haut se
  // trouve à (1 - scaleY) / 2 de la hauteur du viewport, une valeur qui
  // dépend de scaleY (donc du device, mobile/desktop) et évolue avec le
  // scroll. Un décalage fixe en pixels ne peut donc jamais être juste sur
  // toutes les tailles d'écran : on ancre le label à une marge constante
  // au-dessus de ce bord, recalculée à chaque changement de scaleY.
  const LABEL_GAP_PX = 28;
  useSyncedMotionValue(scaleY, (v) => {
    if (labelAnchorRef.current) {
      const cardTopPercent = ((1 - v) / 2) * 100;
      const cardYOffset = isMobile ? 0 : 48;
      labelAnchorRef.current.style.top = `calc(${cardTopPercent}% + ${cardYOffset}px - ${LABEL_GAP_PX}px)`;
    }
  });
  // Chaque lettre a sa propre fenêtre de progression, décalée dans la
  // fenêtre globale de labelProgress, pour un effet cascade. La fenêtre de
  // la dernière lettre doit finir exactement à v=1, sinon elle ne termine
  // jamais son entrée (reste légèrement translucide/décalée pour toujours).
  useSyncedMotionValue(labelProgress, (v) => {
    const n = letterRefs.current.length;
    const windowWidth = 0.3;
    const step = n > 1 ? (1 - windowWidth) / (n - 1) : 0;
    letterRefs.current.forEach((el, i) => {
      if (!el) return;
      const start = i * step;
      const end = start + windowWidth;
      const t = Math.min(Math.max((v - start) / (end - start), 0), 1);
      el.style.opacity = String(t);
      const rise = (1 - t) * 28;
      const tilt = (1 - t) * (i % 2 === 0 ? 10 : -10);
      el.style.transform = `translateY(${rise}px) rotate(${tilt}deg)`;
    });
  });
  // Un stroke-linecap rond laisse un point visible au tout début du tracé
  // même à pathLength=0 ; on masque donc le SVG tant que rien n'est dessiné.
  useSyncedMotionValue(signatureProgress, (v) => {
    if (signatureRef.current) signatureRef.current.style.opacity = String(v);
  });

  return (
    <section ref={sectionRef} className="relative h-[280vh] w-full bg-prune">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-prune">
          <ShaderWaves
            className="absolute inset-0 h-full w-full"
            background={PRUNE}
            lineNear={PAPER}
            lineFar={PAPER_DIM}
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-prune" />

          <div className="absolute inset-x-0 top-[74%] -translate-y-full md:top-[calc(50%+3rem)]">
            <Marquee text={quote1} duration={26} className="text-paper" />
          </div>
          <div className="absolute inset-x-0 top-[74%] md:top-[calc(50%+3rem)]">
            <Marquee
              text={quote2}
              reverse
              duration={32}
              className="text-paper/60"
            />
          </div>
        </div>

        {/* Un seul bloc englobant le label et la carte. Le label reste en
            position absolue (retardé via labelProgress pour ne jamais
            chevaucher la carte) ; la carte n'a pas besoin d'être en absolute :
            le scaleX/scaleY la redimensionne visuellement quelle que soit sa
            position, donc un simple h-full w-full suffit. */}
        <div className="absolute inset-0 z-20">
          <div
            ref={labelAnchorRef}
            style={{ transform: "translateY(-100%)" }}
            className="pointer-events-none absolute inset-x-0 z-20 flex justify-center"
          >
            <p className="font-quote text-2xl text-paper/80 italic md:text-3xl lg:mb-6 xl:mb-10">
              {LABEL_TEXT.split("").map((char, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    letterRefs.current[i] = el;
                  }}
                  style={{ display: "inline-block", opacity: 0 }}
                >
                  {char === " " ? " " : char}
                </span>
              ))}
            </p>
          </div>

          <motion.div
            style={{ scaleX, scaleY, y: cardY }}
            className="pointer-events-auto relative z-10 h-full w-full origin-center"
          >
            <motion.div
              style={{ borderRadius: radius }}
              className="relative h-full w-full overflow-hidden shadow-2xl"
            >
              <div ref={fadeRef} className="h-full w-full">
                <Hero title={title} highlight={highlight} content={content} />
              </div>
            </motion.div>

            {/* Hors du conteneur overflow-hidden pour pouvoir déborder. */}
            <svg
              ref={signatureRef}
              style={{ opacity: 0, overflow: "visible" }}
              viewBox={SIGNATURE_VIEWBOX}
              preserveAspectRatio="xMidYMid meet"
              className="pointer-events-none absolute top-1/2 left-1/2 z-20 h-[132%] w-[132%] -translate-x-1/2 -translate-y-1/2 md:h-[120%] md:w-[120%]"
            >
              <motion.path
                d={SIGNATURE_PATH}
                stroke="#9E5252"
                strokeWidth={52}
                strokeLinecap="round"
                fill="none"
                style={{ pathLength: signatureProgress }}
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
