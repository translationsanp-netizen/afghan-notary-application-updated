import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText,
  Cpu,
  Languages,
  ScanSearch,
  BookOpen,
  ShieldCheck,
  Stamp,
  Globe2,
  UserCheck,
  Sparkles,
  ArrowRight,
  X,
} from "lucide-react";

/* ----------------------------- Data model ----------------------------- */

type Node = {
  id: string;
  label: string;
  icon: typeof FileText;
  detail: string;
  // position inside the 720x1100 viewBox
  x: number;
  y: number;
};

type Cluster = {
  id: string;
  title: string;
  caption: string;
  // scroll progress range when this cluster activates [0..1]
  range: [number, number];
  color: "input" | "ai" | "translation" | "legal" | "output";
  nodes: Node[];
};

const CLUSTERS: Cluster[] = [
  {
    id: "input",
    title: "Document Intake",
    caption: "Secure ingestion of physical & digital sources",
    range: [0.02, 0.18],
    color: "input",
    nodes: [
      {
        id: "raw",
        label: "Raw Document",
        icon: FileText,
        detail: "Encrypted intake of the original file — physical or digital — preserved as the source of truth.",
        x: 360,
        y: 90,
      },
    ],
  },
  {
    id: "ai",
    title: "AI Intelligence Layer",
    caption: "Structure, language & context detection",
    range: [0.18, 0.42],
    color: "ai",
    nodes: [
      {
        id: "analysis",
        label: "AI Analysis",
        icon: Cpu,
        detail: "Automatic detection of document type, layout, and jurisdictional category.",
        x: 200,
        y: 290,
      },
      {
        id: "parse",
        label: "Structure Parsing",
        icon: ScanSearch,
        detail: "Sections, signatures, stamps and metadata are mapped for downstream processing.",
        x: 360,
        y: 260,
      },
      {
        id: "lang",
        label: "Language Detection",
        icon: Languages,
        detail: "Source and target languages identified with dialect awareness for legal contexts.",
        x: 520,
        y: 290,
      },
    ],
  },
  {
    id: "translation",
    title: "Translation Engine",
    caption: "AI-assisted translation, refined by certified linguists",
    range: [0.40, 0.62],
    color: "translation",
    nodes: [
      {
        id: "glossary",
        label: "Terminology Alignment",
        icon: BookOpen,
        detail: "Domain glossaries enforce consistent legal terminology across the document.",
        x: 220,
        y: 470,
      },
      {
        id: "context",
        label: "Contextual Translation",
        icon: Sparkles,
        detail: "Neural translation tuned for legal context, then refined by human experts.",
        x: 500,
        y: 470,
      },
    ],
  },
  {
    id: "legal",
    title: "Legal Validation",
    caption: "Human review, notarization & certification",
    range: [0.60, 0.86],
    color: "legal",
    nodes: [
      {
        id: "review",
        label: "Expert Review",
        icon: UserCheck,
        detail: "Bilingual legal experts verify accuracy, fidelity and compliance.",
        x: 200,
        y: 680,
      },
      {
        id: "compliance",
        label: "Compliance Mapping",
        icon: ShieldCheck,
        detail: "Format, structure and content checked against destination-jurisdiction rules.",
        x: 360,
        y: 720,
      },
      {
        id: "notarize",
        label: "Notarization",
        icon: Stamp,
        detail: "Identity verified and document authenticated under Ministry of Justice authority.",
        x: 520,
        y: 680,
      },
    ],
  },
  {
    id: "output",
    title: "Global Acceptance",
    caption: "Embassy, court & institution-ready",
    range: [0.84, 1.0],
    color: "output",
    nodes: [
      {
        id: "global",
        label: "Internationally Accepted",
        icon: Globe2,
        detail: "Apostille / legalization completes preparation for cross-border recognition.",
        x: 360,
        y: 940,
      },
    ],
  },
];

/* Curved connectors between sequential cluster centroids */
const CONNECTIONS: { from: [number, number]; to: [number, number]; activateAt: number }[] = [
  { from: [360, 90], to: [360, 260], activateAt: 0.15 },
  { from: [360, 320], to: [360, 470], activateAt: 0.42 },
  { from: [360, 510], to: [360, 720], activateAt: 0.62 },
  { from: [360, 760], to: [360, 940], activateAt: 0.86 },
];

/* Internal cluster connectors (siblings) */
const SIBLING_LINKS: { a: [number, number]; b: [number, number]; activateAt: number }[] = [
  { a: [200, 290], b: [360, 260], activateAt: 0.25 },
  { a: [360, 260], b: [520, 290], activateAt: 0.3 },
  { a: [220, 470], b: [500, 470], activateAt: 0.5 },
  { a: [200, 680], b: [360, 720], activateAt: 0.72 },
  { a: [360, 720], b: [520, 680], activateAt: 0.78 },
];

/* ----------------------------- Component ----------------------------- */

const WhyDifferent = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [openNode, setOpenNode] = useState<Node | null>(null);
  const [hoverCluster, setHoverCluster] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background border-b border-border"
      style={{ height: "260vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ambient backdrop */}
        <div
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(hsl(var(--primary) / 0.18) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        {/* floating background icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[FileText, Stamp, Globe2, ShieldCheck, Cpu, Languages].map((Icon, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/15"
              style={{
                left: `${8 + i * 14}%`,
                top: `${15 + (i % 3) * 25}%`,
              }}
              animate={{ y: [0, -12, 0], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 7 + i, repeat: Infinity, delay: i * 0.4 }}
            >
              <Icon className="w-6 h-6" />
            </motion.div>
          ))}
        </div>

        <div className="container-editorial relative h-full grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-12 lg:gap-16 items-center py-10 lg:py-14">
          {/* LEFT — sticky narrative */}
          <NarrativePanel scrollYProgress={scrollYProgress} />

          {/* RIGHT — animated network */}
          <div className="relative h-full flex items-center justify-center">
            <NetworkVisual
              scrollYProgress={scrollYProgress}
              hoverCluster={hoverCluster}
              setHoverCluster={setHoverCluster}
              onOpenNode={setOpenNode}
            />
          </div>
        </div>

        {/* Scroll progress rail */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-40 h-[3px] rounded-full bg-border overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
          />
        </div>
      </div>

      {/* Node detail dialog */}
      <AnimatePresence>
        {openNode && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/40 backdrop-blur-sm px-4"
            onClick={() => setOpenNode(null)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-md w-full bg-background border border-border rounded-md p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpenNode(null)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-secondary"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-sm bg-primary/10 text-primary">
                  <openNode.icon className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-semibold text-secondary">
                  {openNode.label}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {openNode.detail}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* ----------------------------- Narrative ----------------------------- */

const NarrativePanel = ({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) => {
  const stepIndex = useTransform(scrollYProgress, (v) =>
    Math.min(CLUSTERS.length - 1, Math.floor(v * CLUSTERS.length))
  );
  const [active, setActive] = useState(0);
  stepIndex.on("change", (v) => setActive(v));

  return (
    <div className="relative">
      <p className="eyebrow mb-5">Why We Are Different</p>
      <h2 className="display-serif text-4xl md:text-5xl lg:text-6xl text-secondary text-balance leading-[1.05]">
        Technology + Expertise.
        <br />
        <span className="text-primary">Engineered for Acceptance.</span>
      </h2>

      <div className="mt-7 space-y-4 text-base md:text-[1.05rem] text-muted-foreground leading-relaxed max-w-xl">
        <p>
          Modern document processing requires more than translation and certification.
          It demands a system that understands context, legal frameworks, and
          cross-border expectations.
        </p>
        <p>
          We integrate <span className="text-secondary font-medium">AI-assisted analysis</span>,
          structured workflows, and <span className="text-secondary font-medium">expert legal validation</span> —
          so every document is prepared with precision and aligned with real-world acceptance standards.
        </p>
      </div>

      {/* Stage indicator driven by scroll */}
      <div className="mt-8 space-y-2 max-w-md">
        {CLUSTERS.map((c, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <div
              key={c.id}
              className="flex items-center gap-3 text-sm"
            >
              <span
                className={`inline-block w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-primary scale-125 shadow-[0_0_12px_hsl(var(--primary))]"
                    : isPast
                    ? "bg-primary/60"
                    : "bg-border"
                }`}
              />
              <span
                className={`transition-colors duration-300 ${
                  isActive
                    ? "text-secondary font-semibold"
                    : isPast
                    ? "text-secondary/70"
                    : "text-muted-foreground"
                }`}
              >
                {c.title}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <Link
          to="/request"
          className="group inline-flex items-center gap-3 px-7 py-4 bg-secondary text-secondary-foreground rounded-sm hover:bg-primary transition-colors duration-500"
        >
          <span className="text-sm tracking-[0.2em] uppercase">Start Your Request</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

/* ----------------------------- Network ----------------------------- */

const NetworkVisual = ({
  scrollYProgress,
  hoverCluster,
  setHoverCluster,
  onOpenNode,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  hoverCluster: string | null;
  setHoverCluster: (id: string | null) => void;
  onOpenNode: (n: Node) => void;
}) => {
  // Track scroll progress as state for child computations
  const [progress, setProgress] = useState(0);
  scrollYProgress.on("change", (v) => setProgress(v));

  return (
    <div className="relative w-full max-w-[640px] h-full max-h-[78vh] mx-auto">
      <svg
        viewBox="0 0 720 1080"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="line-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="cluster-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Cluster halos */}
        {CLUSTERS.map((c) => {
          const cx = c.nodes.reduce((s, n) => s + n.x, 0) / c.nodes.length;
          const cy = c.nodes.reduce((s, n) => s + n.y, 0) / c.nodes.length;
          const isActive = progress >= c.range[0];
          const isHovered = hoverCluster === c.id;
          return (
            <circle
              key={`halo-${c.id}`}
              cx={cx}
              cy={cy}
              r={isHovered ? 170 : 140}
              fill="url(#cluster-glow)"
              opacity={isActive ? (isHovered ? 1 : 0.7) : 0.15}
              style={{ transition: "all 400ms" }}
            />
          );
        })}

        {/* Main vertical connections */}
        {CONNECTIONS.map((c, i) => {
          const active = progress >= c.activateAt;
          const d = `M ${c.from[0]} ${c.from[1]} C ${c.from[0]} ${
            (c.from[1] + c.to[1]) / 2
          }, ${c.to[0]} ${(c.from[1] + c.to[1]) / 2}, ${c.to[0]} ${c.to[1]}`;
          return (
            <g key={`conn-${i}`}>
              <path
                d={d}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
              <motion.path
                d={d}
                fill="none"
                stroke="url(#line-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: active ? 1 : 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
              {active && (
                <circle r="4" fill="hsl(var(--primary))" filter="url(#glow)">
                  <animateMotion dur="3.5s" repeatCount="indefinite" path={d} />
                </circle>
              )}
            </g>
          );
        })}

        {/* Sibling connections inside clusters */}
        {SIBLING_LINKS.map((l, i) => {
          const active = progress >= l.activateAt;
          const d = `M ${l.a[0]} ${l.a[1]} Q ${(l.a[0] + l.b[0]) / 2} ${
            Math.min(l.a[1], l.b[1]) - 30
          }, ${l.b[0]} ${l.b[1]}`;
          return (
            <motion.path
              key={`sib-${i}`}
              d={d}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1.2"
              strokeOpacity={active ? 0.55 : 0.1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: active ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              style={{ transition: "stroke-opacity 400ms" }}
            />
          );
        })}

        {/* Nodes */}
        {CLUSTERS.map((c) =>
          c.nodes.map((n, i) => {
            const active = progress >= c.range[0];
            const dimmed = hoverCluster && hoverCluster !== c.id;
            return (
              <NodeMark
                key={n.id}
                node={n}
                clusterId={c.id}
                active={active}
                dimmed={!!dimmed}
                delay={i * 0.1}
                onHover={() => setHoverCluster(c.id)}
                onLeave={() => setHoverCluster(null)}
                onClick={() => onOpenNode(n)}
              />
            );
          })
        )}

        {/* Cluster labels */}
        {CLUSTERS.map((c) => {
          const cx = c.nodes.reduce((s, n) => s + n.x, 0) / c.nodes.length;
          const topY = Math.min(...c.nodes.map((n) => n.y)) - 42;
          const active = progress >= c.range[0];
          return (
            <g key={`lbl-${c.id}`} opacity={active ? 1 : 0.35} style={{ transition: "opacity 400ms" }}>
              <text
                x={cx}
                y={topY}
                textAnchor="middle"
                className="fill-secondary"
                style={{ fontSize: 15, fontWeight: 700, letterSpacing: 0.3 }}
              >
                {c.title}
              </text>
              <text
                x={cx}
                y={topY + 18}
                textAnchor="middle"
                className="fill-muted-foreground"
                style={{ fontSize: 11 }}
              >
                {c.caption}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/* Node + icon. Rendered in foreignObject for crisp lucide icons. */
const NodeMark = ({
  node,
  clusterId,
  active,
  dimmed,
  delay,
  onHover,
  onLeave,
  onClick,
}: {
  node: Node;
  clusterId: string;
  active: boolean;
  dimmed: boolean;
  delay: number;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) => {
  const Icon = node.icon;
  const size = 56;
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: dimmed ? 0.25 : active ? 1 : 0.4,
        scale: active ? 1 : 0.85,
      }}
      transition={{ duration: 0.5, delay: active ? delay : 0 }}
      style={{ cursor: "pointer" }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {active && (
        <motion.circle
          cx={node.x}
          cy={node.y}
          r={size / 2 + 6}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          opacity={0.5}
          animate={{ r: [size / 2 + 6, size / 2 + 16, size / 2 + 6], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity }}
        />
      )}
      <circle
        cx={node.x}
        cy={node.y}
        r={size / 2}
        fill="hsl(var(--background))"
        stroke="hsl(var(--primary))"
        strokeWidth={active ? 2 : 1.2}
        filter={active ? "url(#glow)" : undefined}
      />
      <foreignObject
        x={node.x - 12}
        y={node.y - 12}
        width={24}
        height={24}
        style={{ pointerEvents: "none" }}
      >
        <div className="w-6 h-6 flex items-center justify-center text-primary">
          <Icon className="w-5 h-5" />
        </div>
      </foreignObject>
      <text
        x={node.x}
        y={node.y + size / 2 + 18}
        textAnchor="middle"
        className="fill-secondary"
        style={{ fontSize: 12, fontWeight: 600 }}
      >
        {node.label}
      </text>
    </motion.g>
  );
};

export default WhyDifferent;
