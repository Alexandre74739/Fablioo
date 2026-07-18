import type { Metadata, Viewport } from "next";
import { Archivo_Black, Inter, Source_Serif_4 } from "next/font/google";
import Header from "@/_components/layout/Header";
import Footer from "@/_components/layout/Footer";
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
    "Derrière chaque interface se cache un récit qu'on ne lit pas, mais qu'on ressent.",
};

export const viewport: Viewport = {
  colorScheme: "light",
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
