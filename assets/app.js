/* ==========================================================
   LE DATASHARD DE L'EDGERUNNER — scripts partagés
   ========================================================== */
(function () {
  'use strict';

  /* ---- Horloge HUD : on garde l'heure réelle, mais l'année 2045 ---- */
  const clock = document.querySelector('[data-clock]');
  if (clock) {
    const tick = () => {
      const d = new Date();
      const p = (n) => String(n).padStart(2, '0');
      clock.textContent = `${p(d.getDate())}.${p(d.getMonth() + 1)}.2045 // ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---- Sommaire : surligne la section visible ---- */
  const tocLinks = Array.from(document.querySelectorAll('.toc a[href^="#"]'));
  if (tocLinks.length && 'IntersectionObserver' in window) {
    const map = new Map();
    tocLinks.forEach((a) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) map.set(target, a);
    });
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove('active'));
          const link = map.get(e.target);
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    map.forEach((_, el) => obs.observe(el));
  }

  /* ---- Filtres génériques ----
     <div data-filter-scope>
       <input class="search" data-filter-search>
       <button class="chip-btn" data-filter-chip="tag">…</button>
       <div data-filter-item data-tags="tag1 tag2">…</div>
       <p class="empty-msg hidden" data-filter-empty>…</p>
     </div> */
  document.querySelectorAll('[data-filter-scope]').forEach((scope) => {
    const input = scope.querySelector('[data-filter-search]');
    const chips = Array.from(scope.querySelectorAll('[data-filter-chip]'));
    const items = Array.from(scope.querySelectorAll('[data-filter-item]'));
    const empty = scope.querySelector('[data-filter-empty]');
    let active = 'all';

    const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

    const apply = () => {
      const q = input ? norm(input.value.trim()) : '';
      let shown = 0;
      items.forEach((it) => {
        const tags = (it.dataset.tags || '').split(/\s+/);
        const okTag = active === 'all' || tags.includes(active);
        const okText = !q || norm(it.textContent).includes(q);
        const show = okTag && okText;
        it.classList.toggle('hidden', !show);
        if (show) shown++;
      });
      if (empty) empty.classList.toggle('hidden', shown > 0);
    };

    chips.forEach((c) => c.addEventListener('click', () => {
      active = c.dataset.filterChip;
      chips.forEach((x) => x.classList.toggle('on', x === c));
      apply();
    }));
    if (input) input.addEventListener('input', apply);
  });

  /* ---- Lanceur de dés (test de compétence) ---- */
  const dice = document.querySelector('[data-dice]');
  if (dice) {
    const $ = (s) => dice.querySelector(s);
    const d10 = () => 1 + Math.floor(Math.random() * 10);
    $('[data-roll]').addEventListener('click', () => {
      const stat = parseInt($('[name=stat]').value, 10) || 0;
      const skill = parseInt($('[name=skill]').value, 10) || 0;
      const mod = parseInt($('[name=mod]').value, 10) || 0;
      const dv = parseInt($('[name=dv]').value, 10) || 0;

      const first = d10();
      let extra = 0;
      let note = '';
      let cls = '';
      if (first === 10) {
        extra = d10();
        note = `Succès critique : 10 + relance ${extra}`;
        cls = 'crit';
      } else if (first === 1) {
        extra = -d10();
        note = `Échec critique : 1 − relance ${-extra}`;
        cls = 'ko';
      }
      const die = first + extra;
      const total = stat + skill + mod + die;
      const success = total > dv;

      const out = $('[data-out]');
      out.innerHTML = '';
      const big = document.createElement('div');
      big.className = 'big';
      big.textContent = total;
      const verdict = document.createElement('div');
      verdict.className = 'verdict ' + (success ? 'ok' : 'ko');
      verdict.textContent = success ? `▲ RÉUSSITE (SD ${dv})` : `▼ ÉCHEC (SD ${dv})`;
      const detail = document.createElement('div');
      detail.className = 'detail';
      detail.textContent = `CARAC ${stat} + COMP ${skill}${mod ? ` + MOD ${mod}` : ''} + d10 ${die}`;
      out.append(big, verdict, detail);
      if (note) {
        const n = document.createElement('div');
        n.className = 'detail ' + cls;
        n.textContent = note;
        out.appendChild(n);
      }
    });
  }

  /* ---- Séquence de démarrage (accueil) ---- */
  const boot = document.querySelector('[data-boot]');
  if (boot) {
    const lines = [
      ['', '> insertion du datashard……………… OK'],
      ['', '> déchiffrement (clé : CHOOMBA-45)……… OK'],
      ['warn', '> avertissement : signature NetWatch détectée à proximité'],
      ['err', '> contournement du Blackwall : refusé — mode hors-ligne'],
      ['', '> archives locales montées. Bienvenue, edgerunner.'],
    ];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let i = 0;
    const next = () => {
      if (i >= lines.length) return;
      const [cls, txt] = lines[i++];
      const el = document.createElement('div');
      el.className = 'line ' + cls;
      boot.appendChild(el);
      if (reduce) { el.textContent = txt; next(); return; }
      let c = 0;
      const type = setInterval(() => {
        el.textContent = txt.slice(0, ++c);
        if (c >= txt.length) { clearInterval(type); setTimeout(next, 140); }
      }, 12);
    };
    next();
  }
})();
