// arrange.js — compose selected cakes on the wrapper image
(function() {
  const selection = SB.state.get('selection', []);


  if (!selection || selection.length === 0) {
    window.location.href = 'pick.html';
    return;
  }

  // Restore back link
  const backLink = document.getElementById('back-link');
  if (backLink) backLink.href = 'pick.html';
  const backBtn = document.getElementById('back-btn');
  if (backBtn) backBtn.href = 'pick.html';

  const container = document.getElementById('arrange-container');

  // wrapper image dimensions
  const WRAP_W = 2574;
  const WRAP_H = 1664;

  const LAYOUTS = {
    6: [
      [0.50, 0.45, 0,   1.1],  // Back Center
      [0.37, 0.49, -15, 1.15], // Mid Left
      [0.63, 0.49, 12,  1.15], // Mid Right
      [0.28, 0.55, -20, 1.25], // Front Left
      [0.72, 0.55, 18,  1.25], // Front Right
      [0.50, 0.60, 5,   1.3]   // Front Center
    ],
    7: [
      [0.43, 0.45, -10, 1.1],  // Back Left
      [0.57, 0.45, 8,   1.1],  // Back Right
      [0.33, 0.50, -18, 1.18],  // Mid Left
      [0.67, 0.50, 16,  1.18],  // Mid Right
      [0.50, 0.54, 0,   1.25],  // Center
      [0.37, 0.61, -12, 1.35],  // Front Left
      [0.63, 0.61, 14,  1.35]   // Front Right
    ],
    8: [
      [0.50, 0.44, 0,   1.1],  // Back Center
      [0.36, 0.47, -12, 1.12],  // Mid-Back Left
      [0.64, 0.47, 12,  1.12],  // Mid-Back Right
      [0.26, 0.53, -24, 1.2],  // Mid Left
      [0.74, 0.53, 22,  1.2],  // Mid Right
      [0.42, 0.56, -8,  1.25],  // Front-Mid Left
      [0.58, 0.56, 10,  1.25],  // Front-Mid Right
      [0.50, 0.63, 2,   1.35]   // Front Center
    ],
    9: [
      [0.50, 0.43, 0,   1.1],  // Back Center
      [0.36, 0.46, -14, 1.12],  // Mid-Back Left
      [0.64, 0.46, 12,  1.12],  // Mid-Back Right
      [0.25, 0.51, -26, 1.18],  // Mid Left
      [0.75, 0.51, 24,  1.18],  // Mid Right
      [0.43, 0.54, -8,  1.25],  // Center Left
      [0.57, 0.54, 6,   1.25],  // Center Right
      [0.37, 0.61, -16, 1.35],  // Front Left
      [0.63, 0.61, 16,  1.35]   // Front Right
    ],
    10: [
      [0.43, 0.43, -6,  1.08],  // Back Left
      [0.57, 0.43, 6,   1.08],  // Back Right
      [0.33, 0.46, -16, 1.12],  // Mid-Back Left
      [0.67, 0.46, 16,  1.12],  // Mid-Back Right
      [0.23, 0.52, -28, 1.2],  // Mid Left
      [0.77, 0.52, 28,  1.2],  // Mid Right
      [0.42, 0.54, -10, 1.25],  // Center Left
      [0.58, 0.54, 10,  1.25],  // Center Right
      [0.36, 0.61, -18, 1.35],  // Front Left
      [0.64, 0.61, 18,  1.35]   // Front Right
    ]
  };

  const n = Math.min(Math.max(selection.length, 6), 10);
  const layout = LAYOUTS[n];
  const baseSlice = 850; // Massively increased to ensure overlap!

  let svg = `<svg viewBox="0 0 ${WRAP_W} ${WRAP_H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">
    <defs>
      <filter id="slice-shadow" x="-30%" y="-30%" width="160%" height="180%">
        <feDropShadow dx="0" dy="18" stdDeviation="15" flood-color="rgba(0,0,0,0.3)"/>
      </filter>
    </defs>

    <image href="assets/wrapper.webp" x="0" y="0" width="${WRAP_W}" height="${WRAP_H}" preserveAspectRatio="xMidYMid meet"/>
  `;

  let placed = [];
  for(let i=0; i<n; i++) {
    placed.push({
      id: selection[i],
      pos: layout[i]
    });
  }
  // Sort by Y-coordinate so items further back (smaller y) are drawn first, layering correctly!
  placed.sort((a, b) => a.pos[1] - b.pos[1]);

  for (let i = 0; i < placed.length; i++) {
    const {id, pos} = placed[i];
    const [xPct, yPct, rot, scale] = pos;
    const sz = Math.round(baseSlice * scale);
    const cx = Math.round(WRAP_W * xPct);
    const cy = Math.round(WRAP_H * yPct);

    const cake = SB.getCakeById(id);
    if (cake) {
      const w = sz;
      const h = Math.round(sz * 1.0); // Natural bounds
      // Add standard translation and rotation plus the shadow!
      svg += `
        <g transform="translate(${cx - w / 2},${cy - h / 2}) rotate(${rot} ${w / 2} ${h / 2})" filter="url(#slice-shadow)">
          <image href="${cake.img}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet" />
        </g>
      `;
    }
  }

  svg += `</svg>`;

  container.innerHTML = svg;
})();
