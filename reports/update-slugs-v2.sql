-- Slug güncellemesi (sadece eksik veya boş olanlar için)
UPDATE products SET slug = 'akuamarin-serisi' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Akuamarin Serisi%';
UPDATE products SET slug = 'akuamarin-ks-serisi' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Akuamarin KS%';
UPDATE products SET slug = 'ametist-serisi' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Ametist%';
UPDATE products SET slug = 'anahtar-teslim-sera-isitma-sistemi' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Anahtar Teslim%';
UPDATE products SET slug = 'baca' WHERE slug IS NULL OR slug = '' AND category = 'diger' AND name ILIKE '%Baca%';
UPDATE products SET slug = 'brulorler' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Brülör%';
UPDATE products SET slug = 'ekonomizer' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Ekonomizer%';
UPDATE products SET slug = 'has-ng-serisi' WHERE slug IS NULL OR slug = '' AND name ILIKE '%HAS NG%';
UPDATE products SET slug = 'has-serisi' WHERE slug IS NULL OR slug = '' AND name ILIKE '%HAS Serisi%' AND category = 'sicak-hava' AND name NOT LIKE '%NG%' AND name NOT LIKE '%Turbo%';
UPDATE products SET slug = 'has-turbo-serisi' WHERE slug IS NULL OR slug = '' AND name ILIKE '%HAS Turbo%';
UPDATE products SET slug = 'jasper-serisi' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Jasper%';
UPDATE products SET slug = 'kalsedon-serisi' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Kalsedon%';
UPDATE products SET slug = 'kat-kaloriferi' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Kat Kaloriferi%';
UPDATE products SET slug = 'kazan-kontrol-panosu' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Kontrol Panosu%';
UPDATE products SET slug = 'kazan-otomasyon-sistemi' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Otomasyon%';
UPDATE products SET slug = 'kondenser' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Kondenser%';
UPDATE products SET slug = 'kuvars-ng-serisi' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Kuvars NG%';
UPDATE products SET slug = 'kuvars-serisi-cift-kulhanli' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Çift Külhanlı%';
UPDATE products SET slug = 'kuvars-serisi-tek-kulhanli' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Tek Külhanlı%';
UPDATE products SET slug = 'obsidyen-serisi' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Obsidyen%';
UPDATE products SET slug = 'oniks-serisi' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Oniks%';
UPDATE products SET slug = 'turkuaz-ks-serisi' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Turkuaz KS%';
UPDATE products SET slug = 'turkuaz-serisi' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Turkuaz Serisi%';
UPDATE products SET slug = 'turmalin-serisi' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Turmalin%';
UPDATE products SET slug = 'yedek-parca' WHERE slug IS NULL OR slug = '' AND name ILIKE '%Yedek Parça%';

-- Doğrulama
SELECT name, slug, category FROM products WHERE slug IS NULL OR slug = '';
