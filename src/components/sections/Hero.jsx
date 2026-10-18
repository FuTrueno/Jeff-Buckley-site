import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { heroRotating, stats } from "../../data/site";
import { media, tracks } from "../../data/media";
import { useListening } from "../../context/ListeningProvider";
import { useSectionNav } from "../../hooks/useSectionNav";
import Button from "../ui/Button";
import BorderBeam from "../ui/BorderBeam";
import DotGrid from "../ui/DotGrid";
import Particles from "../ui/Particles";
import RotatingText from "../ui/RotatingText";
import SplitText from "../ui/SplitText";
import TiltCard from "../ui/TiltCard";

/** Three animated bars, used on the floating "now playing" chip. */
function MiniEqualizer() {
  return (
    <span aria-hidden="true" className="flex h-4 items-end gap-[2px]">
      {[0, 1, 2, 3].map((bar) => (
        <span
          key={bar}
          className="h-full w-[2px] animate-equalize rounded-full bg-bronze-300"
          style={{ animationDelay: `${bar * 0.14}s` }}
        />
      ))}
    </span>
  );
}

export default function Hero() {
  const [videoReady, setVideoReady] = useState(false);
  const { playTrack } = useListening();
  const goToSection = useSectionNav();

  const playGrace = () => {
    playTrack("grace");
    goToSection("listen");
  };

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[76px]">
      {/* ---------- Background media ---------- */}
      <div aria-hidden="true" className="absolute inset-0">
        {/* Poster still: always visible, so the hero never flashes empty */}
        <img
          src={media.heroPoster}
          alt=""
          className="h-full w-full object-cover object-center opacity-55 animate-ken-burns"
        />

        {/* Hero loop. Swap the file in src/data/media.js — the still below
            keeps the composition intact if the video is missing. */}
        <video
          src={media.heroVideo}
          poster={media.heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ${
            videoReady ? "opacity-60" : "opacity-0"
          }`}
        />

        {/* Grade + scrims */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/55 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/75 to-ink-950/10" />
        <div className="absolute -right-40 -top-40 size-[620px] rounded-full bg-bronze-500/[0.12] blur-[140px]" />
        <div className="absolute -left-40 bottom-0 size-[520px] rounded-full bg-steel-500/[0.12] blur-[150px]" />
      </div>

      <DotGrid className="opacity-70" cell={30} opacity={0.32} />
      <Particles className="opacity-80" />

      {/* ---------- Content ---------- */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.28em] text-mist-300 backdrop-blur-md">
                <span className="relative flex size-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-bronze-400/70" />
                  <span className="relative size-1.5 rounded-full bg-bronze-400" />
                </span>
                The Grace archive
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-mist-500">
                Est. 1994 · Columbia
              </span>
            </div>

            <h1 className="mt-8 font-display text-[clamp(3.1rem,7vw,6.4rem)] font-light leading-[0.92] tracking-[-0.02em] text-ivory-50">
              <span className="block">
                <SplitText trigger="mount" text="A voice that" delay={0.15} />
              </span>
              <span className="block">
                <SplitText trigger="mount" text="still" delay={0.4} />{" "}
                <motion.span
                  className="inline-block italic text-bronze-gradient"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                >
                  feels close.
                </motion.span>
              </span>
            </h1>

            <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.3em] text-mist-500">
                Jeff Buckley —
              </span>
              <RotatingText
                items={heroRotating}
                className="font-mono text-[10px] uppercase tracking-[0.26em] text-bronze-300"
                interval={2800}
              />
            </div>

            <p className="mt-7 max-w-lg text-[15px] leading-[1.8] text-mist-300">
              He made one completed studio album. Three decades on,{" "}
              <em className="not-italic text-ivory-100">Grace</em> still sounds like someone
              singing in the same room — intimate, unhurried, and completely
              unguarded.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button onClick={() => goToSection("story")} withArrow>
                Enter the archive
              </Button>
              <Button variant="ghost" onClick={playGrace}>
                <Play
                  aria-hidden="true"
                  className="mr-0.5 size-3.5"
                  fill="currentColor"
                  strokeWidth={0}
                />
                Play Grace
              </Button>
            </div>
          </div>

          {/* Album card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[360px] lg:ml-auto lg:mr-0">
              <div
                aria-hidden="true"
                className="absolute -inset-8 rounded-full bg-bronze-500/15 blur-[70px]"
              />

              <TiltCard intensity={7} className="relative">
                <BorderBeam radius="rounded-[1.7rem]" duration={9}>
                  <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-ink-900 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)]">
                    <img
                      src={media.cover}
                      alt="The Grace album sleeve — Jeff Buckley with a microphone"
                      className="aspect-square w-full object-cover"
                      width="316"
                      height="316"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/65 via-transparent to-transparent" />
                    <div className="pointer-events-none absolute inset-0 grain opacity-[0.18] mix-blend-overlay" />
                    <p className="absolute left-5 top-5 font-mono text-[8px] uppercase tracking-[0.32em] text-bronze-200/90">
                      Grace · 1994
                    </p>
                  </div>
                </BorderBeam>
              </TiltCard>

              {/* Floating chips */}
              <div className="absolute -right-3 top-6 hidden animate-float rounded-full border border-white/10 bg-ink-900/70 px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-mist-300 backdrop-blur-md sm:block">
                33⅓ rpm
              </div>

              <button
                type="button"
                onClick={playGrace}
                className="group absolute -bottom-9 left-3 flex max-w-[270px] items-center gap-3 rounded-2xl border border-white/12 bg-ink-900/85 p-3 pr-5 text-left backdrop-blur-xl transition-colors hover:border-bronze-500/45 sm:-left-5"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-bronze-300/10 text-bronze-200">
                  <MiniEqualizer />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[8px] uppercase tracking-[0.26em] text-mist-500">
                    Now playing
                  </span>
                  <span className="mt-1 block truncate text-[12.5px] text-ivory-100">
                    Grace
                  </span>
                  <span className="block text-[10px] text-mist-500">
                    {tracks[0].duration} · track 01
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Stats ---------- */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-8 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8 border-t border-white/[0.07] pt-6">
          <dl className="grid w-full grid-cols-2 gap-x-6 gap-y-5 sm:w-auto sm:grid-cols-4 sm:gap-x-12">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-mist-500">
                  {stat.label}
                </dt>
                <dd className="mt-1.5 font-display text-[1.35rem] leading-none text-ivory-100">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="hidden items-center gap-3 lg:flex">
            <span className="font-mono text-[8.5px] uppercase tracking-[0.3em] text-mist-500">
              Scroll
            </span>
            <span className="relative block h-10 w-px overflow-hidden bg-white/10">
              <span className="absolute inset-x-0 top-0 block h-4 animate-scroll-cue bg-bronze-400" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
