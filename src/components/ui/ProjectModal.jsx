import React from 'react';
import { X, ExternalLink, CheckCircle2, Cpu } from 'lucide-react';
import { TechIcon, GithubIcon } from '../TechIcons';
import { sound } from '../../utils/soundEngine';
import { useScrollProgress } from '../../context/ScrollContext';

export function ProjectModal({ project, onClose }) {
  const { theme } = useScrollProgress();
  if (!project) return null;

  const isObsidian = theme === 'obsidian';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto apple-glass rounded-3xl p-6 sm:p-8 space-y-6 text-[var(--text-primary)] font-sans">
        {/* Modal Close Button */}
        <button
          onClick={() => {
            sound.playClick(1.0);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-[var(--glass-surface)] hover:bg-[var(--glass-border)] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-gold)] uppercase tracking-widest">
            <Cpu className="w-4 h-4" />
            <span>{project.category || 'SYSTEM MODULE'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            {project.title}
          </h3>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed pt-2">
            {project.description}
          </p>
        </div>

        {/* High-Res UI Screenshot */}
        {project.image && (
          <div className="rounded-2xl overflow-hidden border border-[var(--glass-border)] shadow-2xl bg-black">
            <img
              src={project.image}
              alt={project.title}
              className="w-full object-cover max-h-[380px]"
            />
          </div>
        )}

        {/* Architecture Specs */}
        {project.architecture && (
          <div className="space-y-3 font-mono text-xs border-t border-[var(--glass-border)] pt-4">
            <span className="text-[var(--accent-gold)] font-bold uppercase tracking-wider block">
              // ARCHITECTURAL HIGHLIGHTS
            </span>
            <div className="space-y-2">
              {project.architecture.map((arch, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[var(--text-secondary)]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{arch}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Badges */}
        {project.techStack && (
          <div className="space-y-2 border-t border-[var(--glass-border)] pt-4">
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider block">
              DEPLOYED STACK:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--tag-bg)] border border-[var(--glass-border)] font-mono text-xs text-[var(--text-secondary)]"
                >
                  <TechIcon name={tech} size={14} />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 border-t border-[var(--glass-border)] pt-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(1.2)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--glass-surface)] hover:bg-[var(--glass-border)] border border-[var(--glass-border)] text-[var(--text-primary)] font-mono text-xs font-bold transition-all hover:scale-105"
            >
              <GithubIcon className={`w-4 h-4 ${isObsidian ? 'text-cyan-400' : 'text-amber-700'}`} />
              <span>Source Repository</span>
              <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(1.2)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all hover:scale-105 ${
                isObsidian
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                  : 'bg-amber-600 hover:bg-amber-700 text-white shadow-[0_0_15px_rgba(180,100,20,0.3)]'
              }`}
            >
              <span>Live Deployment</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
