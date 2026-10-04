import Link from "next/link";
import { Arrow } from "@/components/chrome";
import { HeroMotion, Reveal } from "@/components/motion";
import { ProjectCover } from "@/components/project-cover";
import { profile, projects, skills } from "@/lib/content";

export default function Home() {
  return <main id="main" tabIndex={-1}>
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-eyebrow"><span>LOUIS CHUA KHAI YI</span><span>JOHOR BAHRU, MALAYSIA <span className="small-cross">+</span></span></div>
      <HeroMotion><h1 id="hero-title">Louis<span className="hero-last"> Chua<span className="hero-dot">.</span></span></h1></HeroMotion>
      <div className="hero-bottom"><div><p className="hero-pitch">AI undergraduate.<br /><span>Software builder.</span></p><p className="hero-description">Exploring machine learning, building interfaces,<br className="desktop-break" /> and connecting the two.</p><div className="hero-actions"><a className="button button-light" href="#work">View work <Arrow /></a><a className="text-link" href={profile.resume} download>Download résumé <span aria-hidden="true">↓</span></a><a className="text-link" href="#contact">Contact <Arrow diagonal /></a></div></div><div className="hero-aside"><span className="tiny-label">LOOKING AHEAD</span><p>AI engineering.<br />Junior software development.</p><a href="#work" className="scroll-link" aria-label="Scroll to explore selected work"><span>SCROLL TO EXPLORE</span><span className="scroll-circle">↓</span></a></div></div>
      <div className="hero-baseline"><span>CODE, INTERFACE & EVERYTHING BETWEEN</span><span>01 — {String(projects.length).padStart(2, "0")}</span></div>
    </section>

    <section id="work" className="work-section shell" aria-labelledby="work-title">
      <Reveal><div className="section-heading"><div><span className="eyebrow">01 / SELECTED WORK</span><h2 id="work-title">Built to be used<span className="accent">.</span></h2></div><p>Three personal apps. Four team hackathons.<br />Different problems, hands-on learning.</p></div></Reveal>
      <div className="project-grid">{projects.map((project, index) => <Reveal key={project.slug} className={`project-item project-${index}`}><Link className="project-link" href={`/work/${project.slug}`}><ProjectCover kind={project.cover} name={project.name} /><div className="project-meta"><span>{String(index + 1).padStart(2, "0")} / {project.category}</span><span>{project.slug === "medisync" ? "FINALIST · 11TH PLACE" : project.slug === "ledge" ? "WINDOWS" : "2026"}</span></div><div className="project-title"><h3>{project.name}</h3><span className="project-arrow"><Arrow diagonal /></span></div><p className="project-tagline">{project.tagline}</p><div className="stack">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div></Link></Reveal>)}</div>
    </section>

    <section id="about" className="about-section shell" aria-labelledby="about-title"><Reveal><span className="eyebrow">02 / A LITTLE CONTEXT</span><div className="about-grid"><h2 id="about-title">Learning the systems.<br /><span>Building the experience.</span></h2><div className="about-copy"><p>I’m Louis, an Artificial Intelligence undergraduate at Xiamen University Malaysia. My coursework spans machine learning, deep learning, and computer vision.</p><p>Outside coursework, I build software and take part in hackathons. My contributions have included frontend UI, backend features, and the work of connecting them.</p><p>I’m looking for opportunities in AI engineering or junior software development.</p><div className="language-line">Mandarin <span>/</span> English <span>/</span> Malay</div></div></div></Reveal><Reveal><div className="skills-grid">{skills.map(group => <div key={group.title}><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></Reveal></section>

    <section id="experience" className="journey-section shell" aria-labelledby="journey-title"><Reveal><div className="section-heading"><div><span className="eyebrow">03 / THE JOURNEY SO FAR</span><h2 id="journey-title">A work in progress<span className="accent">.</span></h2></div><p>In the classroom, on a team,<br />and learning along the way.</p></div></Reveal><div className="journey-layout"><div className="journey-label">EXPERIENCE & INVOLVEMENT</div><div className="timeline">{[
      ["OCT 2025 — PRESENT", "General Affairs", "XMUM Artificial Intelligence Club", "Coordinated logistics and materials for 10+ club activities and events."],
      ["DEC 2025", "Orientation Action Team", "Xiamen University Malaysia", "Managed crowd flow and event logistics supporting 100+ incoming students."],
      ["SEP 2024 — PRESENT", "Student Ambassador", "XMUM Student Recruitment Office", "Maintained records for 40+ prospective student inquiries and supported recruitment events."],
      ["SEP 2019 — OCT 2020", "Waiter", "Cathay Restaurant Eco Spring", "Served 30+ customers per shift, coordinating orders and kitchen communication."],
    ].map(([date, title, org, detail]) => <Reveal key={title}><article className="timeline-row"><span className="timeline-date">{date}</span><div><h3>{title}</h3><span className="timeline-org">{org}</span><p>{detail}</p></div></article></Reveal>)}</div></div><div className="journey-layout education"><div className="journey-label">EDUCATION</div><div className="timeline">{[
      ["SEP 2024 — PRESENT", "BEng in Artificial Intelligence", "Xiamen University Malaysia", "Machine learning, deep learning, computer vision, and AI coursework."],
      ["AUG 2023 — AUG 2024", "Foundation in Science", "Xiamen University Malaysia", "CGPA: 3.72 / 4.00"],
      ["JAN 2018 — MAR 2023", "Sijil Pelajaran Malaysia", "SMK Tun Fatimah Hashim", "3A+, 1A, 3A−, 2B+"],
    ].map(([date, title, org, detail]) => <Reveal key={title}><article className="timeline-row"><span className="timeline-date">{date}</span><div><h3>{title}</h3><span className="timeline-org">{org}</span><p>{detail}</p></div></article></Reveal>)}</div></div></section>

    <section id="contact" className="contact-section shell" aria-labelledby="contact-title"><Reveal><span className="eyebrow">04 / WHAT’S NEXT?</span><h2 id="contact-title">Let’s build<br /><span>something useful.</span></h2><div className="contact-bottom"><div><p>Have an AI engineering or junior developer opportunity?<br />I’d like to hear about it.</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email} <Arrow diagonal /></a></div><div className="contact-socials"><a href={profile.linkedin}>LinkedIn <Arrow diagonal /></a><a href={profile.github}>GitHub <Arrow diagonal /></a><a href={profile.resume} download>Download résumé <span aria-hidden="true">↓</span></a></div></div></Reveal></section>
  </main>;
}
