import { Play } from "lucide-react";
import { useSectionNav } from "../../hooks/useSectionNav";
import Button from "../ui/Button";
import DotGrid from "../ui/DotGrid";
import Reveal from "../ui/Reveal";
import { Eyebrow } from "../ui/SectionHeading";

export default function CTA() {
  const goToSection = useSectionNav();

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-ink-850 via-ink-900 to-ink-950 px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
            <DotGrid className="opacity-60" cell={34} opacity={0.22} spotlight={false} />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-24 size-[420px] rounded-full bg-bronze-500/[0.14] blur-[110px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 right-0 size-[380px] rounded-full bg-steel-500/[0.12] blur-[120px]"
            />

            <div className="relative grid items-center gap-14 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Eyebrow>Take a seat</Eyebrow>
                <h2 className="mt-6 font-display text-[clamp(2.6rem,5.2vw,4.6rem)] font-light leading-[0.98] tracking-[-0.02em] text-ivory-50">
                  Still in{" "}
                  <span className="italic text-bronze-gradient">the room.</span>
                </h2>
                <p className="mt-6 max-w-md text-[14.5px] leading-relaxed text-mist-400">
                  Register for a listening session and tell us where you want to
                  start: the whole album, or the one song that found you first.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Button to="/listening-form" withArrow>
                    Register a session
                  </Button>
                  <Button variant="ghost" onClick={() => goToSection("listen")}>
                    <Play
                      aria-hidden="true"
                      className="mr-0.5 size-3.5"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                    Play the record
                  </Button>
                </div>
                <p className="mt-6 font-mono text-[8px] uppercase tracking-[0.24em] text-mist-500">
                  Front-end demonstration — nothing is stored
                </p>
              </div>

              {/* Vinyl */}
              <div className="flex justify-center lg:col-span-5 lg:justify-end">
                <div className="group relative size-56 sm:size-72">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-bronze-500/20 blur-[60px]"
                  />
                  <div className="relative size-full animate-[spin_28s_linear_infinite] rounded-full border border-white/10 bg-[repeating-radial-gradient(circle_at_center,#101014_0_2px,#08080b_2px_4px)] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95)] transition-transform duration-700 group-hover:scale-[1.02]">
                    <div className="absolute inset-[31%] rounded-full bg-gradient-to-br from-bronze-200 via-bronze-400 to-bronze-600" />
                    <div className="absolute inset-[45%] rounded-full bg-ink-950" />
                    <div className="absolute inset-[46.5%] rounded-full border border-white/10" />
                    <p className="absolute inset-x-0 top-[38%] text-center font-mono text-[6.5px] uppercase tracking-[0.2em] text-ink-950/70">
                      Grace
                    </p>
                    <p className="absolute inset-x-0 top-[58%] text-center font-mono text-[5.5px] uppercase tracking-[0.16em] text-ink-950/50">
                      33⅓
                    </p>
                  </div>
                  <span className="absolute -right-2 top-6 rounded-full border border-white/12 bg-ink-900/80 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.22em] text-mist-300 backdrop-blur-md">
                    Side A
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
