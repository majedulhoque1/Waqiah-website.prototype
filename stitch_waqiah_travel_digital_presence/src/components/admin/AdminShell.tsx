import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Inbox,
  StickyNote,
  Plane,
  MessageSquareText,
  FileText,
  Settings as SettingsIcon,
  Search,
  Bell,
  LogOut,
  Menu,
  X,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useAdmin } from "../../admin/store";
import { ToastHost } from "./ui";

const NAV = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/packages", label: "Packages", icon: Package },
  { to: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { to: "/admin/visa", label: "Visa Applications", icon: StickyNote },
  { to: "/admin/flights", label: "Flights & Bookings", icon: Plane },
  { to: "/admin/chat", label: "AI Chat History", icon: MessageSquareText },
  { to: "/admin/cms", label: "Website Content", icon: FileText },
  { to: "/admin/settings", label: "Settings", icon: SettingsIcon },
];

export default function AdminShell() {
  const { signOut, inquiries, resetDemo, showToast } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const newCount = inquiries.filter((i) => i.status === "New").length;
  const current = NAV.find((n) => location.pathname.startsWith(n.to));

  const handleSignOut = () => {
    signOut();
    navigate("/admin");
  };

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-5">
        <img src="/waqiah-logo.png" alt="Waqiah Travel" className="h-9 w-auto brightness-0 invert" />
        <div className="leading-tight">
          <p className="font-display text-sm font-bold text-white">Waqiah Travel</p>
          <p className="text-[11px] font-medium uppercase tracking-wider text-white/50">Admin Console</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ? "bg-primary text-white shadow-soft" : "text-white/70 hover:bg-white/10 hover:text-white"
              )
            }
          >
            <Icon className="h-[18px] w-[18px]" />
            <span className="flex-1">{label}</span>
            {to === "/admin/inquiries" && newCount > 0 && (
              <span className="rounded-full bg-white px-1.5 py-0.5 text-[11px] font-bold text-primary">
                {newCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/10 p-3">
        <button
          onClick={() => {
            resetDemo();
            showToast("Demo data reset to defaults", "info");
          }}
          className="mb-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <RotateCcw className="h-[18px] w-[18px]" />
          Reset demo data
        </button>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-[18px] w-[18px]" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh bg-surface">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 bg-navy-dark lg:block">{sidebar}</aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-navy-dark">
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-4 z-10 grid h-8 w-8 place-items-center rounded-md text-white/70 hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-outline-variant/50 bg-surface/90 px-4 backdrop-blur lg:px-8">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="grid h-9 w-9 place-items-center rounded-md text-navy hover:bg-surface-container lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <h2 className="font-display text-base font-bold text-navy lg:text-lg">{current?.label ?? "Admin"}</h2>

          <div className="relative ml-auto hidden max-w-xs flex-1 items-center md:flex">
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted" />
            <input
              placeholder="Search…"
              className="h-9 w-full rounded-md border border-outline-variant/60 bg-white pl-9 pr-3 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/10"
            />
          </div>

          <button
            aria-label="Notifications"
            className="relative grid h-9 w-9 place-items-center rounded-md text-navy hover:bg-surface-container"
          >
            <Bell className="h-5 w-5" />
            {newCount > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-surface" />
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-md px-1.5 py-1.5 hover:bg-surface-container"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-sm font-bold text-white">
                EA
              </span>
              <span className="hidden text-sm font-semibold text-navy sm:block">Enaam A.</span>
              <ChevronDown className="hidden h-4 w-4 text-muted sm:block" />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-outline-variant/50 bg-white py-1 shadow-lift">
                  <div className="border-b border-outline-variant/40 px-4 py-2.5">
                    <p className="text-sm font-semibold text-navy">Enaam Ahmed</p>
                    <p className="text-xs text-muted">Owner</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-danger hover:bg-surface-container"
                  >
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        <main className="mx-auto max-w-content px-4 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>

      <ToastHost />
    </div>
  );
}
