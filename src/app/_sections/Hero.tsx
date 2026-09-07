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
            className="object-cover object-top"
          />
        </motion.div>

        <motion.div
          style={{ y: decorY }}
          className="pointer-events-none absolute inset-x-0 -top-10 z-10 h-[68%] translate-x-[6%] md:top-0 md:translate-x-[8%]"
        >
          <Image
            src="/parallaxe/Décor-ciel.svg"
            alt=""
            fill
            preload
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
          className="pointer-events-none absolute inset-0 z-34 bg-[radial-gradient(72%_58%_at_28%_46%,rgba(247,241,230,0.74),rgba(247,241,230,0)_72%)]"
        />

        <div className="absolute inset-0 z-35 flex -translate-y-8 items-center xl:translate-y-0">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-6 py-16 text-center md:items-start md:px-10 md:py-24 md:text-left lg:flex-row lg:items-center lg:gap-16 lg:py-0">
            <Reveal delay={0.2} className="hidden shrink-0 lg:order-2 lg:block">
              <Image
                src="/logo/logo-icone.svg"
                alt=""
                width={103}
                height={84}
                className="h-40 w-auto lg:h-44 xl:h-52"
              />
            </Reveal>

            <div className="max-w-3xl lg:order-1">

              <Reveal delay={0.2}>
                <h1 className="text-3xl text-encre sm:text-4xl md:text-5xl lg:text-6xl">
                  Un site web sur mesure qui raconte{" "}
                  <span className="font-quote! font-semibold italic text-rosewood">
                    votre histoire
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.4}>
                <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed font-medium text-encre/80 md:mx-0 md:mt-7 md:text-lg lg:mt-6 xl:text-xl">
                  Fablioo est un studio de design et de création web près de
                  Grenoble. On imagine votre identité visuelle et votre site
                  vitrine sur mesure, comme on écrirait un récit.
                </p>
              </Reveal>

              <Reveal delay={0.6}>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:mt-8 md:justify-start lg:mt-7 xl:mt-9">
                  <Button content={content} href="/services" style="primary" />
                  <Button
                    content="Feuilleter le portfolio"
                    href="/portfolio"
                    style="link-base"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 md:origin-bottom md:translate-y-[13vh] md:scale-y-[0.85]">
          <motion.div style={{ y: stoneY }} className="relative">
            <Image
              src="/parallaxe/Pierre.svg"
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
