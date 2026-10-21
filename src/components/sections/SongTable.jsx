import { Play } from "lucide-react";
import { songs } from "../../data/site";
import { useListening } from "../../context/ListeningProvider";
import { useSectionNav } from "../../hooks/useSectionNav";
import { pad2 } from "../../lib/utils";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

/**
 * SongTable — the original assignment table (3+ columns, 4+ rows), restyled as
 * an interactive tracklist. Rows hand playback to the listening room.
 */
export default function SongTable() {
  const { playTrack } = useListening();
  const goToSection = useSectionNav();

  const handlePlay = (trackId) => {
    playTrack(trackId);
    goToSection("listen");
  };

  return (
    <section
      id="songs"
      className="relative scroll-mt-24 border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Selected songs"
          title={
            <>
              The Grace era,{" "}
              <span className="italic text-bronze-gradient">track by track.</span>
            </>
          }
          description="Five entry points, with where they sit on the record and what to listen for. Press play on any row."
          action={
            <Button to="/information" variant="ghost" withArrow>
              Full information
            </Button>
          }
        />

        <Reveal delay={0.08} className="mt-12">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/8 bg-white/[0.012]">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Selected songs from the Grace era, with album and focus
              </caption>
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.025]">
                  <th
                    scope="col"
                    className="w-14 px-4 py-4 font-mono text-[12px] font-normal uppercase tracking-[0.26em] text-mist-400 sm:px-5"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 font-mono text-[12px] font-normal uppercase tracking-[0.26em] text-mist-400 sm:px-5"
                  >
                    Song
                  </th>
                  <th
                    scope="col"
                    className="hidden px-4 py-4 font-mono text-[12px] font-normal uppercase tracking-[0.26em] text-mist-400 sm:table-cell sm:px-5"
                  >
                    Album / release
                  </th>
                  <th
                    scope="col"
                    className="hidden px-4 py-4 font-mono text-[12px] font-normal uppercase tracking-[0.26em] text-mist-400 lg:table-cell lg:px-5"
                  >
                    Focus
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-right font-mono text-[12px] font-normal uppercase tracking-[0.26em] text-mist-400 sm:px-5"
                  >
                    Listen
                  </th>
                </tr>
              </thead>
              <tbody>
                {songs.map((song, index) => (
                  <tr
                    key={song.title}
                    className="group border-b border-white/[0.055] transition-colors duration-300 last:border-0 hover:bg-white/[0.035]"
                  >
                    <td className="px-4 py-5 font-mono text-[12px] tabular-nums text-mist-400 sm:px-5">
                      {pad2(index + 1)}
                    </td>
                    <td className="px-4 py-5 sm:px-5">
                      <span className="block font-display text-xl leading-tight text-ivory-100 transition-colors group-hover:text-white">
                        {song.title}
                      </span>
                    </td>
                    <td className="hidden px-4 py-5 text-[12px] uppercase tracking-[0.16em] text-mist-400 sm:table-cell sm:px-5">
                      {song.release}
                    </td>
                    <td className="hidden px-4 py-5 text-[14px] text-mist-400 lg:table-cell lg:px-5">
                      {song.focus}
                    </td>
                    <td className="px-4 py-5 text-right sm:px-5">
                      <button
                        type="button"
                        onClick={() => handlePlay(song.trackId)}
                        aria-label={`Play ${song.title} in the listening room`}
                        className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 text-mist-400 transition-all duration-300 hover:border-bronze-500/60 hover:bg-bronze-500/10 hover:text-bronze-200 group-hover:border-bronze-500/30 group-hover:text-bronze-300"
                      >
                        <Play className="ml-0.5 size-3.5" fill="currentColor" strokeWidth={0} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
