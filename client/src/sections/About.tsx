import { Briefcase, GraduationCap } from "lucide-react";
import { about, site } from "../content";
import SectionHeading from "../components/SectionHeading";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-border bg-muted/50 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow="About" title={about.title} />

        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              {about.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
              {site.showServices && <p>{about.servicesParagraph}</p>}
            </div>

            <h3 className="mt-10 flex items-center gap-2 text-xl font-bold">
              <GraduationCap className="h-5 w-5 text-accent" aria-hidden /> Education
            </h3>
            <ul className="mt-5 space-y-4">
              {about.education.map((item) => (
                <li key={item.degree} className="rounded-2xl border border-border bg-card p-5">
                  <p className="font-bold">{item.degree}</p>
                  <p className="mt-1 text-muted-foreground">{item.school}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.period}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-xl font-bold">
              <Briefcase className="h-5 w-5 text-accent" aria-hidden /> Experience
            </h3>
            <ol className="mt-6 space-y-8 border-l-2 border-border pl-6">
              {about.experience.map((job) => (
                <li key={`${job.role}-${job.period}`} className="relative">
                  <span className="absolute -left-[33px] top-1 h-4 w-4 rounded-full border-4 border-background bg-primary" aria-hidden />
                  <p className="text-sm font-medium text-muted-foreground">
                    {job.period}
                    {job.place && ` · ${job.place}`}
                  </p>
                  <h4 className="mt-1 text-lg font-bold">{job.role}</h4>
                  {job.org && <p className="font-semibold text-accent">{job.org}</p>}
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground marker:text-accent">
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <h3 className="mt-16 text-xl font-bold">Skills</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {about.skills.map((group) => (
            <div key={group.group}>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">{group.group}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li key={skill} className="rounded-full border border-border bg-card px-3 py-1 text-sm">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
