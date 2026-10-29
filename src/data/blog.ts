/**
 * Yerel blog içeriği.
 *
 * Blog yazıları normalde Supabase üzerinden gelir; veritabanına erişilemediğinde
 * (tanıtım/demo ortamı, yeni kurulum) bu içerik devreye girer, böylece blog
 * bölümü hiçbir zaman boş görünmez.
 */

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content_html: string;
  published_at: string;
  featured_image_url?: string;
  language?: string;
};

export const LOCAL_BLOG_POSTS: BlogPost[] = [
  {
    slug: "neden-enorpa",
    title: "Neden Enorpa? 25 Yıllık Üretim Deneyimi",
    excerpt:
      "2000 yılından bu yana buhar, sıcak su ve sıcak hava sistemleri üretiyoruz. Kendi tasarım ofisimiz, kendi üretim hatlarımız ve 26 ülkede devreye aldığımız 138'den fazla proje ile sahada edindiğimiz tecrübeyi kazanı tasarımına aktarıyoruz.",
    published_at: "2026-02-18",
    featured_image_url: "/img/products/kalsedon-serisi.webp",
    content_html: `
      <p><strong>Enorpa Enerji</strong>, endüstriyel ısıtma sistemlerinde üretim, projelendirme ve taahhüt işlerini tek çatı altında yürütür. Sıcak su, sıcak hava, buhar ve kızgın su kazanlarının yanı sıra akaryakıt tankları ve basınçlı kaplar üretiyoruz.</p>
      <h2>Üretimden Projeye Tek Elden</h2>
      <p>Seracılıktan tekstile, gıdadan kimya sektörüne kadar farklı tesislerin ısıtma ve buhar ihtiyacını karşılıyoruz. Her projede önce tesisin gerçek yükünü ölçüyor, ardından yakıt tipine ve çalışma rejimine göre kazan seçimini yapıyoruz. Bu yaklaşım, aynı kapasitede daha düşük yakıt tüketimi anlamına geliyor.</p>
      <h2>Kalite Belgeleri</h2>
      <p>Ürünlerimiz TSE, CE, ASME, EAC ve GOST standartlarına uygun olarak üretilir. Basınçlı kaplar için 2014/68/EU direktifi, buhar kazanları için TS EN 12953 ve TS EN 12952 standartları esas alınır.</p>
      <h3>Bizi Ayıran Detaylar</h3>
      <ul>
        <li>Konstrüksiyon, izolasyon ve sac kalınlıklarında standart üstü güvenlik payı</li>
        <li>Yüksek verimli ısı transfer yüzeyleri ve düşük baca gazı sıcaklığı</li>
        <li>Kazan otomasyonu ve kontrol panosunun kendi üretimimiz olması</li>
        <li>Ömür boyu yedek parça ve saha servisi desteği</li>
      </ul>
      <h2>Saha Tecrübesi Tasarıma Yansıyor</h2>
      <p>26 ülkede devreye aldığımız projelerde karşılaştığımız saha problemleri, yeni nesil kazanlarımızın tasarımına doğrudan girdi oluyor. Bakım erişimi kolay kapaklar, sökülebilir türbülatörler ve servis ekibinin sahada hızlı müdahale edebileceği bir yerleşim planı bunun somut örnekleri.</p>
      <p>Tesisiniz için doğru kapasiteyi birlikte belirlemek üzere ücretsiz keşif ve kapasite hesaplaması yapabiliriz.</p>
    `,
  },
  {
    slug: "has-serisi-sicak-hava-kazanlari",
    title: "HAS Serisi Sıcak Hava Kazanları: Seralarda Verimli Isıtma",
    excerpt:
      "HAS serisi katı yakıtlı sıcak hava kazanları, 75.000 – 200.000 kcal/h kapasite aralığında sera ve endüstriyel mahal ısıtması için tasarlandı. Doğrudan sıcak hava üretimi, ısı kaybını azaltıyor.",
    published_at: "2026-01-24",
    featured_image_url: "/img/products/has-serisi.webp",
    content_html: `
      <p>Sera ısıtmasında en kritik iki başlık homojen sıcaklık dağılımı ve yakıt maliyetidir. <strong>HAS Serisi</strong> sıcak hava kazanları, su yerine doğrudan sıcak hava üreterek bu iki başlıkta avantaj sağlar.</p>
      <h2>Çalışma Prensibi</h2>
      <p>Yanma odasında oluşan ısı, çok geçişli ısı değiştirici yüzeylerden geçen havaya aktarılır. Isıtılan hava kanal veya fan yardımıyla seraya dağıtılır. Su devresi, pompa ve radyatör olmadığı için ısı kaybı ve ilk yatırım maliyeti düşer.</p>
      <h3>Teknik Aralık</h3>
      <ul>
        <li><strong>HAS Serisi:</strong> 75.000 – 200.000 kcal/h, katı yakıt</li>
        <li><strong>HAS NG Serisi:</strong> 100.000 – 1.000.000 kcal/h, sıvı/gaz yakıt</li>
        <li><strong>HAS Turbo Serisi:</strong> 300.000 – 600.000 kcal/h, çift pota – çift redüktör</li>
      </ul>
      <h2>HAS Turbo: Yedekli Çalışma</h2>
      <p>Çift pota ve çift fan yapısı sayesinde düşük talepte yarım kapasite ile çalışılabilir. Bir potada arıza oluştuğunda diğeri çalışmaya devam eder; bu da özellikle kış aylarında don riskini ortadan kaldırır. Termal verim %91 seviyesine kadar çıkar.</p>
      <h2>Doğru Kapasite Seçimi</h2>
      <p>Sera ısıtmasında kapasite; cam yüzey alanı, bölge iklimi, rüzgâr yükü ve istenen iç sıcaklığa göre hesaplanır. Eksik kapasite soğuk gecelerde ürün kaybına, fazla kapasite ise gereksiz yakıt tüketimine yol açar. Kapasite hesaplayıcımız ile tesisiniz için ön hesabı hızlıca alabilirsiniz.</p>
    `,
  },
  {
    slug: "turmalin-serisi-buhar-kazani-endustriyel-isitmanin-yeni-yuzu",
    title: "Turmalin Serisi Buhar Kazanı: Çok Yakıtlı Esneklik",
    excerpt:
      "Turmalin serisi, 2.000 – 5.000 kg/h buhar kapasitesinde katı, sıvı ve gaz yakıtla çalışabilen çok yakıtlı bir buhar kazanı. Yakıt fiyatları değiştiğinde üretim durmuyor.",
    published_at: "2025-12-11",
    featured_image_url: "/img/products/turmalin-serisi.webp",
    content_html: `
      <p>Enerji maliyetlerinin dalgalı olduğu dönemlerde tek yakıta bağlı kalmak, üretim sürekliliği açısından risk oluşturur. <strong>Turmalin Serisi</strong> çok yakıtlı buhar kazanı, bu riski ortadan kaldırmak için geliştirildi.</p>
      <h2>Çok Yakıtlı Yapı</h2>
      <p>Kazan; kömür, pelet, prina gibi katı yakıtların yanında sıvı ve gaz yakıtlarla da çalışabilecek şekilde projelendirilir. Brülör ve ızgara grubu, seçilen yakıt kombinasyonuna göre yapılandırılır. Yakıt değişimi sırasında kazan gövdesi ve ısıtma yüzeyleri aynı kalır.</p>
      <h3>Kapasite ve Basınç</h3>
      <ul>
        <li>Buhar kapasitesi: 2.000 – 5.000 kg/h</li>
        <li>Tasarım basıncı: talebe göre 3 – 12 barG</li>
        <li>Standartlar: TS EN 12953, 2014/68/EU</li>
      </ul>
      <h2>Verimlilik Detayları</h2>
      <p>Üç geçişli konstrüksiyon, geniş yanma odası ve türbülatörlü duman boruları ile baca gazı sıcaklığı düşürülür. Ekonomizer ilavesi ile atık ısı besleme suyunun ısıtılmasında kullanılır; bu da yakıt tüketiminde ölçülebilir tasarruf sağlar.</p>
      <h2>Otomasyon ve Güvenlik</h2>
      <p>Seviye kontrolü, basınç kontrolü, alev gözetleme ve acil stop devreleri kazan kontrol panosunda birlikte çalışır. Operatör paneli üzerinden alarm geçmişi ve çalışma saatleri izlenebilir; bakım planlaması veriye dayalı yapılır.</p>
    `,
  },
  {
    slug: "kondenser-nedir-calisma-prensibi-verim-ve-uygulamalar-2",
    title: "Kondenser Nedir? Çalışma Prensibi ve Yakıt Tasarrufu",
    excerpt:
      "Baca gazındaki gizli ısıyı geri kazanan kondenser sistemleri, kazan verimini %5'e kadar artırabilir. Doğal gaz yakıtlı sistemlerde yoğuşmalı çalışmanın avantajları.",
    published_at: "2025-11-02",
    featured_image_url: "/img/products/kondenser.webp",
    content_html: `
      <p>Doğal gaz yakıtlı bir kazanda baca gazı ile atmosfere atılan ısının önemli bir kısmı, su buharının gizli ısısıdır. <strong>Kondenser</strong>, bu buharı yoğuşturarak gizli ısıyı geri kazanır ve besleme suyunu ısıtmak için kullanır.</p>
      <h2>Çalışma Prensibi</h2>
      <p>Kazandan çıkan baca gazı, kondenser içindeki ısı değiştirici yüzeylerden geçer. Gazın sıcaklığı su buharının çiğlenme noktasının altına indiğinde buhar yoğuşur ve açığa çıkan ısı, soğuk besleme suyuna aktarılır. Yoğuşma miktarı arttıkça geri kazanılan enerji de artar.</p>
      <h3>Ne Kazandırır?</h3>
      <ul>
        <li>Baca gazı sıcaklığında belirgin düşüş</li>
        <li>Besleme suyu sıcaklığında artış, dolayısıyla daha az yakıt</li>
        <li>Kazan veriminde %5'e kadar iyileşme</li>
        <li>Karbon emisyonunda azalma</li>
      </ul>
      <h2>Uygulama Koşulları</h2>
      <p>Yoğuşmalı çalışmadan tam fayda sağlamak için dönüş suyu sıcaklığının düşük olması gerekir. Bu nedenle kondenser, özellikle sera ısıtması ve düşük sıcaklıklı proseslerde daha verimli sonuç verir. Baca malzemesinin yoğuşmaya dayanıklı (paslanmaz) seçilmesi, sistem ömrü açısından kritik bir detaydır.</p>
      <h2>Yatırımın Geri Dönüşü</h2>
      <p>Kondenser yatırımı; kazan kapasitesi, yıllık çalışma saati ve yakıt birim fiyatına bağlı olarak genellikle 1–3 yıl içinde kendini amorti eder. Mevcut kazanlarınıza sonradan eklenebilmesi, sistemi cazip kılan diğer bir unsurdur.</p>
    `,
  },
];

export function localPostBySlug(slug: string): BlogPost | null {
  return LOCAL_BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

export function localPostsBySlugs(slugs: string[]): BlogPost[] {
  return LOCAL_BLOG_POSTS.filter((p) => slugs.includes(p.slug)).sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
  );
}
