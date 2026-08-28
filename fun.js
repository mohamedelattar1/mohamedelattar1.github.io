/* ============================================================
   FUN LAYER — film intro, talking avatar, easter egg
   Zero dependencies. Free browser TTS via speechSynthesis.
   ============================================================ */

/* ---------- FILM INTRO (first visit only) ---------- */
(() => {
  if (localStorage.getItem('seenIntro') === '1') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    localStorage.setItem('seenIntro', '1');
    return;
  }
  localStorage.setItem('seenIntro', '1');

  const el = document.createElement('div');
  el.className = 'film-intro';
  el.innerHTML = `
    <div class="film-leader">
      <svg viewBox="0 0 120 120" class="film-dial">
        <circle cx="60" cy="60" r="52" fill="none" stroke="#2a2a2a" stroke-width="2"/>
        <line x1="60" y1="60" x2="60" y2="8" stroke="#e7a91d" stroke-width="2.5" class="film-sweep"/>
        <line x1="60" y1="60" x2="112" y2="60" stroke="#3a3a3a" stroke-width="1.5" opacity="0"/>
      </svg>
      <div class="film-num">3</div>
      <div class="film-cross-h"></div><div class="film-cross-v"></div>
    </div>
    <div class="film-title"><span>MOHAMED ELATTAR</span><em>A PORTFOLIO IN FOUR SCROLLS</em></div>`;
  document.body.appendChild(el);
  const num = el.querySelector('.film-num');
  const t = setTimeout;
  t(() => num.textContent = '2', 650);
  t(() => num.textContent = '1', 1300);
  t(() => { el.querySelector('.film-leader').style.display = 'none'; el.classList.add('title'); }, 1950);
  t(() => el.classList.add('iris'), 2900);
  t(() => el.remove(), 3700);
})();

/* ---------- TALKING AVATAR ---------- */
(() => {
  const synth = window.speechSynthesis;
  const supported = synth && typeof SpeechSynthesisUtterance !== 'undefined';

  const AVATAR_SVG = `
  <svg viewBox="0 0 200 200" class="avatar-svg" aria-hidden="true">
    <defs>
      <radialGradient id="avGlow" cx="50%" cy="35%"><stop offset="0%" stop-color="#1c1f26"/><stop offset="100%" stop-color="#0d0e11"/></radialGradient>
    </defs>
    <rect x="8" y="8" width="184" height="184" rx="24" fill="url(#avGlow)" stroke="#2a2e37" stroke-width="1.5"/>
    <!-- shoulders -->
    <path d="M40 200 Q60 158 100 158 Q140 158 160 200 Z" fill="#15171d" stroke="#2a2e37" stroke-width="1.5"/>
    <rect x="92" y="158" width="16" height="14" fill="#e7a91d"/>
    <!-- neck + head -->
    <rect x="88" y="138" width="24" height="24" fill="#15171d"/>
    <rect x="52" y="40" width="96" height="108" rx="30" fill="#191c22" stroke="#2a2e37" stroke-width="1.5"/>
    <!-- hair -->
    <path d="M52 78 Q52 34 100 34 Q148 34 148 78 L148 66 Q140 46 100 46 Q60 46 52 66 Z" fill="#0c0d10" stroke="#2a2e37" stroke-width="1"/>
    <!-- brows -->
    <rect class="av-brow av-brow-l" x="64" y="74" width="26" height="4" rx="2" fill="#e7a91d"/>
    <rect class="av-brow av-brow-r" x="110" y="74" width="26" height="4" rx="2" fill="#e7a91d"/>
    <!-- eyes -->
    <g class="av-eye av-eye-l"><ellipse cx="77" cy="92" rx="10" ry="7" fill="#f4f0e8"/><circle class="av-pupil" cx="77" cy="92" r="3.4" fill="#e7a91d"/></g>
    <g class="av-eye av-eye-r"><ellipse cx="123" cy="92" rx="10" ry="7" fill="#f4f0e8"/><circle class="av-pupil" cx="123" cy="92" r="3.4" fill="#e7a91d"/></g>
    <!-- lids for blinking -->
    <rect class="av-lid av-lid-l" x="65" y="84" width="24" height="0" rx="8" fill="#191c22"/>
    <rect class="av-lid av-lid-r" x="111" y="84" width="24" height="0" rx="8" fill="#191c22"/>
    <!-- nose -->
    <path d="M100 98 L96 114 L104 114 Z" fill="#22252d" stroke="#2a2e37" stroke-width="1"/>
    <!-- mouth (JS morphs via scaleY on group) -->
    <g class="av-mouth-g">
      <rect class="av-mouth" x="82" y="126" width="36" height="6" rx="3" fill="#e7a91d"/>
    </g>
    <!-- status dot -->
    <circle class="av-dot" cx="164" cy="36" r="5" fill="#e7a91d"/>
  </svg>`;

  const LINES = [
    "Hey! Mohamed here — AI engineer, and the voice inside this portfolio.",
    "I build agents, RAG systems, and multi-tenant SaaS platforms that actually ship.",
    "The beard is real. The avatar? Not so much. Scroll down and judge the work.",
    "أهلاً بكم — والآن، لنصنع شيئاً رائعاً."
  ];

  const widget = document.createElement('div');
  widget.className = 'avatar-widget';
  widget.innerHTML = `
    <button class="avatar-fab" aria-label="Talk to Mohamed">${AVATAR_SVG}<span class="avatar-fab-label">TALK</span></button>
    <div class="avatar-panel" hidden>
      <div class="avatar-media">${AVATAR_SVG}</div>
      <div class="avatar-caption">Click a line — I'll say it out loud.</div>
      <div class="avatar-lines"></div>
      <div class="avatar-controls">
        <button class="avatar-stop">■ Stop</button>
        <span class="avatar-hint">Free browser TTS — no cloud, no keys.</span>
      </div>
    </div>`;
  document.body.appendChild(widget);

  const fab = widget.querySelector('.avatar-fab');
  const panel = widget.querySelector('.avatar-panel');
  const caption = widget.querySelector('.avatar-caption');
  const linesEl = widget.querySelector('.avatar-lines');
  const bigSvg = widget.querySelector('.avatar-media .avatar-svg');
  const mouth = bigSvg.querySelector('.av-mouth');
  const mouthG = bigSvg.querySelector('.av-mouth-g');
  const brows = [...bigSvg.querySelectorAll('.av-brow')];

  LINES.forEach((text, i) => {
    const b = document.createElement('button');
    b.className = 'avatar-line';
    b.textContent = (i === LINES.length - 1 ? '🇪🇬 ' : '0' + (i + 1) + '. ') + text.slice(0, 46) + '…';
    b.dataset.full = text;
    b.addEventListener('click', () => speak(text, b));
    linesEl.appendChild(b);
  });

  fab.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    fab.classList.toggle('open', !panel.hidden);
  });

  /* -- speech + mouth sync -- */
  let talking = false, visTimer = null, vis = 0;
  const MOUTH_SHAPES = [
    { h: 6, y: 126 },   // rest
    { h: 12, y: 122 },  // mid
    { h: 20, y: 116 },  // wide
    { h: 9, y: 124 }    // "oo"
  ];

  function setMouth(shape) {
    mouth.setAttribute('height', shape.h);
    mouth.setAttribute('y', shape.y);
  }

  function startVisemes() {
    stopVisemes();
    visTimer = setInterval(() => {
      vis = (vis + 1 + Math.floor(Math.random() * 2)) % MOUTH_SHAPES.length;
      setMouth(MOUTH_SHAPES[vis]);
    }, 95);
  }
  function stopVisemes() {
    clearInterval(visTimer);
    visTimer = null;
    setMouth(MOUTH_SHAPES[0]);
  }

  function pickVoice(ar) {
    const vs = synth.getVoices();
    return vs.find(v => (ar ? v.lang.startsWith('ar') : v.lang.startsWith('en') && /google|natural|samantha|daniel/i.test(v.name)))
        || vs.find(v => ar ? v.lang.startsWith('ar') : v.lang.startsWith('en'))
        || null;
  }

  function speak(text, btn) {
    [...linesEl.children].forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    if (!supported) { typeCaption(text); return; }
    synth.cancel();
    const ar = /[\u0600-\u06FF]/.test(text);
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice(ar);
    if (v) u.voice = v;
    u.rate = ar ? 0.95 : 1.02;
    u.pitch = 1.0;
    u.onstart = () => { talking = true; startVisemes(); brows.forEach(b => b.style.transform = 'translateY(2px)'); };
    u.onend = u.onerror = () => {
      talking = false; stopVisemes();
      brows.forEach(b => b.style.transform = '');
      caption.textContent = '—';
    };
    u.onboundary = (e) => {
      if (e.name === 'word' || e.charIndex != null) {
        setMouth(MOUTH_SHAPES[2]);
        const upto = text.slice(0, e.charIndex);
        const rest = text.slice(e.charIndex);
        const wordEnd = rest.indexOf(' ');
        caption.innerHTML = esc(upto) + '<b>' + esc(wordEnd === -1 ? rest : rest.slice(0, wordEnd)) + '</b>' + esc(wordEnd === -1 ? '' : rest.slice(wordEnd));
      }
    };
    caption.textContent = text;
    synth.speak(u);
  }

  function typeCaption(text) {
    let i = 0;
    caption.textContent = '';
    const t = setInterval(() => {
      caption.textContent = text.slice(0, ++i);
      setMouth(MOUTH_SHAPES[i % MOUTH_SHAPES.length]);
      if (i >= text.length) { clearInterval(t); stopVisemes(); }
    }, 40);
  }

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  /* -- blinking -- */
  const lids = [...bigSvg.querySelectorAll('.av-lid')];
  (function blink() {
    setTimeout(() => {
      lids.forEach(l => l.setAttribute('height', '13'));
      setTimeout(() => lids.forEach(l => l.setAttribute('height', '0')), 130);
      blink();
    }, 2400 + Math.random() * 3200);
  })();

  /* -- pupils follow cursor (both svgs) -- */
  const allPupils = [...document.querySelectorAll('.avatar-svg .av-pupil')];
  const allEyes = [...document.querySelectorAll('.avatar-svg .av-eye')];
  window.addEventListener('pointermove', (e) => {
    document.querySelectorAll('.avatar-svg').forEach(svg => {
      const r = svg.getBoundingClientRect();
      if (!r.width) return;
      const cx = r.left + r.width / 2, cy = r.top + r.height * .46;
      const ang = Math.atan2(e.clientY - cy, e.clientX - cx);
      const dx = Math.cos(ang) * 3.4, dy = Math.sin(ang) * 2.2;
      svg.querySelectorAll('.av-pupil').forEach(p => p.setAttribute('transform', `translate(${dx.toFixed(1)},${dy.toFixed(1)})`));
      svg.querySelectorAll('.av-brow').forEach((b, i) => b.setAttribute('transform', `translate(${(dx * .4).toFixed(1)},0)`));
    });
  }, { passive: true });

  if (supported) { synth.getVoices(); synth.onvoiceschanged = () => synth.getVoices(); }
})();

/* ---------- EASTER EGG: type "meridian" ---------- */
(() => {
  let buf = '';
  window.addEventListener('keydown', (e) => {
    if (e.key.length !== 1) return;
    buf = (buf + e.key.toLowerCase()).slice(-8);
    if (buf !== 'meridian') return;
    buf = '';
    const card = document.querySelector('.hero-card');
    if (card) {
      card.style.transition = 'transform 1s cubic-bezier(.34,1.56,.64,1)';
      card.style.transform = 'rotate(365deg)';
      setTimeout(() => { card.style.transform = ''; }, 1100);
    }
    confetti();
    toast('✦ You typed the magic word. Meridian ships.');
  });

  function toast(msg) {
    let t = document.querySelector('.fun-toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'fun-toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove('show'), 3200);
  }

  function confetti() {
    const colors = ['#e7a91d', '#f5c65b', '#f4f0e8', '#7fb069'];
    for (let i = 0; i < 36; i++) {
      const c = document.createElement('i');
      c.className = 'confetti';
      c.style.left = (50 + (Math.random() * 40 - 20)) + 'vw';
      c.style.background = colors[i % colors.length];
      c.style.animationDelay = (Math.random() * .2) + 's';
      c.style.animationDuration = (1.2 + Math.random() * .9) + 's';
      c.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 2400);
    }
  }
})();
