import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

const ScrollContext = createContext(null);

export function ScrollProvider({ children }) {
  const scrollProgress = useRef(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState(null);
  const [focusedTarget, setFocusedTarget] = useState(null); // { title, sub, pos: [x,y,z], lookAt: [x,y,z], project? }
  const [wireframeMode, setWireframeMode] = useState(false);
  const [hudOverlayMode, setHudOverlayMode] = useState(false); // false = 100% pure 3D world (no 2D text clutter)
  const [scrollPercent, setScrollPercent] = useState(0);
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tahir_theme') || 'obsidian';
    }
    return 'obsidian';
  });

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tahir_theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'obsidian' ? 'cream' : 'obsidian';
    setTheme(nextTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Press ESC to release 3D camera lock and return to spline flight
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setFocusedTarget(null);
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <ScrollContext.Provider
      value={{
        scrollProgress,
        activeSection,
        setActiveSection,
        selectedProject,
        setSelectedProject,
        focusedTarget,
        setFocusedTarget,
        wireframeMode,
        setWireframeMode,
        hudOverlayMode,
        setHudOverlayMode,
        scrollPercent,
        setScrollPercent,
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollProgress() {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    throw new Error('useScrollProgress must be used within ScrollProvider');
  }
  return ctx;
}
