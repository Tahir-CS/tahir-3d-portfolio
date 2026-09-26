import React, { useState } from 'react';
import { Layers, Activity } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolio.config';
import { TechIcon } from '../TechIcons';
import { sound } from '../../utils/soundEngine';
import { useScrollProgress } from '../../context/ScrollContext';

export function SkillsOverlay() {
  const { skills } = portfolioConfig;
  const { theme } = useScrollProgress();
  const isObsidian = theme === 'obsidian';

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
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--glass-surface)] border border-[var(--glass-border)] text-[var(--accent-gold)]">
              03 // LIQUID INFRASTRUCTURE
            </span>
            <span className="font-mono text-xs text-[var(--text-muted)] hidden sm:inline">
              SIDEWAYS TRACKING FLIGHT · -9° BANKING ROLL
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            Distributed Systems Mesh
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick(1.1);
                setSelectedCat(cat);
              }}
              className={`px-3 py-1 rounded-full font-mono text-xs transition-all duration-200 ${
                selectedCat === cat
                  ? isObsidian
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                    : 'bg-amber-600 text-white font-bold shadow-[0_0_10px_rgba(180,100,20,0.3)]'
                  : 'bg-[var(--glass-surface)] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Center Void: Wide open for the reflective Liquid Chrome Ocean and 3D Monoliths */}
      <div className="my-auto py-12" />

      {/* Bottom Floating Skill HUD Capsule */}
      <div className="space-y-4 pointer-events-auto">
        <div className="apple-glass p-4 rounded-3xl backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filteredSkills.map(({ cat, name }, idx) => (
              <div
                key={idx}
                onMouseEnter={() => {
                  sound.playClick(1.4);
                  setHoveredSkill(name);
                }}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all duration-200 cursor-pointer hover:scale-105 ${
                  hoveredSkill === name
                    ? isObsidian
                      ? 'bg-cyan-500/25 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                      : 'bg-amber-500/25 border-amber-600 text-neutral-900 shadow-[0_0_12px_rgba(180,120,40,0.3)]'
                    : 'bg-[var(--glass-surface)] border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <TechIcon name={name} size={14} />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Status Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] px-2">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>
              LIVE TELEMETRY:{' '}
              <span className="text-[var(--text-primary)] font-bold">
                {hoveredSkill ? `INSPECTING [ ${hoveredSkill.toUpperCase()} ]` : '7 TITANIUM MONOLITHS ACTIVE'}
              </span>
            </span>
          </div>
          <span className="hidden sm:inline">
            REFLECTIVE OCEAN RUNTIME // 60 FPS
          </span>
        </div>
      </div>
    </section>
  );
}
