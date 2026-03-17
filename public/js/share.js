// share.js
(function() {
  const selection = SB.state.get('selection', []);
  const card      = SB.state.get('card', {});

  if (!selection || selection.length === 0 || !card.to) {
    window.location.href = 'pick.html';
    return;
  }

  // Mini preview: show a row of selected cakes (unique, max 6)
  const preview = document.getElementById('preview-arrange');
  const unique = [...new Set(selection)].slice(0, 6);
  preview.innerHTML = unique.map(id =>
    `<div style="margin: 0 -4px; transform: rotate(${Math.random()*10-5}deg)">${SB.renderCakeCard(id, 72)}</div>`
  ).join('');

  // Generate shareable URL
  const data = { selection, card };
  const encoded = SB.encodeBox(data);
  const u = new URL(window.location.href);
  const path = u.pathname.substring(0, u.pathname.lastIndexOf('/') + 1);
  const url = u.origin + path + 'receive.html#box=' + encoded;

  document.getElementById('share-url').textContent = url;

  window.copyLink = function() {
    navigator.clipboard.writeText(url).then(() => {
      const el = document.getElementById('copy-confirm');
      el.textContent = '✓ Copied — paste it anywhere';
      setTimeout(() => { el.textContent = ''; }, 3000);
    }).catch(() => {
      // fallback: select text
      const box = document.getElementById('share-url');
      const range = document.createRange();
      range.selectNode(box);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      const el = document.getElementById('copy-confirm');
      el.textContent = '✓ Copied!';
      setTimeout(() => { el.textContent = ''; }, 3000);
    });
  };
})();
