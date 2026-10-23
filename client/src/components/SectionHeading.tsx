type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
};

export default function SectionHeading({ eyebrow, title, intro }: Props) {
  return (
    <div className="max-w-2xl" data-reveal>
      <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-accent">
        <span aria-hidden className="h-px w-8 bg-gradient-to-r from-accent to-transparent" />
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-[2.6rem] sm:leading-[1.1]">{title}</h2>
      {intro && <p className="mt-4 text-lg text-muted-foreground">{intro}</p>}
    </div>
  );
}
