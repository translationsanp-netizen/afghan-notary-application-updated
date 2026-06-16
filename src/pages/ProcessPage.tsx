import PageShell from "@/components/site/PageShell";
import { useTranslation } from "react-i18next";
import { Upload, Search, Cog, PackageCheck } from "lucide-react";
import { motion } from "framer-motion";

const icons = [Upload, Search, Cog, PackageCheck];

const ProcessPage = () => {
  const { t } = useTranslation();
  const steps = t("processPage.steps", { returnObjects: true }) as { title: string; text: string }[];

  return (
    <PageShell
      eyebrow={t("processPage.eyebrow")}
      title={t("processPage.title")}
      intro={t("processPage.intro")}
    >
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-7 top-2 bottom-2 w-px bg-border md:left-9" aria-hidden />
        <div className="space-y-12">
          {steps.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-20 md:pl-24"
              >
                <span className="absolute left-0 top-0 inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <span className="eyebrow text-primary">{`Step ${String(i + 1).padStart(2, "0")}`}</span>
                <h3 className="display-serif text-secondary text-2xl md:text-3xl mt-2 mb-3">{s.title}</h3>
                <p className="text-secondary/70 leading-relaxed">{s.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
};

export default ProcessPage;
