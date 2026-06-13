-- Ürün verilerini products tablosuna ekle
-- Tablo yoksa oluştur
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  capacity TEXT,
  category_id TEXT NOT NULL,
  category_title TEXT NOT NULL,
  detail TEXT,
  specs JSONB,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Mevcut verileri temizle (tekrar çalıştırılabilirlik için)
TRUNCATE TABLE public.products;

-- Sıcak Su Kazanları
INSERT INTO public.products (name, type, capacity, category_id, category_title, detail, specs, featured, sort_order) VALUES
('Oniks Serisi', 'Katı Yakıtlı Sıcak Su Kazanı', '3.000.000 – 6.000.000 kcal/h', 'sicak-su', 'Sıcak Su Kazanları', NULL, NULL, false, 1),
('Obsidyen Serisi', 'Multi Yakıtlı Sıcak Su Kazanı', '1.750.000 – 6.000.000 kcal/h', 'sicak-su', 'Sıcak Su Kazanları', 'Katı, sıvı, gaz ve biomass yakıtla çalışabilen tam otomatik kontrol sistemi. Hareketli ızgaralar sayesinde yakıtı kül formuna kadar tamamen yakar.', '{"yakit": "Doğalgaz/Fuel-Oil/Kömür/Pelet/Prina", "basinc": "3 barG", "standart": "TS EN 497 / TS EN 12953"}', true, 2),
('Akuamarin Serisi', 'Sıvı/Gaz Yakıtlı Sıcak Su Kazanı', '75 kW – 20.000 kW', 'sicak-su', 'Sıcak Su Kazanları', NULL, NULL, true, 3),
('Ametist Serisi', 'Katı Yakıtlı Sıcak Su Kazanı', '500.000 – 5.000.000 kcal/h', 'sicak-su', 'Sıcak Su Kazanları', NULL, NULL, false, 4),
('Turkuaz Serisi', 'Katı Yakıtlı Sıcak Su Kazanı', '300.000 – 1.750.000 kcal/h', 'sicak-su', 'Sıcak Su Kazanları', NULL, NULL, false, 5),
('Kalsedon Serisi', 'Katı Yakıtlı Sıcak Su Kazanı (Çift Külhanlı)', '1.500.000 – 3.500.000 kcal/h', 'sicak-su', 'Sıcak Su Kazanları', '2 ayrı yanma odası sayesinde yarım kapasitede çalışabilen, düşük yakıt tüketimiyle tasarruf sağlayan tasarım. %94''e varan kurum tutma kapasiteli siklon sistemi standarttır.', '{"yakit": "Kömür/Pelet/Prina", "basinc": "3 barG", "standart": "TS EN 497"}', true, 6);

-- Buhar Kazanları
INSERT INTO public.products (name, type, capacity, category_id, category_title, detail, specs, featured, sort_order) VALUES
('Kuvars Serisi (Tek Külhanlı)', 'Katı Yakıtlı Buhar Kazanı', '500 – 5.000 kg/h', 'buhar', 'Buhar Kazanları', NULL, NULL, true, 7),
('Kuvars Serisi (Çift Külhanlı)', 'Katı Yakıtlı Buhar Kazanı', '500 – 5.000 kg/h', 'buhar', 'Buhar Kazanları', NULL, NULL, false, 8),
('Kuvars NG Serisi', 'Sıvı/Gaz Yakıtlı Buhar Kazanı', '500 – 10.000 kg/h', 'buhar', 'Buhar Kazanları', NULL, NULL, false, 9),
('Turmalin Serisi', 'Multi Yakıtlı Buhar Kazanı', '2.000 – 5.000 kg/h', 'buhar', 'Buhar Kazanları', NULL, NULL, true, 10);

-- Sıcak Hava Kazanları
INSERT INTO public.products (name, type, capacity, category_id, category_title, detail, specs, featured, sort_order) VALUES
('HAS Serisi', 'Katı Yakıtlı Sıcak Hava Kazanı', '75.000 – 200.000 kcal/h', 'sicak-hava', 'Sıcak Hava Kazanları', NULL, NULL, false, 11),
('HAS NG Serisi', 'Sıvı/Gaz Yakıtlı Sıcak Hava Kazanı', '100.000 – 1.000.000 kcal/h', 'sicak-hava', 'Sıcak Hava Kazanları', NULL, NULL, false, 12),
('HAS Turbo Serisi', 'Katı Yakıtlı Sıcak Hava Kazanı', '300.000 – 600.000 kcal/h', 'sicak-hava', 'Sıcak Hava Kazanları', 'Çift pota - çift redüktör - çift körük fanlı tasarım sayesinde düşük talepte yarım kapasite çalışabilir. Bir pota arızalansa diğeri çalışmaya devam eder. %91''e varan termal verim.', '{"yakit": "10-18mm Kömür/Pelet/Prina", "cikisSicakligi": "100°C", "standart": "TS EN 497"}', true, 13);

-- Kızgın Su Kazanları
INSERT INTO public.products (name, type, capacity, category_id, category_title, detail, specs, featured, sort_order) VALUES
('Akuamarin KS Serisi', 'Sıvı/Gaz Yakıtlı Kızgın Su Kazanı', '75 kW – 20.000 kW', 'kizgin-su', 'Kızgın Su Kazanları', NULL, NULL, false, 14),
('Turkuaz KS Serisi', 'Katı Yakıtlı Kızgın Su Kazanı', '300.000 – 1.750.000 kcal/h', 'kizgin-su', 'Kızgın Su Kazanları', NULL, NULL, false, 15);

-- Diğer Ürün ve Hizmetler
INSERT INTO public.products (name, type, capacity, category_id, category_title, detail, specs, featured, sort_order) VALUES
('Kat Kaloriferi', 'Bina İçi Isıtma Çözümü', NULL, 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 16),
('Anahtar Teslim Sera Isıtma Sistemi', 'Proje + Kurulum + Devreye Alma', NULL, 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 17),
('Brülörler', 'Riello, Ecostar, Ecoflam markaları', NULL, 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 18),
('Baca', 'Tek Cidarlı / Çift Cidarlı', NULL, 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 19),
('Kondenser', 'Yakıt tasarrufu sağlayan kondenser sistemleri', NULL, 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 20),
('Ekonomizer', 'Endüstriyel enerji verimliliği çözümleri', NULL, 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 21),
('Kazan Otomasyon Sistemi', 'Verimlilik ve enerji tasarrufu sağlayan kontrol sistemleri', NULL, 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 22),
('Kazan Kontrol Panosu', 'Kullanıcı dostu kazan kontrol panoları', NULL, 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 23),
('Yedek Parça', 'Ömür boyu yedek parça desteği', NULL, 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 24);
