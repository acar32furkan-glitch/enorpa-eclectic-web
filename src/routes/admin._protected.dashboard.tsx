import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, lazy, Suspense } from "react";
import { Inbox, Clock, Trophy, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Charts = lazy(() =>
  import("recharts").then((m) => ({
    default: ({
      data,
    }: {
      data: { day: string; leads: number }[];
    }) => (
      <m.ResponsiveContainer>
        <m.BarChart data={data}>
          <m.CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <m.XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 12 }} />
          <m.YAxis allowDecimals={false} tick={{ fill: "#64748b", fontSize: 12 }} />
          <m.Tooltip />
          <m.Bar dataKey="leads" fill="#e05c1a" radius={[4, 4, 0, 0]} />
        </m.BarChart>
      </m.ResponsiveContainer>
    ),
  })),
);

export const Route = createFileRoute("/admin/_protected/dashboard")({
  head: () => ({
    meta: [{ title: "Yönetim Paneli | Enorpa" }],
  }),
  ssr: false,
  component: Dashboard,
});

type Lead = { created_at: string; interest: string | null; status: string };

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const since = new Date();
        since.setDate(since.getDate() - 30);
        const { data, error } = await supabase
          .from("leads")
          .select("created_at,interest,status")
          .gte("created_at", since.toISOString());
        if (error) throw error;
        setLeads(data ?? []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Bir hata oluştu");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (error)
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded">
          Veriler yüklenirken hata oluştu, lütfen sayfayı yenileyin
        </div>
      </div>
    );

  if (loading)
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-orange" />
      </div>
    );

  // This month
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthLeads = leads.filter((l) => new Date(l.created_at) >= monthStart);
  const pending = leads.filter((l) => l.status === "pending").length;

  // Most popular interest
  const counts: Record<string, number> = {};
  leads.forEach((l) => {
    const k = l.interest || "Genel";
    counts[k] = (counts[k] ?? 0) + 1;
  });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const topCategory = top ? top[0] : "—";

  // 7-day chart
  const chart: { day: string; leads: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const count = leads.filter((l) => l.created_at.slice(0, 10) === key).length;
    chart.push({ day: d.toLocaleDateString("tr-TR", { weekday: "short" }), leads: count });
  }

  const stats = [
    { label: "Bu Ay Talepler", value: monthLeads.length, icon: Inbox, color: "bg-orange" },
    { label: "Bekleyen Talepler", value: pending, icon: Clock, color: "bg-navy" },
    { label: "Popüler Kategori", value: topCategory, icon: Trophy, color: "bg-orange-dark" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-bold mb-1">
          Genel Bakış
        </div>
        <h1 className="font-display text-3xl font-bold uppercase text-navy">Site Analizleri</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="text-xs uppercase tracking-wider font-display text-muted-foreground">
                {s.label}
              </div>
              <div className={`h-10 w-10 ${s.color} text-white flex items-center justify-center`}>
                <s.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="font-display text-3xl font-bold text-navy truncate">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-border p-6">
        <h2 className="font-display text-lg font-bold uppercase text-navy mb-4">
          Son 7 Gün — Talep Akışı
        </h2>
        <div style={{ width: "100%", height: 300 }}>
          <Suspense fallback={<div className="flex items-center justify-center h-full"><Loader2 className="h-6 w-6 animate-spin text-orange" /></div>}>
            <Charts data={chart} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
