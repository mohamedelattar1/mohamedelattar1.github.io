/* ============================================================
   Portfolio interactions
   ============================================================ */

/* --- cursor glow --- */
const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

/* --- reveal on scroll --- */
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* --- nav shadow on scroll --- */
window.addEventListener('scroll', () => {
  document.querySelector('.nav').style.boxShadow = scrollY > 20 ? '0 15px 50px rgba(0,0,0,.2)' : 'none';
}, { passive: true });

/* --- scroll progress bar --- */
const progressBar = document.querySelector('.scroll-progress');
const setProgress = () => {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  if (progressBar) progressBar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
};
window.addEventListener('scroll', setProgress, { passive: true });
setProgress();

/* --- scrollspy: highlight the nav link of the section in view --- */
const spyLinks = [...document.querySelectorAll('nav a[href^="#"]')];
const spySections = spyLinks
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);
if (spySections.length) {
  let ticking = false;
  const spy = () => {
    const y = scrollY + innerHeight * .35;
    let current = null;
    spySections.forEach(s => { if (s.offsetTop <= y) current = s; });
    spyLinks.forEach(a => a.classList.toggle('active', !!current && a.getAttribute('href') === '#' + current.id));
  };
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; spy(); });
  }, { passive: true });
  spy();
}

/* --- count-up stats (dashboard numbers) --- */
const easeOut = t => 1 - Math.pow(1 - t, 3);
const animateCount = el => {
  const m = el.textContent.match(/^(\D*?)([\d,]+)(.*)$/);
  if (!m) return;
  const [, prefix, digits, suffix] = m;
  const target = parseInt(digits.replace(/,/g, ''), 10);
  const duration = 1400, start = performance.now();
  const step = now => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = prefix + Math.round(easeOut(p) * target).toLocaleString('en-US') + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const statObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    animateCount(entry.target);
    statObserver.unobserve(entry.target);
  }
}), { threshold: .6 });
document.querySelectorAll('.stats strong').forEach(el => statObserver.observe(el));

/* --- charts grow in (hero mini-chart + revenue bars) --- */
const chartObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    [...entry.target.children].forEach((bar, i) => {
      setTimeout(() => { bar.style.height = bar.dataset.h; }, 120 + i * 70);
    });
    chartObserver.unobserve(entry.target);
  }
}), { threshold: .35 });
document.querySelectorAll('.mini-chart').forEach(chart => {
  [...chart.children].forEach(bar => {
    const h = bar.getBoundingClientRect().height > 0
      ? getComputedStyle(bar).height
      : bar.style.height;
    bar.dataset.h = h;
    bar.style.height = '0';
  });
  chartObserver.observe(chart);
});

/* --- mobile hamburger menu --- */
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenu = () => {
  if (!mobileMenu || !navToggle) return;
  mobileMenu.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
};
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu.addEventListener('click', e => {
    if (e.target.closest('a')) closeMenu();
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ============================================================
   SCROLL JOURNEY — scrub-driven scenes (hero boot, parallax,
   dashboard assembly). Transform/opacity only. Skipped for
   reduced-motion users and small screens.
   ============================================================ */
(() => {
  const scrubOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    && window.innerWidth > 900;
  if (!scrubOK) {
    // graceful static fallback: 4th terminal line active, bars full height
    document.querySelectorAll('.terminal-line')[3]?.classList.add('active');
    document.querySelectorAll('.graph .bars i').forEach(b => b.style.height = b.style.height || '50%');
    return;
  }

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const hero = document.querySelector('.hero');
  const card = document.querySelector('.hero-card');
  const lines = [...document.querySelectorAll('.terminal-line')];
  const orbitA = document.querySelector('.orbit-a');
  const orbitB = document.querySelector('.orbit-b');
  const grid = document.querySelector('.hero-grid');
  const tagOne = document.querySelector('.tag-one');
  const tagTwo = document.querySelector('.tag-two');
  const dash = document.querySelector('.dashboard');
  const bars = [...document.querySelectorAll('.graph .bars i')];
  const sideItems = [...document.querySelectorAll('.dashboard aside > *')];
  const statBlocks = [...document.querySelectorAll('.stats > div')];
  const winBar = document.querySelector('.window-bar');

  // remember bar target heights (inline %), start collapsed for the scrub
  const barTargets = bars.map(b => parseFloat(b.style.height) || 50);
  bars.forEach(b => b.style.height = '0%');
  sideItems.forEach(el => el.style.opacity = '0');
  statBlocks.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(14px)'; });
  if (winBar) winBar.style.opacity = '0';
  lines.forEach(l => l.classList.remove('active'));

  let ticking = false;
  const scrub = () => {
    ticking = false;
    const vh = window.innerHeight;

    /* --- scene 1: hero boot sequence --- */
    if (hero) {
      const p = clamp(window.scrollY / (hero.offsetHeight * 0.85));
      lines.forEach((l, i) => l.classList.toggle('active', p >= i * 0.22));
      if (card) card.style.transform = `rotate(${(5 - 6.5 * p).toFixed(2)}deg)`;
      if (orbitA) orbitA.style.transform = `rotate(${(35 + 22 * p).toFixed(1)}deg) scaleY(.4)`;
      if (orbitB) orbitB.style.transform = `rotate(${(-35 - 16 * p).toFixed(1)}deg) scaleY(.4)`;
      if (grid) grid.style.transform = `translateY(${(p * 46).toFixed(1)}px)`;
      if (tagOne) tagOne.style.transform = `translateY(${(-p * 34).toFixed(1)}px)`;
      if (tagTwo) tagTwo.style.transform = `translateY(${(p * 26).toFixed(1)}px)`;
    }

    /* --- scene 2: meridian dashboard assembly --- */
    if (dash) {
      const r = dash.getBoundingClientRect();
      const q = clamp((vh * 0.88 - r.top) / (vh * 0.55));
      if (winBar) winBar.style.opacity = String(clamp(q * 4));
      sideItems.forEach((el, i) => {
        el.style.opacity = String(clamp((q - 0.10 - i * 0.07) * 4));
      });
      statBlocks.forEach((el, i) => {
        const s = clamp((q - 0.28 - i * 0.12) * 3.2);
        el.style.opacity = String(s);
        el.style.transform = `translateY(${(14 * (1 - s)).toFixed(1)}px)`;
      });
      bars.forEach((b, i) => {
        const f = clamp((q - 0.35 - i * 0.055) * 2.6);
        b.style.height = (barTargets[i] * f).toFixed(1) + '%';
      });
    }
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(scrub); }
  }, { passive: true });
  scrub();
})();

/* ============================================================
   MERIDIAN PRODUCT TOUR — real screenshots, tabs + auto-cycle
   ============================================================ */
(() => {
  const stage = document.getElementById('tourStage');
  const tabsEl = document.getElementById('tourTabs');
  if (!stage || !tabsEl) return;

  const TOUR = [
    { file: 'dashboard',  label: 'Dashboard',  title: 'meridian / admin dashboard' },
    { file: 'pos',        label: 'POS',        title: 'meridian / point of sale' },
    { file: 'pos-arabic', label: 'POS Arabic', title: 'meridian / pos — arabic rtl' },
    { file: 'inventory',  label: 'Inventory',  title: 'meridian / inventory' },
    { file: 'analytics',  label: 'Analytics',  title: 'meridian / analytics' },
    { file: 'reports',    label: 'Reports',    title: 'meridian / reports' },
    { file: 'expiry',     label: 'Expiry',     title: 'meridian / expiry control' },
    { file: 'dark-mode',  label: 'Dark mode',  title: 'meridian / dark mode' },
  ];
  const countEl = document.getElementById('tourCount');
  const titleEl = document.getElementById('tourTitle');
  const pad = n => String(n + 1).padStart(2, '0');

  const imgs = TOUR.map((t, i) => {
    const img = document.createElement('img');
    img.src = 'assets/shots/' + t.file + '.webp';
    img.alt = 'Meridian — ' + t.label;
    img.loading = i === 0 ? 'eager' : 'lazy';
    img.decoding = 'async';
    stage.appendChild(img);
    return img;
  });
  const btns = TOUR.map((t, i) => {
    const b = document.createElement('button');
    b.innerHTML = '<i>' + pad(i) + '</i>' + t.label;
    b.addEventListener('click', () => { goTo(i); restart(); });
    tabsEl.appendChild(b);
    return b;
  });

  let idx = -1, timer = null, inView = false, hovering = false;

  function goTo(i) {
    if (i === idx) return;
    idx = i;
    imgs.forEach((im, k) => im.classList.toggle('active', k === idx));
    btns.forEach((b, k) => b.classList.toggle('active', k === idx));
    if (countEl) countEl.textContent = pad(idx) + ' / ' + pad(TOUR.length - 1);
    if (titleEl) titleEl.textContent = TOUR[idx].title;
  }
  function restart() {
    clearInterval(timer);
    timer = setInterval(() => { if (inView && !hovering) goTo((idx + 1) % TOUR.length); }, 5000);
  }

  goTo(0);
  restart();
  new IntersectionObserver(es => es.forEach(e => { inView = e.isIntersecting; }), { threshold: .2 }).observe(stage);
  stage.addEventListener('pointerenter', () => { hovering = true; });
  stage.addEventListener('pointerleave', () => { hovering = false; });
})();
