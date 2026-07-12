"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/animations/Reveal";
import { useHeroParallax } from "@/hooks/useHeroParallax";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { skyY, decorY, birdX, forestY, stoneY, contentY } =
    useHeroParallax(sectionRef);

  return (
    <section ref={sectionRef} className="relative h-[130vh] w-full bg-paper">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ y: skyY }}
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[68%]"
        >
          <Image
            src="/Ciel.svg"
            alt=""
            fill
            preload
            className="object-cover object-top"
          />
        </motion.div>

        <motion.div
          style={{ y: decorY }}
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[68%]"
        >
          <Image
            src="/Décor-ciel.svg"
            alt=""
            fill
            preload
            className="object-cover object-top"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 md:origin-bottom md:scale-y-[0.85]">
          <motion.div style={{ y: forestY }}>
            <Image
              src="/Forêt.svg"
              alt=""
              width={1280}
              height={630}
              className="h-auto w-full"
            />
          </motion.div>
        </div>

        <motion.div
          style={{ y: contentY }}
          className="absolute inset-0 z-35 flex flex-col items-center justify-center gap-6 px-6 text-center"
        >
          <Reveal delay={0}>
            <div className="flex flex-col items-center">
              <Image
                src="/logo-icone.svg"
                alt=""
                width={103}
                height={84}
                className="h-32 w-auto md:h-40"
              />
              <Image
                src="/logo-ecrit.svg"
                alt="Fablioo"
                width={122}
                height={32}
                className="h-12 w-auto md:h-14"
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="max-w-xl font-quote text-xl italic text-encre md:text-2xl">
              Derrière chaque interface se cache un récit qu'on ne lit pas,
              mais qu'on ressent.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <Button
              content="Découvrir nos tarifs"
              href="/tarifs"
              style="primary"
            />
          </Reveal>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 md:origin-bottom md:scale-y-[0.85]">
          <motion.div style={{ y: stoneY }}>
            <Image
              src="/Pierre.svg"
              alt=""
              width={1280}
              height={297}
              className="h-auto w-full"
            />
          </motion.div>
        </div>

        <motion.div
          style={{ x: birdX }}
          className="pointer-events-none absolute left-[-33%] top-[22%] z-45 w-64 md:left-0 md:w-80"
        >
          <Image
            src="/oiseau 1.svg"
            alt=""
            width={435}
            height={214}
            className="h-auto w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
