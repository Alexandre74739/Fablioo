import Link from "next/link";

type ButtonStyle = "primary" | "secondary" | "tertiary" | "link" | "nav";

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
    "inline-block rounded-xl px-6 py-3 font-heading transition-ease duration-200 text-center cursor-pointer";

  const styles: Record<ButtonStyle, string> = {
    primary: "bg-rosewood text-paper hover:bg-prune",
    secondary: "bg-paper text-prune hover:bg-rosewood hover:text-paper",
    tertiary:
      "bg-transparent text-paper border border-paper/40 hover:bg-paper/10",
    link: "bg-transparent text-rosewood border-none hover:text-prune",
    nav: active
      ? "bg-prune text-paper text-sm"
      : "bg-sand/40 text-encre text-sm hover:bg-sand",
  };
  const variantStyles = styles[style];

  const label =
    style === "link" ? (
      <span className="link-underline">{content}</span>
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
