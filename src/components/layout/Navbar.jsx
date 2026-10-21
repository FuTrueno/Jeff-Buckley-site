import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav } from "../../data/site";
import { cn } from "../../lib/utils";
import { useSectionNav } from "../../hooks/useSectionNav";
import Button from "../ui/Button";

/** Small five-bar mark, reused as the wordmark glyph. */
function BrandMark({ className }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-9 place-items-center rounded-[11px] border border-white/10 bg-white/[0.045]",
        className,
      )}
    >
      <span className="flex h-4 items-center gap-[2px]">
        {[7, 14, 16, 11, 6].map((height, index) => (
          <span
            key={index}
            className="w-[2px] rounded-full bg-gradient-to-b from-bronze-200 to-bronze-500"
            style={{ height }}
          />
        ))}
      </span>
    </span>
  );
}

function Wordmark() {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Jeff Buckley — home">
      <BrandMark className="transition-colors group-hover:border-bronze-500/40" />
      <span className="flex flex-col">
        <span className="text-[12px] font-medium uppercase leading-none tracking-[0.3em] text-ivory-100">
          Jeff Buckley
        </span>
        <span className="mt-1.5 font-mono text-[12px] uppercase leading-none tracking-[0.34em] text-mist-400">
          Grace &amp; Legacy
        </span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const goToSection = useSectionNav();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/[0.06] bg-ink-950/72 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[76px] w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <Wordmark />

          {/* Desktop navigation */}
          <nav
            aria-label="Main"
            className="hidden items-center gap-0.5 rounded-full border border-white/[0.07] bg-white/[0.025] p-1 backdrop-blur-md md:flex"
          >
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative inline-flex min-h-11 items-center rounded-full px-4 py-2 transition-colors duration-300",
                    isActive ? "text-ivory-50" : "text-mist-400 hover:text-ivory-100",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.07]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative z-10 text-[12px] font-medium uppercase tracking-[0.2em]">
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button
              variant="ghost"
              withArrow
              onClick={() => goToSection("listen")}
            >
              Listen
            </Button>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-ivory-100 md:hidden"
          >
            <Menu className="size-4" strokeWidth={1.6} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-ink-950/97 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex h-[76px] items-center justify-between px-5">
              <Wordmark />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-ivory-100"
              >
                <X className="size-4" strokeWidth={1.6} />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1 px-5">
              {nav.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-baseline justify-between border-b border-white/8 py-5",
                        isActive ? "text-ivory-50" : "text-mist-200",
                      )
                    }
                  >
                    <span className="font-display text-[2.3rem] leading-none">
                      {item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-[12px] tracking-[0.24em] text-mist-400"
                    >
                      0{index + 1}
                    </span>
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="border-t border-white/8 px-5 py-6">
              <p className="font-mono text-[12px] uppercase leading-relaxed tracking-[0.26em] text-mist-400">
                Web Technologies — Assignment #2
                <br />
                Grace &amp; Legacy archive
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
