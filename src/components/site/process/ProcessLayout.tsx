import { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, Clock, FileText, ShieldCheck } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

export type Step = {
  title: string;
  text: string;
  icon: ReactNode;
};

export type UseCase = { icon: ReactNode; title: string; text: string };
export type DocItem = { icon: ReactNode; label: string };
export type FAQItem = { q: string; a: string };

export interface ProcessLayoutProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  hero: ReactNode;
  overviewTitle: string;
  overviewText: string;
  steps: Step[];
  documents: DocItem[];
  trust: { title: string; text: string; icon?: ReactNode };
  processingTime: string;
  useCases: UseCase[];
  faqs: FAQItem[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  extraSections?: ReactNode;
}

const ProcessLayout = ({
  eyebrow,
  title,
  subtitle,
  description,
  hero,
  overviewTitle,
  overviewText,
  steps,
  documents,
  trust,
  processingTime,
  useCases,
  faqs,
  ctaTitle,
  ctaText,
  ctaButton,
  extraSections,
}: ProcessLayoutProps) => {
  const { scrollYProgress } = useScroll();
  const lineHeight = useTransform(scrollYProgress, [0.25, 0.7], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-br from-muted via-background to-muted">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--secondary)) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="container-editorial relative grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow text-primary">{eyebrow}</span>
            <h1 className="display-serif text-secondary text-4xl md:text-6xl mt-4 leading-[1.05]">{title}</h1>
            <p className="mt-6 text-xl text-secondary/85 leading-relaxed">{subtitle}</p>
            <p className="mt-4 text-secondary/70 leading-relaxed max-w-xl">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/request" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-all hover:shadow-lg">
                {ctaButton} <span aria-hidden>→</span>
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-secondary/20 text-secondary font-medium rounded-md hover:bg-secondary/5 transition-all">
                Talk to a specialist
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[420px] lg:h-[520px]"
          >
            {hero}
          </motion.div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container-editorial max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="display-serif text-secondary text-3xl md:text-5xl"
          >
            {overviewTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-6 text-lg text-secondary/70 leading-relaxed"
          >
            {overviewText}
          </motion.p>

          {/* Pipeline icon row */}
          <div className="mt-14 flex items-center justify-between gap-2 max-w-3xl mx-auto">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center flex-1 last:flex-initial">
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center text-primary shrink-0"
                >
                  {s.icon}
                </motion.div>
                {i < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.1, duration: 0.5 }}
                    className="flex-1 h-px bg-gradient-to-r from-primary/40 to-primary/10 origin-left mx-2"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEP-BY-STEP TIMELINE */}
      <section className="py-20 md:py-28 bg-muted relative">
        <div className="container-editorial">
          <div className="text-center mb-16">
            <span className="eyebrow text-primary">Step-by-step</span>
            <h2 className="display-serif text-secondary text-3xl md:text-5xl mt-3">A guided legal workflow</h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Animated vertical line */}
            <div className="absolute left-7 md:left-9 top-0 bottom-0 w-px bg-border" aria-hidden />
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-7 md:left-9 top-0 w-px bg-gradient-to-b from-primary via-primary to-primary/30 origin-top"
              aria-hidden
            />

            <div className="space-y-14">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-20 md:pl-24 group"
                >
                  <motion.span
                    whileHover={{ scale: 1.08 }}
                    className="absolute left-0 top-0 inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_-8px_hsl(193_99%_46%/0.5)] z-10"
                  >
                    {s.icon}
                  </motion.span>
                  <span className="eyebrow text-primary">{`Step ${String(i + 1).padStart(2, "0")}`}</span>
                  <h3 className="display-serif text-secondary text-2xl md:text-3xl mt-2 mb-3 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-secondary/70 leading-relaxed text-base md:text-lg">{s.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {extraSections}

      {/* REQUIRED DOCUMENTS */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container-editorial">
          <div className="text-center mb-14">
            <span className="eyebrow text-primary">Documentation</span>
            <h2 className="display-serif text-secondary text-3xl md:text-5xl mt-3">Documents you may need</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {documents.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/40 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {d.icon ?? <FileText className="h-5 w-5" />}
                </div>
                <p className="text-secondary font-medium text-sm">{d.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BLOCK */}
      <section className="py-20 md:py-28 bg-secondary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 20% 30%, hsl(var(--primary)) 0, transparent 50%)" }} />
        <div className="container-editorial relative grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <ShieldCheck className="h-12 w-12 text-primary mb-5" strokeWidth={1.4} />
            <h2 className="display-serif text-3xl md:text-5xl">{trust.title}</h2>
            <p className="mt-5 text-primary-foreground/75 leading-relaxed text-lg">{trust.text}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square max-w-sm mx-auto"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <motion.circle
                cx="100" cy="100" r="80"
                stroke="hsl(var(--primary))" strokeWidth="1" fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              />
              <motion.circle
                cx="100" cy="100" r="60"
                stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.3 }}
              />
              <motion.path
                d="M70 100 l20 20 l40 -40"
                stroke="hsl(var(--primary))" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1 }}
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* PROCESSING TIME */}
      <section className="py-20 bg-muted">
        <div className="container-editorial max-w-3xl">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="shrink-0"
            >
              <Clock className="h-16 w-16 text-primary" strokeWidth={1.2} />
            </motion.div>
            <div className="flex-1 text-center md:text-left">
              <span className="eyebrow text-primary">Turnaround</span>
              <h3 className="display-serif text-secondary text-2xl md:text-3xl mt-2">Efficient. Precise. Reliable.</h3>
              <p className="text-secondary/70 mt-3 leading-relaxed">{processingTime}</p>
              <div className="mt-5 h-1.5 bg-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "85%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-primary-glow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container-editorial">
          <div className="text-center mb-14">
            <span className="eyebrow text-primary">Who it's for</span>
            <h2 className="display-serif text-secondary text-3xl md:text-5xl mt-3">Built for global needs</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {useCases.map((u, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-card border border-border rounded-xl p-7 hover:border-primary/40 hover:shadow-xl transition-all"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {u.icon}
                </div>
                <h3 className="display-serif text-secondary text-xl mb-2">{u.title}</h3>
                <p className="text-secondary/65 text-sm leading-relaxed">{u.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="container-editorial max-w-3xl">
          <div className="text-center mb-12">
            <span className="eyebrow text-primary">FAQ</span>
            <h2 className="display-serif text-secondary text-3xl md:text-5xl mt-3">Frequently asked</h2>
          </div>
          <Accordion type="single" collapsible className="bg-card border border-border rounded-xl px-6">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border last:border-0">
                <AccordionTrigger className="text-left text-secondary font-medium py-5 hover:no-underline hover:text-primary">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-secondary/70 leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-secondary via-secondary to-secondary/90">
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0 opacity-30"
          style={{
            background: "linear-gradient(120deg, hsl(var(--primary)/0.4), transparent 50%, hsl(var(--primary)/0.3))",
            backgroundSize: "200% 200%",
          }}
        />
        <div className="container-editorial relative text-center max-w-3xl">
          <h2 className="display-serif text-primary-foreground text-3xl md:text-5xl">{ctaTitle}</h2>
          <p className="mt-5 text-primary-foreground/75 text-lg leading-relaxed">{ctaText}</p>
          <Link
            to="/request"
            className="mt-9 inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-md transition-all hover:scale-105 shadow-[0_0_40px_hsl(193_99%_46%/0.5)] hover:shadow-[0_0_60px_hsl(193_99%_46%/0.7)]"
          >
            {ctaButton} <span aria-hidden>→</span>
          </Link>
          <div className="mt-6 flex items-center justify-center gap-2 text-primary-foreground/60 text-sm">
            <CheckCircle2 className="h-4 w-4 text-primary" /> Trusted • Certified • Internationally recognized
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProcessLayout;
