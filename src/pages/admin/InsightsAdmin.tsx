import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUpload from "@/components/admin/ImageUpload";
import { deleteCmsFile } from "@/lib/cmsUpload";
import { Pencil, Trash2, Plus, ExternalLink } from "lucide-react";
import { toast } from "sonner";

type Insight = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  category: string | null;
  author: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const empty = (): Partial<Insight> => ({
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: null,
  category: "",
  author: "",
  published: false,
});

const InsightsAdmin = () => {
  const [rows, setRows] = useState<Insight[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Insight>>(empty());
  const [originalCover, setOriginalCover] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from("insights")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setRows((data ?? []) as Insight[]);
  };
  useEffect(() => { load(); }, []);

  const startNew = () => { setEditing(empty()); setOriginalCover(null); setOpen(true); };
  const startEdit = (r: Insight) => { setEditing(r); setOriginalCover(r.cover_image); setOpen(true); };

  const save = async () => {
    if (!editing.title) return toast.error("Title required");
    setSaving(true);
    const payload: any = {
      title: editing.title,
      slug: editing.slug || slugify(editing.title!),
      excerpt: editing.excerpt || null,
      content: editing.content || null,
      cover_image: editing.cover_image || null,
      category: editing.category || null,
      author: editing.author || null,
      published: !!editing.published,
      published_at: editing.published ? (editing.published_at || new Date().toISOString()) : null,
    };
    const res = editing.id
      ? await supabase.from("insights").update(payload).eq("id", editing.id)
      : await supabase.from("insights").insert(payload);
    setSaving(false);
    if (res.error) return toast.error(res.error.message);
    if (editing.id && originalCover && originalCover !== payload.cover_image) deleteCmsFile(originalCover);
    toast.success("Saved");
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    const { error } = await supabase.from("insights").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#183852]">Insights</h1>
          <p className="text-secondary/60 text-sm mt-1">Manage blog articles and insights.</p>
        </div>
        <Button onClick={startNew} className="bg-[#183852] hover:bg-[#0f2738]"><Plus className="w-4 h-4 mr-2" />New article</Button>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-secondary/70 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Updated</th>
              <th className="w-32"></th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={5} className="text-center p-8 text-secondary/50">No articles yet. Click "New article".</td></tr>
            )}
            {rows.map((r) => (
              <tr key={r.id} className="border-t hover:bg-muted/20">
                <td className="p-3 font-medium text-[#183852]">{r.title}</td>
                <td className="p-3 text-secondary/70">{r.category ?? "—"}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${r.published ? "bg-green-100 text-green-700" : "bg-muted text-secondary/60"}`}>
                    {r.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-3 text-secondary/60 text-xs">{new Date(r.created_at).toLocaleDateString()}</td>
                <td className="p-3 text-right">
                  <a href={`/insights/${r.slug}`} target="_blank" rel="noreferrer" className="inline-flex p-2 text-secondary/60 hover:text-primary"><ExternalLink className="w-4 h-4" /></a>
                  <button onClick={() => startEdit(r)} className="p-2 text-secondary/60 hover:text-primary"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => remove(r.id)} className="p-2 text-secondary/60 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing.id ? "Edit article" : "New article"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Title</Label>
                <Input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: editing.id ? editing.slug : slugify(e.target.value) })} />
              </div>
              <div>
                <Label>Slug</Label>
                <Input value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
              </div>
              <div>
                <Label>Category</Label>
                <Input value={editing.category ?? ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
              </div>
              <div className="col-span-2">
                <Label>Author</Label>
                <Input value={editing.author ?? ""} onChange={(e) => setEditing({ ...editing, author: e.target.value })} />
              </div>
              <div className="col-span-2">
                <Label>Excerpt</Label>
                <Textarea rows={2} value={editing.excerpt ?? ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} />
              </div>
              <div className="col-span-2">
                <ImageUpload value={editing.cover_image ?? null} onChange={(url) => setEditing({ ...editing, cover_image: url })} folder="insights" label="Cover image" />
              </div>
              <div className="col-span-2">
                <Label>Content</Label>
                <RichTextEditor value={editing.content ?? ""} onChange={(v) => setEditing({ ...editing, content: v })} />
              </div>
              <div className="col-span-2 flex items-center gap-3">
                <Switch checked={!!editing.published} onCheckedChange={(v) => setEditing({ ...editing, published: v })} />
                <Label>Published</Label>
              </div>
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

export default InsightsAdmin;
