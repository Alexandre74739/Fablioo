import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ButtonStyle =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "link-base"
  | "link-muted"
  | "nav";

type ButtonSize = "fine" | "large";

const sizeStyles: Record<ButtonSize, string> = {
  large: "px-6 py-3 text-base rounded-xl",
  fine: "px-4 py-1.5 text-xs rounded-md",
};

interface ButtonProps {
  content: string;
  href?: string;
  style?: ButtonStyle;
  size?: ButtonSize;
  active?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  content,
  href,
  style = "primary",
  size = "large",
  active,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles = `group inline-block font-heading transition-ease duration-300 text-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${sizeStyles[size]}`;

  const styles: Record<ButtonStyle, string> = {
    primary: "bg-rosewood text-paper hover:bg-prune",
    secondary: "bg-paper text-prune hover:bg-rosewood hover:text-paper",
    tertiary:
      "bg-transparent text-paper border border-paper/40 hover:bg-paper/10",
    outline:
      "bg-paper text-rosewood border border-rosewood hover:bg-rosewood hover:text-paper",
    "link-base": "bg-transparent text-rosewood border-none hover:text-prune",
    "link-muted": "bg-transparent text-paper border-none hover:text-paper/80",
    nav: active ? "bg-prune text-paper" : "bg-sand/40 text-encre hover:bg-sand",
  };
  const variantStyles = styles[style];

  const iconSize = size === "fine" ? "h-3.5 w-3.5" : "h-4 w-4";

  const label =
    style === "link-base" || style === "link-muted" ? (
      <span className="link-underline inline-flex items-center gap-1.5">
        <span>{content}</span>
        <ArrowRight
          className={`${iconSize} shrink-0 transition-transform duration-300 group-hover:translate-x-1`}
        />
      </span>
    ) : (
      content
    );

  if (type === "submit" || onClick) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles}`}
      >
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
