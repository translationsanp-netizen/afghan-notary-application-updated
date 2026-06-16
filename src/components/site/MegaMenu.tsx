import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { MegaPanel } from "./megaMenuData";

type Props = {
  panel: MegaPanel;
  onClose: () => void;
  onMouseEnter?: () => void;
};

const MegaMenu = ({ panel, onClose, onMouseEnter }: Props) => {
  if (!panel.columns) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={panel.label}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 right-0 top-[var(--nav-bottom,104px)] z-40"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onClose}
      >
        {/* invisible hover bridge so cursor can travel from nav item without losing hover */}
        <div className="absolute -top-3 left-0 right-0 h-3" aria-hidden />

        <div className="container-editorial">
          <div className="bg-background border border-border rounded-2xl shadow-[0_30px_80px_-30px_hsl(209_56%_4%/0.35)] overflow-hidden">
            <div className="grid grid-cols-12">
              {/* LEFT — Columns */}
              <div className="col-span-12 lg:col-span-8 p-8 lg:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 order-2 lg:order-1">
                {panel.columns.map((col, ci) => (
                  <motion.div
                    key={col.title}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.04 + ci * 0.04 }}
                    className={
                      col.highlight
                        ? "rounded-xl bg-primary/[0.06] border border-primary/15 p-5 -m-1"
                        : ""
                    }
                  >
                    <h4 className="text-[11px] uppercase tracking-[0.22em] font-semibold text-secondary mb-4">
                      {col.title}
                    </h4>
                    {col.intro && (
                      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{col.intro}</p>
                    )}
                    <ul className="space-y-2.5">
                      {col.links.map((link) => (
                        <li key={link.to}>
                          <NavLink
                            to={link.to}
                            onClick={onClose}
                            className="group inline-flex items-center text-sm text-secondary/80 hover:text-primary transition-all hover:translate-x-1"
                          >
                            {link.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* RIGHT — Feature panel with image */}
              {panel.feature && (
                <div className="col-span-12 lg:col-span-4 relative bg-secondary text-secondary-foreground overflow-hidden order-1 lg:order-2 min-h-[340px]">
                  {panel.feature.image && (
                    <>
                      <img
                        src={panel.feature.image}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary/95 via-secondary/80 to-secondary/40" />
                    </>
                  )}
                  <div className="relative p-8 lg:p-10 h-full flex flex-col justify-end">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-semibold mb-4">
                      {panel.feature.eyebrow}
                    </p>
                    <h3 className="display-serif text-2xl lg:text-[26px] leading-tight mb-3 text-background">
                      {panel.feature.title}
                    </h3>
                    <p className="text-sm text-background/75 mb-6 max-w-sm">{panel.feature.text}</p>
                    <Link
                      to={panel.feature.cta.to}
                      onClick={onClose}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all w-fit"
                    >
                      {panel.feature.cta.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MegaMenu;
