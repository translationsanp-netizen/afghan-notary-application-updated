import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users,
  Settings2,
  FileSearch,
  UserCheck,
  ClipboardCheck,
  BadgeCheck,
  Lock,
  Globe2,
  Languages,
  GraduationCap,
  Stethoscope,
  Scale,
  Building2,
} from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

const portals = [
  { icon: Users, title: "Client Portal", text: "Submit, track and manage projects with full transparency." },
  { icon: Languages, title: "Linguist Workspace", text: "Assigned tasks, glossaries, QA tooling and delivery in one place." },
  { icon: Settings2, title: "Admin Control", text: "Governance, role management, audit trails and reporting." },
];

const capabilities = [
  { icon: BadgeCheck, title: "Certified Translation", text: "Officially certified output accepted by ministries and embassies." },
  { icon: Scale, title: "Legal Translation", text: "Contracts, judgments, statutes — handled by legal linguists." },
  { icon: Building2, title: "Policy & Government", text: "Confidential institutional documentation at scale." },
  { icon: Stethoscope, title: "Technical & Medical", text: "Specialized terminology with subject-matter review." },
  { icon: GraduationCap, title: "Academic & Research", text: "Theses, papers and credentials prepared for global use." },
  { icon: Globe2, title: "Multilingual Documentation", text: "Coordinated multi-language delivery from a single intake." },
];

const steps = [
  { icon: Lock, title: "Secure Intake", text: "Encrypted upload and routing." },
  { icon: Sparkles, title: "AI Analysis", text: "Automated triage and prep." },
  { icon: UserCheck, title: "Linguist Assignment", text: "Matched by domain and language." },
  { icon: ClipboardCheck, title: "Multi-layer QA", text: "Editor, reviewer, compliance." },
  { icon: BadgeCheck, title: "Certification", text: "Notarized and delivered." },
];

const TmuPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden bg-gradient-to-br from-secondary via-secondary to-secondary/90 text-white">
        <div className="absolute inset-0 opacity-40" style={{ background: "var(--gradient-radial)" }} />
        <div className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl" />
        <div className="container-editorial relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold mb-5"
              >
                Institutional Language Platform
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="display-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.05] mb-6"
              >
                Translation Management Unit <span className="text-primary">(TMU)</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-lg md:text-xl text-white/75 mb-4 max-w-xl"
              >
                A centralized platform for managing institutional translation operations at scale.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-white/60 max-w-xl mb-8"
              >
                The TMU operates as the digital backbone of multilingual communication within Afghan
                Notary Public — enabling secure, compliant, high-volume translation workflows.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="flex flex-wrap gap-3"
              >
                <a href="https://tmu-afghannotary.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-primary text-primary-foreground font-medium hover:-translate-y-0.5 transition-all">
                  Access TMU Portal <ArrowRight className="h-4 w-4" />
                </a>
                <Link to="/request" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-white/20 text-white font-medium hover:bg-white/5 transition-all">
                  Request a Translation
                </Link>
              </motion.div>
            </div>

            {/* Animated dashboard visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-5">
                <div className="rounded-xl bg-secondary/60 border border-white/10 overflow-hidden">
                  <div className="h-7 bg-black/30 flex items-center px-3 gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                  </div>
                  <div className="p-5 space-y-3">
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.15 }}
                        className="flex items-center gap-3 p-3 rounded-md bg-white/5 border border-white/10"
                      >
                        <div className="h-8 w-8 rounded bg-primary/30 border border-primary/50" />
                        <div className="flex-1 space-y-1.5">
                          <div className="h-1.5 w-32 bg-white/20 rounded" />
                          <div className="h-1 w-20 bg-white/10 rounded" />
                        </div>
                        <div className="h-5 px-2 rounded bg-primary/30 text-[10px] text-primary flex items-center font-medium">Active</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OVERVIEW — Portals */}
      <section className="py-24 md:py-28">
        <div className="container-editorial">
          <div className="max-w-2xl mb-14">
            <p className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold mb-4">Platform Overview</p>
            <h2 className="display-serif text-secondary text-[clamp(1.8rem,3.5vw,2.5rem)] leading-tight mb-4">
              A Structured Language Operations System
            </h2>
            <p className="text-muted-foreground">
              Centralized control, secure workflows, and multi-role access — for clients, linguists and administrators.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {portals.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group rounded-xl border border-border bg-white p-7 hover:shadow-[0_20px_40px_-20px_hsl(193_99%_46%/0.3)] hover:border-primary/30 transition-all"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-secondary mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-24 md:py-28 bg-muted/40">
        <div className="container-editorial">
          <div className="max-w-2xl mb-14">
            <p className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold mb-4">Core Capabilities</p>
            <h2 className="display-serif text-secondary text-[clamp(1.8rem,3.5vw,2.5rem)] leading-tight">
              Specialized translation across institutional domains.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                whileHover={{ y: -3 }}
                className="rounded-xl bg-white border border-border p-6 hover:border-primary/40 hover:shadow-lg transition-all"
              >
                <c.icon className="h-6 w-6 text-primary mb-4" />
                <h3 className="font-semibold text-secondary mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW PIPELINE */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="container-editorial">
          <div className="max-w-2xl mb-16 mx-auto text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold mb-4">Signature Workflow</p>
            <h2 className="display-serif text-secondary text-[clamp(1.8rem,3.5vw,2.5rem)] leading-tight">
              From intake to certification — one controlled pipeline.
            </h2>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
              className="hidden lg:block absolute top-8 left-[8%] right-[8%] h-px bg-gradient-to-r from-primary via-primary to-primary/30"
            />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-4">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.18 }}
                  className="relative text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.18, type: "spring" }}
                    className="relative mx-auto h-16 w-16 rounded-full bg-white border-2 border-primary flex items-center justify-center text-primary mb-5 shadow-lg shadow-primary/20"
                  >
                    <s.icon className="h-6 w-6" />
                    <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-secondary text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </motion.div>
                  <h3 className="font-semibold text-secondary mb-1">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">{s.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI + COMPLIANCE */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ background: "var(--gradient-radial)" }} />
        <div className="container-editorial relative grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Sparkles className="h-8 w-8 text-primary mb-5" />
            <h2 className="display-serif text-3xl md:text-4xl mb-4">AI-Assisted, Human-Verified</h2>
            <p className="text-white/70 mb-6">
              TMU combines AI-driven analysis and preparation with rigorous human linguistic review —
              maximizing accuracy without compromising accountability.
            </p>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>• AI-assisted document analysis and term extraction</li>
              <li>• Human validation by certified linguists</li>
              <li>• Continuous quality optimization</li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <ShieldCheck className="h-8 w-8 text-primary mb-5" />
            <h2 className="display-serif text-3xl md:text-4xl mb-4">Trust & Compliance</h2>
            <p className="text-white/70 mb-6">
              Every project is handled within an institutional governance framework — confidential,
              auditable, and aligned with regulatory standards.
            </p>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>• Confidentiality agreements and secure transmission</li>
              <li>• Institutional QA gates</li>
              <li>• Full legal compliance and audit trail</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="container-editorial">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-12 md:p-16 text-center relative overflow-hidden">
            <FileSearch className="absolute -top-4 -right-4 h-40 w-40 text-white/10" />
            <h2 className="display-serif text-3xl md:text-5xl mb-4">Access the TMU Platform</h2>
            <p className="text-white/85 max-w-xl mx-auto mb-8">
              Step into a centralized environment built for institutional translation operations.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://tmu-afghannotary.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-white text-primary font-medium hover:-translate-y-0.5 transition-all">
                Client Portal <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://tmu-afghannotary.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-white/40 text-white font-medium hover:bg-white/10 transition-all">
                Linguist Portal
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TmuPage;
