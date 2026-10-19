// Tab panels: click or use arrow keys to switch.
document.querySelectorAll('[data-tabs]').forEach((tabs) => {
  const buttons = [...tabs.querySelectorAll('[role="tab"]')];
  const select = (btn) => {
    buttons.forEach((b) => {
      const on = b === btn;
      b.setAttribute('aria-selected', on);
      b.tabIndex = on ? 0 : -1;
      document.getElementById(b.getAttribute('aria-controls')).hidden = !on;
    });
  };
  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => select(btn));
    btn.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      const next = buttons[(i + d + buttons.length) % buttons.length];
      select(next);
      next.focus();
    });
  });
});

// Copy-to-clipboard for the BibTeX block.
document.querySelectorAll('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const text = document.getElementById(btn.dataset.copy).textContent;
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = 'Copied';
    } catch {
      btn.textContent = 'Press ⌘C';
      const range = document.createRange();
      range.selectNodeContents(document.getElementById(btn.dataset.copy));
      getSelection().removeAllRanges();
      getSelection().addRange(range);
    }
    setTimeout(() => { btn.textContent = 'Copy'; }, 1800);
  });
});
