// src/components/canvas/models/InteractiveWorkstation.jsx
import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../../context/ScrollContext';
import { portfolioConfig } from '../../../config/portfolio.config';
import { sound } from '../../../utils/soundEngine';
import { Terminal, ShieldCheck, Activity, GraduationCap, Zap, Maximize2 } from 'lucide-react';

export function InteractiveWorkstation({ position = [0, 0, 0] }) {
  const { theme, wireframeMode, setFocusedTarget } = useScrollProgress();
  const { personal, about } = portfolioConfig;
  const groupRef = useRef();
  const [activeTab, setActiveTab] = useState('bio');
  const isObsidian = theme === 'obsidian';

  const { scene } = useGLTF('/models/macbook.glb');

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material = child.material.clone();
          if (wireframeMode) {
            child.material.wireframe = true;
            child.material.color = new THREE.Color('#00ff88');
          } else if (!isObsidian) {
            if (child.material.color) {
              child.material.color = new THREE.Color('#f0ece1');
            }
            child.material.metalness = 0.88;
            child.material.roughness = 0.16;
          } else {
            if (child.material.color) {
              child.material.color = new THREE.Color('#1c1c22');
            }
            child.material.metalness = 0.94;
            child.material.roughness = 0.12;
          }
        }
      }
    });
    return clone;
  }, [scene, isObsidian, wireframeMode]);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.04;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.14,
        0.05
      );
    }
  });

  const focusMacBook = (e) => {
    e?.stopPropagation();
    sound.playHoloEngage();
    setFocusedTarget({
      title: 'MACBOOK PRO M3 // PRIMARY ARCHITECT WORKSTATION',
      sub: `${personal.name} — ${personal.title}`,
      pos: [0, 0.82, 0.52],
      lookAt: [0, 0.68, -0.92],
    });
  };

  const focusStudioMonitor = (e) => {
    e?.stopPropagation();
    sound.playHoloEngage();
    setFocusedTarget({
      title: 'STUDIO MONITOR // GRAFANA CLUSTER TELEMETRY',
      sub: '142K RPS // 99.4% Redis Cache Hit // P99 0.72ms',
      pos: [0.85, 0.35, 1.05],
      lookAt: [1.4, 0.22, -0.15],
    });
  };

  return (
    <group ref={groupRef} position={position}>
      {/* 1. 3D Realistic MacBook Pro Model (Click to Zoom!) */}
      <primitive
        object={clonedScene}
        scale={0.11}
        position={[0, -0.4, 0]}
        rotation={[0.08, 0, 0]}
        onClick={focusMacBook}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      />

      {/* 2. In-World 3D Screen Interface Pinned to MacBook Display */}
      <Html
        transform
        occlude="blending"
        position={[0, 0.72, -0.92]}
        rotation={[-0.18, 0, 0]}
        scale={0.132}
        className="pointer-events-auto select-none"
      >
        <div
          className={`w-[660px] h-[415px] rounded-lg border p-4 shadow-2xl backdrop-blur-xl flex flex-col font-mono text-xs transition-colors duration-300 ${
            isObsidian
              ? 'bg-[#07090e]/95 border-cyan-400/40 text-neutral-200 shadow-[0_0_50px_rgba(0,240,255,0.2)]'
              : 'bg-[#faf7f2]/95 border-amber-900/30 text-neutral-800 shadow-amber-900/10'
          }`}
        >
          {/* macOS Window Titlebar */}
          <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="ml-2 text-[11px] opacity-80 font-mono flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                tahir@macbook-pro-m3: ~/arch-os
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <Activity className="w-3 h-3 animate-pulse" /> {personal.status.toUpperCase()}
              </span>
              <button
                onClick={focusMacBook}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-400 hover:text-black font-bold transition-all cursor-pointer"
              >
                <Maximize2 className="w-2.5 h-2.5" />
                <span>ZOOM SCREEN</span>
              </button>
            </div>
          </div>

          {/* Interactive 4-Tab Bar Inside 3D Laptop */}
          <div className="flex items-center gap-1.5 mb-2.5">
            {[
              { id: 'bio', label: '01 / IDENTITY & BIO' },
              { id: 'edu', label: '02 / UET EDUCATION' },
              { id: 'arch', label: '03 / SYSTEMS CORE' },
              { id: 'metrics', label: '04 / BENCHMARKS' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playClick(1.2);
                  setActiveTab(tab.id);
                }}
                className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wider transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? isObsidian
                      ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/50'
                      : 'bg-amber-500/25 text-amber-900 border border-amber-500/50'
                    : 'opacity-55 hover:opacity-100 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Screen Content Body */}
          <div className="flex-1 overflow-hidden p-3 rounded bg-black/30 border border-white/10 flex flex-col justify-between">
            {activeTab === 'bio' && (
              <div className="flex gap-4 items-center my-auto">
                <img
                  src="/assets/me.jpg"
                  alt={personal.name}
                  className="w-24 h-24 rounded-xl object-cover border-2 border-cyan-400/60 shrink-0"
                />
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-black tracking-tight text-white">
                      {personal.name.toUpperCase()}
                    </h1>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {personal.location}
                    </span>
                  </div>
                  <p className="text-xs text-cyan-300 font-bold">{personal.title} // {personal.roleSubtitle}</p>
                  <p className="text-[11px] leading-relaxed opacity-85">
                    &ldquo;{about.statement}&rdquo; — {about.overview}
                  </p>
                  <div className="flex items-center gap-3 pt-1 text-[11px]">
                    <a
                      href={personal.social.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1 rounded bg-white/10 hover:bg-cyan-400 hover:text-black text-cyan-300 font-bold transition-all"
                    >
                      GitHub ↗
                    </a>
                    <a
                      href={personal.social.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1 rounded bg-white/10 hover:bg-cyan-400 hover:text-black text-cyan-300 font-bold transition-all"
                    >
                      LinkedIn ↗
                    </a>
                    <a
                      href={`mailto:${personal.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1 rounded bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-all"
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'edu' && (
              <div className="space-y-2.5 my-auto">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                    <GraduationCap className="w-4 h-4" />
                    <span>{about.education.institution}</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-xs">
                    {about.education.cgpa} ({about.education.graduationDate})
                  </span>
                </div>
                <p className="text-xs font-bold text-white">{about.education.degree}</p>
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-400 uppercase">CORE SYSTEMS COURSEWORK:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {about.education.coursework.map((course, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-cyan-500/15 border border-cyan-400/30 text-cyan-200 text-[10px] font-bold"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'arch' && (
              <div className="space-y-2 my-auto text-[11px]">
                <div className="flex items-center justify-between text-cyan-400 font-bold">
                  <span>SUBSYSTEM PIPELINES</span>
                  <span className="text-emerald-400">ALL SERVICES OPERATIONAL</span>
                </div>
                <div className="font-mono text-[10px] space-y-1 opacity-85">
                  <p>&gt; bullmq_worker_cluster: background job execution &lt;50ms latency</p>
                  <p>&gt; pgsql_pgvector: fast cosine distance similarity indexing active</p>
                  <p>&gt; timescaledb_hypertables: partitioned time-series metrics online</p>
                  <p>&gt; docker_compose_mesh: isolated API, worker, and DB containers</p>
                </div>
                <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> Zero Unhandled Exceptions in Production Runtimes
                </div>
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="grid grid-cols-2 gap-2.5 my-auto">
                {about.milestones.map((m, i) => (
                  <div key={i} className="p-2.5 rounded bg-white/5 border border-white/10 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-neutral-400 uppercase">{m.label}</span>
                      <Zap className="w-3 h-3 text-cyan-400" />
                    </div>
                    <div className="text-base font-black text-cyan-300">{m.metric}</div>
                    <div className="text-[10px] text-neutral-300 truncate">{m.detail}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Prompt footer */}
            <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] opacity-70">
              <span>$ scroll down to fly through 3D Certificate Vault &amp; Cyber City</span>
              <span className="text-cyan-400 font-bold animate-pulse">CLICK MONITOR TO LOCK CAMERA</span>
            </div>
          </div>
        </div>
      </Html>

      {/* 3. Companion Studio Monitor Display (studio_monitor.glb) */}
      <StudioDisplay
        isObsidian={isObsidian}
        wireframeMode={wireframeMode}
        onFocus={focusStudioMonitor}
      />
    </group>
  );
}

function StudioDisplay({ isObsidian, wireframeMode, onFocus }) {
  const { scene } = useGLTF('/models/studio_monitor.glb');

  const clonedMonitor = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material = child.material.clone();
          if (wireframeMode) {
            child.material.wireframe = true;
            child.material.color = new THREE.Color('#00ff88');
          } else if (isObsidian) {
            child.material.color = new THREE.Color('#141720');
            child.material.metalness = 0.92;
            child.material.roughness = 0.16;
          } else {
            child.material.color = new THREE.Color('#ece7de');
            child.material.metalness = 0.65;
            child.material.roughness = 0.28;
          }
        }
      }
    });
    return clone;
  }, [scene, isObsidian, wireframeMode]);

  return (
    <group
      position={[1.4, -0.4, -0.2]}
      rotation={[0, -0.32, 0]}
      onClick={onFocus}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      <primitive object={clonedMonitor} scale={0.38} />

      <Html
        transform
        occlude="blending"
        position={[0, 0.62, 0.05]}
        scale={0.092}
        className="pointer-events-auto select-none"
      >
        <div
          onClick={onFocus}
          className={`w-[480px] h-[310px] rounded-md border p-3.5 shadow-2xl flex flex-col justify-between font-mono text-[11px] cursor-pointer ${
            isObsidian
              ? 'bg-[#06080d]/95 border-cyan-500/40 text-neutral-200 shadow-cyan-500/20'
              : 'bg-[#faf7f2]/95 border-amber-900/20 text-neutral-800'
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px]">
            <span className="text-cyan-400 font-bold uppercase">GRAFANA // CLUSTER TELEMETRY</span>
            <span className="text-emerald-400 animate-pulse">● 64 NODES HEALTHY [CLICK TO ZOOM]</span>
          </div>

          <div className="grid grid-cols-2 gap-2 my-auto">
            <div className="border border-white/10 p-2 rounded bg-white/5 space-y-0.5">
              <span className="text-[9px] text-neutral-400 uppercase">THROUGHPUT</span>
              <div className="text-base font-bold text-cyan-300">142K RPS</div>
              <span className="text-[8px] text-emerald-400">P99: 0.72ms</span>
            </div>
            <div className="border border-white/10 p-2 rounded bg-white/5 space-y-0.5">
              <span className="text-[9px] text-neutral-400 uppercase">CACHE HIT RATIO</span>
              <div className="text-base font-bold text-emerald-400">99.4%</div>
              <span className="text-[8px] text-neutral-400">REDIS CLUSTER</span>
            </div>
            <div className="border border-white/10 p-2 rounded bg-white/5 space-y-0.5">
              <span className="text-[9px] text-neutral-400 uppercase">MEMORY PRESSURE</span>
              <div className="text-base font-bold text-white">1.2 GB / 64 GB</div>
              <span className="text-[8px] text-cyan-400">ZERO GC STALLS</span>
            </div>
            <div className="border border-white/10 p-2 rounded bg-white/5 space-y-0.5">
              <span className="text-[9px] text-neutral-400 uppercase">CLUSTER UPTIME</span>
              <div className="text-base font-bold text-cyan-300">99.999%</div>
              <span className="text-[8px] text-emerald-400">SLA MET</span>
            </div>
          </div>

          <div className="pt-1.5 border-t border-white/10 flex items-end gap-1 h-5">
            {[30, 45, 60, 50, 75, 90, 85, 60, 70, 95, 80, 85, 90, 100, 70, 85, 90].map((v, idx) => (
              <div
                key={idx}
                className="flex-1 bg-cyan-400/80 rounded-t-xs"
                style={{ height: `${v}%` }}
              />
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}

useGLTF.preload('/models/macbook.glb');
useGLTF.preload('/models/studio_monitor.glb');
