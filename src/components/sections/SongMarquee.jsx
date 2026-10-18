import { marqueeWords } from "../../data/site";
import Marquee from "../ui/Marquee";

/** Thin band between hero and story: the track titles as a running ribbon. */
export default function SongMarquee() {
  return (
    <section
      aria-hidden="true"
      className="relative border-y border-white/[0.06] bg-white/[0.015] py-4"
    >
      <Marquee
        items={marqueeWords}
        duration={54}
        separator="✦"
        itemClassName="font-display text-[1.35rem] italic text-mist-300 sm:text-[1.6rem]"
      />
    </section>
  );
}
