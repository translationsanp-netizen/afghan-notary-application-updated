import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, Download, Maximize2, Minimize2 } from "lucide-react";
import { motion } from "framer-motion";

const TOTAL = 24;
const pageUrls = Array.from({ length: TOTAL }, (_, i) =>
  `/profile-pages/page-${String(i + 1).padStart(2, "0")}.jpg`
);

interface PageProps {
  src: string;
  number: number;
}

// Pages must be class components / forwardRef-safe for react-pageflip
import { forwardRef } from "react";
const Page = forwardRef<HTMLDivElement, PageProps>(({ src, number }, ref) => (
  <div ref={ref} className="bg-white shadow-inner overflow-hidden">
    <img
      src={src}
      alt={`Company profile page ${number}`}
      loading="lazy"
      className="w-full h-full object-contain pointer-events-none select-none"
      draggable={false}
    />
  </div>
));
Page.displayName = "ProfilePage";

const CompanyProfileFlipbook = () => {
  const bookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState({ w: 420, h: 594 });
  const [isFs, setIsFs] = useState(false);

  // Responsive sizing — A4 ratio (1:1.414)
  useEffect(() => {
    const compute = () => {
      const containerW = containerRef.current?.clientWidth ?? window.innerWidth;
      // Two-page spread on >=md, otherwise single page
      const isWide = window.innerWidth >= 768;
      const maxSpread = Math.min(containerW - 32, isWide ? 980 : 520);
      const pageW = isWide ? maxSpread / 2 : maxSpread;
      const pageH = pageW * 1.414;
      // Constrain by viewport height
      const maxH = Math.min(window.innerHeight - 220, 820);
      const finalH = Math.min(pageH, maxH);
      const finalW = finalH / 1.414;
      setSize({ w: finalW, h: finalH });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [isFs]);

  const next = () => bookRef.current?.pageFlip()?.flipNext();
  const prev = () => bookRef.current?.pageFlip()?.flipPrev();

  const toggleFs = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFs(true);
    } else {
      document.exitFullscreen?.();
      setIsFs(false);
    }
  };

  useEffect(() => {
    const onFs = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-secondary/95 rounded-2xl p-6 md:p-10">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="text-xs uppercase tracking-[0.25em] text-white/70 font-medium">
          Company Profile · Page {page + 1} / {TOTAL}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/company-profile.pdf"
            download
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-xs font-semibold hover:bg-primary/90 transition-all"
          >
            <Download className="h-3.5 w-3.5" /> Download PDF
          </a>
          <button
            onClick={toggleFs}
            className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-white/10 text-white hover:bg-white/20 transition-all"
            aria-label="Fullscreen"
          >
            {isFs ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Flipbook */}
      <div className="flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.45))" }}
        >
          {/* @ts-ignore — react-pageflip lacks types for some props */}
          <HTMLFlipBook
            ref={bookRef}
            width={size.w}
            height={size.h}
            size="fixed"
            minWidth={200}
            maxWidth={900}
            minHeight={300}
            maxHeight={1300}
            showCover={true}
            mobileScrollSupport={true}
            usePortrait={size.w < 360 || window.innerWidth < 768}
            maxShadowOpacity={0.5}
            drawShadow={true}
            flippingTime={700}
            onFlip={(e: any) => setPage(e.data)}
            className=""
            style={{}}
            startPage={0}
            startZIndex={0}
            autoSize={false}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
          >
            {pageUrls.map((src, i) => (
              <Page key={i} src={src} number={i + 1} />
            ))}
          </HTMLFlipBook>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          disabled={page === 0}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-md text-sm hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>
        <div className="text-xs text-white/60 font-mono">
          {String(page + 1).padStart(2, "0")} — {String(TOTAL).padStart(2, "0")}
        </div>
        <button
          onClick={next}
          disabled={page >= TOTAL - 1}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-md text-sm hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default CompanyProfileFlipbook;
