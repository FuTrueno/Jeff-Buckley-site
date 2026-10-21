import { useRef } from "react";
import { Disc3, Headphones, User } from "lucide-react";
import { media, tracks } from "../../data/media";
import { AnimatedBeam } from "../magicui/animated-beam";
import { AnimatedShinyText } from "../magicui/animated-shiny-text";
import { DotPattern } from "../magicui/dot-pattern";
import { NumberTicker } from "../magicui/number-ticker";
import { OrbitingCircles } from "../magicui/orbiting-circles";
import Reveal from "../ui/Reveal";

const facts = [
  { value: 10, label: "Tracks on Grace" },
  { value: 5, label: "In rotation" },
  { staticValue: "1994", label: "Released" },
];

export default function SignalPath() {
  const containerRef = useRef(null);
  const albumRef = useRef(null);
  const voiceRef = useRef(null);
  const listenerRef = useRef(null);

  return (
    <section
      id="signal"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/[0.06] py-24 sm:py-32"
    >
      <DotPattern
        width={26}
        height={26}
        cr={1}
        className="text-bronze-300/[0.10] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,#000_20%,transparent_80%)] motion-reduce:hidden"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <div className="lg:col-span-5 lg:pr-8">
            <AnimatedShinyText className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.42em] text-bronze-300">
              Signal path
            </AnimatedShinyText>

            <Reveal delay={0.05} blur>
              <h2 className="mt-6 font-display text-[clamp(2.3rem,4.2vw,3.6rem)] leading-[1.02] tracking-[-0.015em] text-ivory-50">
                From the sleeve{" "}
                <span className="italic text-bronze-gradient">to your ears.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-mist-400">
                A record only becomes a record when it reaches someone. This is the
                path Grace takes — an object, a signal, a room, a listener — and
                the five tracks that keep making the trip.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/8 pt-6">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dd className="font-display text-[1.9rem] leading-none text-ivory-50">
                      {fact.staticValue ? (
                        fact.staticValue
                      ) : (
                        <NumberTicker value={fact.value} delay={0.1} />
                      )}
                    </dd>
                    <dt className="mt-2 font-mono text-[8px] uppercase leading-relaxed tracking-[0.2em] text-mist-500">
                      {fact.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Beam panel */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div
              ref={containerRef}
              aria-hidden="true"
              className="relative h-[300px] overflow-hidden rounded-[2rem] motion-reduce:[&>svg]:hidden border border-white/10 bg-gradient-to-b from-white/[0.035] to-transparent sm:h-[340px]"
            >
              <div className="absolute inset-x-6 top-1/2 flex -translate-y-1/2 items-start justify-between sm:inset-x-10">
                <div className="flex flex-col items-center gap-3">
                  <div
                    ref={albumRef}
                    className="size-16 overflow-hidden rounded-full border border-white/15 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] sm:size-20"
                  >
                    <img src={media.cover} alt="" className="size-full object-cover" />
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-mist-500">
                    Grace
                  </span>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div
                    ref={voiceRef}
                    className="grid size-20 place-items-center rounded-full border border-bronze-500/40 bg-ink-900 text-bronze-200 shadow-[0_0_50px_-8px_rgba(200,169,107,0.5)] sm:size-24"
                  >
                    <Headphones className="size-7" strokeWidth={1.4} />
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-mist-500">
                    The voice
                  </span>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div
                    ref={listenerRef}
                    className="grid size-16 place-items-center rounded-full border border-white/15 bg-ink-900 text-mist-300 sm:size-20"
                  >
                    <User className="size-6" strokeWidth={1.4} />
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-mist-500">
                    You
                  </span>
                </div>
              </div>

              <AnimatedBeam
                containerRef={containerRef}
                fromRef={albumRef}
                toRef={voiceRef}
                pathColor="#c8a96b"
                pathOpacity={0.38}
                gradientStartColor="#f6e9cd"
                gradientStopColor="#c8a96b"
                duration={4.6}
                startXOffset={18}
                endXOffset={-18}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={voiceRef}
                toRef={listenerRef}
                pathColor="#8b9bb0"
                pathOpacity={0.32}
                gradientStartColor="#e9d3a7"
                gradientStopColor="#8b9bb0"
                duration={5.4}
                delay={1.1}
                startXOffset={-16}
                endXOffset={16}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={albumRef}
                toRef={listenerRef}
                curvature={70}
                pathColor="#c8a96b"
                pathOpacity={0.22}
                gradientStartColor="#e9d3a7"
                gradientStopColor="#65748b"
                duration={7}
                delay={0.6}
                reverse
              />

              <p className="absolute bottom-5 left-6 font-mono text-[8px] uppercase tracking-[0.24em] text-mist-500 sm:left-10">
                Audio signal · 1994 → now
              </p>
            </div>
          </Reveal>
        </div>

        {/* Orbit panel */}
        <Reveal delay={0.15}>
          <div className="mt-6 grid items-center gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.015] p-6 sm:p-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="font-mono text-[8.5px] uppercase tracking-[0.28em] text-bronze-400">
                Five tracks in orbit
              </p>
              <h3 className="mt-4 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight text-ivory-50">
                Every listen moves the record somewhere new.
              </h3>
              <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-mist-400">
                The same five songs, circling a different listener each time. Pick
                one and it drops straight into the listening room.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {tracks.map((track, index) => (
                  <span
                    key={track.id}
                    className="rounded-full border border-white/10 bg-ink-900/60 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-mist-400"
                  >
                    {String(index + 1).padStart(2, "0")} · {track.title}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative flex h-[320px] w-full items-center justify-center overflow-hidden sm:h-[360px] lg:w-[360px]">
              <div className="relative z-10 grid size-24 place-items-center overflow-hidden rounded-full border border-bronze-500/30 bg-ink-900 shadow-[0_0_60px_-10px_rgba(200,169,107,0.45)]">
                <img src={media.cover} alt="" className="size-full object-cover" />
                <span className="absolute inset-0 grid place-items-center bg-ink-950/35">
                  <Disc3 className="size-6 text-bronze-200/80" strokeWidth={1.3} />
                </span>
              </div>

              <OrbitingCircles radius={132} duration={38} iconSize={46} path>
                {tracks.map((track, index) => (
                  <span
                    key={track.id}
                    title={track.title}
                    className="grid size-11 place-items-center rounded-full border border-white/12 bg-ink-900/90 font-mono text-[9px] tabular-nums text-bronze-200 backdrop-blur-md"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                ))}
              </OrbitingCircles>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
