// AI-powered DOM translation. This layer keeps English as the source DOM,
// translates text nodes in-place, aggressively caches results, deduplicates
// in-flight requests, and re-applies the selected language after navigation.

import { supabase } from "@/integrations/supabase/client";

export type AppLanguage = "en" | "fa" | "ps" | "ar";

const SUPPORTED = new Set(["en", "fa", "ps", "ar"]);
const RTL_LANGS = new Set(["fa", "ps", "ar"]);
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE", "TEXTAREA", "INPUT", "SVG", "PATH"]);
const CACHE_KEY = "ai_translate_cache_v2";
const LANG_KEY = "i18nextLng";
const BATCH_SIZE = 55;
const MAX_CACHE_ENTRIES = 3500;

const originals = new WeakMap<Text, string>();
const tracked = new Set<Text>();
const locked = new WeakSet<Text>();
const cache = new Map<string, string>();
const inFlight = new Map<string, Promise<string[]>>();

let currentLang: AppLanguage = "en";
let observer: MutationObserver | null = null;
let pendingNodes = new Set<Text>();
let flushTimer: number | null = null;
let languageRun = 0;
let activeJobs = 0;

const notify = () => {
  window.dispatchEvent(new CustomEvent("ba-language-state", { detail: getTranslationState() }));
};

export const getTranslationState = () => ({
  language: currentLang,
  loading: activeJobs > 0,
});

const setBusy = (delta: number) => {
  activeJobs = Math.max(0, activeJobs + delta);
  document.documentElement.toggleAttribute("data-ai-translating", activeJobs > 0);
  notify();
};

const normaliseLanguage = (lang: string | null | undefined): AppLanguage =>
  SUPPORTED.has(lang ?? "") ? (lang as AppLanguage) : "en";

const stableKey = (target: string, text: string) => `${target}::${text}`;

const loadCache = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return;
    const obj = JSON.parse(raw) as Record<string, string>;
    for (const [k, v] of Object.entries(obj)) cache.set(k, v);
  } catch {}
};

const persistCache = (() => {
  let t: number | null = null;
  return () => {
    if (t) window.clearTimeout(t);
    t = window.setTimeout(() => {
      try {
        const obj: Record<string, string> = {};
        const entries = Array.from(cache.entries()).slice(-MAX_CACHE_ENTRIES);
        for (const [k, v] of entries) obj[k] = v;
        localStorage.setItem(CACHE_KEY, JSON.stringify(obj));
      } catch {}
    }, 350);
  };
})();

if (typeof window !== "undefined") loadCache();

const isTranslatable = (node: Text): boolean => {
  const parent = node.parentElement;
  if (!parent) return false;
  if (SKIP_TAGS.has(parent.tagName)) return false;
  if (parent.closest("[data-no-translate], [aria-hidden='true'], .ProseMirror")) return false;
  if (parent.isContentEditable) return false;
  const text = node.nodeValue ?? "";
  const trimmed = text.trim();
  if (!trimmed || trimmed.length < 2) return false;
  if (/^[\s\d.,:;!?@#$%^&*()_+\-=/\\|<>{}[\]'"`~]+$/.test(trimmed)) return false;
  if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmed)) return false;
  return true;
};

const collectTextNodes = (root: Node): Text[] => {
  if (!document.body) return [];
  const out: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (isTranslatable(n as Text) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP),
  });
  let n: Node | null;
  while ((n = walker.nextNode())) out.push(n as Text);
  return out;
};

const applyLangAttrs = (lang: AppLanguage) => {
  document.documentElement.setAttribute("lang", lang);
  document.documentElement.setAttribute("dir", RTL_LANGS.has(lang) ? "rtl" : "ltr");
};

const rememberOriginal = (node: Text) => {
  if (!originals.has(node)) originals.set(node, node.nodeValue ?? "");
  tracked.add(node);
};

const runWithRetry = async (texts: string[], target: AppLanguage): Promise<string[]> => {
  const body = { texts, target };
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const { data, error } = await supabase.functions.invoke("translate", { body });
    if (!error && Array.isArray(data?.translations)) return data.translations as string[];
    if (attempt < 2) await new Promise((resolve) => window.setTimeout(resolve, 250 * (attempt + 1)));
  }
  return texts;
};

const translateBatch = (texts: string[], target: AppLanguage): Promise<string[]> => {
  if (!texts.length) return Promise.resolve([]);
  const batchKey = `${target}::${texts.join("\u001f")}`;
  const existing = inFlight.get(batchKey);
  if (existing) return existing;
  const job = runWithRetry(texts, target).finally(() => inFlight.delete(batchKey));
  inFlight.set(batchKey, job);
  return job;
};

const applyText = (node: Text, value: string) => {
  locked.add(node);
  node.nodeValue = value;
  queueMicrotask(() => locked.delete(node));
};

const translateNodes = async (nodes: Text[], target: AppLanguage, runId = languageRun) => {
  const uniqueNodes = Array.from(new Set(nodes)).filter((n) => n.isConnected && isTranslatable(n));
  if (!uniqueNodes.length || target === "en") return;

  const neededNodes: Text[] = [];
  const neededTexts: string[] = [];
  const seenTexts = new Map<string, number>();

  uniqueNodes.forEach((node) => {
    rememberOriginal(node);
    const src = originals.get(node) ?? "";
    const key = stableKey(target, src);
    const cached = cache.get(key);
    if (cached) {
      if (node.nodeValue !== cached) applyText(node, cached);
      return;
    }
    if (!seenTexts.has(src)) {
      seenTexts.set(src, neededTexts.length);
      neededTexts.push(src);
    }
    neededNodes.push(node);
  });

  if (!neededTexts.length) return;
  setBusy(1);
  try {
    for (let i = 0; i < neededTexts.length; i += BATCH_SIZE) {
      if (runId !== languageRun || target !== currentLang) return;
      const slice = neededTexts.slice(i, i + BATCH_SIZE);
      const translations = await translateBatch(slice, target);
      slice.forEach((src, index) => {
        const tr = translations[index] || src;
        cache.set(stableKey(target, src), tr);
      });
      neededNodes.forEach((node) => {
        const src = originals.get(node) ?? "";
        const tr = cache.get(stableKey(target, src));
        if (tr && node.isConnected && target === currentLang && runId === languageRun) applyText(node, tr);
      });
      persistCache();
    }
  } finally {
    setBusy(-1);
  }
};

const restoreOriginals = () => {
  tracked.forEach((node) => {
    const src = originals.get(node);
    if (src != null && node.isConnected && node.nodeValue !== src) applyText(node, src);
  });
};

const scheduleFlush = (delay = 60) => {
  if (flushTimer) window.clearTimeout(flushTimer);
  flushTimer = window.setTimeout(() => {
    flushTimer = null;
    if (currentLang === "en") return;
    const nodes = Array.from(pendingNodes).filter((n) => n.isConnected && isTranslatable(n));
    pendingNodes.clear();
    if (nodes.length) translateNodes(nodes, currentLang, languageRun);
  }, delay);
};

const startObserver = () => {
  if (observer || !document.body) return;
  observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          if (isTranslatable(node as Text)) pendingNodes.add(node as Text);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          collectTextNodes(node).forEach((t) => pendingNodes.add(t));
        }
      });

      if (m.type === "characterData" && m.target.nodeType === Node.TEXT_NODE) {
        const t = m.target as Text;
        if (locked.has(t)) continue;
        if (currentLang === "en") {
          originals.delete(t);
        } else {
          originals.set(t, t.nodeValue ?? "");
          if (isTranslatable(t)) pendingNodes.add(t);
        }
      }
    }
    if (pendingNodes.size) scheduleFlush();
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
};

export const translateCurrentPage = async () => {
  if (currentLang === "en" || !document.body) return;
  await translateNodes(collectTextNodes(document.body), currentLang, languageRun);
};

export const setAppLanguage = async (lang: string) => {
  const next = normaliseLanguage(lang);
  languageRun += 1;
  const runId = languageRun;
  currentLang = next;
  applyLangAttrs(next);
  try { localStorage.setItem(LANG_KEY, next); } catch {}

  if (next === "en") {
    restoreOriginals();
    notify();
    return;
  }

  startObserver();
  await translateNodes(collectTextNodes(document.body), next, runId);
};

export const initAiTranslate = () => {
  startObserver();
  const stored = normaliseLanguage(typeof localStorage !== "undefined" ? localStorage.getItem(LANG_KEY) : "en");
  currentLang = stored;
  applyLangAttrs(stored);
  notify();
  if (stored !== "en") setTimeout(() => setAppLanguage(stored), 40);
};
