import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";

const FeaturedService = () => {
  const { t } = useTranslation();
  const faqs = t("featured.faqs", { returnObjects: true }) as { q: string; a: string }[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-background py-24 md:py-32">
      <div className="container-editorial grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative lg:sticky lg:top-28"
        >
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-secondary via-secondary/95 to-primary/40">
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/30 blur-3xl animate-float-slow" />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-primary-glow/30 blur-3xl animate-float-slower" />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-44 h-56 md:w-52 md:h-64 rounded-md bg-background/95 shadow-2xl flex flex-col p-5"
              >
                <div className="h-1 w-12 bg-primary rounded-full mb-4" />
                <div className="space-y-2">
                  {[8, 12, 10, 14, 9, 12].map((w, i) => (
                    <div key={i} className="h-1.5 bg-secondary/15 rounded-full" style={{ width: `${w * 7}%` }} />
                  ))}
                </div>
                <div className="mt-auto flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center text-[10px] font-bold text-primary">
                    BA
                  </div>
                  <div className="text-[8px] uppercase tracking-widest text-muted-foreground">Notary Seal</div>
                </div>
              </motion.div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 right-8 glass-card rounded-md px-3 py-2 text-xs text-secondary font-medium"
            >
              ✓ Apostille Ready
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-8 left-8 glass-card rounded-md px-3 py-2 text-xs text-secondary font-medium"
            >
              30+ Jurisdictions
            </motion.div>
          </div>
        </motion.div>

        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="eyebrow">{t("featured.eyebrow")}</span>
            <h2 className="display-serif text-4xl md:text-5xl text-secondary mt-4 text-balance">
              {t("featured.title")}
            </h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              {t("featured.intro")}
            </p>
          </motion.div>

          <div className="mt-10 divide-y divide-border border-y border-border">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className={`display-serif text-xl md:text-2xl transition-colors ${isOpen ? "text-primary" : "text-secondary group-hover:text-primary"}`}>
                      {f.q}
                    </span>
                    <Plus
                      className={`w-5 h-5 shrink-0 text-secondary transition-transform duration-500 ${isOpen ? "rotate-45 text-primary" : ""}`}
                      strokeWidth={1.5}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-10 text-muted-foreground leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedService;
