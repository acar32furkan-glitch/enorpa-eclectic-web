/**
 * Tanıtım videoları.
 *
 * Adresler orijinal sitedeki (enorpa.com) ürün sayfasında yer alan YouTube
 * bağlantısından alınmıştır. Yeni video ekleneceğinde yalnızca bu dosya
 * güncellenir; gömme bileşeni [`VideoEmbed`](src/components/VideoEmbed.tsx:1)
 * üçüncü taraf istekleri kullanıcı oynat'a bastığında yapar.
 */
export type Video = {
  /** YouTube kimliği — https://youtu.be/<id> */
  id: string;
  title: string;
  description: string;
};

export const PRODUCT_VIDEO: Video = {
  id: "enuOArEfqGo",
  title: "Enorpa Enerji ürün tanıtımı",
  description:
    "Kazan üretiminden devreye almaya kadar Enorpa Enerji'nin endüstriyel ısıtma çözümleri.",
};

export const YOUTUBE_CHANNEL = "https://www.youtube.com/@enorpaenerji";
