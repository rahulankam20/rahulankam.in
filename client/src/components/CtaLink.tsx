import type { ReactNode } from "react";

const variants = {
  primary:
    "btn-shine bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/35",
  secondary:
    "border border-border bg-card/80 text-foreground backdrop-blur hover:-translate-y-0.5 hover:border-primary/60 hover:bg-card",
  whatsapp:
    "btn-shine bg-whatsapp text-whatsapp-foreground shadow-lg shadow-whatsapp/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-whatsapp/35",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  /** Repeat the light sweep every few seconds, to draw the eye. */
  autoShine?: boolean;
};

/** A button-styled link; links to other sites open in a new tab. */
export default function CtaLink({ href, children, variant = "primary", className = "", autoShine = false }: Props) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition duration-300 ${variants[variant]} ${autoShine ? "btn-shine-auto" : ""} ${className}`}
    >
      {children}
    </a>
  );
}
