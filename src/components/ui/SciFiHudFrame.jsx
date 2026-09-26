import React from 'react';
import { Eye, Activity, Cpu, Radio } from 'lucide-react';
import { useScrollProgress } from '../../context/ScrollContext';
import { sound } from '../../utils/soundEngine';

export function SciFiHudFrame() {
  const { scrollPercent, wireframeMode, setWireframeMode, activeSection } = useScrollProgress();

  const toggleWireframe = () => {
    sound.playHoloEngage();
    setWireframeMode((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-40 select-none overflow-hidden text-slate-400 font-mono text-[10px]">
      {/* --- TOP LEFT CORNER BRACKET --- */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-8 flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
          <span className="text-base leading-none">┌</span>
          <span className="tracking-widest uppercase">NODE // {activeSection.toUpperCase()}</span>
        </div>
        <div className="pl-3 text-[9px] text-slate-500 hidden sm:block">
          ENCRYPTED STREAM // TLS 1.3
        </div>
      </div>

      {/* --- TOP RIGHT CORNER: REALTIME TELEMETRY --- */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          {/* Animated Audio Equalizer Bars */}
          {!sound.isMuted && (
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-3 bg-cyan-400 animate-[bounce_0.6s_ease-in-out_infinite]" />
              <span className="w-0.5 h-2 bg-cyan-400 animate-[bounce_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 h-3.5 bg-cyan-400 animate-[bounce_0.5s_ease-in-out_infinite]" />
              <span className="w-0.5 h-1.5 bg-cyan-400 animate-[bounce_0.7s_ease-in-out_infinite]" />
            </div>
          )}
          <div className="flex items-center gap-1 text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>60 FPS // 12ms</span>
            <span className="text-base leading-none">┐</span>
          </div>
        </div>
        <div className="pr-3 text-[9px] text-slate-500 hidden sm:block">
          RENDER: R3F WEBGL2 PIPELINE
        </div>
      </div>

      {/* --- BOTTOM LEFT: SCROLL PROGRESS TAPE --- */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 flex flex-col gap-1">
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <span className="text-base leading-none">└</span>
          <span className="tracking-widest">
            TRAJECTORY: {String(scrollPercent).padStart(3, '0')}%
          </span>
        </div>
        <div className="pl-3 w-28 h-1 bg-white/10 rounded-full overflow-hidden hidden sm:block">
          <div
            className="h-full bg-cyan-400 transition-all duration-150"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>
      </div>

      {/* --- BOTTOM RIGHT: DIAGNOSTIC WIREFRAME SWITCH (AWWWARDS EASTER EGG) --- */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 flex flex-col items-end gap-1 pointer-events-auto">
        <button
          onClick={toggleWireframe}
          title="Toggle 3D Wireframe Diagnostic Mode (Press 'D')"
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono text-[10px] tracking-wider uppercase transition-all backdrop-blur-xl ${
            wireframeMode
              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(0,255,136,0.4)]'
              : 'bg-black/60 border-white/15 text-slate-400 hover:text-white hover:border-cyan-500/40'
          }`}
        >
          <Cpu className={`w-3.5 h-3.5 ${wireframeMode ? 'animate-spin' : ''}`} />
          <span>
            {wireframeMode ? 'WIREFRAME: ACTIVE' : 'WIREFRAME: OFF'}
          </span>
          <span className="hidden sm:inline text-[9px] text-slate-500">[KEY: D]</span>
          <span className="text-base leading-none">┘</span>
        </button>
      </div>
    </div>
  );
}
