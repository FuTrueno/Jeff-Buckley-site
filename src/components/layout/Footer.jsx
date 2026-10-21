import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { nav } from "../../data/site";
import { tracks } from "../../data/media";
import { useListening } from "../../context/ListeningProvider";
import { useSectionNav } from "../../hooks/useSectionNav";
import { DotPattern } from "../magicui/dot-pattern";
import Button from "../ui/Button";
import { Eyebrow } from "../ui/SectionHeading";

export default function Footer() {
  const { playTrack } = useListening();
  const goToSection = useSectionNav();

  const playFromFooter = (trackId) => {
    playTrack(trackId);
    goToSection("listen");
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-ink-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bronze-500/50 to-transparent"
      />

      <DotPattern
        width={30}
        height={30}
        cr={1}
        className="z-0 text-bronze-300/[0.10] [mask-image:radial-gradient(ellipse_65%_60%_at_50%_35%,#000_10%,transparent_80%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          {/* Closing statement */}
          <div className="lg:col-span-5">
            <Eyebrow>After the record</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,4.6vw,3.8rem)] leading-[1.02] tracking-[-0.015em] text-ivory-50">
              Still in <span className="italic text-bronze-gradient">the room.</span>
            </h2>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-mist-400">
              An educational archive for a record that refuses to age. Listen in
              order, headphones on — then pass it to someone else.
            </p>
            <div className="mt-8">
              <Button to="/listening-form" withArrow>
                Register a session
              </Button>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h3 className="font-mono text-[9.5px] uppercase tracking-[0.32em] text-mist-500">
                Archive
              </h3>
              <ul className="mt-5 space-y-3">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-[13.5px] text-mist-300 transition-colors hover:text-bronze-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => goToSection("signal")}
                    className="text-[13.5px] text-mist-300 transition-colors hover:text-bronze-200"
                  >
                    Signal path
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => goToSection("media")}
                    className="text-[13.5px] text-mist-300 transition-colors hover:text-bronze-200"
                  >
                    Media showcase
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[9.5px] uppercase tracking-[0.32em] text-mist-500">
                Listen
              </h3>
              <ul className="mt-5 space-y-3">
                {tracks.map((track) => (
                  <li key={track.id}>
                    <button
                      type="button"
                      onClick={() => playFromFooter(track.id)}
                      className="group flex items-baseline gap-2 text-left text-[13.5px] text-mist-300 transition-colors hover:text-bronze-200"
                    >
                      <span className="font-mono text-[9px] text-mist-500 transition-colors group-hover:text-bronze-500">
                        {track.duration}
                      </span>
                      <span className="truncate">{track.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[9.5px] uppercase tracking-[0.32em] text-mist-500">
                Colophon
              </h3>
              <p className="mt-5 text-[13px] leading-relaxed text-mist-400">
                React 19 · Vite · Tailwind CSS v4
                <br />
                Framer Motion · Lucide
                <br />
                Cormorant Garamond · Inter · JetBrains Mono
              </p>
              <a
                href="https://github.com/FuTrueno/Jeff-Buckley"
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-mist-300 transition-colors hover:text-bronze-200"
              >
                Source repository
                <ArrowUpRight className="size-3.5" strokeWidth={1.6} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/8 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-mist-500">
            © {new Date().getFullYear()} Grace &amp; Legacy — educational project.
            <span className="mx-2 text-mist-500/50">/</span>
            Not affiliated with the Jeff Buckley estate.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 self-start font-mono text-[9px] uppercase tracking-[0.24em] text-mist-400 transition-colors hover:text-bronze-200 sm:self-auto"
          >
            Back to top
            <span className="inline-flex size-6 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-bronze-500/50">
              <ArrowUp className="size-3" strokeWidth={1.8} />
            </span>
          </button>
        </div>
      </div>

      {/* Oversized wordmark, clipped by the footer */}
      <div aria-hidden="true" className="pointer-events-none select-none px-2">
        <p className="whitespace-nowrap text-center font-display text-[17vw] leading-[0.72] tracking-[-0.03em] text-white/[0.035]">
          Grace &amp; Legacy
        </p>
      </div>
    </footer>
  );
}
