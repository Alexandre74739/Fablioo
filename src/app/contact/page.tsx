import type { Metadata } from "next";
import ContactForm from "@/app/contact/_sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Discutons de votre projet",
  description:
    "Contactez Fablioo pour parler de votre projet de site web ou d'identité visuelle, à Saint-Martin-d'Hères et Grenoble.",
  alternates: {
    canonical: "/contact",
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  mainEntity: {
    "@type": "ProfessionalService",
    "@id": "https://fablioo.com",
    sameAs: [
      "https://github.com/Alexandre74739",
      "https://linkedin.com/in/alexandre74739",
    ],
  },
};

export default function Contact() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main>
        <ContactForm />
      </main>
    </div>
  );
}
