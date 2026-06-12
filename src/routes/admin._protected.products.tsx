import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Plus, Pencil, Trash2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/_protected/products")({
  ssr: false,
  component: ProductsPage,
});

type Product = {
  id: string;
  name: string;
  category: string;
  capacity: string | null;
  fuel_type: string | null;
  image_url: string | null;
  description: string | null;
  is_active: boolean;
  sort_order: number;
};

type Draft = Omit<Product, "id"> & { id?: string };

const empty: Draft = {
  name: "",
  category: "",
  capacity: "",
  fuel_type: "",
  image_url: "",
  description: "",
  is_active: true,
  sort_order: 0,
};

function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Draft | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("sort_order");
    setItems((data as Product[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (!editing) return;
    if (editing.id) {
      await supabase.from("products").update(editing).eq("id", editing.id);
    } else {
      await supabase.from("products").insert(editing);
    }
    setEditing(null);
    await load();
  };

  const remove = async (id: string) => {
    if (!confirm("Bu ürünü silmek istiyor musunuz?")) return;
    await supabase.from("products").delete().eq("id", id);
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-bold mb-1">
            CMS
          </div>
          <h1 className="font-display text-3xl font-bold uppercase text-navy">Ürün Yönetimi</h1>
        </div>
        <button
          onClick={() => setEditing({ ...empty })}
          className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-4 py-2.5 font-display uppercase tracking-wider text-sm"
        >
          <Plus className="h-4 w-4" /> Yeni Ürün
        </button>
      </div>

      <div className="bg-white border border-border">
        {loading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-orange" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-steel border-b border-border">
                <tr className="text-left font-display uppercase text-xs tracking-wider text-navy">
                  <th className="px-4 py-3">Görsel</th>
                  <th className="px-4 py-3">Ad</th>
                  <th className="px-4 py-3">Kategori</th>
                  <th className="px-4 py-3">Kapasite</th>
                  <th className="px-4 py-3">Yakıt</th>
                  <th className="px-4 py-3">Durum</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          alt={p.name}
                          className="h-12 w-16 object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-12 w-16 bg-steel" />
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold text-navy">{p.name}</td>
                    <td className="px-4 py-3 text-xs">{p.category}</td>
                    <td className="px-4 py-3 text-xs">{p.capacity}</td>
                    <td className="px-4 py-3 text-xs">{p.fuel_type}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 ${
                          p.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {p.is_active ? "Aktif" : "Pasif"}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => setEditing(p)}
                        className="text-navy hover:text-orange"
                        aria-label="Düzenle"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => remove(p.id)}
                        className="text-muted-foreground hover:text-red-600"
                        aria-label="Sil"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <ProductModal
          draft={editing}
          onChange={setEditing}
          onClose={() => setEditing(null)}
          onSave={save}
        />
      )}
    </div>
  );
}

function ProductModal({
  draft,
  onChange,
  onClose,
  onSave,
}: {
  draft: Draft;
  onChange: (d: Draft) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => onChange({ ...draft, [k]: v });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white max-w-lg w-full p-6 md:p-8 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-navy">
          <X className="h-5 w-5" />
        </button>
        <h2 className="font-display text-2xl font-bold uppercase text-navy mb-6">
          {draft.id ? "Ürünü Düzenle" : "Yeni Ürün"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
          className="space-y-4"
        >
          <Field label="Ad">
            <input
              required
              value={draft.name}
              onChange={(e) => set("name", e.target.value)}
              className="w-full border border-border px-3 py-2 focus:border-orange focus:outline-none"
            />
          </Field>
          <Field label="Kategori">
            <input
              required
              value={draft.category}
              onChange={(e) => set("category", e.target.value)}
              className="w-full border border-border px-3 py-2 focus:border-orange focus:outline-none"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Kapasite">
              <input
                value={draft.capacity ?? ""}
                onChange={(e) => set("capacity", e.target.value)}
                className="w-full border border-border px-3 py-2 focus:border-orange focus:outline-none"
              />
            </Field>
            <Field label="Yakıt Tipi">
              <input
                value={draft.fuel_type ?? ""}
                onChange={(e) => set("fuel_type", e.target.value)}
                className="w-full border border-border px-3 py-2 focus:border-orange focus:outline-none"
              />
            </Field>
          </div>
          <Field label="Görsel URL">
            <input
              type="url"
              value={draft.image_url ?? ""}
              onChange={(e) => set("image_url", e.target.value)}
              className="w-full border border-border px-3 py-2 focus:border-orange focus:outline-none"
            />
          </Field>
          <Field label="Açıklama">
            <textarea
              rows={2}
              value={draft.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
              className="w-full border border-border px-3 py-2 focus:border-orange focus:outline-none"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Sıralama">
              <input
                type="number"
                value={draft.sort_order}
                onChange={(e) => set("sort_order", Number(e.target.value))}
                className="w-full border border-border px-3 py-2 focus:border-orange focus:outline-none"
              />
            </Field>
            <label className="flex items-end gap-2 pb-2">
              <input
                type="checkbox"
                checked={draft.is_active}
                onChange={(e) => set("is_active", e.target.checked)}
                className="accent-orange h-5 w-5"
              />
              <span className="text-sm font-display uppercase tracking-wider text-navy">Aktif</span>
            </label>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-display uppercase tracking-wider text-muted-foreground"
            >
              İptal
            </button>
            <button
              type="submit"
              className="bg-orange hover:bg-orange-dark text-white px-5 py-2.5 font-display uppercase tracking-wider text-sm"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider font-display font-semibold text-navy mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
