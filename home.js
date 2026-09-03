(() => {
  const hero = document.querySelector('.home-page .hero');
  if (hero && matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('pointermove', event => {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
      hero.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
    });
  }

  const signalData = {
    ai: {
      kicker: 'PRIMARY SIGNAL',
      title: 'Turns AI concepts into working product loops.',
      text: 'LegalMind, FitAI, and Meridian show practical orchestration: retrieval, classification, workflows, interfaces, and evaluation-minded thinking.',
      values: ['92%', '84%', '88%']
    },
    product: {
      kicker: 'PRODUCT SIGNAL',
      title: 'Understands the messy workflow before the clean interface.',
      text: 'Meridian is shaped around branch operations, permissions, Arabic POS needs, stock movement, billing pressure, and analytics people can act on.',
      values: ['86%', '94%', '82%']
    },
    ship: {
      kicker: 'EXECUTION SIGNAL',
      title: 'Builds across the full path from data to screen.',
      text: 'The work spans frontends, databases, automation, APIs, ML notebooks, deployment thinking, and the judgment to connect them into coherent systems.',
      values: ['88%', '83%', '93%']
    }
  };

  const consoleEl = document.querySelector('.signal-console');
  const options = [...document.querySelectorAll('.signal-options button')];
  const kicker = document.getElementById('signalKicker');
  const title = document.getElementById('signalTitle');
  const text = document.getElementById('signalText');
  const meters = [...document.querySelectorAll('.signal-meter span')];

  options.forEach(button => {
    button.addEventListener('click', () => {
      const next = signalData[button.dataset.signal];
      if (!next || !kicker || !title || !text) return;
      options.forEach(option => {
        const active = option === button;
        option.classList.toggle('active', active);
        option.setAttribute('aria-selected', String(active));
      });
      consoleEl?.setAttribute('data-active-signal', button.dataset.signal);
      kicker.textContent = next.kicker;
      title.textContent = next.title;
      text.textContent = next.text;
      meters.forEach((meter, index) => meter.style.setProperty('--value', next.values[index]));
    });
  });
})();
