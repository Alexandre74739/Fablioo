import type { Metadata, Viewport } from "next";
import { Archivo_Black, Inter, Source_Serif_4 } from "next/font/google";
import Header from "@/_components/layout/Header";
import Footer from "@/_components/layout/Footer";
import PageTransition from "@/_components/layout/PageTransition";
import "./globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  style: "italic",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fablioo.com"),
  title: "Fablioo",
  description:
    "Studio de design et de création de sites web sur mesure à Grenoble et Saint-Martin-d'Hères : identité visuelle, site vitrine et développement pensés comme un récit, du premier échange à la mise en ligne.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Fablioo",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  colorScheme: "only light",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://fablioo.com/#website",
  url: "https://fablioo.com",
  name: "Fablioo",
  description:
    "Studio de design et de création de sites web sur mesure à Grenoble et Saint-Martin-d'Hères.",
  inLanguage: "fr-FR",
  publisher: { "@id": "https://fablioo.com/#business" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${archivoBlack.variable} ${sourceSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        {children}
        <Footer />
        <PageTransition />
      </body>
    </html>
  );
}
