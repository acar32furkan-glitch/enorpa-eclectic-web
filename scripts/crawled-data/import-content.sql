-- ENORPA CRAWLED CONTENT IMPORT
-- Generated: 2026-06-28T22:00:23.486Z

-- PRODUCT META DATA UPDATE
UPDATE products SET meta_title = 'Akuamarin KS Serisi', meta_description = 'Akuamarin Ks Serisi - Kızgın Su Kazanı yanma odasındaki ızgaraların hareketi ve yüksek verimli kademeli yapısı, yakıtın tamamını yakarak kül formuna dönüştürür.', updated_at = NOW() WHERE slug = 'akuamarin-ks-serisi';

-- PROJECTS IMPORT
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    project_type VARCHAR(255),
    location VARCHAR(255),
    year VARCHAR(50),
    language VARCHAR(10) DEFAULT 'tr',
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );

INSERT INTO projects (slug, title, subtitle, description, project_type, location, year, meta_title, language)
VALUES (
  'ozbekistan-taskent',
  'Özbekistan/Taşkent',
  'Özbekistan/Taşkent',
  'Özbekistan/Taşkent - Enorpa Isıtma Sistemleri ve Buhar Kazanları 
 
 
 
 
 
 
 Skip to main content 
 
 Hit enter to search or ESC to close Close Search 
 				 Özbekistan/Taşkent Neler yapıldı? Enorpa Enerji olarak, sürdürülebilir tarımın ve verimli enerji kullanımının önemini her zaman benimsemekteyiz. Son teknolojiyle donatılmış ısıtma sistemleri ve kazanlarımızla, müşterilerimize yenilikçi çözümler sunuyoruz. 9600 m² lik sera için geliştirdiğimiz özel tasarım ısıtma sistemleri, hem enerji ver',
  'project',
  '',
  '',
  'Özbekistan/Taşkent',
  'tr'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  meta_title = EXCLUDED.meta_title;

INSERT INTO projects (slug, title, subtitle, description, project_type, location, year, meta_title, language)
VALUES (
  'ozbekistan-harezm',
  'Özbekistan/Harezm',
  'Özbekistan/Harezm',
  'Özbekistan/Harezm - Enorpa Isıtma Sistemleri ve Buhar Kazanları 
 
 
 
 
 
 
 Skip to main content 
 
 Hit enter to search or ESC to close Close Search 
 				 Özbekistan/Harezm Neler yapıldı? Enorpa Enerji olarak, tarımsal üretimde en zorlu koşullarda bile güvenilirlik ve verimliliği bir arada sunuyoruz. Müşterimizin serasındaki ısıtma sorunlarını çözmek adına katı yakıtlı çift külhanlı kalsedon kazanlarımızla özel çözümler sunuyoruz. 110.000 m²’lik sera için geliştirdiğimiz özel tasarım ısıtma ',
  'project',
  '',
  '',
  'Özbekistan/Harezm',
  'tr'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  meta_title = EXCLUDED.meta_title;

INSERT INTO projects (slug, title, subtitle, description, project_type, location, year, meta_title, language)
VALUES (
  'turkiye-manisa',
  'Turkey/Manisa',
  'Turkey/Manisa',
  'Turkey/Manisa - Enorpa Heating Systems and Steam Boilers 
 
 
 
 
 
 
 Skip to main content 
 
 Hit enter to search or ESC to close Close Search 
 				 Turkey/Manisa What was done? Enorpa Energy we offer solutions equipped with advanced technology to meet the daily needs of industry. The Kuvars model steam boiler project, which we realized to meet the steam needs of our customer, stands out as a perfect synthesis of innovation and efficiency. This project is a success story shaped by meticulous ',
  'project',
  '',
  '',
  'Turkey/Manisa',
  'tr'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  meta_title = EXCLUDED.meta_title;

INSERT INTO projects (slug, title, subtitle, description, project_type, location, year, meta_title, language)
VALUES (
  'turkiye-izmir',
  'Turkey/Izmir',
  'Turkey/Izmir',
  'Turkey/Izmir - Enorpa Heating Systems and Steam Boilers 
 
 
 
 
 
 
 Skip to main content 
 
 Hit enter to search or ESC to close Close Search 
 				 Turkey/Izmir What was done? Enorpa Energy In this project, we offered a solution specifically for the needs of our customer s greenhouse operation. The Turkuaz Model boiler and heat center contributes to the creation of optimum conditions for plant cultivation by providing a stable temperature and humidity level in our customer s greenhouse enviro',
  'project',
  '',
  '',
  'Turkey/Izmir',
  'tr'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  meta_title = EXCLUDED.meta_title;

INSERT INTO projects (slug, title, subtitle, description, project_type, location, year, meta_title, language)
VALUES (
  'turkiye-isparta',
  'Turkey/Isparta',
  'Turkey/Isparta',
  'Turkey/Isparta - Enorpa Heating Systems and Steam Boilers 
 
 
 
 
 
 
 Skip to main content 
 
 Hit enter to search or ESC to close Close Search 
 				 Turkey/Isparta What was done? Enorpa Energy we offer pioneering solutions to meet the energy needs of industrial sectors. The Turquoise Model hot water boiler installation project we realized for our valued customer engaged in the drying of forest products stands out as a symbol of innovation and performance. This special project was customized ',
  'project',
  '',
  '',
  'Turkey/Isparta',
  'tr'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  meta_title = EXCLUDED.meta_title;


-- BLOG META DATA UPDATE
UPDATE blog_posts SET meta_title = '- HAS SERİSİ Sıcak Hava Kazanları Enorpa Isıtma Sistemleri ve Buhar Kazanları', meta_description = 'Enorpa Has Serisi sıcak hava kazanları; kompakt tasarımı, yüksek verimli fan sistemi ve kaset tipi yapısıyla endüstriyel alanlarda homojen ve güçlü ısıtma sağlar.', language = 'tr' WHERE slug = 'has-serisi-sicak-hava-kazanlari';
UPDATE blog_posts SET meta_title = 'Turmalin Serisi Buhar Kazanı: Endüstriyel Isıtmanın Yeni Yüzü', meta_description = 'Endüstriyel üretim süreçlerinde buhar, en kritik enerji kaynaklarından biridir. Bu ihtiyaca hem güvenli hem de verimli bir çözüm sunmak üzere geliştirilen Enorpa Turmalin Serisi Buhar Kazanları, yüksek standartları ve otomasyon destekli yapısıyla öne çıkıyor. Turmalin Serisi’nin tasarımında, karbonmonoksit salınımını en aza indiren çevreci bir yaklaşım benimsenmiştir. Üretim süreçleri; TS 12953, ASME BPVC, AD2000, EN 12953', language = 'tr' WHERE slug = 'turmalin-serisi-buhar-kazani-endustriyel-isitmanin-yeni-yuzu';
UPDATE blog_posts SET meta_title = 'Kondenser Nedir? Çalışma Prensibi, Verim ve Uygulamalar', meta_description = 'Enorpa Kondenser baca gazındaki atık ısıyı geri kazanarak yakıtı azaltır, verimliliği artırır ve karbon ayak izini küçültür. Projelendirme için iletişime geçin.', language = 'tr' WHERE slug = 'kondenser-nedir-calisma-prensibi-verim-ve-uygulamalar-2';
UPDATE blog_posts SET meta_title = 'Agroworld 2020, Taşkent/Özbekistan (11', meta_description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae dui et nunc ornare vulputate non fringilla massa.', language = 'tr' WHERE slug = 'agroworld-ozbekistan';
UPDATE blog_posts SET meta_title = 'Enorpa, GreenTech Amsterdam 2025’te!', meta_description = 'Tesis Yönetiminde Devrim: Yapay Zeka Destekli Kazan Otomasyonu Tesisinizin kalbi olan kazanların verimliliğini ve güvenliğini bir üst seviyeye taşımaya hazır mısınız? Enorpa olarak, dünyanın dört bir yanında yıllar içinde kurduğumuz kazan dairelerinden elde ettiğimiz küresel veri setlerini kullanarak geliştirdiğimiz, yapay zeka ve network destekli ileri düzey otomasyon sistemimizi sunuyoruz. Bu sistem sayesinde kazanlarınızın yanma performansı', language = 'tr' WHERE slug = 'enorpa-at-greentech-amsterdam-2025';
