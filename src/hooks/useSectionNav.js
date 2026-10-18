import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Scroll to a section by id from anywhere in the app.
 *
 * If the section exists on the current page (e.g. the "On this page" list on
 * /information) it scrolls in place. Otherwise it navigates home and lets Home
 * pick the target up from router state.
 */
export function useSectionNav() {
  const navigate = useNavigate();

  return (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    navigate("/", { state: { scrollTo: sectionId } });
  };
}

/** Scroll to a section once, shortly after mount (used for cross-page links). */
export function useScrollToSection(sectionId, enabled) {
  useEffect(() => {
    if (!sectionId || !enabled) return undefined;
    const id = window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 160);
    return () => window.clearTimeout(id);
  }, [sectionId, enabled]);
}
