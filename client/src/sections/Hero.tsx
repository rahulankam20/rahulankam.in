import { Fragment, type CSSProperties } from "react";
import { ArrowRight, IndianRupee, Receipt } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { hero, site } from "../content";
import { imageSizes, imageSrcSet, imageUrl } from "../lib/images";
import { contactHref, isWhatsapp } from "../lib/links";
import { loadDelay, motionVars, Tilt } from "../lib/motion";
import CtaLink from "../components/CtaLink";
import IntroVideo from "../components/IntroVideo";

const badgeIcons = [IndianRupee, Receipt];

export default function Hero() {
  const services = site.showServices;
  const primaryHref = services ? contactHref() : "#contact";
  const words = (services ? hero.title : hero.portfolioTitle).split(" ");
  const desktop = hero.image;
  const phone = hero.phoneImage;
  const showVideo = services && Boolean(hero.video.src);

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* The backdrop drifts at three depths as the hero scrolls away: the dots
          barely, the glows faster, one of them against the scroll. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-drift absolute inset-0" style={motionVars({ dy: "4rem" })}>
          <div className="dot-grid absolute inset-0" />
        </div>
        <div
          className="blob hero-drift -left-40 -top-48 h-[34rem] w-[34rem] bg-[radial-gradient(circle,hsl(var(--glow)/0.32),transparent_65%)]"
          style={motionVars({ dx: "3rem", dy: "-10rem" })}
        />
        <div
          className="blob hero-drift -right-48 top-10 h-[38rem] w-[38rem] bg-[radial-gradient(circle,hsl(var(--grad-to)/0.16),transparent_65%)]"
          style={motionVars({ dx: "-4rem", dy: "-16rem" })}
        />
        <div
          className="blob hero-drift -bottom-64 left-1/3 h-[32rem] w-[32rem] bg-[radial-gradient(circle,hsl(var(--grad-via)/0.22),transparent_65%)]"
          style={motionVars({ dy: "6rem" })}
        />
      </div>

      <div className="container-page grid items-center gap-14 pb-16 pt-12 sm:pt-16 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1.05fr_1fr] lg:py-12">
        <div>
          <p
            className="load-in inline-flex items-center gap-2.5 rounded-full border border-border bg-card/90 px-3.5 py-1.5 text-xs font-semibold text-accent shadow-sm sm:text-sm"
            style={loadDelay(0)}
          >
            <span
              aria-hidden
              className="live-dot relative h-2 w-2 shrink-0 rounded-full bg-whatsapp"
            />
            {hero.eyebrow}
          </p>

          <h1 className="mt-6 text-[2.55rem] font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            {words.map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                <span className="word-mask">
                  <span
                    className="word-in"
                    style={{ "--i": index } as CSSProperties}
                  >
                    {services && word === hero.titleHighlight ? (
                      <span className="text-gradient">{word}</span>
                    ) : (
                      word
                    )}
                  </span>
                </span>
                {index < words.length - 1 && " "}
              </Fragment>
            ))}
          </h1>

          <p
            className="load-in mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
            style={loadDelay(300)}
          >
            {services ? hero.subtitle : hero.portfolioSubtitle}
          </p>

          <div
            className="load-in mt-8 flex flex-wrap gap-3"
            style={loadDelay(400)}
          >
            <CtaLink
              href={primaryHref}
              variant={isWhatsapp(primaryHref) ? "whatsapp" : "primary"}
              autoShine
            >
              {isWhatsapp(primaryHref) && (
                <SiWhatsapp className="h-4 w-4" aria-hidden />
              )}
              {services ? hero.primaryCta : "Get in touch"}
            </CtaLink>
            <CtaLink href="#work" variant="secondary">
              {hero.secondaryCta}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </CtaLink>
          </div>

          {services && (
            <ul className="tick-list tick-list-tight mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-sm font-medium text-muted-foreground">
              {hero.points.map((point, index) => (
                <li
                  key={point}
                  className="load-in"
                  style={loadDelay(500 + index * 80)}
                >
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Three boxes, one transform each: the entrance, the scroll (the card
            leans back as it leaves), and the lean towards the pointer. */}
        <div
          className="load-zoom relative mx-2 mb-8 sm:mx-6 lg:mx-0"
          style={loadDelay(150)}
        >
          <div className="hero-recede">
          <Tilt>
            {showVideo ? (
              <IntroVideo />
            ) : (
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/20">
                <div
                  className="flex items-center gap-1.5 border-b border-border px-3 py-2"
                  aria-hidden
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-3 rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    Online store demo
                  </span>
                </div>
                <img
                  src={imageUrl(desktop.src)}
                  srcSet={imageSrcSet(desktop.src, desktop.width)}
                  sizes={imageSizes.heroScreen}
                  alt={desktop.alt}
                  width={desktop.width}
                  height={desktop.height}
                  fetchPriority="high"
                  className="block h-auto w-full"
                />
              </div>
            )}

            {!showVideo && (
              <div className="absolute -bottom-8 -right-3 w-[25%] max-w-[150px] [transform:translateZ(60px)] sm:-right-6">
                <div className="overflow-hidden rounded-[1.2rem] border-[5px] border-neutral-900 bg-card shadow-2xl shadow-black/30">
                  <img
                    src={imageUrl(phone.src)}
                    srcSet={imageSrcSet(phone.src, phone.width)}
                    sizes={imageSizes.heroPhone}
                    alt={phone.alt}
                    width={phone.width}
                    height={phone.height}
                    className="block h-auto w-full"
                  />
                </div>
              </div>
            )}

            {services &&
              hero.badges.map((badge, index) => {
                const Icon = badgeIcons[index % badgeIcons.length];
                return (
                  <div
                    key={badge}
                    className={`absolute hidden [transform:translateZ(40px)] sm:block ${index === 0 ? (showVideo ? "-right-4 top-[16%]" : "-left-6 top-[24%]") : "-bottom-5 left-[8%]"}`}
                  >
                    {/* Nearer the viewer than the card, so they drift off it faster. */}
                    <div className="badge-depth" style={motionVars({ dy: index === 0 ? "-5rem" : "-2.5rem" })}>
                      <div
                        className="load-in flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold shadow-xl"
                        style={loadDelay(700 + index * 120)}
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/20 text-accent">
                          <Icon className="h-3.5 w-3.5" aria-hidden />
                        </span>
                        {badge}
                      </div>
                    </div>
                  </div>
                );
              })}
          </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}
