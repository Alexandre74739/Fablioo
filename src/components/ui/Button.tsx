import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ButtonStyle =
  | "primary"
  | "secondary"
  | "tertiary"
  | "link-base"
  | "link-muted"
  | "nav";

interface ButtonProps {
  content: string;
  href?: string;
  style?: ButtonStyle;
  active?: boolean;
  onClick?: () => void;
}

export default function Button({
  content,
  href,
  style = "primary",
  active,
  onClick,
}: ButtonProps) {
  const baseStyles =
    "group inline-block rounded-xl px-6 py-3 font-heading transition-ease duration-300 text-center cursor-pointer";

  const styles: Record<ButtonStyle, string> = {
    primary: "bg-rosewood text-paper hover:bg-prune",
    secondary: "bg-paper text-prune hover:bg-rosewood hover:text-paper",
    tertiary:
      "bg-transparent text-paper border border-paper/40 hover:bg-paper/10",
    "link-base": "bg-transparent text-rosewood border-none hover:text-prune",
    "link-muted": "bg-transparent text-paper border-none hover:text-paper/80",
    nav: active
      ? "bg-prune text-paper text-sm"
      : "bg-sand/40 text-encre text-sm hover:bg-sand",
  };
  const variantStyles = styles[style];

  const label =
    style === "link-base" || style === "link-muted" ? (
      <span className="link-underline inline-flex items-center gap-1.5">
        <span>{content}</span>
        <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    ) : (
      content
    );

  if (onClick) {
    return (
      <button onClick={onClick} className={`${baseStyles} ${variantStyles}`}>
        {label}
      </button>
    );
  }

  return (
    <Link href={href!} className={`${baseStyles} ${variantStyles}`}>
      {label}
    </Link>
  );
}
