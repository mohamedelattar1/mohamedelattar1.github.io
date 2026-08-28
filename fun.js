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
        <span class="avatar-hint">Natural voices · live lip-sync · zero keys</span>
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
    b.addEventListener('click', () => speakLine(i, b));
    linesEl.appendChild(b);
  });

  fab.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    fab.classList.toggle('open', !panel.hidden);
  });

  /* -- speech engine: natural Polly voices via StreamElements (free, no key),
        real lip-sync from live audio analysis. Browser TTS = fallback. -- */
  let talking = false, speakToken = 0;
  const VOICES = [
    { id: 'daniel', label: 'Daniel · UK' },
    { id: 'samantha', label: 'Samantha · US' }
  ];
  let chosenVoice = 'daniel';
  const PHRASE_TEXT = {
    daniel:   [["Hey!","Mohamed here — AI engineer, and the voice inside this portfolio."],["I build agents, RAG systems, and multi-tenant SaaS platforms that actually ship."],["The beard is real.","The avatar?","Not so much.","Scroll down and judge the work."]],
    samantha: [["Hey!","Mohamed here — AI engineer, and the voice inside this portfolio."],["I build agents, RAG systems, and multi-tenant SaaS platforms that actually ship."],["The beard is real.","The avatar?","Not so much.","Scroll down and judge the work."]],
    majed:    [["أهلاً بكم — والآن، لنصنع شيئاً رائعاً."]]
  };
  const PHRASE_FILES = {
    daniel:   [[0,1],[0],[0,1,2,3]],
    samantha: [[0,1],[0],[0,1,2,3]],
    majed:    [[0]]
  };

  const mouthEl = () => bigSvg.querySelector('.av-mouth');
  function setMouth(h) {
    const m = mouthEl();
    m.setAttribute('height', h.toFixed(1));
    m.setAttribute('y', (126 - (h - 6) / 2).toFixed(1));
  }

  let audioCtx = null;
  const getCtx = () => (audioCtx ||= new (window.AudioContext || window.webkitAudioContext)());

  /* mouth follows the actual audio amplitude */
  function lipSync(source, analyser, done, maxMs) {
    const data = new Uint8Array(analyser.fftSize);
    const browsL = bigSvg.querySelector('.av-brow-l');
    const browsR = bigSvg.querySelector('.av-brow-r');
    const head = bigSvg;
    source.onended = () => { source._stopped = true; };
    const killAt = Date.now() + (maxMs || 15000);
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setMouth(6);
      head.style.transform = '';
      browsL.style.transform = '';
      browsR.style.transform = '';
      done();
    };
    setTimeout(finish, maxMs || 15000);            // hard safety net
    (function frame() {
      if (source._stopped || Date.now() > killAt) return finish();
      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) { const v = (data[i] - 128) / 128; sum += v * v; }
      const rms = Math.sqrt(sum / data.length);            // 0..~0.5
      const open = Math.min(22, 4 + rms * 90);             // amplitude -> mouth
      setMouth(open);
      const lift = Math.min(3, rms * 18);                  // brows react
      browsL.style.transform = `translateY(${(-lift).toFixed(1)}px)`;
      browsR.style.transform = `translateY(${(-lift).toFixed(1)}px)`;
      head.style.transform = `translateY(${(Math.sin(Date.now() / 130) * rms * 5).toFixed(1)}px)`; // head bob
      if (!finished) requestAnimationFrame(frame);
    })();
  }

  function playPhrase(url, text) {
    return new Promise((resolve) => {
      fetch(url)
        .then(r => { if (!r.ok) throw 0; return r.arrayBuffer(); })
        .then(buf => getCtx().decodeAudioData(buf))
        .then(audio => {
          const ctx = getCtx();
          if (ctx.state === 'suspended') ctx.resume();
          const src = ctx.createBufferSource();
          src.buffer = audio;
          const an = ctx.createAnalyser();
          an.fftSize = 512;
          src.connect(an);
          an.connect(ctx.destination);
          src.start();
          caption.innerHTML = esc(text);
          lipSync(src, an, resolve, Math.ceil(audio.duration * 1000) + 400);
        })
        .catch(() => { fallbackTTS(text).then(resolve); });
    });
  }

  function fallbackTTS(text) {
    return new Promise((resolve) => {
      if (!supported) { typeCaption(text); return setTimeout(resolve, text.length * 45); }
      const ar = /[\u0600-\u06FF]/.test(text);
      const u = new SpeechSynthesisUtterance(text);
      const v = pickVoice(ar);
      if (v) u.voice = v;
      u.rate = 1.0;
      u.onend = u.onerror = () => resolve();
      u.onboundary = () => setMouth(8 + Math.random() * 12);
      caption.textContent = text;
      synth.speak(u);
    });
  }

  async function speakLine(li, btn) {
    [...linesEl.children].forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    const token = ++speakToken;
    talking = true;
    const ar = li === LINES.length - 1;
    const folder = ar ? 'majed' : chosenVoice;
    const count = PHRASE_FILES[folder][ar ? 0 : li].length;
    for (let pi = 0; pi < count; pi++) {
      if (token !== speakToken) return;
      const phraseText = PHRASE_TEXT[folder][ar ? 0 : li][pi];
      await playPhrase(`assets/voice/${folder}/${li}-${pi}.m4a`, phraseText);
      if (token !== speakToken) return;
      await new Promise(r => setTimeout(r, 190));
    }
    talking = false;
    caption.textContent = '—';
    if (btn) btn.classList.remove('active');
  }

  function stopSpeaking() {
    speakToken++;
    talking = false;
    if (supported) synth.cancel();
    setMouth(6);
    bigSvg.style.transform = '';
    caption.textContent = 'Stopped. Click a line — I insist.';
  }
  widget.querySelector('.avatar-stop').addEventListener('click', stopSpeaking);

  /* voice picker */
  const picker = document.createElement('div');
  picker.className = 'avatar-voices';
  picker.innerHTML = VOICES.map(v =>
    `<button data-v="${v.id}" class="${v.id === chosenVoice ? 'active' : ''}">${v.label}</button>`).join('');
  picker.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    chosenVoice = b.dataset.v;
    [...picker.children].forEach(x => x.classList.toggle('active', x === b));
  });
  widget.querySelector('.avatar-controls').prepend(picker);

  function pickVoice(ar) {
    const vs = synth.getVoices();
    return vs.find(v => (ar ? v.lang.startsWith('ar') : v.lang.startsWith('en') && /google|natural|premium/i.test(v.name)))
        || vs.find(v => ar ? v.lang.startsWith('ar') : v.lang.startsWith('en'))
        || null;
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
