import { Clock, Globe, Sparkles } from "lucide-react";
import { services } from "../content";
import { contactHref } from "../lib/links";
import { revealDelay } from "../lib/motion";
import CtaLink from "../components/CtaLink";
import SectionHeading from "../components/SectionHeading";

type Package = (typeof services.packages)[number];

function PackageBody({ pkg }: { pkg: Package }) {
  return (
    <>
      {pkg.highlight && (
        <p className="mb-3 w-fit rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-md shadow-primary/30">
          Recommended
        </p>
      )}
      <h3 className="text-xl font-bold">{pkg.name}</h3>
      <p className="mt-2 text-muted-foreground">{pkg.blurb}</p>
      <div className="mt-5">
        {pkg.founding ? (
          <>
            <p className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-display text-3xl font-extrabold">{pkg.founding}</span>
              <span className="text-muted-foreground line-through">{pkg.price}</span>
            </p>
            <p className="mt-1 text-xs font-semibold text-accent">Founding price for my first 3 clients</p>
          </>
        ) : (
          <p className="font-display text-2xl font-extrabold">{pkg.price}</p>
        )}
        <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" aria-hidden /> {pkg.delivery}
        </p>
      </div>
      <ul className="tick-list tick-list-plain mt-6 space-y-2.5 text-sm">
        {pkg.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <CtaLink href={contactHref(pkg.message)} variant={pkg.highlight ? "primary" : "secondary"} className="w-full">
          {pkg.cta}
        </CtaLink>
      </div>
    </>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-20 overflow-hidden border-y border-border bg-muted/50 py-20 sm:py-24">
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="container-page relative">
        <SectionHeading eyebrow="Services" title={services.title} intro={services.intro} />
        <p
          data-reveal
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-2 text-sm font-semibold"
        >
          <Sparkles className="h-4 w-4 text-accent" aria-hidden /> {services.offer}
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {services.packages.map((pkg, index) =>
            pkg.highlight ? (
              <div
                key={pkg.name}
                data-reveal="zoom"
                style={revealDelay(index, 120)}
                className="glow-border card-hover rounded-[18px] p-[2px] shadow-xl shadow-primary/15"
              >
                <article className="flex h-full flex-col rounded-2xl bg-card p-6 sm:p-7">
                  <PackageBody pkg={pkg} />
                </article>
              </div>
            ) : (
              <article
                key={pkg.name}
                data-reveal="zoom"
                style={revealDelay(index, 120)}
                className="card-hover flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-7"
              >
                <PackageBody pkg={pkg} />
              </article>
            ),
          )}
        </div>

        <div data-reveal className="card-hover mt-6 rounded-2xl border border-border bg-card p-6 sm:p-7">
          <h3 className="text-lg font-bold">
            {services.care.name} · <span className="text-accent">{services.care.price}</span>
          </h3>
          <p className="mt-1 text-muted-foreground">{services.care.description}</p>
        </div>

        <p data-reveal="fade" className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Globe className="h-4 w-4 shrink-0" aria-hidden /> {services.abroad}
        </p>
      </div>
    </section>
  );
}
