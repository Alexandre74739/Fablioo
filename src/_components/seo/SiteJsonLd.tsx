const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://fablioo.com/#website",
      url: "https://fablioo.com",
      name: "Fablioo",
      description:
        "Studio de design et de création de sites web sur mesure à Grenoble et Saint-Martin-d'Hères.",
      inLanguage: "fr-FR",
      publisher: { "@id": "https://fablioo.com/#business" },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://fablioo.com/#business",
      name: "Fablioo",
      legalName: "Alexandre-Philippe Perez",
      url: "https://fablioo.com",
      image: "https://fablioo.com/logo/logo.png",
      logo: "https://fablioo.com/logo/logo.png",
      email: "perezalexandre430@gmail.com",
      telephone: "+33630754686",
      priceRange: "€",
      description:
        "Studio de design et de création de sites web sur mesure à Grenoble et Saint-Martin-d'Hères : identité visuelle, site vitrine et développement pensés comme un récit, du premier échange à la mise en ligne.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Terrasse Jean Renaudie",
        addressLocality: "Saint-Martin-d'Hères",
        addressRegion: "Auvergne-Rhône-Alpes",
        postalCode: "38400",
        addressCountry: "FR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 45.16957757733298,
        longitude: 5.755879418903732,
      },
      areaServed: [
        { "@type": "City", name: "Saint-Martin-d'Hères" },
        { "@type": "City", name: "Grenoble" },
        { "@type": "AdministrativeArea", name: "Isère" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "18:00",
          closes: "19:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday", "Sunday"],
          opens: "09:00",
          closes: "19:00",
        },
      ],
      knowsLanguage: "fr-FR",
      sameAs: [
        "https://github.com/Alexandre74739",
        "https://www.linkedin.com/in/alexandre74739",
      ],
      founder: { "@id": "https://fablioo.com/#founder" },
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@id": "https://fablioo.com/#service-identite" } },
        { "@type": "Offer", itemOffered: { "@id": "https://fablioo.com/#service-site" } },
        { "@type": "Offer", itemOffered: { "@id": "https://fablioo.com/#service-maintenance" } },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://fablioo.com/#founder",
      name: "Alexandre-Philippe Perez",
      jobTitle: "Designer & développeur web",
      worksFor: { "@id": "https://fablioo.com/#business" },
      sameAs: [
        "https://github.com/Alexandre74739",
        "https://www.linkedin.com/in/alexandre74739",
      ],
    },
    {
      "@type": "Service",
      "@id": "https://fablioo.com/#service-identite",
      name: "Logo et identité graphique",
      serviceType: "Création d'identité visuelle",
      provider: { "@id": "https://fablioo.com/#business" },
      areaServed: { "@type": "AdministrativeArea", name: "Isère" },
      description:
        "Création d'une identité de marque claire, cohérente et mémorable : logo, palette, typographies et direction artistique.",
    },
    {
      "@type": "Service",
      "@id": "https://fablioo.com/#service-site",
      name: "Création de site web sur mesure",
      serviceType: "Conception et développement de site web",
      provider: { "@id": "https://fablioo.com/#business" },
      areaServed: { "@type": "AdministrativeArea", name: "Isère" },
      description:
        "Conception et développement d'un site vitrine sur mesure, fluide et élégant, pensé pour raconter votre histoire et faire grandir votre activité.",
    },
    {
      "@type": "Service",
      "@id": "https://fablioo.com/#service-maintenance",
      name: "Maintenance et sécurité de site web",
      serviceType: "Maintenance web",
      provider: { "@id": "https://fablioo.com/#business" },
      areaServed: { "@type": "AdministrativeArea", name: "Isère" },
      description:
        "Mises à jour, surveillance et assistance continue pour un site fiable, rapide et protégé au fil du temps.",
    },
  ],
};

export default function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(siteJsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
