import Link from "next/link";

interface ButtonProps {
  content: string;
  href?: string;
  style?: "primary" | "outline" | "link";
  active?: boolean;
  onClick?: () => void;
}

export default function Button({
  content,
  href,
  style,
  active,
  onClick,
}: ButtonProps) {
  const baseStyles =
    "inline-block rounded-xl px-6 py-3 font-heading transition-ease duration-200 text-center cursor-pointer";

  const variantStyles =
    style === "primary"
      ? "bg-rosewood text-paper hover:bg-prune"
      : style === "outline"
        ? "bg-transparent text-encre border border-prune hover:bg-prune hover:text-paper"
        : style === "link"
          ? "bg-transparent text-rosewood border-none hover:text-prune"
          : active
            ? "bg-prune text-paper text-sm"
            : "bg-sand/40 text-encre text-sm hover:bg-sand";

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
