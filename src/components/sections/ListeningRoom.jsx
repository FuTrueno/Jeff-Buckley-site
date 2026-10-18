import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { tracks, media } from "../../data/media";
import { cn, formatTime, waveformBars } from "../../lib/utils";
import { useListening } from "../../context/ListeningProvider";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

/** Tiny animated equaliser, shown on the active row. */
function Equalizer({ active }) {
  return (
    <span aria-hidden="true" className="flex h-3.5 items-end gap-[2px]">
      {[0, 1, 2, 3].map((bar) => (
        <span
          key={bar}
          className={cn(
            "w-[2px] rounded-full bg-bronze-300 transition-colors",
            active ? "animate-equalize" : "h-1 bg-mist-500",
          )}
          style={
            active
              ? { height: "100%", animationDelay: `${bar * 0.12}s` }
              : undefined
          }
        />
      ))}
    </span>
  );
}

/** Falls back gracefully when a file has not been dropped into public/audio yet. */
function friendlyName(src) {
  return decodeURIComponent(String(src).split("/").pop() ?? "");
}

export default function ListeningRoom() {
  const { request } = useListening();

  const audioRef = useRef(null);
  const pendingPlay = useRef(false);

  const [currentId, setCurrentId] = useState(tracks[0].id);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState({});

  const current = tracks.find((track) => track.id === currentId) ?? tracks[0];
  const currentIndex = tracks.findIndex((track) => track.id === current.id);
  const hasFailed = Boolean(failed[current.id]);
  const missingFiles = Object.keys(failed).length;

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const attempt = audio.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => {
        setPlaying(false);
        setFailed((previous) => ({ ...previous, [currentId]: true }));
      });
    }
  }, [currentId]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      play();
    } else {
      audio.pause();
    }
  }, [play]);

  const goTo = useCallback(
    (direction) => {
      const nextIndex = (currentIndex + direction + tracks.length) % tracks.length;
      pendingPlay.current = playing || !audioRef.current?.paused;
      setCurrentId(tracks[nextIndex].id);
    },
    [currentIndex, playing],
  );

  const handleEnded = useCallback(() => {
    pendingPlay.current = true;
    setCurrentId(tracks[(currentIndex + 1) % tracks.length].id);
  }, [currentIndex]);

  // Requests coming from the song table / hero CTA.
  useEffect(() => {
    if (!request) return;
    if (request.id === currentId) {
      play();
    } else {
      pendingPlay.current = true;
      setCurrentId(request.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request?.token]);

  // Load a new source whenever the selected track changes.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setProgress(0);
    setDuration(0);
    audio.load();
    if (pendingPlay.current) {
      pendingPlay.current = false;
      const attempt = audio.play();
      if (attempt && typeof attempt.catch === "function") {
        attempt.catch(() => {
          setPlaying(false);
          setFailed((previous) => ({ ...previous, [currentId]: true }));
        });
      }
    }
  }, [currentId]);

  // Stop audio when the section unmounts.
  useEffect(
    () => () => {
      audioRef.current?.pause();
    },
    [],
  );

  const seek = (event) => {
    const audio = audioRef.current;
    const next = Number(event.target.value);
    setProgress(next);
    if (audio && Number.isFinite(next)) audio.currentTime = next;
  };

  const bars = waveformBars(current.id, 64);
  const safeDuration = duration > 0 ? duration : 1;
  const playedRatio = duration > 0 ? Math.min(progress / duration, 1) : 0;

  return (
    <section id="listen" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-bronze-600/10 blur-[130px]"
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Listening room"
          title={
            <>
              Five tracks, in the order{" "}
              <span className="italic text-bronze-gradient">they matter.</span>
            </>
          }
          description="Play the record here, or jump straight to the song you came for. Every file is a placeholder path you can point at your own audio."
          action={
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-mist-500">
              <Equalizer active={playing} />
              <span>{playing ? "Playing" : "Ready"}</span>
            </div>
          }
        />

        <Reveal delay={0.08} blur>
          <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.045] via-white/[0.02] to-transparent p-5 backdrop-blur-xl sm:p-8">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              {/* Current track */}
              <div className="lg:col-span-5">
                <div className="flex items-start gap-5">
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:size-28">
                    <img
                      src={media.cover}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bronze-500">
                      Track {String(currentIndex + 1).padStart(2, "0")} /{" "}
                      {String(tracks.length).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-display text-[26px] leading-[1.1] text-ivory-50 sm:text-[30px]">
                      {current.title}
                    </h3>
                    <p className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-mist-500">
                      {current.meta}
                    </p>
                  </div>
                </div>

                <p className="mt-5 max-w-md text-[13.5px] leading-relaxed text-mist-400">
                  {current.note}
                </p>

                {hasFailed ? (
                  <p className="mt-4 inline-flex items-start gap-2 rounded-xl border border-bronze-500/25 bg-bronze-500/[0.07] px-3 py-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-bronze-300">
                    <span aria-hidden="true" className="mt-0.5 block size-1.5 shrink-0 rounded-full bg-bronze-400" />
                    <span>
                      Add <span className="normal-case tracking-normal">{friendlyName(current.src)}</span> to{" "}
                      <span className="normal-case tracking-normal">public/audio</span>
                    </span>
                  </p>
                ) : null}
              </div>

              {/* Transport + waveform */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => goTo(-1)}
                    aria-label="Previous track"
                    className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-mist-300 transition-colors hover:border-bronze-500/50 hover:text-bronze-200"
                  >
                    <SkipBack className="size-4" strokeWidth={1.6} />
                  </button>

                  <button
                    type="button"
                    onClick={toggle}
                    aria-label={playing ? "Pause" : `Play ${current.title}`}
                    aria-pressed={playing}
                    className="inline-flex size-14 items-center justify-center rounded-full bg-bronze-300 text-ink-950 transition-transform hover:scale-[1.04] hover:bg-bronze-200 active:scale-95"
                  >
                    {playing ? (
                      <Pause className="size-5" fill="currentColor" strokeWidth={0} />
                    ) : (
                      <Play className="ml-0.5 size-5" fill="currentColor" strokeWidth={0} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => goTo(1)}
                    aria-label="Next track"
                    className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-mist-300 transition-colors hover:border-bronze-500/50 hover:text-bronze-200"
                  >
                    <SkipForward className="size-4" strokeWidth={1.6} />
                  </button>

                  <p className="ml-auto font-mono text-[11px] tabular-nums tracking-[0.18em] text-mist-400">
                    {formatTime(progress)}{" "}
                    <span className="text-mist-500">/ {duration > 0 ? formatTime(duration) : current.duration}</span>
                  </p>
                </div>

                {/* Waveform doubles as the seek control */}
                <div className="relative mt-6 h-16 select-none">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 flex items-center gap-[3px]"
                  >
                    {bars.map((height, index) => {
                      const played = index / bars.length <= playedRatio;
                      return (
                        <span
                          key={index}
                          className={cn(
                            "flex-1 rounded-full transition-colors duration-150",
                            played ? "bg-bronze-400/80" : "bg-white/12",
                          )}
                          style={{ height: `${Math.round(height * 100)}%` }}
                        />
                      );
                    })}
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={safeDuration}
                    step="0.1"
                    value={Math.min(progress, safeDuration)}
                    onChange={seek}
                    aria-label={`Seek within ${current.title}`}
                    className="seek absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-mist-500">
                    {current.meta}
                  </p>
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-mist-500">
                    Grace · 1994
                  </p>
                </div>
              </div>
            </div>

            {/* Track list */}
            <div className="mt-8 border-t border-white/8 pt-2">
              {tracks.map((track, index) => {
                const isActive = track.id === current.id;
                const isMissing = Boolean(failed[track.id]);
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => {
                      if (track.id === current.id) {
                        toggle();
                      } else {
                        pendingPlay.current = true;
                        setCurrentId(track.id);
                      }
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group/row flex w-full items-center gap-4 rounded-xl border-l-2 px-3 py-3.5 text-left transition-colors sm:gap-6 sm:px-4",
                      isActive
                        ? "border-bronze-500 bg-white/[0.035]"
                        : "border-transparent hover:border-white/15 hover:bg-white/[0.02]",
                    )}
                  >
                    <span
                      className={cn(
                        "w-5 shrink-0 font-mono text-[10px] tabular-nums tracking-[0.12em]",
                        isActive ? "text-bronze-400" : "text-mist-500",
                      )}
                    >
                      {isActive && playing ? (
                        <Equalizer active />
                      ) : (
                        String(index + 1).padStart(2, "0")
                      )}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block truncate font-display text-lg leading-tight transition-colors",
                          isActive ? "text-ivory-50" : "text-mist-200 group-hover/row:text-ivory-100",
                        )}
                      >
                        {track.title}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-mist-500">
                        {isMissing ? "Audio file not added yet" : track.meta}
                      </span>
                    </span>

                    <span className="hidden max-w-[300px] truncate text-[12px] text-mist-500 xl:block">
                      {track.note}
                    </span>

                    <span className="w-10 shrink-0 text-right font-mono text-[11px] tabular-nums text-mist-500">
                      {track.duration}
                    </span>

                    <span
                      aria-hidden="true"
                      className={cn(
                        "inline-flex size-8 shrink-0 items-center justify-center rounded-full border transition-all",
                        isActive
                          ? "border-bronze-500/50 bg-bronze-500/15 text-bronze-200"
                          : "border-white/10 text-mist-400 opacity-0 group-hover/row:opacity-100 group-focus-visible/row:opacity-100",
                      )}
                    >
                      {isActive && playing ? (
                        <Pause className="size-3.5" fill="currentColor" strokeWidth={0} />
                      ) : (
                        <Play className="ml-0.5 size-3.5" fill="currentColor" strokeWidth={0} />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {missingFiles > 0 ? (
              <p className="mt-4 border-t border-white/8 pt-4 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.2em] text-mist-500">
                {missingFiles} of {tracks.length} files not found — audio is loaded from{" "}
                <span className="text-mist-400">public/audio/</span>. Paths live in{" "}
                <span className="text-mist-400">src/data/media.js</span>.
              </p>
            ) : null}
          </div>
        </Reveal>

        <audio
          ref={audioRef}
          src={current.src}
          preload="metadata"
          onLoadedMetadata={(event) => {
            const value = event.currentTarget.duration;
            setDuration(Number.isFinite(value) ? value : 0);
            setFailed((previous) => {
              if (!previous[current.id]) return previous;
              const next = { ...previous };
              delete next[current.id];
              return next;
            });
          }}
          onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={handleEnded}
          onError={() =>
            setFailed((previous) => ({ ...previous, [current.id]: true }))
          }
          className="hidden"
        />
      </div>
    </section>
  );
}
