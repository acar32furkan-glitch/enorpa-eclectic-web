import { createFileRoute, Outlet, useNavigate, Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LayoutDashboard, Inbox, Package, LogOut, Flame, Loader2, Settings, Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/_protected")({
  ssr: false,
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate({ to: "/admin/login" });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sess.session.user.id);
      if (!mounted) return;
      const admin = (roles ?? []).some((r) => r.role === "admin");
      setIsAdmin(admin);
      setReady(true);
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/admin/login" });
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-steel flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-steel flex items-center justify-center p-4">
        <div className="bg-white p-5 sm:p-8 max-w-md text-center shadow">
          <h2 className="font-display text-2xl font-bold uppercase text-navy mb-3">
            Yetkisiz Erişim
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Bu hesabın admin yetkisi yok. Lütfen yöneticinize başvurun.
          </p>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/admin/login" });
            }}
            className="bg-orange text-white px-5 py-2.5 font-display uppercase tracking-wider text-sm"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    );
  }

  const nav = [
    { to: "/admin/dashboard", label: "Site Analizleri", icon: LayoutDashboard },
    { to: "/admin/leads", label: "Talepler", icon: Inbox },
    { to: "/admin/products", label: "Ürün Yönetimi", icon: Package },
    { to: "/admin/settings", label: "Ayarlar", icon: Settings },
  ];

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="min-h-screen flex bg-steel">
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-3 left-3 z-50 h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-lg"
        aria-label="Menüyü aç"
      >
        <Menu className="h-5 w-5" />
      </button>

      {sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="md:hidden fixed inset-0 z-30 bg-black/40"
          aria-label="Menüyü kapat"
        />
      )}

      <aside className={`w-64 bg-navy-dark text-white flex flex-col fixed inset-y-0 left-0 z-40 transform transition-transform duration-200 md:relative md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="px-6 py-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 bg-orange flex items-center justify-center">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display font-bold uppercase leading-none">Enorpa</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-orange">Admin</div>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map((n) => {
            const active = pathname === n.to || (n.to === "/admin/dashboard" && pathname === "/admin");
            return (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 font-display uppercase text-sm tracking-wider transition-colors ${
                  active ? "bg-orange text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={async () => {
              await signOut();
              setSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-orange font-display uppercase text-sm tracking-wider"
          >
            <LogOut className="h-4 w-4" />
            Çıkış
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="md:hidden fixed top-3 right-3 z-50 h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-lg"
          aria-label="Menüyü kapat"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
        <div className="pt-16 md:pt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
