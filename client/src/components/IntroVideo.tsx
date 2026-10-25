import { useEffect, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { Play, X } from "lucide-react";
import { hero, site } from "../content";
import { imageSizes, imageSrcSet, imageUrl } from "../lib/images";

/**
 * The hero's video card: the intro's opening frame with a pulsing play button,
 * and the player it opens. The video element exists only while the player is
 * open, so the page loads nothing for it until the card is pressed. Without
 * JavaScript the card is a plain link to the file. The player is rendered on
 * the body: the hero's animations leave transforms on their elements, which
 * would otherwise hold a fixed dialog in place.
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
        aria-label={`${video.label} (video, 1 minute)`}
        className="group relative block overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/20"
      >
        <img
          src={imageUrl(video.poster)}
          srcSet={imageSrcSet(video.poster, video.width)}
          sizes={imageSizes.heroScreen}
          alt={video.posterAlt}
          width={video.width}
          height={video.height}
          fetchPriority="high"
          className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <span className="absolute inset-y-0 left-0 flex w-[46%] flex-col items-start justify-center gap-2 p-[6%] sm:gap-3">
          <span className="play-pulse relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40 transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16 lg:h-[4.5rem] lg:w-[4.5rem]">
            <Play
              className="relative ml-0.5 h-5 w-5 fill-current sm:h-7 sm:w-7"
              aria-hidden
            />
          </span>
          <span className="font-display text-[clamp(0.95rem,3.3vw,1.6rem)] font-extrabold leading-[1.1] tracking-tight text-foreground lg:text-[1.55rem]">
            {video.label}
          </span>
          <span className="text-[11px] font-medium leading-snug text-muted-foreground sm:text-sm">
            {video.tagline}
          </span>
        </span>
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
