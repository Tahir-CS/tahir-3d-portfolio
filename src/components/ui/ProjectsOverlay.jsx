import React from 'react';
import { Eye, ExternalLink } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolio.config';
import { GithubIcon } from '../TechIcons';
import { useScrollProgress } from '../../context/ScrollContext';
import { sound } from '../../utils/soundEngine';

export function ProjectsOverlay() {
  const { projects } = portfolioConfig;
  const { setSelectedProject, theme } = useScrollProgress();
  const isObsidian = theme === 'obsidian';
  const accentText = isObsidian ? 'text-cyan-400' : 'text-amber-700';

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
          <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.25em] ${accentText}`}>
            04 // VERTICAL FREE-FALL · CAMERA DESCENDING CHASM
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            Production Deployments
          </h2>
        </div>
        <span className="text-[10px] font-mono text-[var(--text-muted)] md:text-right pointer-events-auto">
          CLICK ANY 3D GLASS SLAB TO INSPECT SPEC
        </span>
      </div>

      {/* Main Flanks — no box wrappers, center void is open for 3D slabs */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
        {/* Left Flank: project list — bare horizontal rules, no apple-glass cards */}
        <div className="lg:col-span-4 space-y-0">
          <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.2em] ${accentText} block mb-2`}>
            Select Deployment
          </span>
          {projects.map((proj, idx) => (
            <button
              key={idx}
              onClick={() => handleInspect(proj)}
              className="w-full text-left py-3 border-b border-[var(--hud-line)] last:border-0 group flex items-center justify-between gap-3 hover:pl-2 transition-all duration-200"
            >
              <div className="space-y-0.5 min-w-0">
                <div className="font-mono text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors truncate">
                  {proj.index} // {proj.title}
                </div>
                <div className="text-[10px] text-[var(--text-muted)] truncate">{proj.description}</div>
              </div>
              <span className="font-mono text-[9px] text-[var(--text-muted)] shrink-0 border border-[var(--hud-line)] px-1.5 py-0.5 rounded">
                {proj.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Center Void: 3D falling glass slabs */}
        <div className="lg:col-span-4 hidden lg:block" />

        {/* Right Flank: bare text info, no box */}
        <div className="lg:col-span-4 space-y-4 lg:text-right">
          <div className="space-y-1">
            <span className={`font-mono text-[10px] uppercase tracking-[0.2em] font-bold ${accentText}`}>
              PHYSICAL GLASS MONOLITHS
            </span>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Each 3D slab is an independent physical mesh with refractive transmission and dynamic tilt reacting to camera proximity.
            </p>
            <p className="text-[9px] font-mono text-emerald-500">TRANSMISSION IOR 1.45 // REAL-TIME PBR</p>
          </div>

          {/* Quick links — bare buttons */}
          <div className="flex items-center gap-3 lg:justify-end pt-1">
            <button
              onClick={() => handleInspect(projects[0])}
              className={`flex items-center gap-1.5 text-[10px] font-mono font-bold ${accentText} hover:opacity-70 transition-opacity`}
            >
              <Eye className="w-3 h-3" />
              <span>Inspect CareerOS</span>
            </button>
            {projects[0].githubUrl && (
              <a
                href={projects[0].githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            )}
            {projects[0].liveUrl && (
              <a
                href={projects[0].liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="pointer-events-auto flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] border-t border-[var(--hud-line)] pt-4">
        <span>VERTICAL PLUMMET // 4 PHYSICAL GLASS SLABS IN CHASM</span>
        <span className="animate-pulse">SCROLL TO ORBIT INTO DEEP SPACE BEACON →</span>
      </div>
    </section>
  );
}
