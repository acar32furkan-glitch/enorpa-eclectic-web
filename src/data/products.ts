import { supabase } from "@/integrations/supabase/client";

export type ProductSpecs = {
  yakit?: string;
  basinc?: string;
  standart?: string;
  cikisSicakligi?: string;
};

export type Product = {
   name: string;
   type: string;
   category?: string;
   capacity?: string;
   detail?: string;
   specs?: ProductSpecs;
   featured?: boolean;
   image_url?: string;
   slug?: string;
   long_description?: string;
   pdf_url?: string;
   meta_description?: string;
};

export type ProductCategory = {
  id: string;
  title: string;
  products: Product[];
};

export const productCategories: ProductCategory[] = [
  {
    id: "sicak-su",
    title: "Sıcak Su Kazanları",
    products: [
      { name: "Oniks Serisi", type: "Katı Yakıtlı Sıcak Su Kazanı", capacity: "3.000.000 – 6.000.000 kcal/h" },
      {
        name: "Obsidyen Serisi",
        type: "Multi Yakıtlı Sıcak Su Kazanı",
        capacity: "1.750.000 – 6.000.000 kcal/h",
        detail:
          "Katı, sıvı, gaz ve biomass yakıtla çalışabilen tam otomatik kontrol sistemi. Hareketli ızgaralar sayesinde yakıtı kül formuna kadar tamamen yakar.",
        specs: { yakit: "Doğalgaz/Fuel-Oil/Kömür/Pelet/Prina", basinc: "3 barG", standart: "TS EN 497 / TS EN 12953" },
        featured: true,
      },
      { name: "Akuamarin Serisi", type: "Sıvı/Gaz Yakıtlı Sıcak Su Kazanı", capacity: "75 kW – 20.000 kW", featured: true },
      { name: "Ametist Serisi", type: "Katı Yakıtlı Sıcak Su Kazanı", capacity: "500.000 – 5.000.000 kcal/h" },
      { name: "Turkuaz Serisi", type: "Katı Yakıtlı Sıcak Su Kazanı", capacity: "300.000 – 1.750.000 kcal/h" },
      {
        name: "Kalsedon Serisi",
        type: "Katı Yakıtlı Sıcak Su Kazanı (Çift Külhanlı)",
        capacity: "1.500.000 – 3.500.000 kcal/h",
        detail:
          "2 ayrı yanma odası sayesinde yarım kapasitede çalışabilen, düşük yakıt tüketimiyle tasarruf sağlayan tasarım. %94'e varan kurum tutma kapasiteli siklon sistemi standarttır.",
        specs: { yakit: "Kömür/Pelet/Prina", basinc: "3 barG", standart: "TS EN 497" },
        featured: true,
      },
      {
        name: "Jasper Serisi",
        type: "Sıvı-Gaz Yakıtlı Buhar Jeneratörü",
        capacity: "349 kW – 2.093 kW",
        detail:
          "Sıvı – Gaz Yakıtlı, Su Borulu Serpantinli, 3 Geçişli, CE Belgeli, TS – 12952 ve 2014/68/EU Basınçlı Kaplar Direktifine Uygun. Buhar seperatörü sayesinde %96 kurulukta buhar üretir. 2 ila 5 dakika arasında buhar üreterek prosese iletir.",
        specs: {
          yakit: "Sıvı-Gaz Yakıtlar",
          standart: "CE Belgeli; TS – 12952 ve 2014/68/EU",
          cikisSicakligi: "%91'e Varan Termal Verim",
        },
        featured: true,
      },
    ],
  },
  {
    id: "buhar",
    title: "Buhar Kazanları",
    products: [
      { name: "Kuvars Serisi (Tek Külhanlı)", type: "Katı Yakıtlı Buhar Kazanı", capacity: "500 – 5.000 kg/h", featured: true },
      { name: "Kuvars Serisi (Çift Külhanlı)", type: "Katı Yakıtlı Buhar Kazanı", capacity: "500 – 5.000 kg/h" },
      { name: "Kuvars NG Serisi", type: "Sıvı/Gaz Yakıtlı Buhar Kazanı", capacity: "500 – 10.000 kg/h" },
      { name: "Turmalin Serisi", type: "Multi Yakıtlı Buhar Kazanı", capacity: "2.000 – 5.000 kg/h", featured: true },
    ],
  },
  {
    id: "sicak-hava",
    title: "Sıcak Hava Kazanları",
    products: [
      { name: "HAS Serisi", type: "Katı Yakıtlı Sıcak Hava Kazanı", capacity: "75.000 – 200.000 kcal/h" },
      { name: "HAS NG Serisi", type: "Sıvı/Gaz Yakıtlı Sıcak Hava Kazanı", capacity: "100.000 – 1.000.000 kcal/h" },
      {
        name: "HAS Turbo Serisi",
        type: "Katı Yakıtlı Sıcak Hava Kazanı",
        capacity: "300.000 – 600.000 kcal/h",
        detail:
          "Çift pota - çift redüktör - çift körük fanlı tasarım sayesinde düşük talepte yarım kapasite çalışabilir. Bir pota arızalansa diğeri çalışmaya devam eder. %91'e varan termal verim.",
        specs: { yakit: "10-18mm Kömür/Pelet/Prina", cikisSicakligi: "100°C", standart: "TS EN 497" },
        featured: true,
      },
    ],
  },
  {
    id: "kizgin-su",
    title: "Kızgın Su Kazanları",
    products: [
      { name: "Akuamarin KS Serisi", type: "Sıvı/Gaz Yakıtlı Kızgın Su Kazanı", capacity: "75 kW – 20.000 kW" },
      { name: "Turkuaz KS Serisi", type: "Katı Yakıtlı Kızgın Su Kazanı", capacity: "300.000 – 1.750.000 kcal/h" },
    ],
  },
  {
    id: "diger",
    title: "Diğer Ürün ve Hizmetler",
    products: [
      { name: "Kat Kaloriferi", type: "Bina İçi Isıtma Çözümü" },
      { name: "Anahtar Teslim Sera Isıtma Sistemi", type: "Proje + Kurulum + Devreye Alma" },
      { name: "Brülörler", type: "Riello, Ecostar, Ecoflam markaları" },
      { name: "Baca", type: "Tek Cidarlı / Çift Cidarlı" },
      { name: "Kondenser", type: "Yakıt tasarrufu sağlayan kondenser sistemleri" },
      { name: "Ekonomizer", type: "Endüstriyel enerji verimliliği çözümleri" },
      { name: "Kazan Otomasyon Sistemi", type: "Verimlilik ve enerji tasarrufu sağlayan kontrol sistemleri" },
      { name: "Kazan Kontrol Panosu", type: "Kullanıcı dostu kazan kontrol panoları" },
      { name: "Yedek Parça", type: "Ömür boyu yedek parça desteği" },
    ],
  },
];

/** Tüm kategorilerden featured ürünleri döndürür */
export function getFeaturedProducts(): (Product & { categoryTitle: string })[] {
  const result: (Product & { categoryTitle: string })[] = [];
  for (const cat of productCategories) {
    for (const p of cat.products) {
      if (p.featured) {
        result.push({ ...p, categoryTitle: cat.title });
      }
    }
  }
  return result;
}

export async function fetchProductsFromSupabase(): Promise<ProductCategory[]> {
  try {
    const { data, error } = await supabase.from("products").select("*").order("sort_order");
    if (error || !data || data.length === 0) return productCategories;

    const grouped: ProductCategory[] = productCategories.map((cat) => ({
      ...cat,
      products: [],
    }));
const digerIndex = productCategories.findIndex((c) => c.id === "diger");
    const validCategoryIds = productCategories.map((c) => c.id);

    for (const row of data) {
      const catId = row.category;
      const categoryIndex = validCategoryIds.indexOf(catId);
      const targetIndex = categoryIndex >= 0 ? categoryIndex : digerIndex;
      if (targetIndex >= 0) {
        const p: Product = {
          name: row.name,
          type: row.type,
          capacity: row.capacity || undefined,
          detail: row.detail || undefined,
          specs: row.specs ? (row.specs as unknown as ProductSpecs) : undefined,
          featured: row.featured || false,
          image_url: row.image_url || undefined,
          slug: row.slug || toSlug(row.name) || undefined,
          long_description: row.long_description || undefined,
          pdf_url: row.pdf_url || undefined,
          meta_description: row.meta_description || undefined,
        };
        grouped[targetIndex].products.push(p);
      }
    }
    return grouped;
  } catch {
    return productCategories;
  }
}

export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single();
    if (error || !data) return null;
    
const p: Product = {
       name: data.name,
       type: data.type,
       category: data.category || undefined,
       capacity: data.capacity || undefined,
      detail: data.detail || undefined,
      specs: data.specs ? (data.specs as unknown as ProductSpecs) : undefined,
      featured: data.featured || false,
      image_url: data.image_url || undefined,
      slug: data.slug || undefined,
      long_description: data.long_description || undefined,
      pdf_url: data.pdf_url || undefined,
      meta_description: data.meta_description || undefined,
    };
    return p;
  } catch {
    return null;
  }
}
