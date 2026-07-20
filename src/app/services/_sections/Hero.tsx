"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Button from "@/_components/ui/Button";
import Reveal from "@/_components/animations/Reveal";
import ChromaKeyVideo from "@/_components/animations/ChromaKeyVideo";
import { useHeroParallax } from "@/hooks/useHeroParallax";

interface HeroProps {
  title: string;
  highlight: string;
  content: string;
  label: string;
  href: string;
}

export default function Hero({
  title,
  highlight,
  content,
  label,
  href,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const {
    skyY,
    decorY,
    forestY,
    forestMaxTranslate,
    stoneY,
    stoneMaxTranslate,
  } = useHeroParallax(sectionRef);

  return (
    <section ref={sectionRef} className="relative h-[130vh] w-full bg-paper">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ y: skyY }}
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[68%]"
        >
          <Image
            src="parallaxe/Ciel.svg"
            alt=""
            fill
            preload
            className="object-cover object-top"
          />
        </motion.div>

        <motion.div
          style={{ y: decorY }}
          className="pointer-events-none absolute inset-x-0 -top-8 z-10 h-[68%]"
        >
          <Image
            src="parallaxe/Décor-ciel.svg"
            alt=""
            fill
            preload
            className="object-cover object-top"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 md:origin-bottom md:scale-y-[0.85]">
          <motion.div style={{ y: forestY }} className="relative">
            <Image
              src="parallaxe/Forêt.svg"
              alt=""
              width={1280}
              height={630}
              className="h-auto w-full"
            />
            {/* Aplat qui traîne sous Forêt : comble l'espace qu'elle laisse
                en montant, invisible sous l'écran tant qu'elle est au repos. */}
            <div
              className="absolute inset-x-0 bg-[#EBE2CE]"
              style={{
                top: "calc(100% - 2px)",
                height: forestMaxTranslate + 2,
              }}
            />
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-20">
          <ChromaKeyVideo
            src="/videos/butterfly.mp4"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute -mt-8 inset-0 z-35 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <Reveal delay={0}>
            <h1 className="max-w-4xl sm:max-w-lg md:max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              {title}{" "}
              <span className="font-quote font-semibold italic text-rosewood">
                {highlight}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="max-w-xl text-base leading-relaxed font-medium text-encre/80 md:text-lg lg:text-xl">
              {content}
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <Button content={label} href={href} style="primary" />
          </Reveal>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 md:origin-bottom md:scale-y-[0.85]">
          <motion.div style={{ y: stoneY }} className="relative">
            <Image
              src="parallaxe/Grass2.svg"
              alt=""
              width={1280}
              height={297}
              className="h-auto w-full"
            />
            {/* Aplat qui traîne sous Pierre : comble l'espace qu'elle laisse
                en montant, invisible sous l'écran tant qu'elle est au repos. */}
            <div
              className="absolute inset-x-0 bg-prune"
              style={{ top: "calc(100% - 2px)", height: stoneMaxTranslate + 2 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
