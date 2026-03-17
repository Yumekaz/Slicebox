// card.js
(function() {
  const selection = SB.state.get('selection', []);


  if (!selection || selection.length === 0) {
    window.location.href = 'pick.html';
    return;
  }

  // Render flanking cake illustrations
  const unique = [...new Set(selection)];
  const leftIds  = unique.slice(0, 3);
  const rightIds = unique.slice(3, 6).length > 0 ? unique.slice(3, 6) : unique.slice(0, 3).reverse();

  function renderSide(ids, el) {
    if (!el) return;
    ids.forEach((id, i) => {
      const wrap = document.createElement('div');
      wrap.style.cssText = `transform: rotate(${[-8, 4, -5][i] || 0}deg); margin-bottom:6px;`;
      wrap.innerHTML = SB.renderCakeCard(id, 'cake-size-sm');
      el.appendChild(wrap);
    });
  }

  renderSide(leftIds,  document.getElementById('sides-left'));
  renderSide(rightIds, document.getElementById('sides-right'));

  // Restore saved card data if coming back
  const saved = SB.state.get('card', {});
  const inpTo   = document.getElementById('inp-to');
  const inpMsg  = document.getElementById('inp-msg');
  const inpFrom = document.getElementById('inp-from');
  const nextBtn = document.getElementById('next-btn');

  if (saved.to)   inpTo.value   = saved.to;
  if (saved.msg)  inpMsg.value  = saved.msg;
  if (saved.from) inpFrom.value = saved.from;

  function validate() {
    const ok = inpTo.value.trim() && inpMsg.value.trim() && inpFrom.value.trim();
    nextBtn.classList.toggle('btn-disabled', !ok);
    return ok;
  }

  [inpTo, inpMsg, inpFrom].forEach(el => el.addEventListener('input', validate));
  validate();

  window.goNext = function() {
    if (!validate()) return;
    SB.state.set('card', {
      to:   inpTo.value.trim(),
      msg:  inpMsg.value.trim(),
      from: inpFrom.value.trim(),
    });
    window.location.href = 'share.html';
  };
})();
