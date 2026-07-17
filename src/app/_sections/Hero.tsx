"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Button from "@/_components/ui/Button";
import Reveal from "@/_components/animations/Reveal";
import { useHeroParallax } from "@/hooks/useHeroParallax";

interface HeroProps {
  quote: string;
  content: string;
}

export default function Hero({ quote, content }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const {
    skyY,
    decorY,
    birdX,
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
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[68%]"
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

        <div className="absolute inset-0 z-35 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <Reveal delay={0}>
            <div className="flex flex-col items-center">
              <Image
                src="logo/logo-icone.svg"
                alt=""
                width={103}
                height={84}
                className="h-32 w-auto md:h-40"
              />
              <Image
                src="logo/logo-ecrit.svg"
                alt="Fablioo"
                width={122}
                height={32}
                className="h-12 w-auto md:h-14"
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="max-w-xl font-quote! text-xl italic text-prune md:text-2xl">
              "{quote}"
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
            <Button content={content} href="/services" style="primary" />
          </Reveal>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 md:origin-bottom md:scale-y-[0.85]">
          <motion.div style={{ y: stoneY }} className="relative">
            <Image
              src="parallaxe/Pierre.svg"
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

        <motion.div
          style={{ x: birdX }}
          className="pointer-events-none absolute left-[-35%] top-[22%] z-45 w-64 md:left-0 md:w-80"
        >
          <Image
            src="parallaxe/oiseau 1.svg"
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
