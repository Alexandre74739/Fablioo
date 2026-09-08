import FloatingBlob from "@/_components/animations/FloatingBlob";
import Reveal from "@/_components/animations/Reveal";
import WaveDivider from "@/_components/animations/WaveDivider";
import PricingCard from "@/_components/ui/cards/PricingCard";

export default function DesignOffers() {
  return (
    <>
      <div
        className="bg-[#f1e9da]"
        style={{ height: 150, marginTop: -150 }}
        aria-hidden="true"
      />
      <section id="design" className="relative overflow-hidden bg-sand/20">
        <div className="relative">
          <FloatingBlob
            src="/shapes/blob-1.svg"
            className="z-10 -left-24 top-12 h-32 w-32 md:h-48 md:w-64"
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
            className="-left-24 top-2/3 h-56 w-56 md:h-80 md:w-80"
            duration={7.5}
            delay={0.3}
            yRange={16}
            rotateRange={6}
          />
          <FloatingBlob
            src="/shapes/blob-1.svg"
            className="hidden sm:block -right-24 bottom-10 h-56 w-72 md:h-72 md:w-96"
            duration={8.5}
            delay={1.2}
            yRange={-14}
            rotateRange={-5}
          />

          <div className="container relative z-10 mx-auto max-w-6xl px-4 pt-16 pb-16 md:px-8 md:pt-24 md:pb-24">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-4xl font-bold text-encre md:text-5xl">
                  Une identité graphique qui vous ressemble
                </h2>
                <p className="mt-4 text-lg text-encre/80 md:text-xl">
                  Des maquettes claires à l'identité visuelle sur mesure, pour
                  poser des bases solides avant de raconter votre histoire.
                </p>
              </div>
            </Reveal>

            <div className="mt-14 flex flex-col gap-6">
              <Reveal delay={0.2}>
                <PricingCard
                  title="Réecriture Visuelle"
                  badge="Maquettes UX/UI"
                  price="350€"
                  note="Base de 4 pages + 50€ / page supplémentaire"
                  features={[
                    "Maquettes Figma du site (desktop + mobile)",
                    "Parcours utilisateur pensé pour convertir",
                    "Validées avec vous avant le développement",
                  ]}
                  ctaLabel="Demander un devis"
                  ctaHref="/contact"
                />
              </Reveal>

              <Reveal delay={0.4}>
                <PricingCard
                  title="Signature Design"
                  badge="Identité graphique"
                  price="450€"
                  features={[
                    "3 propositions de logo",
                    "Déclinaison du logo retenu",
                    "Versions claires, foncées et transparentes",
                    "Mini-charte graphique (couleurs, typographies, usages)",
                  ]}
                  ctaLabel="Demander un devis"
                  ctaHref="/contact"
                  featured
                />
              </Reveal>

              <Reveal delay={0.6}>
                <PricingCard
                  title="Nouveau Chapitre"
                  badge="Maquettes + Identité"
                  price="Sur devis"
                  pricePrefix=""
                  note="Base Formule 1 ou 2 selon technologie"
                  features={[
                    "Reprise d'un site existant : audit express",
                    "Nouvelles maquettes et redesign",
                    "Vitesse et SEO local",
                    "Redirections propres",
                  ]}
                  ctaLabel="Demander un devis"
                  ctaHref="/contact"
                />
              </Reveal>
            </div>
          </div>
        </div>

        <WaveDivider
          src="/shapes/wave-divider-products.svg"
          fillerClassName="bg-[#f7f1e6]"
        />
      </section>
    </>
  );
}
