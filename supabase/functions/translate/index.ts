// AI translation endpoint. Public (no JWT). Returns array of translated strings.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const LANG_NAMES: Record<string, string> = {
  fa: "Dari (Farsi, as spoken in Afghanistan)",
  ps: "Pashto",
  ar: "Modern Standard Arabic",
  en: "English",
};

const cache = new Map<string, string>();
const MAX_TEXTS = 80;
const MAX_CHARS_PER_TEXT = 900;
const MODEL = "google/gemini-3-flash-preview";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { texts, target } = await req.json();
    if (!Array.isArray(texts) || !target || !LANG_NAMES[target]) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (texts.length === 0) {
      return new Response(JSON.stringify({ translations: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const cleanTexts = texts
      .slice(0, MAX_TEXTS)
      .map((text) => String(text ?? "").slice(0, MAX_CHARS_PER_TEXT));

    if (target === "en") {
      return new Response(JSON.stringify({ translations: cleanTexts }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = new Array(cleanTexts.length).fill("");
    const missing: string[] = [];
    const missingIndexes: number[] = [];

    cleanTexts.forEach((text, index) => {
      const cached = cache.get(`${target}::${text}`);
      if (cached) result[index] = cached;
      else {
        missing.push(text);
        missingIndexes.push(index);
      }
    });

    if (missing.length === 0) {
      return new Response(JSON.stringify({ translations: result }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const system = `You are a professional legal/business translator. Translate each item from English to ${LANG_NAMES[target]}.
Rules:
- Preserve meaning, tone, and proper nouns (brand/company names, places, people, acronyms).
- Keep numbers, URLs, emails, and code unchanged.
- Do NOT add or remove items. Output MUST be a JSON object {"t":[...]} with the same length and order as input.
- No explanations.`;

    const user = JSON.stringify({ items: missing });

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.1,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      const message = resp.status === 429
        ? "Translation is temporarily busy. Please try again in a moment."
        : resp.status === 402
          ? "Translation credits are unavailable. Please check workspace usage."
          : "AI translation error";
      return new Response(JSON.stringify({ error: message, detail: errText }), {
        status: resp.status, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content ?? "{}";
    let parsed: any;
    try { parsed = JSON.parse(content); } catch { parsed = {}; }
    const translations: string[] = Array.isArray(parsed?.t) ? parsed.t : [];

    missing.forEach((src, i) => {
      const tr = typeof translations[i] === "string" && translations[i].length > 0 ? translations[i] : src;
      result[missingIndexes[i]] = tr;
      cache.set(`${target}::${src}`, tr);
    });

    if (cache.size > 5000) {
      for (const key of Array.from(cache.keys()).slice(0, cache.size - 4500)) cache.delete(key);
    }

    return new Response(JSON.stringify({ translations: result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
