import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  { q: "How long does notarization take?", a: "Standard notarization is completed within the same business day. Apostille and legalization typically take 24–72 hours depending on the issuing authority." },
  { q: "Do you provide international services?", a: "Yes. We process documents for use in over 120 countries through Hague Apostille and consular legalization." },
  { q: "What documents are required?", a: "Original documents, valid government-issued ID, and any supporting paperwork relevant to your case. Our team will guide you through specifics." },
  { q: "Can I submit documents online?", a: "Absolutely. You can initiate your request online and we'll arrange secure pickup, courier or in-person verification." },
  { q: "Are your translations legally accepted?", a: "Our certified translations are accepted by courts, embassies, universities and government institutions worldwide." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-background py-28 md:py-40">
      <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-4">06 — FAQ</p>
          <h2 className="display-serif text-secondary text-4xl md:text-5xl text-balance">
            Answers, before you ask.
          </h2>
        </div>

        <div className="lg:col-span-8">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="border-b border-border"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="display-serif text-xl md:text-2xl text-secondary pr-8 group-hover:text-primary transition-colors">
                    {f.q}
                  </span>
                  <Plus className={`h-5 w-5 shrink-0 text-primary transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-muted-foreground leading-relaxed max-w-2xl">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
