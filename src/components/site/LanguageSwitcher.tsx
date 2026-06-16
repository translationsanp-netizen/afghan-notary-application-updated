import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { SUPPORTED_LANGS } from "@/i18n";
import { getTranslationState, setAppLanguage } from "@/lib/aiTranslate";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  variant?: "light" | "dark";
}

const LanguageSwitcher = ({ variant = "dark" }: Props) => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [translating, setTranslating] = useState(getTranslationState().loading);
  const ref = useRef<HTMLDivElement>(null);
  const current = SUPPORTED_LANGS.find((l) => l.code === i18n.language) ?? SUPPORTED_LANGS[0];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    const onState = (e: Event) => {
      const detail = (e as CustomEvent).detail as { loading?: boolean } | undefined;
      setTranslating(!!detail?.loading);
    };
    window.addEventListener("ba-language-state", onState);
    return () => window.removeEventListener("ba-language-state", onState);
  }, []);

  const tone =
    variant === "light"
      ? "text-white/90 hover:text-white border-white/30 hover:border-white/60"
      : "text-secondary hover:text-primary border-border hover:border-primary/40";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase border px-3 py-2 rounded-md transition-colors ${tone}`}
        aria-label="Change language"
      >
        <Globe className="h-3.5 w-3.5" strokeWidth={1.5} />
        <span>{translating ? "…" : current.native}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 min-w-[160px] bg-background border border-border rounded-md shadow-lg overflow-hidden z-50"
          >
            {SUPPORTED_LANGS.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => {
                    setAppLanguage(l.code);
                    i18n.changeLanguage(l.code);
                    setOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-secondary hover:bg-muted transition-colors"
                >
                  <span>
                    <span className="font-medium">{l.native}</span>
                    <span className="text-muted-foreground ml-2 text-xs">{l.label}</span>
                  </span>
                  {l.code === current.code && <Check className="h-3.5 w-3.5 text-primary" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
