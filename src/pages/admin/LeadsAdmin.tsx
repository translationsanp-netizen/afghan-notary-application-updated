import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const client = supabase as any;

const LeadsAdmin = () => {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { client.from("leads").select("*").order("created_at", { ascending: false }).then(({ data }: any) => setRows(data ?? [])); }, []);
  return <div><h1 className="text-2xl font-semibold text-[#183852]">Leads</h1><p className="text-secondary/60 text-sm mt-1 mb-6">Client details collected by BA Assistant.</p><div className="bg-white rounded-xl border overflow-hidden"><table className="w-full text-sm"><thead className="bg-muted/40 text-xs uppercase"><tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Contact</th><th className="p-3 text-left">Service</th><th className="p-3 text-left">Country</th><th className="p-3 text-left">Notes</th></tr></thead><tbody>{rows.map((r) => <tr key={r.id} className="border-t"><td className="p-3 font-medium text-[#183852]">{r.name || "—"}</td><td className="p-3 text-secondary/70">{r.email || "—"}<br />{r.phone || ""}</td><td className="p-3 text-secondary/70">{r.required_service || "—"}</td><td className="p-3 text-secondary/70">{r.country || "—"}</td><td className="p-3 text-secondary/70 max-w-md">{r.notes || "—"}</td></tr>)}</tbody></table></div></div>;
};

export default LeadsAdmin;