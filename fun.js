(() => {
  const steps = [
    {
      selector: '.hero', side: 'right', accent: '#9ef5c7', label: 'START',
      title: 'I make AI useful.',
      text: 'My work sits where machine learning, product thinking, and reliable software meet.'
    },
    {
      selector: '.feature-project', side: 'left', accent: '#ff6e51', label: 'FLAGSHIP',
      title: 'Meridian is the systems proof.',
      text: 'A multi-branch pharmacy platform shaped around permissions, reporting, security, and real operations.'
    },
    {
      selector: '.project-grid .project-card:nth-child(1)', side: 'right', accent: '#7890ff', label: 'AGENT SYSTEMS',
      title: 'Eleven agents. One workflow.',
      text: 'LegalMind explores orchestration, hybrid retrieval, OCR, and specialist roles for document-heavy legal work.'
    },
    {
      selector: '.project-grid .project-card:nth-child(2)', side: 'left', accent: '#f0d36a', label: 'PERSONALIZATION',
      title: 'Context changes the plan.',
      text: 'FitAI combines goals, body-composition data, weather, and safety events into adaptive recommendations.'
    },
    {
      selector: '.project-grid .project-card:nth-child(3)', side: 'right', accent: '#9ef5c7', label: 'IOT',
      title: 'Software meets the street.',
      text: 'Smart Drain turns live sensor readings into mapped alerts and clear actions for field teams.'
    },
    {
      selector: '.project-grid .project-card:nth-child(4)', side: 'left', accent: '#ff6e51', label: 'AUTOMATION',
      title: 'Busywork should disappear.',
      text: 'The Workspace Assistant classifies messages, drafts replies, and routes form updates without manual handling.'
    },
    {
      selector: '#profile', side: 'right', accent: '#7890ff', label: 'PROFILE',
      title: 'Early career. Real output.',
      text: 'I graduated in 2024. The experience here comes from building, testing, researching, and iterating independently.'
    },
    {
      selector: '#lab', side: 'left', accent: '#f0d36a', label: 'AI LAB',
      title: 'The range behind the products.',
      text: 'Computer vision, forecasting, classification, clustering, APIs, RAG, and agent architecture.'
    },
    {
      selector: '#contact', side: 'right', accent: '#9ef5c7', label: 'CONTACT',
      title: 'Ready for the right first role.',
      text: 'Junior AI engineering, applied ML, or AI product work. Remote, Egypt, or relocation.'
    }
  ].filter(step => document.querySelector(step.selector));

  if (!steps.length) return;

  const widget = document.createElement('aside');
  widget.className = 'portfolio-guide';
  widget.dataset.side = steps[0].side;
  widget.style.setProperty('--guide-accent', steps[0].accent);
  widget.innerHTML = `
    <section class="guide-note" aria-live="polite">
      <header>
        <small class="guide-index"></small>
        <button class="guide-minimize" type="button" aria-label="Minimize field notes" data-tip="Minimize"><i data-lucide="minus"></i></button>
      </header>
      <div class="guide-copy">
        <span class="guide-label"></span>
        <h3></h3>
        <p></p>
      </div>
      <footer>
        <div class="guide-progress" aria-hidden="true"></div>
        <div class="guide-actions">
          <a href="mailto:mohedelattar25w@gmail.com" aria-label="Email Mohamed" data-tip="Email"><i data-lucide="mail"></i></a>
          <button class="guide-next" type="button" aria-label="Continue to next portfolio chapter" data-tip="Next"><i data-lucide="arrow-down"></i></button>
        </div>
      </footer>
    </section>
    <button class="guide-avatar" type="button" aria-label="Open Mohamed's field notes" aria-expanded="true">
      <img src="assets/portrait-color.png" alt="Mohamed Elattar">
      <span class="guide-online" aria-hidden="true"></span>
      <span class="guide-avatar-label">FIELD NOTES</span>
    </button>`;
  document.body.appendChild(widget);

  const note = widget.querySelector('.guide-note');
  const avatar = widget.querySelector('.guide-avatar');
  const minimize = widget.querySelector('.guide-minimize');
  const next = widget.querySelector('.guide-next');
  const indexLabel = widget.querySelector('.guide-index');
  const chapterLabel = widget.querySelector('.guide-label');
  const title = widget.querySelector('.guide-copy h3');
  const text = widget.querySelector('.guide-copy p');
  const progress = widget.querySelector('.guide-progress');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeIndex = 0;
  let manuallyCollapsed = window.matchMedia('(max-width: 800px)').matches;

  progress.innerHTML = steps.map(() => '<i></i>').join('');

  const setOpen = open => {
    note.hidden = !open;
    avatar.setAttribute('aria-expanded', String(open));
    widget.classList.toggle('is-collapsed', !open);
  };

  const update = index => {
    if (index === activeIndex && title.textContent) return;
    activeIndex = index;
    const step = steps[index];
    widget.dataset.side = step.side;
    widget.style.setProperty('--guide-accent', step.accent);
    indexLabel.textContent = `${String(index + 1).padStart(2, '0')} / ${String(steps.length).padStart(2, '0')}`;
    chapterLabel.textContent = step.label;
    title.textContent = step.title;
    text.textContent = step.text;
    [...progress.children].forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex <= index));
    next.disabled = index === steps.length - 1;
    note.classList.remove('is-changing');
    void note.offsetWidth;
    note.classList.add('is-changing');
  };

  const visible = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => visible.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0));
    let bestIndex = activeIndex;
    let bestRatio = 0;
    steps.forEach((step, index) => {
      const ratio = visible.get(document.querySelector(step.selector)) || 0;
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestIndex = index;
      }
    });
    if (bestRatio > 0) update(bestIndex);
  }, { rootMargin: '-16% 0px -48% 0px', threshold: [0, .08, .2, .45, .7] });

  steps.forEach((step, index) => {
    const target = document.querySelector(step.selector);
    observer.observe(target);
    target.addEventListener('mouseenter', () => update(index));
    target.addEventListener('focusin', () => update(index));
  });
  avatar.addEventListener('click', () => {
    const open = note.hidden;
    manuallyCollapsed = !open;
    setOpen(open);
    if (open) minimize.focus();
  });
  minimize.addEventListener('click', () => {
    manuallyCollapsed = true;
    setOpen(false);
    avatar.focus();
  });
  next.addEventListener('click', () => {
    const nextIndex = Math.min(activeIndex + 1, steps.length - 1);
    update(nextIndex);
    document.querySelector(steps[nextIndex].selector)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  });
  document.querySelectorAll('.js-open-avatar').forEach(button => button.addEventListener('click', () => {
    manuallyCollapsed = false;
    setOpen(true);
    minimize.focus();
  }));
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !note.hidden) {
      manuallyCollapsed = true;
      setOpen(false);
    }
  });

  update(0);
  setOpen(!manuallyCollapsed);
  if (window.lucide) window.lucide.createIcons({ nodes: [widget] });
})();
