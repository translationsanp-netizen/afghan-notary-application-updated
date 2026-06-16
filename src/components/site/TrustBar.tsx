import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ShieldCheck, Globe2, Zap, Receipt } from "lucide-react";

const icons = [ShieldCheck, Globe2, Zap, Receipt];

const TrustBar = () => {
  const { t } = useTranslation();
  const items = t("trust.items", { returnObjects: true }) as { title: string; text: string }[];

  return (
    <section className="bg-background border-y border-border">
      <div className="container-editorial py-12 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {items.map((item, i) => {
            const Icon = icons[i] ?? ShieldCheck;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-4 group"
              >
                <span className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </span>
                <div>
                  <div className="text-sm font-semibold text-secondary tracking-tight">{item.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
