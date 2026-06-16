import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { versionedImage } from "@/lib/versionedImage";

type Item = {
  quote: string;
  body: string;
  name: string;
  role: string;
  org: string;
  image?: string | null;
};

const fallbackItems: Item[] = [
  {
    quote: "Highly professional and remarkably efficient.",
    body: "Our business documents were apostilled and accepted by the German authorities without a single revision. The team's attention to detail and procedural precision is exceptional.",
    name: "Sayed Ahmadi",
    role: "Founder",
    org: "Atlas Trading Group",
  },
  {
    quote: "They turned a stressful process into a calm one.",
    body: "Notarization for my Canadian visa application was handled the same day. Clear communication, transparent timelines, and a flawless final result.",
    name: "Mariam K.",
    role: "Postgraduate Student",
    org: "University of Toronto",
  },
  {
    quote: "A truly international standard of work.",
    body: "We rely on BA Afghan Notary Public for all of our cross-border NGO operations. Reliable, accurate, and consistently delivered on time across multiple jurisdictions.",
    name: "Daniel Pierre",
    role: "Country Director",
    org: "International NGO",
  },
];

const Testimonials = () => {
  const [items, setItems] = useState<Item[]>(fallbackItems);
  const [i, setI] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("name, position, company, quote, image, updated_at")
        .eq("active", true)
        .order("display_order");
      if (data && data.length > 0) {
        setItems(
          data.map((t) => ({
            quote: t.quote.split(".")[0] + (t.quote.includes(".") ? "." : ""),
            body: t.quote,
            name: t.name,
            role: t.position ?? "",
            org: t.company ?? "",
            image: versionedImage((t as any).image, (t as any).updated_at),
          }))
        );
        setI(0);
      }
    })();
  }, []);

  // Auto-advance every 7s
  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setI((p) => (p + 1) % items.length);
    }, 7000);
    return () => clearInterval(id);
  }, [items.length]);

  const next = () => {
    setDirection(1);
    setI((p) => (p + 1) % items.length);
  };
  const prev = () => {
    setDirection(-1);
    setI((p) => (p - 1 + items.length) % items.length);
  };
  const go = (k: number) => {
    setDirection(k > i ? 1 : -1);
    setI(k);
  };

  const item = items[i];

  return (
    <section className="relative bg-muted/40 py-28 md:py-40 overflow-hidden">
      {/* Decorative grid + soft accent */}
      <div className="absolute inset-0 -z-10 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(hsl(var(--secondary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary)) 1px, transparent 1px)",
        backgroundSize: "64px 64px"
      }} />
      <div className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-primary/8 blur-3xl -z-10" />
      <div className="absolute -bottom-40 -left-32 h-[380px] w-[380px] rounded-full bg-secondary/5 blur-3xl -z-10" />

      <div className="container-editorial">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                04 — Client Voices
              </span>
            </div>
            <h2 className="display-serif text-secondary text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-balance max-w-2xl">
              Trusted by clients across continents.
            </h2>
          </div>
          <p className="text-secondary/65 text-base md:text-lg leading-relaxed max-w-md">
            A reflection of our commitment to precision, confidentiality, and
            international compliance — in the words of those we serve.
          </p>
        </div>

        {/* Editorial card */}
        <div className="relative bg-background rounded-2xl border border-border shadow-[0_20px_60px_-30px_hsl(209_56%_21%/0.25)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left rail — quote mark + accent */}
            <div className="lg:col-span-3 relative bg-gradient-to-br from-primary/8 via-background to-background p-10 md:p-12 lg:p-14 border-b lg:border-b-0 lg:border-r border-border">
              <Quote className="h-12 w-12 text-primary" strokeWidth={1.2} />
              <div className="mt-6 lg:mt-12 flex lg:flex-col items-start gap-2">
                <span className="text-xs uppercase tracking-[0.3em] text-secondary/50 font-medium">
                  Testimonial
                </span>
                <span className="text-xs uppercase tracking-[0.3em] text-secondary/50 font-medium">
                  {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-9 p-10 md:p-14 lg:p-16 min-h-[380px] flex flex-col justify-between">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={i}
                  custom={direction}
                  initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -24, filter: "blur(4px)" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="display-serif text-secondary text-2xl md:text-3xl lg:text-[2.25rem] leading-[1.25] text-balance">
                    “{item.quote}”
                  </p>
                  <p className="mt-7 text-secondary/65 text-base md:text-lg leading-relaxed max-w-2xl">
                    {item.body}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Footer: attribution + controls */}
              <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`attr-${i}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="text-secondary font-semibold tracking-tight">
                      {item.name}
                    </div>
                    <div className="text-sm text-secondary/55 mt-1">
                      {item.role} · <span className="text-primary">{item.org}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center gap-6">
                  {/* Progress dots */}
                  <div className="flex items-center gap-2">
                    {items.map((_, k) => (
                      <button
                        key={k}
                        onClick={() => go(k)}
                        aria-label={`Go to testimonial ${k + 1}`}
                        className="group relative h-1.5 transition-all duration-500"
                        style={{ width: k === i ? 32 : 12 }}
                      >
                        <span className={`absolute inset-0 rounded-full transition-colors ${
                          k === i ? "bg-primary" : "bg-secondary/15 group-hover:bg-secondary/30"
                        }`} />
                      </button>
                    ))}
                  </div>

                  {/* Arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prev}
                      aria-label="Previous"
                      className="h-11 w-11 rounded-full border border-border hover:border-primary hover:bg-primary hover:text-primary-foreground text-secondary transition-all duration-300 flex items-center justify-center"
                    >
                      <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
                    </button>
                    <button
                      onClick={next}
                      aria-label="Next"
                      className="h-11 w-11 rounded-full border border-border hover:border-primary hover:bg-primary hover:text-primary-foreground text-secondary transition-all duration-300 flex items-center justify-center"
                    >
                      <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
