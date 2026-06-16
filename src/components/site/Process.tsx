import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Upload, Search, Cog, PackageCheck } from "lucide-react";

const icons = [Upload, Search, Cog, PackageCheck];

const Process = () => {
  const { t } = useTranslation();
  const steps = t("process.steps", { returnObjects: true }) as { title: string; text: string }[];

  return (
    <section id="process" className="relative bg-secondary text-secondary-foreground py-24 md:py-32 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary-glow/10 blur-3xl" />

      <div className="container-editorial relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-medium">
            {t("process.eyebrow")}
          </span>
          <h2 className="display-serif text-4xl md:text-5xl lg:text-6xl mt-4 text-balance">{t("process.title")}</h2>
        </motion.div>

        <div className="mt-16 md:mt-20 relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block absolute top-7 left-0 right-0 h-px bg-gradient-to-r from-primary/50 via-primary/30 to-transparent origin-left"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            {steps.map((s, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-background/10 border border-background/20 backdrop-blur text-primary mb-6">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-[11px] font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="display-serif text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm text-background/70 leading-relaxed">{s.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
