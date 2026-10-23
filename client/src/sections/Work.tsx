import { ArrowUpRight, Check } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { featured, learningProjects } from "../content";
import { contactHref, isWhatsapp } from "../lib/links";
import { CountUp, revealDelay } from "../lib/motion";
import CtaLink from "../components/CtaLink";
import SectionHeading from "../components/SectionHeading";

type Shot = { src: string; alt: string; width: number; height: number };

function Screenshot({ shot, index, className = "" }: { shot: Shot; index: number; className?: string }) {
  return (
    <figure
      data-reveal="zoom"
      style={revealDelay(index, 120)}
      className={`group overflow-hidden rounded-xl border border-border bg-muted shadow-sm ${className}`}
    >
      <img
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    </figure>
  );
}

export default function Work() {
  const [, shop, product, cart] = featured.images;
  const demoHref = contactHref(featured.demoMessage);

  return (
    <section id="work" className="scroll-mt-20 pb-20 pt-16 sm:pb-24 sm:pt-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Work"
          title="Selected work"
          intro="My main project is a complete online store, built to be rebranded for each client. Below it are the projects I learned on."
        />

        <article data-reveal="fade" className="relative mt-12 overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[radial-gradient(circle,hsl(var(--glow)/0.18),transparent_65%)]"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">{featured.kicker}</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{featured.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{featured.summary}</p>
              <ul className="mt-6 space-y-3">
                {featured.highlights.map((item, index) => (
                  <li key={item} data-reveal="left" style={revealDelay(index, 70)} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <Check className="h-3.5 w-3.5 text-accent" aria-hidden />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Built with">
                {featured.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold transition duration-300 hover:-translate-y-0.5 hover:border-primary/60"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">{featured.note}</p>
              <CtaLink href={demoHref} variant={isWhatsapp(demoHref) ? "whatsapp" : "primary"} className="mt-6">
                {isWhatsapp(demoHref) && <SiWhatsapp className="h-4 w-4" aria-hidden />}
                {featured.demoCta}
              </CtaLink>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Screenshot shot={shop} index={0} className="col-span-2" />
              <Screenshot shot={product} index={1} />
              <Screenshot shot={cart} index={2} />
              <div className="col-span-2 flex justify-center gap-4 pt-2 sm:gap-6">
                {featured.phoneImages.map((shot, index) => (
                  <figure key={shot.src} data-reveal style={revealDelay(index + 3, 120)} className="w-[38%] max-w-[180px]">
                    <div
                      className={`${index === 0 ? "float-slow" : "float-slower"} overflow-hidden rounded-[1.2rem] border-[5px] border-neutral-900 bg-muted shadow-xl`}
                    >
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.width}
                        height={shot.height}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full"
                      />
                    </div>
                  </figure>
                ))}
              </div>
            </div>
          </div>

          <dl className="relative mt-10 grid grid-cols-2 gap-3 border-t border-border pt-8 sm:gap-4 lg:grid-cols-4">
            {featured.stats.map((stat, index) => (
              <div
                key={stat.label}
                data-reveal
                style={revealDelay(index, 100)}
                className="card-hover flex flex-col-reverse justify-end rounded-2xl border border-border bg-background/60 p-4 sm:p-5"
              >
                <dt className="mt-1 text-sm text-muted-foreground">{stat.label}</dt>
                <dd className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                  <CountUp value={stat.value} suffix={stat.suffix} className="text-gradient" />
                </dd>
              </div>
            ))}
          </dl>
        </article>

        <div className="mt-16">
          <div data-reveal>
            <h3 className="text-xl font-bold">{learningProjects.title}</h3>
            <p className="mt-1 text-muted-foreground">{learningProjects.intro}</p>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {learningProjects.items.map((project, index) => (
              <li
                key={project.title}
                data-reveal
                style={revealDelay(index % 3, 90)}
                className="card-hover group flex flex-col rounded-2xl border border-border bg-card p-5"
              >
                <h4 className="font-bold">{project.title}</h4>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{project.description}</p>
                <p className="mt-4 text-xs font-medium text-muted-foreground">{project.stack.join(" · ")}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-accent hover:underline"
                >
                  View live
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                  <span className="sr-only">: {project.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
