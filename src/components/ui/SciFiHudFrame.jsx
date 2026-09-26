import React from 'react';
import { Eye, Activity, Cpu } from 'lucide-react';
import { useScrollProgress } from '../../context/ScrollContext';
import { sound } from '../../utils/soundEngine';

export function SciFiHudFrame() {
  const { scrollPercent, wireframeMode, setWireframeMode, activeSection, theme } = useScrollProgress();

  const toggleWireframe = () => {
    sound.playHoloEngage();
    setWireframeMode((prev) => !prev);
  };

  const isObsidian = theme === 'obsidian';
  const bracketColor = isObsidian ? 'text-cyan-400' : 'text-amber-700';

  return (
    <div className="fixed inset-0 pointer-events-none z-40 select-none overflow-hidden text-[var(--text-secondary)] font-mono text-[10px]">
      {/* --- TOP LEFT CORNER BRACKET --- */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-8 flex flex-col gap-1">
        <div className={`flex items-center gap-1.5 font-bold ${bracketColor}`}>
          <span className="text-base leading-none">┌</span>
          <span className="tracking-widest uppercase">NODE // {activeSection.toUpperCase()}</span>
        </div>
        <div className="pl-3 text-[9px] text-[var(--text-muted)] hidden sm:block">
          CHOREOGRAPHY: 3D SPLINE KINEMATICS
        </div>
      </div>

      {/* --- TOP RIGHT CORNER: REALTIME TELEMETRY --- */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          {/* Animated Audio Equalizer Bars */}
          {!sound.isMuted && (
            <div className="flex items-end gap-0.5 h-3">
              <span className={`w-0.5 h-3 animate-[bounce_0.6s_ease-in-out_infinite] ${isObsidian ? 'bg-cyan-400' : 'bg-amber-600'}`} />
              <span className={`w-0.5 h-2 animate-[bounce_0.8s_ease-in-out_infinite] ${isObsidian ? 'bg-cyan-400' : 'bg-amber-600'}`} />
              <span className={`w-0.5 h-3.5 animate-[bounce_0.5s_ease-in-out_infinite] ${isObsidian ? 'bg-cyan-400' : 'bg-amber-600'}`} />
              <span className={`w-0.5 h-1.5 animate-[bounce_0.7s_ease-in-out_infinite] ${isObsidian ? 'bg-cyan-400' : 'bg-amber-600'}`} />
            </div>
          )}
          <div className="flex items-center gap-1 text-emerald-500 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>60 FPS // 1.1ms</span>
            <span className="text-base leading-none">┐</span>
          </div>
        </div>
        <div className="pr-3 text-[9px] text-[var(--text-muted)] hidden sm:block">
          RENDER: R3F WEBGL2 PIPELINE
        </div>
      </div>

      {/* --- BOTTOM LEFT: SCROLL PROGRESS TAPE --- */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 flex flex-col gap-1">
        <div className={`flex items-center gap-2 font-bold ${bracketColor}`}>
          <span className="text-base leading-none">└</span>
          <span className="tracking-widest">
            TRAJECTORY: {String(scrollPercent).padStart(3, '0')}%
          </span>
        </div>
        <div className="pl-3 w-28 h-1 bg-[var(--glass-border)] rounded-full overflow-hidden hidden sm:block">
          <div
            className={`h-full transition-all duration-150 ${isObsidian ? 'bg-cyan-400' : 'bg-amber-600'}`}
            style={{ width: `${scrollPercent}%` }}
          />
        </div>
      </div>

      {/* --- BOTTOM RIGHT: DIAGNOSTIC WIREFRAME SWITCH --- */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 flex flex-col items-end gap-1 pointer-events-auto">
        <button
          onClick={toggleWireframe}
          title="Toggle 3D Wireframe Diagnostic Mode (Press 'D')"
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono text-[10px] tracking-wider uppercase transition-all backdrop-blur-xl ${
            wireframeMode
              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-[0_0_15px_rgba(0,255,136,0.4)]'
              : 'bg-[var(--glass-surface)] border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--glass-border-hover)]'
          }`}
        >
          <Cpu className={`w-3.5 h-3.5 ${wireframeMode ? 'animate-spin' : ''}`} />
          <span>
            {wireframeMode ? 'WIREFRAME: ACTIVE' : 'WIREFRAME: OFF'}
          </span>
          <span className="hidden sm:inline text-[9px] text-[var(--text-muted)]">[KEY: D]</span>
          <span className="text-base leading-none">┘</span>
        </button>
      </div>
    </div>
  );
}
