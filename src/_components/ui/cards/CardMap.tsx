"use client";

import { type LucideIcon } from "lucide-react";
import Button from "@/_components/ui/Button";

export type Lines = 2 | 3 | 4;

const clampClasses: Record<Lines, string> = {
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
};

interface CardMapProps {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  side: "left" | "right";
  onDiscover: () => void;
  lines?: Lines;
}

export default function CardMap({
  number,
  title,
  description,
  icon: Icon,
  side,
  onDiscover,
  lines,
}: CardMapProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onDiscover}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onDiscover();
        }
      }}
      className="group relative cursor-pointer transition-transform duration-300 hover:-translate-y-1"
    >
      <div
        className={`relative rounded-2xl bg-paper px-5 py-5 shadow-lg ring-1 ring-encre/5 transition-shadow duration-300 group-hover:shadow-xl sm:px-7 sm:py-6 md:px-8 md:py-7 ${
          side === "left"
            ? "pl-18 text-right sm:pl-22 md:pl-26"
            : "pr-18 text-left sm:pr-22 md:pr-26"
        }`}
      >
        <h3 className="text-sm font-bold text-encre sm:text-base md:text-lg lg:text-xl">
          {title}
        </h3>
        <p
          className={`mt-1.5 text-xs leading-snug text-encre/80 sm:mt-2 sm:text-sm md:text-base ${
            lines ? clampClasses[lines] : ""
          }`}
        >
          {description}
        </p>
        <div
          className={`mt-1 flex ${side === "left" ? "justify-end -mr-3" : "justify-start -ml-3"}`}
        >
          <Button
            content="Découvrir ce chapitre"
            style="link-base"
            size="fine"
            onClick={onDiscover}
          />
        </div>
      </div>

      <div
        className={`absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-rosewood shadow-md sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-18 lg:w-18 ${
          side === "left"
            ? "left-4 sm:left-5 md:left-6"
            : "right-4 sm:right-5 md:right-6"
        }`}
      >
        <Icon className="h-4 w-4 text-paper sm:h-5 sm:w-5 md:h-6 md:w-6" />
        <span
          className={`absolute -bottom-2 flex h-5 w-5 items-center justify-center rounded-full bg-encre font-heading text-[10px] text-paper ring-2 ring-paper sm:h-6 sm:w-6 lg:h-8 lg:w-8 sm:text-xs ${
            side === "left" ? "-left-1" : "-right-1"
          }`}
        >
          {number}
        </span>
      </div>
    </div>
  );
}
