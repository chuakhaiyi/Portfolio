import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import { Arrow } from "@/components/chrome";
import { ProjectCover } from "@/components/project-cover";
import { Reveal } from "@/components/motion";

export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  return { title: project?.name ?? "Project not found", description: project?.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return <main id="main" tabIndex={-1} className="case-study shell"><Link className="text-link back-link" href="/#work">← Selected work</Link><span className="eyebrow">{project.category} / {project.date}</span><h1>{project.name}<span className="accent">.</span></h1><p className="case-intro">{project.summary}</p><div className="case-facts"><div><span>MY ROLE</span><p>{project.role}</p></div><div><span>TEAM / SCOPE</span><p>{project.team}</p></div><div><span>OUTCOME</span><p>{project.result}</p></div></div><ProjectCover kind={project.cover} name={project.name} /><p className="asset-placeholder">[ADD PROJECT SCREENSHOT] — the cover above is a typographic study, not an application screenshot.</p><div className="case-body"><aside><span className="eyebrow">BUILT WITH</span><ul>{project.stack.map(tech => <li key={tech}>{tech}</li>)}</ul>{project.repo ? <a className="button button-light" href={project.repo}>View repository <Arrow diagonal /></a> : <p className="placeholder">[ADD REPOSITORY LINK]</p>}<p className="placeholder">[ADD LIVE / DEMO LINK]</p></aside><div><Reveal><h2>The project</h2><p>{project.details}</p><h2>My contribution</h2><p>{project.contribution}</p><h2>The challenge</h2><p className={project.challenge.startsWith("[") ? "placeholder" : ""}>{project.challenge}</p>{project.source && <p className="source-note">Project functionality and stack summarized from the <a href={project.source}>project README ↗</a>. Personal contributions come from my resume and account of the project.</p>}</Reveal></div></div><Link className="next-project" href={`/work/${next.slug}`}><span><span className="eyebrow">NEXT PROJECT</span><strong>{next.name}</strong></span><Arrow diagonal /></Link></main>;
}

