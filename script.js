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
document.querySelectorAll('.mini-chart, .graph .bars').forEach(chart => {
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
