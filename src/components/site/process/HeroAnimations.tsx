import { motion } from "framer-motion";

const cardBase = "absolute bg-white rounded-lg shadow-2xl border border-border";

/* ---------- NOTARIZATION: Document + signature + stamp ---------- */
export const NotarizationHero = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`${cardBase} w-[78%] h-[88%] p-8 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      {/* Lines */}
      <div className="space-y-3 mt-2">
        {[100, 92, 85, 96, 70, 88, 60].map((w, i) => (
          <motion.div
            key={i}
            initial={{ width: 0 }}
            animate={{ width: `${w}%` }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
            className="h-1.5 bg-secondary/15 rounded-full"
          />
        ))}
      </div>

      {/* Signature line */}
      <div className="absolute bottom-20 left-8 right-8">
        <svg viewBox="0 0 200 40" className="w-full h-10">
          <motion.path
            d="M 5 30 C 20 5, 40 35, 55 18 S 90 5, 110 22 S 150 30, 175 12 L 195 18"
            stroke="hsl(var(--secondary))"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: 1.3, ease: "easeInOut" }}
          />
        </svg>
        <div className="h-px bg-secondary/30 mt-1" />
        <p className="text-[10px] text-secondary/50 mt-1 uppercase tracking-wider">Signature</p>
      </div>

      {/* Stamp */}
      <motion.div
        initial={{ scale: 0, rotate: -15, opacity: 0 }}
        animate={{ scale: [0, 1.15, 1], rotate: [-15, -8, -12], opacity: [0, 1, 1] }}
        transition={{ delay: 2.6, duration: 0.6, times: [0, 0.6, 1] }}
        className="absolute bottom-6 right-6"
      >
        <div className="relative w-24 h-24 rounded-full border-4 border-primary/80 flex items-center justify-center text-primary">
          <div className="absolute inset-2 rounded-full border border-primary/60" />
          <div className="text-center leading-tight">
            <div className="text-[9px] font-bold tracking-widest">APPROVED</div>
            <div className="text-[7px] mt-1 opacity-70">NOTARIZED</div>
            <div className="text-[7px] opacity-70">• ANP •</div>
          </div>
        </div>
        <motion.div
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ delay: 3, duration: 1, repeat: Infinity, repeatDelay: 2 }}
          className="absolute inset-0 rounded-full border-2 border-primary"
        />
      </motion.div>
    </motion.div>
  </div>
);

/* ---------- LEGALIZATION: Document moving across map nodes ---------- */
export const LegalizationHero = () => {
  const nodes = [
    { x: 15, y: 70, label: "Origin" },
    { x: 38, y: 35, label: "Ministry" },
    { x: 62, y: 60, label: "Foreign Affairs" },
    { x: 85, y: 25, label: "Embassy" },
  ];
  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {/* Stylized continents */}
        <g fill="hsl(var(--secondary) / 0.06)" stroke="hsl(var(--secondary) / 0.15)" strokeWidth="0.2">
          <path d="M5,55 Q15,40 25,50 T45,55 L40,75 Q25,80 10,72 Z" />
          <path d="M50,30 Q65,22 80,28 T95,40 L90,55 Q70,52 55,45 Z" />
          <path d="M55,65 Q72,60 88,68 L92,85 Q75,90 60,82 Z" />
        </g>

        {/* Connection paths */}
        {nodes.slice(0, -1).map((n, i) => {
          const next = nodes[i + 1];
          return (
            <motion.path
              key={i}
              d={`M ${n.x} ${n.y} Q ${(n.x + next.x) / 2} ${Math.min(n.y, next.y) - 10}, ${next.x} ${next.y}`}
              stroke="hsl(var(--primary))"
              strokeWidth="0.4"
              fill="none"
              strokeDasharray="1 1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8 + i * 0.4, duration: 0.8 }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <motion.g
            key={n.label}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.4 }}
            style={{ transformOrigin: `${n.x}% ${n.y}%` }}
          >
            <circle cx={n.x} cy={n.y} r="2" fill="hsl(var(--primary))" />
            <motion.circle
              cx={n.x} cy={n.y} r="2" fill="none"
              stroke="hsl(var(--primary))" strokeWidth="0.3"
              animate={{ r: [2, 5], opacity: [0.7, 0] }}
              transition={{ delay: 0.6 + i * 0.4, duration: 1.5, repeat: Infinity }}
            />
          </motion.g>
        ))}
      </svg>

      {/* Floating document */}
      <motion.div
        initial={{ x: "10%", y: "60%", opacity: 0 }}
        animate={{
          x: ["10%", "35%", "58%", "82%"],
          y: ["60%", "30%", "55%", "20%"],
          opacity: [0, 1, 1, 1],
        }}
        transition={{ duration: 5, delay: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
        className="absolute w-16 h-20 bg-white border border-border rounded shadow-xl flex flex-col items-center justify-center"
      >
        <div className="w-8 h-1 bg-primary/60 rounded-full mb-1" />
        <div className="w-10 h-0.5 bg-secondary/30 rounded-full mb-0.5" />
        <div className="w-9 h-0.5 bg-secondary/30 rounded-full mb-0.5" />
        <div className="w-7 h-0.5 bg-secondary/30 rounded-full" />
        <div className="w-6 h-6 rounded-full border-2 border-primary mt-2 flex items-center justify-center">
          <div className="text-primary text-[6px] font-bold">✓</div>
        </div>
      </motion.div>
    </div>
  );
};

/* ---------- TRANSLATION: Text morphing between languages ---------- */
export const TranslationHero = () => {
  const en = ["Official document", "for international", "recognition"];
  const fa = ["سند رسمی", "برای شناسایی", "بین المللی"];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className={`${cardBase} w-[80%] p-8 relative`}>
        {/* Top "EN" tag */}
        <div className="flex items-center justify-between mb-6">
          <motion.span
            animate={{ opacity: [1, 1, 0.3, 0.3, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="text-xs font-mono uppercase tracking-widest text-primary"
          >EN</motion.span>
          <motion.div
            animate={{ x: [0, 30, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="text-secondary/40"
          >→</motion.div>
          <motion.span
            animate={{ opacity: [0.3, 0.3, 1, 1, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="text-xs font-mono uppercase tracking-widest text-primary"
          >FA</motion.span>
        </div>

        <div className="space-y-4 min-h-[140px] relative">
          {en.map((line, i) => (
            <div key={i} className="relative h-7 overflow-hidden">
              <motion.div
                animate={{ opacity: [1, 1, 0, 0, 1], y: [0, 0, -20, 0, 0], filter: ["blur(0px)", "blur(0px)", "blur(8px)", "blur(0px)", "blur(0px)"] }}
                transition={{ duration: 6, repeat: Infinity, times: [0, 0.35, 0.5, 0.65, 1] }}
                className="absolute inset-0 text-secondary text-lg font-medium"
              >{line}</motion.div>
              <motion.div
                animate={{ opacity: [0, 0, 1, 1, 0], y: [20, 20, 0, 0, 20], filter: ["blur(8px)", "blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"] }}
                transition={{ duration: 6, repeat: Infinity, times: [0, 0.4, 0.55, 0.85, 1] }}
                dir="rtl"
                className="absolute inset-0 text-secondary text-lg font-medium text-right"
              >{fa[i]}</motion.div>
            </div>
          ))}
        </div>

        {/* Certified badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-full px-4 py-2 text-xs font-medium shadow-xl flex items-center gap-1.5"
        >
          ✓ Certified
        </motion.div>
      </div>
    </div>
  );
};

/* ---------- DRAFTING: Cursor typing + sections forming ---------- */
export const DraftingHero = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className={`${cardBase} w-[80%] h-[88%] p-8 relative`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "60%" }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="h-3 bg-secondary rounded mb-2 overflow-hidden"
      />
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "30%" }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="h-2 bg-secondary/40 rounded mb-6"
      />

      {[
        { d: 1.6, lines: 4 },
        { d: 2.6, lines: 3 },
        { d: 3.4, lines: 5 },
      ].map((sec, idx) => (
        <div key={idx} className="mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "40%" }}
            transition={{ duration: 0.4, delay: sec.d }}
            className="h-2 bg-primary/70 rounded mb-2"
          />
          {Array.from({ length: sec.lines }).map((_, j) => (
            <motion.div
              key={j}
              initial={{ width: 0 }}
              animate={{ width: `${70 + Math.random() * 25}%` }}
              transition={{ duration: 0.5, delay: sec.d + 0.2 + j * 0.15 }}
              className="h-1.5 bg-secondary/15 rounded mb-1.5"
            />
          ))}
        </div>
      ))}

      {/* Blinking cursor */}
      <motion.div
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-4 bg-primary align-middle"
      />
    </div>
  </div>
);

/* ---------- APOSTILLE: Globe + document + seal ---------- */
export const ApostilleHero = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      className="absolute w-[380px] h-[380px] md:w-[460px] md:h-[460px]"
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle cx="100" cy="100" r="90" fill="none" stroke="hsl(var(--secondary)/0.15)" strokeWidth="0.5" />
        {/* Latitude */}
        {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((y, i) => {
          const r = Math.sqrt(Math.max(0, 90 * 90 - (y - 100) * (y - 100)));
          return <ellipse key={i} cx="100" cy={y} rx={r} ry={r * 0.25} fill="none" stroke="hsl(var(--secondary)/0.12)" strokeWidth="0.3" />;
        })}
        {/* Longitude */}
        {[0, 30, 60, 90, 120, 150].map((deg) => (
          <ellipse key={deg} cx="100" cy="100" rx={90 * Math.abs(Math.cos((deg * Math.PI) / 180))} ry="90"
            fill="none" stroke="hsl(var(--secondary)/0.12)" strokeWidth="0.3" />
        ))}
        {/* Continent dots */}
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i / 60) * Math.PI * 2;
          const r = 70 + (i % 5) * 4;
          const x = 100 + Math.cos(a) * r * 0.9;
          const y = 100 + Math.sin(a) * r * 0.4;
          return <circle key={i} cx={x} cy={y} r="0.8" fill="hsl(var(--primary)/0.6)" />;
        })}
      </svg>
    </motion.div>

    {/* Document + seal */}
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="relative bg-white rounded-lg shadow-2xl border border-border w-44 h-56 p-4 z-10"
    >
      <div className="space-y-2">
        {[90, 70, 80, 60, 75].map((w, i) => (
          <div key={i} className="h-1 bg-secondary/15 rounded-full" style={{ width: `${w}%` }} />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8, type: "spring", stiffness: 100 }}
        className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center shadow-2xl"
      >
        <div className="absolute inset-1.5 rounded-full border border-white/40" />
        <div className="text-center leading-tight">
          <div className="text-[8px] tracking-widest opacity-80">APOSTILLE</div>
          <div className="text-lg font-bold">★</div>
          <div className="text-[7px] opacity-80">HAGUE 1961</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
        transition={{ delay: 2.3, duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full border-2 border-primary"
      />
    </motion.div>
  </div>
);
