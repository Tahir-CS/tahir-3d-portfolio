import React, { useState, useEffect, useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '../../../context/ScrollContext';
import { Activity, Terminal, Shield, Zap, Radio, Globe } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Giant Building Billboard Screen
// Renders an architectural mega-display mounted directly on building facades
// with live telemetry, animated audio visualizer, terminal logs & ticker tape.
// ─────────────────────────────────────────────────────────────────────────────

export function BuildingScreens({ position = [0, 5.2, -15.5], rotation = [0, 0, 0], scale = 0.14 }) {
  const { theme, wireframeMode } = useScrollProgress();
  const isObsidian = theme === 'obsidian';
  const [activeTab, setActiveTab] = useState(0);
  const [tickerOffset, setTickerOffset] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  const LOG_LINES = [
    'GOROUTINE_POOL: 16,384 WORKERS HEALTHY',
    'KERNEL_BYPASS_IO: ZERO-COPY SIMD NOMINAL',
    'DISTRIBUTED_RAFT: CONSENSUS SYNCHRONIZED',
    'RATE_LIMITER: LEAKY_BUCKET ENFORCED (< 0.2ms)',
    'PGVECTOR_EMBEDDINGS: COSINE SIMILARITY OK',
    'K8S_INGRESS: GLOBAL TRAFFIC BALANCED [P99 0.8ms]',
  ];

  // Rotate tabs and logs periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
      setLogIndex((prev) => (prev + 1) % LOG_LINES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <group position={position} rotation={rotation}>
      {/* 1. Physical 3D Billboard Chassis (Structural Frame) */}
      <mesh castShadow receiveShadow position={[0, 0, -0.08]}>
        <boxGeometry args={[11.2, 6.2, 0.25]} />
        <meshStandardMaterial
          color={isObsidian ? '#0a0a10' : '#222228'}
          metalness={0.95}
          roughness={0.2}
          wireframe={wireframeMode}
        />
      </mesh>

      {/* 2. Top Rooftop Truss / Industrial Support Girders */}
      <group position={[0, 3.4, -0.08]}>
        {[-4.5, -2.2, 0, 2.2, 4.5].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
            <meshStandardMaterial color={isObsidian ? '#181822' : '#666'} metalness={0.9} />
          </mesh>
        ))}
        <mesh position={[0, 0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 9.6, 8]} />
          <meshStandardMaterial color={isObsidian ? '#222' : '#888'} metalness={0.9} />
        </mesh>
      </group>

      {/* 3. Glowing Neon Ambient Edge Backlight */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[11.5, 6.5]} />
        <meshBasicMaterial
          color={isObsidian ? '#00f0ff' : '#d4af37'}
          transparent
          opacity={isObsidian ? 0.35 : 0.2}
        />
      </mesh>

      {/* 4. Giant In-World Interactive LED Billboard (Html transform) */}
      <Html
        transform
        occlude="blending"
        position={[0, 0, 0.08]}
        scale={scale}
        className="pointer-events-auto select-none"
      >
        <div
          className={`w-[1020px] h-[580px] rounded-xl border-4 p-6 shadow-2xl flex flex-col justify-between font-mono relative overflow-hidden transition-all duration-500 ${
            isObsidian
              ? 'bg-[#04060a]/95 border-cyan-500/60 text-white shadow-[0_0_80px_rgba(0,240,255,0.35)]'
              : 'bg-[#faf7f2]/95 border-amber-600/70 text-neutral-900 shadow-[0_0_60px_rgba(180,100,20,0.25)]'
          }`}
        >
          {/* LED Matrix Grid Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

          {/* Scanline CRT overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-16 animate-pulse pointer-events-none" />

          {/* Top Telemetry Header */}
          <div className="relative z-10 flex items-center justify-between border-b-2 border-current pb-4 opacity-90">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500 animate-ping inline-block" />
              <span className="font-black tracking-[0.3em] text-sm uppercase flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400" />
                SKYLINE_BROADCAST // MEGA-LED NODE 01
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs font-bold tracking-wider">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Activity className="w-4 h-4 animate-pulse" /> CLUSTER 99.99% ONLINE
              </span>
              <span className="opacity-70">LATENCY: &lt; 0.8ms P99</span>
              <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                60 FPS SYNC
              </span>
            </div>
          </div>

          {/* Center Main Stage Typography & Live Status */}
          <div className="relative z-10 my-auto grid grid-cols-12 gap-8 items-center py-4">
            {/* Left Col: Giant Identity Headline */}
            <div className="col-span-7 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase">
                <Terminal className="w-4 h-4" />
                <span>ARCHITECTURAL RUNTIME // TAHIR-CS</span>
              </div>
              <h1 className="text-5xl font-black tracking-tight uppercase leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                MUHAMMAD TAHIR
              </h1>
              <p className="text-sm font-mono tracking-wide text-neutral-300 font-semibold">
                SYSTEMS ARCHITECT &amp; DISTRIBUTED RUNTIMES
              </p>
              <div className="flex items-center gap-2 pt-2">
                {['GO', 'C++ CORE', 'NODE.JS', 'DOCKER / K8S', 'POSTGRES'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[11px] font-bold uppercase rounded border border-cyan-500/40 bg-cyan-950/40 text-cyan-200 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Col: Live Telemetry Terminal Card */}
            <div className="col-span-5 border-2 border-white/20 rounded-xl p-4 bg-black/60 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between text-[11px] border-b border-white/10 pb-2">
                <span className="text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> RUNTIME STATUS
                </span>
                <span className="text-emerald-400 font-mono">NOMINAL</span>
              </div>

              {/* Dynamic Live Logs */}
              <div className="space-y-1.5 min-h-[90px] font-mono text-[11px]">
                {LOG_LINES.slice(0, 4).map((line, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-1.5 ${
                      idx === logIndex % 4 ? 'text-cyan-300 font-bold' : 'text-neutral-400'
                    }`}
                  >
                    <span className="text-cyan-500 font-black">&gt;</span>
                    <span className="truncate">{line}</span>
                  </div>
                ))}
              </div>

              {/* Live Audio Visualizer Bars */}
              <div className="pt-2 border-t border-white/10 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                  <span>PACKET FREQUENCY</span>
                  <span className="text-cyan-400">128 kHz</span>
                </div>
                <div className="flex items-end gap-1.5 h-6">
                  {[45, 80, 60, 95, 30, 70, 85, 100, 65, 40, 90, 75, 55, 88, 92, 60].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-300 rounded-t-sm transition-all duration-200"
                      style={{
                        height: `${Math.max(15, (h * ((i + logIndex) % 5 + 1)) % 100)}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Horizon Ticker Tape Marquee */}
          <div className="relative z-10 border-t-2 border-current pt-3 flex items-center justify-between text-xs tracking-wider uppercase font-bold overflow-hidden">
            <div className="flex items-center gap-3 animate-pulse text-cyan-400 whitespace-nowrap">
              <Zap className="w-4 h-4 inline" />
              <span>
                • HIGH-CONCURRENCY RUNTIMES • SUB-MILLISECOND LATENCY • DISTRIBUTED CONSENSUS • KUBERNETES MESH • 
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] opacity-75 shrink-0 ml-4 font-mono">
              <Globe className="w-3.5 h-3.5" />
              <span>LIVE BROADCAST 2026</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Secondary Vertical Billboard Screen (Mounted on Side Skyscraper)
// ─────────────────────────────────────────────────────────────────────────────

export function SideBillboardScreen({ position = [6.8, 4.2, -14.2], rotation = [0, -0.25, 0], scale = 0.12 }) {
  const { theme } = useScrollProgress();
  const isObsidian = theme === 'obsidian';

  return (
    <group position={position} rotation={rotation}>
      {/* Chassis Frame */}
      <mesh castShadow receiveShadow position={[0, 0, -0.06]}>
        <boxGeometry args={[4.2, 7.2, 0.2]} />
        <meshStandardMaterial color={isObsidian ? '#0e0e14' : '#222'} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Screen */}
      <Html transform occlude="blending" position={[0, 0, 0.08]} scale={scale} className="pointer-events-auto select-none">
        <div
          className={`w-[360px] h-[640px] rounded-lg border-2 p-5 shadow-2xl flex flex-col justify-between font-mono ${
            isObsidian
              ? 'bg-[#030508]/95 border-cyan-400/50 text-white shadow-[0_0_50px_rgba(0,240,255,0.25)]'
              : 'bg-[#faf7f2]/95 border-amber-600/50 text-neutral-900'
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-[10px]">
            <span className="text-cyan-400 font-bold uppercase">NODE_EAST // SLA</span>
            <span className="text-emerald-400 animate-pulse">● ACTIVE</span>
          </div>

          <div className="space-y-4 my-auto">
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 uppercase">THROUGHPUT</span>
              <div className="text-3xl font-black text-cyan-300">120K RPS</div>
              <span className="text-[10px] text-emerald-400 font-mono">0.001% DROPPED</span>
            </div>

            <div className="space-y-1 border-t border-white/10 pt-3">
              <span className="text-[10px] text-neutral-400 uppercase">MEMORY FOOTPRINT</span>
              <div className="text-2xl font-black text-white">42 MB RUNTIME</div>
              <span className="text-[10px] text-cyan-400 font-mono">ZERO-ALLOC ENGINE</span>
            </div>

            <div className="space-y-1 border-t border-white/10 pt-3">
              <span className="text-[10px] text-neutral-400 uppercase">UPTIME RECORD</span>
              <div className="text-2xl font-black text-emerald-400">99.999%</div>
              <span className="text-[10px] text-neutral-400 font-mono">365 DAYS UNINTERRUPTED</span>
            </div>
          </div>

          <div className="text-[9px] text-neutral-400 border-t border-white/10 pt-2 text-center uppercase">
            TAHIR // ARCHITECTURE ARCHIVE
          </div>
        </div>
      </Html>
    </group>
  );
}
