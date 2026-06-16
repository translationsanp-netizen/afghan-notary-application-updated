import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import ImageUpload from "@/components/admin/ImageUpload";
import { deleteCmsFile } from "@/lib/cmsUpload";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

type Row = { id: string; name: string; company: string | null; position: string | null; quote: string; image: string | null; rating: number; display_order: number; active: boolean };
const empty = (): Partial<Row> => ({ name: "", company: "", position: "", quote: "", image: null, rating: 5, display_order: 0, active: true });

const TestimonialsAdmin = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Row>>(empty());
  const [originalImage, setOriginalImage] = useState<string | null>(null);

  const load = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("display_order");
    setRows((data ?? []) as Row[]);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing.name || !editing.quote) return toast.error("Name and quote required");
    const payload: any = { ...editing }; delete payload.id;
    const res = editing.id
      ? await supabase.from("testimonials").update(payload).eq("id", editing.id)
      : await supabase.from("testimonials").insert(payload);
    if (res.error) return toast.error(res.error.message);
    if (editing.id && originalImage && originalImage !== payload.image) deleteCmsFile(originalImage);
    setOpen(false); load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("testimonials").delete().eq("id", id); load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#183852]">Testimonials</h1>
          <p className="text-secondary/60 text-sm mt-1">Client voices shown on the homepage.</p>
        </div>
        <Button onClick={() => { setEditing(empty()); setOriginalImage(null); setOpen(true); }} className="bg-[#183852] hover:bg-[#0f2738]"><Plus className="w-4 h-4 mr-2" />Add testimonial</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rows.length === 0 && <div className="col-span-full text-center text-secondary/50 py-12 bg-white rounded-xl border">No testimonials. Site shows built-in defaults.</div>}
        {rows.map((r) => (
          <div key={r.id} className="bg-white rounded-xl border p-5">
            <div className="flex gap-3 items-start">
              {r.image ? <img src={r.image} alt="" className="w-12 h-12 rounded-full object-cover" /> : <div className="w-12 h-12 rounded-full bg-muted" />}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[#183852]">{r.name}</div>
                <div className="text-xs text-secondary/60">{r.position}{r.position && r.company ? " · " : ""}{r.company}</div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditing(r); setOriginalImage(r.image); setOpen(true); }} className="p-1.5 text-secondary/60 hover:text-primary"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => remove(r.id)} className="p-1.5 text-secondary/60 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <p className="text-sm text-secondary/80 mt-3 line-clamp-3">"{r.quote}"</p>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing.id ? "Edit testimonial" : "Add testimonial"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <ImageUpload value={editing.image ?? null} onChange={(url) => setEditing({ ...editing, image: url })} folder="testimonials" label="Photo (optional)" />
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Name</Label><Input value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
              <div><Label>Position</Label><Input value={editing.position ?? ""} onChange={(e) => setEditing({ ...editing, position: e.target.value })} /></div>
              <div className="col-span-2"><Label>Company</Label><Input value={editing.company ?? ""} onChange={(e) => setEditing({ ...editing, company: e.target.value })} /></div>
              <div className="col-span-2"><Label>Quote</Label><Textarea rows={4} value={editing.quote ?? ""} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} /></div>
              <div><Label>Rating (1–5)</Label><Input type="number" min={1} max={5} value={editing.rating ?? 5} onChange={(e) => setEditing({ ...editing, rating: parseInt(e.target.value) || 5 })} /></div>
              <div><Label>Display order</Label><Input type="number" value={editing.display_order ?? 0} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} /></div>
              <div className="flex items-center gap-3 col-span-2"><Switch checked={!!editing.active} onCheckedChange={(v) => setEditing({ ...editing, active: v })} /><Label>Active</Label></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save} className="bg-[#183852] hover:bg-[#0f2738]">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialsAdmin;
