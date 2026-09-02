import type { Metadata } from "next";
import Hero from "@/app/_sections/Hero";
import About from "@/app/_sections/About";
import Products from "@/app/_sections/Products";
import Process from "@/app/_sections/Process";
import Bandeau from "@/app/_sections/Bandeau";
import Faq from "@/app/_sections/Faq";

export const metadata: Metadata = {
  title: "Fablioo",
  description:
    "Studio de design et de création de sites web sur mesure à Grenoble et Saint-Martin-d'Hères : identité visuelle, site vitrine et développement pensés comme un récit, du premier échange à la mise en ligne.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Fablioo",
    title: "Fablioo | Sites web qui racontent votre histoire",
    description:
      "Design & création de sites web sur mesure à Grenoble, pensés comme un récit.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fablioo | Sites web qui racontent votre histoire",
    description:
      "Design & création de sites web sur mesure à Grenoble, pensés comme un récit.",
  },
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://fablioo.com/#business",
      name: "Fablioo",
      legalName: "Alexandre-Philippe Perez",
      url: "https://fablioo.com",
      image: "https://fablioo.com/logo/logo.png",
      logo: "https://fablioo.com/logo/logo.png",
      email: "perezalexandre430@gmail.com",
      priceRange: "€",
      description:
        "Studio de design et de création de sites web sur mesure à Grenoble et Saint-Martin-d'Hères : identité visuelle, site vitrine et développement pensés comme un récit, du premier échange à la mise en ligne.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Saint-Martin-d'Hères",
        addressRegion: "Auvergne-Rhône-Alpes",
        postalCode: "38400",
        addressCountry: "FR",
      },
      knowsLanguage: "fr-FR",
      sameAs: [
        "https://github.com/Alexandre74739",
        "https://linkedin.com/in/alexandre74739",
      ],
      founder: { "@id": "https://fablioo.com/#founder" },
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@id": "https://fablioo.com/#service-identite" } },
        { "@type": "Offer", itemOffered: { "@id": "https://fablioo.com/#service-site" } },
        { "@type": "Offer", itemOffered: { "@id": "https://fablioo.com/#service-maintenance" } },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://fablioo.com/#founder",
      name: "Alexandre-Philippe Perez",
      jobTitle: "Designer & développeur web",
      worksFor: { "@id": "https://fablioo.com/#business" },
      sameAs: [
        "https://github.com/Alexandre74739",
        "https://linkedin.com/in/alexandre74739",
      ],
    },
    {
      "@type": "Service",
      "@id": "https://fablioo.com/#service-identite",
      name: "Logo et identité graphique",
      serviceType: "Création d'identité visuelle",
      provider: { "@id": "https://fablioo.com/#business" },
      areaServed: { "@type": "AdministrativeArea", name: "Isère" },
      description:
        "Création d'une identité de marque claire, cohérente et mémorable : logo, palette, typographies et direction artistique.",
    },
    {
      "@type": "Service",
      "@id": "https://fablioo.com/#service-site",
      name: "Création de site web sur mesure",
      serviceType: "Conception et développement de site web",
      provider: { "@id": "https://fablioo.com/#business" },
      areaServed: { "@type": "AdministrativeArea", name: "Isère" },
      description:
        "Conception et développement d'un site vitrine sur mesure, fluide et élégant, pensé pour raconter votre histoire et faire grandir votre activité.",
    },
    {
      "@type": "Service",
      "@id": "https://fablioo.com/#service-maintenance",
      name: "Maintenance et sécurité de site web",
      serviceType: "Maintenance web",
      provider: { "@id": "https://fablioo.com/#business" },
      areaServed: { "@type": "AdministrativeArea", name: "Isère" },
      description:
        "Mises à jour, surveillance et assistance continue pour un site fiable, rapide et protégé au fil du temps.",
    },
  ],
};

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main>
        <Hero
          quote="Derrière chaque histoire il devrait y avoir un site internet qui la raconte"
          content="Découvrez nos services"
        />
        <About />
        <Products />
        <Process />
        <Bandeau
          title="Un projet à réaliser ?"
          description="Dites-moi ce que vous avez en tête : je vous prépare une solution sur mesure, conçue pour vous simplifier la vie."
          label="Je passe à l'action "
          href="/contact"
        />
        <Faq />
      </main>
    </div>
  );
}
