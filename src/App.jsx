import React, { useState } from 'react';
import { ScrollProvider, useScrollProgress } from './context/ScrollContext';
import { SmoothScrollProvider } from './providers/SmoothScrollProvider';
import { Scene } from './components/canvas/Scene';
import { Navigation } from './components/ui/Navigation';
import { SciFiHudFrame } from './components/ui/SciFiHudFrame';
import { CyberCursor } from './components/ui/CyberCursor';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { Diegetic3DControls } from './components/ui/Diegetic3DControls';
import { ProjectModal } from './components/ui/ProjectModal';
import { HeroOverlay } from './components/ui/HeroOverlay';
import { AboutOverlay } from './components/ui/AboutOverlay';
import { SkillsOverlay } from './components/ui/SkillsOverlay';
import { ProjectsOverlay } from './components/ui/ProjectsOverlay';
import { ExperienceOverlay } from './components/ui/ExperienceOverlay';
import { ContactOverlay } from './components/ui/ContactOverlay';
import { sound } from './utils/soundEngine';

function PortfolioWorld() {
  const [loaded, setLoaded] = useState(false);
  const {
    selectedProject,
    setSelectedProject,
    focusedTarget,
    setFocusedTarget,
    hudOverlayMode,
    setHudOverlayMode,
  } = useScrollProgress();

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-cyan-400 selection:text-black">
      {/* 1. Boot Sequence Loading Screen */}
      {!loaded && <LoadingScreen onLoaded={() => setLoaded(true)} />}

      {/* 2. Custom Tactical Crosshair Cursor */}
      <CyberCursor />

      {/* 3. Top Navigation + 3D Telemetry HUD Frame */}
      <Navigation />
      <SciFiHudFrame />

      {/* 4. Master Fixed 3D WebGL World (macbook.glb, studio_monitor.glb, allBuildings.glb, outdoor_billboard.glb) */}
      <Scene />

      {/* 4b. Diegetic 3D Interactive Controls for Certificates & Projects */}
      <Diegetic3DControls />

      {/* 5. Floating 3D Focus Inspection Pill (Appears when zoomed into any 3D Billboard / Slab / Monitor) */}
      {focusedTarget && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-wrap items-center gap-4 px-6 py-3 rounded-full bg-black/85 border border-cyan-400/60 backdrop-blur-xl font-mono text-xs text-white shadow-[0_0_35px_rgba(0,240,255,0.35)] pointer-events-auto">
          <div>
            <span className="text-cyan-400 font-bold">{focusedTarget.title}</span>
            {focusedTarget.sub && (
              <span className="text-neutral-400 ml-2 hidden sm:inline">// {focusedTarget.sub}</span>
            )}
          </div>
          {focusedTarget.project && (
            <button
              onClick={() => {
                sound.playClick(1.2);
                setSelectedProject(focusedTarget.project);
              }}
              className="px-3.5 py-1.5 rounded-full bg-emerald-400 text-black font-bold hover:bg-emerald-300 transition-all cursor-pointer"
            >
              OPEN FULL ARCHITECTURE SPEC ↗
            </button>
          )}
          <button
            onClick={() => {
              sound.playClick(0.9);
              setFocusedTarget(null);
            }}
            className="px-3.5 py-1.5 rounded-full bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-all cursor-pointer"
          >
            RELEASE CAMERA [ESC]
          </button>
        </div>
      )}

      {/* 6. Toggle Switch for Pure 3D World vs 2D Editorial HUD Overlays */}
      <button
        onClick={() => {
          sound.playClick(1.1);
          setHudOverlayMode((prev) => !prev);
        }}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 px-4 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md font-mono text-[10px] text-cyan-300 hover:border-cyan-400/60 pointer-events-auto transition-all cursor-pointer"
      >
        {hudOverlayMode
          ? 'VIEW MODE: 3D + 2D HUD OVERLAYS [CLICK FOR 100% PURE 3D]'
          : 'VIEW MODE: 100% PURE DIEGETIC 3D WORLD [CLICK TO SHOW 2D HUD]'}
      </button>

      {/* 7. Physical Scroll Track (#scrolly-container) Driving Lenis + GSAP ScrollTrigger + CameraRig */}
      <main
        id="scrolly-container"
        className="relative z-10 pointer-events-none"
      >
        {hudOverlayMode ? (
          <>
            <HeroOverlay />
            <AboutOverlay />
            <SkillsOverlay />
            <ProjectsOverlay />
            <ExperienceOverlay />
            <ContactOverlay />
          </>
        ) : (
          /* Pure 3D Scroll Waypoints (Zero 2D text blocking the 3D models, preserves exact section anchors for Navigation) */
          <>
            <section id="hero" className="h-[140vh]" />
            <section id="about" className="h-[140vh]" />
            <section id="skills" className="h-[160vh]" />
            <section id="projects" className="h-[220vh]" />
            <section id="experience" className="h-[140vh]" />
            <section id="contact" className="h-[140vh]" />
          </>
        )}
      </main>

      {/* 8. Deep Architecture Spec Modal (When inspecting a 3D Project Monolith) */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ScrollProvider>
      <SmoothScrollProvider>
        <PortfolioWorld />
      </SmoothScrollProvider>
    </ScrollProvider>
  );
}
