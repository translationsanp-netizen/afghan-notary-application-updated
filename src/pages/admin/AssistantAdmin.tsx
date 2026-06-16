import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Knowledge = { id: string; title: string; category: string; content: string; active: boolean; display_order: number };
type Faq = { id: string; question: string; answer: string; category: string; active: boolean; display_order: number };
const client = supabase as any;

const AssistantAdmin = () => {
  const [knowledge, setKnowledge] = useState<Knowledge[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [mode, setMode] = useState<"knowledge" | "faq">("knowledge");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>({ active: true, display_order: 0 });

  const load = async () => {
    const [{ data: k }, { data: f }] = await Promise.all([
      client.from("assistant_knowledge").select("*").order("display_order"),
      client.from("assistant_faqs").select("*").order("display_order"),
    ]);
    setKnowledge(k ?? []); setFaqs(f ?? []);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    const table = mode === "knowledge" ? "assistant_knowledge" : "assistant_faqs";
    const payload = { ...editing }; delete payload.id;
    const res = editing.id ? await client.from(table).update(payload).eq("id", editing.id) : await client.from(table).insert(payload);
    if (res.error) return toast.error(res.error.message);
    toast.success("Saved"); setOpen(false); load();
  };
  const remove = async (id: string, table: "assistant_knowledge" | "assistant_faqs") => {
    if (!confirm("Delete this item?")) return;
    await client.from(table).delete().eq("id", id); load();
  };

  const rows = mode === "knowledge" ? knowledge : faqs;
  return <div>
    <div className="flex items-center justify-between mb-6"><div><h1 className="text-2xl font-semibold text-[#183852]">BA Assistant</h1><p className="text-secondary/60 text-sm mt-1">Manage assistant knowledge and FAQs.</p></div><Button onClick={() => { setEditing({ active: true, display_order: 0, category: "General" }); setOpen(true); }}><Plus className="w-4 h-4 mr-2" />Add item</Button></div>
    <div className="flex gap-2 mb-5"><Button variant={mode === "knowledge" ? "default" : "outline"} onClick={() => setMode("knowledge")}>Knowledge</Button><Button variant={mode === "faq" ? "default" : "outline"} onClick={() => setMode("faq")}>FAQs</Button></div>
    <div className="bg-white rounded-xl border overflow-hidden"><table className="w-full text-sm"><tbody>{rows.map((r: any) => <tr key={r.id} className="border-t"><td className="p-3 font-medium text-[#183852]">{r.title ?? r.question}</td><td className="p-3 text-secondary/60">{r.category}</td><td className="p-3 text-secondary/50">{r.active ? "Active" : "Hidden"}</td><td className="p-3 text-right"><button onClick={() => { setEditing(r); setOpen(true); }} className="p-2"><Pencil className="w-4 h-4" /></button><button onClick={() => remove(r.id, mode === "knowledge" ? "assistant_knowledge" : "assistant_faqs")} className="p-2 text-red-500"><Trash2 className="w-4 h-4" /></button></td></tr>)}</tbody></table></div>
    <Dialog open={open} onOpenChange={setOpen}><DialogContent className="max-w-2xl"><DialogHeader><DialogTitle>{editing.id ? "Edit" : "Add"} {mode === "knowledge" ? "knowledge" : "FAQ"}</DialogTitle></DialogHeader><div className="space-y-3">{mode === "knowledge" ? <><Label>Title</Label><Input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /><Label>Content</Label><Textarea rows={7} value={editing.content ?? ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} /></> : <><Label>Question</Label><Input value={editing.question ?? ""} onChange={(e) => setEditing({ ...editing, question: e.target.value })} /><Label>Answer</Label><Textarea rows={6} value={editing.answer ?? ""} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} /></>}<Label>Category</Label><Input value={editing.category ?? ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} /><div className="flex items-center gap-3"><Switch checked={!!editing.active} onCheckedChange={(v) => setEditing({ ...editing, active: v })} /><Label>Active</Label></div></div><DialogFooter><Button onClick={save}>Save</Button></DialogFooter></DialogContent></Dialog>
  </div>;
};

export default AssistantAdmin;