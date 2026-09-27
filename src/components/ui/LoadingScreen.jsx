import React, { useState, useEffect } from 'react';
import { Terminal, ShieldCheck, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

const BOOT_LOGS = [
  'INITIALIZING SYSTEM SUBSYSTEMS...',
  'CONNECTING TO POSTGRESQL // PGVECTOR MODULE...',
  'REGISTERING BULLMQ QUEUE WORKERS [0/4 READY]...',
  'ESTABLISHING DISTRIBUTED REDIS RATE LIMITERS...',
  'WARMING UP SHADER COMPILER PIPELINE...',
  'SYNCHRONIZING GSAP SCROLL & CATMULL-ROM SPLINES...',
  'ALL SYSTEMS NOMINAL. GATEWAY READY.',
];

export function LoadingScreen({ onLoaded }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < BOOT_LOGS.length - 1) {
          sound.playTypingBlip();
          return prev + 1;
        } else {
          clearInterval(interval);
          setReady(true);
          return prev;
        }
      });
    }, 280);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    try {
      sound.init();
      sound.toggleMute();
      sound.playHoloEngage();
    } catch {
      // Audio context might fail on some browsers
    }
    onLoaded?.();
  };

  const pct = Math.round(((currentStep + 1) / BOOT_LOGS.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-start bg-[#05070c] text-white font-mono select-none overflow-hidden">
      {/* Animated radial sweep */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,240,255,0.07),transparent)]" />
        {/* Horizontal scan line */}
        <div
          className="absolute left-0 right-0 h-px bg-cyan-400/30"
          style={{ top: `${100 - pct}%`, transition: 'top 0.28s linear' }}
        />
      </div>

      {/* Bottom-left terminal — no box, just text on dark bg */}
      <div className="relative z-10 px-10 sm:px-16 pb-12 sm:pb-16 space-y-5 w-full max-w-2xl">
        {/* Header label */}
        <div className="flex items-center gap-2 text-cyan-500/60 text-[10px] uppercase tracking-[0.3em]">
          <Terminal className="w-3.5 h-3.5 animate-pulse" />
          <span>COMMAND_CENTER // BOOT SEQUENCE</span>
        </div>

        {/* Log lines — bare text, no container */}
        <div className="space-y-1.5 min-h-[140px]">
          {BOOT_LOGS.slice(0, currentStep + 1).map((log, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 text-[11px] leading-relaxed ${
                i === currentStep
                  ? 'text-cyan-300 font-bold'
                  : 'text-slate-500'
              }`}
            >
              <span className="text-cyan-600 shrink-0">›</span>
              <span>{log}</span>
            </div>
          ))}
        </div>

        {/* Progress line — thin, no border box */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] text-slate-600">
            <span>CLUSTER SYNCHRONIZATION</span>
            <span className="text-cyan-400 font-bold">{pct}%</span>
          </div>
          <div className="w-full h-px bg-white/10">
            <div
              className="h-full bg-cyan-500 transition-all duration-300 shadow-[0_0_8px_rgba(0,240,255,0.6)]"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* CTA — minimal, flat */}
        {ready ? (
          <button
            onClick={handleEnter}
            className="flex items-center gap-3 text-black bg-cyan-400 hover:bg-cyan-300 px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-200 hover:scale-105 shadow-[0_0_30px_rgba(0,240,255,0.35)] animate-bounce"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>INITIALIZE ARCHITECTURE TRAVEL</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="text-[10px] text-slate-600 uppercase tracking-widest animate-pulse">
            Configuring WebGL Pipeline...
          </div>
        )}
      </div>

      {/* Giant typographic backdrop — purely decorative */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="text-[22vw] font-black text-white/[0.025] tracking-tighter leading-none"
          aria-hidden="true"
        >
          SYS
        </span>
      </div>
    </div>
  );
}
