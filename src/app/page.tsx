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

export default function Home() {
  return (
    <main>
      <Hero content="Découvrez nos services" />
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
  );
}
