import { useEffect, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { Play, X } from "lucide-react";
import { hero, site } from "../content";
import { imageUrl } from "../lib/images";

/**
 * The "Watch the intro" button and its player. The video element exists only
 * while the player is open, so the page loads nothing for it until the button
 * is pressed. Without JavaScript the button is a plain link to the file.
 * The player is rendered on the body: the hero's entrance animation leaves a
 * transform on the button row, which would otherwise hold a fixed dialog in place.
 */
export default function IntroVideo() {
  const video = hero.video;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  if (!site.showServices || !video.src) return null;

  const show = (event: MouseEvent) => {
    event.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <a
        href={video.src}
        onClick={show}
        className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-border bg-card/90 px-5 py-3 text-sm font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-card"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/25 text-accent transition-transform duration-300 group-hover:scale-110">
          <Play className="ml-0.5 h-3 w-3 fill-current" aria-hidden />
        </span>
        {video.label}
      </a>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={video.title}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setOpen(false)}
          >
            <div
              className="load-zoom relative w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <video
                controls
                autoPlay
                playsInline
                preload="metadata"
                poster={imageUrl(video.poster)}
                src={video.src}
                width={video.width}
                height={video.height}
                className="aspect-video w-full rounded-2xl bg-black shadow-2xl shadow-black/50"
              >
                <a href={video.src}>Download the video</a>
              </video>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close the video"
                className="absolute -right-2 -top-12 flex h-10 w-10 items-center justify-center rounded-full bg-card text-foreground shadow-lg transition hover:scale-110 sm:-right-12 sm:-top-2"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
