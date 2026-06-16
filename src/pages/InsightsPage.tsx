import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "@/components/site/PageShell";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { versionedImage } from "@/lib/versionedImage";

type DbInsight = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  cover_image: string | null;
  updated_at?: string | null;
};

const Insights = () => {
  const { t } = useTranslation();
  const fallback = t("insightsPage.articles", { returnObjects: true }) as { title: string; excerpt: string; tag: string }[];
  const [rows, setRows] = useState<DbInsight[] | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("insights")
        .select("id, slug, title, excerpt, category, cover_image, updated_at")
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false });
      setRows((data ?? []) as DbInsight[]);
    })();
  }, []);

  const showFallback = rows !== null && rows.length === 0;

  return (
    <PageShell
      eyebrow={t("insightsPage.eyebrow")}
      title={t("insightsPage.title")}
      intro={t("insightsPage.intro")}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {showFallback &&
          fallback.map((a, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group glass-card p-8 rounded-xl border border-border hover:border-primary/40 hover:-translate-y-1 transition-all duration-500"
            >
              <span className="eyebrow text-primary">{a.tag}</span>
              <h3 className="display-serif text-secondary text-xl md:text-2xl mt-3 mb-4 leading-snug">{a.title}</h3>
              <p className="text-secondary/70 leading-relaxed mb-6">{a.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                {t("common.read_more")} <ArrowUpRight className="h-4 w-4" />
              </span>
            </motion.article>
          ))}

        {(rows ?? []).map((a, i) => (
          <motion.article
            key={a.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              to={`/insights/${a.slug}`}
              className="group block glass-card rounded-xl border border-border hover:border-primary/40 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
            >
              {a.cover_image && (
                <div className="aspect-[16/9] overflow-hidden bg-muted">
                  <img src={versionedImage(a.cover_image, a.updated_at) ?? a.cover_image} alt={a.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
              )}
              <div className="p-8">
                {a.category && <span className="eyebrow text-primary">{a.category}</span>}
                <h3 className="display-serif text-secondary text-xl md:text-2xl mt-3 mb-4 leading-snug">{a.title}</h3>
                {a.excerpt && <p className="text-secondary/70 leading-relaxed mb-6 line-clamp-3">{a.excerpt}</p>}
                <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                  {t("common.read_more")} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
};

export default Insights;
