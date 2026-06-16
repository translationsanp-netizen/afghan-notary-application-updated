import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  FileSearch,
  Languages,
  ShieldCheck,
  CheckCircle2,
  Award,
  ArrowUpRight,
  Sparkles,
  Globe2,
  Users,
  Briefcase,
  GraduationCap,
  Building2,
  FileText,
} from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import CompanyProfileFlipbook from "@/components/site/CompanyProfileFlipbook";

/* ---------- Reusable: scroll-reveal text (gray → ink) ---------- */
const ScrollText = ({ text }: { text: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.25"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className="display-serif text-[clamp(1.5rem,3.6vw,3rem)] leading-[1.2] text-balance">
      {words.map((w, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        const opacity = useTransform(scrollYProgress, [start, end], [0.18, 1]);
        const color = useTransform(
          scrollYProgress,
          [start, end],
          ["hsl(209 14% 75%)", "hsl(var(--secondary))"]
        );
        return (
          <span key={i} className="inline-block mr-[0.25em]">
            <motion.span style={{ opacity, color }}>{w}</motion.span>
          </span>
        );
      })}
    </p>
  );
};

/* ---------- Page ---------- */
const About = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About — BA Afghan Notary Public";
  }, []);

  const heroEyebrow = "About";
  const heroTitle = "A Trusted Partner in Legal Documentation.";
  const heroIntro =
    "Delivering precise, compliant, and internationally recognized documentation services to individuals, businesses, and institutions across borders.";

  /* Approach steps */
  const approachSteps = [
    {
      icon: FileSearch,
      title: "Document Assessment",
      text:
        "Each document is carefully reviewed to determine its purpose, destination, and required level of certification — ensuring the right processes are applied from the outset.",
    },
    {
      icon: Languages,
      title: "Terminology & Consistency",
      text:
        "We apply standardized terminology across legal and technical fields to maintain consistency between source and translated documents — critical where precision is essential.",
    },
    {
      icon: CheckCircle2,
      title: "Multi-Stage Review",
      text:
        "Every document undergoes multiple stages of review, including linguistic verification and compliance checks, to ensure accuracy and completeness.",
    },
    {
      icon: ShieldCheck,
      title: "Compliance Alignment",
      text:
        "We align each document with the requirements of the receiving authority, institution, or jurisdiction — so formatting, structure, and certification meet expectations.",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      text:
        "Our internal quality control processes ensure that every document delivered meets the highest standards of accuracy, clarity, and professionalism.",
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

  /* Who we serve */
  const audience = [
    {
      icon: Users,
      title: "Individuals",
      text: "Personal legal matters such as immigration, marriage, inheritance, and official documentation — handled with discretion and care.",
    },
    {
      icon: GraduationCap,
      title: "Students",
      text: "Academic transcripts, diplomas, and identity documents prepared for international education opportunities and admissions.",
    },
    {
      icon: Briefcase,
      title: "Businesses",
      text: "Cross-border operations supported with certified contracts, agreements, and corporate documentation.",
    },
    {
      icon: Building2,
      title: "Organizations & NGOs",
      text: "Administrative and operational documentation prepared for international engagement and compliance.",
    },
  ];

  /* Core values */
  const values = [
    { n: "01", title: "Accuracy & Precision", text: "Every document processed with meticulous attention to language, format, and legal structure." },
    { n: "02", title: "Integrity", text: "Transparency and professionalism in every interaction, ensuring trust and accountability." },
    { n: "03", title: "Confidentiality", text: "Strict confidentiality protocols and secure systems protect client data at all times." },
    { n: "04", title: "Efficiency", text: "Timely delivery within defined timelines, without compromise to quality." },
    { n: "05", title: "Continuous Improvement", text: "We continuously refine our processes, tools, and expertise to align with evolving standards." },
  ];

  /* Services strip */
  const servicesStrip = [
    { title: "Certified Translation", text: "Linguistic and legal accuracy", href: "/translation" },
    { title: "Notarization", text: "Authentication & verification", href: "/notarization" },
    { title: "Legalization", text: "Foreign-jurisdiction recognition", href: "/legalization" },
    { title: "Apostille", text: "Hague Convention certification", href: "/apostille" },
    { title: "Legal Drafting", text: "Structured legal documents", href: "/legal-drafting" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ============ 1. HERO ============ */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-muted/40 to-muted" />
        <div className="absolute top-20 right-[10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl -z-10" />

        <div className="container-editorial relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="h-px w-10 bg-primary" />
                <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                  {heroEyebrow}
                </span>
              </motion.div>

              <h1 className="display-serif text-secondary text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.05] text-balance">
                {heroTitle.split(" ").map((w, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block mr-[0.25em]"
                  >
                    {w}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="mt-8 max-w-xl text-base md:text-lg text-secondary/65 leading-relaxed"
              >
                {heroIntro}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.85 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 hover:shadow-lg transition-all"
                >
                  Explore Services <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-secondary/20 text-secondary rounded-md text-sm font-medium hover:border-secondary hover:bg-secondary hover:text-secondary-foreground transition-all"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>

            {/* Right visual: floating document layers */}
            <div className="lg:col-span-5 relative h-[420px] hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="absolute inset-0"
              >
                {[
                  { x: 0, y: 0, rot: -6, delay: 0 },
                  { x: 40, y: 60, rot: 4, delay: 0.2 },
                  { x: -30, y: 120, rot: -2, delay: 0.4 },
                ].map((d, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [d.y, d.y - 10, d.y] }}
                    transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
                    style={{ left: d.x, top: d.y, rotate: `${d.rot}deg` }}
                    className="absolute w-[260px] h-[340px] bg-background rounded-xl shadow-[0_25px_60px_-25px_hsl(209_56%_21%/0.3)] border border-border p-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-xs uppercase tracking-wider text-secondary/60 font-medium">
                        Document {i + 1}
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      {[100, 85, 92, 70, 95, 60, 88].map((w, k) => (
                        <div
                          key={k}
                          className="h-1.5 rounded-full bg-secondary/10"
                          style={{ width: `${w}%` }}
                        />
                      ))}
                    </div>
                    <div className="absolute bottom-6 right-6 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMPANY PROFILE FLIPBOOK ============ */}
      <section className="bg-gradient-to-b from-muted to-secondary/[0.04] py-24 md:py-32">
        <div className="container-editorial">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                Company Profile
              </span>
            </div>
            <h2 className="display-serif text-secondary text-3xl md:text-5xl leading-[1.1] mb-5">
              Read our official company profile.
            </h2>
            <p className="text-secondary/65 text-base md:text-lg leading-relaxed">
              Browse the full BA Afghan Notary Public profile in interactive flipbook format,
              or download the complete PDF for offline reference.
            </p>
          </div>
          <CompanyProfileFlipbook />
        </div>
      </section>

      {/* ============ 2. SCROLL STORY ============ */}
      <section className="relative bg-background py-32 md:py-44">
        <div className="container-editorial max-w-5xl">
          <div className="flex items-center gap-3 mb-12">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
              Why Precision Matters
            </span>
          </div>
          <div className="space-y-10 md:space-y-14">
            <ScrollText text="Documents no longer stay within borders." />
            <ScrollText text="They move across systems, languages, and jurisdictions." />
            <ScrollText text="Each step introduces complexity. Each requirement introduces risk." />
            <ScrollText text="We remove that uncertainty." />
          </div>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="inline-block w-[3px] h-8 bg-primary ml-2 align-middle mt-6"
          />
        </div>
      </section>

      {/* ============ 3. ABOUT CORE (split) ============ */}
      <section className="bg-muted/40 py-28 md:py-36 border-y border-border">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-primary" />
                <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                  Who We Are
                </span>
              </div>
              <h2 className="display-serif text-secondary text-3xl md:text-5xl leading-[1.1] mb-8">
                BA Afghan Notary Public
              </h2>
              <div className="space-y-6 text-secondary/75 text-base md:text-lg leading-relaxed">
                <p>
                  BA Afghan Notary Public is a professionally operated legal documentation
                  and certification service provider based in Afghanistan, dedicated to
                  supporting individuals, businesses, and institutions in preparing
                  documents for both domestic and international use.
                </p>
                <p>
                  In today’s increasingly interconnected global environment, documents are
                  no longer confined within national boundaries. They move across
                  jurisdictions, languages, and legal systems — each step requiring
                  precision, compliance, and careful handling. Even minor inconsistencies
                  can result in delays, rejections, or legal complications.
                </p>
                <p className="text-secondary font-medium">
                  Our role is to eliminate that risk.
                </p>
                <p>
                  We ensure that every document we process meets the legal, linguistic,
                  and procedural standards required for acceptance by authorities,
                  institutions, and organizations worldwide. From initial translation to
                  final certification, our services are structured to deliver clarity,
                  reliability, and full compliance at every stage.
                </p>
              </div>
            </motion.div>

            {/* Floating visual */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-32 space-y-5">
                {[
                  { label: "Linguistic Accuracy", value: "100%", icon: Languages },
                  { label: "Legal Validity", value: "Certified", icon: ShieldCheck },
                  { label: "International Standards", value: "Aligned", icon: Globe2 },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    className="flex items-center gap-4 p-6 bg-background border border-border rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <card.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-secondary/55 font-medium mb-1">
                        {card.label}
                      </div>
                      <div className="display-serif text-secondary text-xl">
                        {card.value}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. GLOBAL CONTEXT ============ */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-muted/40" />
        <div className="container-editorial text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                Our Role in a Global Context
              </span>
              <span className="h-px w-10 bg-primary" />
            </div>
            <h2 className="display-serif text-secondary text-3xl md:text-5xl leading-[1.1] mb-8 text-balance">
              Bridging Afghanistan with the World.
            </h2>
            <p className="text-secondary/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              As global mobility increases, individuals and organizations are required to
              present official documentation in foreign jurisdictions more frequently than
              ever — for education, employment, business expansion, or legal matters.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Certified Translations", text: "Aligned with legal and institutional expectations." },
              { title: "Authentication", text: "Notarization in accordance with recognized standards." },
              { title: "International Use", text: "Legalization and apostille for foreign acceptance." },
            ].map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="p-8 bg-background border border-border rounded-xl text-left hover:border-primary/40 hover:-translate-y-1 transition-all"
              >
                <Globe2 className="h-6 w-6 text-primary mb-4" strokeWidth={1.6} />
                <h3 className="display-serif text-secondary text-xl mb-2">{b.title}</h3>
                <p className="text-secondary/65 text-sm leading-relaxed">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. MISSION & VISION ============ */}
      <section className="bg-muted/40 py-28 md:py-36 border-y border-border">
        <div className="container-editorial">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                eyebrow: "Mission",
                title: "Precision. Reliability. Compliance.",
                text:
                  "To deliver precise, reliable, and internationally compliant legal documentation services that enable our clients to operate confidently across borders. We remove uncertainty by ensuring every translation, certification, and procedure is handled with accuracy and full adherence to applicable standards.",
                from: -40,
              },
              {
                eyebrow: "Vision",
                title: "A Regional Leader, Globally Aligned.",
                text:
                  "To become a leading provider of legal documentation services in the region, recognized for excellence, trust, and adherence to international standards. We aim to build a reputation defined by consistency, transparency, reliability, and alignment with global best practices.",
                from: 40,
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: card.from }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="p-10 md:p-12 bg-background rounded-2xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-6">
                  <Sparkles className="h-3.5 w-3.5" /> {card.eyebrow}
                </span>
                <h3 className="display-serif text-secondary text-2xl md:text-3xl mb-5 leading-tight">
                  {card.title}
                </h3>
                <p className="text-secondary/70 leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. OUR APPROACH ============ */}
      <section className="py-28 md:py-36">
        <div className="container-editorial">
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                Our Approach
              </span>
            </div>
            <h2 className="display-serif text-secondary text-3xl md:text-5xl leading-[1.1] mb-6">
              A structured, methodical approach to every document.
            </h2>
            <p className="text-secondary/65 text-base md:text-lg leading-relaxed">
              Effective documentation is a matter of compliance, structure, and acceptance —
              not language alone. Each project follows the same disciplined workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Step list */}
            <div className="lg:col-span-5 space-y-2">
              {approachSteps.map((s, i) => {
                const Icon = s.icon;
                const active = activeStep === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    onMouseEnter={() => setActiveStep(i)}
                    className={`group w-full text-left p-5 rounded-lg border transition-all duration-300 flex items-center gap-4 ${
                      active
                        ? "border-primary/50 bg-primary/5 shadow-sm"
                        : "border-border hover:border-secondary/30"
                    }`}
                  >
                    <span className={`h-10 w-10 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                      active ? "bg-primary text-primary-foreground" : "bg-muted text-secondary/60"
                    }`}>
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <div className="flex-1">
                      <div className="text-xs text-secondary/50 font-mono mb-0.5">
                        0{i + 1}
                      </div>
                      <div className={`font-medium ${active ? "text-secondary" : "text-secondary/75"}`}>
                        {s.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active detail */}
            <div className="lg:col-span-7 lg:pl-8">
              <div className="sticky top-32 p-10 md:p-12 bg-gradient-to-br from-secondary to-secondary/90 rounded-2xl text-secondary-foreground min-h-[340px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-4">
                      Step 0{activeStep + 1}
                    </div>
                    <h3 className="display-serif text-3xl md:text-4xl mb-6 leading-tight">
                      {approachSteps[activeStep].title}
                    </h3>
                    <p className="text-white/75 text-base md:text-lg leading-relaxed">
                      {approachSteps[activeStep].text}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <div className="mt-8 flex items-center gap-2">
                  {approachSteps.map((_, i) => (
                    <span
                      key={i}
                      className={`h-px transition-all duration-500 ${
                        i === activeStep ? "w-12 bg-primary" : "w-6 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7. SERVICES STRIP ============ */}
      <section className="bg-muted/40 py-24 md:py-32 border-y border-border">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-primary" />
                <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                  Scope of Services
                </span>
              </div>
              <h2 className="display-serif text-secondary text-3xl md:text-4xl leading-tight">
                One reliable provider, end-to-end.
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all"
            >
              View all services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {servicesStrip.map((s, i) => (
              <motion.div
                key={s.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={s.href}
                  className="block h-full p-6 bg-background border border-border rounded-xl hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 group"
                >
                  <div className="text-xs text-primary font-mono mb-3">0{i + 1}</div>
                  <div className="display-serif text-secondary text-lg mb-2 leading-tight">
                    {s.title}
                  </div>
                  <div className="text-xs text-secondary/55 leading-relaxed mb-4">
                    {s.text}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-secondary/30 group-hover:text-primary transition-colors" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 8. WHO WE SERVE ============ */}
      <section className="py-28 md:py-36">
        <div className="container-editorial">
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                Who We Serve
              </span>
            </div>
            <h2 className="display-serif text-secondary text-3xl md:text-5xl leading-[1.1]">
              A diverse client base across borders.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {audience.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-8 bg-background border border-border rounded-xl hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-500"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                  <h3 className="display-serif text-secondary text-xl mb-3">{a.title}</h3>
                  <p className="text-sm text-secondary/65 leading-relaxed">{a.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 9. CORE VALUES ============ */}
      <section className="bg-secondary py-28 md:py-36">
        <div className="container-editorial">
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                Core Values
              </span>
            </div>
            <h2 className="display-serif text-secondary-foreground text-3xl md:text-5xl leading-[1.1]">
              The principles that guide our work.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-7 bg-white/5 border border-white/10 rounded-xl backdrop-blur hover:border-primary/50 hover:bg-white/[0.08] transition-all duration-500"
              >
                <div className="display-serif text-primary text-3xl mb-4">{v.n}</div>
                <h3 className="text-secondary-foreground text-base font-semibold mb-2">
                  {v.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 10. QUALITY COMMITMENT ============ */}
      <section className="py-32 md:py-44 bg-muted/30">
        <div className="container-editorial max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-8">
              Commitment to Quality & Compliance
            </div>
            <p className="display-serif text-secondary text-2xl md:text-4xl leading-[1.25] text-balance">
              At BA Afghan Notary Public, quality is not an outcome —{" "}
              <span className="relative inline-block">
                it is a process.
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 bottom-1 h-[3px] w-full bg-primary origin-left"
                />
              </span>
            </p>
            <p className="mt-10 text-secondary/65 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Every stage of our workflow is designed to ensure that documents meet legal
              requirements, linguistic standards, and institutional expectations — for
              journeys that matter.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ 11. FINAL CTA ============ */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-white/10 blur-3xl -z-10" />
        <div className="container-editorial text-center max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="display-serif text-primary-foreground text-3xl md:text-5xl leading-[1.1] text-balance"
          >
            Work with a trusted partner.
          </motion.h2>
          <p className="mt-6 text-primary-foreground/85 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Ensure your documents are accurate, certified, and recognized — wherever they
            are required.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/request"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/90 hover:shadow-2xl transition-all"
            >
              Start Your Request
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/40 text-primary-foreground rounded-md text-sm font-medium hover:bg-white/10 transition-all"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
