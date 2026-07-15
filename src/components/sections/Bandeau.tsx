import Button from "../ui/Button";
import Reveal from "../animations/Reveal";

interface BandeauProps {
  title: string;
  description: string;
  label: string;
  href: string;
}

export default function Bandeau({
  title,
  description,
  label,
  href,
}: BandeauProps) {
  return (
    <section className="bg-rosewood">
      <div>
        <Reveal delay={0}>
          <h2>{title}</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p>{description}</p>
        </Reveal>
        <Reveal delay={0.4}>
          <Button content={label} href={href} style="primary" />{" "}
        </Reveal>
      </div>
    </section>
  );
}
