import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../../context/ScrollContext';
import { Terminal, Cpu, ShieldCheck, Activity } from 'lucide-react';

export function InteractiveWorkstation({ position = [0, 0, 0] }) {
  const { theme, wireframeMode, scrollPercent } = useScrollProgress();
  const groupRef = useRef();
  const [activeTab, setActiveTab] = useState('arch');
  const isObsidian = theme === 'obsidian';

  // Load verified local MacBook GLB
  const { scene } = useGLTF('/models/macbook.glb');
  
  // Clone scene to avoid mutation conflicts
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
            // Apple Starlight / Champagne Titanium
            if (child.material.color) {
              child.material.color = new THREE.Color('#f0ece1');
            }
            child.material.metalness = 0.88;
            child.material.roughness = 0.16;
          } else {
            // Apple Space Black Titanium
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

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Subtle float breathing
      const t = state.clock.elapsedTime;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.04;
      // Gentle yaw rotation based on pointer
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.15,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* 3D Realistic MacBook Pro Model */}
      <primitive
        object={clonedScene}
        scale={0.11}
        position={[0, -0.4, 0]}
        rotation={[0.08, 0, 0]}
      />

      {/* In-World 3D Screen Interface (Pinned directly to the laptop display) */}
      <Html
        transform
        occlude="blending"
        position={[0, 0.72, -0.92]}
        rotation={[-0.18, 0, 0]}
        scale={0.132}
        className="pointer-events-auto select-none"
      >
        <div
          className={`w-[660px] h-[415px] rounded-lg border p-4 shadow-2xl backdrop-blur-xl flex flex-col font-mono text-xs transition-colors duration-400 ${
            isObsidian
              ? 'bg-[#08090d]/95 border-white/20 text-neutral-200 shadow-cyan-500/10'
              : 'bg-[#faf7f2]/95 border-amber-900/20 text-neutral-800 shadow-amber-900/10'
          }`}
        >
          {/* macOS Window Titlebar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 dark:border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="ml-2 text-[11px] opacity-60 font-mono flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-cyan-400" />
                tahir@macbook-pro-m3: ~/kernel-v2
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1 text-emerald-400">
                <Activity className="w-3 h-3 animate-pulse" /> 60 FPS
              </span>
              <span className="opacity-50">LATENCY: 1.1ms</span>
              <span className="opacity-50">UPTIME: 99.99%</span>
            </div>
          </div>

          {/* Interactive Mode Tabs */}
          <div className="flex items-center gap-2 mb-3">
            {[
              { id: 'arch', label: '01 / ARCHITECTURE' },
              { id: 'systems', label: '02 / SYSTEMS CORE' },
              { id: 'metrics', label: '03 / METRICS' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 rounded text-[11px] font-semibold tracking-wider transition-all duration-200 ${
                  activeTab === tab.id
                    ? isObsidian
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                      : 'bg-amber-500/20 text-amber-900 border border-amber-500/40'
                    : 'opacity-50 hover:opacity-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Screen Content Body */}
          <div className="flex-1 overflow-hidden p-2 rounded bg-black/20 border border-white/5 flex flex-col justify-between">
            {activeTab === 'arch' && (
              <div className="space-y-2">
                <div className="text-[14px] font-bold tracking-tight text-white dark:text-neutral-100">
                  Muhammad Tahir · Backend & Systems Engineer
                </div>
                <p className="text-[11px] leading-relaxed opacity-75">
                  Architecting low-latency microservices, fault-tolerant distributed data layers, and high-throughput backend APIs with Go, Node.js, and C++.
                </p>
                <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-white/10">
                  <div className="p-2 rounded bg-white/5">
                    <span className="text-[10px] text-cyan-400 font-semibold block">CONCURRENCY ENGINE</span>
                    <span className="text-[11px] opacity-90">Goroutines · Worker Pools · Mutex Lock-Free</span>
                  </div>
                  <div className="p-2 rounded bg-white/5">
                    <span className="text-[10px] text-amber-400 font-semibold block">CLOUD BACKBONE</span>
                    <span className="text-[11px] opacity-90">Docker · Kubernetes · AWS RDS & S3</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'systems' && (
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between text-cyan-400 font-bold">
                  <span>SUBSYSTEM PIPELINES</span>
                  <span className="text-emerald-400">ALL SERVICES OPERATIONAL</span>
                </div>
                <div className="font-mono text-[10px] space-y-1 opacity-80">
                  <p>› init_worker_cluster: spawned 16 worker daemons</p>
                  <p>› pgsql_pool: 25 connection handles healthy, avg query 0.8ms</p>
                  <p>› redis_cache: 98.4% hit ratio across 140k cached sessions</p>
                  <p>› jwt_auth_guard: RS256 token verification active</p>
                </div>
                <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> Zero Unhandled Exceptions in Production Runtimes
                </div>
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="opacity-70">Throughput Capacity</span>
                  <span className="font-bold text-cyan-400">12,500 req/sec</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full w-[88%]" />
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="opacity-70">Memory Allocation</span>
                  <span className="font-bold text-emerald-400">14.2 MB RSS (Zero Leak)</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[42%]" />
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="opacity-70">P99 Latency SLA</span>
                  <span className="font-bold text-amber-400">&lt; 4.2ms</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full w-[96%]" />
                </div>
              </div>
            )}

            {/* Prompt footer */}
            <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] opacity-60">
              <span>$ scroll --dive into terminal to inspect architecture</span>
              <span className="animate-pulse">_</span>
            </div>
          </div>
        </div>
      </Html>

      {/* Companion Studio Monitor Display */}
      <StudioDisplay isObsidian={isObsidian} wireframeMode={wireframeMode} />
    </group>
  );
}

function StudioDisplay({ isObsidian, wireframeMode }) {
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
    <group position={[1.4, -0.4, -0.2]} rotation={[0, -0.32, 0]}>
      {/* 3D Monitor Hardware */}
      <primitive object={clonedMonitor} scale={0.38} />

      {/* Screen Interface Pinned on Display */}
      <Html
        transform
        occlude="blending"
        position={[0, 0.62, 0.05]}
        scale={0.092}
        className="pointer-events-auto select-none"
      >
        <div
          className={`w-[480px] h-[310px] rounded-md border p-3.5 shadow-2xl flex flex-col justify-between font-mono text-[11px] ${
            isObsidian
              ? 'bg-[#06080d]/95 border-cyan-500/40 text-neutral-200 shadow-cyan-500/20'
              : 'bg-[#faf7f2]/95 border-amber-900/20 text-neutral-800'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px]">
            <span className="text-cyan-400 font-bold uppercase">GRAFANA // CLUSTER TELEMETRY</span>
            <span className="text-emerald-400 animate-pulse">● 64 NODES HEALTHY</span>
          </div>

          {/* Metrics Gauges */}
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

          {/* Live Mini Sparkline Chart */}
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
