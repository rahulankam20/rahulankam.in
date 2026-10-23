import { ArrowUpRight, Check } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { featured, learningProjects } from "../content";
import { contactHref, isWhatsapp } from "../lib/links";
import CtaLink from "../components/CtaLink";
import SectionHeading from "../components/SectionHeading";

type Shot = { src: string; alt: string; width: number; height: number };

function Screenshot({ shot, className = "" }: { shot: Shot; className?: string }) {
  return (
    <figure className={`overflow-hidden rounded-xl border border-border bg-muted ${className}`}>
      <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} loading="lazy" decoding="async" className="block h-auto w-full" />
    </figure>
  );
}

export default function Work() {
  const [, shop, product, cart] = featured.images;
  const demoHref = contactHref(featured.demoMessage);

  return (
    <section id="work" className="scroll-mt-20 pb-20 pt-12 sm:pb-24 sm:pt-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Work"
          title="Selected work"
          intro="My main project is a complete online store, built to be rebranded for each client. Below it are the projects I learned on."
        />

        <article className="mt-12 grid gap-10 rounded-3xl border border-border bg-card p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">{featured.kicker}</p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{featured.title}</h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">{featured.summary}</p>
            <ul className="mt-6 space-y-3">
              {featured.highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Built with">
              {featured.stack.map((tech) => (
                <li key={tech} className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold">
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
            <Screenshot shot={shop} className="col-span-2" />
            <Screenshot shot={product} />
            <Screenshot shot={cart} />
            <div className="col-span-2 flex justify-center gap-4 pt-2 sm:gap-6">
              {featured.phoneImages.map((shot) => (
                <figure key={shot.src} className="w-[38%] max-w-[180px] overflow-hidden rounded-[1.2rem] border-[5px] border-neutral-900 bg-muted shadow-lg">
                  <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} loading="lazy" decoding="async" className="block h-auto w-full" />
                </figure>
              ))}
            </div>
          </div>
        </article>

        <div className="mt-16">
          <h3 className="text-xl font-bold">{learningProjects.title}</h3>
          <p className="mt-1 text-muted-foreground">{learningProjects.intro}</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {learningProjects.items.map((project) => (
              <li key={project.title} className="flex flex-col rounded-2xl border border-border bg-card p-5">
                <h4 className="font-bold">{project.title}</h4>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{project.description}</p>
                <p className="mt-4 text-xs font-medium text-muted-foreground">{project.stack.join(" · ")}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-accent hover:underline"
                >
                  View live <ArrowUpRight className="h-4 w-4" aria-hidden />
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
