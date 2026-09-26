import React, { useEffect, useRef, useState } from 'react';

export function CyberCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only enable on pointer/fine devices (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering interactive element
      const target = e.target;
      const isInteractive = !!target.closest('button, a, input, textarea, [data-interactive]');
      setIsHovered(isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Smooth inertia follow for outer reticle ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {/* 1. Precise Center Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff] transition-opacity duration-150"
      />

      {/* 2. Trailing Outer Reticle Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 rounded-full border border-cyan-400/60 transition-[width,height,border-color,transform] duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-14 h-14 -ml-7 -mt-7 border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(0,255,136,0.3)]'
            : isClicked
            ? 'w-8 h-8 -ml-4 -mt-4 border-rose-500 bg-rose-500/20'
            : 'w-10 h-10 border-cyan-400/40'
        }`}
      >
        {/* 4 Crosshair Notches */}
        <div className="absolute top-0 w-1 h-1 bg-cyan-400" />
        <div className="absolute bottom-0 w-1 h-1 bg-cyan-400" />
        <div className="absolute left-0 w-1 h-1 bg-cyan-400" />
        <div className="absolute right-0 w-1 h-1 bg-cyan-400" />

        {/* Lock Readout on Hover */}
        {isHovered && (
          <span className="font-mono text-[8px] font-bold text-emerald-400 tracking-tighter uppercase animate-pulse">
            TARGET
          </span>
        )}
      </div>

      {/* Real-time floating coordinate HUD tag */}
      <div
        className="fixed bottom-6 right-6 font-mono text-[10px] text-slate-500 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md hidden xl:flex items-center gap-2 select-none"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span>SYS_PTR: [X: {coords.x}px // Y: {coords.y}px]</span>
      </div>
    </div>
  );
}
