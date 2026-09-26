import React, { useState } from 'react';
import { ScrollProvider, useScrollProgress } from './context/ScrollContext';
import { SmoothScrollProvider } from './providers/SmoothScrollProvider';
import { Scene } from './components/canvas/Scene';
import { Navigation } from './components/ui/Navigation';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { HeroOverlay } from './components/ui/HeroOverlay';
import { AboutOverlay } from './components/ui/AboutOverlay';
import { SkillsOverlay } from './components/ui/SkillsOverlay';
import { ProjectsOverlay } from './components/ui/ProjectsOverlay';
import { ExperienceOverlay } from './components/ui/ExperienceOverlay';
import { ContactOverlay } from './components/ui/ContactOverlay';
import { ProjectModal } from './components/ui/ProjectModal';

function AppContent() {
  const [loaded, setLoaded] = useState(false);
  const { selectedProject, setSelectedProject } = useScrollProgress();

  return (
    <div className="relative min-h-screen bg-[#07090e] text-white overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* 1. Terminal Boot Loading Screen */}
      {!loaded && <LoadingScreen onLoaded={() => setLoaded(true)} />}

      {/* 2. Fixed Floating Nav Bar */}
      <Navigation />

      {/* 3. Fixed WebGL 3D Canvas Layer */}
      <Scene />

      {/* 4. Physical Native/Lenis Scroll Container */}
      <div id="scrolly-container" className="relative z-10 w-full">
        {/* Gateway Section (0% to 15% Scroll) */}
        <HeroOverlay />

        {/* Control Room Section (15% to 35% Scroll) */}
        <AboutOverlay />

        {/* Server Corridors Section (35% to 58% Scroll) */}
        <SkillsOverlay />

        {/* Deployment Pipeline Section (58% to 80% Scroll) */}
        <ProjectsOverlay />

        {/* Career Timeline Section (80% to 92% Scroll) */}
        <ExperienceOverlay />

        {/* Terminal Uplink Section (92% to 100% Scroll) */}
        <ContactOverlay />
      </div>

      {/* 5. High-Res Project Inspection Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ScrollProvider>
      <SmoothScrollProvider>
        <AppContent />
      </SmoothScrollProvider>
    </ScrollProvider>
  );
}
