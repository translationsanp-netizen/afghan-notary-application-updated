import PageShell from "@/components/site/PageShell";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

interface ServicePageProps {
  i18nKey: string;
}

const ServiceDetailPage = ({ i18nKey }: ServicePageProps) => {
  const { t } = useTranslation();
  const features = t(`${i18nKey}.features`, { returnObjects: true }) as string[];
  const sections = t(`${i18nKey}.sections`, { returnObjects: true }) as { title: string; text: string }[];

  return (
    <PageShell
      eyebrow={t(`${i18nKey}.eyebrow`)}
      title={t(`${i18nKey}.title`)}
      intro={t(`${i18nKey}.intro`)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {Array.isArray(sections) && sections.map((s, i) => (
            <section key={i}>
              <h2 className="display-serif text-secondary text-2xl md:text-3xl mb-4">{s.title}</h2>
              <p className="text-secondary/75 text-base md:text-lg leading-relaxed whitespace-pre-line">{s.text}</p>
            </section>
          ))}
        </div>

        <aside className="space-y-6">
          <div className="glass-card p-7 rounded-xl">
            <span className="eyebrow text-primary">{t("common.key_features")}</span>
            <ul className="mt-5 space-y-3">
              {Array.isArray(features) && features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-secondary/85 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-secondary text-primary-foreground p-7">
            <h3 className="display-serif text-2xl mb-3">{t("common.cta_title")}</h3>
            <p className="text-primary-foreground/80 text-sm mb-5">{t("common.cta_subtext")}</p>
            <div className="flex flex-col gap-3">
              <Link to="/request" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors">
                {t("common.request")} →
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-5 py-3 text-sm font-semibold rounded-md hover:bg-white/10 transition-colors">
                {t("common.contact")}
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
};

export default ServiceDetailPage;
