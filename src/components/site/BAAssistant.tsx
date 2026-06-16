import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Sparkles, PhoneCall } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const quickActions = ["Certified Translation", "Notarization", "Legalization", "Study Abroad Documents", "Careers", "Contact Us"];

const BAAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hello and welcome to BA Afghan Notary Public. I can help with certified translation, notarization, legalization, apostille services, legal drafting, careers, document requirements, and general inquiries. How may I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", phone: "", required_service: "", country: "", notes: "" });

  const language = useMemo(() => localStorage.getItem("i18nextLng") || "en", [open]);

  const ask = async (text = input) => {
    if (!text.trim() || loading) return;
    const nextMessages: Msg[] = [...messages, { role: "user", content: text.trim() }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("ba-assistant", { body: { messages: nextMessages, language } });
    setLoading(false);
    if (error) return toast.error("BA Assistant is temporarily unavailable.");
    setMessages([...nextMessages, { role: "assistant", content: data?.reply || "How may I assist you today?" }]);
  };

  const submitLead = async () => {
    const { data, error } = await supabase.functions.invoke("ba-assistant", { body: { messages, language, lead } });
    if (error) return toast.error("Could not submit your details.");
    setMessages((prev) => [...prev, { role: "assistant", content: data?.reply || "Thank you. Your details have been received." }]);
    setLeadOpen(false);
    toast.success("Details sent");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50" data-no-translate>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            className="mb-4 w-[min(390px,calc(100vw-2.5rem))] overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between bg-secondary px-5 py-4 text-secondary-foreground">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"><Bot className="h-5 w-5" /></span>
                <div><div className="font-semibold">BA Assistant</div><div className="text-xs text-secondary-foreground/70">Online · Powered by AI + Expert Knowledge</div></div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close BA Assistant"><X className="h-4 w-4" /></button>
            </div>

            <div className="h-[430px] space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`max-w-[88%] rounded-lg px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted text-secondary"}`}>
                  {m.content}
                </motion.div>
              ))}
              {loading && <div className="w-fit rounded-lg bg-muted px-4 py-3 text-sm text-secondary/70">Thinking…</div>}
              {!leadOpen && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {quickActions.map((q) => <button key={q} onClick={() => ask(q)} className="rounded-full border border-border px-3 py-1.5 text-xs text-secondary hover:border-primary hover:text-primary">{q}</button>)}
                  <button onClick={() => setLeadOpen(true)} className="inline-flex items-center gap-1 rounded-full border border-primary px-3 py-1.5 text-xs text-primary"><PhoneCall className="h-3 w-3" /> Request callback</button>
                </div>
              )}
              {leadOpen && (
                <div className="space-y-2 rounded-lg border border-border bg-card p-3">
                  <Input placeholder="Name" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} />
                  <div className="grid grid-cols-2 gap-2"><Input placeholder="Email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} /><Input placeholder="Phone" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} /></div>
                  <div className="grid grid-cols-2 gap-2"><Input placeholder="Service" value={lead.required_service} onChange={(e) => setLead({ ...lead, required_service: e.target.value })} /><Input placeholder="Country" value={lead.country} onChange={(e) => setLead({ ...lead, country: e.target.value })} /></div>
                  <Textarea placeholder="Notes" value={lead.notes} onChange={(e) => setLead({ ...lead, notes: e.target.value })} />
                  <Button onClick={submitLead} className="w-full">Send details</Button>
                </div>
              )}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); ask(); }} className="flex gap-2 border-t border-border p-3">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask BA Assistant…" />
              <Button type="submit" size="icon" disabled={loading}><Send className="h-4 w-4" /></Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} onClick={() => setOpen(true)} className="flex items-center gap-3 rounded-full bg-secondary px-5 py-4 text-secondary-foreground shadow-[0_0_40px_hsl(var(--primary)/0.35)]">
        <Sparkles className="h-5 w-5 text-primary" /> Ask BA Assistant
      </motion.button>
    </div>
  );
};

export default BAAssistant;