-- ÜRÜN TABLOSU DİL DESTEĞİ

-- 1. Products tablosuna meta sütunları ekle
ALTER TABLE products ADD COLUMN IF NOT EXISTS meta_title VARCHAR(255);
ALTER TABLE products ADD COLUMN IF NOT EXISTS meta_description TEXT;

-- 2. EN ürün meta bilgilerini güncelle
UPDATE products SET
  meta_title = 'Akuamarin Series | Enorpa Energy',
  meta_description = 'Liquid/Gas Fuel Hot Water Boiler. Capacity Range: 75 kW – 20,000 kW. High efficiency and reliable.'
WHERE slug = 'akuamarin-serisi';

UPDATE products SET
  meta_title = 'Akuamarin KS Series | Enorpa Energy',
  meta_description = 'Liquid/Gas Fuel Superheated Water Boiler. Capacity Range: 75 kW – 20,000 kW.'
WHERE slug = 'akuamarin-ks-serisi';

UPDATE products SET
  meta_title = 'Ametist Series | Enorpa Energy',
  meta_description = 'Solid Fuel Hot Water Boiler. Capacity Range: 500,000 – 5,000,000 kcal/h.'
WHERE slug = 'ametist-serisi';

UPDATE products SET
  meta_title = 'HAS Series | Enorpa Energy',
  meta_description = 'Solid Fuel Hot Air Boiler. Capacity Range: 75,000 – 200,000 kcal/h. High efficiency.'
WHERE slug = 'has-serisi';

UPDATE products SET
  meta_title = 'HAS NG Series | Enorpa Energy',
  meta_description = 'Liquid/Gas Fuel Hot Air Boiler. Capacity Range: 100,000 – 1,000,000 kcal/h.'
WHERE slug = 'has-ng-serisi';

UPDATE products SET
  meta_title = 'HAS Turbo Series | Enorpa Energy',
  meta_description = 'Solid Fuel Hot Air Boiler. Capacity Range: 300,000 – 600,000 kcal/h. Up to 91% thermal efficiency.'
WHERE slug = 'has-turbo-serisi';

UPDATE products SET
  meta_title = 'Kalsedon Series | Enorpa Energy',
  meta_description = 'Solid Fuel Hot Water Boiler (Double Combustion Chamber). Capacity Range: 1,500,000 – 3,500,000 kcal/h.'
WHERE slug = 'kalsedon-serisi';

UPDATE products SET
  meta_title = 'Kuvars Series (Single) | Enorpa Energy',
  meta_description = 'Solid Fuel Steam Boiler. Capacity Range: 500 – 5,000 kg/h.'
WHERE slug = 'kuvars-serisi-tek-kulhanli';

UPDATE products SET
  meta_title = 'Kuvars Series (Double) | Enorpa Energy',
  meta_description = 'Solid Fuel Steam Boiler. Capacity Range: 500 – 5,000 kg/h.'
WHERE slug = 'kuvars-serisi-cift-kulhanli';

UPDATE products SET
  meta_title = 'Kuvars NG Series | Enorpa Energy',
  meta_description = 'Liquid/Gas Fuel Steam Boiler. Capacity Range: 500 – 10,000 kg/h.'
WHERE slug = 'kuvars-ng-serisi';

UPDATE products SET
  meta_title = 'Turmalin Series | Enorpa Energy',
  meta_description = 'Multi Fuel Steam Boiler. Capacity Range: 2,000 – 5,000 kg/h. High efficiency and automation.'
WHERE slug = 'turmalin-serisi';

UPDATE products SET
  meta_title = 'Obsidyen Series | Enorpa Energy',
  meta_description = 'Multi Fuel Hot Water Boiler. Capacity Range: 1,750,000 – 6,000,000 kcal/h.'
WHERE slug = 'obsidyen-serisi';

UPDATE products SET
  meta_title = 'Oniks Series | Enorpa Energy',
  meta_description = 'Solid Fuel Hot Water Boiler. Capacity Range: 3,000,000 – 6,000,000 kcal/h.'
WHERE slug = 'oniks-serisi';

UPDATE products SET
  meta_title = 'Turkuaz Series | Enorpa Energy',
  meta_description = 'Solid Fuel Hot Water Boiler. Capacity Range: 300,000 – 1,750,000 kcal/h.'
WHERE slug = 'turkuaz-serisi';

UPDATE products SET
  meta_title = 'Turkuaz KS Series | Enorpa Energy',
  meta_description = 'Solid Fuel Superheated Water Boiler. Capacity Range: 300,000 – 1,750,000 kcal/h.'
WHERE slug = 'turkuaz-ks-serisi';

UPDATE products SET
  meta_title = 'Jasper Series | Enorpa Energy',
  meta_description = 'Liquid/Gas Fuel Steam Generator. Capacity Range: 349 kW – 2,093 kW. Up to 96% dry steam.'
WHERE slug = 'jasper-serisi';

UPDATE products SET
  meta_title = 'Condenser | Enorpa Energy',
  meta_description = 'Fuel saving condenser systems for industrial boilers. 5-15% efficiency improvement.'
WHERE slug = 'kondenser';

UPDATE products SET
  meta_title = 'Economizer | Enorpa Energy',
  meta_description = 'Innovative solutions for industrial energy efficiency. Flue gas heat recovery.'
WHERE slug = 'ekonomizer';

UPDATE products SET
  meta_title = 'Boiler Automation System | Enorpa Energy',
  meta_description = 'Advanced control systems providing efficiency and energy savings.'
WHERE slug = 'kazan-otomasyon-sistemi';

UPDATE products SET
  meta_title = 'Boiler Control Panel | Enorpa Energy',
  meta_description = 'User-friendly boiler control panels with digital interface.'
WHERE slug = 'kazan-kontrol-panosu';

UPDATE products SET
  meta_title = 'Spare Parts | Enorpa Energy',
  meta_description = 'Lifetime spare parts support for all Enorpa products.'
WHERE slug = 'yedek-parca';

UPDATE products SET
  meta_title = 'Burners | Enorpa Energy',
  meta_description = 'Riello, Ecostar, Ecoflam burner brands. High quality and reliable.'
WHERE slug = 'brulorler';

UPDATE products SET
  meta_title = 'Chimney | Enorpa Energy',
  meta_description = 'Single wall and double wall chimney systems.'
WHERE slug = 'baca';

UPDATE products SET
  meta_title = 'Central Heating | Enorpa Energy',
  meta_description = 'Building heating solutions with high efficiency.'
WHERE slug = 'kat-kaloriferi';

UPDATE products SET
  meta_title = 'Turnkey Greenhouse Heating | Enorpa Energy',
  meta_description = 'Complete project, installation, and commissioning service.'
WHERE slug = 'anahtar-teslim-sera-isitma-sistemi';
