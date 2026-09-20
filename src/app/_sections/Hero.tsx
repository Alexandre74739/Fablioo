"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Button from "@/_components/ui/Button";
import Reveal from "@/_components/animations/Reveal";
import ChromaKeyVideo from "@/_components/animations/ChromaKeyVideo";
import { useHeroParallax } from "@/hooks/useHeroParallax";

interface HeroProps {
  content: string;
}

export default function Hero({ content }: HeroProps) {
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
            src="/parallaxe/Ciel.svg"
            alt=""
            fill
            preload
            draggable={false}
            className="object-cover object-top"
          />
        </motion.div>

        <motion.div
          style={{ y: decorY }}
          className="pointer-events-none absolute inset-x-0 -top-16 z-10 h-[68%]"
        >
          <Image
            src="/parallaxe/Décor-ciel.svg"
            alt=""
            fill
            preload
            draggable={false}
            className="object-cover object-top"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 md:origin-bottom md:translate-y-[13vh] md:scale-y-[0.85]">
          <motion.div style={{ y: forestY }} className="relative">
            <Image
              src="/parallaxe/Forêt.svg"
              alt=""
              width={1280}
              height={630}
              draggable={false}
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

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-25 bg-[radial-gradient(72%_58%_at_28%_46%,rgba(247,241,230,0.74),rgba(247,241,230,0)_72%)]"
        />

        <div className="absolute inset-0 z-26 flex -translate-y-8 flex-col items-center justify-center gap-6 px-6 text-center xl:translate-y-0">
          <Reveal delay={0.2}>
            <h1 className="max-w-4xl text-3xl text-encre sm:text-4xl md:text-5xl lg:text-6xl">
              Un site web sur mesure qui raconte{" "}
              <span className="font-quote font-semibold italic text-rosewood">
                votre histoire
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="max-w-xl text-base leading-relaxed font-medium text-encre/80 md:text-lg lg:text-xl">
              Fablioo est un studio de design et de création web près de
              Grenoble. On imagine votre identité visuelle et votre site
              vitrine sur mesure, comme on écrirait un récit.
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <Button content={content} href="/services" style="primary" />
              <Button
                content="Feuilleter le portfolio"
                href="/portfolio"
                style="link-base"
              />
            </div>
          </Reveal>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 md:origin-bottom md:translate-y-[13vh] md:scale-y-[0.85]">
          <motion.div style={{ y: stoneY }} className="relative">
            <Image
              src="/parallaxe/Pierre.svg"
              alt=""
              width={1280}
              height={297}
              draggable={false}
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

        <div className="pointer-events-none absolute inset-0 z-20">
          <ChromaKeyVideo
            src="/videos/butterfly.mp4"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
