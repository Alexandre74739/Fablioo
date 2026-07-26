import { Check, X } from "lucide-react";
import Reveal from "@/_components/animations/Reveal";
import FloatingBlob from "@/_components/animations/FloatingBlob";

interface BeforeAfterCardProps {
  variant: "before" | "after";
  items: string[];
  delay?: number;
}

const VARIANTS = {
  before: {
    label: "Le point de départ",
    title: "Avant",
    Icon: X,
    cardClass: "bg-paper ring-1 ring-encre/5",
    labelClass: "text-encre/50",
    itemClass: "text-encre/70",
    iconClass: "text-encre/30",
    blobTop: "/shapes/blob-4.svg",
    blobBottom: "/shapes/blob-1.svg",
  },
  after: {
    label: "La vision concrétisée",
    title: "Après",
    Icon: Check,
    cardClass:
      "border-2 border-dashed border-rosewood bg-paper ring-1 ring-rosewood/10",
    labelClass: "text-rosewood",
    itemClass: "text-encre/80",
    iconClass: "text-rosewood",
    blobTop: "/shapes/blob-3.svg",
    blobBottom: "/shapes/blob-4.svg",
  },
} as const;

export default function BeforeAfterCard({
  variant,
  items,
  delay = 0,
}: BeforeAfterCardProps) {
  const {
    label,
    title,
    Icon,
    cardClass,
    labelClass,
    itemClass,
    iconClass,
    blobTop,
    blobBottom,
  } = VARIANTS[variant];

  return (
    <Reveal
      delay={delay}
      className={`relative overflow-hidden rounded-3xl p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:p-10 ${cardClass}`}
    >
      <FloatingBlob
        src={blobTop}
        className="-top-14 -left-14 h-40 w-40 opacity-60 md:h-48 md:w-48"
        duration={9}
        yRange={10}
        rotateRange={5}
      />
      <FloatingBlob
        src={blobBottom}
        className="-right-16 -bottom-16 h-36 w-36 opacity-60 md:h-40 md:w-40"
        duration={11}
        delay={0.5}
        yRange={-12}
        rotateRange={-4}
      />

      <span
        className={`relative mt-5 block font-quote text-sm italic ${labelClass}`}
      >
        {label}
      </span>
      <h3 className="relative mt-1 text-2xl font-bold text-encre md:text-3xl">
        {title}
      </h3>

      <ul className="relative mt-6 flex flex-col gap-4">
        {items.map((item) => (
          <li key={item} className={`flex items-start gap-3 ${itemClass}`}>
            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${iconClass}`} />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
