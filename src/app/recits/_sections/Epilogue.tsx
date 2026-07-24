"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/_components/animations/Reveal";
import FloatingBlob from "@/_components/animations/FloatingBlob";
import Button from "@/_components/ui/Button";

const SIGNATURE_PATH =
  "M1009.63 390.988C1121.65 759.698 1138.7 1019.41 1145.71 1234.15C1152.71 1448.9 1133.07 1437.35 1081.64 1167.63C1030.21 897.912 968.826 407.385 1009.63 390.988ZM1009.63 390.988C1112.93 333.431 1531.73 321.449 1661.04 510.773C1790.36 700.096 1346.17 1032.06 566.606 1072.83C-85.7062 1069.82 238.624 718.397 868.68 300.892C1498.74 -116.613 2162.4 19.0158 1973.68 122.565C1754.12 243.04 75.8916 1483.67 17.0609 1339.43C-41.7698 1195.2 2379.03 210.878 2379.03 210.878";

function SignatureDraw({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 2396 1400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        d={SIGNATURE_PATH}
        stroke="currentColor"
        strokeWidth="32"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 3, ease: "easeInOut", delay: 0.2 }}
      />
    </svg>
  );
}

export default function Epilogue() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ravenX = useTransform(scrollYProgress, [0, 1], [50, -90]);
  const foxX = useTransform(scrollYProgress, [0, 1], [-90, 50]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-paper px-6 py-24"
    >
      <motion.div
        style={{ x: ravenX }}
        className="hidden md:block pointer-events-none absolute z-0 -right-20 top-6 h-64 w-64 lg:-right-32 lg:top-10 lg:h-88 lg:w-88"
        aria-hidden="true"
      >
        <Image
          src="/illustrations/raven.svg"
          alt=""
          fill
          className="object-contain"
        />
      </motion.div>
      <motion.div
        style={{ x: foxX }}
        className="hidden md:block pointer-events-none absolute z-0 -left-20 bottom-6 h-64 w-64 lg:-left-32 lg:bottom-10 lg:h-88 lg:w-88"
        aria-hidden="true"
      >
        <Image
          src="/illustrations/fox.svg"
          alt=""
          fill
          className="object-contain"
        />
      </motion.div>

      <FloatingBlob
        src="/shapes/blob-1.svg"
        className="-left-24 top-16 h-44 w-64 md:h-56 md:w-80"
        duration={9}
        yRange={20}
        rotateRange={6}
      />
      <FloatingBlob
        src="/shapes/blob-2.svg"
        className="-right-16 bottom-20 h-64 w-40 md:h-80 md:w-52"
        duration={8}
        delay={1}
        yRange={18}
        rotateRange={-8}
      />
      <FloatingBlob
        src="/shapes/blob-3.svg"
        className="md:hidden -left-16 bottom-8 h-52 w-52"
        duration={7}
        delay={0.5}
        yRange={14}
        rotateRange={5}
      />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
        <Reveal delay={0}>
          <span className="block text-xs font-bold tracking-widest text-rosewood uppercase md:text-lg">
            Épilogue
          </span>
          <span
            aria-hidden="true"
            className="relative mx-auto mt-2 block h-0.5 w-10 rounded-full bg-rosewood/30 md:mt-3 md:w-14"
          />
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-col items-center gap-4">
            <h2 className="max-w-xl text-3xl font-extrabold text-encre md:text-5xl">
              Et si la suite s'écrivait avec vous ?
            </h2>
            <p className="max-w-lg font-quote text-lg italic text-prune md:text-xl">
              Une histoire ne s'arrête jamais vraiment au mot « fin ».
            </p>
            <p className="max-w-md text-base leading-relaxed text-encre/80 md:text-lg">
              Elle attend simplement que quelqu'un tourne la page suivante.
              Peut-être la vôtre ?
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button
              content="Découvrir mes services"
              href="/services"
              style="primary"
            />
            <Button
              content="Feuilleter le portfolio"
              href="/portfolio"
              style="link-base"
            />
          </div>
        </Reveal>

        <Reveal delay={0.6} className="flex flex-col items-center gap-2">
          <SignatureDraw className="h-12 w-auto text-rosewood md:h-16" />
          <span className="font-quote text-sm italic text-encre/60 md:text-base">
            Merci d'avoir tout lu
          </span>
          <span className="text-sm font-bold tracking-wide text-prune md:text-base">
            Alexandre, fondateur de Fablioo
          </span>
        </Reveal>
      </div>
    </section>
  );
}
