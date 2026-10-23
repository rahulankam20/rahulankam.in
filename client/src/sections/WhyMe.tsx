import { KeyRound, MapPin, MessageCircle, ShieldCheck, Smartphone, Sparkles, Zap, type LucideIcon } from "lucide-react";
import { whyMe } from "../content";
import SectionHeading from "../components/SectionHeading";

const icons: Record<string, LucideIcon> = {
  phone: Smartphone,
  key: KeyRound,
  zap: Zap,
  shield: ShieldCheck,
  chat: MessageCircle,
  pin: MapPin,
};

export default function WhyMe() {
  return (
    <section id="why" className="scroll-mt-20 border-t border-border py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow="Why me" title={whyMe.title} />
        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {whyMe.points.map((point) => {
            const Icon = icons[point.icon] ?? Sparkles;
            return (
              <li key={point.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-accent">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-bold">{point.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted-foreground">{point.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
