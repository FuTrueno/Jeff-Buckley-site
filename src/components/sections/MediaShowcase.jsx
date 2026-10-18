import { useState } from "react";
import { Maximize2, Play } from "lucide-react";
import { gallery, videos } from "../../data/media";
import { cn } from "../../lib/utils";
import Lightbox from "../ui/Lightbox";
import Reveal from "../ui/Reveal";
import SectionHeading, { Eyebrow } from "../ui/SectionHeading";
import Button from "../ui/Button";
import { useSectionNav } from "../../hooks/useSectionNav";

const ratioClasses = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
};

function VideoTile({ video, large, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Watch ${video.title}`}
      className="group relative block w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-ink-900 text-left"
    >
      <div className={cn("relative overflow-hidden", large ? "aspect-[4/3] sm:aspect-[16/10]" : "aspect-[16/9]")}>
        <img
          src={video.poster}
          alt=""
          className="h-full w-full object-cover opacity-85 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/5" />

        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full bg-bronze-300/20"
          />
          <span className="relative inline-flex size-14 items-center justify-center rounded-full bg-bronze-300 text-ink-950 shadow-[0_20px_50px_-15px_rgba(200,169,107,0.7)] transition-transform duration-300 group-hover:scale-105">
            <Play className="ml-0.5 size-4" fill="currentColor" strokeWidth={0} />
          </span>
        </span>

        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-950/50 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-mist-200 backdrop-blur-md">
          <Maximize2 className="size-2.5" strokeWidth={2} />
          Watch
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-bronze-300">
          {video.meta}
        </p>
        <h3
          className={cn(
            "mt-2 font-display leading-tight text-ivory-50",
            large ? "text-[1.35rem] sm:text-[1.9rem]" : "text-xl",
          )}
        >
          {video.title}
        </h3>
        {large ? (
          <p className="mt-2 hidden max-w-md text-[13px] leading-relaxed text-mist-300 sm:block">
            {video.blurb}
          </p>
        ) : null}
      </div>
    </button>
  );
}

export default function MediaShowcase() {
  const [videoIndex, setVideoIndex] = useState(null);
  const [imageIndex, setImageIndex] = useState(null);
  const goToSection = useSectionNav();

  const activeVideo = videoIndex === null ? null : videos[videoIndex];
  const activeImage = imageIndex === null ? null : gallery[imageIndex];

  const stepImage = (direction) => {
    setImageIndex((current) => {
      if (current === null) return current;
      return (current + direction + gallery.length) % gallery.length;
    });
  };

  return (
    <section
      id="media"
      className="relative scroll-mt-24 border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 -z-10 size-[460px] rounded-full bg-bronze-600/[0.07] blur-[130px]"
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Watch & look"
          title={
            <>
              The record{" "}
              <span className="italic text-bronze-gradient">in motion.</span>
            </>
          }
          description="One video, a handful of frames. Replace any of these with your own footage and stills — the layout is built around 16:9, 4:5 and 1:1 crops."
          action={
            <Button variant="ghost" onClick={() => goToSection("listen")} withArrow>
              Listen instead
            </Button>
          }
        />

        {/* Video row */}
        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <VideoTile video={videos[0]} large onOpen={() => setVideoIndex(0)} />
          </Reveal>

          <div className="grid gap-4 lg:col-span-5">
            <Reveal delay={0.06}>
              <VideoTile video={videos[1]} onOpen={() => setVideoIndex(1)} />
            </Reveal>

            <Reveal delay={0.12} className="h-full">
              <div className="glass flex h-full flex-col justify-between rounded-[1.5rem] p-6">
                <div>
                  <Eyebrow>Listening note</Eyebrow>
                  <p className="mt-5 font-display text-[1.4rem] leading-snug text-ivory-100">
                    “The best way to approach the album is as a complete listening
                    experience.”
                  </p>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-mist-400">
                    Notice how the arrangements and vocal intensity change from
                    song to song.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4">
                  <span className="font-mono text-[8px] uppercase tracking-[0.24em] text-mist-500">
                    10 tracks · 1994
                  </span>
                  <button
                    type="button"
                    onClick={() => goToSection("listen")}
                    className="group inline-flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.22em] text-bronze-300 transition-colors hover:text-bronze-200"
                  >
                    Listen
                    <Play
                      className="size-2.5 transition-transform group-hover:translate-x-0.5"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-16">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/8 pb-4">
              <h3 className="font-display text-[1.7rem] leading-none text-ivory-100">
                Stills &amp; studies
              </h3>
              <span className="font-mono text-[8.5px] uppercase tracking-[0.26em] text-mist-500">
                {String(gallery.length).padStart(2, "0")} frames · click to open
              </span>
            </div>
          </Reveal>

          <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {gallery.map((item, index) => (
              <div key={item.id} className="mb-4 break-inside-avoid">
                <Reveal delay={(index % 3) * 0.05}>
                  <button
                    type="button"
                    onClick={() => setImageIndex(index)}
                    aria-label={`Open ${item.caption}`}
                    className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-900 text-left"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className={cn(
                        "w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]",
                        ratioClasses[item.ratio] ?? "aspect-[4/3]",
                      )}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-95"
                    />
                    <span className="absolute right-3 top-3 font-mono text-[8px] tracking-[0.2em] text-ivory-100/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                      <span>
                        <span className="block font-display text-lg leading-tight text-ivory-50">
                          {item.caption}
                        </span>
                        <span className="mt-0.5 block font-mono text-[7.5px] uppercase tracking-[0.24em] text-mist-400">
                          {item.detail}
                        </span>
                      </span>
                      <span className="mb-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-white/20 bg-ink-950/40 text-ivory-100 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                        <Maximize2 className="size-3" strokeWidth={1.8} />
                      </span>
                    </span>
                  </button>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        open={videoIndex !== null}
        item={activeVideo ? { ...activeVideo, type: "video" } : null}
        index={0}
        count={1}
        onClose={() => setVideoIndex(null)}
        onPrev={() => {}}
        onNext={() => {}}
      />

      <Lightbox
        open={imageIndex !== null}
        item={activeImage ? { ...activeImage, type: "image" } : null}
        index={imageIndex ?? 0}
        count={gallery.length}
        onClose={() => setImageIndex(null)}
        onPrev={() => stepImage(-1)}
        onNext={() => stepImage(1)}
      />
    </section>
  );
}
