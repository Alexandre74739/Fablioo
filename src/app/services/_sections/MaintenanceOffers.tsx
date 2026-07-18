"use client";

import FloatingBlob from "@/_components/animations/FloatingBlob";
import PawTrail from "@/_components/animations/PawTrail";
import Reveal from "@/_components/animations/Reveal";
import PricingCard from "@/_components/ui/cards/PricingCard";

export default function MaintenanceOffers() {
  return (
    <section className="relative overflow-hidden bg-paper px-4 py-16 md:px-8 md:py-24">
      <FloatingBlob
        src="/shapes/blob-1.svg"
        className="-left-24 top-6 h-32 w-32 md:h-48 md:w-64"
        duration={8}
        yRange={12}
        rotateRange={4}
      />
      <FloatingBlob
        src="/shapes/blob-2.svg"
        className="-right-20 top-8 h-52 w-52 md:h-72 md:w-72"
        duration={9}
        delay={0.6}
        yRange={-18}
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

      <div className="pointer-events-none absolute -right-10 top-24 hidden h-140 w-56 opacity-70 lg:block">
        <PawTrail className="h-full w-full" rotate={180} color="#9e5252" />
      </div>
      <div className="pointer-events-none absolute -left-10 top-1/2 hidden h-140 w-56 -scale-x-100 opacity-70 lg:block">
        <PawTrail className="h-full w-full" rotate={180} color="#9e5252" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-encre md:text-5xl">
              Votre histoire continue de s'écrire, on reste à vos côtés
            </h2>
            <p className="mt-4 text-lg text-encre/80 md:text-xl">
              Trois formules pour garder votre site à jour, sécurisé et
              évolutif, bien après sa mise en ligne.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-6">
          <Reveal delay={0.2}>
            <PricingCard
              title="Petit Futé"
              badge="Suivi technique"
              price="30€"
              pricePrefix=""
              note="par mois"
              features={[
                "Dépannage jusqu'à 1h par mois",
                "Mises à jour techniques mensuelles (Wordpress)",
                "Sauvegardes mensuelles",
                "Surveillance sécurité basique",
                "Assistance basique",
              ]}
              ctaLabel="Demander un devis"
              ctaHref="/contact"
            />
          </Reveal>

          <Reveal delay={0.4}>
            <PricingCard
              title="Grand Malin"
              badge="Suivi + Evolutions"
              price="50€"
              pricePrefix=""
              note="par mois"
              features={[
                "Tout Petit futé",
                "Dépannage jusqu'à 2h par mois",
                "Modifications de contenu basique (texte, images, couleurs)",
                "Sécurité avancée avec audit annuelle",
              ]}
              ctaLabel="Demander un devis"
              ctaHref="/contact"
              featured
            />
          </Reveal>

          <Reveal delay={0.4}>
            <PricingCard
              title="Expert perspicace"
              badge="Scalabilité"
              price="60€"
              pricePrefix=""
              note="par mois"
              features={[
                "Tout Grand Malin",
                "Petites évolutions sur demande",
                "Sécurité avancée avec audit semestriel",
              ]}
              ctaLabel="Demander un devis"
              ctaHref="/contact"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
