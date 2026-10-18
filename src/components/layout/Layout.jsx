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
      <ScrollProgress />
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <div className="grain-overlay" aria-hidden="true" />
    </div>
  );
}
