import { useLocation } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { langFromPath, type Lang } from "@/components/SiteHeader";

/**
 * Bu site Enorpa Enerji'nin resmî sitesi DEĞİLDİR: talep edilmeden yapılmış bir
 * yeniden tasarım demosudur. Ziyaretçi yanlış anlamasın diye her sayfanın en
 * üstünde (SSR ile, JS'e bağlı olmadan) görünür.
 *
 * - Dil, adres çubuğundan türetilir (SiteHeader ile aynı kural; SSR/istemci aynı).
 * - Renk: açık sarı zemin + koyu lacivert metin ≈ 15:1 kontrast (WCAG AAA).
 * - `role="note"` + `lang`: ekran okuyucu metni doğru dilde okur.
 */
const NOTICE: Record<Lang, { htmlLang: string; text: string }> = {
  TR: {
    htmlLang: "tr",
    text: "Bu sayfa Enorpa Enerji'nin resmî sitesi değildir; talep edilmeden, kendi girişimimle hazırladığım bir yeniden tasarım demosudur.",
  },
  EN: {
    htmlLang: "en",
    text: "This is not the official Enorpa Enerji website; it is a redesign demo I built on my own initiative, without being asked.",
  },
  RU: {
    htmlLang: "ru",
    text: "Это не официальный сайт Enorpa Enerji, а демо-версия редизайна, созданная по собственной инициативе, без запроса со стороны компании.",
  },
};

export function DemoNotice() {
  const { pathname } = useLocation();
  const { htmlLang, text } = NOTICE[langFromPath(pathname)];

  return (
    <div
      role="note"
      lang={htmlLang}
      data-demo-notice
      className="bg-[#fff4cc] text-navy-dark border-b border-[#e6c85a] text-xs sm:text-sm leading-snug"
    >
      <p className="mx-auto max-w-7xl px-4 py-2 flex items-start sm:items-center justify-center gap-2 text-center sm:text-left">
        <Info className="h-4 w-4 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
        <span>{text}</span>
      </p>
    </div>
  );
}
