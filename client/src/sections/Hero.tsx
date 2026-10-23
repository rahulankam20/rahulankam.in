import { ArrowRight, Check } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { featured, hero, site } from "../content";
import { contactHref, isWhatsapp } from "../lib/links";
import CtaLink from "../components/CtaLink";

export default function Hero() {
  const services = site.showServices;
  const primaryHref = services ? contactHref() : "#contact";
  const desktop = featured.images[0];
  const phone = featured.phoneImages[1];

  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_85%_0%,hsl(var(--primary)/0.22),transparent_70%)]"
      />
      <div className="container-page grid items-center gap-12 pb-12 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-16">
        <div className="animate-fade-up">
          <p className="text-sm font-semibold text-accent">{hero.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {services ? hero.title : hero.portfolioTitle}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {services ? hero.subtitle : hero.portfolioSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink href={primaryHref} variant={isWhatsapp(primaryHref) ? "whatsapp" : "primary"}>
              {isWhatsapp(primaryHref) && <SiWhatsapp className="h-4 w-4" aria-hidden />}
              {services ? hero.primaryCta : "Get in touch"}
            </CtaLink>
            <CtaLink href="#work" variant="secondary">
              {hero.secondaryCta} <ArrowRight className="h-4 w-4" aria-hidden />
            </CtaLink>
          </div>
          {services && (
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
              {hero.points.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" aria-hidden /> {point}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative mb-8 mr-3 animate-fade-up [animation-delay:150ms] sm:mr-6">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/15">
            <div className="flex items-center gap-1.5 border-b border-border px-3 py-2" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                Online store demo
              </span>
            </div>
            <img src={desktop.src} alt={desktop.alt} width={desktop.width} height={desktop.height} className="block h-auto w-full" />
          </div>
          <div className="absolute -bottom-8 -right-3 w-[25%] max-w-[150px] overflow-hidden rounded-[1.2rem] border-[5px] border-neutral-900 bg-card shadow-2xl shadow-black/30 sm:-right-6">
            <img src={phone.src} alt={phone.alt} width={phone.width} height={phone.height} className="block h-auto w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
