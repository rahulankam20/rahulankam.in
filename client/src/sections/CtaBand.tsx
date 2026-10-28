import { ArrowDown } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { ctaBand } from "../content";
import { contactHref, isWhatsapp } from "../lib/links";
import CtaLink from "../components/CtaLink";

// A dark panel with wandering glows, in both themes, just before the contact form.
export default function CtaBand() {
  const href = contactHref();

  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-20">
      <div className="container-page">
        <div
          data-reveal="zoom"
          className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 px-6 py-14 text-center text-white shadow-2xl shadow-black/30 sm:px-12 sm:py-20"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="blob -left-24 -top-32 h-96 w-96 bg-[radial-gradient(circle,hsl(31_100%_55%/0.55),transparent_65%)]" />
            <div className="blob -bottom-40 -right-20 h-[28rem] w-[28rem] bg-[radial-gradient(circle,hsl(345_90%_60%/0.4),transparent_65%)] [animation-delay:-8s]" />
          </div>
          <h2 id="cta-title" className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-5xl">
            {ctaBand.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">{ctaBand.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CtaLink href={href} variant={isWhatsapp(href) ? "whatsapp" : "primary"} autoShine>
              {isWhatsapp(href) && <SiWhatsapp className="h-4 w-4" aria-hidden />}
              {ctaBand.primary}
            </CtaLink>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              {ctaBand.secondary}
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
