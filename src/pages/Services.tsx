import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Languages,
  FileSignature,
  Stamp,
  ScrollText,
  FileText,
  ArrowUpRight,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Plane,
  Briefcase,
  Scale,
  Building,
  ShieldCheck,
  Globe2,
  Clock,
  Lock,
  Layers,
  BadgeCheck,
} from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

const services = [
  {
    slug: "translation",
    icon: Languages,
    eyebrow: "01",
    title: "Certified Translation",
    summary:
      "Professional translation of official documents with certification ensuring legal acceptance.",
    overview:
      "Certified translation is the foundation of any cross-border documentation process. Documents submitted to foreign institutions must be translated accurately and presented in a format that meets specific legal and administrative requirements.",
    scope: [
      "Legal contracts and agreements",
      "Academic transcripts, diplomas, and certificates",
      "Birth, marriage, and identification documents",
      "Medical and technical documentation",
      "Official correspondence and administrative records",
    ],
    features: [
      "Certified translations suitable for official submission",
      "Accurate terminology aligned with legal and technical standards",
      "Preservation of original document structure and formatting",
      "Multi-language capabilities across regional and international languages",
    ],
  },
  {
    slug: "notarization",
    icon: FileSignature,
    eyebrow: "02",
    title: "Notarization",
    summary:
      "Authentication of signatures and verification of documents in accordance with legal standards.",
    overview:
      "Notarization is a critical step in establishing the authenticity and legal validity of documents. It confirms that a document has been properly executed and that the identities of the signatories have been verified.",
    scope: [
      "Affidavits and sworn statements",
      "Contracts and agreements",
      "Powers of attorney",
      "Declarations and legal confirmations",
    ],
    features: [
      "Identity verification",
      "Witnessed and authenticated signatures",
      "Certification per applicable regulations",
      "Acceptance by receiving institutions",
    ],
  },
  {
    slug: "legalization",
    icon: ScrollText,
    eyebrow: "03",
    title: "Legalization",
    summary:
      "Preparation and certification of documents for recognition by foreign authorities.",
    overview:
      "Legalization is required when documents are intended for use in countries that require formal certification beyond notarization. This process ensures that documents are recognized by foreign governments and institutions.",
    scope: [
      "Government certification processes",
      "Embassy and consular legalization",
      "Multi-step verification procedures",
    ],
    features: [
      "End-to-end coordination with authorities",
      "Compliance with destination requirements",
      "Reduced risk of rejection abroad",
      "Transparent timelines",
    ],
  },
  {
    slug: "apostille",
    icon: Stamp,
    eyebrow: "04",
    title: "Apostille",
    summary:
      "Facilitating simplified international recognition under applicable conventions.",
    overview:
      "The apostille process simplifies international document recognition for countries that are part of the Hague Convention. It replaces multiple legalization steps with a single standardized certification.",
    scope: [
      "Personal documents",
      "Academic records",
      "Legal and corporate documents",
    ],
    features: [
      "Single-step international authentication",
      "Compliance with Hague Convention standards",
      "Recognition across all member states",
      "Faster turnaround than traditional legalization",
    ],
  },
  {
    slug: "legal-drafting",
    icon: FileText,
    eyebrow: "05",
    title: "Legal Drafting",
    summary:
      "Preparation of clear, structured, and legally sound documents for formal use.",
    overview:
      "Legal drafting requires precision, clarity, and alignment with applicable legal frameworks. Poorly drafted documents can lead to misunderstandings, disputes, or rejection by authorities.",
    scope: [
      "Contracts and agreements",
      "Declarations and statements",
      "Formal legal documents for administrative or business use",
    ],
    features: [
      "Clear, structured legal language",
      "Compliance with relevant jurisdictions",
      "Cross-border drafting awareness",
      "Confidential and tailored",
    ],
  },
];

const useCases = [
  { icon: GraduationCap, title: "Education", text: "International admissions, scholarships, and academic verification." },
  { icon: Plane, title: "Immigration", text: "Visa applications, residency permits, and embassy submissions." },
  { icon: Briefcase, title: "Business", text: "Cross-border contracts, agreements, and corporate documentation." },
  { icon: Scale, title: "Legal Matters", text: "Property transactions, inheritance, and formal proceedings." },
  { icon: Building, title: "Employment", text: "Certified documents for international employment opportunities." },
];

const whyUs = [
  { icon: BadgeCheck, title: "Certified Professionals", text: "Qualified specialists across legal and linguistic disciplines." },
  { icon: Globe2, title: "International Compliance", text: "Aligned with global standards and destination requirements." },
  { icon: Lock, title: "Confidential Handling", text: "Secure systems and strict confidentiality protocols." },
  { icon: Clock, title: "Fast Turnaround", text: "Defined timelines without compromise to quality." },
];

const differentiators = [
  { title: "End-to-End Service", text: "From translation through to certification — handled under one roof." },
  { title: "Consistent Quality Control", text: "Multi-stage review on every document, every time." },
  { title: "Global Alignment", text: "Documents prepared to meet the requirements of receiving authorities." },
  { title: "Transparent Communication", text: "Clear pricing, defined timelines, and proactive updates." },
];

const Services = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Services — BA Afghan Notary Public";
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-muted/40 to-muted" />
        <div className="absolute top-20 left-[10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl -z-10" />

        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="h-px w-10 bg-primary" />
                <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                  Our Services
                </span>
              </motion.div>
              <h1 className="display-serif text-secondary text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.05] text-balance">
                {"Legal Documentation Services for Global Use.".split(" ").map((w, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.15 + i * 0.05 }}
                    className="inline-block mr-[0.25em]"
                  >
                    {w}
                  </motion.span>
                ))}
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="mt-8 max-w-xl text-base md:text-lg text-secondary/65 leading-relaxed"
              >
                A comprehensive portfolio of translation, notarization, and certification
                services designed to ensure your documents are accurate, compliant, and
                internationally recognized.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.85 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link to="/request" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 hover:shadow-lg transition-all">
                  Request a Service <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link to="/process" className="inline-flex items-center gap-2 px-6 py-3 border border-secondary/20 text-secondary rounded-md text-sm font-medium hover:border-secondary hover:bg-secondary hover:text-secondary-foreground transition-all">
                  See Our Process
                </Link>
              </motion.div>
            </div>

            {/* Document layers visual */}
            <div className="lg:col-span-5 hidden lg:block relative h-[420px]">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.15 }}
                  style={{ top: i * 70, left: i * 30, rotate: `${(i - 1) * 4}deg` }}
                  className="absolute w-[280px] h-[340px] bg-background rounded-xl shadow-[0_30px_60px_-30px_hsl(209_56%_21%/0.35)] border border-border p-7"
                >
                  <div className="flex items-center justify-between mb-5">
                    <FileText className="h-5 w-5 text-primary" />
                    <BadgeCheck className="h-4 w-4 text-primary/40" />
                  </div>
                  <div className="space-y-2">
                    {[100, 75, 90, 65, 88, 72].map((w, k) => (
                      <div key={k} className="h-1.5 rounded-full bg-secondary/10" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ OVERVIEW BLOCK ============ */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="container-editorial max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="display-serif text-secondary text-3xl md:text-5xl leading-[1.1] mb-8 text-balance">
              A complete portfolio for cross-border documentation.
            </h2>
            <p className="text-secondary/70 text-base md:text-lg leading-relaxed mb-10">
              We provide a comprehensive range of legal documentation services designed to
              support individuals and organizations engaged in cross-border activities. Our
              integrated approach ensures consistency, efficiency, and professional
              oversight at every stage.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Precisely translated with linguistic accuracy",
                "Verified and authenticated according to legal standards",
                "Structured and formatted for institutional acceptance",
                "Certified for use across jurisdictions",
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-start gap-3 p-4 rounded-lg bg-muted/40 border border-border"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" strokeWidth={1.8} />
                  <span className="text-secondary/80 text-sm md:text-base">{p}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ CORE SERVICES (large expandable cards) ============ */}
      <section className="bg-muted/40 py-28 md:py-36 border-y border-border">
        <div className="container-editorial">
          <div className="max-w-3xl mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                Core Services
              </span>
            </div>
            <h2 className="display-serif text-secondary text-3xl md:text-5xl leading-[1.1]">
              Five disciplines, one integrated practice.
            </h2>
          </div>

          <div className="space-y-4">
            {services.map((s, i) => {
              const Icon = s.icon;
              const open = openIdx === i;
              return (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`bg-background rounded-2xl border transition-all duration-500 overflow-hidden ${
                    open ? "border-primary/40 shadow-xl" : "border-border hover:border-primary/30 hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="w-full text-left p-6 md:p-8 flex items-center gap-6"
                  >
                    <div className={`h-14 w-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      open ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                    }`}>
                      <Icon className="h-6 w-6" strokeWidth={1.6} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-primary font-mono mb-1.5">{s.eyebrow}</div>
                      <h3 className="display-serif text-secondary text-xl md:text-2xl mb-1.5">{s.title}</h3>
                      <p className="text-sm text-secondary/60 leading-relaxed">{s.summary}</p>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-secondary/40 shrink-0 transition-transform duration-500 ${open ? "rotate-180 text-primary" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-8 md:pb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:pl-[6.5rem]">
                          <div className="lg:col-span-7">
                            <p className="text-secondary/75 leading-relaxed mb-6">{s.overview}</p>
                            <div className="text-xs uppercase tracking-[0.2em] text-secondary/50 font-semibold mb-3">
                              Scope
                            </div>
                            <ul className="space-y-2">
                              {s.scope.map((sc) => (
                                <li key={sc} className="flex items-start gap-2.5 text-sm text-secondary/75">
                                  <span className="mt-2 h-1 w-1 rounded-full bg-primary shrink-0" />
                                  {sc}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="lg:col-span-5 lg:border-l lg:border-border lg:pl-8">
                            <div className="text-xs uppercase tracking-[0.2em] text-secondary/50 font-semibold mb-3">
                              Key Features
                            </div>
                            <ul className="space-y-2.5 mb-6">
                              {s.features.map((f) => (
                                <li key={f} className="flex items-start gap-2.5 text-sm text-secondary/75">
                                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" strokeWidth={1.8} />
                                  {f}
                                </li>
                              ))}
                            </ul>
                            <Link to={`/${s.slug}`} className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all">
                              Full service details <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ WORKFLOW ============ */}
      <section className="py-28 md:py-36">
        <div className="container-editorial">
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                Service Workflow
              </span>
            </div>
            <h2 className="display-serif text-secondary text-3xl md:text-5xl leading-[1.1] mb-6">
              An integrated workflow, end-to-end.
            </h2>
            <p className="text-secondary/65 text-base md:text-lg leading-relaxed">
              Our services function as a continuous process — each stage building on the
              previous one — so your documents are fully prepared for international use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* connecting line */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />
            {[
              { icon: Languages, title: "Translation", text: "Linguistic accuracy aligned with legal context." },
              { icon: FileSignature, title: "Notarization", text: "Identity verification and signature authentication." },
              { icon: Stamp, title: "Legalization / Apostille", text: "Final certification for international acceptance." },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.18 }}
                  className="relative bg-background border border-border rounded-2xl p-8 text-center hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-500"
                >
                  <div className="inline-flex h-24 w-24 rounded-full bg-primary/10 items-center justify-center mb-6 relative">
                    <Icon className="h-9 w-9 text-primary" strokeWidth={1.4} />
                    <span className="absolute -top-1 -right-1 h-7 w-7 rounded-full bg-secondary text-secondary-foreground text-xs flex items-center justify-center font-semibold">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="display-serif text-secondary text-2xl mb-3">{step.title}</h3>
                  <p className="text-sm text-secondary/65 leading-relaxed">{step.text}</p>
                  {i < 2 && (
                    <ArrowRight className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 h-5 w-5 text-primary/50" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ USE CASES ============ */}
      <section className="bg-muted/40 py-28 md:py-36 border-y border-border">
        <div className="container-editorial">
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                Where Our Services Apply
              </span>
            </div>
            <h2 className="display-serif text-secondary text-3xl md:text-5xl leading-[1.1]">
              Real-world scenarios we support.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {useCases.map((u, i) => {
              const Icon = u.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="p-6 bg-background border border-border rounded-xl hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                >
                  <Icon className="h-6 w-6 text-primary mb-4" strokeWidth={1.6} />
                  <h3 className="display-serif text-secondary text-lg mb-2">{u.title}</h3>
                  <p className="text-xs text-secondary/65 leading-relaxed">{u.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="py-28 md:py-36">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-primary" />
                <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                  Why Choose Us
                </span>
              </div>
              <h2 className="display-serif text-secondary text-3xl md:text-5xl leading-[1.1] mb-6">
                Legal expertise, structured for reliability.
              </h2>
              <p className="text-secondary/65 leading-relaxed">
                We combine legal expertise with structured processes to deliver reliable
                and internationally compliant documentation services — every time.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyUs.map((w, i) => {
                const Icon = w.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="p-6 border border-border rounded-xl hover:border-primary/40 hover:shadow-lg transition-all duration-500"
                  >
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </div>
                    <h3 className="text-secondary font-semibold mb-2">{w.title}</h3>
                    <p className="text-sm text-secondary/65 leading-relaxed">{w.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ DIFFERENTIATION ============ */}
      <section className="bg-secondary py-28 md:py-36">
        <div className="container-editorial">
          <div className="max-w-3xl mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                What Sets Us Apart
              </span>
            </div>
            <h2 className="display-serif text-secondary-foreground text-3xl md:text-5xl leading-[1.1]">
              An integrated, structured approach.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {differentiators.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-7 bg-white/5 border border-white/10 rounded-xl backdrop-blur hover:border-primary/50 hover:bg-white/[0.08] transition-all"
              >
                <Layers className="h-6 w-6 text-primary mb-4" strokeWidth={1.6} />
                <h3 className="text-secondary-foreground font-semibold mb-2">{d.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{d.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-white/10 blur-3xl -z-10" />
        <div className="container-editorial text-center max-w-3xl">
          <ShieldCheck className="h-12 w-12 text-primary-foreground/80 mx-auto mb-6" strokeWidth={1.4} />
          <h2 className="display-serif text-primary-foreground text-3xl md:text-5xl leading-[1.1] text-balance">
            Prepare your documents for international use.
          </h2>
          <p className="mt-6 text-primary-foreground/85 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Work with a trusted partner to ensure your documents are accurate, certified,
            and recognized across borders.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/request" className="group inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/90 hover:shadow-2xl transition-all">
              Start Your Request
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/40 text-primary-foreground rounded-md text-sm font-medium hover:bg-white/10 transition-all">
              Talk to a Specialist
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Services;
