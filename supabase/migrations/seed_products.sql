-- Mevcut tabloyu seed_products.sql ile uyumlu hale getir
-- Önce eksik kolonları ekle
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category_id TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category_title TEXT;

-- Mevcut verileri temizle (tekrar çalıştırılabilirlik için)
TRUNCATE TABLE public.products;

-- Sıcak Su Kazanları
INSERT INTO public.products (name, type, capacity, category, category_id, category_title, detail, specs, featured, sort_order) VALUES
('Oniks Serisi', 'Katı Yakıtlı Sıcak Su Kazanı', '3.000.000 – 6.000.000 kcal/h', 'Sıcak Su Kazanları', 'sicak-su', 'Sıcak Su Kazanları', NULL, NULL, false, 1),
('Obsidyen Serisi', 'Multi Yakıtlı Sıcak Su Kazanı', '1.750.000 – 6.000.000 kcal/h', 'Sıcak Su Kazanları', 'sicak-su', 'Sıcak Su Kazanları', 'Katı, sıvı, gaz ve biomass yakıtla çalışabilen tam otomatik kontrol sistemi. Hareketli ızgaralar sayesinde yakıtı kül formuna kadar tamamen yakar.', '{"yakit": "Doğalgaz/Fuel-Oil/Kömür/Pelet/Prina", "basinc": "3 barG", "standart": "TS EN 497 / TS EN 12953"}', true, 2),
('Akuamarin Serisi', 'Sıvı/Gaz Yakıtlı Sıcak Su Kazanı', '75 kW – 20.000 kW', 'Sıcak Su Kazanları', 'sicak-su', 'Sıcak Su Kazanları', NULL, NULL, true, 3),
('Ametist Serisi', 'Katı Yakıtlı Sıcak Su Kazanı', '500.000 – 5.000.000 kcal/h', 'Sıcak Su Kazanları', 'sicak-su', 'Sıcak Su Kazanları', NULL, NULL, false, 4),
('Turkuaz Serisi', 'Katı Yakıtlı Sıcak Su Kazanı', '300.000 – 1.750.000 kcal/h', 'Sıcak Su Kazanları', 'sicak-su', 'Sıcak Su Kazanları', NULL, NULL, false, 5),
('Kalsedon Serisi', 'Katı Yakıtlı Sıcak Su Kazanı (Çift Külhanlı)', '1.500.000 – 3.500.000 kcal/h', 'Sıcak Su Kazanları', 'sicak-su', 'Sıcak Su Kazanları', '2 ayrı yanma odası sayesinde yarım kapasitede çalışabilen, düşük yakıt tüketimiyle tasarruf sağlayan tasarım. %94''e varan kurum tutma kapasiteli siklon sistemi standarttır.', '{"yakit": "Kömür/Pelet/Prina", "basinc": "3 barG", "standart": "TS EN 497"}', true, 6);

-- Buhar Kazanları
INSERT INTO public.products (name, type, capacity, category, category_id, category_title, detail, specs, featured, sort_order) VALUES
('Kuvars Serisi (Tek Külhanlı)', 'Katı Yakıtlı Buhar Kazanı', '500 – 5.000 kg/h', 'Buhar Kazanları', 'buhar', 'Buhar Kazanları', NULL, NULL, true, 7),
('Kuvars Serisi (Çift Külhanlı)', 'Katı Yakıtlı Buhar Kazanı', '500 – 5.000 kg/h', 'Buhar Kazanları', 'buhar', 'Buhar Kazanları', NULL, NULL, false, 8),
('Kuvars NG Serisi', 'Sıvı/Gaz Yakıtlı Buhar Kazanı', '500 – 10.000 kg/h', 'Buhar Kazanları', 'buhar', 'Buhar Kazanları', NULL, NULL, false, 9),
('Turmalin Serisi', 'Multi Yakıtlı Buhar Kazanı', '2.000 – 5.000 kg/h', 'Buhar Kazanları', 'buhar', 'Buhar Kazanları', NULL, NULL, true, 10);

-- Sıcak Hava Kazanları
INSERT INTO public.products (name, type, capacity, category, category_id, category_title, detail, specs, featured, sort_order) VALUES
('HAS Serisi', 'Katı Yakıtlı Sıcak Hava Kazanı', '75.000 – 200.000 kcal/h', 'Sıcak Hava Kazanları', 'sicak-hava', 'Sıcak Hava Kazanları', NULL, NULL, false, 11),
('HAS NG Serisi', 'Sıvı/Gaz Yakıtlı Sıcak Hava Kazanı', '100.000 – 1.000.000 kcal/h', 'Sıcak Hava Kazanları', 'sicak-hava', 'Sıcak Hava Kazanları', NULL, NULL, false, 12),
('HAS Turbo Serisi', 'Katı Yakıtlı Sıcak Hava Kazanı', '300.000 – 600.000 kcal/h', 'Sıcak Hava Kazanları', 'sicak-hava', 'Sıcak Hava Kazanları', 'Çift pota - çift redüktör - çift körük fanlı tasarım sayesinde düşük talepte yarım kapasite çalışabilir. Bir pota arızalansa diğeri çalışmaya devam eder. %91''e varan termal verim.', '{"yakit": "10-18mm Kömür/Pelet/Prina", "cikisSicakligi": "100°C", "standart": "TS EN 497"}', true, 13);

-- Kızgın Su Kazanları
INSERT INTO public.products (name, type, capacity, category, category_id, category_title, detail, specs, featured, sort_order) VALUES
('Akuamarin KS Serisi', 'Sıvı/Gaz Yakıtlı Kızgın Su Kazanı', '75 kW – 20.000 kW', 'Kızgın Su Kazanları', 'kizgin-su', 'Kızgın Su Kazanları', NULL, NULL, false, 14),
('Turkuaz KS Serisi', 'Katı Yakıtlı Kızgın Su Kazanı', '300.000 – 1.750.000 kcal/h', 'Kızgın Su Kazanları', 'kizgin-su', 'Kızgın Su Kazanları', NULL, NULL, false, 15);

-- Diğer Ürün ve Hizmetler
INSERT INTO public.products (name, type, capacity, category, category_id, category_title, detail, specs, featured, sort_order) VALUES
('Kat Kaloriferi', 'Bina İçi Isıtma Çözümü', NULL, 'Diğer Ürün ve Hizmetler', 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 16),
('Anahtar Teslim Sera Isıtma Sistemi', 'Proje + Kurulum + Devreye Alma', NULL, 'Diğer Ürün ve Hizmetler', 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 17),
('Brülörler', 'Riello, Ecostar, Ecoflam markaları', NULL, 'Diğer Ürün ve Hizmetler', 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 18),
('Baca', 'Tek Cidarlı / Çift Cidarlı', NULL, 'Diğer Ürün ve Hizmetler', 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 19),
('Kondenser', 'Yakıt tasarrufu sağlayan kondenser sistemleri', NULL, 'Diğer Ürün ve Hizmetler', 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 20),
('Ekonomizer', 'Endüstriyel enerji verimliliği çözümleri', NULL, 'Diğer Ürün ve Hizmetler', 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 21),
('Kazan Otomasyon Sistemi', 'Verimlilik ve enerji tasarrufu sağlayan kontrol sistemleri', NULL, 'Diğer Ürün ve Hizmetler', 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 22),
('Kazan Kontrol Panosu', 'Kullanıcı dostu kazan kontrol panoları', NULL, 'Diğer Ürün ve Hizmetler', 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 23),
('Yedek Parça', 'Ömür boyu yedek parça desteği', NULL, 'Diğer Ürün ve Hizmetler', 'diger', 'Diğer Ürün ve Hizmetler', NULL, NULL, false, 24);
