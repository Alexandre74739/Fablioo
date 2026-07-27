import type { Metadata } from "next";
import LegalLayout from "@/_components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Politique de cookies",
  description:
    "Quels cookies sont utilisés sur fablioo.com et comment les gérer.",
  alternates: {
    canonical: "/cookies",
  },
  robots: {
    index: false,
  },
};

export default function Cookies() {
  return (
    <LegalLayout title="Politique de cookies" updatedAt="27 juillet 2026">
      <h2>Qu'est-ce qu'un cookie ?</h2>
      <p>
        Un cookie est un petit fichier déposé sur votre appareil lors de la
        visite d'un site web. Il permet de conserver des informations
        (préférences, identifiants de session, statistiques de visite) d'une
        page à l'autre ou d'une visite à l'autre.
      </p>

      <h2>Cookies utilisés sur ce site</h2>
      <p>
        fablioo.com n'utilise{" "}
        <strong>
          aucun cookie de mesure d'audience, publicitaire ou de suivi
        </strong>
        . Aucun consentement n'est donc requis pour naviguer sur ce site.
      </p>
      <p>
        Si Fablioo venait à ajouter, à l'avenir, un outil de mesure d'audience
        ou tout autre traceur non essentiel, cette page serait mise à jour et
        votre consentement vous serait demandé au préalable.
      </p>

      <h2>Gérer les cookies dans votre navigateur</h2>
      <p>
        Vous pouvez configurer votre navigateur pour refuser ou supprimer les
        cookies. Ce réglage se trouve généralement dans les paramètres de
        confidentialité de votre navigateur.
      </p>

      <h2>En savoir plus</h2>
      <p>
        Pour plus de détails sur le traitement de vos données personnelles,
        consultez notre{" "}
        <a href="/confidentialite">politique de confidentialité</a>.
      </p>
    </LegalLayout>
  );
}
