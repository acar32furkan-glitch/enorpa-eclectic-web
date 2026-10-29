-- ============================================================================
-- Enorpa Enerji — yerel şema tamamlama
--
-- Neden: Uygulama kodunda kullanılan site_settings / page_views / blog_posts /
-- projects tabloları ile products tablosunun bazı kolonları migration'larda
-- yer almıyordu (bulut projesi elle düzenlenmişti). Bu migration şemayı
-- kodla uyumlu, tam ve idempotent hâle getirir; böylece `supabase start`
-- sonrası site + admin paneli tam çalışır.
-- ============================================================================

-- ---------------------------------------------------------------- products
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS type TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category_id TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category_title TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS detail TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS specs JSONB;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS long_description TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS pdf_url TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS meta_description TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS products_slug_unique ON public.products (slug);

-- ---------------------------------------------------------- site_settings
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value BOOLEAN NOT NULL DEFAULT true,
  label TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone reads site settings" ON public.site_settings;
CREATE POLICY "Anyone reads site settings" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Admins manage site settings" ON public.site_settings;
CREATE POLICY "Admins manage site settings" ON public.site_settings
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.site_settings (key, value, label) VALUES
  ('show_stats', true, 'İstatistik şeridi'),
  ('show_sectors', true, 'Sektörler'),
  ('show_roi_calculator', true, 'Yakıt tasarrufu hesaplayıcı'),
  ('show_references', true, 'Referanslar'),
  ('show_documents', true, 'Doküman merkezi'),
  ('show_gallery', true, 'Proje galerisi'),
  ('show_testimonials', true, 'Müşteri görüşleri')
ON CONFLICT (key) DO NOTHING;

-- ------------------------------------------------------------- page_views
CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,
  referrer TEXT,
  session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS page_views_created_at_idx ON public.page_views (created_at DESC);

GRANT INSERT ON public.page_views TO anon, authenticated;
GRANT SELECT ON public.page_views TO authenticated;
GRANT ALL ON public.page_views TO service_role;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone records page views" ON public.page_views;
CREATE POLICY "Anyone records page views" ON public.page_views
  FOR INSERT TO anon, authenticated
  WITH CHECK (length(path) BETWEEN 1 AND 500);

DROP POLICY IF EXISTS "Admins view page views" ON public.page_views;
CREATE POLICY "Admins view page views" ON public.page_views
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ------------------------------------------------------------- blog_posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content_html TEXT,
  featured_image_url TEXT,
  language TEXT NOT NULL DEFAULT 'tr',
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS blog_posts_lang_published_idx
  ON public.blog_posts (language, published_at DESC);

GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone reads blog posts" ON public.blog_posts;
CREATE POLICY "Anyone reads blog posts" ON public.blog_posts
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Admins manage blog posts" ON public.blog_posts;
CREATE POLICY "Admins manage blog posts" ON public.blog_posts
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- --------------------------------------------------------------- projects
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  featured_image_url TEXT,
  year TEXT,
  language TEXT NOT NULL DEFAULT 'tr',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (slug, language)
);

GRANT SELECT ON public.projects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone reads projects" ON public.projects;
CREATE POLICY "Anyone reads projects" ON public.projects
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Admins manage projects" ON public.projects;
CREATE POLICY "Admins manage projects" ON public.projects
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.projects (slug, title, subtitle, description, featured_image_url, year, language) VALUES
  ('ozbekistan-taskent', 'Özbekistan / Taşkent', 'Sera Isıtma Tesisatı Kurulumu',
   'Taşkent''te sera ısıtma tesisatı kurulumu. Enorpa HAS Serisi kazanlar ile donatılan tesis yüksek verimlilikle çalışıyor.',
   '/img/projects/taskent.svg', '2020', 'tr'),
  ('ozbekistan-harezm', 'Özbekistan / Harezm', 'Sera Isıtma Tesisatı Kurulumu',
   'Harezm''de sera ısıtma tesisatı kurulumu. Sıcak iklim koşullarına uygun özel tasarım.',
   '/img/projects/harezm.svg', '2020', 'tr'),
  ('turkiye-manisa', 'Türkiye / Manisa', 'Buhar Kazanı Kurulumu',
   'Manisa''da sanayi tesisine özel buhar kazanı projelendirildi, kuruldu ve devreye alındı.',
   '/img/projects/manisa.svg', '2019', 'tr'),
  ('turkiye-izmir', 'Türkiye / İzmir', 'Sera Isıtma Tesisatı Kurulumu',
   'İzmir''de sera ısıtma tesisatı kurulumu. Düşük yakıt tüketimli çözümler.',
   '/img/projects/izmir.svg', '2021', 'tr')
ON CONFLICT (slug, language) DO NOTHING;

-- ------------------------------------------------------- storage (bucket)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- --------------------------------------------------------- ürün kataloğu
INSERT INTO public.products
  (name, type, capacity, category, category_id, category_title, detail, specs, featured, sort_order, slug, is_active)
SELECT v.name, v.type, v.capacity, v.category, v.category_id, v.category_title,
       v.detail, v.specs::jsonb, v.featured, v.sort_order, v.slug, true
FROM (VALUES
  ('Oniks Serisi', 'Katı Yakıtlı Sıcak Su Kazanı', '3.000.000 – 6.000.000 kcal/h', 'Sıcak Su Kazanları', 'sicak-su', 'Sıcak Su Kazanları', NULL, NULL, false, 1, 'oniks-serisi'),
  ('Obsidyen Serisi', 'Multi Yakıtlı Sıcak Su Kazanı', '1.750.000 – 6.000.000 kcal/h', 'Sıcak Su Kazanları', 'sicak-su', 'Sıcak Su Kazanları', 'Katı, sıvı, gaz ve biomass yakıtla çalışabilen tam otomatik kontrol sistemi. Hareketli ızgaralar sayesinde yakıtı kül formuna kadar tamamen yakar.', '{"yakit": "Doğalgaz/Fuel-Oil/Kömür/Pelet/Prina", "basinc": "3 barG", "standart": "TS EN 497 / TS EN 12953"}', true, 2, 'obsidyen-serisi'),
  ('Akuamarin Serisi', 'Sıvı/Gaz Yakıtlı Sıcak Su Kazanı', '75 kW – 20.000 kW', 'Sıcak Su Kazanları', 'sicak-su', 'Sıcak Su Kazanları', NULL, NULL, true, 3, 'akuamarin-serisi'),
  ('Ametist Serisi', 'Katı Yakıtlı Sıcak Su Kazanı', '500.000 – 5.000.000 kcal/h', 'Sıcak Su Kazanları', 'sicak-su', 'Sıcak Su Kazanları', NULL, NULL, false, 4, 'ametist-serisi'),
  ('Turkuaz Serisi', 'Katı Yakıtlı Sıcak Su Kazanı', '300.000 – 1.750.000 kcal/h', 'Sıcak Su Kazanları', 'sicak-su', 'Sıcak Su Kazanları', NULL, NULL, false, 5, 'turkuaz-serisi'),
  ('Kalsedon Serisi', 'Katı Yakıtlı Sıcak Su Kazanı (Çift Külhanlı)', '1.500.000 – 3.500.000 kcal/h', 'Sıcak Su Kazanları', 'sicak-su', 'Sıcak Su Kazanları', '2 ayrı yanma odası sayesinde yarım kapasitede çalışabilen, düşük yakıt tüketimiyle tasarruf sağlayan tasarım. %94''e varan kurum tutma kapasiteli siklon sistemi standarttır.', '{"yakit": "Kömür/Pelet/Prina", "basinc": "3 barG", "standart": "TS EN 497"}', true, 6, 'kalsedon-serisi'),
  ('Kuvars Serisi (Tek Külhanlı)', 'Katı Yakıtlı Buhar Kazanı', '500 – 5.000 kg/h', 'Buhar Kazanları', 'buhar', 'Buhar Kazanları', NULL, NULL, true, 7, 'kuvars-serisi-tek-kulhanli'),
  ('Kuvars Serisi (Çift Külhanlı)', 'Katı Yakıtlı Buhar Kazanı', '500 – 5.000 kg/h', 'Buhar Kazanları', 'buhar', 'Buhar Kazanları', NULL, NULL, false, 8, 'kuvars-serisi-cift-kulhanli'),
  ('Kuvars NG Serisi', 'Sıvı/Gaz Yakıtlı Buhar Kazanı', '500 – 10.000 kg/h', 'Buhar Kazanları', 'buhar', 'Buhar Kazanları', NULL, NULL, false, 9, 'kuvars-ng-serisi'),
  ('Turmalin Serisi', 'Multi Yakıtlı Buhar Kazanı', '2.000 – 5.000 kg/h', 'Buhar Kazanları', 'buhar', 'Buhar Kazanları', NULL, NULL, true, 10, 'turmalin-serisi'),
  ('HAS Serisi', 'Katı Yakıtlı Sıcak Hava Kazanı', '75.000 – 200.000 kcal/h', 'Sıcak Hava Kazanları', 'sicak-hava', 'Sıcak Hava Kazanları', NULL, NULL, false, 11, 'has-serisi'),
  ('HAS NG Serisi', 'Sıvı/Gaz Yakıtlı Sıcak Hava Kazanı', '100.000 – 1.000.000 kcal/h', 'Sıcak Hava Kazanları', 'sicak-hava', 'Sıcak Hava Kazanları', NULL, NULL, false, 12, 'has-ng-serisi'),
  ('HAS Turbo Serisi', 'Katı Yakıtlı Sıcak Hava Kazanı', '300.000 – 600.000 kcal/h', 'Sıcak Hava Kazanları', 'sicak-hava', 'Sıcak Hava Kazanları', 'Çift pota - çift redüktör - çift körük fanlı tasarım sayesinde düşük talepte yarım kapasite çalışabilir. Bir pota arızalansa diğeri çalışmaya devam eder. %91''e varan termal verim.', '{"yakit": "10-18mm Kömür/Pelet/Prina", "cikisSicakligi": "100°C", "standart": "TS EN 497"}', true, 13, 'has-turbo-serisi'),
  ('Akuamarin KS Serisi', 'Sıvı/Gaz Yakıtlı Kızgın Su Kazanı', '75 kW – 20.000 kW', 'Kızgın Su Kazanları', 'kizgin-su', 'Kızgın Su Kazanları', NULL, NULL, false, 14, 'akuamarin-ks-serisi'),
  ('Turkuaz KS Serisi', 'Katı Yakıtlı Kızgın Su Kazanı', '300.000 – 1.750.000 kcal/h', 'Kızgın Su Kazanları', 'kizgin-su', 'Kızgın Su Kazanları', NULL, NULL, false, 15, 'turkuaz-ks-serisi'),
  ('Kat Kaloriferi', 'Bina İçi Isıtma Çözümü', NULL, 'Diğer Ürün ve Hizmetler', 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 16, 'kat-kaloriferi'),
  ('Anahtar Teslim Sera Isıtma Sistemi', 'Proje + Kurulum + Devreye Alma', NULL, 'Diğer Ürün ve Hizmetler', 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 17, 'anahtar-teslim-sera-isitma-sistemi'),
  ('Brülörler', 'Riello, Ecostar, Ecoflam markaları', NULL, 'Diğer Ürün ve Hizmetler', 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 18, 'brulorler'),
  ('Baca', 'Tek Cidarlı / Çift Cidarlı', NULL, 'Diğer Ürün ve Hizmetler', 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 19, 'baca'),
  ('Kondenser', 'Yakıt tasarrufu sağlayan kondenser sistemleri', NULL, 'Diğer Ürün ve Hizmetler', 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 20, 'kondenser'),
  ('Ekonomizer', 'Endüstriyel enerji verimliliği çözümleri', NULL, 'Diğer Ürün ve Hizmetler', 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 21, 'ekonomizer'),
  ('Kazan Otomasyon Sistemi', 'Verimlilik ve enerji tasarrufu sağlayan kontrol sistemleri', NULL, 'Diğer Ürün ve Hizmetler', 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 22, 'kazan-otomasyon-sistemi'),
  ('Kazan Kontrol Panosu', 'Kullanıcı dostu kazan kontrol panoları', NULL, 'Diğer Ürün ve Hizmetler', 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 23, 'kazan-kontrol-panosu'),
  ('Yedek Parça', 'Ömür boyu yedek parça desteği', NULL, 'Diğer Ürün ve Hizmetler', 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 24, 'yedek-parca')
) AS v (name, type, capacity, category, category_id, category_title, detail, specs, featured, sort_order, slug)
WHERE NOT EXISTS (
  SELECT 1 FROM public.products p WHERE p.name = v.name
);
