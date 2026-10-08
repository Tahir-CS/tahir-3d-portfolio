import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolio.config';
import { TechIcon } from '../TechIcons';
import { sound } from '../../utils/soundEngine';
import { useScrollProgress } from '../../context/ScrollContext';

export function SkillsOverlay() {
  const { skills } = portfolioConfig;
  const { theme } = useScrollProgress();
  const isObsidian = theme === 'obsidian';
  const accent = isObsidian ? 'bg-cyan-500 text-black' : 'bg-amber-600 text-white';
  const accentText = isObsidian ? 'text-cyan-400' : 'text-amber-700';

  const categories = ['All', ...Object.keys(skills)];
  const [selectedCat, setSelectedCat] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const filteredSkills =
    selectedCat === 'All'
      ? Object.entries(skills).flatMap(([cat, list]) => list.map((item) => ({ cat, name: item })))
      : skills[selectedCat]?.map((item) => ({ cat: selectedCat, name: item })) || [];

  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-24 select-none pointer-events-none"
    >
      {/* Top Banner & Category Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-auto border-b border-[var(--hud-line)] pb-4">
        <div className="space-y-1">
          <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.25em] ${accentText}`}>
            03 // DISTRIBUTED SYSTEMS MESH · CITY AVENUE FLIGHT
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            Distributed Systems Mesh
          </h2>
        </div>

        {/* Filter Pills — no container box */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick(1.1);
                setSelectedCat(cat);
              }}
              className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wide transition-all duration-200 border ${
                selectedCat === cat
                  ? `${accent} border-transparent font-bold`
                  : 'border-[var(--hud-line)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--glass-border)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Center Void: Wide open for City Avenue & 3D Skyscraper Mega-Displays */}
      <div className="my-auto py-12" />

      {/* Bottom Skill HUD — no box, just flowing chips on transparent bg */}
      <div className="space-y-3 pointer-events-auto">
        {/* Status line */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
            <span>
              LIVE TELEMETRY:{' '}
              <span className={`font-bold ${accentText}`}>
                {hoveredSkill ? `INSPECTING [ ${hoveredSkill.toUpperCase()} ]` : '7 ARCHITECTURAL PILLARS ACTIVE'}
              </span>
            </span>
          </div>
          <span className="hidden sm:inline">CITY MEGA-DISPLAY RUNTIME // 60 FPS</span>
        </div>

        {/* Skill chips — no surrounding card, just chips directly on transparent canvas */}
        <div className="flex flex-wrap items-center gap-2">
          {filteredSkills.map(({ cat, name }, idx) => (
            <div
              key={idx}
              onMouseEnter={() => {
                sound.playClick(1.4);
                setHoveredSkill(name);
              }}
              onMouseLeave={() => setHoveredSkill(null)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-mono transition-all duration-200 cursor-pointer hover:scale-105 ${
                hoveredSkill === name
                  ? isObsidian
                    ? 'bg-cyan-500/20 border-cyan-400/60 text-white shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                    : 'bg-amber-500/20 border-amber-600/60 text-neutral-900 shadow-[0_0_10px_rgba(180,120,40,0.25)]'
                  : 'bg-[var(--glass-surface)]/50 border-[var(--hud-line)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--glass-border)]'
              }`}
            >
              <TechIcon name={name} size={12} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
