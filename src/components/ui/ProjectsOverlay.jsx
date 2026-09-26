import React from 'react';
import { Eye, ExternalLink, ArrowDown } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolio.config';
import { GithubIcon } from '../TechIcons';
import { useScrollProgress } from '../../context/ScrollContext';
import { sound } from '../../utils/soundEngine';

export function ProjectsOverlay() {
  const { projects } = portfolioConfig;
  const { setSelectedProject, theme } = useScrollProgress();
  const isObsidian = theme === 'obsidian';

  const handleInspect = (proj) => {
    sound.playHoloEngage();
    setSelectedProject({
      ...proj,
      image:
        proj.index === '01'
          ? '/assets/careeros.png'
          : proj.index === '02'
          ? '/assets/yt-analysis.png'
          : proj.index === '03'
          ? '/assets/subscription-guardian.png'
          : '/assets/ecommerse store thumbnail .png',
    });
  };

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-24 select-none pointer-events-none"
    >
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-auto border-b border-[var(--hud-line)] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--glass-surface)] border border-[var(--glass-border)] text-[var(--accent-gold)]">
              04 // VERTICAL FREE-FALL
            </span>
            <span className="font-mono text-xs text-[var(--text-muted)] hidden sm:inline">
              CAMERA DIVE: DESCENDING DOWN VERTICAL CHASM
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            Production Deployments
          </h2>
        </div>

        <div className="text-xs font-mono text-[var(--text-muted)] md:text-right">
          <span>CLICK ANY 3D GLASS SLAB TO INSPECT SPEC</span>
        </div>
      </div>

      {/* Main Flanks (Center is wide open for the 3D vertical falling slabs) */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
        {/* Left Flank: Interactive Project Selection List */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="font-mono text-[11px] text-[var(--accent-gold)] uppercase tracking-wider block">
            Select Deployment
          </span>
          {projects.map((proj, idx) => (
            <div
              key={idx}
              onClick={() => handleInspect(proj)}
              className="apple-glass p-3.5 rounded-2xl cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                  {proj.index} // {proj.title}
                </span>
                <span className="font-mono text-[10px] text-[var(--text-muted)] px-2 py-0.5 rounded bg-[var(--tag-bg)]">
                  {proj.badge}
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] mt-1 line-clamp-1">
                {proj.description}
              </p>
            </div>
          ))}
        </div>

        {/* Center Void: Open for 3D Falling Glass Slabs */}
        <div className="lg:col-span-4 hidden lg:block" />

        {/* Right Flank: Direct Architecture Shortcuts */}
        <div className="lg:col-span-4 space-y-4 lg:text-right">
          <div className="apple-glass p-4 rounded-3xl space-y-3 text-left">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--accent-gold)] font-bold">PHYSICAL GLASS MONOLITHS</span>
              <span className="text-[10px] text-emerald-500">TRANSMISSION IOR 1.45</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Each 3D slab is an independent physical mesh with refractive transmission and dynamic tilt reacting to camera proximity.
            </p>
            <div className="pt-2 border-t border-[var(--glass-border)] flex items-center justify-between">
              <button
                onClick={() => handleInspect(projects[0])}
                className="flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--accent-cyan)] hover:opacity-80 transition-opacity"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect CareerOS</span>
              </button>
              <div className="flex items-center gap-2">
                {projects[0].githubUrl && (
                  <a
                    href={projects[0].githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-[var(--text-secondary)]"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {projects[0].liveUrl && (
                  <a
                    href={projects[0].liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-[var(--text-secondary)]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="pointer-events-auto flex items-center justify-between text-xs font-mono text-[var(--text-muted)] border-t border-[var(--hud-line)] pt-4">
        <span>VERTICAL PLUMMET // 4 PHYSICAL GLASS SLABS IN CHASM</span>
        <span className="animate-pulse">SCROLL TO ORBIT INTO DEEP SPACE BEACON →</span>
      </div>
    </section>
  );
}
