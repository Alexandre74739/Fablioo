"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import Button from "@/_components/ui/Button";
import LinkedinIcon from "@/_components/icons/LinkedinIcon";
import GithubIcon from "@/_components/icons/GithubIcon";

// Valeur JS (px) équivalente aux breakpoints Tailwind, recalculée au resize car useTransform ne peut pas lire des classes responsive.
function getGrassMaxTranslate(width: number) {
  if (width >= 1280) return 144;
  if (width >= 1024) return 120;
  if (width >= 768) return 80;
  if (width >= 640) return 64;
  return 32;
}

const navLinks = [
  { label: "Récits", href: "/recits" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
  { label: "Cookies", href: "/cookies" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/alexandre74739",
    Icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/Alexandre74739",
    Icon: GithubIcon,
  },
];

function ColumnTitle({ children }: { children: string }) {
  return (
    <span className="mb-3 flex flex-col items-center gap-2 md:items-start">
      <span className="font-heading text-xs font-bold uppercase tracking-widest text-paper">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="h-0.5 w-8 rounded-full bg-paper/25"
      />
    </span>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const grassRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: grassRef,
    offset: ["start end", "end start"],
  });
  const [grassMaxTranslate, setGrassMaxTranslate] = useState(32);
  useEffect(() => {
    const updateGrassMaxTranslate = () =>
      setGrassMaxTranslate(getGrassMaxTranslate(window.innerWidth));
    updateGrassMaxTranslate();
    window.addEventListener("resize", updateGrassMaxTranslate);
    return () => window.removeEventListener("resize", updateGrassMaxTranslate);
  }, []);
  const grassY = useTransform(scrollYProgress, [0, 1], [grassMaxTranslate, 0]);

  return (
    <footer className="relative z-10 mt-auto">
      <motion.div
        ref={grassRef}
        style={{ y: grassY }}
        className="relative -mb-1 aspect-1440/314 w-full"
      >
        <Image
          src="/parallaxe/Grass.svg"
          alt=""
          fill
          className="object-contain"
        />
      </motion.div>

      <div className="relative bg-prune px-6 pt-4 pb-10 md:px-8 md:pb-14">
        <div className="mx-auto flex max-w-6xl flex-col">
          <div className="flex flex-col items-center gap-6 pb-12 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <h2 className="max-w-lg text-3xl font-bold text-paper md:text-4xl">
              Et si on écrivait le prochain chapitre ?
            </h2>
            <Button
              content="Discutons de votre projet"
              href="/contact"
              style="secondary"
            />
          </div>

          <div className="h-px w-full bg-paper/20" />

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-12 text-center md:grid-cols-[1.4fr_1fr_1fr] md:text-left">
            <div className="col-span-2 flex flex-col items-center gap-4 md:col-span-1 md:items-start">
              <Link href="/" className="w-fit">
                <Image
                  src="/logo/logo-icone.svg"
                  alt="Fablioo, retour à l'accueil"
                  width={103}
                  height={84}
                  className="h-16 w-auto"
                />
              </Link>
              <address className="max-w-xs text-sm not-italic leading-relaxed text-paper/80">
                Studio de design & création de sites web sur mesure à
                Saint-Martin-d'Hères et Grenoble.
              </address>
              <div className="mt-1 flex items-center gap-3">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/40 text-paper/80 transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-prune"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <nav className="flex flex-col items-center gap-2.5 md:items-start">
              <ColumnTitle>Naviguer</ColumnTitle>
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="link-underline w-fit text-sm text-paper/80 transition-colors duration-300 hover:text-paper"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <nav className="flex flex-col items-center gap-2.5 md:items-start">
              <ColumnTitle>Informations</ColumnTitle>
              {legalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="link-underline w-fit text-sm text-paper/80 transition-colors duration-300 hover:text-paper"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="h-px w-full bg-paper/20" />

          <p className="pt-8 text-center text-sm text-paper/80">
            © {year} Fablioo — Alexandre-Philippe Perez. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
