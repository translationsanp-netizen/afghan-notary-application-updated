import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Globe2, Clock, Award, Users, Stamp } from "lucide-react";

const Counter = ({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </span>
  );
};

// Growth curve data (year -> documents processed cumulative)
const dataPoints = [
  { year: "2019", value: 800 },
  { year: "2020", value: 1800 },
  { year: "2021", value: 3200 },
  { year: "2022", value: 5100 },
  { year: "2023", value: 7400 },
  { year: "2024", value: 10000 },
];

const TrustResults = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  // Build smooth curve through points (viewBox 600 x 260, padding 40)
  const W = 600;
  const H = 260;
  const PAD_X = 50;
  const PAD_Y = 30;
  const innerW = W - PAD_X * 2;
  const innerH = H - PAD_Y * 2;
  const max = Math.max(...dataPoints.map((d) => d.value));
  const pts = dataPoints.map((d, i) => ({
    x: PAD_X + (i / (dataPoints.length - 1)) * innerW,
    y: PAD_Y + innerH - (d.value / max) * innerH,
    ...d,
  }));

  // Catmull-Rom -> bezier path
  const pathD = pts
    .map((p, i, arr) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const p0 = arr[i - 1];
      const cx1 = p0.x + (p.x - p0.x) * 0.5;
      const cx2 = p0.x + (p.x - p0.x) * 0.5;
      return `C ${cx1} ${p0.y}, ${cx2} ${p.y}, ${p.x} ${p.y}`;
    })
    .join(" ");

  const areaD = `${pathD} L ${pts[pts.length - 1].x} ${H - PAD_Y} L ${pts[0].x} ${H - PAD_Y} Z`;

  return (
    <section className="relative bg-muted/40 py-24 md:py-32 border-y border-border overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.5] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      <div className="container-editorial relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-14"
        >
          <p className="eyebrow mb-4">Why Clients Trust Us</p>
          <h2 className="display-serif text-4xl md:text-5xl lg:text-6xl text-secondary text-balance">
            Proven Performance.{" "}
            <span className="text-primary">Measurable Reliability.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Our work is defined not only by the services we provide, but by the outcomes
            we deliver — documents prepared for successful acceptance across institutions,
            jurisdictions, and regulatory environments.
          </p>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* HERO graph card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 lg:row-span-2 bg-background rounded-sm border border-border p-8 md:p-10 shadow-[var(--shadow-soft)] relative overflow-hidden"
          >
            <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">
                  Documents Processed
                </p>
                <h3 className="display-serif text-5xl md:text-6xl text-secondary">
                  <Counter value={10000} suffix="+" />
                </h3>
                <p className="mt-3 text-sm text-muted-foreground max-w-md">
                  Processed, verified, and certified for use across local and international
                  jurisdictions.
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Cumulative growth
                </p>
                <p className="text-sm text-secondary mt-1">2019 → 2024</p>
              </div>
            </div>

            {/* Graph */}
            <div className="relative w-full">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Documents processed growth">
                <defs>
                  <linearGradient id="area-grad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="line-grad" x1="0" x2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                  </linearGradient>
                  <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Y gridlines */}
                {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                  <line
                    key={t}
                    x1={PAD_X}
                    x2={W - PAD_X}
                    y1={PAD_Y + innerH * t}
                    y2={PAD_Y + innerH * t}
                    stroke="hsl(var(--border))"
                    strokeDasharray="2 4"
                    opacity="0.5"
                  />
                ))}

                {/* Area */}
                <motion.path
                  d={areaD}
                  fill="url(#area-grad)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 1 }}
                />

                {/* Line draw */}
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="url(#line-grad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                />

                {/* X labels */}
                {pts.map((p, i) => (
                  <text
                    key={p.year}
                    x={p.x}
                    y={H - 8}
                    textAnchor="middle"
                    className="fill-muted-foreground"
                    style={{ fontSize: 11 }}
                  >
                    {p.year}
                  </text>
                ))}

                {/* Points */}
                {pts.map((p, i) => {
                  const isHovered = hovered === i;
                  const isLast = i === pts.length - 1;
                  return (
                    <g key={i}>
                      {isLast && (
                        <motion.circle
                          cx={p.x}
                          cy={p.y}
                          r="14"
                          fill="hsl(var(--primary))"
                          opacity="0.3"
                          animate={{ r: [10, 18, 10], opacity: [0.4, 0, 0.4] }}
                          transition={{ duration: 2.4, repeat: Infinity }}
                        />
                      )}
                      <motion.circle
                        cx={p.x}
                        cy={p.y}
                        r={isHovered ? 7 : 5}
                        fill="hsl(var(--background))"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        filter={isHovered || isLast ? "url(#dot-glow)" : undefined}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 1.6 + i * 0.1 }}
                        style={{ cursor: "pointer", transition: "r 200ms" }}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                      />
                      {/* Tooltip */}
                      {isHovered && (
                        <g>
                          <rect
                            x={p.x - 50}
                            y={p.y - 46}
                            width="100"
                            height="34"
                            rx="3"
                            fill="hsl(var(--secondary))"
                          />
                          <text
                            x={p.x}
                            y={p.y - 30}
                            textAnchor="middle"
                            fill="white"
                            style={{ fontSize: 11, fontWeight: 600 }}
                          >
                            {p.value.toLocaleString()} docs
                          </text>
                          <text
                            x={p.x}
                            y={p.y - 18}
                            textAnchor="middle"
                            fill="hsl(var(--primary))"
                            style={{ fontSize: 10 }}
                          >
                            {p.year}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </motion.div>

          {/* Side cards */}
          <StatCard
            icon={Globe2}
            value={30}
            suffix="+"
            label="Jurisdictions"
            text="Document acceptance across multiple countries, legal systems, and institutional requirements."
            delay={0.15}
          />
          <StatCard
            icon={Clock}
            value={24}
            suffix="–72h"
            label="Turnaround"
            text="Efficient processing timelines designed to meet urgent requirements without compromising quality."
            delay={0.25}
            isRange
          />
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <StatCard
            icon={Award}
            value={10}
            suffix="+ Years"
            label="Combined Expertise"
            text="A team combining legal understanding, translation expertise, and procedural knowledge."
            delay={0.1}
          />
          <StatCard
            icon={Users}
            value={0}
            customDisplay="Individuals · Businesses · Organizations"
            label="Diverse Client Base"
            text="Supporting education, immigration, corporate, and legal sectors across borders."
            delay={0.2}
          />
          {/* Visual card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative bg-secondary text-secondary-foreground rounded-sm p-7 overflow-hidden group"
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/40 blur-3xl" />
            </div>

            {/* Document + stamp visual */}
            <div className="relative h-32 mb-5">
              <motion.div
                className="absolute top-0 left-2 w-20 h-28 bg-white/10 border border-white/20 rounded-sm"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="px-2 pt-3 space-y-1.5">
                  <div className="h-1 bg-white/30 rounded w-3/4" />
                  <div className="h-1 bg-white/20 rounded w-full" />
                  <div className="h-1 bg-white/20 rounded w-2/3" />
                  <div className="h-1 bg-white/20 rounded w-5/6" />
                </div>
              </motion.div>
              <motion.div
                className="absolute top-3 left-12 w-20 h-28 bg-white/15 border border-white/30 rounded-sm"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              >
                <div className="px-2 pt-3 space-y-1.5">
                  <div className="h-1 bg-white/40 rounded w-3/4" />
                  <div className="h-1 bg-white/30 rounded w-full" />
                  <div className="h-1 bg-white/30 rounded w-1/2" />
                </div>
              </motion.div>
              <motion.div
                className="absolute top-2 right-2 w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center bg-primary/20"
                initial={{ scale: 0, rotate: -30 }}
                whileInView={{ scale: 1, rotate: -12 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
              >
                <Stamp className="w-6 h-6 text-primary" />
              </motion.div>
            </div>

            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">
              Certified for Global Use
            </p>
            <p className="text-sm text-secondary-foreground/80 leading-relaxed">
              Every document is prepared, stamped, and aligned for international acceptance.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({
  icon: Icon,
  value,
  suffix,
  label,
  text,
  delay,
  isRange,
  customDisplay,
}: {
  icon: typeof Globe2;
  value: number;
  suffix?: string;
  label: string;
  text: string;
  delay: number;
  isRange?: boolean;
  customDisplay?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay }}
    whileHover={{ y: -4 }}
    className="bg-background rounded-sm border border-border p-7 hover:border-primary/40 hover:shadow-[var(--shadow-soft)] transition-all duration-500 group"
  >
    <div className="flex items-center justify-between mb-5">
      <div className="w-11 h-11 rounded-sm bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </p>
    </div>
    <div className="display-serif text-3xl md:text-4xl text-secondary mb-3">
      {customDisplay ? (
        <span className="text-xl md:text-2xl">{customDisplay}</span>
      ) : isRange ? (
        <>
          <Counter value={value} />
          <span className="text-primary">{suffix}</span>
        </>
      ) : (
        <>
          <Counter value={value} />
          <span className="text-primary">{suffix}</span>
        </>
      )}
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
  </motion.div>
);

export default TrustResults;
