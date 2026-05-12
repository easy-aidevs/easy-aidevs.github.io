// ── Theme (run immediately to avoid flash) ──────────────────────────────────
(function () {
  const t = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', t);
})();

// ── Language + Theme controls ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  const savedLang = localStorage.getItem('lang') ||
    (navigator.language.startsWith('zh') ? 'zh' : 'en');
  setLang(savedLang);

  const btnLang = document.getElementById('btnLang');
  if (btnLang) btnLang.addEventListener('click', function () {
    const next = document.body.classList.contains('lang-zh') ? 'en' : 'zh';
    setLang(next);
  });

  const btnTheme = document.getElementById('btnTheme');
  if (btnTheme) btnTheme.addEventListener('click', function () {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  updateBtns();
});

function setLang(lang) {
  document.body.classList.remove('lang-zh', 'lang-en');
  document.body.classList.add('lang-' + lang);
  localStorage.setItem('lang', lang);
  updateBtns();
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateBtns();
}

function updateBtns() {
  const btnLang = document.getElementById('btnLang');
  const btnTheme = document.getElementById('btnTheme');
  if (btnLang) {
    btnLang.textContent = document.body.classList.contains('lang-zh') ? 'EN' : '中文';
  }
  if (btnTheme) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btnTheme.textContent = isDark ? '☀' : '☽';
    btnTheme.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
}
