import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, lazy, Suspense } from "react";
import { Inbox, Clock, Trophy, Loader2, Users, TrendingUp, PieChart } from "lucide-react";
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

const LineChart = lazy(() =>
  import("recharts").then((m) => ({
    default: ({
      data,
    }: {
      data: { day: string; visits: number }[];
    }) => (
      <m.ResponsiveContainer>
        <m.LineChart data={data}>
          <m.CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <m.XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 12 }} />
          <m.YAxis allowDecimals={false} tick={{ fill: "#64748b", fontSize: 12 }} />
          <m.Tooltip />
          <m.Line type="monotone" dataKey="visits" stroke="#e05c1a" strokeWidth={2} />
        </m.LineChart>
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

type AnalyticsData = {
  visits: { day: string; visits: number }[];
  topPages: { path: string; count: number }[];
  conversionRate: number;
  totalLeads: number;
  totalVisits: number;
  trafficSources: { source: string; count: number }[];
};

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

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

  useEffect(() => {
    (async () => {
      try {
        const since = new Date();
        since.setDate(since.getDate() - 30);
        const sinceStr = since.toISOString();

        const [{ data: pv }, { data: leads }, { count: totalVisits }] = await Promise.all([
          supabase.from("page_views").select("path,referrer,created_at").gte("created_at", sinceStr),
          supabase.from("leads").select("created_at").gte("created_at", sinceStr),
          supabase.from("page_views").select("id", { count: "exact" }).gte("created_at", sinceStr),
        ]);

        const visitsByDay: Record<string, number> = {};
        pv?.forEach((v: any) => {
          const day = v.created_at.slice(0, 10);
          visitsByDay[day] = (visitsByDay[day] || 0) + 1;
        });
        const visits = Object.entries(visitsByDay)
          .map(([day, count]) => ({ day, visits: count }))
          .sort((a, b) => a.day.localeCompare(b.day));

        const pageCounts: Record<string, number> = {};
        pv?.forEach((v: any) => {
          pageCounts[v.path] = (pageCounts[v.path] || 0) + 1;
        });
        const topPages = Object.entries(pageCounts)
          .map(([path, count]) => ({ path, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        const uniqueSessions = new Set(pv?.map((v: any) => v.session_id)).size;
        const totalLeads = leads?.length || 0;
        const conversionRate = totalVisits ? (totalLeads / totalVisits) * 100 : 0;

        const sources: Record<string, number> = { Google: 0, "Sosyal Medya": 0, Direkt: 0, Diğer: 0 };
        pv?.forEach((v: any) => {
          const ref = (v.referrer || "").toLowerCase();
          if (ref.includes("google")) sources.Google++;
          else if (ref.includes("instagram") || ref.includes("facebook") || ref.includes("whatsapp") || ref.includes("t.co")) sources["Sosyal Medya"]++;
          else if (!ref) sources.Direkt++;
          else sources.Diğer++;
        });
        const trafficSources = Object.entries(sources).map(([source, count]) => ({ source, count }));

        setAnalytics({ visits, topPages, conversionRate, totalLeads, totalVisits: totalVisits || 0, trafficSources });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Analytics verileri yüklenemedi");
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
  const topCategory = top ? top[0] : "Henüz veri yok";
  const hasLeadData = leads.length > 0;

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
            {hasLeadData ? (
              <Charts data={chart} />
            ) : (
              <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                Henüz veri yok
              </div>
            )}
          </Suspense>
        </div>
      </div>

      <div className="mt-8">
        <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-bold mb-1">
          Ziyaretçi Analizi
        </div>
        <h2 className="font-display text-2xl font-bold uppercase text-navy mb-4">Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-border p-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-display text-muted-foreground mb-2">
            <Users className="h-4 w-4 text-orange" />
            Toplam Ziyaretçi
          </div>
          <div className="font-display text-3xl font-bold text-navy">{analytics?.totalVisits || 0}</div>
        </div>
        <div className="bg-white border border-border p-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-display text-muted-foreground mb-2">
            <TrendingUp className="h-4 w-4 text-orange" />
            Dönüşüm Oranı
          </div>
          <div className="font-display text-3xl font-bold text-navy">
            {analytics ? `${analytics.conversionRate.toFixed(1)}%` : "—"}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {analytics ? `${analytics.totalLeads} lead / ${analytics.totalVisits} ziyaretçi` : ""}
          </div>
        </div>
        <div className="bg-white border border-border p-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-display text-muted-foreground mb-2">
            <PieChart className="h-4 w-4 text-orange" />
            Trafik Kaynakları
          </div>
          <div className="space-y-1 text-sm">
            {analytics?.trafficSources.map((s) => (
              <div key={s.source} className="flex justify-between">
                <span>{s.source}</span>
                <span className="font-bold text-navy">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-border p-6">
          <h3 className="font-display text-lg font-bold uppercase text-navy mb-4">Son 30 Gün — Ziyaretçi Akışı</h3>
          <div style={{ width: "100%", height: 300 }}>
            <Suspense fallback={<div className="flex items-center justify-center h-full"><Loader2 className="h-6 w-6 animate-spin text-orange" /></div>}>
              <LineChart data={analytics?.visits || []} />
            </Suspense>
          </div>
        </div>
        <div className="bg-white border border-border p-6">
          <h3 className="font-display text-lg font-bold uppercase text-navy mb-4">En Çok Ziyaret Edilen Sayfalar</h3>
          <div className="divide-y divide-border">
            {analytics?.topPages.length ? (
              analytics.topPages.map((p) => (
                <div key={p.path} className="py-2 flex justify-between">
                  <span className="text-sm">{p.path}</span>
                  <span className="font-bold text-navy">{p.count}</span>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-muted-foreground">Henüz veri yok</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
