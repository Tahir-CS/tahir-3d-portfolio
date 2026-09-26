import React, { useState } from 'react';
import { Send, Mail, Copy, Check, Phone, Terminal, Sparkles } from 'lucide-react';
import { portfolioConfig } from '../../config/portfolio.config';
import { GithubIcon, LinkedinIcon } from '../TechIcons';
import { sound } from '../../utils/soundEngine';

export function ContactOverlay() {
  const { personal } = portfolioConfig;
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

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
      className="min-h-screen flex flex-col justify-between px-4 sm:px-8 py-20 pointer-events-none"
    >
      <div className="max-w-5xl w-full mx-auto pointer-events-auto space-y-8 my-auto">
        {/* Header */}
        <div className="backdrop-blur-2xl bg-black/50 border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
            <Terminal className="w-4 h-4 animate-pulse" />
            <span>// TERMINAL_UPLINK // NODE-06</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Establish Uplink
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-mono">
            Direct telemetry transmission. Available for Software & Backend Roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Direct Access Dossier */}
          <div className="lg:col-span-5 backdrop-blur-xl bg-black/50 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                Direct Channels
              </h3>

              {/* Copy Email Card */}
              <div
                onClick={handleCopyEmail}
                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-cyan-400 uppercase">
                    Primary Mail Uplink
                  </span>
                  {copied ? (
                    <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-400">
                      <Check className="w-3 h-3" /> COPIED
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                  )}
                </div>
                <div className="font-mono text-xs sm:text-sm font-bold text-white mt-1 break-all">
                  {personal.email}
                </div>
              </div>

              {/* Phone Card */}
              {personal.phone && (
                <a
                  href={`tel:${personal.phone}`}
                  onClick={() => sound.playClick(1.1)}
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 transition-all block group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-cyan-400 uppercase">
                      Voice Frequency
                    </span>
                    <Phone className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-bold text-white mt-1">
                    {personal.phone}
                  </div>
                </a>
              )}
            </div>

            {/* Social Grid */}
            <div className="pt-4 border-t border-white/10 flex gap-2">
              {personal.social.github && (
                <a
                  href={personal.social.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick(1.2)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white font-mono text-xs transition-all hover:scale-105"
                >
                  <GithubIcon className="w-4 h-4 text-cyan-400" />
                  <span>GitHub</span>
                </a>
              )}
              {personal.social.linkedin && (
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick(1.2)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white font-mono text-xs transition-all hover:scale-105"
                >
                  <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Terminal Contact Form */}
          <div className="lg:col-span-7 backdrop-blur-xl bg-black/60 border border-white/10 p-6 sm:p-8 rounded-3xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4 font-mono">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-white uppercase">
                  TRANSMISSION DISPATCHED
                </h4>
                <p className="text-slate-400 text-xs max-w-sm mx-auto">
                  Packet successfully routed to {personal.email}. Response expected within standard latency envelope.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="text-cyan-400 font-bold tracking-widest text-[11px] flex items-center gap-2 border-b border-white/10 pb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>TRANSMIT_PACKET.SH</span>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 text-[11px] block">
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
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 focus:border-cyan-400 focus:outline-none rounded-xl text-white font-mono placeholder:text-slate-600 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 text-[11px] block">
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
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 focus:border-cyan-400 focus:outline-none rounded-xl text-white font-mono placeholder:text-slate-600 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 text-[11px] block">
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
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 focus:border-cyan-400 focus:outline-none rounded-xl text-white font-mono placeholder:text-slate-600 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-black font-bold uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(0,240,255,0.4)]"
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
      <footer className="max-w-5xl w-full mx-auto pt-12 pb-4 text-center font-mono text-[11px] text-slate-500 border-t border-white/10">
        <div>
          MUHAMMAD TAHIR © {new Date().getFullYear()} • UET LAHORE • COMPUTER SCIENCE
        </div>
        <div className="text-[10px] text-cyan-500/70 mt-1">
          COMMAND CENTER 3D ARCHITECTURE • POWERED BY R3F, DREI, GSAP & THREE.JS
        </div>
      </footer>
    </section>
  );
}
