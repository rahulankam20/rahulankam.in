import { howItWorks } from "../content";
import { revealDelay } from "../lib/motion";
import SectionHeading from "../components/SectionHeading";

export default function Process() {
  return (
    <section id="process" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow="Process" title={howItWorks.title} />
        <div className="relative mt-12">
          {/* A line that draws itself across the steps as they appear (wide screens). */}
          <div
            aria-hidden
            data-reveal="line"
            className="absolute inset-x-[12%] top-11 hidden h-0.5 rounded-full bg-gradient-to-r from-[hsl(var(--grad-from))] via-[hsl(var(--grad-via))] to-[hsl(var(--grad-to))] lg:block"
          />
          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.steps.map((step, index) => (
              <li
                key={step.title}
                data-reveal
                style={revealDelay(index, 140)}
                className="card-hover group rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-base font-extrabold text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-110">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
