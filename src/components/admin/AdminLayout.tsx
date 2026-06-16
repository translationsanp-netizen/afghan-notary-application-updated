import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  Briefcase,
  Image as ImageIcon,
  MessageSquareQuote,
  Bot,
  Inbox,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const nav = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/insights", icon: FileText, label: "Insights" },
  { to: "/admin/team", icon: Users, label: "Team" },
  { to: "/admin/jobs", icon: Briefcase, label: "Jobs" },
  { to: "/admin/partners", icon: ImageIcon, label: "Partners" },
  { to: "/admin/testimonials", icon: MessageSquareQuote, label: "Testimonials" },
  { to: "/admin/assistant", icon: Bot, label: "BA Assistant" },
  { to: "/admin/leads", icon: Inbox, label: "Leads" },
];

const AdminLayout = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };
  return (
    <div className="min-h-screen flex bg-[#f7f9fb]">
      <aside className="w-64 shrink-0 bg-[#183852] text-white flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="text-xs uppercase tracking-[0.25em] text-[#01B9EA]">Admin</div>
          <div className="font-semibold mt-1">Afghan Notary CMS</div>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-[#01B9EA] text-[#183852] font-medium"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <n.icon className="w-4 h-4" />
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-white/80 hover:bg-white/5 hover:text-white"
          >
            <ExternalLink className="w-4 h-4" />
            View site
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-white/80 hover:bg-white/5 hover:text-white"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
          {user?.email && (
            <div className="px-3 pt-2 text-[11px] text-white/40 truncate">{user.email}</div>
          )}
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden">
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
