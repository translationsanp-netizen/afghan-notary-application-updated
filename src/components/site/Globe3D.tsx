import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

/**
 * Vector SVG "globe" — stylized rotating equirectangular world map projected
 * onto a circular viewport with global connection arcs, wrap-around lines,
 * pulsing nodes, and click-to-open glassmorphism popups.
 *
 * Pure SVG + Framer Motion (no three.js). Lightweight, deterministic, themable.
 */

export type NodeKey =
  | "kabul"
  | "dubai"
  | "london"
  | "istanbul"
  | "delhi"
  | "berlin"
  | "toronto";

type Node = { key: NodeKey; lat: number; lng: number };

const NODES: Node[] = [
  { key: "kabul", lat: 34.5, lng: 69.1 },
  { key: "dubai", lat: 25.2, lng: 55.27 },
  { key: "london", lat: 51.5, lng: -0.13 },
  { key: "istanbul", lat: 41.01, lng: 28.97 },
  { key: "delhi", lat: 28.61, lng: 77.21 },
  { key: "berlin", lat: 52.52, lng: 13.4 },
  { key: "toronto", lat: 43.65, lng: -79.38 },
];

// Continent labels — placed at centroid lat/lng so they project + rotate
const CONTINENT_LABELS: { name: string; lat: number; lng: number }[] = [
  { name: "NORTH AMERICA", lat: 45, lng: -100 },
  { name: "SOUTH AMERICA", lat: -15, lng: -60 },
  { name: "EUROPE", lat: 54, lng: 15 },
  { name: "AFRICA", lat: 5, lng: 20 },
  { name: "ASIA", lat: 45, lng: 90 },
  { name: "OCEANIA", lat: -25, lng: 135 },
];

// ---- Geometry ----
const VIEW = 800; // svg coord size (square)
const R = 380; // globe radius
const CX = VIEW / 2;
const CY = VIEW / 2;

/** Project lat/lng → 2D point inside the circular globe using an
 *  orthographic projection rotated by `lon0` (the current "spin" angle). */
function project(lat: number, lng: number, lon0: number) {
  const φ = (lat * Math.PI) / 180;
  const λ = ((lng - lon0) * Math.PI) / 180;
  const x = R * Math.cos(φ) * Math.sin(λ);
  const y = -R * Math.sin(φ);
  // visibility: cos of angular distance from the center meridian
  const cosC = Math.cos(φ) * Math.cos(λ);
  return { x: CX + x, y: CY + y, visible: cosC > 0, depth: cosC };
}

/** Convert lng to spin-adjusted lng in [-180,180]. */
function wrap(lng: number) {
  let v = lng;
  while (v > 180) v -= 360;
  while (v < -180) v += 360;
  return v;
}

// ---- A simplified vector world map (stylized continent silhouettes) ----
// We approximate continents using lat/lng polylines so they project
// correctly onto the rotating sphere. Lightweight, low-poly look.
const CONTINENTS: [number, number][][] = [
  // North America (rough)
  [
    [70, -160], [70, -90], [60, -75], [45, -65], [30, -82], [25, -98],
    [30, -115], [50, -125], [60, -140], [70, -160],
  ],
  // South America
  [
    [10, -75], [5, -50], [-15, -38], [-35, -55], [-55, -70], [-30, -72],
    [-5, -78], [10, -75],
  ],
  // Europe
  [
    [70, -10], [60, 30], [45, 40], [38, 25], [40, 0], [50, -8], [70, -10],
  ],
  // Africa
  [
    [35, -5], [32, 30], [15, 40], [-10, 40], [-35, 20], [-20, 12],
    [5, -5], [20, -17], [35, -5],
  ],
  // Asia
  [
    [70, 30], [70, 140], [50, 140], [35, 130], [20, 110], [10, 100],
    [20, 75], [30, 60], [50, 50], [70, 30],
  ],
  // Australia
  [
    [-12, 130], [-15, 145], [-30, 153], [-38, 145], [-32, 115], [-22, 113],
    [-12, 130],
  ],
];

const Globe3D = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState<NodeKey | null>(null);
  const [spin, setSpin] = useState(0);

  // Slow rotation loop (~40s full revolution)
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setSpin((s) => (s + dt * 0.009) % 360); // deg/ms
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ESC closes popup
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Project all continent polylines for current spin, splitting on horizon
  const continentPaths = useMemo(() => {
    const paths: { d: string; opacity: number }[] = [];
    for (const poly of CONTINENTS) {
      let current: string[] = [];
      let lastVisible = false;
      let avgDepth = 0;
      let count = 0;
      for (const [lat, lng] of poly) {
        const p = project(lat, lng, spin);
        if (p.visible) {
          avgDepth += p.depth;
          count++;
          if (!lastVisible) current.push(`M${p.x.toFixed(1)},${p.y.toFixed(1)}`);
          else current.push(`L${p.x.toFixed(1)},${p.y.toFixed(1)}`);
          lastVisible = true;
        } else {
          lastVisible = false;
        }
      }
      if (current.length > 1) {
        const depth = count > 0 ? avgDepth / count : 0;
        paths.push({ d: current.join(" "), opacity: 0.15 + depth * 0.45 });
      }
    }
    return paths;
  }, [spin]);

  // Project nodes
  const projectedNodes = useMemo(
    () =>
      NODES.map((n) => {
        const p = project(n.lat, n.lng, spin);
        return { ...n, ...p };
      }),
    [spin]
  );

  // Build connection arcs — Kabul to all + cross-continent pairs spanning every side
  const arcPairs: [NodeKey, NodeKey][] = [
    ["kabul", "dubai"],
    ["kabul", "london"],
    ["kabul", "istanbul"],
    ["kabul", "delhi"],
    ["kabul", "berlin"],
    ["kabul", "toronto"],
    ["london", "toronto"],
    ["dubai", "delhi"],
    ["istanbul", "berlin"],
    ["london", "berlin"],
    ["berlin", "toronto"],
    ["dubai", "london"],
    ["delhi", "istanbul"],
    ["toronto", "delhi"],
    ["dubai", "berlin"],
  ];

  const arcs = arcPairs.map(([a, b]) => {
    const na = projectedNodes.find((n) => n.key === a)!;
    const nb = projectedNodes.find((n) => n.key === b)!;
    // Decide layer: if both endpoints visible → "front", else "back" (wrap-around)
    const bothVisible = na.visible && nb.visible;
    const isHi = active === a || active === b;
    // Curved path — quadratic bezier with control point pulled outward
    const mx = (na.x + nb.x) / 2;
    const my = (na.y + nb.y) / 2;
    const dx = nb.x - na.x;
    const dy = nb.y - na.y;
    const dist = Math.hypot(dx, dy);
    // Perpendicular offset for curvature
    const nx = -dy / (dist || 1);
    const ny = dx / (dist || 1);
    const lift = Math.min(180, dist * 0.35);
    const cx = mx + nx * lift;
    const cy = my + ny * lift;
    const d = `M${na.x.toFixed(1)},${na.y.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${nb.x.toFixed(1)},${nb.y.toFixed(1)}`;
    return { key: `${a}-${b}`, d, bothVisible, isHi, na, nb };
  });

  const popup = active
    ? (t(`hero.interactive.nodes.${active}`, { returnObjects: true }) as
        | { title: string; text: string; services: string[] }
        | string)
    : null;
  const popupValid = popup && typeof popup === "object";

  return (
    <div className="relative w-full aspect-square max-w-[640px] mx-auto">
      {/* Decorative orbits */}
      <div className="absolute inset-0 rounded-full border border-primary/15 pointer-events-none" />
      <div className="absolute inset-6 rounded-full border border-dashed border-primary/20 pointer-events-none animate-[spin_60s_linear_infinite]" />
      {/* Soft radial glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.18) 0%, transparent 65%)",
        }}
      />

      <svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="absolute inset-0 w-full h-full"
        role="img"
        aria-label="Global document network"
      >
        <defs>
          {/* Edge fade mask for wrap-around illusion */}
          <radialGradient id="edgeFade" cx="50%" cy="50%" r="50%">
            <stop offset="80%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="globeMask">
            <rect width={VIEW} height={VIEW} fill="black" />
            <circle cx={CX} cy={CY} r={R} fill="url(#edgeFade)" />
          </mask>
          <radialGradient id="globeFill" cx="35%" cy="35%" r="75%">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.10)" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.02)" />
          </radialGradient>
          <linearGradient id="arcFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Globe sphere */}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="url(#globeFill)"
          stroke="hsl(var(--primary) / 0.3)"
          strokeWidth={1.2}
        />

        {/* Latitude/longitude graticule */}
        <g
          stroke="hsl(var(--primary) / 0.12)"
          strokeWidth={0.6}
          fill="none"
          mask="url(#globeMask)"
        >
          {/* Latitude circles */}
          {[-60, -30, 0, 30, 60].map((lat) => {
            const r = R * Math.cos((lat * Math.PI) / 180);
            const y = CY - R * Math.sin((lat * Math.PI) / 180);
            return <ellipse key={`lat-${lat}`} cx={CX} cy={y} rx={r} ry={r * 0.18} />;
          })}
          {/* Longitude meridians */}
          {Array.from({ length: 12 }).map((_, i) => {
            const lng = i * 30;
            const offset = wrap(lng - spin);
            const rx = Math.abs(R * Math.sin((offset * Math.PI) / 180));
            return (
              <ellipse
                key={`lng-${i}`}
                cx={CX}
                cy={CY}
                rx={rx}
                ry={R}
                opacity={0.6}
              />
            );
          })}
        </g>

        {/* Continents (vector, rotating) */}
        <g mask="url(#globeMask)">
          {continentPaths.map((p, i) => (
            <path
              key={i}
              d={p.d}
              fill="hsl(var(--primary) / 0.08)"
              stroke="hsl(var(--primary) / 0.55)"
              strokeWidth={1}
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity={p.opacity}
            />
          ))}
        </g>

        {/* Continent labels — rotate with the globe, fade near the limb */}
        <g mask="url(#globeMask)" pointerEvents="none">
          {CONTINENT_LABELS.map((c) => {
            const p = project(c.lat, c.lng, spin);
            if (!p.visible) return null;
            const opacity = Math.max(0, Math.min(1, (p.depth - 0.15) * 1.4));
            return (
              <text
                key={c.name}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                letterSpacing={2}
                fill="hsl(var(--secondary))"
                opacity={opacity * 0.85}
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                {c.name}
              </text>
            );
          })}
        </g>
        <g fill="none" mask="url(#globeMask)">
          {arcs
            .filter((a) => !a.bothVisible)
            .map((a) => (
              <path
                key={`back-${a.key}`}
                d={a.d}
                stroke="hsl(var(--primary) / 0.4)"
                strokeWidth={a.isHi ? 1.4 : 0.8}
                strokeDasharray="4 6"
                opacity={a.isHi ? 0.9 : 0.35}
              />
            ))}
        </g>

        {/* FRONT arcs (brighter, with animated flow dots) */}
        <g fill="none">
          {arcs
            .filter((a) => a.bothVisible)
            .map((a, i) => (
              <g key={`front-${a.key}`}>
                <path
                  id={`arc-${a.key}`}
                  d={a.d}
                  stroke="hsl(var(--primary))"
                  strokeWidth={a.isHi ? 1.8 : 1}
                  opacity={a.isHi ? 1 : 0.55}
                  strokeLinecap="round"
                />
                {/* Animated flow dot */}
                <circle r={a.isHi ? 3.2 : 2.2} fill="hsl(var(--primary-glow))">
                  <animateMotion
                    dur={`${3 + (i % 3)}s`}
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href={`#arc-${a.key}`} />
                  </animateMotion>
                </circle>
              </g>
            ))}
        </g>

        {/* Nodes — only render if visible (front side), slight scale by depth */}
        {projectedNodes
          .filter((n) => n.visible)
          .map((n) => {
            const isActive = active === n.key;
            const baseR = 5 + n.depth * 2;
            const r = isActive ? baseR + 2 : baseR;
            return (
              <g key={n.key} transform={`translate(${n.x},${n.y})`}>
                {/* Pulse ring */}
                <motion.circle
                  r={baseR + 2}
                  fill="hsl(var(--primary-glow))"
                  opacity={0.45}
                  animate={{ scale: [1, 2.2, 1], opacity: [0.55, 0, 0.55] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ pointerEvents: "none" }}
                />
                {isActive && (
                  <circle
                    r={r + 6}
                    fill="hsl(var(--primary) / 0.25)"
                    style={{ pointerEvents: "none" }}
                  />
                )}
                <circle
                  r={r}
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--primary-foreground))"
                  strokeWidth={1.2}
                  style={{ cursor: "pointer" }}
                  onClick={() => setActive(n.key)}
                />
              </g>
            );
          })}
      </svg>

      {/* Floating node labels around the rim */}
      <div className="absolute inset-0 pointer-events-none">
        {NODES.map((n, i) => {
          const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
          const radius = 48;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;
          return (
            <button
              key={n.key}
              onClick={() => setActive(n.key)}
              style={{ left: `${x}%`, top: `${y}%` }}
              className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur border border-border text-xs font-medium text-secondary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm whitespace-nowrap"
            >
              {(t(`hero.interactive.nodes.${n.key}.title`) as string).split(" — ")[0]}
            </button>
          );
        })}
      </div>

      {/* Popup */}
      <AnimatePresence>
        {active && popupValid && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              className="absolute inset-0 z-10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute z-20 bottom-6 left-1/2 -translate-x-1/2 w-[min(92%,360px)] p-5 rounded-2xl bg-background/85 backdrop-blur-xl border border-border shadow-xl"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="eyebrow mb-2">{t("hero.interactive.services_label")}</p>
              <h3 className="display-serif text-xl text-secondary mb-2">
                {(popup as any).title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {(popup as any).text}
              </p>
              <div className="flex flex-wrap gap-2">
                {(popup as any).services.map((s: string) => (
                  <span
                    key={s}
                    className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Globe3D;
