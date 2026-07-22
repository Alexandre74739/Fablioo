import HeroZoom from "@/app/recits/_sections/HeroZoom/HeroZoomSection";
import Chapter from "@/app/recits/_sections/Chapter";
import PawTrail from "@/_components/animations/PawTrail";

const PAW_DURATION = 6;
const PAW_STEP = PAW_DURATION / 6;

export default function Recits() {
  return (
    <div>
      <main>
        <HeroZoom
          title="Le récit derrière l'histoire de "
          highlight="Fablioo"
          content="A la manière d'un récit, Fablioo se raconte : inspirations, coulisses et étapes clés, venez vite découvrir cette histoire."
          quote1="La morale nue apporte de l'ennui ; le conte fait passer le précepte avec lui"
          quote2="Il faut instruire et divertir pour faire passer le message"
        />
        <Chapter
          number="I"
          title="Le point de départ"
          paragraphs={[
            "Derrière la création d'un site internet ou une identité de marque, il y a une idée : la vôtre. Une idée singulière, portée par votre vision et votre ambition, qui a grandi jusqu'à devenir une évidence qui ne demande qu'à prendre vie.",
            "Vous n'êtes pas un client parmi d'autres. Dans ce récit, c'est vous le héros : je suis la personne qui vous accompagne, de la définition de votre idée jusqu'à sa concrétisation.",
          ]}
          illustration={
            <PawTrail
              className="h-full w-72 md:w-80"
              rotate={-6}
              pawDuration={PAW_DURATION}
              step={PAW_STEP}
            />
          }
          illustrationPosition="right"
          hideIllustrationOnMobile
        />
      </main>
    </div>
  );
}
