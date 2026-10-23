import { useState, type FormEvent } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiWhatsapp } from "react-icons/si";
import { contact, site } from "../content";
import { whatsappLink } from "../lib/links";
import CtaLink from "../components/CtaLink";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-base outline-none transition placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/30";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const services = site.showServices;
  const chat = whatsappLink();
  const text = contact.form;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();

    // Bots fill every field, including this hidden one; people never see it.
    if (value("website")) {
      setStatus("sent");
      form.reset();
      return;
    }

    const details = [
      value("business") && `Business: ${value("business")}`,
      value("phone") && `Phone/WhatsApp: ${value("phone")}`,
    ].filter(Boolean);

    setStatus("sending");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        contact.emailjs.serviceId,
        contact.emailjs.templateId,
        {
          from_name: value("name"),
          from_email: value("email"),
          message: [...details, value("message")].join("\n\n"),
          to_email: site.email,
        },
        {
          publicKey: contact.emailjs.publicKey,
          blockHeadless: true,
          limitRate: { id: "contact-form", throttle: 10_000 },
        },
      );
      setStatus("sent");
      form.reset();
    } catch (error) {
      console.error("The contact form failed to send", error);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 border-t border-border bg-muted/50 py-20 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Contact</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {services ? contact.title : contact.portfolioTitle}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{services ? contact.subtitle : contact.portfolioSubtitle}</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" aria-hidden /> {contact.replyTime}
          </p>

          {chat && (
            <CtaLink href={chat} variant="whatsapp" className="mt-8">
              <SiWhatsapp className="h-4 w-4" aria-hidden /> Chat on WhatsApp
            </CtaLink>
          )}

          <ul className="mt-8 space-y-4">
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 font-medium hover:text-accent">
                <Mail className="h-5 w-5 text-accent" aria-hidden /> {site.email}
              </a>
            </li>
            {site.phone && (
              <li>
                <a href={`tel:${site.phone}`} className="inline-flex items-center gap-3 font-medium hover:text-accent">
                  <Phone className="h-5 w-5 text-accent" aria-hidden /> {site.phoneDisplay}
                </a>
              </li>
            )}
            <li className="inline-flex items-center gap-3 font-medium">
              <MapPin className="h-5 w-5 text-accent" aria-hidden /> {site.location}
            </li>
          </ul>

          <div className="mt-8 flex gap-3">
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card transition hover:bg-muted">
              <FaLinkedin className="h-5 w-5" aria-hidden />
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card transition hover:bg-muted">
              <FaGithub className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold">
              {text.name}
              <input name="name" required autoComplete="name" className={field} />
            </label>
            <label className="block text-sm font-semibold">
              {text.business}
              <input name="business" autoComplete="organization" className={field} />
            </label>
            <label className="block text-sm font-semibold">
              {text.email}
              <input name="email" type="email" required autoComplete="email" className={field} />
            </label>
            <label className="block text-sm font-semibold">
              {text.phone}
              <input name="phone" type="tel" autoComplete="tel" className={field} />
            </label>
            <label className="block text-sm font-semibold sm:col-span-2">
              {text.message}
              <textarea name="message" required rows={5} className={field} />
            </label>
            <div className="hidden" aria-hidden>
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition hover:brightness-95 disabled:opacity-60"
          >
            {status === "sending" ? text.sending : text.submit}
          </button>
          <p role="status" aria-live="polite" className="mt-4 min-h-6 text-sm">
            {status === "sent" && <span className="font-medium text-accent">{text.success}</span>}
            {status === "error" && <span className="font-medium text-red-600 dark:text-red-400">{text.error}</span>}
          </p>
        </form>
      </div>
    </section>
  );
}
