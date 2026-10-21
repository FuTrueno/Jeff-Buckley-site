import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { heroRotating, stats } from "../../data/site";
import { media, tracks } from "../../data/media";
import { useListening } from "../../context/ListeningProvider";
import { useSectionNav } from "../../hooks/useSectionNav";
import { AnimatedShinyText } from "../magicui/animated-shiny-text";
import { AuroraText } from "../magicui/aurora-text";
import { BorderBeam } from "../magicui/border-beam";
import { LightRays } from "../magicui/light-rays";
import { Meteors } from "../magicui/meteors";
import { ShimmerButton } from "../magicui/shimmer-button";
import BlurText from "../reactbits/BlurText";
import Magnet from "../reactbits/Magnet";
import StarBorder from "../reactbits/StarBorder";
import DotGrid from "../ui/DotGrid";
import Particles from "../ui/Particles";
import RotatingText from "../ui/RotatingText";
import SplitText from "../ui/SplitText";
import TiltCard from "../ui/TiltCard";

/** Small animated bars for the floating now-playing chip. */
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
        <img
          src={media.heroPoster}
          alt=""
          className="h-full w-full animate-ken-burns object-cover object-center opacity-55"
        />

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

        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/55 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/75 to-ink-950/10" />
        <div className="absolute -right-40 -top-40 size-[620px] rounded-full bg-bronze-500/[0.12] blur-[140px]" />
        <div className="absolute -left-40 bottom-0 size-[520px] rounded-full bg-steel-500/[0.12] blur-[150px]" />
      </div>

      {/* Magic UI light rays + meteors, layered above the photo, below copy */}
      <LightRays
        count={5}
        color="rgba(233, 211, 167, 0.16)"
        blur={44}
        speed={18}
        length="82vh"
        className="opacity-80 motion-reduce:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden motion-reduce:hidden"
      >
        <Meteors number={8} angle={215} className="opacity-40" />
      </div>

      <DotGrid className="opacity-70" cell={30} opacity={0.32} />
      <Particles className="opacity-70" />

      {/* ---------- Content ---------- */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.28em] backdrop-blur-md">
                <span className="relative flex size-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-bronze-400/70" />
                  <span className="relative size-1.5 rounded-full bg-bronze-400" />
                </span>
                <AnimatedShinyText className="text-[9px] uppercase tracking-[0.28em] text-mist-300">
                  The Grace archive
                </AnimatedShinyText>
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
                <AuroraText
                  speed={0.6}
                  colors={["#f6e9cd", "#e9d3a7", "#c8a96b", "#8f7448"]}
                  className="italic"
                >
                  feels close.
                </AuroraText>
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

            <BlurText
              text="He made one completed studio album. Three decades on, Grace still sounds like someone singing in the same room — intimate, unhurried, and completely unguarded."
              animateBy="words"
              direction="top"
              delay={14}
              threshold={0.1}
              className="mt-7 max-w-lg text-[15px] leading-[1.8] text-mist-300"
            />

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnet padding={70} magnetStrength={4} wrapperClassName="inline-block">
                <ShimmerButton
                  onClick={() => goToSection("story")}
                  background="linear-gradient(135deg, #f6e9cd 0%, #d9bd88 45%, #c8a96b 100%)"
                  shimmerColor="#fffaf0"
                  shimmerSize="0.08em"
                  shimmerDuration="3.4s"
                  className="group rounded-full px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-ink-950"
                  type="button"
                >
                  <span className="relative z-10 inline-flex items-center gap-2.5">
                    Enter the archive
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={1.75}
                    />
                  </span>
                </ShimmerButton>
              </Magnet>

              <StarBorder
                as="button"
                onClick={playGrace}
                radius={999}
                color="#e9d3a7"
                trailColor="#c8a96b"
                backgroundColor="rgba(9, 9, 12, 0.72)"
                textColor="#fbf9f4"
                borderColor="rgba(255,255,255,0.14)"
                thickness={1}
                glow={0.55}
                sparkle
                className="px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em]"
              >
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  <Play aria-hidden="true" className="size-3.5" fill="currentColor" strokeWidth={0} />
                  Play Grace
                </span>
              </StarBorder>
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
                <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-ink-900 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)]">
                  <BorderBeam
                    size={64}
                    duration={8}
                    colorFrom="#f6e9cd"
                    colorTo="#a5874e"
                    borderWidth={1}
                  />
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
              </TiltCard>

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
                  <span className="mt-1 block truncate text-[12.5px] text-ivory-100">Grace</span>
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
