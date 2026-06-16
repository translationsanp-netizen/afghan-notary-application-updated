import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Network, FileCheck2, LockKeyhole, Workflow } from "lucide-react";

const bullets = [
  { icon: Workflow, text: "Institutional-grade translation workflows" },
  { icon: FileCheck2, text: "Certified, legal, and technical document handling" },
  { icon: LockKeyhole, text: "Secure portal-based submission and tracking" },
  { icon: Network, text: "Network of vetted, specialized linguists" },
  { icon: ShieldCheck, text: "Governed QA and compliance systems" },
];

const TmuIntroSection = () => {
  return (
    <section id="tmu" className="relative py-24 md:py-32 bg-gradient-to-b from-background to-muted/40 overflow-hidden">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT — Visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-2xl bg-white border border-border shadow-[0_40px_80px_-30px_hsl(209_56%_4%/0.25)] p-6 md:p-8"
            >
              {/* Mock dashboard */}
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-muted to-background border border-border overflow-hidden">
                <div className="h-8 bg-secondary flex items-center px-3 gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white/30" />
                  <span className="h-2 w-2 rounded-full bg-white/30" />
                  <span className="h-2 w-2 rounded-full bg-white/30" />
                  <span className="ml-3 text-[10px] text-white/60 font-mono">tmu-afghannotary.com</span>
                </div>
                <div className="p-5 grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="rounded-md bg-white border border-border p-3"
                    >
                      <div className="h-1.5 w-8 bg-primary/60 rounded mb-2" />
                      <div className="h-1 w-full bg-muted rounded mb-1" />
                      <div className="h-1 w-2/3 bg-muted rounded" />
                    </motion.div>
                  ))}
                  <div className="col-span-3 h-32 rounded-md bg-white border border-border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-2 w-20 bg-secondary/60 rounded" />
                      <div className="h-2 w-12 bg-primary/40 rounded" />
                    </div>
                    <div className="grid grid-cols-5 gap-2 items-end h-16">
                      {[40, 70, 50, 90, 60].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.08, duration: 0.6 }}
                          className="bg-gradient-to-t from-primary to-primary-glow rounded-sm"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Floating mobile mockup */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -right-2 md:-right-6 w-32 md:w-40 rounded-2xl bg-secondary border-4 border-secondary shadow-2xl overflow-hidden"
            >
              <div className="aspect-[9/16] bg-gradient-to-br from-secondary to-secondary/80 p-3">
                <div className="h-1 w-8 bg-white/30 rounded mx-auto mb-3" />
                <div className="space-y-2">
                  <div className="h-6 rounded bg-white/10 border border-white/10" />
                  <div className="h-12 rounded bg-primary/30 border border-primary/40" />
                  <div className="h-6 rounded bg-white/10" />
                  <div className="h-6 rounded bg-white/10" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold mb-5"
            >
              Institutional Language Solutions
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="display-serif text-secondary text-[clamp(2rem,4vw,3rem)] leading-[1.08] mb-4"
            >
              Translation Management Unit <span className="text-primary">(TMU)</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-secondary/80 mb-6"
            >
              A Specialized Language Operations Platform of Afghan Notary Public.
            </motion.p>

            <div className="h-px w-16 bg-primary mb-6" />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-muted-foreground leading-relaxed mb-8 max-w-xl"
            >
              The TMU is a centralized digital platform designed to manage high-volume, multilingual
              translation workflows with precision, security, and institutional compliance — bringing
              clients, linguists, and governance under a single, secure system.
            </motion.p>

            <ul className="space-y-3 mb-10">
              {bullets.map((b, i) => (
                <motion.li
                  key={b.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3 text-secondary/90"
                >
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
                    <b.icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm md:text-[15px]">{b.text}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                to="/tmu"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
              >
                Access TMU Platform <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/tmu"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-secondary/20 text-secondary font-medium hover:border-primary hover:text-primary transition-all"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TmuIntroSection;
