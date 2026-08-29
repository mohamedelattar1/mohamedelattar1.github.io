from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "mohamed-elattar-cv.pdf"

BG = colors.HexColor("#0A0B0B")
INK = colors.HexColor("#171A18")
MUTED = colors.HexColor("#59615C")
LINE = colors.HexColor("#D8DCD7")
PAPER = colors.HexColor("#F4F5F1")
MINT = colors.HexColor("#9EF5C7")
CORAL = colors.HexColor("#FF6E51")
BLUE = colors.HexColor("#7890FF")

PORTFOLIO = "https://mohamedelattar1.github.io/"
LINKEDIN = "https://www.linkedin.com/in/mohamed-elattar-706893261/"
EMAIL = "mailto:mohedelattar25w@gmail.com"
PHONE = "tel:+201126136967"


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="Section",
    parent=styles["Heading2"],
    fontName="Helvetica-Bold",
    fontSize=9,
    leading=11,
    textColor=INK,
    spaceBefore=5 * mm,
    spaceAfter=2.5 * mm,
    uppercase=True,
))
styles.add(ParagraphStyle(
    name="BodySmall",
    parent=styles["BodyText"],
    fontName="Helvetica",
    fontSize=8.3,
    leading=11.4,
    textColor=MUTED,
    spaceAfter=1.5 * mm,
))
styles.add(ParagraphStyle(
    name="ProjectTitle",
    parent=styles["Heading3"],
    fontName="Helvetica-Bold",
    fontSize=11,
    leading=13,
    textColor=INK,
    spaceAfter=1 * mm,
))
styles.add(ParagraphStyle(
    name="ProjectMeta",
    parent=styles["BodySmall"],
    fontName="Helvetica",
    fontSize=7.2,
    leading=9,
    textColor=MUTED,
    spaceAfter=1.4 * mm,
))
styles.add(ParagraphStyle(
    name="BulletSmall",
    parent=styles["BodySmall"],
    leftIndent=3.5 * mm,
    firstLineIndent=-2.7 * mm,
    bulletIndent=0,
    spaceAfter=.8 * mm,
))
styles.add(ParagraphStyle(
    name="Compact",
    parent=styles["BodySmall"],
    fontSize=7.8,
    leading=10.3,
    spaceAfter=.8 * mm,
))
styles.add(ParagraphStyle(
    name="Link",
    parent=styles["BodySmall"],
    fontName="Helvetica-Bold",
    fontSize=7.5,
    leading=9,
    textColor=INK,
))


def link(label, url, color="#171A18"):
    return f'<link href="{url}" color="{color}"><u>{label}</u></link>'


def section(title, number):
    return [
        Spacer(1, 1.5 * mm),
        HRFlowable(width="100%", thickness=.7, color=LINE, spaceAfter=2.5 * mm),
        Paragraph(f'<font color="#FF6E51">{number}</font>&nbsp;&nbsp;&nbsp;{title.upper()}', styles["Section"]),
    ]


def project(name, subtitle, stack, bullets):
    content = [
        Paragraph(name, styles["ProjectTitle"]),
        Paragraph(f"{subtitle} &nbsp; / &nbsp; {stack}", styles["ProjectMeta"]),
    ]
    content.extend(Paragraph(f"- {bullet}", styles["BulletSmall"]) for bullet in bullets)
    content.append(Spacer(1, 2.2 * mm))
    return KeepTogether(content)


def first_page(canvas, doc):
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(BG)
    canvas.rect(0, height - 58 * mm, width, 58 * mm, fill=1, stroke=0)
    canvas.setFillColor(MINT)
    canvas.setFont("Helvetica-Bold", 8)
    canvas.drawString(18 * mm, height - 14 * mm, "OPEN TO JUNIOR AI ROLES - REMOTE OR RELOCATION")
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica-Bold", 29)
    canvas.drawString(18 * mm, height - 29 * mm, "Mohamed Magdy Elattar")
    canvas.setFillColor(MINT)
    canvas.setFont("Helvetica", 10.5)
    canvas.drawString(18 * mm, height - 38 * mm, "Junior AI Engineer | Applied ML | AI Product Development")
    canvas.setFillColor(colors.HexColor("#C5CBC6"))
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(18 * mm, height - 48 * mm, "Cairo / Alexandria, Egypt")
    canvas.drawString(62 * mm, height - 48 * mm, "mohedelattar25w@gmail.com")
    canvas.drawString(123 * mm, height - 48 * mm, "+20 112 613 6967")
    canvas.setFillColor(BLUE)
    canvas.drawString(18 * mm, height - 53 * mm, "mohamedelattar1.github.io")
    canvas.setFillColor(colors.HexColor("#C5CBC6"))
    canvas.drawString(79 * mm, height - 53 * mm, "linkedin.com/in/mohamed-elattar-706893261")
    canvas.linkURL(PORTFOLIO, (18 * mm, height - 55 * mm, 75 * mm, height - 51 * mm), relative=0)
    canvas.linkURL(EMAIL, (62 * mm, height - 50 * mm, 120 * mm, height - 46 * mm), relative=0)
    canvas.linkURL(PHONE, (123 * mm, height - 50 * mm, 160 * mm, height - 46 * mm), relative=0)
    canvas.linkURL(LINKEDIN, (79 * mm, height - 55 * mm, 165 * mm, height - 51 * mm), relative=0)
    footer(canvas, doc)
    canvas.restoreState()


def later_pages(canvas, doc):
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(BG)
    canvas.rect(0, height - 15 * mm, width, 15 * mm, fill=1, stroke=0)
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica-Bold", 8)
    canvas.drawString(18 * mm, height - 9.5 * mm, "MOHAMED ELATTAR / AI ENGINEER")
    canvas.setFillColor(MINT)
    canvas.drawRightString(width - 18 * mm, height - 9.5 * mm, "PORTFOLIO: MOHAMEDELATTAR1.GITHUB.IO")
    canvas.linkURL(PORTFOLIO, (125 * mm, height - 12 * mm, width - 18 * mm, height - 6 * mm), relative=0)
    footer(canvas, doc)
    canvas.restoreState()


def footer(canvas, doc):
    width, _ = A4
    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, 13 * mm, width - 18 * mm, 13 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7)
    canvas.drawString(18 * mm, 8.5 * mm, "Mohamed Elattar - Curriculum Vitae")
    canvas.drawRightString(width - 18 * mm, 8.5 * mm, str(doc.page))


def build():
    doc = BaseDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=65 * mm,
        bottomMargin=18 * mm,
        title="Mohamed Elattar - AI Engineer CV",
        author="Mohamed Elattar",
        subject="Junior AI Engineer curriculum vitae",
    )
    first_frame = Frame(18 * mm, 18 * mm, A4[0] - 36 * mm, A4[1] - 83 * mm, id="first")
    later_frame = Frame(18 * mm, 18 * mm, A4[0] - 36 * mm, A4[1] - 37 * mm, id="later")
    doc.addPageTemplates([
        PageTemplate(id="first", frames=[first_frame], onPage=first_page, autoNextPageTemplate="later"),
        PageTemplate(id="later", frames=[later_frame], onPage=later_pages),
    ])

    story = []
    story += section("Profile", "01")
    story.append(Paragraph(
        "2024 Computer Science graduate and independent builder focused on applied machine learning, agentic AI, and full-stack AI products. Built working projects across pharmacy operations, multi-agent systems, IoT monitoring, automation, and computer vision. Strong foundation in Python, SQL, TensorFlow, LLM APIs, and modern web development.",
        styles["BodySmall"],
    ))
    story += section("Core Skills", "02")
    skill_table = Table([
        [Paragraph("AI / ML", styles["Link"]), Paragraph("Python, TensorFlow, PyTorch, scikit-learn, pandas, computer vision, forecasting", styles["Compact"])],
        [Paragraph("LLM Systems", styles["Link"]), Paragraph("Agent orchestration, RAG, vector search, LLM APIs, OCR workflows, MCP", styles["Compact"])],
        [Paragraph("Product Engineering", styles["Link"]), Paragraph("React, TypeScript, FastAPI, PostgreSQL, Supabase RLS, Firebase, SQL, Vercel", styles["Compact"])],
    ], colWidths=[30 * mm, 140 * mm])
    skill_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -2), .4, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ]))
    story.append(skill_table)
    story += section("Selected Projects", "03")
    story.append(project(
        "Meridian - Multi-Branch Pharmacy SaaS",
        "Independent build",
        "React, PostgreSQL, Supabase, RLS",
        [
            "Designed a multi-tenant pharmacy operations platform covering POS, inventory, purchasing, analytics, and role-based branch workflows.",
            "Implemented a seven-tier permission model with Postgres Row-Level Security and migrated the architecture from Firebase to a relational data model.",
        ],
    ))
    story.append(project(
        "LegalMind AI - Multi-Agent Legal System",
        "Architecture and prototype research",
        "Python, vector search, LLM orchestration",
        [
            "Designed an 11-agent architecture with hybrid retrieval for document-heavy legal workflows across MENA, US, UK, and EU contexts.",
            "Evaluated embedding, OCR, and generative-model strategies and produced a complete build specification and test pack.",
        ],
    ))
    story.append(project(
        "FitAI - Adaptive Fitness and Nutrition",
        "Mobile-first AI product",
        "React, TypeScript, Node, Firebase",
        [
            "Built personalized workout and meal planning from survey data, uploaded body-composition PDFs, and live weather context.",
            "Designed quarterly adaptation, calendar tracking, monthly AI adjustments, and safety interrupts for injuries or goal changes.",
        ],
    ))

    story.append(PageBreak())
    story += section("Additional Product Work", "04")
    story.append(project(
        "IoT Fleet Monitoring Platform",
        "Field sensors and GPS operations",
        "Realtime data, role-based dashboards, mapping",
        [
            "Designed a multi-tenant monitoring platform for smart drains and bins with live GPS mapping and four operational user roles.",
            "Built reporting workflows and prepared the system for load testing and customer onboarding.",
        ],
    ))
    story.append(project(
        "AI-Powered Google Workspace Assistant",
        "Email and form automation",
        "n8n, Gmail API, Google Forms",
        [
            "Automated email intent classification, response drafting, and Forms-to-stakeholder notifications without manual routing.",
        ],
    ))
    story += section("Applied ML Highlights", "05")
    ml_rows = [
        ["Computer Vision", "TensorFlow mask-detection CNN, approximately 91% accuracy."],
        ["Classification", "Earthquake damage and bankruptcy prediction with bias and class-imbalance analysis."],
        ["Forecasting", "GARCH volatility and ARMA air-quality models using API and time-series data."],
        ["Unsupervised Learning", "K-means customer segmentation with PCA and an interactive Plotly dashboard."],
    ]
    ml_table = Table([
        [Paragraph(f"<b>{name}</b>", styles["Compact"]), Paragraph(desc, styles["Compact"])]
        for name, desc in ml_rows
    ], colWidths=[42 * mm, 128 * mm])
    ml_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BACKGROUND", (0, 0), (-1, -1), PAPER),
        ("LINEBELOW", (0, 0), (-1, -2), .4, LINE),
        ("BOX", (0, 0), (-1, -1), .4, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.append(ml_table)
    story += section("Education and Certifications", "06")
    education = [
        ["2020 - 2024", "Bachelor of Computer Science", "Arab Academy for Science, Technology and Maritime Transport - GPA 3.1 (Very Good)"],
        ["2023 - 2024", "Diploma in Machine Learning and AI", "Amit Learning - Grade: Excellent (95%)"],
        ["2024", "AI Lab: Deep Learning for Computer Vision", "WorldQuant University - TensorFlow and PyTorch"],
    ]
    edu_table = Table([
        [Paragraph(f'<font color="#7890FF"><b>{period}</b></font>', styles["Compact"]), Paragraph(f"<b>{degree}</b><br/>{school}", styles["Compact"])]
        for period, degree, school in education
    ], colWidths=[28 * mm, 142 * mm])
    edu_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -2), .4, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.append(edu_table)
    story += section("Languages and Links", "07")
    story.append(Paragraph(
        f"Arabic: Native &nbsp;&nbsp;&nbsp; English: Professional working proficiency<br/>"
        f"{link('Portfolio', PORTFOLIO, '#536EE8')} &nbsp;&nbsp; "
        f"{link('LinkedIn', LINKEDIN, '#536EE8')} &nbsp;&nbsp; "
        f"{link('Email', EMAIL, '#536EE8')}",
        styles["BodySmall"],
    ))
    doc.build(story)


if __name__ == "__main__":
    build()
