import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/_protected/settings")({
  ssr: false,
  component: SettingsPage,
});

type Setting = {
  key: string;
  value: boolean;
  label: string;
};

function SettingsPage() {
  const [items, setItems] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ key: string; text: string } | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("site_settings").select("*").order("key");
    setItems((data as Setting[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (item: Setting) => {
    const newVal = !item.value;
    setSaving(item.key);
    setMsg(null);
    // Optimistic update
    setItems((prev) => prev.map((s) => (s.key === item.key ? { ...s, value: newVal } : s)));
    const { error } = await supabase.from("site_settings").update({ value: newVal }).eq("key", item.key);
    setSaving(null);
    if (error) {
      // Revert
      setItems((prev) => prev.map((s) => (s.key === item.key ? { ...s, value: item.value } : s)));
      setMsg({ key: item.key, text: "Hata: " + error.message });
    } else {
      setMsg({ key: item.key, text: "Güncellendi" });
      setTimeout(() => setMsg(null), 2000);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-bold mb-1">
          Site Ayarları
        </div>
        <h1 className="font-display text-3xl font-bold uppercase text-navy">Bölüm Gösterim</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Aşağıdaki anahtarlarla site bölümlerinin görünürlüğünü kontrol edin.
        </p>
      </div>

      <div className="bg-white border border-border">
        {loading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-orange" />
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            Henüz ayar bulunamadı. Supabase'de site_settings tablosunu oluşturun.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {items.map((item) => (
              <div key={item.key} className="flex items-center justify-between px-6 py-4">
                <div>
                  <div className="font-display text-navy font-semibold uppercase text-sm">{item.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 font-mono">{item.key}</div>
                </div>
                <div className="flex items-center gap-3">
                  {saving === item.key && <Loader2 className="h-4 w-4 animate-spin text-orange" />}
                  {msg?.key === item.key && (
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <Check className="h-3 w-3" /> {msg.text}
                    </span>
                  )}
                  <button
                    onClick={() => toggle(item)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      item.value ? "bg-orange" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        item.value ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
