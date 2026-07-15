"use client";

import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function AccordionItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  return (
    <div
      className={`overflow-hidden rounded-2xl bg-paper shadow-lg ring-1 transition-shadow duration-300 hover:shadow-xl ${
        isOpen ? "ring-rosewood/30" : "ring-encre/5"
      }`}
    >
      <button
        type="button"
        id={buttonId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rosewood/50"
      >
        <span className="font-semibold text-base text-encre sm:text-lg">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-rosewood transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="px-6 pb-5 leading-relaxed text-encre/80">{answer}</p>
        </div>
      </div>
    </div>
  );
}
