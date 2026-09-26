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
    sound.init();
    sound.toggleMute(); // Unmute and start ambient drone
    sound.playHoloEngage();
    onLoaded?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070c] text-white p-6 font-mono select-none">
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="relative max-w-xl w-full border border-cyan-500/30 bg-black/80 backdrop-blur-2xl p-6 sm:p-8 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.15)] space-y-6">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-widest uppercase">
            <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>COMMAND_CENTER // BOOT SEQUENCE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
        </div>

        {/* Boot Terminal Log Output */}
        <div className="space-y-2 min-h-[160px] text-xs">
          {BOOT_LOGS.slice(0, currentStep + 1).map((log, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 ${
                i === currentStep
                  ? 'text-cyan-300 font-bold'
                  : 'text-slate-400'
              }`}
            >
              <span className="text-cyan-500">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>CLUSTER SYNCHRONIZATION</span>
            <span className="text-cyan-400 font-bold">
              {Math.round(((currentStep + 1) / BOOT_LOGS.length) * 100)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300 rounded-full"
              style={{
                width: `${((currentStep + 1) / BOOT_LOGS.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Interactive Enter Button */}
        {ready ? (
          <button
            onClick={handleEnter}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(0,240,255,0.4)] animate-bounce"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>INITIALIZE ARCHITECTURE TRAVEL</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="text-center text-[11px] text-slate-500 uppercase tracking-widest animate-pulse">
            Configuring WebGL Pipeline...
          </div>
        )}
      </div>
    </div>
  );
}
