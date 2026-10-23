import { howItWorks } from "../content";
import SectionHeading from "../components/SectionHeading";

export default function Process() {
  return (
    <section id="process" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow="Process" title={howItWorks.title} />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-base font-extrabold text-primary-foreground">
                {index + 1}
              </span>
              <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
