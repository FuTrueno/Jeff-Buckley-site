import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { information } from "../data/site";
import { media } from "../data/media";
import { usePageMeta } from "../hooks/usePageMeta";
import { useSectionNav } from "../hooks/useSectionNav";
import { pad2 } from "../lib/utils";
import Button from "../components/ui/Button";
import DotGrid from "../components/ui/DotGrid";
import Reveal from "../components/ui/Reveal";
import SectionHeading, { Eyebrow } from "../components/ui/SectionHeading";
import SplitText from "../components/ui/SplitText";
import SongTable from "../components/sections/SongTable";
import ListeningRoom from "../components/sections/ListeningRoom";
import MediaShowcase from "../components/sections/MediaShowcase";
import CTA from "../components/sections/CTA";

const listenFor = [
  {
    title: "Where the voice breaks",
    body: "The cracks and the breath are not imperfections to listen past — they are where the performance actually lives.",
  },
  {
    title: "How the guitar holds space",
    body: "Notice how often the guitar steps back. The arrangements leave room for the vocal instead of competing with it.",
  },
  {
    title: "The silence between songs",
    body: "Grace is sequenced like a set, not a playlist. The pauses are part of the pacing, so let them happen.",
  },
];

const anchors = [
  { id: "songs", label: "Selected songs" },
  { id: "listen", label: "Listening room" },
  { id: "media", label: "Watch & look" },
  { id: "register", label: "Listening form" },
];

export default function Information() {
  const goToSection = useSectionNav();

  usePageMeta(
    "Information — Jeff Buckley, Grace & Legacy",
    "The story behind Grace: the record, the voice, and what to listen for, plus selected songs and the listening room.",
  );

  return (
    <>
      {/* ---------------- Page hero ---------------- */}
      <section className="relative overflow-hidden pb-16 pt-[126px] sm:pb-24">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <img
            src={media.heroPoster}
            alt=""
            className="h-full w-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/92 to-ink-950" />
          <div className="absolute -right-24 top-0 size-[420px] rounded-full bg-bronze-500/10 blur-[120px]" />
        </div>
        <DotGrid className="opacity-40" cell={32} opacity={0.24} />

        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-[8.5px] uppercase tracking-[0.26em] text-mist-500"
          >
            <Link to="/" className="transition-colors hover:text-bronze-300">
              Home
            </Link>
            <span aria-hidden="true" className="mx-2 text-mist-500/50">
              /
            </span>
            <span className="text-mist-300">Information</span>
          </nav>

          <div className="mt-9 grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <Eyebrow>{information.eyebrow}</Eyebrow>
              <h1 className="mt-6 font-display text-[clamp(2.7rem,5.6vw,4.9rem)] font-light leading-[0.98] tracking-[-0.015em] text-ivory-50">
                <SplitText trigger="mount" text="The story" delay={0.1} />{" "}
                <motion.span
                  className="inline-block italic text-bronze-gradient"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.55, ease: "easeOut" }}
                >
                  behind Grace.
                </motion.span>
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-mist-300">
                {information.standfirst}
              </p>
            </div>

            <div className="lg:col-span-4">
              <Reveal delay={0.2}>
                <dl className="glass divide-y divide-white/8 rounded-2xl p-6">
                  {information.notes.map((note) => (
                    <div
                      key={note.label}
                      className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <dt className="font-mono text-[8px] uppercase tracking-[0.24em] text-mist-400">
                        {note.label}
                      </dt>
                      <dd className="text-right text-[12.5px] text-ivory-50">{note.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Article ---------------- */}
      <section className="relative pb-10">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid gap-14 border-t border-white/8 pt-14 lg:grid-cols-12 lg:gap-12">
            <article className="lg:col-span-8">
              <Reveal>
                <p className="text-[16px] leading-[1.9] text-mist-200 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[4.2rem] first-letter:leading-[0.7] first-letter:text-bronze-300">
                  {information.paragraphs[0]}
                </p>
              </Reveal>

              <Reveal delay={0.06}>
                <p className="mt-7 text-[15px] leading-[1.9] text-mist-300">
                  {information.paragraphs[1]}
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <aside className="my-10 rounded-r-2xl border-l-2 border-bronze-500/70 bg-white/[0.025] py-6 pl-6 pr-5">
                  <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-bronze-400">
                    Listening note
                  </p>
                  <p className="mt-3 font-display text-[1.5rem] italic leading-snug text-ivory-100">
                    {information.aside}
                  </p>
                </aside>
              </Reveal>

              <h2 className="mt-12 font-display text-[2rem] leading-tight text-ivory-50">
                What to listen for
              </h2>
              <ul className="mt-6 space-y-5">
                {listenFor.map((item, index) => (
                  <Reveal key={item.title} delay={0.04 * index} as="li">
                    <div className="flex gap-4">
                      <span className="mt-1.5 font-mono text-[9px] tracking-[0.16em] text-bronze-500">
                        {pad2(index + 1)}
                      </span>
                      <div>
                        <p className="text-[14px] font-medium text-ivory-100">{item.title}</p>
                        <p className="mt-1.5 text-[13.5px] leading-relaxed text-mist-400">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Button to="/listening-form" withArrow>
                  Register a session
                </Button>
                <a
                  href="https://github.com/FuTrueno/Jeff-Buckley"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.24em] text-mist-500 transition-colors hover:text-bronze-300"
                >
                  Original assignment
                  <ArrowUpRight className="size-3" strokeWidth={1.6} />
                </a>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-4">
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                  <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-mist-500">
                    On this page
                  </p>
                  <ul className="mt-4 space-y-1">
                    {anchors.map((anchor) => (
                      <li key={anchor.id}>
                        <button
                          type="button"
                          onClick={() => goToSection(anchor.id)}
                          className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-[13px] text-mist-300 transition-colors hover:bg-white/[0.04] hover:text-bronze-200"
                        >
                          {anchor.label}
                          <ArrowUpRight className="size-3 text-mist-500" strokeWidth={1.6} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/8 bg-gradient-to-b from-bronze-500/[0.06] to-transparent p-6">
                  <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-mist-500">
                    Related
                  </p>
                  <p className="mt-4 font-display text-[1.35rem] leading-snug text-ivory-100">
                    Grace is best heard once, in order.
                  </p>
                  <button
                    type="button"
                    onClick={() => goToSection("listen")}
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-bronze-300 transition-colors hover:text-bronze-200"
                  >
                    Open the player
                    <ArrowUpRight className="size-3" strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <SongTable />
      <ListeningRoom />
      <MediaShowcase />

      <section id="register" className="scroll-mt-24 border-t border-white/[0.06] pt-24 sm:pt-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Next"
            title={
              <>
                Put a session{" "}
                <span className="italic text-bronze-gradient">on the calendar.</span>
              </>
            }
            description="Tell us how you would like to listen and we will build the session around it."
            action={
              <Button to="/listening-form" withArrow>
                Open the form
              </Button>
            }
          />
        </div>
      </section>

      <CTA />
    </>
  );
}
