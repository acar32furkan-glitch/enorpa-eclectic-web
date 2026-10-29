/**
 * Enorpa Enerji — yerel görsel varlık üreticisi
 *
 * Site artık dış bir görsel sunucusuna (Supabase Storage / eski WordPress)
 * bağımlı olmadan çalışsın diye marka paletinde, teknik çizim dilinde
 * SVG görseller üretir; gereken yerlerde sharp ile PNG/WebP'ye çevirir.
 *
 * Kullanım:  node scripts/gen-assets.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const IMG = path.join(ROOT, "public", "img");

const PALETTE = {
  navyDeep: "#061122",
  navy: "#0a1e3d",
  navyMid: "#0f2d5c",
  steel: "#1b3f6b",
  steelLight: "#3d6f9f",
  orange: "#e05c1a",
  orangeLight: "#ff8a4c",
};

/* ------------------------------------------------------------------ */
/*  Ortak SVG parçaları                                               */
/* ------------------------------------------------------------------ */

function defs(accent) {
  return `<defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.15" y2="1">
      <stop offset="0" stop-color="#0d2849"/>
      <stop offset="0.55" stop-color="#0a1e3d"/>
      <stop offset="1" stop-color="#060f1d"/>
    </linearGradient>
    <linearGradient id="body" x1="0" y1="0" x2="0.12" y2="1">
      <stop offset="0" stop-color="#356aa0"/>
      <stop offset="0.32" stop-color="#1e4574"/>
      <stop offset="1" stop-color="#0e2846"/>
    </linearGradient>
    <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3d6f9f"/>
      <stop offset="1" stop-color="#173c62"/>
    </linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0a1b31"/>
      <stop offset="1" stop-color="#040b16"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.6"/>
      <stop offset="0.5" stop-color="${accent}" stop-opacity="0.14"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0V64" fill="none" stroke="#7fb5ea" stroke-opacity="0.09" stroke-width="1"/>
    </pattern>
    <pattern id="hazard" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="24" height="24" fill="#0f2d5c"/>
      <rect width="12" height="24" fill="${accent}" fill-opacity="0.85"/>
    </pattern>
    <filter id="blurL" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter>
    <filter id="blurM" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
  </defs>`;
}

const grid = (w, h) =>
  `<rect width="${w}" height="${h}" fill="url(#grid)"/>`;

function panel(x, y, w = 150, h = 200, accent = PALETTE.orange) {
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#102c4c" stroke="#2b5a88" stroke-width="2"/>
    <rect x="${x + 18}" y="${y + 20}" width="${w - 36}" height="52" rx="3" fill="#061426" stroke="#3f7cad" stroke-opacity="0.5"/>
    <rect x="${x + 26}" y="${y + 30}" width="${(w - 52) * 0.55}" height="10" fill="${accent}" fill-opacity="0.85"/>
    <rect x="${x + 26}" y="${y + 48}" width="${(w - 52) * 0.8}" height="6" fill="#9fc6e8" fill-opacity="0.5"/>
    <circle cx="${x + 30}" cy="${y + 104}" r="7" fill="#37d67a"/>
    <circle cx="${x + 54}" cy="${y + 104}" r="7" fill="#f2b53c"/>
    <circle cx="${x + 78}" cy="${y + 104}" r="7" fill="${accent}"/>
    <rect x="${x + 18}" y="${y + 126}" width="${w - 36}" height="8" rx="4" fill="#2b5a88"/>
    <rect x="${x + 18}" y="${y + 144}" width="${(w - 36) * 0.6}" height="8" rx="4" fill="#2b5a88"/>
    <rect x="${x + 18}" y="${y + 168}" width="${w - 36}" height="14" rx="3" fill="#0a1e3d" stroke="#2b5a88"/>
  </g>`;
}

function gauge(cx, cy, r = 34) {
  return `<g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#0a2039" stroke="#4b82b4" stroke-width="3"/>
    <circle cx="${cx}" cy="${cy}" r="${r - 9}" fill="none" stroke="#9fc6e8" stroke-opacity="0.25"/>
    <path d="M${cx} ${cy} L${cx + r * 0.55} ${cy - r * 0.55}" stroke="${PALETTE.orange}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="#e8f2fb"/>
  </g>`;
}

function flangePipe(x, yTop, yBottom, w = 40) {
  return `<g>
    <rect x="${x}" y="${yTop}" width="${w}" height="${yBottom - yTop}" rx="4" fill="url(#steel)"/>
    <rect x="${x - 10}" y="${yBottom - 80}" width="${w + 20}" height="16" rx="3" fill="#2c5b8c"/>
    <rect x="${x - 10}" y="${yTop + 4}" width="${w + 20}" height="16" rx="3" fill="#2c5b8c"/>
  </g>`;
}

function valve(cx, cy, s = 1) {
  return `<g transform="translate(${cx} ${cy}) scale(${s})">
    <circle r="26" fill="none" stroke="${PALETTE.orange}" stroke-width="6"/>
    <path d="M-26 0H26M0 -26V26" stroke="${PALETTE.orange}" stroke-width="5"/>
    <circle r="6" fill="${PALETTE.orange}"/>
  </g>`;
}

function baseFrame(w, h, accent) {
  return `<rect width="${w}" height="${h}" fill="url(#bg)"/>
    ${grid(w, h)}
    <ellipse cx="${w / 2}" cy="${h * 0.62}" rx="${w * 0.42}" ry="${h * 0.3}" fill="url(#glow)"/>
    <rect y="${h - 140}" width="${w}" height="140" fill="url(#floor)" opacity="0.85"/>
    <path d="M0 ${h - 140}H${w}" stroke="#6f9dcb" stroke-opacity="0.22" stroke-width="2"/>`;
}

/* ------------------------------------------------------------------ */
/*  Ürün / ekipman görselleri (1200x900)                              */
/* ------------------------------------------------------------------ */

const SHAPES = {
  /** Yatay silindirik gövde (sıcak su / kızgın su) */
  capsule(accent) {
    return `
      <ellipse cx="600" cy="706" rx="330" ry="30" fill="#02080f" opacity="0.65" filter="url(#blurL)"/>
      <path d="M336 396h528a132 132 0 0 1 0 264H336a132 132 0 0 1 0-264z" fill="url(#body)" stroke="#0b1e35" stroke-width="3"/>
      <path d="M360 412h480" stroke="#a7cdf0" stroke-opacity="0.22" stroke-width="7" stroke-linecap="round"/>
      <g stroke="#071d33" stroke-opacity="0.55" stroke-width="4">
        <path d="M440 396v264M540 396v264M640 396v264M740 396v264"/>
      </g>
      <path d="M430 660l-20 86h64l14-86z" fill="#12304f"/>
      <path d="M742 660l20 86h-64l-14-86z" fill="#12304f"/>
      <rect x="300" y="736" width="600" height="22" fill="url(#hazard)" opacity="0.75"/>
      <circle cx="352" cy="530" r="96" fill="#0d2745" stroke="#2a5a8b" stroke-width="4"/>
      <circle cx="352" cy="530" r="60" fill="#061424" stroke="#3a6d9f" stroke-width="3"/>
      <circle cx="352" cy="530" r="34" fill="${accent}" opacity="0.55" filter="url(#blurM)"/>
      <circle cx="352" cy="530" r="20" fill="#ffd9b8" opacity="0.9"/>
      <path d="M700 320h44v76h-44z" fill="url(#steel)"/>
      <path d="M556 320h40v76h-40z" fill="url(#steel)"/>
      <rect x="690" y="300" width="64" height="16" rx="3" fill="#2c5b8c"/>
      <rect x="548" y="300" width="56" height="16" rx="3" fill="#2c5b8c"/>
      ${valve(578, 292, 0.62)}
      ${gauge(760, 470, 38)}
      ${panel(900, 356, 148, 196, accent)}`;
  },

  /** Dikdörtgen gövde + yükleme kapağı (katı yakıtlı buhar) */
  box(accent) {
    return `
      <ellipse cx="600" cy="712" rx="300" ry="28" fill="#02080f" opacity="0.65" filter="url(#blurL)"/>
      <path d="M404 292h392l42 56H362z" fill="#17395e"/>
      <rect x="362" y="348" width="476" height="332" rx="8" fill="url(#body)" stroke="#0b1e35" stroke-width="3"/>
      <path d="M380 366h440" stroke="#a7cdf0" stroke-opacity="0.2" stroke-width="6" stroke-linecap="round"/>
      <rect x="392" y="392" width="212" height="248" rx="6" fill="#14355a" stroke="#2f6193" stroke-width="3"/>
      <rect x="414" y="414" width="168" height="150" rx="4" fill="#0a2039" stroke="#3a6d9f" stroke-width="2"/>
      <circle cx="498" cy="700" r="0" fill="none"/>
      <circle cx="640" cy="640" r="42" fill="#0d2745" stroke="#2a5a8b" stroke-width="3"/>
      <circle cx="640" cy="640" r="24" fill="${accent}" opacity="0.5" filter="url(#blurM)"/>
      <circle cx="640" cy="640" r="12" fill="#ffd9b8" opacity="0.85"/>
      <rect x="712" y="392" width="108" height="248" rx="6" fill="#10304f" stroke="#2f6193" stroke-width="2"/>
      <g stroke="#3f7cad" stroke-opacity="0.6" stroke-width="3">
        <path d="M728 424h76M728 470h76M728 516h76"/>
      </g>
      ${gauge(766, 576, 34)}
      <path d="M470 292v-72h56v72z" fill="url(#steel)"/>
      <rect x="452" y="204" width="92" height="18" rx="4" fill="#2c5b8c"/>
      ${valve(496, 196, 0.6)}
      <path d="M760 292v-58h44v58z" fill="url(#steel)"/>
      <rect x="300" y="680" width="600" height="22" fill="url(#hazard)" opacity="0.7"/>
      ${panel(890, 340, 140, 190, accent)}`;
  },

  /** Dikey gövde (kızgın su / jeneratör) */
  vertical(accent) {
    return `
      <ellipse cx="600" cy="700" rx="220" ry="26" fill="#02080f" opacity="0.65" filter="url(#blurL)"/>
      <path d="M476 306a124 66 0 0 1 248 0v370H476z" fill="url(#body)" stroke="#0b1e35" stroke-width="3"/>
      <path d="M500 330a100 46 0 0 1 200 0" fill="none" stroke="#a7cdf0" stroke-opacity="0.22" stroke-width="6"/>
      <g stroke="#071d33" stroke-opacity="0.5" stroke-width="4">
        <path d="M540 400h120M540 470h120M540 540h120M540 610h120"/>
      </g>
      <circle cx="600" cy="560" r="58" fill="#0d2745" stroke="#2a5a8b" stroke-width="4"/>
      <circle cx="600" cy="560" r="32" fill="${accent}" opacity="0.5" filter="url(#blurM)"/>
      <circle cx="600" cy="560" r="16" fill="#ffd9b8" opacity="0.9"/>
      <rect x="414" y="646" width="372" height="22" fill="url(#hazard)" opacity="0.7"/>
      <path d="M600 306v-84h48v84z" fill="url(#steel)"/>
      <rect x="586" y="204" width="70" height="18" rx="4" fill="#2c5b8c"/>
      ${valve(620, 196, 0.6)}
      <path d="M724 420h84v180h-84z" fill="#102c4c" stroke="#2b5a88" stroke-width="2"/>
      <g stroke="${accent}" stroke-opacity="0.55" stroke-width="4">
        <path d="M740 450h52M740 490h52M740 530h52"/>
      </g>
      ${gauge(766, 578, 30)}
      ${panel(830, 330, 130, 180, accent)}`;
  },

  /** Kanal / fanlı sıcak hava ünitesi */
  duct(accent) {
    return `
      <ellipse cx="600" cy="710" rx="320" ry="28" fill="#02080f" opacity="0.65" filter="url(#blurL)"/>
      <path d="M300 300h360v96H300z" fill="#15365a" stroke="#2b5a88" stroke-width="2"/>
      <path d="M300 300v300h96V396h264v204h96V300z" fill="url(#body)" stroke="#0b1e35" stroke-width="3"/>
      <circle cx="792" cy="470" r="132" fill="#0d2745" stroke="#2f6193" stroke-width="4"/>
      <circle cx="792" cy="470" r="96" fill="#061424" stroke="#3a6d9f" stroke-width="3"/>
      <g stroke="${accent}" stroke-opacity="0.6" stroke-width="8" stroke-linecap="round">
        <path d="M792 470l52-58M792 470l-52 58M792 470l-64-8M792 470l64 8"/>
      </g>
      <circle cx="792" cy="470" r="16" fill="#ffd9b8" opacity="0.9"/>
      <rect x="330" y="420" width="120" height="180" rx="6" fill="#10304f" stroke="#2f6193" stroke-width="2"/>
      <g stroke="#3f7cad" stroke-opacity="0.55" stroke-width="3">
        <path d="M348 452h84M348 496h84M348 540h84M348 584h84"/>
      </g>
      <path d="M600 300V214h48v86z" fill="url(#steel)"/>
      <rect x="586" y="196" width="76" height="18" rx="4" fill="#2c5b8c"/>
      ${valve(624, 188, 0.58)}
      ${gauge(446, 636, 30)}
      <rect x="392" y="672" width="416" height="22" fill="url(#hazard)" opacity="0.7"/>
      ${panel(918, 352, 132, 184, accent)}`;
  },
};

function equipment(shapeKey, accent) {
  const w = 1200;
  const h = 900;
  const shape = SHAPES[shapeKey](accent);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
    ${defs(accent)}
    ${baseFrame(w, h, accent)}
    ${shape}
    <g stroke="#8fc0ea" stroke-opacity="0.25" stroke-width="2" fill="none">
      <path d="M60 60h48M60 60v48M1140 60h-48M1140 60v48"/>
    </g>
  </svg>`;
}

/* ------------------------------------------------------------------ */
/*  Hero görseli (1920x900)                                           */
/* ------------------------------------------------------------------ */

function hero() {
  const w = 1920;
  const h = 900;
  const accent = PALETTE.orange;

  // uzak fabrika silueti
  let far = `<g fill="#10294a" opacity="0.85">`;
  const farBlocks = [
    [0, 560, 190, 200], [200, 600, 120, 160], [330, 545, 160, 215],
    [1500, 560, 200, 200], [1710, 590, 210, 170], [1180, 610, 130, 150],
    [1320, 585, 140, 175],
  ];
  for (const [x, y, bw, bh] of farBlocks) far += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}"/>`;
  far += `</g>`;

  // uzak bacalar
  let stacks = `<g fill="#0d2340">`;
  for (const [x, sw, sh] of [[420, 34, 250], [492, 26, 190], [1438, 32, 230], [1560, 24, 180]]) {
    stacks += `<rect x="${x}" y="${700 - sh}" width="${sw}" height="${sh}"/>`;
    stacks += `<rect x="${x - 6}" y="${700 - sh}" width="${sw + 12}" height="14" fill="#e05c1a" fill-opacity="0.35"/>`;
  }
  stacks += `</g>`;

  // sera kemerleri
  let greenhouses = `<g>`;
  for (let i = 0; i < 9; i++) {
    const x = 60 + i * 150;
    greenhouses += `<path d="M${x} 700v-124a75 58 0 0 1 150 0v124z" fill="#12304f" stroke="#2f6193" stroke-opacity="0.55" stroke-width="2"/>`;
    greenhouses += `<path d="M${x + 16} 700v-118a59 46 0 0 1 118 0v118" fill="none" stroke="#e05c1a" stroke-opacity="0.18" stroke-width="2"/>`;
  }
  greenhouses += `<rect x="40" y="694" width="1420" height="12" fill="#0b2340"/></g>`;

  // ana kazan dairesi
  const hall = `<g>
    <path d="M980 700v-210l120-70 120 70v210z" fill="#17395e" stroke="#2f6193" stroke-opacity="0.5" stroke-width="3"/>
    <rect x="1010" y="540" width="52" height="42" fill="${accent}" fill-opacity="0.6"/>
    <rect x="1080" y="540" width="52" height="42" fill="${accent}" fill-opacity="0.35"/>
    <rect x="1150" y="540" width="40" height="42" fill="${accent}" fill-opacity="0.5"/>
    <rect x="1052" y="620" width="96" height="80" fill="#0a1e3d" stroke="#2f6193" stroke-opacity="0.6" stroke-width="3"/>
    <path d="M1100 620v80" stroke="#e05c1a" stroke-opacity="0.35" stroke-width="3"/>
  </g>`;

  // boru köprüsü
  const pipes = `<g>
    <rect x="0" y="742" width="1920" height="18" fill="#0c2542"/>
    <rect x="0" y="770" width="1920" height="12" fill="#0a1f38"/>
    <g fill="#12304f">
      <rect x="120" y="700" width="26" height="200"/><rect x="760" y="700" width="26" height="200"/>
      <rect x="1240" y="700" width="26" height="200"/><rect x="1740" y="700" width="26" height="200"/>
    </g>
    <g fill="#2c5b8c">${[240, 620, 1120, 1420, 1660].map((x) => `<circle cx="${x}" cy="751" r="15"/>`).join("")}</g>
  </g>`;

  // ön plan
  const front = `<g>
    <rect x="0" y="800" width="1920" height="100" fill="#040d19"/>
    <path d="M0 800H1920" stroke="#e05c1a" stroke-opacity="0.35" stroke-width="3"/>
    <g fill="#07182c">
      <rect x="250" y="690" width="180" height="110" rx="6"/>
      <rect x="470" y="720" width="130" height="80" rx="6"/>
      <rect x="1330" y="700" width="210" height="100" rx="6"/>
    </g>
    <g fill="${accent}" fill-opacity="0.55">
      <rect x="272" y="716" width="34" height="22"/><rect x="320" y="716" width="34" height="22"/>
      <rect x="368" y="716" width="34" height="22"/><rect x="494" y="744" width="28" height="18"/>
      <rect x="1358" y="726" width="40" height="24"/><rect x="1412" y="726" width="40" height="24"/>
      <rect x="1466" y="726" width="40" height="24"/>
    </g>
  </g>`;

  // duman
  const smoke = `<g fill="#cfe4f7" opacity="0.07">
    <ellipse cx="437" cy="430" rx="46" ry="26"/>
    <ellipse cx="470" cy="386" rx="38" ry="22"/>
    <ellipse cx="504" cy="348" rx="30" ry="18"/>
    <ellipse cx="1454" cy="452" rx="44" ry="24"/>
    <ellipse cx="1488" cy="410" rx="34" ry="20"/>
  </g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
    ${defs(accent)}
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <ellipse cx="960" cy="742" rx="1080" ry="330" fill="url(#glow)" opacity="0.9"/>
    ${grid(w, h)}
    ${far}
    ${stacks}
    ${greenhouses}
    ${hall}
    ${smoke}
    ${pipes}
    ${front}
  </svg>`;
}

/* ------------------------------------------------------------------ */
/*  Proje sahneleri (1600x1000)                                       */
/* ------------------------------------------------------------------ */

function project({ accent, variant }) {
  const w = 1600;
  const h = 1000;

  const horizon = 700;
  let greenhouses = "";
  const arcs = variant === "plant" ? 4 : 8;
  for (let i = 0; i < arcs; i++) {
    const x = 80 + i * 176;
    greenhouses += `<path d="M${x} ${horizon}v-150a88 66 0 0 1 176 0v150z" fill="#12304f" stroke="#2f6193" stroke-opacity="0.5" stroke-width="3"/>`;
    greenhouses += `<path d="M${x + 20} ${horizon}v-142a68 52 0 0 1 136 0v142" fill="none" stroke="${accent}" stroke-opacity="0.18" stroke-width="3"/>`;
  }

  const plant =
    variant === "plant"
      ? `<g>
          <rect x="980" y="380" width="420" height="320" fill="#17395e" stroke="#2f6193" stroke-opacity="0.5" stroke-width="3"/>
          <rect x="1010" y="430" width="120" height="70" fill="${accent}" fill-opacity="0.5"/>
          <rect x="1160" y="430" width="120" height="70" fill="${accent}" fill-opacity="0.32"/>
          <rect x="1080" y="560" width="140" height="140" fill="#0a1e3d" stroke="#2f6193" stroke-opacity="0.6" stroke-width="3"/>
          <rect x="1420" y="250" width="70" height="450" fill="#0d2340"/>
          <rect x="1406" y="238" width="98" height="18" fill="${accent}" fill-opacity="0.4"/>
          <g fill="#cfe4f7" opacity="0.07">
            <ellipse cx="1455" cy="200" rx="52" ry="26"/><ellipse cx="1500" cy="152" rx="40" ry="22"/>
          </g>
        </g>`
      : `<g>
          <rect x="1180" y="470" width="300" height="230" fill="#17395e" stroke="#2f6193" stroke-opacity="0.5" stroke-width="3"/>
          <rect x="1210" y="510" width="90" height="60" fill="${accent}" fill-opacity="0.45"/>
          <rect x="1330" y="510" width="90" height="60" fill="${accent}" fill-opacity="0.3"/>
          <rect x="1240" y="610" width="120" height="90" fill="#0a1e3d" stroke="#2f6193" stroke-opacity="0.6" stroke-width="3"/>
          <rect x="1530" y="330" width="56" height="370" fill="#0d2340"/>
          <rect x="1518" y="318" width="80" height="16" fill="${accent}" fill-opacity="0.4"/>
        </g>`;

  const tanks = `<g>
    <ellipse cx="250" cy="642" rx="120" ry="58" fill="#17395e" stroke="#2f6193" stroke-opacity="0.5" stroke-width="3"/>
    <rect x="130" y="642" width="240" height="60" fill="#12304f"/>
    <ellipse cx="250" cy="700" rx="120" ry="56" fill="#0d2745" stroke="#2f6193" stroke-opacity="0.4" stroke-width="3"/>
    <path d="M250 642v58" stroke="${accent}" stroke-opacity="0.4" stroke-width="4"/>
  </g>`;

  const foreground = `<g>
    <rect x="0" y="${horizon}" width="${w}" height="30" fill="#0a1e3d"/>
    <rect x="0" y="${horizon + 150}" width="${w}" height="150" fill="#040d19"/>
    <path d="M0 ${horizon + 150}H${w}" stroke="${accent}" stroke-opacity="0.32" stroke-width="3"/>
    <g fill="#07182c">
      <rect x="620" y="${horizon - 60}" width="150" height="90" rx="6"/>
      <rect x="800" y="${horizon - 34}" width="110" height="64" rx="6"/>
    </g>
    <g fill="${accent}" fill-opacity="0.5">
      <rect x="640" y="${horizon - 42}" width="30" height="20"/>
      <rect x="684" y="${horizon - 42}" width="30" height="20"/>
      <rect x="818" y="${horizon - 20}" width="26" height="18"/>
    </g>
  </g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
    ${defs(accent)}
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <ellipse cx="800" cy="700" rx="900" ry="360" fill="url(#glow)" opacity="0.75"/>
    ${grid(w, h)}
    ${greenhouses}
    ${plant}
    ${tanks}
    ${foreground}
  </svg>`;
}

/* ------------------------------------------------------------------ */
/*  Sertifika rozetleri (240x240)                                     */
/* ------------------------------------------------------------------ */

function badge(label, sub) {
  const size = 240;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="${label}">
    <circle cx="120" cy="120" r="112" fill="#0f2d5c"/>
    <circle cx="120" cy="120" r="100" fill="none" stroke="#e05c1a" stroke-width="4"/>
    <circle cx="120" cy="120" r="84" fill="none" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2"/>
    <text x="120" y="112" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${label.length > 3 ? 46 : 62}" font-weight="700" fill="#ffffff" letter-spacing="1">${label}</text>
    <text x="120" y="152" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="15" fill="#9fc6e8" letter-spacing="2">${sub}</text>
    <path d="M64 172h112" stroke="#e05c1a" stroke-width="3"/>
  </svg>`;
}

/* ------------------------------------------------------------------ */
/*  Favicon (metin içermez → yazı tipi bağımsız)                      */
/* ------------------------------------------------------------------ */

function faviconSvg(size = 512) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}" role="img" aria-label="Enorpa">
    <rect width="512" height="512" rx="96" fill="#0f2d5c"/>
    <path d="M256 110c46 66 78 104 78 154a78 78 0 0 1-156 0c0-50 32-88 78-154z" fill="#e05c1a"/>
    <path d="M256 214c22 32 38 52 38 76a38 38 0 0 1-76 0c0-24 16-44 38-76z" fill="#ffd9b8"/>
    <rect x="150" y="392" width="212" height="26" rx="13" fill="#ffffff" fill-opacity="0.85"/>
  </svg>`;
}

/* ------------------------------------------------------------------ */
/*  OG kapağı (1200x630)                                              */
/* ------------------------------------------------------------------ */

function ogCover() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img">
    ${defs(PALETTE.orange)}
    <rect width="1200" height="630" fill="url(#bg)"/>
    <ellipse cx="600" cy="520" rx="720" ry="260" fill="url(#glow)" opacity="0.8"/>
    ${grid(1200, 630)}
    <g opacity="0.9">
      <rect x="0" y="470" width="1200" height="160" fill="#040d19"/>
      <g fill="#17395e">
        <rect x="80" y="330" width="150" height="140"/><rect x="250" y="370" width="110" height="100"/>
        <rect x="900" y="340" width="180" height="130"/><rect x="1096" y="380" width="90" height="90"/>
        <rect x="820" y="250" width="44" height="220"/><rect x="700" y="290" width="36" height="180"/>
      </g>
      <g fill="${PALETTE.orange}" fill-opacity="0.7">
        <rect x="102" y="356" width="26" height="18"/><rect x="140" y="356" width="26" height="18"/>
        <rect x="924" y="366" width="30" height="20"/><rect x="966" y="366" width="30" height="20"/>
      </g>
      <path d="M0 470h1200" stroke="${PALETTE.orange}" stroke-opacity="0.5" stroke-width="3"/>
    </g>
    <text x="80" y="230" font-family="Arial, Helvetica, sans-serif" font-size="92" font-weight="700" fill="#ffffff" letter-spacing="4">ENORPA</text>
    <circle cx="560" cy="212" r="13" fill="${PALETTE.orange}"/>
    <text x="82" y="290" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#9fc6e8" letter-spacing="1">Endüstriyel Isıtma Sistemleri</text>
    <rect x="82" y="318" width="150" height="6" fill="${PALETTE.orange}"/>
    <text x="82" y="560" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#ffffff" fill-opacity="0.75">Buhar · Sıcak Su · Sıcak Hava · Kızgın Su Kazanları</text>
  </svg>`;
}

/* ------------------------------------------------------------------ */
/*  Üretim                                                            */
/* ------------------------------------------------------------------ */

const PRODUCT_ART = [
  { file: "sicak-su-a", shape: "capsule", accent: PALETTE.orange },
  { file: "sicak-su-b", shape: "vertical", accent: PALETTE.orange },
  { file: "buhar-a", shape: "box", accent: "#e05c1a" },
  { file: "buhar-b", shape: "capsule", accent: "#d94f2b" },
  { file: "sicak-hava-a", shape: "duct", accent: "#f2a03c" },
  { file: "sicak-hava-b", shape: "box", accent: "#ef8a2e" },
  { file: "kizgin-su-a", shape: "vertical", accent: "#d9482f" },
  { file: "kizgin-su-b", shape: "capsule", accent: "#c93b2a" },
  { file: "diger-a", shape: "duct", accent: "#5f8fc0" },
  { file: "diger-b", shape: "box", accent: "#7ba7d4" },
];

const PROJECTS = [
  { file: "taskent", accent: "#e05c1a", variant: "greenhouse" },
  { file: "harezm", accent: "#f2a03c", variant: "greenhouse" },
  { file: "manisa", accent: "#e05c1a", variant: "plant" },
  { file: "izmir", accent: "#ef8a2e", variant: "greenhouse" },
  { file: "isparta", accent: "#e05c1a", variant: "plant" },
  { file: "almaty", accent: "#f2a03c", variant: "plant" },
];

const BADGES = [
  { file: "tse", label: "TSE", sub: "TÜRK STANDARTLARI" },
  { file: "ce", label: "CE", sub: "EUROPEAN CONFORMITY" },
  { file: "asme", label: "ASME", sub: "AMERICAN SOCIETY" },
  { file: "eac", label: "EAC", sub: "EURASIAN CONFORMITY" },
  { file: "gost", label: "GOST", sub: "RUSYA STANDARDI" },
];

async function write(rel, content) {
  const target = path.join(IMG, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
  return target;
}

async function main() {
  let sharp = null;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.warn("! sharp bulunamadı — PNG/WebP çıktıları atlanıyor (SVG'ler üretildi).");
  }

  await write("hero/plant.svg", hero());
  for (const p of PRODUCT_ART) await write(`products/${p.file}.svg`, equipment(p.shape, p.accent));
  for (const p of PROJECTS) await write(`projects/${p.file}.svg`, project(p));
  for (const b of BADGES) await write(`brand/${b.file}.svg`, badge(b.label, b.sub));
  await write("brand/favicon.svg", faviconSvg());
  await write("brand/og-cover.svg", ogCover());

  if (sharp) {
    const svgToPng = async (svgPath, outPath, width) => {
      const out = path.join(IMG, outPath);
      await mkdir(path.dirname(out), { recursive: true });
      await sharp(svgPath).resize({ width }).png({ compressionLevel: 9 }).toFile(out);
    };

    // Hero: WebP (tarayıcılar için hafif, fotoğraf benzeri doku)
    const heroSvg = path.join(IMG, "hero", "plant.svg");
    await sharp(heroSvg).resize({ width: 1920 }).webp({ quality: 84 }).toFile(path.join(IMG, "hero", "plant.webp"));

    // OG kapağı + favicon PNG türevleri
    await svgToPng(path.join(IMG, "brand", "og-cover.svg"), "brand/og-cover.png", 1200);
    await svgToPng(path.join(IMG, "brand", "favicon.svg"), "brand/favicon-192.png", 192);
    await svgToPng(path.join(IMG, "brand", "favicon.svg"), "brand/apple-touch-icon.png", 180);

    // Ürün görselleri için WebP türevleri (daha küçük transfer)
    for (const p of PRODUCT_ART) {
      await sharp(path.join(IMG, "products", `${p.file}.svg`))
        .resize({ width: 900 })
        .webp({ quality: 82 })
        .toFile(path.join(IMG, "products", `${p.file}.webp`));
    }
  }

  console.log("✓ Görsel varlıklar üretildi: public/img/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
