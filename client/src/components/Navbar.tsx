import { useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { nav, site } from "../content";
import { whatsappLink } from "../lib/links";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = nav.filter((link) => site.showServices || !link.servicesOnly);
  const chat = site.showServices ? whatsappLink() : "";
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#top" onClick={close} className="flex items-center gap-2.5 font-bold tracking-tight">
          <img src="/images/logo-96.webp" alt="" width={36} height={36} className="h-9 w-9 rounded-full" />
          <span>{site.name}</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          {site.resumeUrl && (
            <a
              href={site.resumeUrl}
              download
              className="hidden items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-semibold transition hover:bg-muted sm:inline-flex"
            >
              <Download className="h-4 w-4" aria-hidden /> Resume
            </a>
          )}
          {chat && (
            <a
              href={chat}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-xl bg-whatsapp px-3 py-2 text-sm font-semibold text-[#08291a] transition hover:brightness-95 sm:inline-flex"
            >
              <SiWhatsapp className="h-4 w-4" aria-hidden /> WhatsApp
            </a>
          )}
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-muted md:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      <nav id="mobile-menu" aria-label="Mobile" hidden={!open} className="border-t border-border md:hidden">
        <div className="container-page flex flex-col py-2">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={close} className="py-3 text-base font-medium">
              {link.label}
            </a>
          ))}
          {site.resumeUrl && (
            <a href={site.resumeUrl} download onClick={close} className="py-3 text-base font-medium">
              Download resume
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}
