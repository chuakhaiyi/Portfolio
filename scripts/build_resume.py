"""Rebuild the updated PDF from user-supplied content; preserve the source resume."""
from pathlib import Path
from shutil import copyfile
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output/pdf/Louis_Chua_Khai_Yi_Resume_Updated.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)
styles = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=23, leading=27, spaceAfter=8),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=8.3, leading=12, spaceAfter=2),
    "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=10, leading=13, spaceBefore=12, spaceAfter=6),
    "entry": ParagraphStyle("entry", fontName="Helvetica-Bold", fontSize=9.6, leading=13, spaceAfter=3),
    "meta": ParagraphStyle("meta", fontName="Helvetica", fontSize=8.5, leading=12, textColor=colors.HexColor("#42484f"), spaceAfter=4),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9.2, leading=12.4, spaceAfter=5, alignment=TA_LEFT),
}
story = []
def para(text, style="body"):
    return Paragraph(text, styles[style])
def section(text):
    story.append(para(text, "section"))
def entry(title, meta, body):
    story.append(KeepTogether([para(title, "entry"), para(meta, "meta"), para(body), Spacer(1, 3)]))
def link(url, label):
    return f'<link href="{url}" color="#283f56">{label}</link>'

story += [para("Louis Chua Khai Yi", "name"),
    para("Artificial Intelligence Undergraduate | AI Engineering &amp; Junior Software Development", "meta"),
    para('+6011 1142 8845 | '+link('mailto:yiclouis0702@gmail.com','yiclouis0702@gmail.com')+' | Johor Bahru, Malaysia', "contact"),
    para(link('https://www.linkedin.com/in/louis-chua-khai-yi','linkedin.com/in/louis-chua-khai-yi')+' | '+link('https://github.com/chuakhaiyi','github.com/chuakhaiyi'), "contact")]
section("PROFILE")
story.append(para("Artificial Intelligence undergraduate at Xiamen University Malaysia seeking AI engineering or junior software development opportunities. Experience in machine learning, deep learning, and computer vision through coursework, with frontend and backend contributions across four team hackathons. Built Ledge, a Windows desktop notes application. Fluent in Mandarin, English, and Malay."))
section("TECHNICAL SKILLS")
story.append(para("<b>Programming:</b> Python, C, C++, Kotlin; C# and TypeScript used in projects.<br/><b>AI and data:</b> PyTorch, Scikit-learn, NLP, computer vision, Pandas, NumPy, Matplotlib, Weka.<br/><b>Application development:</b> React, Next.js, Node.js/Express, Jetpack Compose, Room, Hilt, WPF/.NET 8, Streamlit, Supabase.<br/><b>Tools:</b> Git, Excel, Adobe Premiere Pro, Adobe After Effects."))
section("PERSONAL PROJECT")
entry("Ledge | Windows desktop application", "C# / WPF / .NET 8 / Win32 | "+link("https://github.com/chuakhaiyi/Ledge", "github.com/chuakhaiyi/Ledge"), "Built a Windows sticky-note application with edge docking, hover previews, floating notes, and keyboard shortcuts. Supports local JSON storage, pinning, archiving, and portable use without a cloud account.")
section("TEAM HACKATHONS")
entry("Suiroll | MUBA Hackathon", "6 September 2026 pitch | Four-person team | Participant", "Responsible for frontend UI during a one-week build of a blockchain contractor payroll workspace. Worked on connecting the frontend and backend. The team prototype combines AI-assisted spreadsheet imports, human approval, and USDC payments on Sui testnet. Stack: React, TypeScript, Tailwind CSS, Supabase, and Sui.<br/>"+link("https://github.com/DayDreamingLab/suirollpay", "github.com/DayDreamingLab/suirollpay"))
entry("MediSync+ | UMHackathon", "May 2026 | Finalist, 11th place | Four-person team", "Led UI development and bug fixes for an AI-powered post-discharge companion built with Kotlin, Jetpack Compose, Room, and Hilt. The team implemented a five-agent system for medication tracking, symptom triage, and risk prediction.<br/>"+link("https://github.com/chuakhaiyi/MediSyncPlus-Finalist-", "github.com/chuakhaiyi/MediSyncPlus-Finalist-"))
entry("NextChapter | USAII Hackathon", "June 2026 | Four-person team", "Contributed UI fixes and backend development to a Malaysia-focused agentic AI career pathway planner using TypeScript, Next.js, and Supabase. The project generates RM-based pathway flowcharts with feasibility scoring.")
entry("Intelligent CPD | Imagine Hackathon, Taylor's University", "June 2026 | Team project", "Built UI and backend features for advisor and admin dashboards in an AI-powered professional development platform. The team used React, Node.js/Express, and Supabase to connect client needs and advisor skill gaps to learning paths.<br/>"+link("https://github.com/DayDreamingLab/Intelligent-CPD_Louis-Mutton", "github.com/DayDreamingLab/Intelligent-CPD_Louis-Mutton"))

story += [PageBreak(), para("Louis Chua Khai Yi", "name"), para("Education, experience and coursework", "meta")]
section("EDUCATION")
entry("Bachelor of Engineering in Artificial Intelligence", "Xiamen University Malaysia | September 2024 - Present", "Coursework includes machine learning, deep learning, computer vision, and AI algorithms.")
entry("Foundation in Science", "Xiamen University Malaysia | August 2023 - August 2024", "CGPA: 3.72/4.00")
entry("Sijil Pelajaran Malaysia (SPM)", "SMK Tun Fatimah Hashim | January 2018 - March 2023", "Results: 3A+, 1A, 3A-, 2B+")
section("EXPERIENCE")
entry("Student Ambassador | Student Recruitment Office", "Xiamen University Malaysia | September 2024 - Present", "Maintained records for 40+ prospective student inquiries and supported recruitment events, ensuring timely communication with applicants and parents.")
entry("Waiter", "Cathay Restaurant Eco Spring | September 2019 - October 2020", "Served 30+ customers per shift in a fast-paced dining environment, coordinating orders and kitchen communication.")
section("UNIVERSITY INVOLVEMENT")
entry("General Affairs | Artificial Intelligence Club", "Xiamen University Malaysia | October 2025 - Present", "Coordinated logistics and materials preparation for 10+ club activities and events.")
entry("Action Team, General Affairs | Orientation", "Xiamen University Malaysia | December 2025", "Managed crowd flow and logistics for orientation events supporting 100+ incoming students.")
section("SELECTED COURSEWORK")
story.append(para("<b>Music genre classification:</b> Built PyTorch CNN and CNN+LSTM models with SpecAugment preprocessing, plus a Streamlit dashboard for model evaluation and comparison."))
story.append(para("<b>NLP chatbot:</b> Designed a Python chatbot and trained and optimized machine learning models for the target dataset."))
story.append(para("<b>AI travel planner:</b> Built a Streamlit application using the Hugging Face inference API for personalized travel recommendations."))
story.append(para("<b>AI and computer vision:</b> Implemented informed and uninformed search, simulated annealing, image transforms, stereo vision, and connected-component labelling."))
section("LANGUAGES AND STRENGTHS")
story.append(para("<b>Languages:</b> Mandarin Chinese, English, Malay.<br/><b>Strengths:</b> Problem-solving, time management, communication, teamwork, and adaptability."))

def footer(canvas, doc):
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#555b62"))
    canvas.drawRightString(A4[0] - 43, 25, str(doc.page))

SimpleDocTemplate(str(OUT), pagesize=A4, rightMargin=43, leftMargin=43, topMargin=35, bottomMargin=38, title="Louis Chua Khai Yi Resume", author="Louis Chua Khai Yi").build(story, onFirstPage=footer, onLaterPages=footer)
reader = PdfReader(OUT)
assert len(reader.pages) == 2, f"Expected two pages, got {len(reader.pages)}"
text = "\n".join(page.extract_text() for page in reader.pages)
assert all(term in text for term in ["MUBA", "Suiroll", "Ledge", "11th place", "four team hackathons"])
assert "[ADD" not in text
copyfile(OUT, ROOT / "public/Louis_Chua_Khai_Yi_Resume.pdf")
print(f"Created and checked {OUT} ({len(reader.pages)} pages)")
