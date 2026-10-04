import Link from "next/link";
import { profile } from "@/lib/content";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} /></svg>;
}

export function Header() {
  return <><a href="#main" className="skip-link">Skip to content</a><header className="site-header"><Link className="wordmark" href="/" aria-label="lc. — Louis Chua home">lc<span>.</span></Link><nav aria-label="Main navigation"><Link href="/#work">Work</Link><Link href="/#about">About</Link><Link href="/#experience">Journey</Link><a className="nav-contact" href="/#contact">Let’s talk <Arrow diagonal /></a></nav></header></>;
}

export function Footer() {
  return <footer className="site-footer"><a className="wordmark" href="/#main" aria-label="lc. — Back to top">lc<span>.</span></a><p>© {new Date().getFullYear()} Louis Chua Khai Yi</p><div><a href={profile.github}>GitHub <Arrow diagonal /></a><a href={profile.linkedin}>LinkedIn <Arrow diagonal /></a></div><a className="back-top" href="#main">Back to top ↑</a></footer>;
}
