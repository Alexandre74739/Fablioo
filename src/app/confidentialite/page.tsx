import type { Metadata } from "next";
import LegalLayout from "@/_components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment Fablioo collecte, utilise et protège vos données personnelles.",
  alternates: {
    canonical: "/confidentialite",
  },
  robots: {
    index: false,
  },
};

export default function Confidentialite() {
  return (
    <LegalLayout
      title="Politique de confidentialité"
      updatedAt="27 juillet 2026"
    >
      <p>
        Cette politique explique quelles données personnelles sont collectées
        sur fablioo.com, pourquoi, et quels droits vous pouvez exercer,
        conformément au Règlement général sur la protection des données (RGPD)
        et à la loi Informatique et Libertés.
      </p>

      <h2>Responsable de traitement</h2>
      <p>
        Le responsable du traitement des données est Alexandre-Philippe Perez,
        exerçant sous le nom commercial Fablioo, joignable via le{" "}
        <a href="/contact">formulaire de contact</a> ou à l'adresse
        perezalexandre430@gmail.com.
      </p>

      <h2>Données collectées</h2>
      <p>
        Fablioo ne collecte des données personnelles que lorsque vous utilisez
        volontairement le formulaire de contact du site. Les données suivantes
        sont alors traitées :
      </p>
      <ul>
        <li>Prénom et nom</li>
        <li>Adresse e-mail</li>
        <li>Numéro de téléphone (facultatif)</li>
        <li>Contenu de votre message</li>
        <li>Pièces jointes que vous choisissez de transmettre (facultatif)</li>
      </ul>
      <p>
        Des données techniques (adresse IP, journaux de connexion) sont par
        ailleurs générées automatiquement par notre hébergeur à des fins de
        sécurité et de bon fonctionnement du site.
      </p>

      <h2>Finalités et base légale</h2>
      <p>
        Ces données sont utilisées uniquement pour répondre à votre demande de
        contact ou de devis. Le traitement repose sur votre consentement exprès,
        recueilli via la case à cocher du formulaire, ainsi que sur l'intérêt
        légitime de Fablioo à traiter les demandes qui lui sont adressées.
      </p>

      <h2>Destinataires des données</h2>
      <p>
        Vos données sont destinées exclusivement à Fablioo. Elles transitent par
        les prestataires techniques suivants, en tant que sous-traitants :
      </p>
      <ul>
        <li>
          <strong>Resend</strong> : service d'envoi des e-mails générés par le
          formulaire de contact.
        </li>
        <li>
          <strong>Vercel</strong> : hébergement du site et de la base de données
          (Vercel Postgres).
        </li>
      </ul>
      <p>
        Ces prestataires étant basés aux États-Unis, un transfert de données
        hors de l'Union européenne peut avoir lieu. Il est encadré par les
        clauses contractuelles types de la Commission européenne et/ou le Data
        Privacy Framework, lorsqu'applicable. Vos données ne sont ni vendues, ni
        cédées à des tiers à des fins commerciales.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Les données transmises via le formulaire de contact sont conservées le
        temps nécessaire au traitement de votre demande, puis supprimées dans un
        délai maximal de 12 mois en l'absence de suite donnée à l'échange.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d'un droit d'accès, de
        rectification, d'effacement, de limitation, d'opposition et de
        portabilité sur vos données personnelles. Pour exercer ces droits,
        contactez-nous à perezalexandre430@gmail.com ou via le{" "}
        <a href="/contact">formulaire de contact</a>. Nous nous engageons à
        répondre dans un délai d'un mois.
      </p>
      <p>
        Si vous estimez, après nous avoir contactés, que vos droits ne sont pas
        respectés, vous pouvez adresser une réclamation à la Commission
        Nationale de l'Informatique et des Libertés (CNIL) :{" "}
        <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">
          www.cnil.fr
        </a>
        .
      </p>

      <h2>Sécurité</h2>
      <p>
        Le site est servi en HTTPS et hébergé sur une infrastructure sécurisée.
        L'accès aux données transmises via le formulaire de contact est
        restreint à Alexandre-Philippe Perez.
      </p>

      <h2>Cookies</h2>
      <p>
        Le fonctionnement des cookies et traceurs utilisés sur ce site est
        détaillé dans notre <a href="/cookies">politique de cookies</a>.
      </p>

      <h2>Mineurs</h2>
      <p>
        Ce site n'est pas destiné aux personnes de moins de 15 ans. Nous ne
        collectons pas sciemment de données concernant des mineurs sans le
        consentement de leurs représentants légaux.
      </p>

      <h2>Modification de cette politique</h2>
      <p>
        Cette politique de confidentialité peut être mise à jour à tout moment,
        notamment pour refléter une évolution du site ou de la réglementation.
        La date de dernière mise à jour figure en haut de cette page.
      </p>
    </LegalLayout>
  );
}
