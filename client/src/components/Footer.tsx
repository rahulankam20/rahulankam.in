import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { footer, site } from "../content";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div
        data-reveal="fade"
        className="container-page flex flex-col gap-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
      >
        <p>
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {site.name} · {footer.tagline}
        </p>
        <div className="flex items-center gap-5">
          {site.linkedin && (
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition hover:-translate-y-0.5 hover:text-foreground">
              <FaLinkedin aria-hidden /> LinkedIn
            </a>
          )}
          {site.github && (
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition hover:-translate-y-0.5 hover:text-foreground">
              <FaGithub aria-hidden /> GitHub
            </a>
          )}
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 transition hover:-translate-y-0.5 hover:text-foreground">
            <Mail className="h-4 w-4" aria-hidden /> Email
          </a>
        </div>
      </div>
    </footer>
  );
}
