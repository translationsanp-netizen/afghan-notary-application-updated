import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/anp-logo.png";
import LanguageSwitcher from "./LanguageSwitcher";
import MegaMenu from "./MegaMenu";
import { megaNav } from "./megaMenuData";

const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const openPanel = (label: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActivePanel(label);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActivePanel(null), 180);
  };

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      const threshold = isHome ? window.innerHeight * 0.7 : 10;
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, location.pathname]);

  useEffect(() => {
    setOpen(false);
    setActivePanel(null);
    setMobileExpanded(null);
  }, [location.pathname]);

  const solid = scrolled || !isHome;
  const panel = megaNav.find((p) => p.label === activePanel);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ ["--nav-bottom" as string]: solid ? "100px" : "116px" }}
      className={`fixed top-9 inset-x-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-[0_4px_20px_-8px_hsl(209_56%_4%/0.15)]"
          : "bg-white/55 backdrop-blur-md border-b border-secondary/10"
      }`}
      onMouseLeave={scheduleClose}
    >
      <div className={`container-editorial flex items-center justify-between transition-all duration-500 ${solid ? "h-16" : "h-20"}`}>
        <Link to="/" className="flex items-center gap-3" onMouseEnter={() => setActivePanel(null)}>
          <img
            src={logo}
            alt="BA Afghan Notary Public"
            className={`w-auto transition-all duration-500 ${solid ? "h-8 md:h-9" : "h-9 md:h-10"} ${solid ? "" : "brightness-0 invert"}`}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {megaNav.map((p) => (
            <div
              key={p.label}
              className="relative"
              onMouseEnter={() => (p.hasMega ? openPanel(p.label) : setActivePanel(null))}
            >
              <NavLink
                to={p.to}
                className={({ isActive }) =>
                  `story-link text-sm font-medium transition-colors text-secondary hover:text-primary inline-flex items-center ${
                    isActive ? "after:scale-x-100" : ""
                  }`
                }
              >
                {p.label}
              </NavLink>
            </div>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher variant="dark" />
          <Link
            to="/request"
            className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 hover:shadow-lg transition-all duration-300"
          >
            {t("nav.request")}
            <span aria-hidden>→</span>
          </Link>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`block h-px w-6 bg-secondary transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-secondary transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-secondary transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Desktop mega menu */}
      <div className="hidden md:block">
        {panel && panel.hasMega && (
          <MegaMenu panel={panel} onClose={() => setActivePanel(null)} onMouseEnter={cancelClose} />
        )}
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-background border-t border-border max-h-[80vh] overflow-y-auto"
          >
            <div className="container-editorial py-6 flex flex-col gap-2">
              {megaNav.map((p) =>
                p.hasMega && p.columns ? (
                  <div key={p.label} className="border-b border-border/60 pb-2">
                    <button
                      onClick={() => setMobileExpanded((v) => (v === p.label ? null : p.label))}
                      className="flex items-center justify-between w-full py-3 text-base font-display text-secondary"
                    >
                      {p.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === p.label ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === p.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pb-3"
                        >
                          {p.columns.map((col) => (
                            <div key={col.title} className={`mt-3 ${col.highlight ? "rounded-lg bg-primary/[0.06] p-3" : ""}`}>
                              <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-secondary mb-2">{col.title}</p>
                              <ul className="flex flex-col gap-2 pl-1">
                                {col.links.map((l) => (
                                  <li key={l.to}>
                                    <NavLink to={l.to} className="text-sm text-secondary/80">
                                      {l.label}
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink key={p.label} to={p.to} className="text-base font-display text-secondary py-3 border-b border-border/60">
                    {p.label}
                  </NavLink>
                )
              )}
              <div className="pt-4"><LanguageSwitcher variant="dark" /></div>
              <Link to="/request" className="mt-2 inline-flex items-center justify-center px-5 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-md">
                {t("nav.request")} →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
