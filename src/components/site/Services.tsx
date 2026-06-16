import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FileSignature, Stamp, Languages, ScrollText, Globe, Compass, ArrowUpRight } from "lucide-react";

const icons = [FileSignature, Stamp, Languages, ScrollText, Globe, Compass];

const Services = () => {
  const { t } = useTranslation();
  const items = t("services.items", { returnObjects: true }) as { title: string; text: string }[];

  return (
    <section id="services" className="relative bg-muted/40 py-24 md:py-32 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container-editorial relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="eyebrow">{t("services.eyebrow")}</span>
          <h2 className="display-serif text-4xl md:text-5xl lg:text-6xl text-secondary mt-4 text-balance">
            {t("services.title")}
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            {t("services.intro")}
          </p>
        </motion.div>

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {items.map((s, i) => {
            const Icon = icons[i] ?? FileSignature;
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="glass-card rounded-xl p-7 md:p-8 hover:shadow-[0_30px_60px_-30px_hsl(209_56%_21%/0.25)] hover:border-primary/40 transition-all duration-500 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-secondary/5 text-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </span>
                  <span className="text-xs font-mono text-muted-foreground/60">0{i + 1}</span>
                </div>
                <h3 className="display-serif text-2xl text-secondary">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Learn more <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
