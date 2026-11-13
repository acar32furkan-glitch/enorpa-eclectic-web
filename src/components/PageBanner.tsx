/**
 * İç sayfa başlığı (banner).
 *
 * Görseli olmayan sayfalar (iletişim, kariyer) düz beyaz bir başlıkla "boş"
 * görünüyordu. Bu bileşen; gerçek saha fotoğrafı + gradient overlay + sayfa
 * başlığını tek bir tutarlı blokta verir. Ana sayfa hero'suyla aynı görsel
 * dilini kullanır (koyu lacivert zemin, turuncu eyebrow).
 */
type PageBannerProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** public yolu (ör. /img/hero/slide-2.webp) */
  image: string;
  /** Görselin odak noktası — dar ekranlarda kırpmayı yönetir */
  objectPosition?: string;
};

export function PageBanner({
  eyebrow,
  title,
  description,
  image,
  objectPosition = "center",
}: PageBannerProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-dark">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        width="1920"
        height="600"
        loading="eager"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition }}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(6,20,38,0.95)_0%,rgba(6,20,38,0.88)_42%,rgba(6,20,38,0.55)_72%,rgba(6,20,38,0.25)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-20 bg-gradient-to-t from-black/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="inline-block border-b-2 border-orange pb-1 mb-3">
          <span className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold">
            {eyebrow}
          </span>
        </div>
        <h1 className="font-display text-white text-3xl md:text-5xl font-bold uppercase leading-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-white/85 text-base md:text-lg leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
