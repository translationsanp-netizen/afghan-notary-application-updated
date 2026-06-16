import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const lines = [
  "In a world where documents move across borders…",
  "…legal accuracy becomes critical.",
  "We ensure your documents are recognized — globally.",
];

const StoryIntro = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section id="story" ref={ref} className="relative bg-background py-32 md:py-48">
      <div className="container-editorial">
        <div className="max-w-5xl">
          {lines.map((line, i) => {
            const start = 0.1 + i * 0.22;
            const opacity = useTransform(scrollYProgress, [start, start + 0.1, start + 0.25, start + 0.35], [0, 1, 1, 0.25]);
            const y = useTransform(scrollYProgress, [start, start + 0.15], [40, 0]);
            return (
              <motion.p
                key={i}
                style={{ opacity, y }}
                className="display-serif text-secondary text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] mb-10 md:mb-14 text-balance"
              >
                {line}
              </motion.p>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StoryIntro;
