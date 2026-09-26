import React from 'react';
import { Mail, ArrowDown, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../TechIcons';
import { portfolioConfig } from '../../config/portfolio.config';
import { sound } from '../../utils/soundEngine';
import { useScrollProgress } from '../../context/ScrollContext';

export function HeroOverlay() {
  const { personal, about } = portfolioConfig;
  const { theme } = useScrollProgress();
  const isObsidian = theme === 'obsidian';

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-16 pt-24 pb-12 select-none pointer-events-none"
    >
      {/* Top Asymmetric Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pointer-events-auto">
        <div className="space-y-3 max-w-xl">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--glass-surface)] border border-[var(--glass-border)] text-xs font-mono tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className={isObsidian ? 'text-cyan-300' : 'text-amber-800'}>{personal.status}</span>
          </div>

          {/* Monumental Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tighter text-[var(--text-primary)] leading-[0.95]">
            {personal.name}
          </h1>

          <p className="font-mono text-xs sm:text-sm tracking-wide text-[var(--text-secondary)]">
            <span className={isObsidian ? 'text-cyan-400' : 'text-amber-700'}>// BACKEND & SYSTEMS ARCHITECT</span> · HIGH-CONCURRENCY RUNTIMES
          </p>
        </div>

        {/* Right Telemetry Column */}
        <div className="flex flex-col md:items-end gap-2 text-xs font-mono">
          <div className="px-4 py-2 rounded-2xl bg-[var(--glass-surface)] border border-[var(--glass-border)] backdrop-blur-xl space-y-1 md:text-right">
            <span className="text-[10px] text-[var(--text-muted)] uppercase block">ARCHITECTURAL SLA</span>
            <span className="text-base font-bold text-[var(--text-primary)]">&lt; 1.1ms P99 Latency</span>
            <span className="text-[10px] text-emerald-500 block">99.99% Cluster Availability</span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span className="px-2.5 py-1 rounded-lg bg-[var(--tag-bg)] border border-[var(--glass-border)] text-[11px] text-[var(--text-secondary)]">
              Go
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[var(--tag-bg)] border border-[var(--glass-border)] text-[11px] text-[var(--text-secondary)]">
              C++ Core
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[var(--tag-bg)] border border-[var(--glass-border)] text-[11px] text-[var(--text-secondary)]">
              Node.js
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[var(--tag-bg)] border border-[var(--glass-border)] text-[11px] text-[var(--text-secondary)]">
              Docker / K8s
            </span>
          </div>
        </div>
      </div>

      {/* Center 3D Space is completely open for the floating 3D MacBook Pro */}
      <div className="my-auto py-16" />

      {/* Bottom Editorial Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pointer-events-auto border-t border-[var(--hud-line)] pt-6">
        {/* Core Statement Quote */}
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md italic leading-relaxed text-center sm:text-left">
          &ldquo;{about.statement}&rdquo;
        </p>

        {/* Social & Direct Contact Links */}
        <div className="flex items-center gap-3">
          {personal.social.github && (
            <a
              href={personal.social.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(1.2)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--glass-surface)] hover:bg-[var(--glass-border)] border border-[var(--glass-border)] text-[var(--text-primary)] font-mono text-xs transition-all duration-300 hover:scale-105"
            >
              <GithubIcon className={`w-3.5 h-3.5 ${isObsidian ? 'text-cyan-400' : 'text-amber-700'}`} />
              <span>GitHub</span>
            </a>
          )}
          {personal.social.linkedin && (
            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(1.2)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--glass-surface)] hover:bg-[var(--glass-border)] border border-[var(--glass-border)] text-[var(--text-primary)] font-mono text-xs transition-all duration-300 hover:scale-105"
            >
              <LinkedinIcon className={`w-3.5 h-3.5 ${isObsidian ? 'text-cyan-400' : 'text-amber-700'}`} />
              <span>LinkedIn</span>
            </a>
          )}
          <a
            href={`mailto:${personal.email}`}
            onClick={() => sound.playClick(1.2)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold transition-all duration-300 hover:scale-105 ${
              isObsidian
                ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-[0_0_15px_rgba(180,100,20,0.3)]'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Connect</span>
          </a>
        </div>

        {/* Scroll Prompt */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-muted)] animate-pulse">
          <span>SCROLL TO DIVE INTO 3D SCREEN</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
