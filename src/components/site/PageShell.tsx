import { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

const PageShell = ({ eyebrow, title, intro, children }: PageShellProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${title} — BA Afghan Notary Public`;
  }, [title]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Page hero */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        
        {/* ✅ LIGHT / PROFESSIONAL BACKGROUND */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 to-white">
          <div className="absolute top-[10%] right-[10%] h-[420px] w-[420px] rounded-full bg-gray-200/40 blur-3xl" />
        </div>

        <div className="container-editorial relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            {eyebrow && (
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-black/40" />
                <span className="text-xs uppercase tracking-[0.3em] text-black/70 font-medium">
                  {eyebrow}
                </span>
              </div>
            )}

            {/* ✅ TITLE */}
            <h1 className="display-serif text-black text-[clamp(2rem,5vw,4rem)] leading-[1.05] text-balance">
              {title}
            </h1>

            {/* ✅ INTRO */}
            {intro && (
              <p className="mt-6 max-w-2xl text-base md:text-lg text-black/70 leading-relaxed text-pretty">
                {intro}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Page body */}
      <div className="container-editorial py-16 md:py-24">
        {children}
      </div>

      <Footer />
    </main>
  );
};

export default PageShell;
