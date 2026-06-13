import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { Loader2, Trash2, RefreshCw, Search, Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/_protected/leads")({
  ssr: false,
  component: LeadsPage,
});

type Lead = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  interest: string | null;
  message: string | null;
  source: string;
  status: string;
  created_at: string;
};

const STATUS_OPTIONS = [
  { value: "pending", label: "Yeni", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { value: "contacted", label: "İletişimde", className: "bg-blue-100 text-blue-800 border-blue-200" },
  { value: "closed", label: "Kapandı", className: "bg-gray-200 text-gray-700 border-gray-300" },
];

const SOURCE_LABELS: Record<string, string> = {
  quick_callback: "Hızlı Arama",
  document_gate: "Belge İndirme",
  website: "Web Sitesi",
};

function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [toast, setToast] = useState<{ name: string } | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads((data as Lead[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  // Realtime subscription for new leads
  useEffect(() => {
    const channel = supabase
      .channel("leads-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "leads" },
        (payload) => {
          const newLead = payload.new as Lead;
          setLeads((prev) => [newLead, ...prev]);
          setToast({ name: newLead.name });
          setTimeout(() => setToast(null), 4000);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await supabase.from("leads").update({ status }).eq("id", id);
  };

  const remove = async (id: string) => {
    if (!confirm("Bu talebi silmek istediğinizden emin misiniz?")) return;
    await supabase.from("leads").delete().eq("id", id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const filtered = useMemo(() => {
    let list = leads;
    if (statusFilter !== "all") {
      list = list.filter((l) => l.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          (l.phone && l.phone.includes(q)) ||
          (l.email && l.email.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [leads, search, statusFilter]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-navy-dark text-white px-5 py-3 shadow-xl flex items-center gap-3 animate-in slide-in-from-right">
          <Bell className="h-5 w-5 text-orange" />
          <div>
            <div className="font-display text-sm font-bold uppercase">Yeni Talep</div>
            <div className="text-xs text-white/70">{toast.name}</div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-bold mb-1">CRM</div>
          <h1 className="font-display text-3xl font-bold uppercase text-navy">Talepler</h1>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 bg-navy text-white px-4 py-2 font-display uppercase tracking-wider text-sm"
        >
          <RefreshCw className="h-4 w-4" /> Yenile
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="İsim, telefon veya e-posta ile ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-border text-sm focus:border-orange focus:outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-border text-sm font-display uppercase tracking-wider focus:border-orange focus:outline-none"
        >
          <option value="all">Tümü</option>
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white border border-border overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-orange" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            {leads.length === 0 ? "Henüz talep yok." : "Aramanızla eşleşen talep bulunamadı."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-steel border-b border-border">
                <tr className="text-left font-display uppercase text-xs tracking-wider text-navy">
                  <th className="px-4 py-3">Tarih</th>
                  <th className="px-4 py-3">Ad</th>
                  <th className="px-4 py-3">Telefon</th>
                  <th className="px-4 py-3">E-posta</th>
                  <th className="px-4 py-3">İlgi</th>
                  <th className="px-4 py-3">Kaynak</th>
                  <th className="px-4 py-3">Durum</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => {
                  const opt = STATUS_OPTIONS.find((o) => o.value === l.status) ?? STATUS_OPTIONS[0];
                  return (
                    <tr key={l.id} className="border-b border-border last:border-0 hover:bg-steel/50">
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-muted-foreground">
                        {new Date(l.created_at).toLocaleString("tr-TR", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="px-4 py-3 font-semibold text-navy">{l.name}</td>
                      <td className="px-4 py-3">
                        {l.phone && (
                          <a href={`tel:${l.phone}`} className="hover:text-orange">
                            {l.phone}
                          </a>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs">
                        {l.email && (
                          <a href={`mailto:${l.email}`} className="hover:text-orange">
                            {l.email}
                          </a>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs">{l.interest || "—"}</td>
                      <td className="px-4 py-3">
                        <span className="text-[10px] uppercase tracking-wider bg-steel text-muted-foreground px-2 py-1 border border-border">
                          {SOURCE_LABELS[l.source] || l.source}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={l.status}
                          onChange={(e) => updateStatus(l.id, e.target.value)}
                          className={`text-xs font-display uppercase tracking-wider px-2 py-1.5 border ${opt.className} focus:outline-none rounded`}
                        >
                          {STATUS_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => remove(l.id)}
                          className="text-muted-foreground hover:text-red-600"
                          aria-label="Sil"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
