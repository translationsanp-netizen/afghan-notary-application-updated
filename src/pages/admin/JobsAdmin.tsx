import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

type Row = {
  id: string;
  title: string;
  department: string | null;
  location: string | null;
  job_type: string | null;
  salary: string | null;
  description: string | null;
  requirements: string | null;
  apply_url: string | null;
  status: string;
};
const empty = (): Partial<Row> => ({ title: "", department: "", location: "", job_type: "Full-time", salary: "", description: "", requirements: "", apply_url: "", status: "open" });

const JobsAdmin = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Row>>(empty());

  const load = async () => {
    const { data } = await supabase.from("jobs").select("*").order("created_at", { ascending: false });
    setRows((data ?? []) as Row[]);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing.title) return toast.error("Title required");
    const payload: any = { ...editing };
    delete payload.id;
    const res = editing.id
      ? await supabase.from("jobs").update(payload).eq("id", editing.id)
      : await supabase.from("jobs").insert(payload);
    if (res.error) return toast.error(res.error.message);
    toast.success("Saved"); setOpen(false); load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this job?")) return;
    await supabase.from("jobs").delete().eq("id", id); load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#183852]">Jobs</h1>
          <p className="text-secondary/60 text-sm mt-1">Open positions shown on the Careers page.</p>
        </div>
        <Button onClick={() => { setEditing(empty()); setOpen(true); }} className="bg-[#183852] hover:bg-[#0f2738]"><Plus className="w-4 h-4 mr-2" />Add job</Button>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wider text-secondary/70">
            <tr><th className="text-left p-3">Title</th><th className="text-left p-3">Location</th><th className="text-left p-3">Type</th><th className="text-left p-3">Status</th><th></th></tr>
          </thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={5} className="text-center p-8 text-secondary/50">No jobs yet.</td></tr>}
            {rows.map((r) => (
              <tr key={r.id} className="border-t hover:bg-muted/20">
                <td className="p-3 font-medium text-[#183852]">{r.title}</td>
                <td className="p-3 text-secondary/70">{r.location}</td>
                <td className="p-3 text-secondary/70">{r.job_type}</td>
                <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs ${r.status === "open" ? "bg-green-100 text-green-700" : "bg-muted text-secondary/60"}`}>{r.status}</span></td>
                <td className="p-3 text-right">
                  <button onClick={() => { setEditing(r); setOpen(true); }} className="p-2 text-secondary/60 hover:text-primary"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => remove(r.id)} className="p-2 text-secondary/60 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing.id ? "Edit job" : "Add job"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><Label>Title</Label><Input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
            <div><Label>Department</Label><Input value={editing.department ?? ""} onChange={(e) => setEditing({ ...editing, department: e.target.value })} /></div>
            <div><Label>Location</Label><Input value={editing.location ?? ""} onChange={(e) => setEditing({ ...editing, location: e.target.value })} /></div>
            <div><Label>Type</Label><Input value={editing.job_type ?? ""} onChange={(e) => setEditing({ ...editing, job_type: e.target.value })} placeholder="Full-time" /></div>
            <div><Label>Salary</Label><Input value={editing.salary ?? ""} onChange={(e) => setEditing({ ...editing, salary: e.target.value })} /></div>
            <div className="col-span-2"><Label>Description</Label><Textarea rows={4} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
            <div className="col-span-2"><Label>Requirements</Label><Textarea rows={4} value={editing.requirements ?? ""} onChange={(e) => setEditing({ ...editing, requirements: e.target.value })} /></div>
            <div><Label>Apply URL</Label><Input value={editing.apply_url ?? ""} onChange={(e) => setEditing({ ...editing, apply_url: e.target.value })} /></div>
            <div><Label>Status</Label>
              <select value={editing.status ?? "open"} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="w-full h-10 rounded-md border px-3 bg-background">
                <option value="open">Open</option><option value="closed">Closed</option>
              </select>
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

export default JobsAdmin;
