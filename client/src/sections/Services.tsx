import { Check, Clock, Globe, Sparkles } from "lucide-react";
import { services } from "../content";
import { contactHref } from "../lib/links";
import CtaLink from "../components/CtaLink";
import SectionHeading from "../components/SectionHeading";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-y border-border bg-muted/50 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow="Services" title={services.title} intro={services.intro} />
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-accent" aria-hidden /> {services.offer}
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {services.packages.map((pkg) => (
            <article
              key={pkg.name}
              className={`flex flex-col rounded-2xl border bg-card p-6 sm:p-7 ${
                pkg.highlight ? "border-primary shadow-xl shadow-primary/10 ring-1 ring-primary" : "border-border"
              }`}
            >
              {pkg.highlight && (
                <p className="mb-3 w-fit rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  Recommended
                </p>
              )}
              <h3 className="text-xl font-bold">{pkg.name}</h3>
              <p className="mt-2 text-muted-foreground">{pkg.blurb}</p>
              <div className="mt-5">
                {pkg.founding ? (
                  <>
                    <p className="flex items-baseline gap-3">
                      <span className="text-3xl font-extrabold">{pkg.founding}</span>
                      <span className="text-muted-foreground line-through">{pkg.price}</span>
                    </p>
                    <p className="mt-1 text-xs font-semibold text-accent">Founding price for my first 3 clients</p>
                  </>
                ) : (
                  <p className="text-2xl font-extrabold">{pkg.price}</p>
                )}
                <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" aria-hidden /> {pkg.delivery}
                </p>
              </div>
              <ul className="mt-6 space-y-2.5 text-sm">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <CtaLink href={contactHref(pkg.message)} variant={pkg.highlight ? "primary" : "secondary"} className="w-full">
                  {pkg.cta}
                </CtaLink>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-6 sm:p-7">
          <h3 className="text-lg font-bold">
            {services.care.name} · <span className="text-accent">{services.care.price}</span>
          </h3>
          <p className="mt-1 text-muted-foreground">{services.care.description}</p>
        </div>

        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Globe className="h-4 w-4 shrink-0" aria-hidden /> {services.abroad}
        </p>
      </div>
    </section>
  );
}
