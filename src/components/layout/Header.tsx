"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Récits", href: "/recits" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Tarifs", href: "/tarifs" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-paper shadow-[0_2px_12px_0_rgba(36,29,26,0.12)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-ecrit.svg"
            alt="Fablioo"
            width={122}
            height={32}
            className="h-8 w-auto"
          />
          <Image
            src="/logo-icone.svg"
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
          aria-expanded={isOpen}
        >
          <span className="relative block size-7">
            <Menu
              size={28}
              className={`absolute inset-0 transition-all duration-300 ${
                isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
            />
            <X
              size={28}
              className={`absolute inset-0 transition-all duration-300 ${
                isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`absolute inset-x-0 top-full grid overflow-hidden bg-paper shadow-[0_8px_12px_-4px_rgba(36,29,26,0.12)] transition-[grid-template-rows] duration-300 ease-in-out md:hidden ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav
            className={`flex flex-col gap-6 border-t border-sand/40 px-8 py-6 transition-all duration-300 ease-in-out ${
              isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
            }`}
          >
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
          </nav>
        </div>
      </div>
    </header>
  );
}
