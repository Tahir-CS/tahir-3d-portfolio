import React, { useState } from 'react';
import { Send, Copy, Check, Phone, Sparkles } from 'lucide-react';
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
  const accentText = isObsidian ? 'text-cyan-400' : 'text-amber-700';

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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pointer-events-auto border-b border-[var(--hud-line)] pb-4">
        <div className="space-y-1">
          <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.25em] ${accentText}`}>
            05 // SUMMIT BROADCAST TERMINAL · ROOFTOP TRANSMISSION DECK
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            Initiate Contact
          </h2>
        </div>
        <div className="text-[10px] font-mono text-[var(--text-muted)] pointer-events-auto">
          AVAILABILITY: OPEN FOR BACKEND &amp; DISTRIBUTED ROLES
        </div>
      </div>

      {/* Body — split, no apple-glass boxes */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8 items-start pointer-events-auto">

        {/* Left: Direct channels — bare text links, no card boxes */}
        <div className="lg:col-span-4 space-y-6">
          <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.2em] ${accentText} block`}>
            Direct Channels
          </span>

          {/* Email — borderless row */}
          <button
            onClick={handleCopyEmail}
            className="w-full text-left group flex items-start justify-between border-b border-[var(--hud-line)] pb-4 hover:pb-3 transition-all duration-150"
          >
            <div>
              <span className={`font-mono text-[9px] uppercase tracking-widest ${accentText}`}>Primary Mail Uplink</span>
              <div className="font-mono text-xs font-bold text-[var(--text-primary)] mt-0.5 break-all">
                {personal.email}
              </div>
            </div>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-1" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] shrink-0 mt-1 transition-colors" />
            )}
          </button>

          {/* Phone */}
          {personal.phone && (
            <a
              href={`tel:${personal.phone}`}
              onClick={() => sound.playClick(1.1)}
              className="flex items-start justify-between border-b border-[var(--hud-line)] pb-4 group"
            >
              <div>
                <span className={`font-mono text-[9px] uppercase tracking-widest ${accentText}`}>Voice Frequency</span>
                <div className="font-mono text-xs font-bold text-[var(--text-primary)] mt-0.5">
                  {personal.phone}
                </div>
              </div>
              <Phone className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] shrink-0 mt-1 transition-colors" />
            </a>
          )}

          {/* Social links — bare icon + label row */}
          <div className="flex items-center gap-5 pt-1">
            {personal.social.github && (
              <a
                href={personal.social.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick(1.2)}
                className={`flex items-center gap-1.5 font-mono text-[10px] text-[var(--text-muted)] hover:${accentText.replace('text-', '')} transition-colors`}
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            )}
            {personal.social.linkedin && (
              <a
                href={personal.social.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick(1.2)}
                className={`flex items-center gap-1.5 font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors`}
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </div>

        {/* Center void — space beacon visible here */}
        <div className="lg:col-span-1 hidden lg:block" />

        {/* Right: Terminal form — no glass box, inputs on transparent bg */}
        <div className="lg:col-span-7 space-y-4 font-mono text-xs">
          {submitted ? (
            <div className="py-10 space-y-3 font-mono text-center">
              <div className={`text-3xl font-black ${accentText}`}>✓</div>
              <h4 className="text-base font-bold text-[var(--text-primary)] uppercase tracking-widest">
                TRANSMISSION DISPATCHED
              </h4>
              <p className="text-[10px] text-[var(--text-muted)] max-w-sm mx-auto">
                Packet routed to {personal.email}. Response within standard latency envelope.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className={`text-[10px] font-mono ${accentText} hover:opacity-70 underline transition-opacity`}
              >
                Send Another Transmission
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${accentText} border-b border-[var(--hud-line)] pb-2`}>
                <Sparkles className="w-3 h-3" />
                <span>TRANSMIT_PACKET.SH</span>
              </div>

              {[
                { key: 'name', label: '[01] SENDER_NAME', placeholder: 'e.g. Alex Mercer', type: 'text' },
                { key: 'email', label: '[02] RETURN_FREQUENCY (EMAIL)', placeholder: 'e.g. alex@enterprise.com', type: 'email' },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key} className="space-y-1">
                  <label className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest block">{label}</label>
                  <input
                    type={type}
                    required
                    value={formState[key]}
                    onChange={(e) => {
                      sound.playTypingBlip();
                      setFormState({ ...formState, [key]: e.target.value });
                    }}
                    placeholder={placeholder}
                    className="w-full px-0 py-2 bg-transparent border-0 border-b border-[var(--hud-line)] focus:border-[var(--text-primary)] focus:outline-none text-[var(--text-primary)] font-mono text-xs placeholder:text-[var(--text-muted)]/50 transition-all"
                  />
                </div>
              ))}

              <div className="space-y-1">
                <label className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest block">[03] PAYLOAD_MESSAGE</label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => {
                    sound.playTypingBlip();
                    setFormState({ ...formState, message: e.target.value });
                  }}
                  placeholder="Enter project requirements, engineering roles, or collaboration proposals..."
                  className="w-full px-0 py-2 bg-transparent border-0 border-b border-[var(--hud-line)] focus:border-[var(--text-primary)] focus:outline-none text-[var(--text-primary)] font-mono text-xs placeholder:text-[var(--text-muted)]/50 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className={`flex items-center gap-2 px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-200 hover:scale-105 ${
                  isObsidian
                    ? 'bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.3)]'
                    : 'bg-[#18181b] text-white hover:bg-neutral-700'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>TRANSMIT PAYLOAD TO TAHIR</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-6 pb-2 font-mono text-[9px] text-[var(--text-muted)] border-t border-[var(--hud-line)] pointer-events-auto flex items-center justify-between">
        <span>MUHAMMAD TAHIR © {new Date().getFullYear()} • UET LAHORE • COMPUTER SCIENCE</span>
        <span className="hidden sm:inline">R3F · DREI · GSAP · THREE.JS</span>
      </footer>
    </section>
  );
}
