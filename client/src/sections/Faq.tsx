import { ChevronDown } from "lucide-react";
import { faq } from "../content";
import { revealDelay } from "../lib/motion";
import SectionHeading from "../components/SectionHeading";

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading eyebrow="FAQ" title={faq.title} intro="Answers to what business owners usually want to know." />
        <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {faq.items.map((item, index) => (
            <details key={item.q} data-reveal="fade" style={revealDelay(index, 70)} className="group p-5 transition-colors hover:bg-muted/40 sm:p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition duration-300 group-open:rotate-180 group-open:border-primary/60 group-open:bg-primary/15">
                  <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden />
                </span>
              </summary>
              <p className="faq-answer mt-3 leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
