import React from 'react';
import { Cpu, GraduationCap, Zap, Database, Server, Container } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolio.config';

export function AboutOverlay() {
  const { about } = portfolioConfig;

  const milestoneIcons = [Zap, Database, Server, Container];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-20 pointer-events-none"
    >
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
        {/* Left Column: Holographic Profile Dossier */}
        <div className="lg:col-span-5 backdrop-blur-2xl bg-black/50 border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
          {/* Cyan Glow Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Profile Photo */}
          <div className="relative aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
            <img
              src="/assets/me.jpg"
              alt="Muhammad Tahir"
              className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            {/* Scanline overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent opacity-40 pointer-events-none" />
            <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center justify-between text-[11px] font-mono">
              <span className="text-cyan-400 font-bold">SYSTEM SPEC</span>
              <span className="text-emerald-400">STATUS: OPTIMAL</span>
            </div>
          </div>

          {/* Academic Specifications */}
          <div className="mt-6 space-y-3 font-mono text-xs border-t border-white/10 pt-4">
            <div className="flex items-center gap-2 text-cyan-400">
              <GraduationCap className="w-4 h-4" />
              <span className="font-bold">{about.education.institution}</span>
            </div>
            <p className="text-slate-300">
              {about.education.degree} • <span className="text-emerald-400 font-bold">{about.education.cgpa}</span>
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {about.education.coursework.map((course, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Engineering Philosophy & Milestones */}
        <div className="lg:col-span-7 space-y-6">
          <div className="backdrop-blur-2xl bg-black/50 border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <Cpu className="w-4 h-4" />
              <span>// ARCHITECTURE_CORE // NODE-02</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              The Control Room
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {about.overview}
            </p>
          </div>

          {/* 4 Milestones Cards */}
          <div className="grid grid-cols-2 gap-4">
            {about.milestones.map((m, i) => {
              const Icon = milestoneIcons[i] || Zap;
              return (
                <div
                  key={i}
                  className="backdrop-blur-xl bg-black/40 border border-white/10 p-4 sm:p-5 rounded-2xl hover:border-cyan-500/40 transition-all hover:bg-black/60 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-500">
                      SYS_{m.index}
                    </span>
                    <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-black text-white mt-1 text-cyan-300">
                    {m.metric}
                  </div>
                  <div className="text-xs font-bold text-white mt-0.5">
                    {m.label}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {m.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
