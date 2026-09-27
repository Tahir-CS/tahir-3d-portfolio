import React from 'react';
import { Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolio.config';
import { TechIcon } from '../TechIcons';
import { useScrollProgress } from '../../context/ScrollContext';

export function ExperienceOverlay() {
  const { experience, certifications } = portfolioConfig;
  const { theme } = useScrollProgress();
  const isObsidian = theme === 'obsidian';
  const accentText = isObsidian ? 'text-cyan-400' : 'text-amber-700';

  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-24 select-none pointer-events-none"
    >
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pointer-events-auto border-b border-[var(--hud-line)] pb-4">
        <div className="space-y-1">
          <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.25em] ${accentText}`}>
            05 // EXPERIENCE &amp; PEDIGREE · SYSTEM ARCHITECT RECORD
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            Experience &amp; Credentials
          </h2>
        </div>
      </div>

      {/* Timeline — full bleed, no cards, left-border vertical line */}
      <div className="my-auto space-y-0 pointer-events-auto">
        {experience.map((exp, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 border-b border-[var(--hud-line)] py-6 last:border-0"
          >
            {/* Left: dates & location */}
            <div className="lg:col-span-3 space-y-1 mb-3 lg:mb-0">
              <div className={`font-mono text-[10px] font-bold uppercase tracking-widest ${accentText}`}>
                {exp.company}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-muted)]">
                <Calendar className="w-3 h-3" />
                <span>{exp.duration}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-muted)]">
                <MapPin className="w-3 h-3" />
                <span>{exp.location}</span>
              </div>
            </div>

            {/* Right: title, description, highlights, skills */}
            <div className="lg:col-span-9 space-y-3">
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">{exp.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-2xl">{exp.description}</p>

              {/* Highlights — bare list */}
              <div className="space-y-1">
                {exp.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2 text-[10px] text-[var(--text-secondary)]">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Skill chips — minimal, no surrounding box */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {exp.skills.map((s, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono text-[var(--text-muted)] border border-[var(--hud-line)] rounded"
                  >
                    <TechIcon name={s} size={10} />
                    <span>{s}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certifications — bare grid, no apple-glass container */}
      <div className="space-y-3 pointer-events-auto border-t border-[var(--hud-line)] pt-6">
        <div className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] font-bold ${accentText}`}>
          <Award className="w-3.5 h-3.5" />
          <span>VERIFIED INDUSTRY CERTIFICATIONS</span>
        </div>
        <div className="flex flex-wrap gap-4">
          {certifications.map((cert, idx) => (
            <div key={idx} className="flex items-center gap-2 group">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-8 h-8 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
              />
              <div>
                <div className="text-[10px] font-semibold text-[var(--text-primary)] leading-none">{cert.title}</div>
                <div className="text-[9px] font-mono text-[var(--text-muted)] mt-0.5">
                  {cert.issuer} • {cert.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="pointer-events-auto flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] border-t border-[var(--hud-line)] pt-4">
        <span>VERIFIED CREDENTIALS // IBM · AWS · META</span>
        <span className="animate-pulse">SCROLL TO ORBITAL UPLINK NODE →</span>
      </div>
    </section>
  );
}
