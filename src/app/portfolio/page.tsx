import type { Metadata } from "next";
import Hero from "@/app/portfolio/_sections/Hero";
import Skills from "@/app/portfolio/_sections/Skills";

export const metadata: Metadata = {
  title: "Portfolio | Sites web réalisés sur mesure",
  description:
    "Portfolio Fablioo : découvrez une sélection de sites web sur mesure réalisés.",
  alternates: {
    canonical: "/portfolio",
  },
};

export default function Portfolio() {
  return (
    <div>
      <main>
        <Hero
          title="Un portfolio de projets"
          highlight=" pensés comme des histoires"
          content="Une sélection de projets pensés pour être vécus, pas seulement vus."
          label="Discuter de votre projet"
          href="/contact"
        />
        <Skills />
      </main>
    </div>
  );
}
