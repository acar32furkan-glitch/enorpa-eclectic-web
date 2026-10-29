-- ============================================================================
-- Görsel yolları + eksik proje kayıtları
--
-- Ürün görselleri artık yerel varlıklardan geliyor (public/img/products).
-- Böylece veritabanı kaydı da panelde ve JSON-LD'de geçerli bir görsel URL'si
-- taşır; harici bir depolama alanına ihtiyaç kalmaz.
-- ============================================================================

WITH ordered AS (
  SELECT
    id,
    category_id,
    row_number() OVER (PARTITION BY category_id ORDER BY sort_order) - 1 AS idx
  FROM public.products
  WHERE image_url IS NULL
    AND category_id IN ('sicak-su', 'buhar', 'sicak-hava', 'kizgin-su', 'diger')
)
UPDATE public.products p
SET image_url = '/img/products/' || o.category_id || CASE WHEN o.idx % 2 = 0 THEN '-a.svg' ELSE '-b.svg' END
FROM ordered o
WHERE p.id = o.id;

-- ------------------------------------------------------------------ projeler
INSERT INTO public.projects (slug, title, subtitle, description, featured_image_url, year, language)
VALUES
  ('turkiye-isparta', 'Türkiye / Isparta', 'Orman Ürünlerinin Kurutulması',
   'Isparta''da orman ürünleri kurutma sistemi kurulumu. Enerji verimliliği odaklı tasarım.',
   '/img/projects/isparta.svg', '2022', 'tr'),
  ('kazakistan-almaty', 'Kazakistan / Almaty', 'Sera Isıtma Tesisatı Kurulumu',
   'Almaty''da sera ısıtma tesisatı kurulumu. Sert kış koşullarına uygun yüksek kapasiteli kazan seçimi.',
   '/img/projects/almaty.svg', '2022', 'tr'),
  ('ozbekistan-taskent', 'Uzbekistan / Tashkent', 'Greenhouse Heating Installation',
   'Greenhouse heating installation in Tashkent, equipped with Enorpa HAS Series boilers.',
   '/img/projects/taskent.svg', '2020', 'en'),
  ('ozbekistan-harezm', 'Uzbekistan / Khorezm', 'Greenhouse Heating Installation',
   'Greenhouse heating installation in Khorezm, custom designed for hot climate conditions.',
   '/img/projects/harezm.svg', '2020', 'en'),
  ('turkiye-manisa', 'Turkey / Manisa', 'Steam Boiler Installation',
   'Steam boiler engineered, installed and commissioned for an industrial facility in Manisa.',
   '/img/projects/manisa.svg', '2019', 'en'),
  ('turkiye-izmir', 'Turkey / Izmir', 'Greenhouse Heating Installation',
   'Greenhouse heating installation in Izmir with low fuel consumption solutions.',
   '/img/projects/izmir.svg', '2021', 'en'),
  ('ozbekistan-taskent', 'Узбекистан / Ташкент', 'Монтаж системы отопления теплиц',
   'Монтаж отопления теплиц в Ташкенте на котлах серии HAS компании Enorpa.',
   '/img/projects/taskent.svg', '2020', 'ru'),
  ('ozbekistan-harezm', 'Узбекистан / Хорезм', 'Монтаж системы отопления теплиц',
   'Монтаж отопления теплиц в Хорезме. Индивидуальный проект для жаркого климата.',
   '/img/projects/harezm.svg', '2020', 'ru'),
  ('turkiye-manisa', 'Турция / Маниса', 'Монтаж парового котла',
   'Проектирование, монтаж и пуск парового котла для промышленного предприятия в Манисе.',
   '/img/projects/manisa.svg', '2019', 'ru'),
  ('turkiye-izmir', 'Турция / Измир', 'Монтаж системы отопления теплиц',
   'Монтаж отопления теплиц в Измире с решениями низкого расхода топлива.',
   '/img/projects/izmir.svg', '2021', 'ru')
ON CONFLICT (slug, language) DO NOTHING;
