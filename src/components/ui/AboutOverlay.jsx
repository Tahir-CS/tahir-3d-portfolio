import React from 'react';
import { GraduationCap, Zap } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolio.config';
import { useScrollProgress } from '../../context/ScrollContext';

export function AboutOverlay() {
  const { about } = portfolioConfig;
  const { theme } = useScrollProgress();
  const isObsidian = theme === 'obsidian';
  const accent = isObsidian ? 'text-cyan-400' : 'text-amber-700';

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-24 select-none pointer-events-none"
    >
      {/* Top Banner */}
      <div className="flex items-center justify-between pointer-events-auto border-b border-[var(--hud-line)] pb-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] font-bold text-[var(--accent-gold)] uppercase tracking-[0.25em]">
            02 // ARCHITECTURE DIVE
          </span>
          <span className="text-[10px] font-mono text-[var(--text-muted)] hidden sm:inline">
            CAMERA DIVE: TOP-DOWN INTO 3D MACBOOK DISPLAY
          </span>
        </div>
        <span className="font-mono text-[10px] text-[var(--text-muted)]">
          SYSTEM_SPEC // RUNTIME_ACTIVE
        </span>
      </div>

      {/* Main Body — Left & Right flanks, center void for 3D */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pointer-events-auto">
        {/* Left Flank: bare text, no box */}
        <div className="lg:col-span-4 space-y-5">
          {/* Profile row */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-[var(--glass-border)] flex-shrink-0">
              <img
                src="/assets/me.jpg"
                alt="Muhammad Tahir"
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Muhammad Tahir</p>
              <p className="text-[10px] font-mono text-[var(--text-muted)]">BS Computer Science</p>
              <div className="flex items-center gap-1 mt-0.5 text-[10px] text-emerald-500 font-mono">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                <span>Verified Engineer</span>
              </div>
            </div>
          </div>

          {/* Education — bare text */}
          <div className="space-y-1 border-l-2 border-[var(--hud-line)] pl-3">
            <div className={`flex items-center gap-1.5 text-[11px] font-mono font-bold ${accent}`}>
              <GraduationCap className="w-3 h-3" />
              <span>{about.education.institution}</span>
            </div>
            <p className="text-[10px] font-mono text-[var(--text-secondary)]">
              {about.education.degree} ·{' '}
              <span className="font-bold text-emerald-500">{about.education.cgpa}</span>
            </p>
            <div className="flex flex-wrap gap-1 pt-1">
              {about.education.coursework.slice(0, 4).map((c, i) => (
                <span
                  key={i}
                  className="px-1.5 py-0.5 text-[9px] font-mono text-[var(--text-muted)] border border-[var(--hud-line)] rounded"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Center Void — 3D screen dive appears here */}
        <div className="lg:col-span-4 hidden lg:block" />

        {/* Right Flank: metrics as bare editorial numbers, no box */}
        <div className="lg:col-span-4 space-y-3 lg:text-right">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--accent-gold)]">
              System Benchmarks
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
              Tactile Engineering
            </h2>
          </div>

          {/* Metrics — horizontal rule separators, no card boxes */}
          <div className="space-y-2.5 pt-2">
            {about.milestones.map((m, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 border-b border-[var(--hud-line)] pb-2 last:border-0 last:pb-0"
              >
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                  {m.label}
                </span>
                <div className="flex items-center gap-1.5">
                  <Zap className={`w-3 h-3 shrink-0 ${accent}`} />
                  <span className="text-sm font-bold font-mono text-[var(--text-primary)]">
                    {m.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="pointer-events-auto flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] border-t border-[var(--hud-line)] pt-4">
        <span>INTERACTIVE TERMINAL DISPLAYED DIRECTLY IN 3D SCREEN</span>
        <span className="animate-pulse">SCROLL TO FLY INTO CYBER CITY AVENUE →</span>
      </div>
    </section>
  );
}
