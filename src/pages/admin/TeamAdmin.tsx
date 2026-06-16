import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import ImageUpload from "@/components/admin/ImageUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { deleteCmsFile } from "@/lib/cmsUpload";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

type Row = {
  id: string;
  slug: string;
  name: string;
  position: string | null;
  short_intro: string | null;
  bio: string | null;
  photo: string | null;
  linkedin: string | null;
  email: string | null;
  display_order: number;
  active: boolean;
};

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const empty = (): Partial<Row> => ({ name: "", slug: "", position: "", short_intro: "", bio: "", photo: null, linkedin: "", email: "", display_order: 0, active: true });

const TeamAdmin = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Row>>(empty());
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("team_members").select("*").order("display_order");
    setRows((data ?? []) as Row[]);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing.name) return toast.error("Name required");
    setSaving(true);
    const payload: any = {
      slug: editing.slug || slugify(editing.name!),
      name: editing.name,
      position: editing.position || null,
      short_intro: editing.short_intro || null,
      bio: editing.bio || null,
      photo: editing.photo || null,
      linkedin: editing.linkedin || null,
      email: editing.email || null,
      display_order: editing.display_order ?? 0,
      active: editing.active ?? true,
    };
    const res = editing.id
      ? await supabase.from("team_members").update(payload).eq("id", editing.id)
      : await supabase.from("team_members").insert(payload);
    setSaving(false);
    if (res.error) return toast.error(res.error.message);
    if (editing.id && originalPhoto && originalPhoto !== payload.photo) deleteCmsFile(originalPhoto);
    toast.success("Saved");
    setOpen(false); load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this member?")) return;
    await supabase.from("team_members").delete().eq("id", id); load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#183852]">Team Members</h1>
          <p className="text-secondary/60 text-sm mt-1">Manage staff profiles shown on the Careers page.</p>
        </div>
        <Button onClick={() => { setEditing(empty()); setOriginalPhoto(null); setOpen(true); }} className="bg-[#183852] hover:bg-[#0f2738]"><Plus className="w-4 h-4 mr-2" />Add member</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rows.length === 0 && <div className="col-span-full text-center text-secondary/50 py-12 bg-white rounded-xl border">No team members yet. The site shows static fallback content until you add some.</div>}
        {rows.map((r) => (
          <div key={r.id} className="bg-white rounded-xl border p-4 flex gap-4">
            {r.photo ? <img src={r.photo} alt="" className="w-20 h-20 rounded-lg object-cover" /> : <div className="w-20 h-20 rounded-lg bg-muted grid place-items-center text-secondary/40 text-xs">No photo</div>}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-[#183852] truncate">{r.name}</div>
              <div className="text-xs text-secondary/60 truncate">{r.position}</div>
              <div className="text-[11px] text-secondary/50 mt-1">{r.active ? "Active" : "Hidden"} · Order {r.display_order}</div>
              <div className="mt-2 flex gap-2">
                <button onClick={() => { setEditing(r); setOriginalPhoto(r.photo); setOpen(true); }} className="p-1.5 text-secondary/60 hover:text-primary"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => remove(r.id)} className="p-1.5 text-secondary/60 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing.id ? "Edit member" : "Add member"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <ImageUpload value={editing.photo ?? null} onChange={(url) => setEditing({ ...editing, photo: url })} folder="team" label="Photo" />
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Name</Label><Input value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value, slug: editing.id ? editing.slug : slugify(e.target.value) })} /></div>
              <div><Label>Slug</Label><Input value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} /></div>
              <div className="col-span-2"><Label>Position</Label><Input value={editing.position ?? ""} onChange={(e) => setEditing({ ...editing, position: e.target.value })} /></div>
              <div className="col-span-2"><Label>Short intro</Label><Textarea rows={2} value={editing.short_intro ?? ""} onChange={(e) => setEditing({ ...editing, short_intro: e.target.value })} /></div>
              <div className="col-span-2"><Label>Biography (rich text)</Label><div className="mt-2"><RichTextEditor value={editing.bio ?? ""} onChange={(html) => setEditing({ ...editing, bio: html })} /></div></div>
              <div><Label>LinkedIn URL</Label><Input value={editing.linkedin ?? ""} onChange={(e) => setEditing({ ...editing, linkedin: e.target.value })} /></div>
              <div><Label>Email</Label><Input value={editing.email ?? ""} onChange={(e) => setEditing({ ...editing, email: e.target.value })} /></div>
              <div><Label>Display order</Label><Input type="number" value={editing.display_order ?? 0} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} /></div>
              <div className="flex items-center gap-3 pt-6"><Switch checked={!!editing.active} onCheckedChange={(v) => setEditing({ ...editing, active: v })} /><Label>Active</Label></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save} disabled={saving} className="bg-[#183852] hover:bg-[#0f2738]">{saving ? "Saving…" : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamAdmin;
