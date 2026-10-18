import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollProgress } from '../context/ScrollContext';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }) {
  const { scrollProgress, setActiveSection, setScrollPercent, setWireframeMode } = useScrollProgress();
  const lenisRef = useRef(null);

  // Keyboard shortcut: Press 'D' to toggle Diagnostic Wireframe Mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'd' || e.key === 'D') {
        // Only if not in an input
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
        setWireframeMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setWireframeMode]);

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
        const pct = Math.round(self.progress * 100);
        setScrollPercent((prev) => (Math.abs(prev - pct) >= 2 ? pct : prev));

        // Dynamic section detection (only set state when section truly changes)
        const p = self.progress;
        const nextSec =
          p < 0.18
            ? 'hero'
            : p < 0.38
            ? 'about'
            : p < 0.58
            ? 'skills'
            : p < 0.82
            ? 'projects'
            : p < 0.92
            ? 'experience'
            : 'contact';
        setActiveSection((prev) => (prev !== nextSec ? nextSec : prev));
      },
    });

    return () => {
      trigger.kill();
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [scrollProgress, setActiveSection, setScrollPercent]);

  return children;
}
