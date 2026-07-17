import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Button from "@/_components/ui/Button";

interface PricingCardProps {
  title: string;
  badge: string;
  price: string;
  pricePrefix?: string;
  note?: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
}

export default function PricingCard({
  title,
  badge,
  price,
  pricePrefix = "À partir de",
  note,
  features,
  ctaLabel,
  ctaHref,
  featured = false,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-3xl bg-paper shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${
        featured ? "border-2 border-rosewood" : "border border-encre/10"
      }`}
    >
      {featured && (
        <span className="mx-auto mt-4 min-[400px]:mt-0 block w-fit rounded-full bg-rosewood px-4 py-1.5 text-xs font-bold tracking-wide text-paper uppercase shadow-md min-[400px]:absolute min-[400px]:top-5 min-[400px]:right-5 min-[400px]:z-20 min-[400px]:mx-0 min-[400px]:mb-0 sm:right-auto sm:left-5 md:top-6 md:right-6 md:left-auto">
          Recommandé
        </span>
      )}

      <div className="relative flex flex-col gap-6 overflow-hidden rounded-[22px] p-6 sm:flex-row sm:items-center sm:gap-8 md:p-8">
        <div
          className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 ${
            featured ? "opacity-80" : ""
          }`}
        >
          <Image
            src={featured ? "/shapes/blob-3.svg" : "/shapes/blob-1.svg"}
            alt=""
            fill
          />
        </div>

        {featured && (
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 translate-y-1/2">
            <Image src="/shapes/blob-1.svg" alt="" fill />
          </div>
        )}

        <div className="relative z-10 flex flex-col sm:w-60 sm:shrink-0">
          <h3 className="text-xl font-bold text-encre">{title}</h3>
          <span className="mt-2 w-fit rounded-full bg-sand/40 px-3 py-1 text-sm text-rosewood">
            {badge}
          </span>

          <div className="mt-4 ml-6 flex flex-col">
            <span className="text-sm text-encre/60">{pricePrefix}</span>
            <span className="text-4xl font-bold text-rosewood md:text-5xl">
              {price}
            </span>
            {note && <span className="text-sm text-encre/60">{note}</span>}
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col gap-5 border-t border-encre/10 pt-5 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8">
          <ul className="flex flex-col gap-2.5">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-base text-encre/80"
              >
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-rosewood" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="sm:self-start">
            <Button
              content={ctaLabel}
              href={ctaHref}
              style={featured ? "primary" : "outline"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
