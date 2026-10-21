import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import ClickSpark from "../reactbits/ClickSpark";

/** App shell: fixed nav, page outlet, footer, grain pass and scroll restore. */
export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen flex-col bg-ink-950">
      <ScrollProgress />
      <Navbar />
      <main id="main" className="flex-1">
        <ClickSpark
          sparkColor="#e9d3a7"
          sparkSize={11}
          sparkRadius={26}
          sparkCount={8}
          duration={450}
          easing="ease-out"
          className="relative"
        >
          <Outlet />
        </ClickSpark>
      </main>
      <Footer />
      <div className="grain-overlay" aria-hidden="true" />
    </div>
  );
}
