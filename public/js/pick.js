// pick.js
(function() {


  const MIN = 6, MAX = 10;
  // selection: array of ids (can repeat)
  let selection = [];

  const grid     = document.getElementById('cake-grid');
  const pillsList= document.getElementById('pills-list');
  const countEl  = document.getElementById('pills-count');
  const nextBtn  = document.getElementById('next-btn');

  // Build grid
  SB.CAKES.forEach(cake => {
    const item = document.createElement('div');
    item.className = 'cake-item';
    item.dataset.id = cake.id;
    item.innerHTML = `
      <div class="tooltip">
        <div class="tooltip-name">${cake.name}</div>
        <div class="tooltip-meaning">${cake.meaning}</div>
        <div class="tooltip-occ">${cake.occasion}</div>
      </div>
      <div class="cake-visual" id="vis-${cake.id}">
        ${SB.renderCakeCard(cake.id)}
      </div>
      <div class="cake-label">${cake.name}</div>
    `;
    item.addEventListener('click', () => handleClick(cake.id));
    grid.appendChild(item);
  });

  function handleClick(id) {
    if (selection.length >= MAX && countOf(id) === 0) return; // already at max
    if (selection.length >= MAX) {
      // remove one of this id to toggle off if already at max
      const idx = selection.lastIndexOf(id);
      if (idx !== -1) { selection.splice(idx, 1); }
    } else {
      selection.push(id);
    }
    update();
  }

  // Click again on same cake: add another (up to MAX)
  // Actually: first click adds, clicking again while at MAX removes
  // Let's re-think: click = +1, right-click / shift+click = -1
  // Simple: left click always adds one, if at MAX do nothing
  // But we need a way to remove... Let's do: if count > 0 and we're at MAX, clicking removes one
  // Actually digibouquet just adds per click. Let's allow clicking to add, and clicking badge removes.
  
  // Override: click item → add one (if under max)
  // Click on badge → remove one
  document.querySelectorAll('.cake-item').forEach(item => {
    item.addEventListener('click', (e) => {
      // handled above already - but re-bind properly
    });
  });

  // Re-bind properly
  grid.innerHTML = '';
  SB.CAKES.forEach(cake => {
    const item = document.createElement('div');
    item.className = 'cake-item';
    item.dataset.id = cake.id;
    item.innerHTML = `
      <div class="tooltip">
        <div class="tooltip-name">${cake.name}</div>
        <div class="tooltip-meaning">${cake.meaning}</div>
        <div class="tooltip-occ">${cake.occasion}</div>
      </div>
      <div class="cake-visual" id="vis-${cake.id}">
        ${SB.renderCakeCard(cake.id)}
      </div>
      <div class="cake-label">${cake.name}</div>
    `;

    // Left click = add
    item.addEventListener('click', (e) => {
      if (e.target.closest('.cake-badge')) return; // handled by badge
      if (selection.length < MAX) {
        selection.push(cake.id);
        update();
      }
    });

    grid.appendChild(item);
  });

  function countOf(id) { return selection.filter(x => x === id).length; }

  function update() {
    // Update badges
    SB.CAKES.forEach(cake => {
      const vis = document.getElementById('vis-' + cake.id);
      if (!vis) return;
      let badge = vis.querySelector('.cake-badge');
      const n = countOf(cake.id);
      if (n > 0) {
        if (!badge) {
          badge = document.createElement('div');
          badge.className = 'cake-badge';
          badge.title = 'Click to remove one';
          badge.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = selection.lastIndexOf(cake.id);
            if (idx !== -1) { selection.splice(idx, 1); update(); }
          });
          vis.appendChild(badge);
        }
        badge.textContent = n;
      } else {
        if (badge) badge.remove();
      }
    });

    // Update pills
    pillsList.innerHTML = '';
    const counts = {};
    selection.forEach(id => { counts[id] = (counts[id] || 0) + 1; });
    Object.entries(counts).forEach(([id, n]) => {
      const cake = SB.getCakeById(id);
      const pill = document.createElement('div');
      pill.className = 'pill';
      pill.textContent = `${cake.name} x${n}`;
      pill.style.cursor = 'pointer';
      pill.title = 'Click to remove one';
      pill.addEventListener('click', () => {
        const idx = selection.lastIndexOf(id);
        if (idx !== -1) { selection.splice(idx, 1); update(); }
      });
      pillsList.appendChild(pill);
    });

    // Count
    countEl.textContent = `${selection.length} / ${MAX}`;

    // Next button
    if (selection.length >= MIN) {
      nextBtn.classList.remove('btn-disabled');
    } else {
      nextBtn.classList.add('btn-disabled');
    }

    // Save state
    SB.state.set('selection', selection);
  }

  // Save selection before navigating to arrange
  nextBtn.addEventListener('click', (e) => {
    if (selection.length < MIN) { e.preventDefault(); return; }
    SB.state.set('selection', selection);
  });

  update();
})();
