import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Staggers a scroll reveal: the nth item starts its reveal a little further
 * into its entrance (about 1% of the screen per 12 ms of `step`), so a row
 * comes in one after another as it scrolls up. The reveals themselves are CSS
 * scroll-driven animations (index.css, "Motion").
 */
export const revealDelay = (index: number, step = 90) =>
  ({ "--reveal-shift": `${Math.round((index * step) / 12)}%` }) as CSSProperties;

/** Delays an on-load animation (.load-in, .load-zoom) by `ms`. */
export const loadDelay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Sets the custom properties an element's CSS animation reads, such as --dy for .hero-drift. */
export const motionVars = (vars: Record<string, string | number>) =>
  Object.fromEntries(Object.entries(vars).map(([key, value]) => [`--${key}`, String(value)])) as CSSProperties;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
