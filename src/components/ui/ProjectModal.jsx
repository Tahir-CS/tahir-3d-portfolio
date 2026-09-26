import { X, ExternalLink, CheckCircle2, Cpu } from 'lucide-react';
import { TechIcon, GithubIcon } from '../TechIcons';
import { sound } from '../../utils/soundEngine';

export function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-[#0c1017] border border-cyan-500/40 rounded-3xl shadow-[0_0_80px_rgba(0,240,255,0.2)] p-6 sm:p-8 space-y-6 text-white font-sans">
        {/* Modal Close Button */}
        <button
          onClick={() => {
            sound.playClick(1.0);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
            <Cpu className="w-4 h-4" />
            <span>{project.category || 'SYSTEM MODULE'}</span>
          </div>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">
            {project.title}
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed pt-2">
            {project.description}
          </p>
        </div>

        {/* High-Res UI Screenshot */}
        {project.image && (
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
            <img
              src={project.image}
              alt={project.title}
              className="w-full object-cover max-h-[380px]"
            />
          </div>
        )}

        {/* Architecture Specs */}
        {project.architecture && (
          <div className="space-y-3 font-mono text-xs border-t border-white/10 pt-4">
            <span className="text-cyan-400 font-bold uppercase tracking-wider block">
              // ARCHITECTURAL HIGHLIGHTS
            </span>
            <div className="space-y-2">
              {project.architecture.map((arch, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{arch}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Badges */}
        {project.techStack && (
          <div className="space-y-2 border-t border-white/10 pt-4">
            <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block">
              DEPLOYED STACK:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-mono text-xs"
                >
                  <TechIcon name={tech} size={14} />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(1.2)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all hover:scale-105"
            >
              <GithubIcon className="w-4 h-4 text-cyan-400" />
              <span>Source Repository</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(1.2)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
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
