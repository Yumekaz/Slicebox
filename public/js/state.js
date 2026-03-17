// state.js — shared state between pages
window.SB = window.SB || {};

SB.state = {
  set(key, val) {
    sessionStorage.setItem('sb_' + key, JSON.stringify(val));
  },
  get(key, fallback) {
    try {
      const v = sessionStorage.getItem('sb_' + key);
      return v !== null ? JSON.parse(v) : (fallback !== undefined ? fallback : null);
    } catch { return fallback !== undefined ? fallback : null; }
  },
  clear() {
    Object.keys(sessionStorage)
      .filter(k => k.startsWith('sb_'))
      .forEach(k => sessionStorage.removeItem(k));
  }
};

SB.encodeBox = (data) => {
  try { return btoa(encodeURIComponent(JSON.stringify(data))); }
  catch { return ''; }
};

SB.decodeBox = (str) => {
  try { return JSON.parse(decodeURIComponent(atob(str))); }
  catch { return null; }
};

SB.getParam = (name) => new URLSearchParams(window.location.search).get(name);
