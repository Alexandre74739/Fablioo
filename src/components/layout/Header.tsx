"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Récits", href: "/recits" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4">
      <div
        className={`mx-auto w-full max-w-7xl transition-[margin,border-radius,box-shadow] duration-500 ease-out ${
          scrolled
            ? "mt-4 rounded-3xl bg-paper shadow-[0_8px_30px_-8px_rgba(36,29,26,0.35)]"
            : "mt-0 rounded-none bg-transparent shadow-none"
        }`}
      >
        <div className="flex h-20 items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="logo/logo-ecrit.svg"
              alt="Fablioo"
              width={122}
              height={32}
              className="h-8 w-auto"
            />
            <Image
              src="logo/logo-icone.svg"
              alt=""
              width={103}
              height={84}
              className="h-10 w-auto mt-2"
            />
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            <nav className="flex items-center gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="link-underline text-base font-semibold transition-colors hover:text-rosewood"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Button
              content="On commence quand ?"
              href="/contact"
              style="primary"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="cursor-pointer text-encre transition-transform duration-300 md:hidden"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div
          className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <nav className="min-h-0">
            <div className="flex flex-col gap-6 border-t border-sand/40 px-8 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="link-underline text-base font-semibold transition-colors hover:text-rosewood"
                >
                  {item.label}
                </Link>
              ))}
              <Button
                content="On commence quand ?"
                href="/contact"
                style="primary"
              />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
