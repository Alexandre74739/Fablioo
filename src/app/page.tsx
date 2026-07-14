import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import Process from "@/components/sections/Process";

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
      </main>
    </div>
  );
}
