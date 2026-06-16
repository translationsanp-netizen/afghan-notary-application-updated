const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const AI_KEY = Deno.env.get("LOVABLE_API_KEY") ?? "";

const db = async (path: string, init?: RequestInit) => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.status === 204 ? null : res.json();
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { messages = [], language = "en", lead } = await req.json();
    if (!AI_KEY || !SUPABASE_URL || !SERVICE_KEY) throw new Error("Assistant is not configured");

    if (lead?.name || lead?.email || lead?.phone) {
      await db("leads", {
        method: "POST",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({
          name: lead.name ?? null,
          email: lead.email ?? null,
          phone: lead.phone ?? null,
          required_service: lead.required_service ?? null,
          country: lead.country ?? null,
          notes: lead.notes ?? null,
          source_language: language,
          conversation: messages,
        }),
      });
      return new Response(JSON.stringify({ reply: "Thank you. Your details have been received and our team can follow up with you shortly.", leadSaved: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const [knowledge, faqs, services, team, jobs, insights, settings] = await Promise.all([
      db("assistant_knowledge?select=title,category,content&active=eq.true&order=display_order.asc&limit=40"),
      db("assistant_faqs?select=question,answer,category&active=eq.true&order=display_order.asc&limit=40"),
      Promise.resolve([]),
      db("team_members?select=name,position,short_intro,slug&active=eq.true&order=display_order.asc&limit=30"),
      db("jobs?select=title,department,location,job_type,description,requirements&status=eq.open&order=created_at.desc&limit=20"),
      db("insights?select=title,slug,excerpt,category,content&published=eq.true&order=published_at.desc&limit=20"),
      db("assistant_settings?select=key,value"),
    ]);

    const prompt = (settings ?? []).find((s: any) => s.key === "prompt_instructions")?.value?.text ??
      "Act as a professional BA Afghan Notary Public representative. Use only approved knowledge. If unsure, ask a clarifying question.";

    const context = JSON.stringify({ knowledge, faqs, services, team, jobs, insights }).slice(0, 45000);
    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${AI_KEY}` },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        temperature: 0.2,
        messages: [
          { role: "system", content: `${prompt}\nReply in ${language}. Never invent facts. If the user is interested in a service, ask permission to collect name, email, phone, required service, country, and notes.\nCompany knowledge JSON:\n${context}` },
          ...messages.slice(-10),
        ],
      }),
    });
    if (!resp.ok) throw new Error(await resp.text());
    const data = await resp.json();
    return new Response(JSON.stringify({ reply: data?.choices?.[0]?.message?.content ?? "How may I assist you today?" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});