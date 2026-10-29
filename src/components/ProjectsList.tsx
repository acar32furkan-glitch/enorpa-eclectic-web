import { Link } from "@tanstack/react-router";
import { MapPin, Globe, Calendar, ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export type ProjectsLang = "TR" | "EN" | "RU";

type ProjectItem = {
  title: string;
  subtitle: string;
  description: string;
  location: string;
  year: string;
};

const COPY: Record<
  ProjectsLang,
  {
    crumb: string;
    kicker: string;
    title: string;
    intro: string;
    items: ProjectItem[];
    stats: { value: string; label: string }[];
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
    ctaHref: string;
  }
> = {
  TR: {
    crumb: "Projeler",
    kicker: "Projeler",
    title: "Projelerimiz",
    intro:
      "26 ülkede 138'den fazla projeyi hayata geçirdik. Sera ısıtmasından endüstriyel buhara kadar her projede tesisin gerçek yükünü ölçerek tasarım yapıyoruz.",
    items: [
      {
        title: "Özbekistan / Taşkent",
        subtitle: "Sera Isıtma Tesisatı Kurulumu",
        description:
          "Taşkent'te sera ısıtma tesisatı kurulumu. Enorpa HAS Serisi kazanlar ile donatılan tesis yüksek verimlilikle çalışıyor.",
        location: "Özbekistan, Taşkent",
        year: "2020",
      },
      {
        title: "Özbekistan / Harezm",
        subtitle: "Sera Isıtma Tesisatı Kurulumu",
        description:
          "Harezm'de sera ısıtma tesisatı kurulumu. Sıcak iklim koşullarına uygun özel tasarım.",
        location: "Özbekistan, Harezm",
        year: "2020",
      },
      {
        title: "Türkiye / Manisa",
        subtitle: "Buhar Kazanı Kurulumu",
        description:
          "Manisa'da sanayi tesisine özel buhar kazanı projelendirildi, kuruldu ve devreye alındı.",
        location: "Türkiye, Manisa",
        year: "2019",
      },
      {
        title: "Türkiye / İzmir",
        subtitle: "Sera Isıtma Tesisatı Kurulumu",
        description:
          "İzmir'de sera ısıtma tesisatı kurulumu. Seracılık sektörüne özel, düşük yakıt tüketimli çözümler.",
        location: "Türkiye, İzmir",
        year: "2021",
      },
      {
        title: "Türkiye / Isparta",
        subtitle: "Orman Ürünlerinin Kurutulması",
        description:
          "Isparta'da orman ürünleri kurutma sistemi kurulumu. Enerji verimliliği odaklı tasarım.",
        location: "Türkiye, Isparta",
        year: "2022",
      },
    ],
    stats: [
      { value: "138+", label: "Tamamlanan Proje" },
      { value: "26", label: "Ülke" },
      { value: "347+", label: "Müşteri" },
    ],
    ctaTitle: "Sıradaki Projeniz İçin Hazırız",
    ctaText:
      "Tesisinizin ısıtma ihtiyacı için ücretsiz keşif ve kapasite hesaplaması yapıyoruz.",
    ctaButton: "Teklif Al",
    ctaHref: "/iletisim",
  },
  EN: {
    crumb: "Projects",
    kicker: "Projects",
    title: "Our Projects",
    intro:
      "We have delivered more than 138 projects across 26 countries — from greenhouse heating to industrial steam, each engineered around the real load of the facility.",
    items: [
      {
        title: "Uzbekistan / Tashkent",
        subtitle: "Greenhouse Heating Installation",
        description:
          "Greenhouse heating installation in Tashkent, equipped with Enorpa HAS Series boilers.",
        location: "Uzbekistan, Tashkent",
        year: "2020",
      },
      {
        title: "Uzbekistan / Khorezm",
        subtitle: "Greenhouse Heating Installation",
        description:
          "Greenhouse heating installation in Khorezm, custom designed for hot climate conditions.",
        location: "Uzbekistan, Khorezm",
        year: "2020",
      },
      {
        title: "Turkey / Manisa",
        subtitle: "Steam Boiler Installation",
        description:
          "Steam boiler engineered, installed and commissioned for an industrial facility in Manisa.",
        location: "Turkey, Manisa",
        year: "2019",
      },
      {
        title: "Turkey / Izmir",
        subtitle: "Greenhouse Heating Installation",
        description:
          "Greenhouse heating installation in Izmir with low fuel consumption solutions for horticulture.",
        location: "Turkey, Izmir",
        year: "2021",
      },
      {
        title: "Turkey / Isparta",
        subtitle: "Timber Drying System",
        description: "Timber drying system installation in Isparta, designed for energy efficiency.",
        location: "Turkey, Isparta",
        year: "2022",
      },
    ],
    stats: [
      { value: "138+", label: "Completed Projects" },
      { value: "26", label: "Countries" },
      { value: "347+", label: "Customers" },
    ],
    ctaTitle: "Ready for Your Next Project",
    ctaText:
      "We provide free site surveys and capacity calculations for your facility's heating demand.",
    ctaButton: "Get a Quote",
    ctaHref: "/en/contact",
  },
  RU: {
    crumb: "Проекты",
    kicker: "Проекты",
    title: "Наши проекты",
    intro:
      "Более 138 проектов в 26 странах — от отопления теплиц до промышленного пара. Каждый проект проектируется под реальную нагрузку объекта.",
    items: [
      {
        title: "Узбекистан / Ташкент",
        subtitle: "Монтаж системы отопления теплиц",
        description:
          "Монтаж отопления теплиц в Ташкенте на котлах серии HAS компании Enorpa.",
        location: "Узбекистан, Ташкент",
        year: "2020",
      },
      {
        title: "Узбекистан / Хорезм",
        subtitle: "Монтаж системы отопления теплиц",
        description:
          "Монтаж отопления теплиц в Хорезме. Индивидуальный проект для жаркого климата.",
        location: "Узбекистан, Хорезм",
        year: "2020",
      },
      {
        title: "Турция / Маниса",
        subtitle: "Монтаж парового котла",
        description:
          "Проектирование, монтаж и пуск парового котла для промышленного предприятия в Манисе.",
        location: "Турция, Маниса",
        year: "2019",
      },
      {
        title: "Турция / Измир",
        subtitle: "Монтаж системы отопления теплиц",
        description:
          "Монтаж отопления теплиц в Измире с решениями низкого расхода топлива.",
        location: "Турция, Измир",
        year: "2021",
      },
      {
        title: "Турция / Испарта",
        subtitle: "Система сушки древесины",
        description: "Монтаж системы сушки древесины в Испарте с акцентом на энергоэффективность.",
        location: "Турция, Испарта",
        year: "2022",
      },
    ],
    stats: [
      { value: "138+", label: "Завершенных проектов" },
      { value: "26", label: "Стран" },
      { value: "347+", label: "Клиентов" },
    ],
    ctaTitle: "Готовы к вашему следующему проекту",
    ctaText:
      "Бесплатный осмотр объекта и расчет мощности для отопления вашего предприятия.",
    ctaButton: "Запросить цену",
    ctaHref: "/ru/contact",
  },
};

export function ProjectsList({ lang = "TR" }: { lang?: ProjectsLang }) {
  const c = COPY[lang];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <Breadcrumbs items={[{ name: c.crumb }]} />

        <div className="mb-14 max-w-2xl">
          <div className="text-orange font-display uppercase tracking-[0.3em] text-xs font-semibold mb-3 border-b-2 border-orange inline-block pb-1">
            {c.kicker}
          </div>
          <h1 className="font-display text-navy text-4xl md:text-5xl font-bold uppercase">
            {c.title}
          </h1>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">{c.intro}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          {c.stats.map((s) => (
            <div key={s.label} className="bg-steel border border-border p-6 text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-navy">{s.value}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {c.items.map((project) => (
            <article
              key={project.title}
              className="group bg-white border border-border hover:border-orange transition-colors p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
            >
              <div className="h-12 w-12 flex-shrink-0 bg-navy text-white flex items-center justify-center">
                <Globe className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-navy text-xl font-bold uppercase">
                  {project.title}
                </h2>
                <div className="text-sm text-orange font-display uppercase tracking-wider mt-1">
                  {project.subtitle}
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex md:flex-col gap-4 text-xs text-muted-foreground md:text-right">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-orange" />
                  {project.location}
                </span>
                <span className="inline-flex items-center gap-1.5 md:justify-end">
                  <Calendar className="h-3.5 w-3.5 text-orange" />
                  {project.year}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 bg-navy-dark text-white p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase mb-3">
            {c.ctaTitle}
          </h2>
          <p className="text-white/75 max-w-2xl mx-auto mb-6 text-sm md:text-base">{c.ctaText}</p>
          <a
            href={c.ctaHref}
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-semibold uppercase tracking-wider text-sm px-6 py-3 transition-colors"
          >
            {c.ctaButton}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

export { Link };
