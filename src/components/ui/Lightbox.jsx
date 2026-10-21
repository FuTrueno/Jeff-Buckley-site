import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Lightbox — accessible modal viewer for images and videos.
 * Escape closes, arrow keys navigate, body scroll locks while open, and
 * focus moves to the close button.
 */
export default function Lightbox({ open, item, index = 0, count = 1, onClose, onPrev, onNext }) {
  const closeRef = useRef(null);
  const videoRef = useRef(null);
  const handlers = useRef({ onClose, onPrev, onNext });
  const [videoError, setVideoError] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    handlers.current = { onClose, onPrev, onNext };
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    setVideoError(false);
    setAutoplayBlocked(false);
  }, [item?.id]);

  // Browsers refuse unmuted autoplay until the page has been interacted with.
  // Try anyway, and surface an explicit "play with sound" control if refused.
  useEffect(() => {
    if (!open || item?.type !== "video" || videoError) return undefined;
    const video = videoRef.current;
    if (!video) return undefined;
    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => setAutoplayBlocked(true));
    }
    return undefined;
  }, [open, item?.id, item?.type, videoError]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKey = (event) => {
      if (event.key === "Escape") handlers.current.onClose?.();
      if (event.key === "ArrowRight") handlers.current.onNext?.();
      if (event.key === "ArrowLeft") handlers.current.onPrev?.();
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && item ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-ink-950/92 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          role="dialog"
          aria-modal="true"
          aria-label={item.caption ?? "Media viewer"}
          onClick={onClose}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-mist-400">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-ivory-100 transition-colors hover:border-bronze-500/60 hover:text-bronze-200"
              aria-label="Close viewer"
            >
              <X className="size-4" strokeWidth={1.75} />
            </button>
          </div>

          {/* Stage */}
          <div
            className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16"
            onClick={(event) => event.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="max-h-full w-full max-w-5xl"
              >
                {item.type === "video" ? (
                  videoError ? (
                    <div className="relative mx-auto flex aspect-video w-full max-w-4xl flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-ink-900 text-center">
                      {item.poster ? (
                        <img
                          src={item.poster}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover opacity-25"
                        />
                      ) : null}
                      <div className="relative px-6">
                        <p className="font-display text-2xl text-ivory-50">
                          Video not added yet
                        </p>
                        <p className="mx-auto mt-3 max-w-sm font-mono text-[12px] uppercase leading-relaxed tracking-[0.2em] text-mist-400">
                          Drop the file into <span className="text-bronze-300">public/video</span>{" "}
                          and point <span className="text-bronze-300">src/data/media.js</span> at it.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative mx-auto w-full max-w-4xl">
                      <video
                        ref={videoRef}
                        key={item.src}
                        src={item.src}
                        poster={item.poster}
                        controls
                        autoPlay
                        playsInline
                        preload="metadata"
                        onError={() => setVideoError(true)}
                        onPlay={() => setAutoplayBlocked(false)}
                        className="mx-auto max-h-[72vh] w-full rounded-2xl border border-white/10 bg-black object-contain"
                      />
                      {autoplayBlocked ? (
                        <button
                          type="button"
                          onClick={() => {
                            const video = videoRef.current;
                            if (!video) return;
                            setAutoplayBlocked(false);
                            video.play().catch(() => setAutoplayBlocked(true));
                          }}
                          className="absolute inset-0 grid place-items-center rounded-2xl bg-ink-950/45"
                          aria-label="Play video with sound"
                        >
                          <span className="inline-flex items-center gap-2 rounded-full bg-bronze-300 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.18em] text-ink-950">
                            <Play className="size-3.5" fill="currentColor" strokeWidth={0} />
                            Play with sound
                          </span>
                        </button>
                      ) : null}
                    </div>
                  )
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt ?? ""}
                    className="mx-auto max-h-[72vh] w-auto max-w-full rounded-2xl border border-white/10 object-contain shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {count > 1 ? (
              <>
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous item"
                  className={cn(
                    "absolute left-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full",
                    "border border-white/12 bg-ink-900/70 text-ivory-100 backdrop-blur-md transition-colors",
                    "hover:border-bronze-500/60 hover:text-bronze-200 sm:left-4",
                  )}
                >
                  <ChevronLeft className="size-5" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next item"
                  className={cn(
                    "absolute right-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full",
                    "border border-white/12 bg-ink-900/70 text-ivory-100 backdrop-blur-md transition-colors",
                    "hover:border-bronze-500/60 hover:text-bronze-200 sm:right-4",
                  )}
                >
                  <ChevronRight className="size-5" strokeWidth={1.5} />
                </button>
              </>
            ) : null}
          </div>

          {/* Caption */}
          <div
            className="border-t border-white/8 px-5 py-5 sm:px-8"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="font-display text-xl text-ivory-100">{item.caption}</p>
            {item.detail ? (
              <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.28em] text-mist-400">
                {item.detail}
              </p>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
