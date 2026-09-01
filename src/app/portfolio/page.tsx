import type { Metadata } from "next";
import Hero from "@/app/portfolio/_sections/hero/Hero";
import ClientProjects from "@/app/portfolio/_sections/ClientProjects";
import Skills from "@/app/portfolio/_sections/Skills";

export const metadata: Metadata = {
  title: "Portfolio | Sites web réalisés sur mesure",
  description:
    "Portfolio Fablioo : découvrez une sélection de projets digitaux réalisés pour des vrais clients.",
  alternates: {
    canonical: "/portfolio",
  },
};

interface PortfolioProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Portfolio({ searchParams }: PortfolioProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  return (
    <div>
      <main>
        <Hero
          title="Un portfolio de projets pensés comme"
          highlight="des histoires"
          content="Une sélection de réalisations pensées pour être vécues, pas seulement vues, du premier échange à la mise en ligne."
          label="Discutons de votre projet"
          href="/contact"
        />
        <Skills />
        <ClientProjects page={page} />
      </main>
    </div>
  );
}
