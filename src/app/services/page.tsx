import type { Metadata } from "next";
import Hero from "@/app/services/_sections/Hero";

export const metadata: Metadata = {
  title: "Services | Sites web & identité visuelle sur mesure",
  description:
    "Création de sites web sur mesure avec logo, identité visuelle et maintenance : découvrez les services Fablioo pour donner vie à votre histoire, à Saint-Martin-d'Hères et Grenoble.",
};

export default function Services() {
  return (
    <div>
      <main>
        <Hero
          title="Un accompagnement pensé pour"
          highlight="votre histoire"
          content="Identité visuelle, site web sur mesure et accompagnement continu, à Saint-Martin-d'Hères et Grenoble."
          label="Discuter de mon projet"
          href="/contact"
        />
      </main>
    </div>
  );
}
