-- DİL DESTEĞİ İÇİN TABLO GÜNCELLEMELERİ

-- 1. Blog posts tablosuna language sütunu ekle
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS language VARCHAR(10) DEFAULT 'tr';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_title VARCHAR(255);
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_description TEXT;

-- 2. Mevcut blog yazılarını TR olarak işaretle
UPDATE blog_posts SET language = 'tr' WHERE language IS NULL;

-- 3. EN blog yazıları ekle (İngilizce)
INSERT INTO blog_posts (slug, title, excerpt, content_html, language, published_at, meta_title, meta_description) VALUES
('why-enorpa', 'Why Enorpa Energy Boilers Are Preferred?',
'Learn why Enorpa boilers are the preferred choice in industrial heating. 25+ years of experience, high efficiency, and reliable service.',
'<h2>Why Choose Enorpa?</h2><p>Enorpa has been a trusted name in industrial heating for over 25 years. Our boilers are designed for maximum efficiency, reliability, and environmental sustainability.</p><p>With 138+ projects in 26 countries and 347+ satisfied customers, we continue to deliver excellence in every project.</p>',
'en', '2024-04-03', 'Why Enorpa Energy Boilers?', 'Learn why Enorpa boilers are preferred in industrial heating.'),

('has-series-hot-air-boilers', 'HAS Series Hot Air Boilers',
'High-efficiency hot air boilers designed for greenhouse heating and industrial applications.',
'<h2>HAS Series</h2><p>Our HAS Series hot air boilers are designed for optimal performance with solid fuel. Capacity range: 75,000 – 200,000 kcal/h.</p>',
'en', '2024-01-15', 'HAS Series Hot Air Boilers', 'High-efficiency hot air boilers for greenhouse heating.'),

('turmalin-series-steam-boiler', 'Turmalin Series Steam Boiler: The New Face of Industrial Heating',
'Multi-fuel steam boilers with high efficiency and advanced automation.',
'<h2>Turmalin Series</h2><p>Turmalin Series steam boilers are designed for high performance with multi-fuel capability. Capacity range: 2,000 – 5,000 kg/h.</p>',
'en', '2025-06-19', 'Turmalin Series Steam Boiler', 'Multi-fuel steam boilers with high efficiency.'),

('what-is-condenser', 'What is a Condenser? How Does it Work?',
'Understanding condenser technology and how it improves energy efficiency in industrial boilers.',
'<h2>What is a Condenser?</h2><p>A condenser is a heat exchanger that recovers waste heat from flue gases. It can improve boiler efficiency by 5-15% depending on the system.</p>',
'en', '2025-08-11', 'What is a Condenser?', 'Understanding condenser technology and energy efficiency.'),

('enorpa-at-greentech-amsterdam-2025', 'Enorpa at GreenTech Amsterdam 2025',
'Visit Enorpa at GreenTech Amsterdam 2025. AI-powered boiler automation and innovative heating solutions.',
'<h2>GreenTech Amsterdam 2025</h2><p>Enorpa will showcase its latest AI-powered boiler automation systems at GreenTech Amsterdam 2025.</p>',
'en', '2025-06-08', 'Enorpa at GreenTech Amsterdam 2025', 'AI-powered boiler automation and innovative solutions.')

ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content_html = EXCLUDED.content_html,
  language = EXCLUDED.language,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description;

-- 4. RU blog yazıları ekle (Rusça)
INSERT INTO blog_posts (slug, title, excerpt, content_html, language, published_at, meta_title, meta_description) VALUES
('why-enorpa-ru', 'Почему котлы Enorpa выбирают?',
'Узнайте, почему котлы Enorpa — предпочтительный выбор при промышленном отоплении. Более 25 лет опыта.',
'<h2>Почему Enorpa?</h2><p>Enorpa — надежное имя в области промышленного отопления уже более 25 лет. Наши котлы разработаны для максимальной эффективности и экологичности.</p>',
'ru', '2024-04-03', 'Почему Enorpa?', 'Почему котлы Enorpa выбирают для промышленного отопления.'),

('has-series-hot-air-boilers-ru', 'Котлы горячего воздуха серии HAS',
'Котлы на твердом топливе для теплиц и промышленного отопления.',
'<h2>Серия HAS</h2><p>Котлы на твердом топливе мощностью от 75,000 до 200,000 ккал/ч.</p>',
'ru', '2024-01-15', 'Котлы серии HAS', 'Котлы на твердом топливе для теплиц.')

ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content_html = EXCLUDED.content_html,
  language = EXCLUDED.language,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description;
