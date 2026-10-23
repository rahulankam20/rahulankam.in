type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
};

export default function SectionHeading({ eyebrow, title, intro }: Props) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg text-muted-foreground">{intro}</p>}
    </div>
  );
}
