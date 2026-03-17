// data.js — all cake data + image rendering
window.SB = window.SB || {};

SB.CAKES = [
  { id: 'streusel',         name: 'STREUSEL',                 meaning: 'Comfort',    occasion: 'Origin: United States', bg: '#D4956A', img: 'assets/cakes/Streuse Cake.webp' },
  { id: 'opera',            name: 'OPERA CAKE',               meaning: 'Elegance',   occasion: 'Flavor: Espresso & Almond', bg: '#7A5030', img: 'assets/cakes/Opera Cake.webp' },
  { id: 'gugelhupf',        name: 'GUGELHUPF',                meaning: 'Tradition',  occasion: 'Origin: Central Europe', bg: '#e0c76e', img: 'assets/cakes/Gugelhupf.webp' },
  { id: 'tiramisu',         name: 'TIRAMISU',                 meaning: 'Indulgence', occasion: "Translation: 'Pick Me Up'", bg: '#7A4828', img: 'assets/cakes/Tiramisu.webp' },
  { id: 'victoria_sponge',  name: 'VICTORIA SPONGE',          meaning: 'Simplicity', occasion: 'Origin: United Kingdom', bg: '#e6dca8', img: 'assets/cakes/Victoria Sponge.webp' },
  { id: 'koffiekoek',       name: 'KOFFIEKOEK',               meaning: 'Craft',      occasion: 'Origin: Belgium', bg: '#C87840', img: 'assets/cakes/Koffiekoek.webp' },
  { id: 'ny_crumb',         name: 'NY CRUMB CAKE',            meaning: 'Nostalgia',  occasion: 'Origin: United States', bg: '#D0906A', img: 'assets/cakes/NY Crumb Cake.webp'},
  { id: 'kaffebrod',        name: 'SWEDISH KAFFEBRÖD',        meaning: 'Heritage',   occasion: 'Origin: Sweden', bg: '#9B5878', img: 'assets/cakes/Swedish Cardamom Kaffebrod.webp'},
  { id: 'stollen',          name: 'STOLLEN',                  meaning: 'Festivity',  occasion: 'Origin: Germany', bg: '#d48a6a', img: 'assets/cakes/Stollen.webp'},
  { id: 'babka',            name: 'BABKA',                    meaning: 'Complexity', occasion: 'Origin: Eastern Europe', bg: '#6B3820', img: 'assets/cakes/babka.webp'},
  { id: 'gateau_aux_pommes',name: 'APPLE GÂTEAU',             meaning: 'Rustic',     occasion: 'Origin: France', bg: '#C87858', img: 'assets/cakes/Gateau aux Pommes.webp'},
  { id: 'kasutera',         name: 'KASUTERA',                 meaning: 'Serenity',   occasion: 'Origin: Japan', bg: '#E0C040', img: 'assets/cakes/Kasutera.webp'},
];

SB.getCakeById = (id) => SB.CAKES.find(c => c.id === id);

// Watercolor blob background SVG (returns <svg> string)
SB._blobSeed = 1;
SB.renderBlob = function(color, size) {
  size = size || 110;
  const c = color;
  const seed = (SB._blobSeed++) % 30;
  const uid = 'bf' + seed + Math.floor(Math.random()*999);
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" style="position:absolute;inset:0;pointer-events:none">
    <defs>
      <filter id="${uid}" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="turbulence" baseFrequency="0.045" numOctaves="3" seed="${seed}" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>
    <circle cx="50" cy="50" r="39" fill="${c}" filter="url(#${uid})" opacity="0.82"/>
  </svg>`;
};

// Full cake card: blob background + real cake image
SB.renderCakeCard = function(id, sizeCls) {
  sizeCls = sizeCls || 'cake-size-md';
  const cake = SB.getCakeById(id);
  if (!cake) return '';
  return `<div class="cake-card-wrap ${sizeCls}">
    <img src="${cake.img}" class="cake-card-img" draggable="false" />
  </div>`;
};

// Decorative greenery/leaf for the arrangement
SB.leafSVG = function(w, h, color, rotate) {
  color = color || '#5A7A40';
  rotate = rotate || 0;
  return `<svg width="${w}" height="${h}" viewBox="0 0 40 120" fill="none" style="transform:rotate(${rotate}deg)">
    <path d="M20 120 C20 80 5 60 8 30 C10 10 20 0 20 0 C20 0 30 10 32 30 C35 60 20 80 20 120Z" fill="${color}" opacity="0.75"/>
    <path d="M20 100 C15 70 10 55 12 35" stroke="rgba(0,0,0,0.15)" stroke-width="1.2"/>
  </svg>`;
};
