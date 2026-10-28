import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/** Staggers a scroll reveal: the nth item starts n × step ms after the first. */
export const revealDelay = (index: number, step = 90) =>
  ({ "--reveal-delay": `${index * step}ms` }) as CSSProperties;

/** Delays an on-load animation (.load-in, .load-zoom) by `ms`. */
export const loadDelay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Sets the custom properties a CSS animation reads, such as --dy for .hero-drift. */
export const motionVars = (vars: Record<string, string | number>) =>
  Object.fromEntries(Object.entries(vars).map(([key, value]) => [`--${key}`, String(value)])) as CSSProperties;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Scroll-triggered reveals for every [data-reveal] element. Runs once the app
 * is live: what is already on screen stays as it is; everything further down
 * is hidden (.reveal-pending) and, as it scrolls into view, gets .reveal-in,
 * which plays its keyframe once (index.css, "Motion"). The class comes off
 * when the keyframe ends, so hover effects work as usual afterwards. If
 * JavaScript never runs, or the visitor prefers less motion, nothing is hidden.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (reducedMotion() || !("IntersectionObserver" in window)) return;
    const fold = window.innerHeight * 0.92;
    const pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
      (el) => el.getBoundingClientRect().top > fold,
    );
    if (!pending.length) return;

    pending.forEach((el) => el.classList.add("reveal-pending"));
    const done = (event: AnimationEvent) => {
      if (event.target === event.currentTarget) (event.currentTarget as HTMLElement).classList.remove("reveal-in");
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          el.addEventListener("animationend", done);
          el.classList.replace("reveal-pending", "reveal-in");
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    pending.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      pending.forEach((el) => {
        el.removeEventListener("animationend", done);
        el.classList.remove("reveal-pending", "reveal-in");
      });
    };
  }, []);
}

/**
 * A number that counts up from zero when it scrolls into view. The page is
 * rendered with the final number, so it is right without JavaScript too.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || value === 0 || reducedMotion() || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen
    setShown(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 1400);
          setShown(Math.round(value * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  // The final digits sit underneath, invisible, so the digits' box is their
  // final width from the start and the suffix after them never moves while the
  // count runs (no layout shift). Tabular figures keep every digit the same
  // width, so no number on the way up is wider than the last.
  return (
    <span ref={ref} className={className}>
      {prefix}
      <span className="inline-grid tabular-nums">
        <span aria-hidden className="invisible col-start-1 row-start-1">
          {value.toLocaleString("en-IN")}
        </span>
        <span className="col-start-1 row-start-1">{shown.toLocaleString("en-IN")}</span>
      </span>
      {suffix}
    </span>
  );
}

/** Leans its content towards the mouse pointer (desktop only, never with reduced motion). */
export function Tilt({ children, className = "", max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);

  return (
    <div ref={ref} className={`tilt ${className}`}>
      {children}
    </div>
  );
}
