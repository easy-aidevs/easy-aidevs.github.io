// ── Theme (run immediately to avoid flash) ──────────────────────────────────
(function () {
  const t = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', t);
})();

// ── Language + Theme controls ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  // Apply saved / detected language (i18n.js must be loaded first)
  applyLang(getLang());

  // Theme toggle
  const btnTheme = document.getElementById('btnTheme');
  if (btnTheme) btnTheme.addEventListener('click', function () {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Language dropdown toggle
  const btnLang = document.getElementById('btnLang');
  const dropdown = document.getElementById('langDropdown');
  if (btnLang && dropdown) {
    btnLang.addEventListener('click', function (e) {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });
    dropdown.querySelectorAll('[data-lang]').forEach(function (item) {
      item.addEventListener('click', function () {
        applyLang(item.dataset.lang);
        dropdown.classList.remove('open');
      });
    });
    document.addEventListener('click', function () {
      dropdown.classList.remove('open');
    });
  }

  // Platform tabs (iOS / Android)
  var currentPlatform = localStorage.getItem('platform') || 'ios';
  initPlatformTabs(currentPlatform);

  updateThemeBtn();
});

// ── Platform tab switching ────────────────────────────────────────────────────
function initPlatformTabs(platform) {
  var tabs = document.querySelectorAll('.platform-tab');
  if (!tabs.length) return;
  tabs.forEach(function (tab) {
    tab.classList.toggle('active', tab.dataset.platform === platform);
    tab.addEventListener('click', function () {
      var p = tab.dataset.platform;
      localStorage.setItem('platform', p);
      tabs.forEach(function (t) { t.classList.toggle('active', t.dataset.platform === p); });
      updateScreenshots(getLang(), p);
    });
  });
  updateScreenshots(getLang(), platform);
}

function updateScreenshots(lang, platform) {
  var folder = SS_FOLDER[lang] || 'en-US';
  var prefix = platform === 'ios'
    ? '/img/screenshots/ios/' + folder + '/'
    : '/img/screenshots/' + folder + '/';
  document.querySelectorAll('[data-screenshot]').forEach(function (img) {
    img.src = prefix + img.dataset.screenshot;
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeBtn();
}

function updateThemeBtn() {
  const btnTheme = document.getElementById('btnTheme');
  if (btnTheme) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btnTheme.textContent = isDark ? '☀' : '☽';
    btnTheme.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
}
