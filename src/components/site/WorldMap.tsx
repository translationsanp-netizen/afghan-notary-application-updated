import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import { motion } from "framer-motion";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export type NodeKey = "kabul" | "dubai" | "london" | "istanbul" | "delhi";

export const MAP_NODES: { key: NodeKey; coords: [number, number] }[] = [
  { key: "kabul", coords: [69.1, 34.5] },
  { key: "dubai", coords: [55.27, 25.2] },
  { key: "london", coords: [-0.13, 51.5] },
  { key: "istanbul", coords: [28.97, 41.01] },
  { key: "delhi", coords: [77.21, 28.61] },
];

const ORIGIN: [number, number] = [69.1, 34.5];

interface WorldMapProps {
  activeNode?: NodeKey | null;
  hoveredNode?: NodeKey | null;
  onNodeHover?: (key: NodeKey | null) => void;
  onNodeClick?: (key: NodeKey) => void;
}

const WorldMap = ({ activeNode, hoveredNode, onNodeHover, onNodeClick }: WorldMapProps) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <ComposableMap
        projectionConfig={{ scale: 155 }}
        width={900}
        height={500}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="hsl(var(--primary-foreground) / 0.06)"
                stroke="hsl(var(--primary-foreground) / 0.35)"
                strokeWidth={0.4}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Arcs from Kabul to each hub */}
        {MAP_NODES.filter((n) => n.key !== "kabul").map((p, i) => {
          const isHi = activeNode === p.key || hoveredNode === p.key;
          return (
            <Line
              key={`line-${i}`}
              from={ORIGIN}
              to={p.coords}
              stroke={isHi ? "hsl(var(--primary))" : "hsl(var(--primary-glow))"}
              strokeWidth={isHi ? 1.6 : 1}
              strokeLinecap="round"
              strokeDasharray="3 4"
              opacity={isHi ? 1 : 0.7}
            />
          );
        })}

        {/* Interactive nodes */}
        {MAP_NODES.map((p, i) => {
          const isActive = activeNode === p.key;
          const isHover = hoveredNode === p.key;
          const r = isActive ? 6.5 : isHover ? 5.5 : 4;
          return (
            <Marker key={`m-${p.key}`} coordinates={p.coords}>
              {/* Pulse ring */}
              <motion.circle
                r={4}
                fill="hsl(var(--primary-glow))"
                opacity={0.5}
                animate={{ scale: [1, 2.2, 1], opacity: [0.55, 0, 0.55] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  delay: 1.2 + i * 0.2,
                  ease: "easeInOut",
                }}
                style={{ pointerEvents: "none" }}
              />
              {/* Hover/active glow */}
              {(isActive || isHover) && (
                <motion.circle
                  r={r + 4}
                  fill="hsl(var(--primary) / 0.25)"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  style={{ pointerEvents: "none" }}
                />
              )}
              {/* Clickable dot */}
              <motion.circle
                r={r}
                fill="hsl(var(--primary))"
                stroke="hsl(var(--primary-foreground))"
                strokeWidth={isActive ? 1.2 : 0.6}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.12 }}
                onMouseEnter={() => onNodeHover?.(p.key)}
                onMouseLeave={() => onNodeHover?.(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  onNodeClick?.(p.key);
                }}
                style={{ cursor: "pointer" }}
              />
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
};

export default WorldMap;
