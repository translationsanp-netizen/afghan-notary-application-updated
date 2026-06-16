import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const Word = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, ["hsl(215 14% 75%)", "hsl(var(--secondary))"]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <span className="absolute opacity-15">{children}</span>
      <motion.span style={{ opacity, color }}>{children}</motion.span>
    </span>
  );
};

const Paragraph = ({ text, scrollYProgress, start, end }: { text: string; scrollYProgress: MotionValue<number>; start: number; end: number }) => {
  const words = text.split(" ");
  return (
    <p className="display-serif text-[clamp(1.75rem,4.2vw,3.75rem)] leading-[1.15] mb-10 md:mb-14 text-balance">
      {words.map((w, i) => {
        const wStart = start + (i / words.length) * (end - start);
        const wEnd = start + ((i + 1) / words.length) * (end - start);
        return (
          <Word key={i} progress={scrollYProgress} range={[wStart, wEnd]}>
            {w}
          </Word>
        );
      })}
    </p>
  );
};

const ScrollStory = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.2"] });

  const lines = t("scrollStory.lines", { returnObjects: true }) as string[];
  const segments = lines.length;

  return (
    <section ref={ref} className="relative bg-background py-32 md:py-48">
      <div className="container-editorial">
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow mb-10"
          >
            {t("scrollStory.eyebrow")}
          </motion.p>
          {lines.map((line, i) => (
            <Paragraph
              key={i}
              text={line}
              scrollYProgress={scrollYProgress}
              start={i / segments}
              end={(i + 1) / segments}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollStory;
