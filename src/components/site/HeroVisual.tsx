import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FileText, ScrollText, Languages, X, MapPin } from "lucide-react";
import WorldMap, { MAP_NODES, type NodeKey } from "./WorldMap";

type DocKey = "certificate" | "legal" | "translated";

const docs: {
  key: DocKey;
  i18n: string;
  icon: typeof FileText;
  pos: React.CSSProperties;
  rot: number;
  delay: number;
  node: { x: number; y: number };
  docAnchor: { x: number; y: number };
  linkNode: NodeKey;
}[] = [
  {
    key: "certificate",
    i18n: "doc_certificate",
    icon: ScrollText,
    pos: { top: "2%", left: "0%" },
    rot: -7,
    delay: 0.6,
    node: { x: 38, y: 32 },
    docAnchor: { x: 18, y: 14 },
    linkNode: "london",
  },
  {
    key: "legal",
    i18n: "doc_legal",
    icon: FileText,
    pos: { top: "6%", right: "0%" },
    rot: 6,
    delay: 0.85,
    node: { x: 70, y: 38 },
    docAnchor: { x: 82, y: 18 },
    linkNode: "dubai",
  },
  {
    key: "translated",
    i18n: "doc_translated",
    icon: Languages,
    pos: { bottom: "2%", left: "30%" },
    rot: -3,
    delay: 1.1,
    node: { x: 55, y: 72 },
    docAnchor: { x: 45, y: 92 },
    linkNode: "delhi",
  },
];

type Active =
  | { kind: "doc"; key: DocKey }
  | { kind: "node"; key: NodeKey }
  | null;

const HeroVisual = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState<Active>(null);
  const [hoveredNode, setHoveredNode] = useState<NodeKey | null>(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const activeNodeKey: NodeKey | null =
    active?.kind === "node"
      ? active.key
      : active?.kind === "doc"
      ? docs.find((d) => d.key === active.key)?.linkNode ?? null
      : null;

  const activeDocKey: DocKey | null = active?.kind === "doc" ? active.key : null;

  return (
    <div
      className="relative h-[520px] md:h-[600px] lg:h-[640px] w-full"
      onClick={() => setActive(null)}
    >
      {/* Globe */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-square w-[88%] max-w-[560px]"
        >
          <div className="absolute inset-[-8%] rounded-full bg-primary/20 blur-3xl" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-4%] rounded-full border border-dashed border-white/25"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[3%] rounded-full border border-white/15"
          />
          <div className="absolute inset-[6%] rounded-full overflow-hidden bg-secondary/40 backdrop-blur-sm border border-white/30 shadow-[0_30px_80px_-20px_hsl(209_56%_4%/0.7),inset_0_0_60px_hsl(193_99%_46%/0.15)]">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, hsl(0 0% 100% / 0.18), transparent 55%)",
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <WorldMap
                activeNode={activeNodeKey}
                hoveredNode={hoveredNode}
                onNodeHover={setHoveredNode}
                onNodeClick={(key) => setActive({ kind: "node", key })}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Connection lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--primary-glow))" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {docs.map((d, i) => {
          const { x: x1, y: y1 } = d.docAnchor;
          const { x: x2, y: y2 } = d.node;
          const cx = (x1 + x2) / 2;
          const cy = Math.min(y1, y2) - 12;
          const path = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
          const isHi = activeDocKey === d.key;
          return (
            <motion.path
              key={`line-${i}`}
              d={path}
              fill="none"
              stroke={isHi ? "hsl(var(--primary))" : "url(#lineGrad)"}
              strokeWidth={isHi ? 0.7 : 0.35}
              strokeLinecap="round"
              strokeDasharray={isHi ? "1.4 0.6" : "0.8 1.2"}
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: isHi ? 1 : 0.85 }}
              transition={{ duration: 1.6, delay: 1.1 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
          );
        })}
      </svg>

      {/* Document cards */}
      <div className="absolute inset-0 pointer-events-none">
        {docs.map((d, i) => {
          const Icon = d.icon;
          const isActive = activeDocKey === d.key;
          return (
            <motion.div
              key={d.key}
              initial={{ opacity: 0, y: 40, rotate: d.rot - 4 }}
              animate={{ opacity: 1, y: 0, rotate: d.rot }}
              transition={{ duration: 0.9, delay: d.delay, ease: [0.22, 1, 0.36, 1] }}
              style={d.pos}
              className="absolute"
            >
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive({ kind: "doc", key: d.key });
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                className={`text-left w-40 md:w-48 rounded-lg bg-white/95 backdrop-blur p-4 border pointer-events-auto transition-all hover:-translate-y-2 ${
                  isActive
                    ? "border-primary shadow-[0_30px_70px_-20px_hsl(193_99%_46%/0.7)] scale-[1.04]"
                    : "border-white/60 shadow-[0_20px_50px_-20px_hsl(209_56%_8%/0.6)] hover:shadow-[0_30px_70px_-20px_hsl(209_56%_8%/0.8)]"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-secondary/70 font-semibold">
                    {t(`hero.${d.i18n}`)}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <span className="block h-1.5 w-full rounded bg-secondary/15" />
                  <span className="block h-1.5 w-5/6 rounded bg-secondary/10" />
                  <span className="block h-1.5 w-3/4 rounded bg-secondary/10" />
                  <span className="block h-1.5 w-2/3 rounded bg-secondary/10" />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-block h-5 w-5 rounded-full border-2 border-primary/60" />
                  <span className="text-[9px] tracking-[0.2em] text-primary font-semibold">CERTIFIED</span>
                </div>
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Popup (one at a time) */}
      <AnimatePresence>
        {active && (
          <Popup
            key={`${active.kind}-${active.key}`}
            active={active}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>

      {/* Hint */}
      <div className="absolute bottom-2 right-2 text-[10px] uppercase tracking-[0.2em] text-secondary/60 pointer-events-none flex items-center gap-1.5">
        <MapPin className="h-3 w-3" />
        {t("hero.interactive.hint")}
      </div>
    </div>
  );
};

const Popup = ({ active, onClose }: { active: Exclude<Active, null>; onClose: () => void }) => {
  const { t } = useTranslation();
  const base =
    active.kind === "doc"
      ? `hero.interactive.docs.${active.key}`
      : `hero.interactive.nodes.${active.key}`;
  const services = t(`${base}.services`, { returnObjects: true }) as string[];

  // Position: docs near their card, nodes centered top
  const positionClass =
    active.kind === "doc"
      ? active.key === "certificate"
        ? "top-[26%] left-[2%]"
        : active.key === "legal"
        ? "top-[30%] right-[2%]"
        : "bottom-[28%] left-[28%]"
      : "top-[8%] left-1/2 -translate-x-1/2";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => e.stopPropagation()}
      className={`absolute ${positionClass} z-20 w-[260px] md:w-[300px] rounded-2xl border border-white/60 bg-white/85 backdrop-blur-xl p-5 shadow-[0_30px_80px_-20px_hsl(209_56%_4%/0.55)]`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-2 right-2 h-7 w-7 inline-flex items-center justify-center rounded-full text-secondary/60 hover:text-secondary hover:bg-secondary/10 transition"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="text-[10px] uppercase tracking-[0.22em] text-primary font-semibold mb-2">
        {active.kind === "doc" ? "Service" : "Region"}
      </div>
      <h4 className="display-serif text-secondary text-lg leading-tight mb-2 pr-6">
        {t(`${base}.title`)}
      </h4>
      <p className="text-[13px] text-secondary/75 leading-relaxed mb-3">
        {t(`${base}.text`)}
      </p>
      <div className="text-[10px] uppercase tracking-[0.18em] text-secondary/60 font-semibold mb-1.5">
        {t("hero.interactive.services_label")}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {Array.isArray(services) &&
          services.map((s) => (
            <span
              key={s}
              className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
            >
              {s}
            </span>
          ))}
      </div>
    </motion.div>
  );
};

export default HeroVisual;
