import { ArrowDown, Mail, ShieldAlert } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../TechIcons';
import { portfolioConfig } from '../../config/portfolio.config';
import { sound } from '../../utils/soundEngine';

export function HeroOverlay() {
  const { personal, about } = portfolioConfig;

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-between items-center text-center px-4 sm:px-8 py-24 select-none pointer-events-none"
    >
      <div />

      {/* Main Monumental Center Hero Card */}
      <div className="max-w-3xl w-full backdrop-blur-2xl bg-black/40 border border-white/10 p-8 sm:p-12 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)] pointer-events-auto space-y-6">
        {/* Availability Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{personal.status}</span>
        </div>

        {/* Monumental Name */}
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white uppercase drop-shadow-[0_0_35px_rgba(0,240,255,0.25)]">
          {personal.name}
        </h1>

        {/* Subtitle & Role */}
        <p className="font-mono text-cyan-400 text-sm sm:text-base tracking-wide font-medium">
          {personal.title} <span className="text-slate-500">•</span> {personal.roleSubtitle}
        </p>

        {/* Core Philosophy Statement */}
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          &ldquo;{about.statement}&rdquo;
        </p>

        {/* Quick Social & Action Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {personal.social.github && (
            <a
              href={personal.social.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(1.2)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white font-mono text-xs transition-all hover:scale-105"
            >
              <GithubIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>GitHub</span>
            </a>
          )}
          {personal.social.linkedin && (
            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(1.2)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white font-mono text-xs transition-all hover:scale-105"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>LinkedIn</span>
            </a>
          )}
          <a
            href={`mailto:${personal.email}`}
            onClick={() => sound.playClick(1.2)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 font-mono text-xs transition-all hover:scale-105"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Email</span>
          </a>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="flex flex-col items-center gap-2 font-mono text-[11px] text-slate-400 animate-pulse pt-8">
        <span className="tracking-widest uppercase text-cyan-400">
          Scroll to open blast door & enter systems
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-cyan-500/40 flex justify-center p-1">
          <div className="w-1.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
