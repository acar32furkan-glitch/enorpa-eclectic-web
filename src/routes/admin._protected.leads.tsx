import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Trash2, RefreshCw } from "lucide-react";
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
  { value: "pending", label: "Bekliyor", className: "bg-red-100 text-red-700 border-red-200" },
  { value: "contacted", label: "Arandı", className: "bg-green-100 text-green-700 border-green-200" },
  { value: "closed", label: "Kapandı", className: "bg-gray-200 text-gray-700 border-gray-300" },
];

function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

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

  const updateStatus = async (id: string, status: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await supabase.from("leads").update({ status }).eq("id", id);
  };

  const remove = async (id: string) => {
    if (!confirm("Bu talebi silmek istediğinizden emin misiniz?")) return;
    await supabase.from("leads").delete().eq("id", id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-bold mb-1">
            CRM
          </div>
          <h1 className="font-display text-3xl font-bold uppercase text-navy">Talepler</h1>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 bg-navy text-white px-4 py-2 font-display uppercase tracking-wider text-sm"
        >
          <RefreshCw className="h-4 w-4" /> Yenile
        </button>
      </div>

      <div className="bg-white border border-border overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-orange" />
          </div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            Henüz talep yok. Formlar doldurulduğunda burada görünür.
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
                {leads.map((l) => {
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
                      <td className="px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">
                        {l.source}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={l.status}
                          onChange={(e) => updateStatus(l.id, e.target.value)}
                          className={`text-xs font-display uppercase tracking-wider px-2 py-1.5 border ${opt.className} focus:outline-none`}
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
