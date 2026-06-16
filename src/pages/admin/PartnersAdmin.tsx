import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import ImageUpload from "@/components/admin/ImageUpload";
import { deleteCmsFile } from "@/lib/cmsUpload";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

type Row = { id: string; name: string; logo: string; website: string | null; display_order: number; active: boolean };
const empty = (): Partial<Row> => ({ name: "", logo: "", website: "", display_order: 0, active: true });

const PartnersAdmin = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Row>>(empty());
  const [originalLogo, setOriginalLogo] = useState<string | null>(null);

  const load = async () => {
    const { data } = await supabase.from("partners").select("*").order("display_order");
    setRows((data ?? []) as Row[]);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing.name || !editing.logo) return toast.error("Name and logo required");
    const payload: any = { ...editing }; delete payload.id;
    const res = editing.id
      ? await supabase.from("partners").update(payload).eq("id", editing.id)
      : await supabase.from("partners").insert(payload);
    if (res.error) return toast.error(res.error.message);
    if (editing.id && originalLogo && originalLogo !== payload.logo) deleteCmsFile(originalLogo);
    setOpen(false); load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete logo?")) return;
    await supabase.from("partners").delete().eq("id", id); load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#183852]">Partners</h1>
          <p className="text-secondary/60 text-sm mt-1">Logos shown in the homepage marquee. Empty = use built-in defaults.</p>
        </div>
        <Button onClick={() => { setEditing(empty()); setOriginalLogo(null); setOpen(true); }} className="bg-[#183852] hover:bg-[#0f2738]"><Plus className="w-4 h-4 mr-2" />Add logo</Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {rows.length === 0 && <div className="col-span-full text-center text-secondary/50 py-12 bg-white rounded-xl border">No custom partners. Site shows built-in defaults.</div>}
        {rows.map((r) => (
          <div key={r.id} className="bg-white rounded-xl border p-4">
            <div className="h-20 grid place-items-center">
              <img src={r.logo} alt={r.name} className="max-h-16 max-w-full object-contain" />
            </div>
            <div className="mt-3 text-sm font-medium text-[#183852] truncate">{r.name}</div>
            <div className="text-xs text-secondary/50">Order {r.display_order} · {r.active ? "Active" : "Hidden"}</div>
            <div className="mt-2 flex gap-2">
              <button onClick={() => { setEditing(r); setOriginalLogo(r.logo); setOpen(true); }} className="p-1.5 text-secondary/60 hover:text-primary"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => remove(r.id)} className="p-1.5 text-secondary/60 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing.id ? "Edit logo" : "Add logo"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <ImageUpload value={editing.logo || null} onChange={(url) => setEditing({ ...editing, logo: url ?? "" })} folder="partners" label="Logo (transparent PNG recommended)" />
            <div><Label>Name</Label><Input value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
            <div><Label>Website</Label><Input value={editing.website ?? ""} onChange={(e) => setEditing({ ...editing, website: e.target.value })} /></div>
            <div><Label>Display order</Label><Input type="number" value={editing.display_order ?? 0} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} /></div>
            <div className="flex items-center gap-3"><Switch checked={!!editing.active} onCheckedChange={(v) => setEditing({ ...editing, active: v })} /><Label>Active</Label></div>
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

export default PartnersAdmin;
