import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { FileText, Users, Briefcase, Image as ImageIcon, MessageSquareQuote, Bot, Inbox } from "lucide-react";

const items = [
  { key: "insights", label: "Insights", icon: FileText, to: "/admin/insights" },
  { key: "team_members", label: "Team Members", icon: Users, to: "/admin/team" },
  { key: "jobs", label: "Jobs", icon: Briefcase, to: "/admin/jobs" },
  { key: "partners", label: "Partners", icon: ImageIcon, to: "/admin/partners" },
  { key: "testimonials", label: "Testimonials", icon: MessageSquareQuote, to: "/admin/testimonials" },
  { key: "assistant_knowledge", label: "BA Assistant", icon: Bot, to: "/admin/assistant" },
  { key: "leads", label: "Leads", icon: Inbox, to: "/admin/leads" },
];

const AdminDashboard = () => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    (async () => {
      const out: Record<string, number> = {};
      for (const it of items) {
        const { count } = await supabase.from(it.key as any).select("*", { count: "exact", head: true });
        out[it.key] = count ?? 0;
      }
      setCounts(out);
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#183852]">Dashboard</h1>
      <p className="text-secondary/60 mt-1">Manage your website content from one place.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {items.map((it) => (
          <Link
            key={it.key}
            to={it.to}
            className="group bg-white rounded-xl border border-border p-6 hover:border-[#01B9EA] hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-[#01B9EA]/10 grid place-items-center">
                <it.icon className="w-5 h-5 text-[#01B9EA]" />
              </div>
              <div className="text-3xl font-semibold text-[#183852]">{counts[it.key] ?? "—"}</div>
            </div>
            <div className="mt-4 font-medium text-[#183852]">{it.label}</div>
            <div className="text-xs text-secondary/60 mt-1 group-hover:text-[#01B9EA]">Manage →</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
