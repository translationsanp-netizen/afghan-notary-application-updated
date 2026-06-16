import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1800;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="display-serif text-5xl md:text-6xl lg:text-7xl text-secondary tabular-nums">
      {n.toLocaleString()}
      <span className="text-primary">{suffix}</span>
    </span>
  );
};

const Stats = () => {
  const { t } = useTranslation();
  const items = t("stats.items", { returnObjects: true }) as { value: number; suffix: string; label: string }[];

  return (
    <section className="relative bg-background py-24 md:py-32">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-16"
        >
          <span className="eyebrow">{t("stats.eyebrow")}</span>
          <h2 className="display-serif text-4xl md:text-5xl text-secondary mt-4 text-balance">{t("stats.title")}</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 border-t border-border pt-14">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Counter value={it.value} suffix={it.suffix} />
              <div className="mt-3 text-sm uppercase tracking-[0.18em] text-muted-foreground">{it.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
