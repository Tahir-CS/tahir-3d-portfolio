import React, { useState, useEffect } from 'react';
import { useScrollProgress } from '../../context/ScrollContext';
import { portfolioConfig } from '../../config/portfolio.config';
import { ChevronLeft, ChevronRight, Eye, RotateCw, ExternalLink, X, Move3d } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

// 3D coordinates for all 5 certificates in the sweeping amphitheater arc
const CERT_TARGETS = [
  {
    index: 0,
    title: 'AWS CLOUD PRACTITIONER',
    sub: 'Amazon Web Services // 2024 Verified Credential',
    pos: [0.0, 0.6, -4.3],
    lookAt: [0.0, 0.6, -6.5],
  },
  {
    index: 1,
    title: 'IBM APPLIED DEVOPS ENGINEERING',
    sub: 'IBM // 2024 Verified Credential',
    pos: [2.3, 0.6, -4.0],
    lookAt: [2.8, 0.6, -6.1],
  },
  {
    index: 2,
    title: 'META ADVANCED REACT',
    sub: 'Meta // 2024 Verified Credential',
    pos: [4.6, 0.6, -3.4],
    lookAt: [5.6, 0.6, -5.3],
  },
  {
    index: 3,
    title: 'IBM BACK-END DEVELOPMENT',
    sub: 'IBM // 2024 Verified Credential',
    pos: [-2.3, 0.6, -4.0],
    lookAt: [-2.8, 0.6, -6.1],
  },
  {
    index: 4,
    title: 'MERN STACK CERTIFICATION',
    sub: 'Full Stack Development // 2024',
    pos: [-4.6, 0.6, -3.4],
    lookAt: [-5.6, 0.6, -5.3],
  },
];

// 3D coordinates for all 7 projects mounted on the skyscraper facades
const PROJECT_TARGETS = [
  {
    index: 0,
    title: '01 // CAREEROS',
    sub: 'AI Job Search & Semantic Resume Optimization',
    pos: [-4.2, 3.8, -15.8],
    lookAt: [-4.8, 3.8, -18.5],
  },
  {
    index: 1,
    title: '02 // SUBSCRIPTION GUARDIAN',
    sub: 'Fintech SaaS & Recurring Charge Detection',
    pos: [0.0, 4.2, -16.4],
    lookAt: [0.0, 4.2, -19.1],
  },
  {
    index: 2,
    title: '03 // TRENDVISION ANALYTICS',
    sub: 'E-Commerce Intelligence & Viral Trend Forecasting',
    pos: [4.2, 3.8, -15.8],
    lookAt: [4.8, 3.8, -18.5],
  },
  {
    index: 3,
    title: '04 // AI RESUME ANALYZER',
    sub: 'Automated Scoring & AST Semantic Feedback',
    pos: [-4.2, 0.8, -15.8],
    lookAt: [-4.8, 0.8, -18.5],
  },
  {
    index: 4,
    title: '05 // YOUTUBE ANALYSIS HUB',
    sub: 'Video Telemetry & Transcript NLP Processing',
    pos: [0.0, 1.2, -16.4],
    lookAt: [0.0, 1.2, -19.1],
  },
  {
    index: 5,
    title: '06 // UET OPENCOURSEWARE',
    sub: 'Academic Knowledge Distribution Engine',
    pos: [4.2, 0.8, -15.8],
    lookAt: [4.8, 0.8, -18.5],
  },
  {
    index: 6,
    title: '07 // NEXT.JS E-COMMERCE STORE',
    sub: 'High-Throughput Distributed Commerce Pipeline',
    pos: [0.0, -1.8, -16.4],
    lookAt: [0.0, -1.8, -19.1],
  },
];

export function Diegetic3DControls() {
  const {
    scrollProgress,
    focusedTarget,
    setFocusedTarget,
    setSelectedProject,
    theme,
  } = useScrollProgress();

  const [activeCertIdx, setActiveCertIdx] = useState(0);
  const [activeProjIdx, setActiveProjIdx] = useState(0);

  const isObsidian = theme === 'obsidian';
  const progress = scrollProgress.current;

  // Determine which chapter user is in
  const isCertsChapter = progress >= 0.18 && progress <= 0.38;
  const isProjectsChapter = progress >= 0.64 && progress <= 0.88;
  const isVisible = isCertsChapter || isProjectsChapter || focusedTarget !== null;

  if (!isVisible) return null;

  // Handler to navigate certificates in 3D
  const goToCert = (idx) => {
    sound.playClick(1.2);
    const safeIdx = (idx + CERT_TARGETS.length) % CERT_TARGETS.length;
    setActiveCertIdx(safeIdx);
    const target = CERT_TARGETS[safeIdx];
    const certData = portfolioConfig.certifications[safeIdx];
    setFocusedTarget({
      title: `CREDENTIAL // ${target.title}`,
      sub: `${target.sub} (Press ESC to return)`,
      pos: target.pos,
      lookAt: target.lookAt,
    });
  };

  // Handler to navigate projects in 3D
  const goToProj = (idx) => {
    sound.playClick(1.2);
    const safeIdx = (idx + PROJECT_TARGETS.length) % PROJECT_TARGETS.length;
    setActiveProjIdx(safeIdx);
    const target = PROJECT_TARGETS[safeIdx];
    const projData = portfolioConfig.projects[safeIdx];
    setFocusedTarget({
      title: target.title,
      sub: `${target.sub} (Press ESC to return)`,
      pos: target.pos,
      lookAt: target.lookAt,
      project: { ...projData, image: projData.thumbnail },
    });
  };

  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-auto">
      {/* Sleek Floating 3D Navigation Bar */}
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-2xl backdrop-blur-xl font-mono text-xs transition-all duration-300 ${
          isObsidian
            ? 'bg-[#06080e]/95 border-cyan-400/60 text-white shadow-[0_0_40px_rgba(0,240,255,0.28)]'
            : 'bg-[#faf7f2]/95 border-amber-800/40 text-neutral-900 shadow-xl'
        }`}
      >
        {/* Certificate Navigator Controls */}
        {(isCertsChapter || (focusedTarget && focusedTarget.title?.includes('CREDENTIAL'))) && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToCert(activeCertIdx - 1)}
              className="p-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all text-cyan-400"
              title="Previous Certificate in 3D"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-[11px] font-bold text-cyan-300 px-2 tracking-wider">
              CERTIFICATE [{activeCertIdx + 1} / 5]
            </span>

            <button
              onClick={() => goToCert(activeCertIdx + 1)}
              className="p-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all text-cyan-400"
              title="Next Certificate in 3D"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Project Navigator Controls */}
        {(isProjectsChapter || (focusedTarget && focusedTarget.project)) && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToProj(activeProjIdx - 1)}
              className="p-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all text-cyan-400"
              title="Previous Project in 3D"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-[11px] font-bold text-cyan-300 px-2 tracking-wider truncate max-w-[200px]">
              PROJECT [{activeProjIdx + 1} / 7]
            </span>

            <button
              onClick={() => goToProj(activeProjIdx + 1)}
              className="p-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all text-cyan-400"
              title="Next Project in 3D"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Quick Zoom-Out / Overview Button */}
        {focusedTarget && (
          <button
            onClick={() => {
              sound.playClick(0.9);
              setFocusedTarget(null);
            }}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 font-bold hover:bg-cyan-400 hover:text-black transition-all ml-2"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>OVERVIEW [ESC]</span>
          </button>
        )}

        {/* 3D Drag Free-Look Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-neutral-400 border-l border-white/15 pl-3 ml-1">
          <Move3d className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>DRAG MOUSE TO LOOK &amp; MOVE IN 3D</span>
        </div>
      </div>
    </div>
  );
}
