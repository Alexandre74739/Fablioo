"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavButtonProps {
  direction: "previous" | "next";
  onClick: () => void;
  label?: string;
}

export default function NavButton({ direction, onClick, label }: NavButtonProps) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;
  const defaultLabel = direction === "previous" ? "Précédent" : "Suivant";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label ?? defaultLabel}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-encre/20 text-encre/80 transition-colors duration-300 hover:bg-sand/30 cursor-pointer"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
