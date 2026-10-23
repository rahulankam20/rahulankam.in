import { site } from "../content";

/** A WhatsApp chat link with a ready-typed message, or "" when no number is set. */
export function whatsappLink(message: string = site.whatsappMessage) {
  return site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}` : "";
}

/** Where a contact button goes: WhatsApp when a number is set, otherwise the contact form. */
export function contactHref(message?: string) {
  return whatsappLink(message) || "#contact";
}

export const isWhatsapp = (href: string) => href.startsWith("https://wa.me/");
