import React from 'react';
import { Cpu, GraduationCap, Zap, Database, Server, Container } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolio.config';
import { useScrollProgress } from '../../context/ScrollContext';

export function AboutOverlay() {
  const { about } = portfolioConfig;
  const { theme } = useScrollProgress();
  const isObsidian = theme === 'obsidian';

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-24 select-none pointer-events-none"
    >
      {/* Top Banner: Section Marker */}
      <div className="flex items-center justify-between pointer-events-auto border-b border-[var(--hud-line)] pb-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--glass-surface)] border border-[var(--glass-border)] text-[var(--accent-gold)]">
            02 // ARCHITECTURE DIVE
          </span>
          <span className="text-xs font-mono text-[var(--text-muted)] hidden sm:inline">
            CAMERA DIVE: TOP-DOWN PERSPECTIVE INTO 3D MACBOOK DISPLAY
          </span>
        </div>
        <span className="font-mono text-xs text-[var(--text-muted)]">
          SYSTEM_SPEC // RUNTIME_ACTIVE
        </span>
      </div>

      {/* Main Split Body: Left & Right Flanks (Center is wide open for 3D screen dive) */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
        {/* Left Flank: Profile Dossier & Education */}
        <div className="lg:col-span-4 space-y-4">
          <div className="apple-glass p-5 rounded-3xl space-y-4 max-w-sm">
            {/* Small Profile Image with Scanline */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[var(--glass-border)] shadow-md flex-shrink-0">
                <img
                  src="/assets/me.jpg"
                  alt="Muhammad Tahir"
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div>
                <h3 className="font-semibold text-base text-[var(--text-primary)]">
                  Muhammad Tahir
                </h3>
                <p className="text-xs text-[var(--text-secondary)] font-mono">
                  BS Computer Science
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-500 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Verified Engineer</span>
                </div>
              </div>
            </div>

            {/* Academic Pedigree */}
            <div className="space-y-1.5 text-xs font-mono border-t border-[var(--glass-border)] pt-3">
              <div className="flex items-center gap-1.5 text-[var(--accent-gold)]">
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="font-bold">{about.education.institution}</span>
              </div>
              <p className="text-[var(--text-secondary)] text-[11px]">
                {about.education.degree} · <span className="font-bold text-emerald-500">{about.education.cgpa}</span>
              </p>
            </div>

            {/* Core Coursework Pills */}
            <div className="flex flex-wrap gap-1 pt-1">
              {about.education.coursework.slice(0, 4).map((c, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-[var(--tag-bg)] border border-[var(--glass-border)] text-[10px] font-mono text-[var(--text-secondary)]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Center Void: Open for 3D Laptop Screen Dive */}
        <div className="lg:col-span-4 hidden lg:block" />

        {/* Right Flank: Architectural Milestones */}
        <div className="lg:col-span-4 space-y-3 lg:text-right">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-gold)]">
              System Benchmarks
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
              Tactile Engineering
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2">
            {about.milestones.map((m, i) => (
              <div
                key={i}
                className="apple-glass p-3.5 rounded-2xl space-y-1 text-left"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
                  <span>SYS_{m.index}</span>
                  <Zap className={`w-3 h-3 ${isObsidian ? 'text-cyan-400' : 'text-amber-700'}`} />
                </div>
                <div className="text-lg font-bold text-[var(--text-primary)] font-mono">
                  {m.metric}
                </div>
                <div className="text-[11px] font-medium text-[var(--text-secondary)] leading-tight">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="pointer-events-auto flex items-center justify-between text-xs font-mono text-[var(--text-muted)] border-t border-[var(--hud-line)] pt-4">
        <span>INTERACTIVE TERMINAL DISPLAYED DIRECTLY IN 3D SCREEN</span>
        <span className="animate-pulse">SCROLL TO FLY INTO LIQUID CHROME OCEAN →</span>
      </div>
    </section>
  );
}
