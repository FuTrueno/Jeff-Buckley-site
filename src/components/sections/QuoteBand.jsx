import { quote } from "../../data/site";
import Reveal from "../ui/Reveal";

/** A deliberate light band: the record's own words, set in the display serif. */
export default function QuoteBand() {
  return (
    <section className="relative overflow-hidden bg-ivory-100 py-24 text-ink-950 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grain opacity-[0.4] mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-24 select-none font-display text-[24rem] leading-none text-ink-950/[0.04] sm:text-[30rem]"
      >
        ”
      </div>

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <span className="inline-flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.4em] text-ink-950/50">
          <span aria-hidden="true" className="h-px w-8 bg-ink-950/25" />
          From the record
          <span aria-hidden="true" className="h-px w-8 bg-ink-950/25" />
        </span>

        <Reveal blur>
          <blockquote className="mt-10 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-[1.14] tracking-[-0.01em] text-ink-950">
            “{quote.text}”
          </blockquote>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center gap-2">
            <span aria-hidden="true" className="h-px w-12 bg-bronze-600/60" />
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-ink-950/60">
              {quote.source}
            </p>
            <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-ink-950/35">
              {quote.meta}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
