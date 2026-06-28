-- PROJELER TABLOSU VE VERİLERİ
-- 1. Oluştur

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  customer VARCHAR(255),
  description TEXT,
  project_type VARCHAR(255),
  location VARCHAR(255),
  year VARCHAR(50),
  featured_image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Verileri ekle

INSERT INTO projects (slug, title, subtitle, description, project_type, location, year) VALUES
('ozbekistan-taskent', 'Özbekistan/Taşkent', 'Sera Isıtma Tesisatı Kurulumu',
'Enorpa Enerji olarak, sürdürülebilir tarımın ve verimli enerji kullanımının önemini her zaman benimsemekteyiz. 9600 m²''lik sera için geliştirdiğimiz özel tasarım ısıtma sistemleri, hem enerji verimliliği sağlayarak işletme maliyetlerini düşürüyor hem de ideal büyüme koşulları yaratıyor. Müşterimizin ihtiyaçlarına özel olarak uyarlanan bu çözümler, her mevsimde istikrarlı bir sıcaklık ve nem seviyesi sağlayarak bitki yetiştiriciliğinde maksimum verimlilik sunuyor. Enorpa''nın uzman mühendisleri ve teknik ekibi, her adımda müşteri memnuniyetini ve çevresel sürdürülebilirliği ön planda tutarak projeyi baştan sona yönetiyor.',
'Sera Isıtma Tesisatı ve Kurulumu', 'Özbekistan, Taşkent', '2020'),

('ozbekistan-harezm', 'Özbekistan/Harezm', 'Sera Isıtma Tesisatı Kurulumu',
'Enorpa Enerji olarak, tarımsal üretimde en zorlu koşullarda bile güvenilirlik ve verimliliği bir arada sunuyoruz. Müşterimizin serasındaki ısıtma sorunlarını çözmek adına katı yakıtlı çift külhanlı kalsedon kazanlarımızla özel çözümler sunuyoruz. 110.000 m²''lik sera için geliştirdiğimiz özel tasarım ısıtma sistemleri, hem enerji verimliliği sağlayarak işletme maliyetlerini düşürüyor hem de ideal büyüme koşulları yaratıyor.',
'Sera Isıtma Tesisatı ve Kurulumu', 'Özbekistan, Harezm', '2020'),

('turkiye-manisa', 'Türkiye/Manisa', 'Buhar Kazanı Kurulumu',
'Enorpa Enerji olarak, sanayinin günlük ihtiyaçlarını karşılamak için ileri teknolojiyle donatılmış çözümler sunuyoruz. Müşterimizin buhar ihtiyacını karşılamak üzere hayata geçirdiğimiz Kuvars model buhar kazanı projesi, yenilik ve verimliliğin mükemmel bir sentezi olarak öne çıkıyor. Bu proje, titiz mühendislik becerisi ve özgün tasarım anlayışıyla şekillenen bir başarı öyküsüdür.',
'Buhar Kazanı Tesisatı ve Kurulumu', 'Türkiye, Manisa', '2019'),

('turkiye-izmir', 'Türkiye/İzmir', 'Sera Isıtma Tesisatı Kurulumu',
'Enorpa Enerji olarak, İzmir''de sera ısıtma tesisatı kurulumu gerçekleştirdik. Seracılık sektörüne özel olarak tasarlanan ve enerji verimiliği odaklı ısıtma sistemleri müşterimize sunuldu. Kurulum sonrası düzenli bakım ve teknik destek hizmetimiz sürekli devam etmektedir.',
'Sera Isıtma Tesisatı ve Kurulumu', 'Türkiye, İzmir', '2021'),

('turkiye-isparta', 'Türkiye/Isparta', 'Orman Ürünlerinin Kurutulması',
'Enorpa Enerji olarak, orman ürünlerinin kurutulması işi yapan değerli müşterimiz için gerçekleştirdiğimiz Turkuaz Model kızgın su kazanı kurulumu projesi, yenilik ve performansın simgesi olarak öne çıkıyor. Bu özel proje, müşterimizin talepleri doğrultusunda özelleştirilmiş ve mühendislik uzmanlığımızın bir ürünüdür.',
'Orman Ürünlerinin Kurutulması', 'Türkiye, Isparta', '2022');
