/* ============================================================
   CV RENDERER — builds the CV page from cv-data.js
   ============================================================ */

(function () {
  const cv = window.CV;
  if (!cv) return;

  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const sectionHead = (number, label, note) => `
    <div class="section-head reveal">
      <div><span class="section-number">${esc(number)}</span><span class="section-label">${esc(label)}</span></div>
      ${note ? `<p>${esc(note)}</p>` : ""}
    </div>`;

  const chips = arr => `<div class="chips">${arr.map(c => `<span>${esc(c)}</span>`).join("")}</div>`;

  /* ---- Hero ---- */
  const b = cv.basics;
  const hero = `
    <section class="cv-hero">
      <div class="eyebrow reveal"><i></i> CURRICULUM VITAE — 2026</div>
      <h1 class="reveal">${esc(b.name)}<span>.</span></h1>
      <p class="cv-role reveal delay-1"><em>${esc(b.title)}</em></p>
      <div class="cv-meta reveal delay-2">
        <span class="cv-meta-item">${esc(b.location)}</span>
        <a href="${esc(b.phoneHref)}">${esc(b.phone)}</a>
        <a href="mailto:${esc(b.email)}">${esc(b.email)}</a>
        <a href="${esc(b.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>
        <a class="button primary" href="${esc(b.pdf)}" download="Mohamed Elattar CV.pdf">Download PDF <span>↓</span></a>
      </div>
    </section>`;

  /* ---- Profile ---- */
  const profile = `
    <section class="cv-section">
      ${sectionHead("01", "PROFILE")}
      <p class="cv-profile reveal">${esc(cv.profile)}</p>
    </section>`;

  /* ---- Projects ---- */
  const p = cv.projects;
  const projects = `
    <section class="cv-section">
      ${sectionHead(p.number, p.label, p.role + " · " + p.period)}
      ${p.items.map(item => `
        <article class="cv-entry reveal">
          <div class="cv-entry-head">
            <h3>${esc(item.name)}<span>.</span></h3>
            <p>${esc(item.sub)}</p>
            ${chips(item.stack)}
          </div>
          <div class="cv-entry-body">
            <ul>${item.bullets.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
          </div>
        </article>`).join("")}
    </section>`;

  /* ---- Data science ---- */
  const d = cv.dataScience;
  const ds = `
    <section class="cv-section">
      ${sectionHead(d.number, d.label)}
      <div class="cv-ds-list reveal">
        ${d.items.map(i => `
          <div class="cv-ds-item">
            <strong>${esc(i.name)}</strong>
            <p>${esc(i.desc)}</p>
          </div>`).join("")}
      </div>
    </section>`;

  /* ---- Graduation project ---- */
  const g = cv.graduation;
  const grad = `
    <section class="cv-section">
      ${sectionHead(g.number, g.label)}
      <article class="cv-entry reveal">
        <div class="cv-entry-head">
          <h3>${esc(g.name.split(" — ")[0])}<span>.</span></h3>
          <p>${esc(g.name.split(" — ")[1] || "")}</p>
          ${chips([g.period])}
        </div>
        <div class="cv-entry-body">
          <ul>${g.bullets.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
        </div>
      </article>
    </section>`;

  /* ---- Education ---- */
  const e = cv.education;
  const edu = `
    <section class="cv-section">
      ${sectionHead(e.number, e.label)}
      ${e.schools.map(s => `
        <article class="cv-entry reveal">
          <div class="cv-entry-head">
            <h3>${esc(s.degree)}<span>.</span></h3>
            <p>${esc(s.school)}</p>
          </div>
          <div class="cv-entry-body">
            <ul><li>${esc(s.period)} · ${esc(s.grade)}</li></ul>
          </div>
        </article>`).join("")}
      <div class="cv-certs reveal">
        ${e.certs.map(c => `
          <div class="cv-cert">
            <strong>${esc(c.title)}</strong>
            ${c.detail ? `<p>${esc(c.detail)}</p>` : ""}
          </div>`).join("")}
      </div>
    </section>`;

  /* ---- Skills ---- */
  const s = cv.skills;
  const skills = `
    <section class="cv-section">
      ${sectionHead(s.number, s.label)}
      <div class="cv-skills reveal">
        ${s.groups.map(grp => `
          <div class="cv-skill-group">
            <small>${esc(grp.category)}</small>
            <div class="chips">${grp.items.map(i => `<span>${esc(i)}</span>`).join("")}</div>
          </div>`).join("")}
      </div>
    </section>`;

  /* ---- Languages ---- */
  const l = cv.languages;
  const langs = `
    <section class="cv-section">
      ${sectionHead(l.number, l.label)}
      <div class="cv-langs reveal">
        ${l.items.map(i => `<div class="cv-lang"><strong>${esc(i.name)}</strong><span>${esc(i.level)}</span></div>`).join("")}
      </div>
    </section>`;

  /* ---- Contact ---- */
  const contact = `
    <section class="section contact">
      <div class="contact-inner reveal">
        <span class="section-label">GET IN TOUCH</span>
        <h2>Let's talk<span>.</span></h2>
        <p>Have a hard problem? Let's turn it into something people can actually use.</p>
        <a class="contact-email" href="mailto:${esc(b.email)}">${esc(b.email)} <span>↗</span></a>
        <div class="socials"><a href="index.html">Portfolio</a><a href="${esc(b.linkedin)}" target="_blank" rel="noopener">LinkedIn</a><a href="${esc(b.pdf)}" download>Download CV</a></div>
      </div>
    </section>`;

  document.getElementById("cv-root").innerHTML =
    hero + profile + projects + ds + grad + edu + skills + langs + contact;
})();
