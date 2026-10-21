import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";

/** App shell: fixed nav, page outlet, footer, grain pass and scroll restore. */
export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen flex-col bg-ink-950">
      <a
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById("main");
          main?.focus();
          main?.scrollIntoView();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-bronze-300 focus:px-5 focus:py-3 focus:text-[13px] focus:font-medium focus:uppercase focus:tracking-[0.16em] focus:text-ink-950"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <div className="grain-overlay" aria-hidden="true" />
    </div>
  );
}
