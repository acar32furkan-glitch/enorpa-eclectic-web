/**
 * Üçüncü taraf analitik köprüleri için tip tanımları.
 * GA4 (`gtag`) ve Meta Pixel (`fbq`) yalnızca çerez onayı verildiğinde yüklenir;
 * bu yüzden opsiyonel olarak işaretlenir.
 */
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export {};
