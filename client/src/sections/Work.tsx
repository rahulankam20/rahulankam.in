import { ArrowUpRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { projects, site, work, type Project, type Shot } from "../content";
import { imageSizes, imageSrcSet, imageUrl } from "../lib/images";
import { contactHref, isWhatsapp } from "../lib/links";
import { CountUp, motionVars, revealDelay } from "../lib/motion";
import CtaLink from "../components/CtaLink";
import SectionHeading from "../components/SectionHeading";

function Screenshot({ shot, index, sizes, className = "" }: { shot: Shot; index: number; sizes: string; className?: string }) {
  return (
    <figure
      data-reveal="zoom"
      style={revealDelay(index, 120)}
      className={`group overflow-hidden rounded-xl border border-border bg-muted shadow-sm ${className}`}
    >
      <img
        src={imageUrl(shot.src)}
        srcSet={imageSrcSet(shot.src, shot.width)}
        sizes={sizes}
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

/** One project: text and buttons on one side, screenshots on the other (swapped when `flip`), numbers below. */
function ProjectCard({ project, flip }: { project: Project; flip: boolean }) {
  const [wide, ...pair] = project.images;
  const ctaHref = contactHref(project.cta.message);
  const showCta = site.showServices || !project.cta.servicesOnly;

  return (
    <article
      id={`work-${project.id}`}
      data-reveal="fade"
      className="relative scroll-mt-24 overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10"
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-32 h-80 w-80 rounded-full bg-[radial-gradient(circle,hsl(var(--glow)/0.18),transparent_65%)] ${flip ? "-left-32" : "-right-32"}`}
      />
      <div className={`relative grid gap-10 ${flip ? "lg:grid-cols-[1.2fr_1fr]" : "lg:grid-cols-[1fr_1.2fr]"}`}>
        <div className={flip ? "lg:order-last" : ""}>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">{project.kicker}</p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{project.title}</h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">{project.summary}</p>
          <ul className="tick-list mt-6 space-y-3">
            {project.highlights.map((item, index) => (
              <li key={item} data-reveal={flip ? "right" : "left"} style={revealDelay(index, 70)}>
                {item}
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Built with">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold transition duration-300 hover:-translate-y-0.5 hover:border-primary/60"
              >
                {tech}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">{project.note}</p>
          {(project.liveUrl || showCta) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.liveUrl && (
                <CtaLink href={project.liveUrl}>
                  View the live demo
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </CtaLink>
              )}
              {showCta && (
                <CtaLink href={ctaHref} variant={isWhatsapp(ctaHref) ? "whatsapp" : project.liveUrl ? "secondary" : "primary"}>
                  {isWhatsapp(ctaHref) && <SiWhatsapp className="h-4 w-4" aria-hidden />}
                  {project.cta.label}
                </CtaLink>
              )}
            </div>
          )}
        </div>

        <div className={`grid grid-cols-2 content-start gap-3 sm:gap-4 ${flip ? "lg:order-first" : ""}`}>
          <Screenshot shot={wide} index={0} sizes={imageSizes.workWide} className="col-span-2" />
          {pair.map((shot, index) => (
            <Screenshot key={shot.src} shot={shot} index={index + 1} sizes={imageSizes.workHalf} />
          ))}
          <div className="col-span-2 flex justify-center gap-4 pt-2 sm:gap-6">
            {project.phoneImages.map((shot, index) => (
              <figure key={shot.src} className="w-[38%] max-w-[180px]">
                {/* Outer box: the phone rises and straightens with the scroll, the second
                    from further and faster. Inner box: it bobs while you read. */}
                <div className="phone-rise" style={motionVars(index === 0 ? { rise: "3rem", tilt: "-6deg" } : { rise: "6rem", tilt: "7deg" })}>
                  <div
                    className={`${index === 0 ? "float-slow" : "float-slower"} overflow-hidden rounded-[1.2rem] border-[5px] border-neutral-900 bg-muted shadow-xl`}
                  >
                  <img
                    src={imageUrl(shot.src)}
                    srcSet={imageSrcSet(shot.src, shot.width)}
                    sizes={imageSizes.workPhone}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* The number cards have no slide-in: the count-up is their entrance. */}
      <dl className="relative mt-10 grid grid-cols-2 gap-3 border-t border-border pt-8 sm:gap-4 lg:grid-cols-4">
        {project.stats.map((stat) => (
          <div
            key={stat.label}
            className="card-hover flex flex-col-reverse justify-end rounded-2xl border border-border bg-background/60 p-4 sm:p-5"
          >
            <dt className="mt-1 text-sm text-muted-foreground">{stat.label}</dt>
            <dd className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} className="text-gradient" />
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="scroll-mt-20 pb-20 pt-16 sm:pb-24 sm:pt-20">
      <div className="container-page">
        <SectionHeading eyebrow="Work" title={work.title} intro={work.intro} />
        <div className="mt-12 space-y-10 sm:space-y-14">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} flip={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
