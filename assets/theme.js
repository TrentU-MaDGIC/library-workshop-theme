(function() {
  const key = 'theme-preference';
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  function setTheme(mode) {
    document.body.dataset.theme = mode; // 'light' | 'dark' | 'auto'
    localStorage.setItem(key, mode);
  }

  const current = localStorage.getItem(key) || 'auto';
  setTheme(current);

  btn.addEventListener('click', () => {
    const next = (document.body.dataset.theme === 'light') ? 'dark'
               : (document.body.dataset.theme === 'dark') ? 'auto'
               : 'light';
    setTheme(next);
    btn.title = `Theme: ${next}`;
  });

  // Apply CSS vars override when manual mode is used
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const apply = () => {
    const mode = document.body.dataset.theme;
    document.body.classList.toggle('theme-auto', mode === 'auto');
    document.body.classList.toggle('theme-dark', mode === 'dark');
    document.body.classList.toggle('theme-light', mode === 'light');
  };
  apply();
  mq.addEventListener('change', apply);
})();
