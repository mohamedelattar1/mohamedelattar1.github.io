# Mohamed Elattar - Portfolio

A responsive AI engineering portfolio built with plain HTML, CSS, and JavaScript.

## Pages
- `index.html` - interactive portfolio with project field notes
- `cv.html` - full CV rendered as website content
- `cv-data.js` - CV page content
- `assets/mohamed-elattar-cv.pdf` - downloadable two-page recruiter CV
- `scripts/generate_cv_pdf.py` - reproducible PDF generator

## Run
Open `index.html` directly, or serve the folder with any static server:

```bash
python3 -m http.server 8000
```

## Notes
- LinkedIn: https://www.linkedin.com/in/mohamed-elattar-706893261/
- To update the web CV, edit `cv-data.js`.
- To regenerate the downloadable PDF, run the bundled Python environment or any Python installation with ReportLab:

```bash
python3 scripts/generate_cv_pdf.py
```

- The PDF contains clickable links to the live portfolio, LinkedIn, email, and phone.
- Interactions include scroll progress, project viewers, mobile navigation, reveal motion, and a responsive field-notes avatar.

## Deploy
The production site is published from this repository at https://mohamedelattar1.github.io/.
