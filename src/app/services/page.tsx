import type { Metadata } from "next";
import Hero from "@/app/services/_sections/Hero";
import WebOffers from "@/app/services/_sections/WebOffers";
import DesignOffers from "@/app/services/_sections/DesignOffers";
import MaintenanceOffers from "@/app/services/_sections/MaintenanceOffers";

export const metadata: Metadata = {
  title: "Services | Sites web & identité visuelle sur mesure",
  description:
    "Création de sites web sur mesure avec logo, identité visuelle et maintenance : découvrez les services Fablioo pour donner vie à votre histoire, à Saint-Martin-d'Hères et Grenoble.",
  alternates: {
    canonical: "/services",
  },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Création de sites web et identité visuelle",
  provider: {
    "@type": "ProfessionalService",
    "@id": "https://fablioo.com",
    name: "Fablioo",
  },
  areaServed: ["Saint-Martin-d'Hères", "Grenoble", "Isère"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services Fablioo",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Sites web",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Première Trace",
            description: "Site Wordpress sur mesure",
            price: "500",
            priceCurrency: "EUR",
          },
          {
            "@type": "Offer",
            name: "Chemin Tracé",
            description: "Site custom Next.js",
            price: "800",
            priceCurrency: "EUR",
          },
          {
            "@type": "Offer",
            name: "Traces de Meute",
            description: "Site Next.js + CMS",
            price: "1000",
            priceCurrency: "EUR",
          },
          {
            "@type": "Offer",
            name: "Grande Meute",
            description: "Projet sur mesure",
            price: "1500",
            priceCurrency: "EUR",
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Identité visuelle",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Réecriture Visuelle",
            description: "Maquettes UX/UI",
            price: "350",
            priceCurrency: "EUR",
          },
          {
            "@type": "Offer",
            name: "Signature Design",
            description: "Identité graphique",
            price: "450",
            priceCurrency: "EUR",
          },
          {
            "@type": "Offer",
            name: "Nouveau Chapitre",
            description: "Maquettes + identité, sur devis",
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Maintenance",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Petit Futé",
            description: "Suivi technique mensuel",
            price: "30",
            priceCurrency: "EUR",
          },
          {
            "@type": "Offer",
            name: "Grand Malin",
            description: "Suivi et évolutions mensuelles",
            price: "50",
            priceCurrency: "EUR",
          },
          {
            "@type": "Offer",
            name: "Expert perspicace",
            description: "Scalabilité mensuelle",
            price: "60",
            priceCurrency: "EUR",
          },
        ],
      },
    ],
  },
};

export default function Services() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main>
        <Hero
          title="Un accompagnement pensé pour"
          highlight="votre histoire"
          content="Identité visuelle, site web sur mesure et accompagnement continu, à Saint-Martin-d'Hères et Grenoble."
          label="Discuter de mon projet"
          href="/contact"
        />
        <WebOffers />
        <DesignOffers />
        <MaintenanceOffers />
      </main>
    </div>
  );
}
