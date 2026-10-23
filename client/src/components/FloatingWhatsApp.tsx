import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { site } from "../content";
import { whatsappLink } from "../lib/links";

// Appears once the visitor scrolls past the hero, which has its own WhatsApp button.
export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const href = whatsappLink();

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 600);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${site.name} on WhatsApp`}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-[#08291a] shadow-lg shadow-black/25 transition duration-300 hover:scale-105 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <SiWhatsapp className="h-7 w-7" aria-hidden />
    </a>
  );
}
