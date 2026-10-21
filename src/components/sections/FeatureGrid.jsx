import { features } from "../../data/site";
import { media } from "../../data/media";
import { useSectionNav } from "../../hooks/useSectionNav";
import { BorderBeam } from "../magicui/border-beam";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import SpotlightCard from "../reactbits/SpotlightCard";

function CardHeader({ icon: Icon, kicker }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-bronze-300 transition-colors duration-500 group-hover:border-bronze-500/40 group-hover:text-bronze-200">
        <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.5} />
      </span>
      <span className="text-right font-mono text-[8.5px] uppercase leading-relaxed tracking-[0.22em] text-mist-500">
        {kicker}
      </span>
    </div>
  );
}

function Detail({ children }) {
  return (
    <p className="mt-auto flex items-center gap-2 pt-6 font-mono text-[8.5px] uppercase tracking-[0.2em] text-bronze-500/85">
      <span aria-hidden="true" className="block size-1 rounded-full bg-bronze-500/70" />
      {children}
    </p>
  );
}

export default function FeatureGrid() {
  const goToSection = useSectionNav();

  return (
    <section
      id="explore"
      className="relative scroll-mt-24 border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Six ways in"
          title={
            <>
              Everything the record does,{" "}
              <span className="italic text-bronze-gradient">in one place.</span>
            </>
          }
          description="The voice, the guitar, the writing and the silence between them — a guided tour of what makes Grace hold up."
          action={
            <Button to="/information" variant="ghost" withArrow>
              All information
            </Button>
          }
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const { icon: Icon, kicker, title, body, detail } = feature;
            const featured = index === 0;
            const wide = index === features.length - 1;

            let content;

            if (featured) {
              content = (
                <div className="grid h-full gap-7 p-7 sm:grid-cols-[1.15fr_0.85fr] sm:p-8">
                  <div className="flex flex-col">
                    <CardHeader icon={Icon} kicker={kicker} />
                    <h3 className="mt-7 font-display text-[2rem] leading-[1.05] text-ivory-50">
                      {title}
                    </h3>
                    <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-mist-400">
                      {body}
                    </p>
                    <Detail>{detail}</Detail>
                  </div>
                  <div className="relative hidden overflow-hidden rounded-2xl border border-white/10 sm:block">
                    <img
                      src={media.cover}
                      alt=""
                      className="h-full w-full object-cover opacity-80 transition-transform duration-[1200ms] group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
                    <p className="absolute bottom-4 left-4 font-mono text-[8px] uppercase tracking-[0.26em] text-bronze-200">
                      Grace · 1994
                    </p>
                  </div>
                </div>
              );
            } else if (wide) {
              content = (
                <div className="grid h-full gap-7 p-7 sm:grid-cols-[1.4fr_1fr] sm:items-center sm:p-8">
                  <div className="flex flex-col">
                    <CardHeader icon={Icon} kicker={kicker} />
                    <h3 className="mt-7 font-display text-[1.6rem] leading-tight text-ivory-50">
                      {title}
                    </h3>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-mist-400">{body}</p>
                    <Detail>{detail}</Detail>
                  </div>
                  <div className="flex flex-col items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                    <p className="font-mono text-[8px] uppercase tracking-[0.26em] text-mist-500">
                      Start here
                    </p>
                    <p className="font-display text-[1.45rem] leading-tight text-ivory-100">
                      Headphones. No interruptions.
                    </p>
                    <Button size="sm" variant="outline" onClick={() => goToSection("listen")} withArrow>
                      Open the player
                    </Button>
                  </div>
                </div>
              );
            } else {
              content = (
                <div className="flex h-full flex-col p-7">
                  <CardHeader icon={Icon} kicker={kicker} />
                  <h3 className="mt-7 font-display text-[1.6rem] leading-tight text-ivory-50">
                    {title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-mist-400">{body}</p>
                  <Detail>{detail}</Detail>
                </div>
              );
            }

            const spanClass = featured
              ? "md:col-span-2"
              : wide
                ? "md:col-span-2 lg:col-span-3"
                : undefined;

            return (
              <Reveal key={feature.id} delay={index * 0.05} className={spanClass}>
                {featured ? (
                  <div className="relative h-full overflow-hidden rounded-[1.75rem]">
                    <BorderBeam size={72} duration={8} colorFrom="#f6e9cd" colorTo="#a5874e" />
                    <SpotlightCard
                      className="group h-full rounded-[1.75rem] border border-white/10 bg-ink-900/40"
                      spotlightColor="rgba(200,169,107,0.22)"
                    >
                      {content}
                    </SpotlightCard>
                  </div>
                ) : (
                  <SpotlightCard
                    className="group h-full rounded-[1.75rem] border border-white/[0.07] bg-white/[0.015]"
                    spotlightColor="rgba(200,169,107,0.16)"
                  >
                    {content}
                  </SpotlightCard>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
