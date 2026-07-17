import type { Metadata } from "next";
import Hero from "@/app/sections/Hero";
import About from "@/app/sections/About";
import Products from "@/app/sections/Products";
import Process from "@/app/sections/Process";
import Bandeau from "@/app/sections/Bandeau";
import Faq from "@/app/sections/Faq";

export const metadata: Metadata = {
  title: "Fablioo | Création de site web design à Saint-Martin-d'Hères",
  description:
    "Design & sites web sur mesure, pensés comme un récit, du premier échange jusqu'à la mise en ligne, à Saint-Martin-d'Hères et Grenoble.",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://fablioo.com",
  name: "Fablioo",
  legalName: "Alexandre-Philippe Perez",
  description:
    "Design & sites web sur mesure, pensés comme un récit, du premier échange jusqu'à la mise en ligne, à Saint-Martin-d'Hères et Grenoble.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Saint-Martin-d'Hères",
    addressRegion: "Auvergne-Rhône-Alpes",
    addressCountry: "FR",
  },
  areaServed: ["Saint-Martin-d'Hères", "Grenoble", "Isère"],
};

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
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
