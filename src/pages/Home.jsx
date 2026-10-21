import { useLocation } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { useScrollToSection } from "../hooks/useSectionNav";
import Hero from "../components/sections/Hero";
import SongMarquee from "../components/sections/SongMarquee";
import Story from "../components/sections/Story";
import SignalPath from "../components/sections/SignalPath";
import FeatureGrid from "../components/sections/FeatureGrid";
import MediaShowcase from "../components/sections/MediaShowcase";
import ListeningRoom from "../components/sections/ListeningRoom";
import QuoteBand from "../components/sections/QuoteBand";
import SongTable from "../components/sections/SongTable";
import CTA from "../components/sections/CTA";

export default function Home() {
  const location = useLocation();

  usePageMeta(
    "Jeff Buckley — Grace & Legacy",
    "An immersive listening archive for Jeff Buckley's Grace: the voice, the record, and the influence that never left the room.",
  );
  useScrollToSection(location.state?.scrollTo, true);

  return (
    <>
      <Hero />
      <SongMarquee />
      <Story />
      <SignalPath />
      <FeatureGrid />
      <MediaShowcase />
      <ListeningRoom />
      <QuoteBand />
      <SongTable />
      <CTA />
    </>
  );
}
