"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import Button from "@/components/ui/Button";

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
];

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
  { label: "Politique de cookies", href: "/cookies" },
];

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

      <div className="relative bg-prune px-6 pt-2 pb-10 md:px-8 md:pb-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <Link href="/">
              <Image
                src="/logo/logo-icone.svg"
                alt="Fablioo"
                width={103}
                height={84}
                className="h-24 w-auto"
              />
            </Link>

            <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="link-underline text-base font-semibold text-paper transition-colors hover:text-sand"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Button
              content="Discutons de votre projet"
              href="/contact"
              style="secondary"
            />
          </div>

          <div className="h-px w-full bg-paper/15" />

          <div className="flex flex-col-reverse items-center text-center gap-4 text-sm text-paper/80 md:flex-row md:justify-between">
            <p>
              © {year} Fablioo — Alexandre-Philippe Perez. Tous droits réservés.
            </p>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {legalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="link-underline transition-colors hover:text-paper"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
