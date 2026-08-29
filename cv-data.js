/* ============================================================
   CV DATA — Mohamed Magdy Elattar
   Edit this file to update the CV page (cv.html).
   No HTML knowledge needed: just change the text between quotes.
   ============================================================ */

window.CV = {

  basics: {
    name: "Mohamed Magdy Elattar",
    title: "Junior AI Engineer · Applied Machine Learning · AI Product Development",
    location: "Cairo / Alexandria, Egypt · Remote or relocation",
    phone: "+20 112 613 6967",
    phoneHref: "tel:+201126136967",
    email: "mohedelattar25w@gmail.com",
    linkedin: "https://www.linkedin.com/in/mohamed-elattar-706893261/",
    portfolio: "https://mohamedelattar1.github.io/",
    pdf: "assets/mohamed-elattar-cv.pdf"
  },

  profile: "2024 Computer Science graduate and independent builder focused on applied machine learning, agentic AI, and full-stack AI products. Built self-directed projects spanning a multi-tenant pharmacy platform, multi-agent systems, IoT monitoring, automation, and computer vision. Strong foundation in Python, SQL, TensorFlow, LLM APIs, and modern web development, with the curiosity and discipline to take ideas from architecture to working prototypes.",

  projects: {
    number: "02",
    label: "SELECTED AI & SOFTWARE PROJECTS",
    role: "Independent Project Builder",
    period: "2023 – Present",
    items: [
      {
        name: "Meridian",
        sub: "Multi-Branch Pharmacy SaaS Platform",
        stack: ["React", "Supabase (Postgres)", "Vercel", "Row-Level Security"],
        bullets: [
          "Architected and built a multi-tenant SaaS platform for Egyptian multi-branch pharmacy chains, migrating the system from an initial Firebase/Firestore prototype to a relational Postgres/Supabase stack to support complex role-based access and reporting.",
          "Designed a seven-tier role hierarchy enforced end-to-end with Postgres Row-Level Security (RLS), covering branch-, chain-, and account-level data isolation.",
          "Audited RLS, realtime subscriptions, backups, and capacity; produced a practical hardening roadmap and researched pricing and local competitors to prepare the product for pilot use."
        ]
      },
      {
        name: "LegalMind AI",
        sub: "Multi-Agent Legal Operating System",
        stack: ["Python", "Vector DB", "LLM Orchestration"],
        bullets: [
          "Designed a multi-agent architecture with 11 specialist agents and hybrid (vector + keyword) search for an AI legal assistant targeting MENA, US, UK, and EU law firms.",
          "Produced a full build specification, design-principles document, and a UAE-market test pack; evaluated GLM-5.2 for generative agent tasks and selected an embedding strategy (BGE) and OCR approach for document-heavy workflows."
        ]
      },
      {
        name: "FitAI",
        sub: "Adaptive Fitness & Nutrition App",
        stack: ["React", "TypeScript", "Node/Express", "Firebase"],
        bullets: [
          "Built a mobile-first web app that generates personalized workout and meal plans using an LLM, combining survey data, uploaded body-composition PDFs, and live weather data.",
          "Designed a v2 adaptive quarterly planning system with calendar-based tracking, monthly AI-driven plan adjustments, and a safety interrupt for injuries or goal changes."
        ]
      },
      {
        name: "IoT Fleet Monitoring Platform",
        sub: "Full-Stack Web App · Role-Based Access · GPS Mapping",
        stack: ["Multi-Tenant", "Realtime", "GPS Mapping"],
        bullets: [
          "Designed and led development of a multi-tenant monitoring platform for IoT field sensors (smart drains, smart bins) with live GPS mapping of deployed units.",
          "Architected role-based dashboards for 4 user types (Admin, Manager, Worker, Viewer) and automated stakeholder reporting; currently load-testing ahead of onboarding paying customers."
        ]
      },
      {
        name: "AI-Powered Google Workspace Assistant",
        sub: "n8n · Gmail & Forms Automation",
        stack: ["n8n", "Gmail API", "Google Forms"],
        bullets: [
          "Built an automated assistant classifying incoming emails by intent (marketing, support, spam) and auto-generating replies, plus a Forms-to-stakeholder notification pipeline — running end-to-end without manual intervention."
        ]
      }
    ]
  },

  dataScience: {
    number: "03",
    label: "FEATURED DATA SCIENCE & MACHINE LEARNING PROJECTS",
    items: [
      { name: "Mask Detection (Computer Vision)", desc: "Trained a TensorFlow CNN to detect face masks in images, ~91% accuracy." },
      { name: "Earthquake Damage Prediction (Nepal)", desc: "Logistic regression and decision-tree models on structural data from SQLite, identifying and correcting discriminatory bias in the dataset." },
      { name: "Volatility Forecasting (India)", desc: "GARCH model over API-sourced stock data, served through a custom API." },
      { name: "Bankruptcy Prediction (Poland)", desc: "Random forest and gradient boosting models with resampling to address severe class imbalance." },
      { name: "Customer Segmentation (US)", desc: "K-means clustering with PCA, delivered via an interactive Plotly Dash dashboard." },
      { name: "Air Quality (Nairobi) · Real Estate (Buenos Aires) · Housing Prices (Mexico)", desc: "ARMA time-series modeling, regression pipelines with missing-value imputation, and price-driver analysis on 21,000+ records." }
    ]
  },

  graduation: {
    number: "04",
    label: "GRADUATION PROJECT",
    name: "Smart Drain — IoT Structural Health Monitoring",
    period: "2024",
    bullets: [
      "Designed an IoT system measuring street-drain water levels for early flood/damage detection, with multi-level sensors, color-coded alerting, and MQTT-based real-time transmission to a Firebase-backed dashboard, powered by solar + battery backup."
    ]
  },

  education: {
    number: "05",
    label: "EDUCATION & CERTIFICATIONS",
    schools: [
      { degree: "Bachelor of Computer Science", school: "Arab Academy for Science, Technology & Maritime Transport", period: "2020 – 2024", grade: "GPA: 3.1 (Very Good)" },
      { degree: "Diploma in Machine Learning & Artificial Intelligence", school: "Amit Learning", period: "2023 – 2024", grade: "Grade: Excellent (95%)" }
    ],
    certs: [
      { title: "Machine Learning & AI — Amit Learning (2024)", detail: "" },
      { title: "AI Lab: Deep Learning for Computer Vision — WorldQuant University (07/2024 – 12/2024)", detail: "CNNs, image classification, object detection, and facial recognition with TensorFlow and PyTorch." }
    ]
  },

  skills: {
    number: "06",
    label: "TECHNICAL SKILLS",
    groups: [
      { category: "Core", items: ["Python", "SQL", "TypeScript/JavaScript", "LLM API Integration (Claude, GLM)", "Multi-Agent Orchestration", "PostgreSQL (Supabase, Row-Level Security)", "React", "FastAPI"] },
      { category: "Familiar with", items: ["Java", "PyTorch", "TensorFlow", "scikit-learn", "MCP Tool Protocols", "Vector Search (pgvector)", "RAG", "Firebase/Firestore", "MongoDB", "SQLite", "Celery", "pandas", "ETL Pipelines", "Vite", "JavaFX", "Streamlit", "Plotly Dash", "Vercel", "Render", "MQTT/IoT", "Twilio", "n8n", "Google Workspace API"] }
    ]
  },

  languages: {
    number: "07",
    label: "LANGUAGES",
    items: [
      { name: "Arabic", level: "Native" },
      { name: "English", level: "Professional Working Proficiency" }
    ]
  }
};
