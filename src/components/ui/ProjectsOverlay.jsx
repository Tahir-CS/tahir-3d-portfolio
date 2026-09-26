import React from 'react';
import { FolderGit2, ExternalLink, Eye, Cpu } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolio.config';
import { TechIcon, GithubIcon } from '../TechIcons';
import { useScrollProgress } from '../../context/ScrollContext';
import { sound } from '../../utils/soundEngine';

export function ProjectsOverlay() {
  const { projects } = portfolioConfig;
  const { setSelectedProject } = useScrollProgress();

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
      className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-20 pointer-events-none"
    >
      <div className="max-w-5xl w-full pointer-events-auto space-y-6">
        {/* Header */}
        <div className="backdrop-blur-2xl bg-black/50 border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-yellow-400 uppercase tracking-widest">
            <FolderGit2 className="w-4 h-4" />
            <span>// ACTIVE_DEPLOYMENTS // NODE-04</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Deployment Pipeline
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-mono">
            Interactive conveyor modules. Click any deployment to inspect full system architecture & UI preview.
          </p>
        </div>

        {/* Project Cards Deck */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="backdrop-blur-xl bg-black/50 border border-white/10 hover:border-cyan-500/40 p-6 rounded-3xl transition-all duration-300 hover:bg-black/70 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-cyan-400 font-bold tracking-wider">
                    MODULE_{proj.index}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-300">
                    {proj.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {proj.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {proj.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                    >
                      <TechIcon name={tech} size={12} />
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <button
                  onClick={() => handleInspect(proj)}
                  className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold transition-all hover:scale-105"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Spec</span>
                </button>

                <div className="flex items-center gap-2">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.playClick(1.2)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-all"
                      title="Source Code"
                    >
                      <GithubIcon className="w-4 h-4 text-cyan-400" />
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.playClick(1.2)}
                      className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 transition-all"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
