import { useEffect, useRef, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { nav, site } from "../content";
import { whatsappLink } from "../lib/links";
import ThemeToggle from "./ThemeToggle";

const links = nav.filter((link) => site.showServices || !link.servicesOnly);
const lastSection = links[links.length - 1].href.slice(1);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const progress = useRef<HTMLDivElement>(null);
  const chat = site.showServices ? whatsappLink() : "";
  const close = () => setOpen(false);

  useEffect(() => {
    // Solid background once the page moves, and a reading-progress line along the bottom.
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current?.style.setProperty("transform", `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`);
      // The last section can't reach the middle of the screen, so mark it once the page bottoms out.
      if (max > 0 && y >= max - 4) setActive(lastSection);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Underline the link of the section in the middle of the screen; none while in the hero.
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id === "top" ? "" : entry.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...links.map((link) => link.href.slice(1))].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`nav-in sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-border/70 bg-background/80 shadow-[0_10px_30px_-14px_rgb(0_0_0/0.25)] backdrop-blur-md"
          : "border-transparent bg-background/40 backdrop-blur-sm"
      }`}
    >
      <div
        ref={progress}
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[hsl(var(--grad-from))] via-[hsl(var(--grad-via))] to-[hsl(var(--grad-to))]"
      />
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#top" onClick={close} className="group flex items-center gap-2.5 font-display text-lg font-bold tracking-tight">
          <img
            src="/images/logo-96.webp"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-full transition-transform duration-500 group-hover:rotate-[20deg]"
          />
          <span>{site.name}</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative py-1 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-gradient-to-r after:from-[hsl(var(--grad-from))] after:to-[hsl(var(--grad-to))] after:transition-transform after:duration-300 after:content-[''] hover:text-foreground hover:after:scale-x-100 ${
                  isActive ? "text-foreground after:scale-x-100" : "text-muted-foreground after:scale-x-0"
                }`}
              >
                {link.label}
              </a>
            );
          })}
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
              className="btn-shine hidden items-center gap-2 rounded-xl bg-whatsapp px-3 py-2 text-sm font-semibold text-whatsapp-foreground shadow-md shadow-whatsapp/25 transition duration-300 hover:-translate-y-0.5 sm:inline-flex"
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

      <nav id="mobile-menu" aria-label="Mobile" hidden={!open} className="menu-in border-t border-border md:hidden">
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
