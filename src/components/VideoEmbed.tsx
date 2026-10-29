import { useState } from "react";
import { Play } from "lucide-react";

type VideoEmbedProps = {
  /** YouTube video kimliği (https://youtu.be/<id>) */
  videoId: string;
  title: string;
  /** Tıklamadan önce gösterilecek kapak görseli (yerel dosya önerilir) */
  poster?: string;
};

/**
 * Tembel (lazy) YouTube gömme.
 *
 * Üçüncü taraf istekleri yalnızca kullanıcı oynat'a bastığında yapılır:
 * sayfa hızı ve çerez/gizlilik açısından en güvenli yöntem. Gömme adresi
 * `youtube-nocookie.com` üzerinden çalışır.
 */
export function VideoEmbed({ videoId, title, poster }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-navy-dark">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${title} — videoyu oynat`}
          className="group absolute inset-0 h-full w-full"
        >
          {poster && (
            <img
              src={poster}
              alt=""
              aria-hidden="true"
              width="1280"
              height="720"
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
          <span className="absolute inset-0 bg-navy-dark/45" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-orange text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
              <Play className="h-7 w-7 translate-x-0.5" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
