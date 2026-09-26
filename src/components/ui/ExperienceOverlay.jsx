import React from 'react';
import { Briefcase, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolio.config';
import { TechIcon } from '../TechIcons';
import { useScrollProgress } from '../../context/ScrollContext';

export function ExperienceOverlay() {
  const { experience, certifications } = portfolioConfig;
  const { theme } = useScrollProgress();
  const isObsidian = theme === 'obsidian';

  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-24 select-none pointer-events-none"
    >
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-auto border-b border-[var(--hud-line)] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--glass-surface)] border border-[var(--glass-border)] text-[var(--accent-gold)]">
              05 // EXPERIENCE & PEDIGREE
            </span>
            <span className="font-mono text-xs text-[var(--text-muted)] hidden sm:inline">
              SYSTEM ARCHITECT RECORD
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            Experience & Credentials
          </h2>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="my-auto py-8 space-y-6 pointer-events-auto max-w-5xl mx-auto w-full">
        {/* Experience Timeline Cards */}
        <div className="space-y-4">
          {experience.map((exp, idx) => (
            <div
              key={idx}
              className="apple-glass p-6 sm:p-7 rounded-3xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--glass-border)] pb-3">
                <div>
                  <span className="font-mono text-[11px] font-bold text-[var(--accent-gold)] uppercase tracking-wider block">
                    {exp.company}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-0.5">
                    {exp.title}
                  </h3>
                </div>
                <div className="flex flex-col sm:items-end font-mono text-xs text-[var(--text-muted)]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {exp.description}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 pt-1">
                {exp.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Skills badges */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--glass-border)]">
                {exp.skills.map((s, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--tag-bg)] border border-[var(--glass-border)] text-[11px] font-mono text-[var(--text-secondary)]"
                  >
                    <TechIcon name={s} size={12} />
                    <span>{s}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Banner */}
        <div className="apple-glass p-6 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-gold)] uppercase tracking-widest">
            <Award className="w-4 h-4" />
            <span>VERIFIED INDUSTRY CERTIFICATIONS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--glass-surface)] border border-[var(--glass-border)] hover:scale-105 transition-transform"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-10 h-10 object-contain rounded-xl p-1 bg-white/5 border border-[var(--glass-border)]"
                />
                <div className="space-y-0.5">
                  <div className="font-semibold text-xs text-[var(--text-primary)] line-clamp-1">
                    {cert.title}
                  </div>
                  <div className="font-mono text-[10px] text-[var(--text-muted)]">
                    {cert.issuer} • {cert.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="pointer-events-auto flex items-center justify-between text-xs font-mono text-[var(--text-muted)] border-t border-[var(--hud-line)] pt-4">
        <span>VERIFIED CREDENTIALS // IBM · AWS · META</span>
        <span className="animate-pulse">SCROLL TO ORBITAL UPLINK NODE →</span>
      </div>
    </section>
  );
}
