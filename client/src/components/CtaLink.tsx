import type { ReactNode } from "react";

const variants = {
  primary: "bg-primary text-primary-foreground hover:brightness-95",
  secondary: "border border-border bg-card text-foreground hover:bg-muted",
  whatsapp: "bg-whatsapp text-[#08291a] hover:brightness-95",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
};

/** A button-styled link; links to other sites open in a new tab. */
export default function CtaLink({ href, children, variant = "primary", className = "" }: Props) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
