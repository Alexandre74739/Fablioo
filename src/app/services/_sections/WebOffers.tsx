"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import FloatingBlob from "@/_components/animations/FloatingBlob";
import PawTrail from "@/_components/animations/PawTrail";
import Reveal from "@/_components/animations/Reveal";
import PricingCard from "@/_components/ui/cards/PricingCard";

export default function WebOffers() {
  const branchesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: branchesRef,
    offset: ["start end", "end start"],
  });
  const branchesMaxTranslate = 40;
  const branchesY = useTransform(
    scrollYProgress,
    [0, 1],
    [branchesMaxTranslate, -branchesMaxTranslate],
  );

  return (
    <section className="relative z-10">
      <div className="relative overflow-hidden bg-prune px-4 pt-16 pb-16 md:px-8 md:pt-24 md:pb-24">
        <FloatingBlob
          src="/shapes/blob-1.svg"
          className="-left-24 top-6 h-32 w-32 md:h-48 md:w-64"
          duration={8}
          yRange={12}
          rotateRange={4}
        />
        <FloatingBlob
          src="/shapes/blob-2.svg"
          className="-left-20 top-8 h-52 w-52 md:h-72 md:w-72"
          duration={9}
          yRange={18}
          rotateRange={6}
        />
        <FloatingBlob
          src="/shapes/blob-1.svg"
          className="-right-24 top-1/3 h-56 w-72 md:h-72 md:w-96"
          duration={7.5}
          delay={0.6}
          yRange={-16}
          rotateRange={-6}
        />
        <FloatingBlob
          src="/shapes/blob-3.svg"
          className="hidden sm:block -left-16 bottom-10 h-56 w-56 md:h-72 md:w-72"
          duration={8.5}
          delay={1.2}
          yRange={14}
          rotateRange={5}
        />

        <div className="pointer-events-none absolute -left-10 top-24 hidden h-140 w-56 opacity-70 lg:block">
          <PawTrail className="h-full w-full" rotate={12} color="#f7f1e6" />
        </div>
        <div className="pointer-events-none absolute -right-10 bottom-10 hidden h-140 w-56 -scale-x-100 opacity-70 lg:block">
          <PawTrail className="h-full w-full" rotate={12} color="#f7f1e6" />
        </div>

        <div className="container relative z-10 mx-auto max-w-6xl">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-bold text-paper md:text-5xl">
                Un site internet à la hauteur de votre histoire
              </h2>
              <p className="mt-4 text-lg text-paper/80 md:text-xl">
                Quatre façons d'écrire votre histoire en ligne, du site clé en
                main au sur-mesure le plus abouti.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 flex flex-col gap-6">
            <Reveal delay={0.2}>
              <PricingCard
                title="Première Trace"
                badge="Site Wordpress"
                price="500€"
                note="Base de 4 pages + 50€ / page supplémentaire"
                features={[
                  "Design personnalisé, pas de template brut",
                  "Version responsive",
                  "Formulaire de contact",
                  "SEO de base",
                  "Formation d'une heure à la mise à jour",
                ]}
                ctaLabel="Demander un devis"
                ctaHref="/contact"
              />
            </Reveal>

            <Reveal delay={0.4}>
              <PricingCard
                title="Chemin Tracé"
                badge="Site custom Next.js"
                price="800€"
                features={[
                  "Site custom Next.js",
                  "Design sur mesure",
                  "Stratégie SEO : structure, performance, référencement local",
                  "Optimisation des performances et de la vitesse",
                ]}
                ctaLabel="Demander un devis"
                ctaHref="/contact"
              />
            </Reveal>

            <Reveal delay={0.4}>
              <PricingCard
                title="Traces de Meute"
                badge="Site Next.js + CMS"
                price="1 000€"
                features={[
                  "Tout Chemin Tracé",
                  "Back-end avec espace d'administration (CMS)",
                  "Vous mettez à jour vos contenus vous-même",
                  "Formation à la prise en main du CMS",
                ]}
                ctaLabel="Demander un devis"
                ctaHref="/contact"
                featured
              />
            </Reveal>

            <Reveal delay={0.6}>
              <PricingCard
                title="Grande Meute"
                badge="Projet sur mesure"
                price="1 500€"
                features={[
                  "Tout Traces de Meute",
                  "Une fonctionnalité avancée au choix : espace membres, inscriptions en ligne, paiement, réservation...",
                  "Accompagnement dédié pour l'intégration de la fonctionnalité",
                  "Suivi prioritaire après la mise en ligne",
                ]}
                ctaLabel="Demander un devis"
                ctaHref="/contact"
              />
            </Reveal>
          </div>
        </div>
      </div>

      <motion.div
        ref={branchesRef}
        style={{ y: branchesY }}
        className="relative -mb-8 aspect-1516/111 w-full md:-mb-6"
        aria-hidden="true"
      >
        <div
          className="absolute inset-x-0 bg-prune"
          style={{
            bottom: "calc(100% - 2px)",
            height: branchesMaxTranslate + 2,
          }}
        />
        <Image
          src="/parallaxe/Branches.svg"
          alt=""
          fill
          className="object-contain"
        />
      </motion.div>
    </section>
  );
}
