import React, { useState } from 'react';
import { Layers, Server, Activity, ArrowUpRight } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolio.config';
import { TechIcon } from '../TechIcons';
import { sound } from '../../utils/soundEngine';

export function SkillsOverlay() {
  const { skills } = portfolioConfig;
  const categories = ['All', ...Object.keys(skills)];
  const [selectedCat, setSelectedCat] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const filteredCategories =
    selectedCat === 'All'
      ? Object.entries(skills)
      : Object.entries(skills).filter(([cat]) => cat === selectedCat);

  return (
    <section
      id="skills"
      className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-20 pointer-events-none"
    >
      <div className="max-w-5xl w-full pointer-events-auto space-y-6">
        {/* Header Block */}
        <div className="backdrop-blur-2xl bg-black/50 border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <Layers className="w-4 h-4" />
              <span>// CLUSTER_INFRASTRUCTURE // NODE-03</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              Server Corridors
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-mono">
              High-throughput microservices, sub-50ms queues, and vector storage racks.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick(1.1);
                  setSelectedCat(cat);
                }}
                className={`px-3 py-1 rounded-full font-mono text-[11px] transition-all ${
                  selectedCat === cat
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Racks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map(([category, skillList], cIdx) => (
            <div
              key={cIdx}
              className="backdrop-blur-xl bg-black/45 border border-white/10 p-5 rounded-2xl hover:border-cyan-500/40 transition-all space-y-3 group"
            >
              {/* Rack Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    {category}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">
                  RACK_0{cIdx + 1}
                </span>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2 pt-1">
                {skillList.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    onMouseEnter={() => {
                      sound.playClick(1.4);
                      setHoveredSkill(skill);
                    }}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 text-white font-mono text-xs transition-all cursor-pointer hover:scale-105"
                  >
                    <TechIcon name={skill} size={15} />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Live Status Telemetry Readout */}
        <div className="backdrop-blur-md bg-black/60 border border-white/10 px-5 py-3 rounded-2xl flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>
              ACTIVE TELEMETRY:{' '}
              <span className="text-white font-bold">
                {hoveredSkill ? `INSPECTING [ ${hoveredSkill.toUpperCase()} ]` : 'ALL CLUSTERS SYNCHRONIZED'}
              </span>
            </span>
          </div>
          <span className="text-[11px] text-cyan-400 hidden sm:inline">
            ZERO-DOWNTIME MICROSERVICES
          </span>
        </div>
      </div>
    </section>
  );
}
