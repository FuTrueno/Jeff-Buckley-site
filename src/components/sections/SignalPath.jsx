import { useRef } from "react";
import { Headphones, User } from "lucide-react";
import { media } from "../../data/media";
import { AnimatedBeam } from "../magicui/animated-beam";
import { AnimatedShinyText } from "../magicui/animated-shiny-text";
import { NumberTicker } from "../magicui/number-ticker";
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze-600/[0.06] blur-[140px]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:pr-6">
            <AnimatedShinyText className="inline-flex items-center font-mono text-[12px] uppercase tracking-[0.32em] text-bronze-300">
              Signal path
            </AnimatedShinyText>

            <Reveal delay={0.05} blur>
              <h2 className="mt-6 font-display text-[clamp(2.3rem,4.2vw,3.6rem)] leading-[1.02] tracking-[-0.015em] text-ivory-50">
                From the sleeve{" "}
                <span className="italic text-bronze-gradient">to your ears.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-mist-300">
                A record only becomes a record when it reaches someone. This is the
                path Grace takes — an object, a signal, a room, a listener.
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
                    <dt className="mt-2 font-mono text-[12px] uppercase leading-relaxed tracking-[0.16em] text-mist-400">
                      {fact.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div
              ref={containerRef}
              aria-hidden="true"
              className="relative h-[320px] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.035] to-transparent sm:h-[380px]"
            >
              <div className="absolute inset-x-6 top-1/2 flex -translate-y-1/2 items-start justify-between sm:inset-x-12">
                <div className="flex flex-col items-center gap-3">
                  <div
                    ref={albumRef}
                    className="size-16 overflow-hidden rounded-full border border-white/15 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] sm:size-20"
                  >
                    <img src={media.cover} alt="" className="size-full object-cover" />
                  </div>
                  <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-mist-400">
                    Grace
                  </span>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div
                    ref={voiceRef}
                    className="grid size-20 place-items-center rounded-full border border-bronze-500/40 bg-ink-900 text-bronze-200 shadow-[0_0_50px_-8px_rgba(200,169,107,0.45)] sm:size-24"
                  >
                    <Headphones className="size-7" strokeWidth={1.4} />
                  </div>
                  <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-mist-400">
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
                  <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-mist-400">
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
                duration={5}
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
                duration={6}
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
                pathOpacity={0.2}
                gradientStartColor="#e9d3a7"
                gradientStopColor="#65748b"
                duration={8}
                delay={0.6}
                reverse
              />

              <p className="absolute bottom-5 left-6 font-mono text-[12px] uppercase tracking-[0.2em] text-mist-400 sm:left-12">
                Audio signal · 1994 → now
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
