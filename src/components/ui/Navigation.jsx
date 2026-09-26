import React, { useState } from 'react';
import { Volume2, VolumeX, Terminal, Cpu, Layers, FolderGit2, Send } from 'lucide-react';
import { useScrollProgress } from '../../context/ScrollContext';
import { sound } from '../../utils/soundEngine';

const SECTIONS = [
  { id: 'hero', label: '01 GATEWAY', icon: Cpu },
  { id: 'about', label: '02 CONTROL', icon: Terminal },
  { id: 'skills', label: '03 SERVERS', icon: Layers },
  { id: 'projects', label: '04 PIPELINE', icon: FolderGit2 },
  { id: 'contact', label: '05 UPLINK', icon: Send },
];

export function Navigation() {
  const { activeSection } = useScrollProgress();
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playClick(1.2);
    }
  };

  const scrollToSection = (id) => {
    sound.playClick(1.0);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 pointer-events-auto">
      {/* Brand / Status Pill */}
      <div className="flex items-center gap-3 backdrop-blur-xl bg-black/60 border border-white/10 px-4 py-2 rounded-full shadow-2xl">
        <div className="relative flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-[11px] font-bold tracking-wider text-white uppercase">
            M. TAHIR <span className="text-cyan-400">// SYS_ACTIVE</span>
          </span>
          <span className="font-mono text-[9px] text-slate-400">
            Lahore, PK (UTC+5)
          </span>
        </div>
      </div>

      {/* Center Section Nav Pills */}
      <nav className="hidden md:flex items-center gap-1 backdrop-blur-xl bg-black/60 border border-white/10 p-1.5 rounded-full shadow-2xl">
        {SECTIONS.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Controls: Audio Toggle + Contact Shortcut */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSound}
          title={isMuted ? 'Enable Audio Immersion' : 'Mute Sound'}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full border font-mono text-xs backdrop-blur-xl transition-all ${
            !isMuted
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_14px_rgba(0,240,255,0.4)]'
              : 'bg-black/60 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
          }`}
        >
          {!isMuted ? (
            <>
              <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="hidden sm:inline">AUDIO ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4" />
              <span className="hidden sm:inline">AUDIO OFF</span>
            </>
          )}
        </button>

        <button
          onClick={() => scrollToSection('contact')}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)]"
        >
          <span>Uplink</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
