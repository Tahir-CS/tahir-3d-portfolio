import React from 'react';
import { Briefcase, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolio.config';
import { TechIcon } from '../TechIcons';

export function ExperienceOverlay() {
  const { experience, certifications } = portfolioConfig;

  return (
    <section
      id="experience"
      className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-20 pointer-events-none"
    >
      <div className="max-w-5xl w-full pointer-events-auto space-y-8">
        {/* Header */}
        <div className="backdrop-blur-2xl bg-black/50 border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-rose-400 uppercase tracking-widest">
            <Briefcase className="w-4 h-4" />
            <span>// CAREER_CORRIDOR // NODE-05</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Work Experience & Certifications
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-mono">
            High-impact university infrastructure systems and verified credentials.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-4">
          {experience.map((exp, idx) => (
            <div
              key={idx}
              className="backdrop-blur-xl bg-black/50 border border-white/10 hover:border-cyan-500/40 p-6 sm:p-8 rounded-3xl transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <span className="font-mono text-[11px] text-cyan-400 font-bold uppercase tracking-wider block">
                    {exp.company}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-0.5">
                    {exp.title}
                  </h3>
                </div>
                <div className="flex flex-col sm:items-end font-mono text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {exp.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2 pt-2">
                {exp.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Skills badges */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                {exp.skills.map((s, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
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
        <div className="backdrop-blur-xl bg-black/50 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
            <Award className="w-4 h-4" />
            <span>VERIFIED CREDENTIALS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-all hover:bg-white/10"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-10 h-10 object-contain rounded-lg bg-black/40 p-1 border border-white/10"
                />
                <div className="space-y-0.5">
                  <div className="font-bold text-xs text-white line-clamp-1">
                    {cert.title}
                  </div>
                  <div className="font-mono text-[10px] text-cyan-400">
                    {cert.issuer} • {cert.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
