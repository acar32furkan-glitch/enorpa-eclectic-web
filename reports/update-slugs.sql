-- Slug düzeltmesi: TÜM ürünler için slug'ları güncelle
-- Bu SQL'den önce products tablosunda slug sütunu olmalı ve doldurulmuş olmalı.

-- Slug'ları Ürün ismine göre güncelle
UPDATE products SET slug = 'akuamarin-serisi' WHERE name ILIKE '%Akuamarin%';
UPDATE products SET slug = 'akuamarin-ks-serisi' WHERE name ILIKE '%Akuamarin KS%';
UPDATE products SET slug = 'ametist-serisi' WHERE name ILIKE '%Ametist%';
UPDATE products SET slug = 'anahtar-teslim-sera-isitma-sistemi' WHERE name ILIKE '%Anahtar Teslim%';
UPDATE products SET slug = 'baca' WHERE name ILIKE '%Baca%' AND category = 'diger';
UPDATE products SET slug = 'brulorler' WHERE name ILIKE '%Brülör%';
UPDATE products SET slug = 'ekonomizer' WHERE name ILIKE '%Ekonomizer%';
UPDATE products SET slug = 'has-ng-serisi' WHERE name ILIKE '%HAS NG%';
UPDATE products SET slug = 'has-serisi' WHERE name ILIKE '%HAS Serisi%' AND category = 'sicak-hava' AND name NOT LIKE '%NG%' AND name NOT LIKE '%Turbo%';
UPDATE products SET slug = 'has-turbo-serisi' WHERE name ILIKE '%HAS Turbo%';
UPDATE products SET slug = 'jasper-serisi' WHERE name ILIKE '%Jasper%';
UPDATE products SET slug = 'kalsedon-serisi' WHERE name ILIKE '%Kalsedon%';
UPDATE products SET slug = 'kat-kaloriferi' WHERE name ILIKE '%Kat Kaloriferi%';
UPDATE products SET slug = 'kazan-kontrol-panosu' WHERE name ILIKE '%Kontrol Panosu%';
UPDATE products SET slug = 'kazan-otomasyon-sistemi' WHERE name ILIKE '%Otomasyon%';
UPDATE products SET slug = 'kondenser' WHERE name ILIKE '%Kondenser%';
UPDATE products SET slug = 'kuvars-ng-serisi' WHERE name ILIKE '%Kuvars NG%';
UPDATE products SET slug = 'kuvars-serisi-cift-kulhanli' WHERE name ILIKE '%Çift Külhanlı%';
UPDATE products SET slug = 'kuvars-serisi-tek-kulhanli' WHERE name ILIKE '%Tek Külhanlı%';
UPDATE products SET slug = 'obsidyen-serisi' WHERE name ILIKE '%Obsidyen%';
UPDATE products SET slug = 'oniks-serisi' WHERE name ILIKE '%Oniks%';
UPDATE products SET slug = 'turkuaz-ks-serisi' WHERE name ILIKE '%Turkuaz KS%';
UPDATE products SET slug = 'turkuaz-serisi' WHERE name ILIKE '%Turkuaz Serisi%';
UPDATE products SET slug = 'turmalin-serisi' WHERE name ILIKE '%Turmalin%';
UPDATE products SET slug = 'yedek-parca' WHERE name ILIKE '%Yedek Parça%';

-- Doğrulama: Slug'ları listele
SELECT name, slug, category FROM products ORDER BY category, sort_order;
