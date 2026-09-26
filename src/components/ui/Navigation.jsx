import React, { useState } from 'react';
import { Volume2, VolumeX, Terminal, Cpu, Layers, FolderGit2, Send, Sun, Moon } from 'lucide-react';
import { useScrollProgress } from '../../context/ScrollContext';
import { sound } from '../../utils/soundEngine';

const SECTIONS = [
  { id: 'hero', label: '01 WORKSTATION', icon: Cpu },
  { id: 'about', label: '02 ARCHITECTURE', icon: Terminal },
  { id: 'skills', label: '03 INFRASTRUCTURE', icon: Layers },
  { id: 'projects', label: '04 DEPLOYMENTS', icon: FolderGit2 },
  { id: 'contact', label: '05 UPLINK', icon: Send },
];

export function Navigation() {
  const { activeSection, theme, toggleTheme } = useScrollProgress();
  const [isMuted, setIsMuted] = useState(true);

  const isObsidian = theme === 'obsidian';

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playClick(1.2);
    }
  };

  const handleThemeToggle = () => {
    sound.playClick(1.3);
    toggleTheme();
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
      <div className="flex items-center gap-3 backdrop-blur-xl bg-[var(--glass-surface)] border border-[var(--glass-border)] px-4 py-2 rounded-full shadow-2xl transition-all duration-300">
        <div className="relative flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-[11px] font-bold tracking-wider text-[var(--text-primary)] uppercase">
            M. TAHIR <span className={isObsidian ? 'text-cyan-400' : 'text-amber-700'}>// ARCHITECT</span>
          </span>
          <span className="font-mono text-[9px] text-[var(--text-muted)]">
            Lahore, PK (UTC+5)
          </span>
        </div>
      </div>

      {/* Center Section Nav Pills */}
      <nav className="hidden lg:flex items-center gap-1 backdrop-blur-xl bg-[var(--glass-surface)] border border-[var(--glass-border)] p-1.5 rounded-full shadow-2xl transition-all duration-300">
        {SECTIONS.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs transition-all ${
                isActive
                  ? isObsidian
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                    : 'bg-amber-600/15 text-amber-900 border border-amber-600/30 shadow-[0_0_10px_rgba(180,140,50,0.2)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 border border-transparent'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Controls: Theme Switcher + Audio Toggle + Uplink */}
      <div className="flex items-center gap-2">
        {/* Apple Style Theme Toggle Switch */}
        <button
          onClick={handleThemeToggle}
          title={isObsidian ? 'Switch to Apple Creamy Editorial Theme' : 'Switch to Obsidian Noir Theme'}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full border font-mono text-xs backdrop-blur-xl transition-all duration-300 hover:scale-105 ${
            isObsidian
              ? 'bg-white/10 border-white/20 text-white hover:bg-white/15 shadow-[0_0_15px_rgba(255,255,255,0.15)]'
              : 'bg-amber-100/80 border-amber-800/20 text-amber-950 hover:bg-amber-200/80 shadow-[0_0_15px_rgba(200,160,100,0.25)]'
          }`}
        >
          {isObsidian ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline font-bold">CREAM THEME</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-900" />
              <span className="hidden sm:inline font-bold">OBSIDIAN NOIR</span>
            </>
          )}
        </button>

        {/* Audio Immersion Toggle */}
        <button
          onClick={toggleSound}
          title={isMuted ? 'Enable Audio Immersion' : 'Mute Sound'}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full border font-mono text-xs backdrop-blur-xl transition-all ${
            !isMuted
              ? isObsidian
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_14px_rgba(0,240,255,0.4)]'
                : 'bg-amber-500/20 border-amber-600 text-amber-900'
              : 'bg-[var(--glass-surface)] border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          {!isMuted ? (
            <>
              <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="hidden md:inline">AUDIO ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4" />
              <span className="hidden md:inline">AUDIO OFF</span>
            </>
          )}
        </button>

        {/* Uplink Contact Button */}
        <button
          onClick={() => scrollToSection('contact')}
          className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 ${
            isObsidian
              ? 'bg-white text-black hover:bg-cyan-300 shadow-[0_0_20px_rgba(255,255,255,0.4)]'
              : 'bg-[#18181b] text-white hover:bg-amber-900 shadow-[0_0_15px_rgba(0,0,0,0.2)]'
          }`}
        >
          <span>Uplink</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
