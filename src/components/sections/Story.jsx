import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { story } from "../../data/site";
import { media } from "../../data/media";
import BorderBeam from "../ui/BorderBeam";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const facts = [
  { label: "Released", value: "1994" },
  { label: "Label", value: "Columbia" },
  { label: "Tracks", value: "10" },
];

export default function Story() {
  const figureRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: figureRef,
    offset: ["start end", "end start"],
  });
  const parallax = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="story" className="relative scroll-mt-24 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-24 -z-10 size-[420px] rounded-full bg-steel-500/[0.08] blur-[120px]"
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-14">
          {/* Sleeve */}
          <div ref={figureRef} className="lg:col-span-5">
            <Reveal>
              <div className="relative">
                <BorderBeam radius="rounded-[1.6rem]" duration={11}>
                  <figure className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-ink-900">
                    <div className="relative">
                      <img
                        src={media.cover}
                        alt="The Grace album sleeve: Jeff Buckley looking down, holding a microphone."
                        className="aspect-square w-full object-cover"
                        width="316"
                        height="316"
                        loading="lazy"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 grain opacity-[0.15] mix-blend-overlay"
                      />
                    </div>
                    <figcaption className="flex items-center justify-between gap-4 border-t border-white/8 px-5 py-4">
                      <span className="font-mono text-[12px] uppercase tracking-[0.26em] text-mist-400">
                        Grace — album sleeve
                      </span>
                      <span className="font-mono text-[12px] tracking-[0.22em] text-bronze-400">
                        1994
                      </span>
                    </figcaption>
                  </figure>
                </BorderBeam>

                {/* Floating still, gently parallaxed */}
                <motion.div
                  style={reduceMotion ? undefined : { y: parallax }}
                  className="absolute -right-5 top-8 hidden w-28 overflow-hidden rounded-xl border border-white/12 bg-ink-900 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] sm:block lg:-right-8 lg:w-32"
                >
                  <img
                    src={media.heroPoster}
                    alt=""
                    className="aspect-[3/4] w-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/8 pt-6">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="font-mono text-[12px] uppercase tracking-[0.24em] text-mist-400">
                      {fact.label}
                    </dt>
                    <dd className="mt-1.5 font-display text-lg leading-none text-ivory-100">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Copy */}
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={story.eyebrow}
              title={
                <>
                  One record.{" "}
                  <span className="italic text-bronze-gradient">Still in the room.</span>
                </>
              }
            />

            <div className="mt-9 space-y-5 text-[16px] leading-[1.85] text-mist-300">
              {story.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={0.05 + index * 0.05}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <blockquote className="mt-10 border-l border-bronze-500/40 pl-6">
                <p className="font-display text-[1.6rem] italic leading-snug text-ivory-100 sm:text-[1.9rem]">
                  “{story.pull}”
                </p>
                <cite className="mt-3 block font-mono text-[12px] uppercase not-italic tracking-[0.28em] text-mist-400">
                  Listening note — Grace era
                </cite>
              </blockquote>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button to="/information" variant="outline" withArrow>
                  Read the full story
                </Button>
                <a
                  href="https://github.com/FuTrueno/Jeff-Buckley"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-11 items-center gap-1.5 py-2 font-mono text-[12px] uppercase tracking-[0.24em] text-mist-400 transition-colors hover:text-bronze-300"
                >
                  Original assignment
                  <ArrowUpRight className="size-3" strokeWidth={1.6} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
