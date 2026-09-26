import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollProgress } from '../context/ScrollContext';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }) {
  const { scrollProgress, setActiveSection } = useScrollProgress();
  const lenisRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // 2. Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Drive Lenis via GSAP Ticker to eliminate clock desync
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // 4. Master ScrollTrigger pinned across the physical DOM track
    const trigger = ScrollTrigger.create({
      trigger: '#scrolly-container',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.1,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;

        // Dynamic section detection
        const p = self.progress;
        if (p < 0.18) setActiveSection('hero');
        else if (p < 0.38) setActiveSection('about');
        else if (p < 0.58) setActiveSection('skills');
        else if (p < 0.82) setActiveSection('projects');
        else if (p < 0.92) setActiveSection('experience');
        else setActiveSection('contact');
      },
    });

    return () => {
      trigger.kill();
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [scrollProgress, setActiveSection]);

  return children;
}
