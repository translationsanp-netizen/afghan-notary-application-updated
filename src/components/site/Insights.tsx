import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const articles = [
  { tag: "Guide", t: "When do you actually need notarization?", d: "Understanding the moments where certification is non-negotiable." },
  { tag: "Explained", t: "Apostille, demystified.", d: "How a single stamp opens 120+ borders for your documents." },
  { tag: "Process", t: "Legalizing documents for use abroad.", d: "A clear walkthrough of consular and embassy procedures." },
];

const Insights = () => (
  <section id="insights" className="bg-muted py-28 md:py-40">
    <div className="container-editorial">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
        <div>
          <p className="eyebrow mb-4">07 — Insights</p>
          <h2 className="display-serif text-secondary text-4xl md:text-6xl max-w-2xl text-balance">
            Insights & legal updates.
          </h2>
        </div>
        <a href="#" className="story-link text-secondary text-sm uppercase tracking-[0.2em]">View all →</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
        {articles.map((a, i) => (
          <motion.a
            key={a.t}
            href="#"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="group bg-background p-8 md:p-10 min-h-[360px] flex flex-col justify-between transition-colors duration-500 hover:bg-background"
          >
            <div className="aspect-[4/3] -mx-8 -mt-8 md:-mx-10 md:-mt-10 mb-8 overflow-hidden bg-secondary relative">
              <div className="absolute inset-0 gradient-hero-bg animate-gradient-shift opacity-80 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4 text-xs uppercase tracking-[0.2em] text-white/90 bg-secondary/40 backdrop-blur px-3 py-1">
                {a.tag}
              </div>
            </div>
            <div>
              <h3 className="display-serif text-2xl text-secondary group-hover:text-primary transition-colors duration-500 text-balance">
                {a.t}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a.d}</p>
              <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-secondary">
                Read article <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default Insights;
