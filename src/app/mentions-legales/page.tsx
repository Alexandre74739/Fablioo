import type { Metadata } from "next";
import LegalLayout from "@/_components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Fablioo.",
  alternates: {
    canonical: "/mentions-legales",
  },
  robots: {
    index: false,
  },
};

export default function MentionsLegales() {
  return (
    <LegalLayout title="Mentions légales" updatedAt="27 juillet 2026">
      <h2>Éditeur du site</h2>
      <p>
        Le site <strong>fablioo.com</strong> est édité par Alexandre-Philippe
        Perez, entrepreneur individuel (micro-entreprise), exerçant sous le nom
        commercial <strong>Fablioo</strong>.
      </p>
      <ul>
        <li>SIRET : 98345273100018</li>
        <li>Lieu d'exercice : Saint-Martin-d'Hères / Grenoble, France</li>
        <li>
          Contact : via le <a href="/contact">formulaire de contact</a> ou à
          l'adresse perezalexandre430@gmail.com
        </li>
      </ul>
      <p>Directeur de la publication : Alexandre-Philippe Perez.</p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
        91789, États-Unis. La base de données du site est hébergée par Vercel
        Postgres, fourni par le même hébergeur.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus présents sur ce site (textes, images, logos,
        identité visuelle, structure) est protégé par le droit d'auteur et reste
        la propriété exclusive de Fablioo, sauf mention contraire. Toute
        reproduction, représentation, modification ou exploitation, totale ou
        partielle, sans autorisation préalable écrite, est interdite.
      </p>
      <p>
        Certaines illustrations utilisées sur ce site proviennent de{" "}
        <a href="https://chumbivalley.com/" target="_blank" rel="noreferrer">
          chumbivalley.com
        </a>{" "}
        et restent la propriété de leurs auteurs respectifs.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Fablioo s'efforce d'assurer l'exactitude des informations diffusées sur
        ce site, mais ne peut garantir l'absence d'erreurs ou d'interruptions
        techniques. L'utilisateur reste seul responsable de l'usage qu'il fait
        des informations et contenus disponibles sur le site.
      </p>

      <h2>Liens hypertextes</h2>
      <p>
        Ce site peut contenir des liens vers des sites tiers (par exemple des
        réalisations de clients ou des profils professionnels). Fablioo n'exerce
        aucun contrôle sur ces sites et décline toute responsabilité quant à
        leur contenu.
      </p>

      <h2>Droit applicable</h2>
      <p>
        Les présentes mentions légales sont soumises au droit français. En cas
        de litige et à défaut de résolution amiable, les tribunaux français
        seront seuls compétents.
      </p>

      <p>
        Pour toute question relative à ce site, ses données ou son
        fonctionnement, consultez notre{" "}
        <a href="/confidentialite">politique de confidentialité</a> et notre{" "}
        <a href="/cookies">politique de cookies</a>, ou contactez-nous via le{" "}
        <a href="/contact">formulaire de contact</a>.
      </p>
    </LegalLayout>
  );
}
