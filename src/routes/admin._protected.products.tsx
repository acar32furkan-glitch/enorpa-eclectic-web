import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Plus, Pencil, Trash2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { productCategories as fallbackCategories } from "@/data/products";

export const Route = createFileRoute("/admin/_protected/products")({
  head: () => ({
    meta: [{ title: "Ürün Yönetimi | Enorpa Admin" }],
  }),
  ssr: false,
  component: ProductsPage,
});

type Product = {
   id: string;
   name: string;
   type: string;
   capacity: string | null;
   category: string;
   detail: string | null;
   specs: Record<string, string> | null;
   featured: boolean;
   sort_order: number;
   image_url: string | null;
};

const empty: Omit<Product, "id"> = {
   name: "",
   type: "",
   capacity: "",
   category: fallbackCategories[0].id,
   detail: "",
   specs: null,
   featured: false,
   sort_order: 0,
   image_url: null,
};

function ProductsPage() {
   const [items, setItems] = useState<Product[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [editing, setEditing] = useState<(Product & { isNew?: boolean }) | null>(null);
   const [uploadFile, setUploadFile] = useState<File | null>(null);
   const [uploading, setUploading] = useState(false);

   const load = async () => {
     setLoading(true);
     setError(null);
     try {
       const { data, error } = await supabase.from("products").select("*").order("sort_order");
       if (error) throw error;
       setItems((data as unknown as Product[]) ?? []);
     } catch (e) {
       setError(e instanceof Error ? e.message : "Bir hata oluştu");
     } finally {
       setLoading(false);
     }
   };

   useEffect(() => {
     load();
   }, []);

const toSlug = (str: string) =>
      str
        .toLowerCase()
        .replace(/ı/g, "i")
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

   const compressImage = (file: File): Promise<File> => {
     return new Promise((resolve, reject) => {
       const img = new Image();
       img.onload = () => {
         let { width, height } = img;
         const max = 1200;
         if (width > max || height > max) {
           if (width > height) {
             if (width > max) {
               height = Math.round((height * max) / width);
               width = max;
             }
           } else {
             if (height > max) {
               width = Math.round((width * max) / height);
               height = max;
             }
           }
         }
         const canvas = document.createElement("canvas");
         canvas.width = width;
         canvas.height = height;
         const ctx = canvas.getContext("2d");
         if (!ctx) return reject(new Error("Canvas context error"));
         ctx.drawImage(img, 0, 0, width, height);
         canvas.toBlob((blob) => {
           if (!blob) return reject(new Error("Compression failed"));
           resolve(new File([blob], file.name.replace(/\.[^/.]+$/, ".webp"), { type: "image/webp" }));
         }, "image/webp", 0.8);
       };
       img.onerror = () => reject(new Error("Image load error"));
       img.src = URL.createObjectURL(file);
     });
   };

   const handleFileChange = async (file: File | null) => {
     if (!file) {
       setUploadFile(null);
       return;
     }
     if (!file.type.startsWith("image/")) {
       setError("Lütfen geçerli bir görsel dosyası seçin");
       return;
     }
     try {
       const compressed = await compressImage(file);
       if (compressed.size > 3 * 1024 * 1024) {
         setError("Görsel çok büyük, lütfen daha küçük bir dosya seçin");
         return;
       }
       setUploadFile(compressed);
       setError(null);
     } catch (e) {
       setError(e instanceof Error ? e.message : "Görsel işlenemedi");
     }
   };

   const save = async (file?: File | null) => {
     if (!editing) return;
     setUploading(true);
     
     let finalImageUrl = editing.image_url;
     
     if (file) {
       const slug = toSlug(editing.name || "product");
       const path = `products/${slug}.webp`;
       const { error: uploadError } = await supabase.storage.from("product-images").upload(path, file, { upsert: true });
       if (uploadError) {
         setError(uploadError.message);
         setUploading(false);
         return;
       }
       const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(path);
       finalImageUrl = urlData.publicUrl;
     }
     
     const payload = {
       name: editing.name,
       type: editing.type,
       category: editing.category,
       capacity: editing.capacity,
       detail: editing.detail,
       specs: editing.specs,
       featured: editing.featured,
       sort_order: editing.sort_order,
       image_url: finalImageUrl,
     };
     try {
       if ((editing as any).isNew) {
         await supabase.from("products").insert(payload);
       } else {
         await supabase.from("products").update(payload).eq("id", editing.id);
       }
       setEditing(null);
       setUploadFile(null);
       await load();
     } catch (e) {
       setError(e instanceof Error ? e.message : "Kaydetme hatası");
     } finally {
       setUploading(false);
     }
   };

  const remove = async (id: string) => {
    if (!confirm("Bu ürünü silmek istiyor musunuz?")) return;
    try {
      await supabase.from("products").delete().eq("id", id);
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Silme hatası");
    }
  };

  if (error)
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded">
          Ürünler yüklenirken hata oluştu, lütfen sayfayı yenileyin
        </div>
      </div>
    );

  if (loading)
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-orange" />
      </div>
    );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-bold mb-1">CMS</div>
          <h1 className="font-display text-3xl font-bold uppercase text-navy">Ürün Yönetimi</h1>
        </div>
        <button
          onClick={() => setEditing({ ...empty, isNew: true } as any)}
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
          <>
            <div className="space-y-3 p-4 md:hidden">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} onEdit={setEditing} onDelete={remove} />
              ))}
            </div>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-sm">
                <thead className="bg-steel border-b border-border">
                  <tr className="text-left font-display uppercase text-xs tracking-wider text-navy">
                    <th className="px-4 py-3">Ad</th>
                    <th className="px-4 py-3">Kategori</th>
                    <th className="px-4 py-3">Tip</th>
                    <th className="px-4 py-3">Kapasite</th>
                    <th className="px-4 py-3">Öne Çıkan</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((p) => (
                    <tr key={p.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 font-semibold text-navy">{p.name}</td>
                      <td className="px-4 py-3 text-xs">{fallbackCategories.find((c) => c.id === p.category)?.title ?? p.category}</td>
                      <td className="px-4 py-3 text-xs">{p.type}</td>
                      <td className="px-4 py-3 text-xs">{p.capacity || "—"}</td>
                      <td className="px-4 py-3">
                        {p.featured ? <span className="text-xs bg-orange text-white px-2 py-1">Öne Çıkan</span> : null}
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button onClick={() => setEditing(p)} className="inline-flex h-9 w-9 items-center justify-center rounded p-2 text-navy hover:bg-steel hover:text-orange" aria-label="Düzenle">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => remove(p.id)} className="inline-flex h-9 w-9 items-center justify-center rounded p-2 text-muted-foreground hover:bg-steel hover:text-red-600" aria-label="Sil">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

{editing && (
        <ProductModal
          draft={editing}
          onChange={setEditing}
          onClose={() => { setEditing(null); setUploadFile(null); }}
          onSave={save}
          uploadFile={uploadFile}
          uploading={uploading}
        />
      )}
    </div>
  );
}

function ProductCard({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}) {
  const category = fallbackCategories.find((c) => c.id === product.category)?.title ?? product.category;

  return (
    <div className="rounded border border-border p-4">
      <div className="space-y-2 text-sm">
        <div className="min-w-0 break-words">
          <span className="font-display font-semibold uppercase tracking-wider text-orange">Ad:</span>{" "}
          <span className="font-semibold text-navy">{product.name}</span>
        </div>
        <div className="min-w-0 break-words">
          <span className="font-display font-semibold uppercase tracking-wider text-orange">Kategori:</span>{" "}
          <span>{category}</span>
        </div>
        <div className="min-w-0 break-words">
          <span className="font-display font-semibold uppercase tracking-wider text-orange">Tip:</span>{" "}
          <span>{product.type}</span>
        </div>
        <div className="min-w-0 break-words">
          <span className="font-display font-semibold uppercase tracking-wider text-orange">Kapasite:</span>{" "}
          <span>{product.capacity || "—"}</span>
        </div>
      </div>
      {product.featured && (
        <div className="mt-3">
          <span className="text-xs bg-orange text-white px-2 py-1">Öne Çıkan</span>
        </div>
      )}
      <div className="mt-4 flex flex-col gap-2">
        <button onClick={() => onEdit(product)} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded bg-steel p-2 text-sm font-display uppercase tracking-wider text-navy hover:bg-orange hover:text-white">
          <Pencil className="h-4 w-4" /> Düzenle
        </button>
        <button onClick={() => onDelete(product.id)} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded bg-steel p-2 text-sm font-display uppercase tracking-wider text-muted-foreground hover:bg-orange hover:text-white">
          <Trash2 className="h-4 w-4" /> Sil
        </button>
      </div>
    </div>
  );
}

function ProductModal({
   draft,
   onChange,
   onClose,
   onSave,
   uploadFile,
   uploading,
  }: {
   draft: Product & { isNew?: boolean };
   onChange: (d: typeof draft) => void;
   onClose: () => void;
   onSave: (file?: File | null) => void;
   uploadFile: File | null;
   uploading: boolean;
 }) {
   const set = <K extends keyof typeof draft>(k: K, v: (typeof draft)[K]) => onChange({ ...draft, [k]: v });
   const previewUrl = uploadFile ? URL.createObjectURL(uploadFile) : draft.image_url;

   return (
     <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={onClose}>
       <div className="bg-white max-w-lg w-full p-6 md:p-8 relative" onClick={(e) => e.stopPropagation()}>
         <button onClick={onClose} className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded p-2 text-muted-foreground hover:bg-steel hover:text-navy">
           <X className="h-5 w-5" />
         </button>
         <h2 className="font-display text-2xl font-bold uppercase text-navy mb-6">
           {draft.isNew ? "Yeni Ürün" : "Ürünü Düzenle"}
         </h2>
         <form
           onSubmit={(e) => {
             e.preventDefault();
             onSave(uploadFile);
           }}
           className="space-y-4"
         >
           <Field label="Ad">
             <input required value={draft.name} onChange={(e) => set("name", e.target.value)} className="w-full border border-border px-3 py-2 focus:border-orange focus:outline-none" />
           </Field>
           <Field label="Tip">
             <input required value={draft.type} onChange={(e) => set("type", e.target.value)} className="w-full border border-border px-3 py-2 focus:border-orange focus:outline-none" />
           </Field>
           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
             <Field label="Kategori">
               <select
                 value={draft.category}
                 onChange={(e) => set("category", e.target.value)}
                 className="w-full border border-border px-3 py-2 focus:border-orange focus:outline-none"
               >
                 {fallbackCategories.map((c) => (
                   <option key={c.id} value={c.id}>{c.title}</option>
                 ))}
               </select>
             </Field>
             <Field label="Kapasite">
               <input value={draft.capacity ?? ""} onChange={(e) => set("capacity", e.target.value)} className="w-full border border-border px-3 py-2 focus:border-orange focus:outline-none" />
             </Field>
           </div>
           <Field label="Detay">
             <textarea rows={3} value={draft.detail ?? ""} onChange={(e) => set("detail", e.target.value)} className="w-full border border-border px-3 py-2 focus:border-orange focus:outline-none" />
           </Field>
<Field label="Görsel Yükle">
              <div className="space-y-2">
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} className="w-full" />
                {previewUrl && (
                  <div className="mt-2 w-32 h-32 rounded border border-border flex items-center justify-center overflow-hidden">
                    <img src={previewUrl} alt="Önizleme" className="w-32 h-32 object-cover rounded" />
                  </div>
                )}
                {uploading && <span className="text-sm text-navy">Yükleniyor...</span>}
              </div>
            </Field>
           <div className="flex flex-col flex-wrap gap-3 justify-start sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
             <label className="flex items-center gap-2">
               <input type="checkbox" checked={draft.featured} onChange={(e) => set("featured", e.target.checked)} className="accent-orange h-5 w-5" />
               <span className="text-sm font-display uppercase tracking-wider text-navy">Öne Çıkan</span>
             </label>
             <Field label="Sıralama">
               <input type="number" value={draft.sort_order} onChange={(e) => set("sort_order", Number(e.target.value))} className="w-20 border border-border px-3 py-2 focus:border-orange focus:outline-none" />
             </Field>
           </div>
           <div className="flex flex-col flex-wrap gap-2 justify-start sm:flex-row sm:flex-wrap sm:justify-end pt-2">
             <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-display uppercase tracking-wider text-muted-foreground">İptal</button>
             <button type="submit" disabled={uploading} className="bg-orange hover:bg-orange-dark text-white px-5 py-2.5 font-display uppercase tracking-wider text-sm disabled:opacity-50">Kaydet</button>
           </div>
         </form>
       </div>
     </div>
   );
 }

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider font-display font-semibold text-navy mb-2">{label}</label>
      {children}
    </div>
  );
}
