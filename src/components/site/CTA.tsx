import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const CTA = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden gradient-hero-bg animate-gradient-shift">
      <div className="absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full bg-primary-glow/30 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full bg-primary/30 blur-3xl animate-float-slower" />

      <div className="container-editorial relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="display-serif text-4xl md:text-5xl lg:text-6xl text-white text-balance">
            {t("cta.title")}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg text-white/85 leading-relaxed max-w-xl mx-auto"
          >
            {t("cta.subtext")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-background text-secondary px-8 py-4 rounded-md font-medium text-sm md:text-base hover:bg-background/95 hover:scale-[1.03] hover:shadow-2xl transition-all duration-500"
            >
              {t("cta.button")}
              <span aria-hidden>→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
