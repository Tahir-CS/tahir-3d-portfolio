import React, { useMemo, useRef } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '../../../context/ScrollContext';
import { portfolioConfig } from '../../../config/portfolio.config';
import { BuildingScreens, SideBillboardScreen } from './BuildingScreens';
import { CityScape } from './CityScape';
import { sound } from '../../../utils/soundEngine';
import { Briefcase, CheckCircle2, GraduationCap } from 'lucide-react';

export function RealisticCity({ position = [0, -1.5, -15], scale = 0.16 }) {
  const { theme, wireframeMode, setFocusedTarget } = useScrollProgress();
  const isObsidian = theme === 'obsidian';
  const groupRef = useRef();

  const { scene } = useGLTF('/models/allBuildings.glb');

  const clonedCity = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = false;
        child.receiveShadow = false;
        if (child.material) {
          child.material = child.material.clone();
          if (wireframeMode) {
            child.material.wireframe = true;
            child.material.color = new THREE.Color('#00ff88');
          } else if (isObsidian) {
            child.material.roughness = Math.min(child.material.roughness || 0.5, 0.45);
            child.material.metalness = 0.65;
            child.material.envMapIntensity = 1.2;
          } else {
            child.material.roughness = Math.max(child.material.roughness || 0.5, 0.35);
            child.material.metalness = 0.25;
            child.material.envMapIntensity = 0.8;
          }
        }
      }
    });
    return clone;
  }, [scene, isObsidian, wireframeMode]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
    }
  });

  const focusCentralBillboard = (e) => {
    e?.stopPropagation();
    sound.playHoloEngage();
    setFocusedTarget({
      title: 'SKYLINE MEGA-LED // SYSTEMS ARCHITECTURE',
      sub: 'Click ESC to return to city flight',
      pos: [0, 5.3, -9.2],
      lookAt: [0, 5.3, -13.8],
    });
  };

  const focusEastBillboard = (e) => {
    e?.stopPropagation();
    sound.playHoloEngage();
    setFocusedTarget({
      title: 'EAST TOWER // SLA & EDUCATION BENCHMARKS',
      sub: 'UET Lahore BSCS // 99.999% Uptime Telemetry',
      pos: [5.8, 4.1, -9.8],
      lookAt: [8.2, 4.1, -13.0],
    });
  };

  return (
    <group ref={groupRef} position={position}>
      {/* 1. Authentic 3D Building City Block (allBuildings.glb) */}
      <primitive
        object={clonedCity}
        scale={scale}
        position={[-15 * scale, 0, 0]}
        rotation={[0, 0, 0]}
      />

      {/* 2. Giant Central Mega-Display Billboard (Click to fly up to it!) */}
      <group onClick={focusCentralBillboard}>
        <BuildingScreens position={[0, 6.8, 1.2]} rotation={[0, 0, 0]} scale={0.155} />
      </group>

      {/* 3. Real 3D Outdoor Billboard on West Skyscraper (outdoor_billboard.glb) with Live Experience Screen */}
      <RooftopOutdoorBillboard
        position={[-7.5, 5.2, 0.8]}
        rotation={[0, 0.32, 0]}
        scale={1.3}
        isObsidian={isObsidian}
        onFocus={() => {
          sound.playHoloEngage();
          setFocusedTarget({
            title: 'WEST SKYSCRAPER BILLBOARD // EXPERIENCE & PEDIGREE',
            sub: 'KICS (UET Lahore) & Bano Qabil Engineering Record',
            pos: [-4.2, 4.0, -10.5],
            lookAt: [-7.5, 4.0, -14.2],
          });
        }}
      />

      {/* 4. Secondary Vertical Telemetry Billboard on East Skyscraper */}
      <group onClick={focusEastBillboard}>
        <SideBillboardScreen position={[8.2, 5.6, 2.0]} rotation={[0, -0.28, 0]} scale={0.125} />
      </group>

      {/* 5. Ambient Cyber Skyline Neon Illumination */}
      <pointLight
        position={[0, 7.5, 2.5]}
        color={isObsidian ? '#00f0ff' : '#d4af37'}
        intensity={isObsidian ? 3.5 : 1.8}
        distance={25}
        decay={2}
      />
      <pointLight
        position={[8.2, 6.0, 3.0]}
        color={isObsidian ? '#38bdf8' : '#e2b35a'}
        intensity={isObsidian ? 2.5 : 1.2}
        distance={20}
        decay={2}
      />

      {/* 6. Procedural Skyline Extensions on the Far Flanks */}
      <CityScape position={[0, 0, -6]} />
    </group>
  );
}

function RooftopOutdoorBillboard({ position, rotation, scale, isObsidian, onFocus }) {
  const { scene } = useGLTF('/models/outdoor_billboard.glb');
  const clone = useMemo(() => scene.clone(true), [scene]);
  const { experience, about } = portfolioConfig;

  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        onFocus?.();
      }}
    >
      <primitive object={clone} />

      {/* Diegetic 3D Billboard Screen Mounted onto outdoor_billboard.glb */}
      <Html
        transform
        distanceFactor={1.3}
        position={[0, 0.35, 0.12]}
        scale={0.11}
        className="pointer-events-auto select-none"
      >
        <div
          onClick={onFocus}
          className={`w-[780px] h-[470px] rounded-xl border-4 p-6 shadow-2xl flex flex-col justify-between font-mono cursor-pointer transition-all ${
            isObsidian
              ? 'bg-[#04070d]/95 border-emerald-400/70 text-white shadow-[0_0_70px_rgba(16,185,129,0.35)]'
              : 'bg-[#faf7f2]/95 border-amber-700/70 text-neutral-900'
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/15 pb-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest">
              <Briefcase className="w-4 h-4" />
              <span>WEST_BILLBOARD // PRODUCTION EXPERIENCE &amp; EDUCATION</span>
            </div>
            <span className="text-[10px] px-2.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
              CLICK BILLBOARD TO ZOOM
            </span>
          </div>

          {/* Experience Cards Inside 3D Billboard */}
          <div className="grid grid-cols-12 gap-4 my-auto">
            {experience.map((exp, i) => (
              <div key={i} className="col-span-7 first:col-span-7 last:col-span-5 border border-white/15 rounded-lg p-3.5 bg-white/[0.03] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-cyan-300">{exp.title}</span>
                  <span className="text-[9px] text-emerald-400">{exp.duration}</span>
                </div>
                <div className="text-[10px] text-amber-300 font-bold">{exp.company}</div>
                <div className="space-y-1 pt-1">
                  {exp.highlights.slice(0, 3).map((h, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[10px] text-neutral-300 leading-tight">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Education Strip */}
          <div className="border-t border-white/15 pt-3 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <GraduationCap className="w-4 h-4" />
              <span>{about.education.institution} — {about.education.degree}</span>
            </div>
            <span className="text-emerald-400 font-bold">{about.education.cgpa} ({about.education.graduationDate})</span>
          </div>
        </div>
      </Html>
    </group>
  );
}

useGLTF.preload('/models/allBuildings.glb');
useGLTF.preload('/models/outdoor_billboard.glb');
