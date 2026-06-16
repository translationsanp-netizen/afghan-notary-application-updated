import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Globe3D from "./Globe3D";

type Slide = { title: string; text: string; cta: string; href: string };

const Hero = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 22 });
  const sy = useSpring(my, { stiffness: 50, damping: 22 });

  const visualX = useTransform(sx, (v) => v * -18);
  const visualY = useTransform(sy, (v) => v * -18);
  const contentX = useTransform(sx, (v) => v * 6);
  const contentY = useTransform(sy, (v) => v * 6);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mx, my]);

  const headline = t("hero.headline");
  const words = headline.split(" ");
  const tags = t("hero.tags", { returnObjects: true }) as string[];
  const slides = t("hero.slides", { returnObjects: true }) as Slide[];

  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    if (!Array.isArray(slides) || slides.length < 2) return;
    const id = setInterval(() => setSlideIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides]);

  const current = slides?.[slideIndex];

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 16, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute inset-[-10%] gradient-hero-bg animate-gradient-shift"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />
        <div className="absolute top-[10%] left-[5%] h-[420px] w-[420px] rounded-full bg-primary-glow/20 blur-3xl" />
        <div className="absolute bottom-[5%] right-[5%] h-[520px] w-[520px] rounded-full bg-primary/30 blur-3xl" />
      </div>

      <div className="container-editorial relative z-10 pt-32 pb-20 md:pt-28 md:pb-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT — 40% — Service Slider */}
          <motion.div style={{ x: contentX, y: contentY }} className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="h-px w-10 bg-secondary/60" />
              <span className="text-xs uppercase tracking-[0.3em] text-secondary/80 font-medium">
                {t("hero.eyebrow")}
              </span>
            </motion.div>

            <h1 className="display-serif text-secondary text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.05] max-w-[20ch]">
              {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-baseline mr-[0.25em]">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.25 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Service Slider Card */}
            <div className="mt-10 max-w-xl">
              <div className="relative rounded-xl border border-secondary/15 bg-white/70 backdrop-blur-md p-6 md:p-7 shadow-[0_30px_60px_-30px_hsl(209_56%_4%/0.4)] overflow-hidden min-h-[230px]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-primary font-semibold">
                    0{slideIndex + 1} / 0{slides?.length ?? 3}
                  </span>
                  <span className="h-px flex-1 mx-4 bg-secondary/15" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={slideIndex}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="display-serif text-secondary text-2xl md:text-[1.7rem] leading-tight mb-3">
                      {current?.title}
                    </h3>
                    <p className="text-sm md:text-[15px] text-secondary/75 leading-relaxed text-pretty">
                      {current?.text}
                    </p>
                    <Link
                      to={current?.href ?? "/request"}
                      className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-glow transition-colors"
                    >
                      {current?.cta}
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6 flex items-center gap-2">
                  {(slides ?? []).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIndex(i)}
                      aria-label={`Slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === slideIndex ? "w-10 bg-primary" : "w-2 bg-secondary/25 hover:bg-secondary/45"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-secondary/70"
            >
              {tags.map((tag, i) => (
                <span key={tag} className="flex items-center gap-3">
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-secondary/30" aria-hidden />}
                  <span className="font-medium">{tag}</span>
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/request"
                className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 text-sm font-semibold tracking-wide rounded-md shadow-[0_8px_24px_-8px_hsl(193_99%_46%_/_0.6)] transition-all hover:scale-[1.04] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_hsl(193_99%_46%_/_0.8)]"
              >
                {t("hero.cta_primary")}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 border border-secondary/40 text-secondary px-7 py-4 text-sm font-semibold tracking-wide rounded-md hover:bg-secondary/5 hover:border-secondary/70 transition-all hover:scale-[1.04] hover:-translate-y-0.5"
              >
                {t("hero.cta_secondary")}
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.7 }}
              className="mt-6 text-[10px] uppercase tracking-[0.25em] text-secondary/55"
            >
              {t("hero.micro")}
            </motion.p>
          </motion.div>

          {/* RIGHT — 60% — Visual System */}
          <motion.div
            style={{ x: visualX, y: visualY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="lg:col-span-7 relative"
          >
            <Globe3D />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-secondary/70 text-[10px] uppercase tracking-[0.3em]"
      >
        <span>{t("hero.scroll")}</span>
        <span className="block h-10 w-px bg-secondary/40 overflow-hidden relative">
          <span className="absolute top-0 left-0 right-0 h-4 bg-secondary animate-scroll-bounce" />
        </span>
      </motion.a>
    </section>
  );
};

export default Hero;
