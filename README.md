# Mohamed Elattar — Portfolio

A cinematic, responsive developer portfolio built with plain HTML, CSS and JavaScript.

## Pages
- `index.html` — portfolio (hero, work, about, stack, contact)
- `cv.html` — full CV rendered as website content (data-driven)
- `cv-data.js` — **all CV content lives here**; edit this file to update the CV page, no HTML needed
- `assets/mohamed-elattar-cv.pdf` — the downloadable CV (Download PDF button)

## Run
Open `index.html` directly, or serve the folder with any static server:

```bash
python3 -m http.server 8000
```

## Notes
- LinkedIn: https://www.linkedin.com/in/mohamed-elattar-706893261/
- To update the CV: edit `cv-data.js` (page) and/or replace `assets/mohamed-elattar-cv.pdf` (download).
- Ctrl/Cmd+P on `cv.html` prints a clean white-paper version.
- Interactions (in `script.js`): scroll progress bar, scrollspy nav highlighting,
  count-up dashboard stats, growing charts, mobile hamburger menu (≤900px).

## Deploy
This is static and can be deployed to Vercel, Netlify, GitHub Pages, or any static host.
