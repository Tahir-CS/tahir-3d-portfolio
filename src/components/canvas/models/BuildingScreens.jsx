import React, { useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { useScrollProgress } from '../../../context/ScrollContext';
import { Cpu, Terminal, Shield, Zap, Layers, Server, Database, Cloud, Radio, Code2 } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Grand Architectural Skills & Tech Stack Mega-Billboard
// Physically mounted to the central skyscraper facade with heavy steel trusses,
// industrial mounting brackets, neon perimeter bezels, and all engineering pillars.
// ─────────────────────────────────────────────────────────────────────────────

export function BuildingScreens({ position = [0, 6.2, 1.2], rotation = [0, 0, 0], scale = 0.145 }) {
  const { theme, wireframeMode } = useScrollProgress();
  const isObsidian = theme === 'obsidian';
  const [activeTab, setActiveTab] = useState('systems');

  const SKILL_PILLARS = {
    systems: {
      title: 'SYSTEMS CORE & LOW-LATENCY RUNTIMES',
      icon: Cpu,
      color: 'cyan',
      skills: [
        { name: 'C++ (C++20)', desc: 'RAII, SIMD Vectorization, Zero-Copy I/O, Cache Coherency, Multi-Threading', highlight: true },
        { name: 'Go (Golang)', desc: 'High-Concurrency Goroutines, Worker Pools, Channels, Lock-Free Mutex', highlight: true },
        { name: 'Python & TS', desc: 'Fast AST Parsers, Low-Overhead Runtime Scripts, Strict Type Safety' },
        { name: 'Algorithms', desc: 'Custom Spatial Hashes, Graph Traversals, P99 Microsecond Tuning' },
      ],
    },
    backend: {
      title: 'DISTRIBUTED BACKEND & MICROSERVICES',
      icon: Server,
      color: 'emerald',
      skills: [
        { name: 'Node.js & Express', desc: 'High-Throughput Non-Blocking Event Loops, Streaming REST APIs', highlight: true },
        { name: 'FastAPI', desc: 'Asynchronous Python Microservices, High-Performance Pydantic Validation', highlight: true },
        { name: 'BullMQ & Redis Queues', desc: 'Distributed Job Pipelines, Retries, Concurrency Throttling' },
        { name: 'WebSockets & Pub/Sub', desc: 'Sub-Millisecond Realtime Data Feeds, Epoll-Based Event Streams' },
      ],
    },
    data: {
      title: 'DATABASES & VECTOR INFRASTRUCTURE',
      icon: Database,
      color: 'amber',
      skills: [
        { name: 'PostgreSQL', desc: 'ACID Transactions, Multi-Table Indexing, Complex Query EXPLAIN Tuning', highlight: true },
        { name: 'PGVector', desc: 'High-Dimensional Vector Embeddings, Cosine Similarity RAG Pipelines', highlight: true },
        { name: 'Redis Cluster', desc: 'Sub-Millisecond In-Memory Caching, Distributed Locks, Rate Limiting' },
        { name: 'TimescaleDB', desc: 'Automated Hypertables, Continuous Telemetry Aggregation' },
      ],
    },
    cloud: {
      title: 'CLOUD, DEVOPS & CREATIVE 3D',
      icon: Cloud,
      color: 'purple',
      skills: [
        { name: 'Docker & Containerd', desc: 'Minimal Multi-Stage Container Packaging, Linux Namespace Isolation', highlight: true },
        { name: 'Kubernetes (K8s)', desc: 'Pod Orchestration, Ingress Routing, Health Probes, Rolling Updates', highlight: true },
        { name: 'AWS Cloud', desc: 'EC2, S3 Object Storage, RDS PostgreSQL, CloudFront CDN, IAM Security' },
        { name: 'Three.js / R3F', desc: 'Custom GLSL Shaders, Procedural Meshes, 60 FPS WebGL Scrollytelling' },
      ],
    },
  };

  return (
    <group position={position} rotation={rotation}>
      {/* 1. Heavy Industrial Steel Mounting Frame (Attached to Building Facade) */}
      <mesh castShadow receiveShadow position={[0, 0, -0.16]}>
        <boxGeometry args={[11.8, 6.8, 0.28]} />
        <meshStandardMaterial
          color={isObsidian ? '#0a0c12' : '#262422'}
          metalness={0.96}
          roughness={0.22}
          wireframe={wireframeMode}
        />
      </mesh>

      {/* 2. Steel Structural Trusses & Mounting Struts Anchoring into Building */}
      {[-5.4, -2.7, 0, 2.7, 5.4].map((x, i) => (
        <group key={i} position={[x, 0, -0.6]}>
          {/* Horizontal anchor beam pushing into building concrete */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.9, 8]} />
            <meshStandardMaterial color={isObsidian ? '#181b24' : '#444'} metalness={0.92} />
          </mesh>
          {/* Bolted wall mounting flange plate */}
          <mesh position={[0, 0, -0.45]}>
            <boxGeometry args={[0.34, 0.34, 0.08]} />
            <meshStandardMaterial color={isObsidian ? '#2c3240' : '#666'} metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Top and Bottom Industrial Steel Truss Girders */}
      {[-3.3, 3.3].map((y, idx) => (
        <group key={idx} position={[0, y, -0.16]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 11.6, 8]} />
            <meshStandardMaterial color={isObsidian ? '#1e2430' : '#555'} metalness={0.95} />
          </mesh>
          {[-4.8, -2.4, 0, 2.4, 4.8].map((bx, bi) => (
            <mesh key={bi} position={[bx, y > 0 ? 0.35 : -0.35, 0]}>
              <boxGeometry args={[0.08, 0.7, 0.08]} />
              <meshStandardMaterial color={isObsidian ? '#2c3545' : '#777'} metalness={0.9} />
            </mesh>
          ))}
        </group>
      ))}

      {/* 3. Glowing Architectural Neon Perimeter Bezel */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[11.6, 6.6]} />
        <meshBasicMaterial
          color={isObsidian ? '#00f0ff' : '#d4af37'}
          transparent
          opacity={isObsidian ? 0.28 : 0.15}
        />
      </mesh>

      {/* 4. Giant In-World Interactive LED Billboard (Html transform without distanceFactor) */}
      <Html
        transform
        position={[0, 0, 0.06]}
        scale={scale}
        className="pointer-events-auto select-none"
      >
        <div
          className={`w-[1100px] h-[640px] rounded-2xl border-4 p-7 shadow-2xl flex flex-col justify-between font-mono relative overflow-hidden transition-all duration-300 ${
            isObsidian
              ? 'bg-[#04060c]/98 border-cyan-500/70 text-white shadow-[0_0_90px_rgba(0,240,255,0.32)]'
              : 'bg-[#faf7f2]/98 border-amber-600/70 text-neutral-900 shadow-[0_0_70px_rgba(180,100,20,0.22)]'
          }`}
        >
          {/* Subtle LED Matrix Mesh Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:18px_18px] opacity-15 pointer-events-none" />

          {/* CRT Scanline Flare */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-20 animate-pulse pointer-events-none" />

          {/* Header Bar */}
          <div className="relative z-10 flex items-center justify-between border-b-2 border-current pb-4 opacity-95">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span className="font-black tracking-[0.25em] text-sm uppercase flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400" />
                CENTRAL SKYSCRAPER // ARCHITECTURAL TECH STACK
              </span>
            </div>
            <div className="flex items-center gap-5 text-xs font-bold tracking-wider">
              <span className="text-cyan-400 font-mono">P99 LATENCY &lt; 0.8ms</span>
              <span className="opacity-60">|</span>
              <span className="text-emerald-400 font-mono">ZERO-ALLOC ENGINE</span>
              <span className="px-3 py-1 rounded bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-[11px] font-black">
                CLICK BILLBOARD TO ZOOM
              </span>
            </div>
          </div>

          {/* Identity & Mission Banner */}
          <div className="relative z-10 pt-2 pb-3 border-b border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                <span>CORE SYSTEMS &amp; DISTRIBUTED INFRASTRUCTURE</span>
              </div>
              <h1 className="text-3xl font-black tracking-tight uppercase leading-none mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400">
                MUHAMMAD TAHIR · ENGINEERING STACK
              </h1>
            </div>
            {/* Quick Interactive Category Tabs */}
            <div className="flex items-center gap-2">
              {[
                { id: 'systems', label: 'SYSTEMS' },
                { id: 'backend', label: 'BACKEND' },
                { id: 'data', label: 'DATA & STORAGE' },
                { id: 'cloud', label: 'CLOUD & DEVOPS' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded text-xs font-black tracking-wider transition-all duration-200 ${
                    activeTab === tab.id
                      ? isObsidian
                        ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                        : 'bg-amber-600 text-white shadow-lg'
                      : isObsidian
                      ? 'bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/10'
                      : 'bg-black/5 text-neutral-700 hover:bg-black/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Multi-Column Architecture Grid */}
          <div className="relative z-10 grid grid-cols-2 gap-4 my-auto py-2">
            {Object.entries(SKILL_PILLARS).map(([key, pillar]) => {
              const Icon = pillar.icon;
              const isSelected = activeTab === key;

              return (
                <div
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`rounded-xl border p-3.5 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? isObsidian
                        ? 'bg-cyan-950/40 border-cyan-400/80 shadow-[0_0_25px_rgba(0,240,255,0.2)]'
                        : 'bg-amber-500/10 border-amber-600/80 shadow-md'
                      : isObsidian
                      ? 'bg-black/40 border-white/10 hover:border-white/30'
                      : 'bg-white/60 border-black/10 hover:border-black/30'
                  }`}
                >
                  {/* Card Title */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="flex items-center gap-2 text-xs font-black tracking-wider text-cyan-300">
                      <Icon className="w-4 h-4 text-cyan-400" />
                      {pillar.title}
                    </span>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                      isSelected ? 'bg-cyan-400 text-black font-black' : 'opacity-50'
                    }`}>
                      {key}
                    </span>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-1.5 pt-2">
                    {pillar.skills.map((s, idx) => (
                      <div key={idx} className="flex items-baseline justify-between text-[11px] leading-tight">
                        <span className={`font-bold ${s.highlight ? 'text-white' : 'text-neutral-300'}`}>
                          • {s.name}
                        </span>
                        <span className="text-[10px] opacity-70 ml-2 truncate max-w-[280px]">
                          {s.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Ticker Tape Strip */}
          <div className="relative z-10 border-t-2 border-current pt-3 flex items-center justify-between text-xs tracking-wider uppercase font-bold overflow-hidden">
            <div className="flex items-center gap-3 text-cyan-400 whitespace-nowrap animate-pulse">
              <Zap className="w-4 h-4 inline" />
              <span>
                • HIGH-CONCURRENCY WORKER POOLS • SUB-MS QUERY OPTIMIZATION • PGVECTOR RAG • DOCKER &amp; K8S •
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] opacity-80 shrink-0 ml-4 font-mono">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% RELIABILITY RATING</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Secondary Vertical Billboard Screen (Mounted on East Skyscraper)
// Attached with industrial horizontal cantilever brackets
// ─────────────────────────────────────────────────────────────────────────────

export function SideBillboardScreen({ position = [8.2, 5.6, 2.0], rotation = [0, -0.28, 0], scale = 0.125 }) {
  const { theme, wireframeMode } = useScrollProgress();
  const isObsidian = theme === 'obsidian';

  return (
    <group position={position} rotation={rotation}>
      {/* Physical Chassis Frame */}
      <mesh castShadow receiveShadow position={[0, 0, -0.1]}>
        <boxGeometry args={[4.4, 7.4, 0.22]} />
        <meshStandardMaterial
          color={isObsidian ? '#0a0d14' : '#222'}
          metalness={0.92}
          roughness={0.2}
          wireframe={wireframeMode}
        />
      </mesh>

      {/* Industrial Cantilever Mounting Struts Anchoring into Skyscraper Wall */}
      {[-2.5, 0, 2.5].map((y, i) => (
        <group key={i} position={[-2.2, y, -0.4]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 1.2, 8]} />
            <meshStandardMaterial color={isObsidian ? '#181b24' : '#555'} metalness={0.9} />
          </mesh>
          <mesh position={[-0.6, 0, 0]}>
            <boxGeometry args={[0.08, 0.35, 0.35]} />
            <meshStandardMaterial color={isObsidian ? '#2a3040' : '#777'} metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Screen Interface Pinned to Side Billboard (Without distanceFactor) */}
      <Html
        transform
        position={[0, 0, 0.06]}
        scale={scale}
        className="pointer-events-auto select-none"
      >
        <div
          className={`w-[360px] h-[640px] rounded-xl border-3 p-5 shadow-2xl flex flex-col justify-between font-mono ${
            isObsidian
              ? 'bg-[#03050a]/98 border-cyan-400/60 text-white shadow-[0_0_60px_rgba(0,240,255,0.28)]'
              : 'bg-[#faf7f2]/98 border-amber-600/60 text-neutral-900'
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-[10px]">
            <span className="text-cyan-400 font-bold uppercase tracking-widest">EAST_TOWER // TELEMETRY</span>
            <span className="text-emerald-400 animate-pulse font-mono">● LIVE</span>
          </div>

          <div className="space-y-4 my-auto">
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 uppercase font-semibold">PEAK THROUGHPUT</span>
              <div className="text-3xl font-black text-cyan-300">142K RPS</div>
              <span className="text-[10px] text-emerald-400 font-mono">0.001% ERROR RATE</span>
            </div>

            <div className="space-y-1 border-t border-white/10 pt-3">
              <span className="text-[10px] text-neutral-400 uppercase font-semibold">MEMORY FOOTPRINT</span>
              <div className="text-2xl font-black text-white">42 MB RSS</div>
              <span className="text-[10px] text-cyan-400 font-mono">ZERO MEMORY LEAKS</span>
            </div>

            <div className="space-y-1 border-t border-white/10 pt-3">
              <span className="text-[10px] text-neutral-400 uppercase font-semibold">SYSTEM AVAILABILITY</span>
              <div className="text-2xl font-black text-emerald-400">99.999%</div>
              <span className="text-[10px] text-neutral-400 font-mono">HIGH-AVAILABILITY CLUSTER</span>
            </div>
          </div>

          <div className="text-[9px] text-neutral-400 border-t border-white/10 pt-2.5 text-center uppercase tracking-wider">
            MUHAMMAD TAHIR // BSCS UET LAHORE
          </div>
        </div>
      </Html>
    </group>
  );
}
