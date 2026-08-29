(() => {
  const cv = window.CV;
  if (!cv) return;

  const esc = value => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  const b = cv.basics;
  const chips = items => `<div class="cv-chips">${items.map(item => `<span>${esc(item)}</span>`).join('')}</div>`;
  const sectionHead = (number, label, note = '') => `
    <header class="cv-section-head reveal">
      <span>${esc(number)}</span>
      <h2>${esc(label)}</h2>
      ${note ? `<p>${esc(note)}</p>` : ''}
    </header>`;

  const hero = `
    <section class="cv-cover" aria-labelledby="cvName">
      <div class="cv-cover-grid" aria-hidden="true"></div>
      <div class="cv-cover-copy">
        <div class="availability"><span></span> OPEN TO JUNIOR AI ROLES</div>
        <p class="cv-kicker">CURRICULUM VITAE / 2026</p>
        <h1 id="cvName">Mohamed<br>Elattar<span>.</span></h1>
        <p class="cv-title">${esc(b.title)}</p>
        <div class="cv-cover-actions">
          <a class="button button-primary" href="${esc(b.pdf)}" download="Mohamed-Elattar-CV.pdf"><i data-lucide="download"></i> Download PDF</a>
          <a class="button button-quiet" href="${esc(b.portfolio)}"><i data-lucide="layout-grid"></i> Portfolio</a>
        </div>
      </div>
      <div class="cv-cover-photo"><img src="assets/portrait-color.png" alt="Mohamed Elattar"></div>
      <div class="cv-contact-rail">
        <span>${esc(b.location)}</span>
        <a href="mailto:${esc(b.email)}">${esc(b.email)}</a>
        <a href="${esc(b.phoneHref)}">${esc(b.phone)}</a>
        <a href="${esc(b.portfolio)}">Portfolio <i data-lucide="arrow-up-right"></i></a>
        <a href="${esc(b.linkedin)}" target="_blank" rel="noopener">LinkedIn <i data-lucide="arrow-up-right"></i></a>
      </div>
    </section>`;

  const intro = `
    <section class="cv-intro cv-shell">
      <div class="cv-intro-label reveal"><span>01</span> PROFILE</div>
      <p class="cv-profile-text reveal">${esc(cv.profile)}</p>
      <div class="cv-proof reveal">
        <div><strong>2024</strong><span>Computer Science graduate</span></div>
        <div><strong>10+</strong><span>AI, ML and data projects</span></div>
        <div><strong>EN / AR</strong><span>Professional English, native Arabic</span></div>
      </div>
    </section>`;

  const p = cv.projects;
  const projects = `
    <section class="cv-block cv-shell">
      ${sectionHead(p.number, p.label, `${p.role} / ${p.period}`)}
      <div class="cv-project-list">
        ${p.items.map((item, index) => `
          <article class="cv-project reveal">
            <div class="cv-project-index">${String(index + 1).padStart(2, '0')}</div>
            <div class="cv-project-title">
              <h3>${esc(item.name)}<span>.</span></h3>
              <p>${esc(item.sub)}</p>
              ${chips(item.stack)}
            </div>
            <ul>${item.bullets.map(bullet => `<li>${esc(bullet)}</li>`).join('')}</ul>
          </article>`).join('')}
      </div>
    </section>`;

  const d = cv.dataScience;
  const dataScience = `
    <section class="cv-block cv-shell cv-tint">
      ${sectionHead(d.number, d.label)}
      <div class="cv-ml-grid">
        ${d.items.map(item => `
          <article class="cv-ml-item reveal">
            <i data-lucide="scan-search"></i>
            <h3>${esc(item.name)}</h3>
            <p>${esc(item.desc)}</p>
          </article>`).join('')}
      </div>
    </section>`;

  const g = cv.graduation;
  const graduation = `
    <section class="cv-block cv-shell">
      ${sectionHead(g.number, g.label, g.period)}
      <article class="cv-focus reveal">
        <div><small>CAPSTONE / IOT</small><h3>${esc(g.name)}</h3></div>
        <ul>${g.bullets.map(bullet => `<li>${esc(bullet)}</li>`).join('')}</ul>
      </article>
    </section>`;

  const e = cv.education;
  const education = `
    <section class="cv-block cv-shell cv-split-block">
      <div>
        ${sectionHead(e.number, 'EDUCATION')}
        <div class="cv-school-list">
          ${e.schools.map(school => `
            <article class="cv-school reveal">
              <span>${esc(school.period)}</span>
              <h3>${esc(school.degree)}</h3>
              <p>${esc(school.school)}</p>
              <strong>${esc(school.grade)}</strong>
            </article>`).join('')}
        </div>
      </div>
      <div>
        ${sectionHead('05B', 'CERTIFICATIONS')}
        <div class="cv-cert-list">
          ${e.certs.map(cert => `
            <article class="cv-cert reveal"><i data-lucide="badge-check"></i><div><h3>${esc(cert.title)}</h3>${cert.detail ? `<p>${esc(cert.detail)}</p>` : ''}</div></article>`).join('')}
        </div>
      </div>
    </section>`;

  const s = cv.skills;
  const skills = `
    <section class="cv-block cv-shell">
      ${sectionHead(s.number, s.label)}
      <div class="cv-skills-grid reveal">
        ${s.groups.map(group => `<div><small>${esc(group.category)}</small>${chips(group.items)}</div>`).join('')}
      </div>
    </section>`;

  const l = cv.languages;
  const languages = `
    <section class="cv-block cv-shell cv-language-block">
      ${sectionHead(l.number, l.label)}
      <div>${l.items.map(item => `<p><strong>${esc(item.name)}</strong><span>${esc(item.level)}</span></p>`).join('')}</div>
    </section>`;

  const contact = `
    <section class="cv-cta">
      <small>AVAILABLE / REMOTE OR RELOCATION</small>
      <h2>Let’s build something<br><em>useful.</em></h2>
      <a href="mailto:${esc(b.email)}">${esc(b.email)} <i data-lucide="arrow-up-right"></i></a>
    </section>`;

  document.getElementById('cv-root').innerHTML = hero + intro + projects + dataScience + graduation + education + skills + languages + contact;
  if (window.lucide) window.lucide.createIcons();
})();
