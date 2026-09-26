import React, { useState } from 'react';
import { Send, Mail, Copy, Check, Phone, Terminal, Sparkles } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolio.config';
import { GithubIcon, LinkedinIcon } from '../TechIcons';
import { sound } from '../../utils/soundEngine';
import { useScrollProgress } from '../../context/ScrollContext';

export function ContactOverlay() {
  const { personal } = portfolioConfig;
  const { theme } = useScrollProgress();
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const isObsidian = theme === 'obsidian';

  const handleCopyEmail = () => {
    sound.playClick(1.4);
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playHoloEngage();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-24 select-none pointer-events-none"
    >
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-auto border-b border-[var(--hud-line)] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--glass-surface)] border border-[var(--glass-border)] text-[var(--accent-gold)]">
              06 // ORBITAL UPLINK NODE
            </span>
            <span className="font-mono text-xs text-[var(--text-muted)] hidden sm:inline">
              DEEP SPACE TRANSMISSION TERMINAL
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            Initiate Contact
          </h2>
        </div>

        <div className="text-xs font-mono text-[var(--text-muted)]">
          AVAILABILITY: OPEN FOR BACKEND & DISTRIBUTED ROLES
        </div>
      </div>

      {/* Main Body */}
      <div className="my-auto py-8 max-w-5xl mx-auto w-full pointer-events-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Direct Access Dossier */}
          <div className="lg:col-span-5 apple-glass p-6 sm:p-8 rounded-3xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-xs text-[var(--accent-gold)] uppercase tracking-wider block">
                Direct Channels
              </span>

              {/* Copy Email Card */}
              <div
                onClick={handleCopyEmail}
                className="p-4 rounded-2xl bg-[var(--glass-surface)] hover:bg-[var(--glass-border)] border border-[var(--glass-border)] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[var(--accent-gold)] uppercase">
                    Primary Mail Uplink
                  </span>
                  {copied ? (
                    <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-500">
                      <Check className="w-3 h-3" /> COPIED
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)]" />
                  )}
                </div>
                <div className="font-mono text-xs sm:text-sm font-bold text-[var(--text-primary)] mt-1 break-all">
                  {personal.email}
                </div>
              </div>

              {/* Phone Card */}
              {personal.phone && (
                <a
                  href={`tel:${personal.phone}`}
                  onClick={() => sound.playClick(1.1)}
                  className="p-4 rounded-2xl bg-[var(--glass-surface)] hover:bg-[var(--glass-border)] border border-[var(--glass-border)] transition-all block group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[var(--accent-gold)] uppercase">
                      Voice Frequency
                    </span>
                    <Phone className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)]" />
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-bold text-[var(--text-primary)] mt-1">
                    {personal.phone}
                  </div>
                </a>
              )}
            </div>

            {/* Social Grid */}
            <div className="pt-4 border-t border-[var(--glass-border)] flex gap-2">
              {personal.social.github && (
                <a
                  href={personal.social.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick(1.2)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-[var(--glass-surface)] hover:bg-[var(--glass-border)] border border-[var(--glass-border)] text-[var(--text-primary)] font-mono text-xs transition-all hover:scale-105"
                >
                  <GithubIcon className={`w-4 h-4 ${isObsidian ? 'text-cyan-400' : 'text-amber-700'}`} />
                  <span>GitHub</span>
                </a>
              )}
              {personal.social.linkedin && (
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick(1.2)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-[var(--glass-surface)] hover:bg-[var(--glass-border)] border border-[var(--glass-border)] text-[var(--text-primary)] font-mono text-xs transition-all hover:scale-105"
                >
                  <LinkedinIcon className={`w-4 h-4 ${isObsidian ? 'text-cyan-400' : 'text-amber-700'}`} />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Terminal Contact Form */}
          <div className="lg:col-span-7 apple-glass p-6 sm:p-8 rounded-3xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4 font-mono">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-[var(--text-primary)] uppercase">
                  TRANSMISSION DISPATCHED
                </h4>
                <p className="text-[var(--text-secondary)] text-xs max-w-sm mx-auto">
                  Packet successfully routed to {personal.email}. Response expected within standard latency envelope.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-xl bg-[var(--glass-surface)] hover:bg-[var(--glass-border)] border border-[var(--glass-border)] text-[var(--text-primary)] text-xs"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="text-[var(--accent-gold)] font-bold tracking-widest text-[11px] flex items-center gap-2 border-b border-[var(--glass-border)] pb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>TRANSMIT_PACKET.SH</span>
                </div>

                <div className="space-y-1">
                  <label className="text-[var(--text-muted)] text-[11px] block">
                    [01] SENDER_NAME:
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => {
                      sound.playTypingBlip();
                      setFormState({ ...formState, name: e.target.value });
                    }}
                    placeholder="e.g. Alex Mercer"
                    className="w-full px-4 py-3 bg-[var(--glass-surface)] border border-[var(--glass-border)] focus:border-[var(--accent-gold)] focus:outline-none rounded-2xl text-[var(--text-primary)] font-mono placeholder:text-[var(--text-muted)] transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[var(--text-muted)] text-[11px] block">
                    [02] RETURN_FREQUENCY (EMAIL):
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => {
                      sound.playTypingBlip();
                      setFormState({ ...formState, email: e.target.value });
                    }}
                    placeholder="e.g. alex@enterprise.com"
                    className="w-full px-4 py-3 bg-[var(--glass-surface)] border border-[var(--glass-border)] focus:border-[var(--accent-gold)] focus:outline-none rounded-2xl text-[var(--text-primary)] font-mono placeholder:text-[var(--text-muted)] transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[var(--text-muted)] text-[11px] block">
                    [03] PAYLOAD_MESSAGE:
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => {
                      sound.playTypingBlip();
                      setFormState({ ...formState, message: e.target.value });
                    }}
                    placeholder="Enter project requirements, engineering roles, or architecture collaboration proposals..."
                    className="w-full px-4 py-3 bg-[var(--glass-surface)] border border-[var(--glass-border)] focus:border-[var(--accent-gold)] focus:outline-none rounded-2xl text-[var(--text-primary)] font-mono placeholder:text-[var(--text-muted)] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-4 font-bold uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] ${
                    isObsidian
                      ? 'bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-black shadow-[0_0_25px_rgba(0,240,255,0.3)]'
                      : 'bg-[#18181b] hover:bg-neutral-800 text-white shadow-[0_0_15px_rgba(0,0,0,0.15)]'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT PAYLOAD TO TAHIR</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer System Watermark */}
      <footer className="max-w-5xl w-full mx-auto pt-8 pb-4 text-center font-mono text-[11px] text-[var(--text-muted)] border-t border-[var(--hud-line)] pointer-events-auto">
        <div>
          MUHAMMAD TAHIR © {new Date().getFullYear()} • UET LAHORE • COMPUTER SCIENCE
        </div>
        <div className="text-[10px] opacity-75 mt-1">
          APPLE EDITORIAL 3D SCROLLYTELLING • POWERED BY R3F, DREI, GSAP & THREE.JS
        </div>
      </footer>
    </section>
  );
}
