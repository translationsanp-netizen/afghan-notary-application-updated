// Minimal language registry. Translation is performed at runtime by the AI
// translation layer (see src/lib/aiTranslate.ts) which walks the live DOM.
// We keep i18next around because existing components use `useTranslation`,
// but it only ever serves the English source strings — the DOM walker then
// translates the rendered text into the active language.

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import { initAiTranslate } from "@/lib/aiTranslate";

export const RTL_LANGS = ["fa", "ps", "ar"] as const;

export const SUPPORTED_LANGS = [
  { code: "en", label: "English", native: "EN" },
  { code: "fa", label: "Dari", native: "دری" },
  { code: "ps", label: "Pashto", native: "پښتو" },
  { code: "ar", label: "Arabic", native: "العربية" },
] as const;

const stored = (typeof localStorage !== "undefined" && localStorage.getItem("i18nextLng")) || "en";

i18n.use(initReactI18next).init({
  resources: { en: { translation: en } },
  lng: stored,
  fallbackLng: "en",
  supportedLngs: ["en", "fa", "ps", "ar"],
  // Always source English strings — DOM gets translated to the active language.
  load: "languageOnly",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

// The language switcher triggers the AI translation layer directly. i18next is
// kept as the English source-string registry for existing components.
i18n.on("languageChanged", (lng) => {
  try { localStorage.setItem("i18nextLng", lng); } catch {}
});

if (typeof window !== "undefined") {
  // Kick off the DOM translator after first paint
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(initAiTranslate, 0);
  } else {
    window.addEventListener("DOMContentLoaded", initAiTranslate, { once: true });
  }
}

export default i18n;
