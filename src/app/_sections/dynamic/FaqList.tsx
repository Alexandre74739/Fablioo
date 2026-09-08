"use client";

import { useState } from "react";
import Reveal from "@/_components/animations/Reveal";
import AccordionItem from "@/_components/ui/AccordionItem";

interface FaqListProps {
  faqs: { id: string; question: string; answer: string }[];
}

export default function FaqList({ faqs }: FaqListProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4 lg:col-span-12">
      {faqs.map((faq, i) => (
        <Reveal key={faq.id} delay={i * 0.1}>
          <AccordionItem
            id={faq.id}
            question={faq.question}
            answer={faq.answer}
            isOpen={openId === faq.id}
            onToggle={() =>
              setOpenId((current) => (current === faq.id ? null : faq.id))
            }
          />
        </Reveal>
      ))}
    </div>
  );
}
