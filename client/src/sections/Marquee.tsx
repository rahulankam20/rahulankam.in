import { marquee } from "../content";

// An endless strip of what I build. The list is drawn twice so the loop is seamless;
// screen readers only hear the first copy. Hovering pauses it.
export default function Marquee() {
  const items = [...marquee, ...marquee];

  return (
    <section aria-label="What I build" className="border-y border-border bg-card/60 py-5 backdrop-blur">
      <div className="marquee overflow-hidden">
        <ul className="marquee-track">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              aria-hidden={index >= marquee.length || undefined}
              className="flex shrink-0 items-center gap-6 px-6 font-display text-lg font-semibold tracking-tight text-foreground/80 sm:text-xl"
            >
              {item}
              <span aria-hidden className="text-gradient text-base">
                ✦
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
