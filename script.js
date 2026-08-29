const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (window.lucide) window.lucide.createIcons();

const header = document.getElementById('siteHeader');
const progress = document.querySelector('.scroll-progress');
const setScrollState = () => {
  const root = document.documentElement;
  const max = root.scrollHeight - root.clientHeight;
  header?.classList.toggle('scrolled', scrollY > 16);
  if (progress) progress.style.width = `${max ? (root.scrollTop / max) * 100 : 0}%`;
};
window.addEventListener('scroll', setScrollState, { passive: true });
setScrollState();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(node => revealObserver.observe(node));

const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = () => {
  mobileMenu?.classList.remove('open');
  mobileMenu?.setAttribute('aria-hidden', 'true');
  menuButton?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
  if (window.lucide) {
    menuButton.innerHTML = '<i data-lucide="menu"></i>';
    window.lucide.createIcons({ nodes: [menuButton] });
  }
};
menuButton?.addEventListener('click', () => {
  const open = !mobileMenu.classList.contains('open');
  mobileMenu.classList.toggle('open', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  menuButton.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
  if (window.lucide) {
    menuButton.innerHTML = `<i data-lucide="${open ? 'x' : 'menu'}"></i>`;
    window.lucide.createIcons({ nodes: [menuButton] });
  }
});
mobileMenu?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
window.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

const navLinks = [...document.querySelectorAll('.desktop-nav a[href^="#"]')];
const navSections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const updateActiveLink = () => {
  const marker = scrollY + innerHeight * .38;
  let current = navSections[0];
  navSections.forEach(section => { if (section.offsetTop <= marker) current = section; });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current?.id}`));
};
window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
  const hero = document.querySelector('.hero');
  const portrait = document.querySelector('.hero-portrait');
  hero?.addEventListener('pointermove', event => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    portrait.style.transform = `translate(${x * -10}px, ${y * -8}px)`;
  });
  hero?.addEventListener('pointerleave', () => { portrait.style.transform = ''; });
}

(() => {
  const stage = document.getElementById('viewerStage');
  const tabs = document.getElementById('viewerTabs');
  if (!stage || !tabs) return;

  const screens = [
    ['dashboard', 'Dashboard'],
    ['pos', 'POS'],
    ['pos-arabic', 'Arabic POS'],
    ['inventory', 'Inventory'],
    ['analytics', 'Analytics'],
    ['reports', 'Reports']
  ];
  const label = document.getElementById('viewerLabel');
  const count = document.getElementById('viewerCount');
  const images = [];
  const buttons = [];
  let active = 0;
  let timer;

  screens.forEach(([file, title], index) => {
    const image = document.createElement('img');
    image.src = `assets/shots/${file}.svg`;
    image.alt = `Meridian ${title} interface`;
    image.loading = index ? 'lazy' : 'eager';
    image.decoding = 'async';
    stage.appendChild(image);
    images.push(image);

    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'tab';
    button.textContent = title;
    button.addEventListener('click', () => { show(index); restart(); });
    tabs.appendChild(button);
    buttons.push(button);
  });

  function show(index) {
    active = (index + screens.length) % screens.length;
    images.forEach((image, i) => image.classList.toggle('active', i === active));
    buttons.forEach((button, i) => {
      button.classList.toggle('active', i === active);
      button.setAttribute('aria-selected', String(i === active));
    });
    label.textContent = `MERIDIAN / ${screens[active][1].toUpperCase()}`;
    count.textContent = `${String(active + 1).padStart(2, '0')} / ${String(screens.length).padStart(2, '0')}`;
  }
  function restart() {
    clearInterval(timer);
    if (!reduceMotion) timer = setInterval(() => show(active + 1), 5200);
  }
  document.getElementById('viewerPrev')?.addEventListener('click', () => { show(active - 1); restart(); });
  document.getElementById('viewerNext')?.addEventListener('click', () => { show(active + 1); restart(); });
  stage.addEventListener('pointerenter', () => clearInterval(timer));
  stage.addEventListener('pointerleave', restart);
  show(0);
  restart();
})();
