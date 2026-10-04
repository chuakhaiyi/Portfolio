"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const animations = useRef<Animation[]>([]);
  useEffect(() => {
    if (reduce) animations.current.forEach((animation) => animation.cancel());
    return () => animations.current.forEach((animation) => animation.cancel());
  }, [reduce]);
  return <motion.div className={className} initial={false} whileInView={{ opacity: 1, y: 0 }}
    onViewportEnter={(entry) => {
      if (reduce || !entry?.target) return;
      animations.current.push(entry.target.animate(
        [{ transform: "translateY(24px)", opacity: 0.55 }, { transform: "translateY(0)", opacity: 1 }],
        { duration: 400, easing: "cubic-bezier(.16,1,.3,1)" }
      ));
      // Metadata settles after the card; artwork has its own scroll-linked movement.
      entry.target.querySelectorAll(".project-meta, .project-title").forEach((element, index) => {
        animations.current.push(element.animate(
          [{ translate: "0 16px", opacity: 0.6 }, { translate: "0 0", opacity: 1 }],
          { duration: 360, delay: 40 * (index + 1), easing: "cubic-bezier(.16,1,.3,1)" }
        ));
      });
    }} viewport={{ once: true, amount: 0.1 }}>{children}</motion.div>;
}

export function ScrollArtwork({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [38, 0, -38]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.04]);
  return <div ref={ref} className="scroll-artwork"><motion.div className="scroll-artwork-layer"
    style={reduce ? undefined : { y, scale }}>{children}</motion.div></div>;
}

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  if (reduce) return null;
  return <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX: scrollYProgress }} />;
}

export function HeroMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 65]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.3]);
  return <div ref={ref}><motion.div style={reduce ? undefined : { y, opacity }}>{children}</motion.div></div>;
}
