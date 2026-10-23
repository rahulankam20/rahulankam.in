import { ChevronDown } from "lucide-react";
import { faq } from "../content";
import SectionHeading from "../components/SectionHeading";

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading eyebrow="FAQ" title={faq.title} intro="Answers to what business owners usually want to know." />
        <div className="divide-y divide-border rounded-2xl border border-border bg-card">
          {faq.items.map((item) => (
            <details key={item.q} className="group p-5 sm:p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition group-open:rotate-180" aria-hidden />
              </summary>
              <p className="mt-3 leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
