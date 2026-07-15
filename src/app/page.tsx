import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import Process from "@/components/sections/Process";
import Bandeau from "@/components/sections/Bandeau";

export default function Home() {
  return (
    <div>
      <main>
        <Hero
          quote="Derrière chaque interface se cache un récit qu'on ne lit pas, mais qu'on ressent"
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
      </main>
    </div>
  );
}
